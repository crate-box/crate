"use client"

import { Suspense } from "react"

import Editor from "~/components/editor"
import Spinner from "~/components/spinner"
import PageTopbar from "~/components/topbars/page-topbar"
import { useStore } from "~/hooks"
import { api } from "~/lib/api"

export default function PageContent({
  params,
  children,
}: React.PropsWithChildren & { params: { id: string } }) {
  const mode = useStore((state) => state.mode)
  const [page] = api.page.byId.useSuspenseQuery({ id: params.id })

  return (
    <div className="h-full w-full">
      <PageTopbar page={page} />
      {mode === "EDIT" && (
        <Suspense fallback={<Spinner text="Loading editor" />}>
          <Editor page={page} />
        </Suspense>
      )}
      {mode === "PREVIEW" && children}
    </div>
  )
}
