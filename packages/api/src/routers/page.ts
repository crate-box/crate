import { TRPCError } from "@trpc/server"
import { z } from "zod"

import type { Prisma } from "@acme/db"

import { defaultPageSelect, singlePageSelect } from "../selects"
import { protectedProcedure, router } from "../trpc"

export const pageRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          icon: z.string().optional(),
          title: z.string().min(1, {
            message: "Page title must not empty",
          }),
          body: z.string().optional(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.page.create({
        data: {
          ...input.data,
          creatorId: ctx.session.user.id,
          body: input.data.body ?? "",
        },
      })
    }),
  all: protectedProcedure
    .input(
      z
        .object({
          query: z.string(),
          pinned: z.boolean(),
          trashed: z.boolean(),
          filters: z.object({
            startDate: z.date(),
            endDate: z.date(),
          }),
          sort: z
            .array(
              z.union([
                z.object({ title: z.enum(["asc", "desc"]) }),
                z.object({ createdAt: z.enum(["asc", "desc"]) }),
                z.object({ updatedAt: z.enum(["asc", "desc"]) }),
              ])
            )
            .default([
              { title: "asc" },
              { createdAt: "desc" },
              { updatedAt: "desc" },
            ]),
        })
        .partial()
        .optional()
    )
    .query(({ ctx, input }) => {
      const where: Prisma.PageWhereInput = {
        creatorId: ctx.session.user.id,
        trashed: false,
        OR: [{ space: { trashed: false } }, { space: null }],
      }

      if (input?.query) {
        where.title = { contains: input.query, mode: "insensitive" }
      }

      if (input?.pinned) {
        where.pinned = input.pinned
      }

      if (input?.trashed) {
        where.trashed = input.trashed
      }

      return ctx.prisma.page.findMany({
        where,
        select: defaultPageSelect,
        orderBy: input?.sort,
      })
    }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Page ID must not empty" }),
      })
    )
    .query(async ({ ctx, input }) => {
      const page = await ctx.prisma.page.findUnique({
        where: {
          id: input.id,
          OR: [
            { creatorId: ctx.session.user.id },
            { space: { members: { some: { id: ctx.session.user.id } } } },
          ],
        },
        select: singlePageSelect,
      })

      if (!page) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The page does not exist",
        })
      }

      return page
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z
          .object({
            icon: z.string(),
            title: z.string().min(1, {
              message: "Page title must not empty",
            }),
            description: z.string().min(1, {
              message: "Page description must not empty",
            }),
            body: z.string(),
            pinned: z.boolean(),
            trashed: z.boolean(),
          })
          .partial(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.page.update({
        where: { id: input.id, creatorId: ctx.session.user.id },
        data: {
          ...input.data,
          editorId: ctx.session.user.id,
        },
        select: defaultPageSelect,
      })
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Page ID must not empty" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const page = await ctx.prisma.page.findUnique({
        where: { id: input.id, creatorId: ctx.session.user.id },
      })

      if (!page) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The page to delete does not exist",
        })
      }
      return ctx.prisma.page.delete({
        where: { id: input.id, creatorId: ctx.session.user.id },
        select: defaultPageSelect,
      })
    }),
})
