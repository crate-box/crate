import { router } from "../trpc"
import { pageRouter } from "./page"
import { sessionRouter } from "./session"
import { settingsRouter } from "./settings"
import { userRouter } from "./user"

export const appRouter = router({
  page: pageRouter,
  session: sessionRouter,
  settings: settingsRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
