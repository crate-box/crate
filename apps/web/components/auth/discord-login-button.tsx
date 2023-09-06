"use client"

import * as React from "react"

import { signIn } from "@acme/auth/react"
import { Button } from "@acme/web-ui"
import type { ButtonProps } from "@acme/web-ui"
import { DiscordIcon } from "@acme/web-ui/icons"
import Logo from "@acme/web-ui/logo"

export default function DiscordLoginButton(props: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <Button
      aria-label="Continue with Discord"
      className="justify-start gap-6 bg-[#5865f2] px-8 text-lg text-[#e6edf3]"
      variant="unstyled"
      size="xl"
      onClick={async () => {
        setIsLoading(true)
        await signIn("discord", { callbackUrl: "/" })
      }}
      {...props}
    >
      <span className="inline-flex aspect-square h-5 items-center justify-center">
        {isLoading ? (
          <Logo className="h-5 w-5 animate-spin" />
        ) : (
          <DiscordIcon className="h-5 w-5" />
        )}
      </span>
      <span>Continue with Discord</span>
    </Button>
  )
}
