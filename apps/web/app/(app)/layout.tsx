import * as React from "react"

import { Toaster } from "@acme/web-ui"

import AuthGuard from "~/components/auth/auth-guard"
import Init from "./init"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <AuthGuard>
      <div className="flex h-screen max-h-screen min-h-screen items-stretch overflow-hidden">
        <main className="max-w-[calc(100vw-240px)] flex-1">{children}</main>
      </div>
      <React.Suspense>
        <Init />
      </React.Suspense>
      <Toaster />
    </AuthGuard>
  )
}
