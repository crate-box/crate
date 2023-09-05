"use client"

import { Suspense } from "react"

import Editor from "~/components/editor"
import Spinner from "~/components/spinner"
import { useStore } from "~/hooks"
import type { RouterOutputs } from "~/lib/api"

export default function PageContent({
  page,
  children,
}: React.PropsWithChildren & { page: RouterOutputs["page"]["byId"] }) {
  const mode = useStore((state) => state.mode)

  return (
    <div className="max-h-[calc(100vh-40px)] flex-1 overflow-auto">
      {mode === "EDIT" && (
        <Suspense fallback={<Spinner text="Loading editor" />}>
          <Editor page={page} />
        </Suspense>
      )}
      {mode === "PREVIEW" && children}
    </div>
  )
}
