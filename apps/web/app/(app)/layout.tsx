import * as React from "react"

import { Toaster } from "@acme/web-ui"

import AuthGuard from "~/components/auth/auth-guard"
import AppInner from "./app-inner"
import Init from "./init"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <AuthGuard>
      <main className="flex h-screen max-h-screen min-h-screen items-stretch overflow-hidden">
        <AppInner>{children}</AppInner>
      </main>
      <React.Suspense>
        <Init />
      </React.Suspense>
      <Toaster />
    </AuthGuard>
  )
}
