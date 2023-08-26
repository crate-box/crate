import * as React from "react"

import {
  Avatar,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "@acme/web-ui"

import { api } from "~/lib/api"
import ProfilePopover from "./profile-popover"

export default function ProfileButton() {
  const [session] = api.session.get.useSuspenseQuery()

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <button className="flex h-11 w-full items-center gap-3 px-4 transition-colors duration-200 hover:bg-slate-800">
          <Avatar
            src={session.user.image ?? ""}
            alt={session.user.name ?? "Unauthorized"}
            fallback={session.user.name ?? ""}
          />
          <p className="font-medium leading-none">{session.user.name}</p>
        </button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          sideOffset={4}
          className="ml-4 flex flex-col items-stretch gap-4"
        >
          <ProfilePopover session={session} />
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  )
}
