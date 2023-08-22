import { Button, PopoverContent, PopoverPortal } from "@acme/web-ui"

import LogoutWrapper from "~/components/auth/logout-wrapper"
import { getSession } from "~/lib/auth"

export default async function Profile() {
  const session = await getSession()

  if (!session?.user) return null

  return (
    <PopoverPortal>
      <PopoverContent
        sideOffset={4}
        className="ml-4 flex flex-col items-stretch gap-4"
      >
        <p className="text-slate-300">{session.user.email}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
              src={session.user.image ?? ""}
              alt={session.user.name ?? "Unauthorized"}
              width={32}
              height={32}
              className="rounded"
            />
            <div>
              <p className="font-semibold">{session.user.name}</p>
              <p className="text-sm text-slate-400">Free Plan</p>
            </div>
          </div>
          <LogoutWrapper>
            <Button variant="secondary" size="sm">
              Log Out
            </Button>
          </LogoutWrapper>
        </div>
      </PopoverContent>
    </PopoverPortal>
  )
}
