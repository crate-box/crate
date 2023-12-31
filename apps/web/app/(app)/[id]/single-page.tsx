"use client"

import PageContent from "~/components/page-content"
import PageTopbar from "~/components/topbars/page-topbar"
import { api } from "~/lib/api"

export default function SinglePage({
  params,
  children,
}: React.PropsWithChildren & { params: { id: string } }) {
  const [page] = api.page.byId.useSuspenseQuery({ id: params.id })

  return (
    <div className="flex h-full w-full flex-col items-stretch">
      <PageTopbar page={page} />
      <PageContent page={page}>{children}</PageContent>
    </div>
  )
}
