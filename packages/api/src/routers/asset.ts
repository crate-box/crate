import { TRPCError } from "@trpc/server"
import { z } from "zod"

import type { Prisma } from "@acme/db"

import cloudinary from "../lib/cloudinary"
import { getAssetType } from "../lib/utils"
import { defaultAssetSelect } from "../selects"
import { protectedProcedure, router } from "../trpc"

export const assetRouter = router({
  all: protectedProcedure
    .input(
      z
        .object({ type: z.enum(["IMAGE", "VIDEO", "FILE"]) })
        .partial()
        .optional()
    )
    .query(({ ctx, input }) => {
      const where: Prisma.AssetWhereInput = {
        userId: ctx.session.user.id,
      }

      if (input?.type) {
        where.type = input.type
      }

      return ctx.prisma.asset.findMany({
        where,
        select: defaultAssetSelect,
      })
    }),
  upload: protectedProcedure
    .input(z.object({ uris: z.array(z.string().url()) }))
    .mutation(async ({ ctx, input }) => {
      try {
        const urls = []

        for (const uri of input.uris) {
          const type = getAssetType(uri)
          const { secure_url } = await cloudinary.uploader.upload(uri, {
            resource_type: "auto",
          })
          urls.push(secure_url)

          await ctx.prisma.asset.create({
            data: {
              userId: ctx.session.user.id,
              type,
              url: secure_url,
            },
          })
        }

        return urls
      } catch (err) {
        console.log(err)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error while uploading assets to the cloud",
        })
      }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string().min(1, "Asset ID must not empty") }))
    .mutation(async ({ ctx, input }) => {
      const asset = await ctx.prisma.asset.findUnique({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      })

      if (!asset) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The asset to delete does not exist",
        })
      }

      // destroys image on cloudinary
      const publicId = asset.url.split("/").slice(-1)[0]?.split(".")[0]
      if (!publicId)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot get public_id from the asset's url",
        })
      await cloudinary.uploader.destroy(publicId)
      return ctx.prisma.asset.delete({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      })
    }),
})
