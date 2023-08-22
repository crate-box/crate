"use client"

import SpaceContent from "~/components/space-content"
import Spinner from "~/components/spinner"
import SpaceTopbar from "~/components/topbars/space-topbar"
import { api } from "~/lib/api"

interface SingleSpaceProps {
  params: { id: string }
}
export default function SingleSpace({ params }: SingleSpaceProps) {
  const { data: space, status } = api.space.byId.useQuery({ id: params.id })

  if (status === "error")
    return <div>There was an error while fetching this space data</div>

  if (status === "loading") return <Spinner text="Loading space" />

  return (
    <div className="h-full w-full">
      <SpaceTopbar space={space} />
      <SpaceContent space={space} />
    </div>
  )
}
