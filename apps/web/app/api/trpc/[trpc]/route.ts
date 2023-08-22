import { fetchRequestHandler } from "@trpc/server/adapters/fetch"

import { appRouter, createTRPCContext } from "@acme/api"
import { auth } from "@acme/auth"

export const runtime = "nodejs"

/*
 * Configure basic CORS headers
 * */
function setCorsHeaders(res: Response) {
  res.headers.set("Access-Controll-Allow-Origin", "*")
  res.headers.set("Access-Controll-Request-Method", "*")
  res.headers.set("Access-Controll-Allow-Methods", "OPTIONS, GET, POST")
  res.headers.set("Access-Controll-Allow-Headers", "*")
}

export function OPTIONS() {
  const res = new Response(null, { status: 204 })
  setCorsHeaders(res)
  return res
}

const handler = auth(async (req) => {
  const res = await fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    req,
    createContext: () => createTRPCContext({ auth: req.auth, req }),
  })
  setCorsHeaders(res)
  return res
})

export { handler as GET, handler as POST }
