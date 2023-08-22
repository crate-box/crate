import { redirect } from "next/navigation"

import { getSession } from "~/lib/auth"

export default async function AuthGuard({ children }: React.PropsWithChildren) {
  const session = await getSession()

  if (!session) {
    return redirect("/auth/signin")
  }

  return <>{children}</>
}
