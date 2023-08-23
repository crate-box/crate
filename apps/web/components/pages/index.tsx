import * as React from "react"

import Spinner from "~/components/spinner"
import PageList from "./page-list"

export default function Pages() {
  return (
    <>
      <h3 className="font-semibold">Pages</h3>
      <div className="h-[calc(40vh-44px)] flex-1">
        <React.Suspense fallback={<Spinner text="Loading pages" />}>
          <PageList />
        </React.Suspense>
      </div>
    </>
  )
}
