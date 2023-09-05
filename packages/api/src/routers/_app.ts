import { router } from "../trpc"
import { assetRouter } from "./asset"
import { pageRouter } from "./page"
import { sessionRouter } from "./session"
import { settingsRouter } from "./settings"
import { spaceRouter } from "./space"
import { userRouter } from "./user"

export const appRouter = router({
  asset: assetRouter,
  page: pageRouter,
  session: sessionRouter,
  settings: settingsRouter,
  space: spaceRouter,
  user: userRouter,
})

export type AppRouter = typeof appRouter
