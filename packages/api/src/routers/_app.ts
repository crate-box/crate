import { router } from "../trpc"
import { pageRouter } from "./page"
import { sessionRouter } from "./session"
import { userRouter } from "./user"

export const appRouter = router({
  page: pageRouter,
  session: sessionRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
