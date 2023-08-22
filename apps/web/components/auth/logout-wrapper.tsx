import { CSRF_experimental } from "@acme/auth"

export default function LogoutWrapper({ children }: React.PropsWithChildren) {
  return (
    <form action="/api/auth/signout" method="post">
      {children}
      <CSRF_experimental />
    </form>
  )
}
