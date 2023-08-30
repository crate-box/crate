import { initTRPC, TRPCError } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"

import { auth } from "@acme/auth"
import type { Session } from "@acme/auth"
import { prisma } from "@acme/db"

// @see https://trpc.io/docs/server/context#inner-and-outer-context
interface CreateContextOptions {
  session: Session | null
}

export function createInnerTRPCContext(opts: CreateContextOptions) {
  return {
    session: opts.session,
    prisma,
  }
}

export async function createTRPCContext(opts: {
  req?: Request
  auth?: Session
}) {
  const session = opts.auth ?? (await auth())
  const source = opts.req?.headers.get("x-trpc-source") ?? "unknown"
  console.log(">>> tRPC Request from", source, "by", session?.user)
  return createInnerTRPCContext({ session })
}

// @see https://trpc.io/docs/server/routers#initialize-trpc
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      // @see https://trpc.io/docs/server/error-formatting#adding-custom-formatting
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})

// @see https://trpc.io/docs/server/routers
export const router = t.router

// @see https://trpc.io/docs/procedures
export const publicProcedure = t.procedure

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

export const protectedProcedure = t.procedure.use(isAuthed)
