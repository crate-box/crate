import Logo from "@acme/web-ui/logo"

import DiscordLoginButton from "~/components/auth/discord-login-button"
import GithubLoginButton from "~/components/auth/github-login-button"

export default function SignIn({
  searchParams,
}: {
  searchParams: { error: string }
}) {
  return (
    <div className="grid h-screen place-items-center bg-slate-950 px-4">
      <div className="xs:w-[360px] flex w-full flex-col items-center rounded-lg bg-slate-900 p-6">
        <Logo className="h-12 w-12 text-primary" />
        <h1 className="mt-8 text-center text-3xl font-bold">Welcome back!</h1>
        <p className="text-center text-lg text-slate-300">
          We&apos;re so excited to see you again!
        </p>
        {searchParams.error && (
          <p className="mt-8 text-center text-destructive">
            Error. Try again after a few minutes.
          </p>
        )}
        <div className="mt-8 self-stretch">
          <div className="flex flex-col items-stretch gap-3">
            <GithubLoginButton />
            <DiscordLoginButton />
          </div>
        </div>
      </div>
    </div>
  )
}
