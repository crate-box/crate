import * as React from "react"

import type { RouterOutputs } from "~/lib/api"
import PageActions from "./page-actions"
import PageTitle from "./page-title"

export default function PageTopbar({
  page,
}: {
  page: RouterOutputs["page"]["byId"]
}) {
  return (
    <div className="flex h-10 items-center justify-between border-b border-slate-800 px-4 leading-none">
      <PageTitle page={page} />
      <PageActions page={page} />
    </div>
  )
}
