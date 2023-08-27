"use client"

import * as React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import superjson from "superjson"

import { env } from "~/env.mjs"
import { api } from "~/lib/api"

function getBaseUrl() {
  if (typeof window !== "undefined") return ""
  return env.VERCEL_URL ?? `http://localhost:${env.PORT}`
}

export function ApiProvider(
  props: React.PropsWithChildren & { headers?: Headers }
) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 10,
          },
        },
      })
  )

  const [trpcClient] = React.useState(() =>
    api.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            const headers = new Map(props.headers)
            headers.set("x-trpc-source", "nextjs-react")
            return Object.fromEntries(headers)
          },
        }),
      ],
    })
  )

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration transformer={superjson}>
          {props.children}
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </api.Provider>
  )
}
