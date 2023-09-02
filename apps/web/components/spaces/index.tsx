import * as React from "react"

import ListSkeleton from "../skeletons/list-skeleton"
import SpaceList from "./space-list"

export default function Spaces() {
  return (
    <>
      <h3 className="font-semibold">Spaces</h3>
      <div className="mt-2 h-[calc(40vh-44px)] flex-1">
        <React.Suspense fallback={<ListSkeleton />}>
          <SpaceList />
        </React.Suspense>
      </div>
    </>
  )
}
