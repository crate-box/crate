import { DiscordIcon, GithubIcon } from "@acme/web-ui/icons"
import Logo from "@acme/web-ui/logo"

import OauthButton from "~/components/auth/oauth-button"

export default function SignIn({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  return (
    <div className="grid h-screen place-items-center bg-slate-950">
      <div className="flex min-w-[360px] max-w-[360px] flex-col items-center rounded-lg bg-slate-900 p-8">
        <Logo className="h-12 w-12 text-primary" />
        <h1 className="mt-8 text-3xl font-bold">Welcome back!</h1>
        <p className="text-lg text-slate-300">
          We&apos;re so excited to see you again!
        </p>
        {searchParams.error && (
          <p className="mt-8 text-center text-destructive">
            Error. Try again after a few minutes.
          </p>
        )}
        <div className="mt-8 self-stretch">
          <div className="flex flex-col items-stretch gap-3">
            <OauthButton provider="github" icon={GithubIcon}>
              Continue with Github
            </OauthButton>
            <OauthButton
              provider="discord"
              icon={DiscordIcon}
              fg="#e6edf3"
              bg="#5865f2"
            >
              Continue with Discord
            </OauthButton>
          </div>
        </div>
      </div>
    </div>
  )
}
