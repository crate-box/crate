import { protectedProcedure, router } from "../trpc"

export const sessionRouter = router({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.session
  }),
  deleteAll: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.session.deleteMany({
      where: { userId: ctx.session.user.id },
    })
  }),
})
