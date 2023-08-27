import { TRPCError } from "@trpc/server"
import { z } from "zod"

import type { Prisma } from "@acme/db"

import { defaultSpaceSelect, singleSpaceSelect } from "../selects"
import { protectedProcedure, router } from "../trpc"

export const spaceRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        data: z.object({
          icon: z.string().optional(),
          title: z.string().min(1, {
            message: "Space title must not empty",
          }),
          description: z.string().min(1, {
            message: "Space description must not empty",
          }),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.space.create({
        data: {
          ...input.data,
          creatorId: ctx.session.user.id,
          members: {
            connect: { id: ctx.session.user.id },
          },
        },
        select: defaultSpaceSelect,
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
      const where: Prisma.SpaceWhereInput = {
        OR: [
          {
            creatorId: ctx.session.user.id,
          },
          { members: { some: { id: ctx.session.user.id } } },
        ],
        trashed: false,
      }

      if (input?.query) {
        where.OR = [
          { title: { contains: input.query, mode: "insensitive" } },
          {
            description: {
              contains: input.query,
              mode: "insensitive",
            },
          },
        ]
      }

      if (typeof input?.pinned === "boolean") {
        where.pinned = input.pinned
      }

      if (typeof input?.trashed === "boolean") {
        where.trashed = input?.trashed
      }

      return ctx.prisma.space.findMany({
        where,
        select: defaultSpaceSelect,
        orderBy: input?.sort,
      })
    }),
  byId: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Space ID must not empty" }),
      })
    )
    .query(async ({ ctx, input }) => {
      const space = await ctx.prisma.space.findUnique({
        where: {
          id: input.id,
          OR: [
            {
              creatorId: ctx.session.user.id,
            },
            { members: { some: { id: ctx.session.user.id } } },
          ],
        },
        select: singleSpaceSelect,
      })

      if (!space) {
        throw new TRPCError({
          code: "NOT_FOUND",
        })
      }

      return space
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z
          .object({
            icon: z.string(),
            title: z.string().min(1, {
              message: "Space title must not empty",
            }),
            description: z.string().min(1, {
              message: "Space description must not empty",
            }),
            pinned: z.boolean(),
            trashed: z.boolean(),
          })
          .partial(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.space.update({
        where: {
          id: input.id,
          OR: [
            {
              creatorId: ctx.session.user.id,
            },
            { members: { some: { id: ctx.session.user.id } } },
          ],
        },
        data: { ...input.data, editorId: ctx.session.user.id },
        select: defaultSpaceSelect,
      })
    }),
  addMember: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Space ID must not empty" }),
        memberId: z.string().min(1, { message: "Member ID must not empty" }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.space.update({
        where: {
          id: input.id,
          OR: [
            {
              creatorId: ctx.session.user.id,
            },
            { members: { some: { id: ctx.session.user.id } } },
          ],
        },
        data: {
          members: { connect: { id: input.memberId } },
          editorId: ctx.session.user.id,
        },
      })
    }),
  removeMember: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Space ID must not empty" }),
        memberId: z.string().min(1, { message: "Member ID must not empty" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const space = await ctx.prisma.space.findUnique({
        where: {
          id: input.id,
          OR: [
            {
              creatorId: ctx.session.user.id,
            },
            { members: { some: { id: ctx.session.user.id } } },
          ],
        },
      })

      if (input.memberId === space?.creatorId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot remove the space owner",
        })
      }

      return ctx.prisma.space.update({
        where: { id: input.id },
        data: {
          members: { disconnect: { id: input.memberId } },
          editorId: ctx.session.user.id,
        },
      })
    }),
  addPage: protectedProcedure
    .input(
      z.object({
        pageId: z.string().min(1, { message: "Page ID must not empty" }),
        id: z.string().min(1, { message: "Space ID must not empty" }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.space.update({
        where: {
          id: input.id,
          OR: [
            {
              creatorId: ctx.session.user.id,
            },
            { members: { some: { id: ctx.session.user.id } } },
          ],
        },
        data: { pages: { connect: { id: input.pageId } } },
      })
    }),
  removePage: protectedProcedure
    .input(
      z.object({
        pageId: z.string().min(1, { message: "Page ID must not empty" }),
        id: z.string().min(1, { message: "Space ID must not empty" }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.space.update({
        where: {
          id: input.id,
          OR: [
            {
              creatorId: ctx.session.user.id,
            },
            { members: { some: { id: ctx.session.user.id } } },
          ],
        },
        data: { pages: { disconnect: { id: input.pageId } } },
      })
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1, { message: "Space ID must not empty" }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.space.delete({
        where: { id: input.id, creatorId: ctx.session.user.id },
      })
    }),
})
