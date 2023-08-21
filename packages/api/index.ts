import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server"

import type { AppRouter } from "./src/routers/_app"

export { appRouter, type AppRouter } from "./src/routers/_app"
export { createTRPCContext } from "./src/trpc"

// @see https://trpc.io/docs/client/vanilla/infer-types#inferring-input--output-types
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
