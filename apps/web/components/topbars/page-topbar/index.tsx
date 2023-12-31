import * as React from "react"

import type { RouterOutputs } from "~/lib/api"
import PageActions from "./page-actions"
import PageTitle from "./page-title"
import PageTrashed from "./page-trashed"

export default function PageTopbar({
  page,
}: {
  page: RouterOutputs["page"]["byId"]
}) {
  return (
    <div className="flex h-10 items-center justify-between border-b border-slate-800 px-2 leading-none tablet:px-4">
      <PageTitle page={page} />
      <PageTrashed page={page} />
      <PageActions page={page} />
    </div>
  )
}
