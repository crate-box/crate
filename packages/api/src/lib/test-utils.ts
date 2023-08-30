import { prisma } from "@acme/db"

import { appRouter } from "~/routers/_app"
import { createInnerTRPCContext } from "~/trpc"

export async function cleanupDb() {
  return prisma.user.deleteMany({ where: { email: { contains: "testuser" } } })
}

export function createPublicCaller() {
  const ctx = createInnerTRPCContext({ session: null })
  const caller = appRouter.createCaller(ctx)
  return { ctx, caller }
}

export async function createProtectedCaller() {
  const user = await prisma.user.upsert({
    where: { email: "testuser@mail.com" },
    create: {
      name: "Test user",
      email: "testuser@mail.com",
      image: "",
    },
    update: {},
  })
  const ctx = createInnerTRPCContext({ session: { user, expires: "1" } })
  const caller = appRouter.createCaller(ctx)
  return { ctx, caller }
}
