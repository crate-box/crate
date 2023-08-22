import * as React from "react"

import { PopoverContent, PopoverPortal } from "@acme/web-ui"

import Spinner from "~/components/spinner"
import PageList from "./page-list"

export default function Pages() {
  return (
    <PopoverPortal>
      <PopoverContent
        side="right"
        sideOffset={12}
        className="flex h-[40vh] min-w-[480px] flex-col items-stretch border border-slate-800 bg-slate-900 shadow-2xl"
      >
        <h3 className="font-semibold">Pages</h3>
        <div className="h-[calc(40vh-44px)] flex-1">
          <React.Suspense fallback={<Spinner text="Loading pages" />}>
            <PageList />
          </React.Suspense>
        </div>
      </PopoverContent>
    </PopoverPortal>
  )
}
