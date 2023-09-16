import * as React from "react"

import {
  Avatar,
  IconButton,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "@acme/web-ui"
import { ClearIcon } from "@acme/web-ui/icons"

import { api } from "~/lib/api"
import ProfilePopover from "./profile-popover"

export default function ProfileButton() {
  const [session] = api.session.get.useSuspenseQuery()

  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <div
          className="flex h-11 w-full items-center gap-3 px-4 transition-colors duration-200 hover:bg-slate-800"
          aria-label="Show profile"
          role="button"
        >
          <Avatar
            src={session.user.image ?? ""}
            alt={session.user.name ?? "Unauthorized"}
            fallback={session.user.name ?? ""}
          />
          <p className="font-medium leading-none">{session.user.name}</p>
        </div>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent
          sideOffset={4}
          className="mx-4 ml-0 flex w-screen flex-col items-stretch gap-4 tablet:mx-0 tablet:ml-4 tablet:w-[360px]"
        >
          <ProfilePopover session={session} />
          <PopoverClose asChild>
            <IconButton
              size="sm"
              className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
              aria-label="Close"
            >
              <ClearIcon className="h-[18px] w-[18px]" />
            </IconButton>
          </PopoverClose>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  )
}
