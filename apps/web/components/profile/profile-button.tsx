import { Avatar, PopoverRoot, PopoverTrigger } from "@acme/web-ui"

import { getSession } from "~/lib/auth"
import ProfilePopover from "./profile-popover"

export default async function ProfileButton() {
  const session = await getSession()

  if (!session?.user) return null

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
      <ProfilePopover />
    </PopoverRoot>
  )
}