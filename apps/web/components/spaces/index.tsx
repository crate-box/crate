import * as React from "react"

import Spinner from "~/components/spinner"
import SpaceList from "./space-list"

export default function Spaces() {
  return (
    <>
      <h3 className="font-semibold">Spaces</h3>
      <div className="h-[calc(40vh-44px)] flex-1">
        <React.Suspense fallback={<Spinner text="Loading spaces" />}>
          <SpaceList />
        </React.Suspense>
      </div>
    </>
  )
}
