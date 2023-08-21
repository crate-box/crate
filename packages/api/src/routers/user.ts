import { z } from "zod"

import { protectedProcedure, router } from "../trpc"

export const userRouter = router({
  search: protectedProcedure
    .input(
      z
        .object({
          query: z.string(),
          limit: z.number().default(10),
          sort: z.array(
            z
              .object({
                name: z.enum(["asc", "desc"]),
              })
              .default({ name: "asc" }),
            z
              .object({
                email: z.enum(["asc", "desc"]),
              })
              .default({ email: "asc" })
          ),
        })
        .partial()
    )
    .query(({ ctx, input }) => {
      if (!input.query) return []
      return ctx.prisma.user.findMany({
        where: {
          OR: [
            {
              email: { contains: input.query, mode: "insensitive" },
            },
            { name: { contains: input.query, mode: "insensitive" } },
          ],
        },
        skip: 0,
        take: input.limit,
        orderBy: input.sort,
      })
    }),
  update: protectedProcedure
    .input(
      z.object({
        data: z.object({ name: z.string().min(1), email: z.string().email() }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: { id: ctx.session.user.id },
        data: input.data,
      })
    }),
  delete: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.user.delete({ where: { id: ctx.session.user.id } })
  }),
})