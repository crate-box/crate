"use client"

import type { Session } from "@acme/auth"
import { signOut } from "@acme/auth/react"
import { Avatar, Button } from "@acme/web-ui"

export default function ProfilePopover({ session }: { session: Session }) {
  return (
    <>
      <p className="text-slate-300">
        {session.user.email ?? "You need to set an email address"}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            size={44}
            src={session.user.image ?? ""}
            alt={session.user.name ?? "Unauthorized"}
            fallback={session.user.name ?? ""}
          />
          <div>
            <p className="font-semibold">{session.user.name}</p>
            <p className="mt-1 text-sm text-slate-400">Free Plan</p>
          </div>
        </div>
        <Button variant="destructive" size="sm" onClick={() => signOut()}>
          Log Out
        </Button>
      </div>
    </>
  )
}
