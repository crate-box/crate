import AuthGuard from "~/components/auth/auth-guard"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>
}
