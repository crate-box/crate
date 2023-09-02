import * as React from "react"

import ListSkeleton from "../skeletons/list-skeleton"
import PageList from "./page-list"

export default function Pages() {
  return (
    <>
      <h3 className="font-semibold">Pages</h3>
      <div className="mt-2 h-[calc(40vh-44px)] flex-1">
        <React.Suspense fallback={<ListSkeleton />}>
          <PageList />
        </React.Suspense>
      </div>
    </>
  )
}
