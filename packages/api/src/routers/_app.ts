import { router } from "../trpc"
import { pageRouter } from "./page"
import { sessionRouter } from "./session"
import { settingsRouter } from "./settings"
import { spaceRouter } from "./space"
import { userRouter } from "./user"

export const appRouter = router({
  page: pageRouter,
  session: sessionRouter,
  settings: settingsRouter,
  space: spaceRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
