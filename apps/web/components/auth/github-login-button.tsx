"use client"

import * as React from "react"

import { signIn } from "@acme/auth/react"
import { Button } from "@acme/web-ui"
import type { ButtonProps } from "@acme/web-ui"
import { GithubIcon, LoadingIndicatorIcon } from "@acme/web-ui/icons"

export default function GithubLoginButton(props: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <Button
      arial-label="Continue with Github"
      className="justify-start gap-6 bg-slate-800 text-lg text-slate-100"
      variant="unstyled"
      size="xl"
      onClick={async () => {
        setIsLoading(true)
        await signIn("github", { callbackUrl: "/" })
      }}
      {...props}
    >
      <span className="inline-flex aspect-square h-5 items-center justify-center">
        {isLoading ? (
          <LoadingIndicatorIcon className="h-5 w-5 animate-spin" />
        ) : (
          <GithubIcon className="h-5 w-5" />
        )}
      </span>
      <span>Continue with Github</span>
    </Button>
  )
}
