import type { OAuthProviders } from "@acme/auth"
import { CSRF_experimental } from "@acme/auth"
import type { SVGProps } from "@acme/web-ui"

interface OauthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.FC<SVGProps>
  provider: OAuthProviders
  fg?: string
  bg?: string
}
export default function OauthButton({
  provider,
  icon: Icon,
  children: _,
  fg,
  bg,
  ...props
}: OauthButtonProps) {
  return (
    <form action={`/api/auth/signin/${provider}`} method="post">
      <button
        {...props}
        className="inline-flex h-12 w-full cursor-pointer items-center gap-6 rounded bg-slate-800 px-8 text-lg font-medium text-slate-100"
        style={{ color: fg, backgroundColor: bg }}
      >
        <Icon className="h-6 w-6" />
        <span>Continue with {provider}</span>
      </button>
      <CSRF_experimental />
    </form>
  )
}
