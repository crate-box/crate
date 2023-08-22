import * as React from "react"

import type { RouterOutputs } from "~/lib/api"
import SpaceActions from "./space-actions"
import SpaceTitle from "./space-title"
import SpaceTrashed from "./space-trashed"

export default function SpaceTopbar({
  space,
}: {
  space: RouterOutputs["space"]["byId"]
}) {
  return (
    <div className="flex h-10 items-center justify-between border-b border-slate-800 px-4 leading-none">
      <SpaceTitle space={space} />
      <SpaceTrashed space={space} />
      <SpaceActions space={space} />
    </div>
  )
}
