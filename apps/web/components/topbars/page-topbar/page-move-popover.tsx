"use client"

import * as React from "react"

import { PopoverClose } from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"

import Icon from "~/components/icon"
import type { RouterOutputs } from "~/lib/api"
import { api } from "~/lib/api"
import { formatDate } from "~/lib/utils"

export default function PageMovePopover({
  page,
}: {
  page: RouterOutputs["page"]["byId"]
}) {
  const { toast } = useToast()

  const context = api.useContext()
  const [spaces] = api.space.all.useSuspenseQuery()
  const { mutateAsync: addPage } = api.space.addPage.useMutation({
    async onSuccess(data) {
      await context.space.byId.invalidate({ id: data.id })
      await context.page.byId.invalidate({ id: page?.id })
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot move the page",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const onMovePage = async (id: string) => {
    if (!page) return
    await addPage({ id, pageId: page.id })
    toast({
      variant: "success",
      title: "Moving the page successfully",
      description: `This page has been moved to space ID "${id}"`,
    })
  }

  return spaces?.length && spaces.length > 0 ? (
    <div className="mt-2 flex flex-col items-stretch gap-1">
      {spaces?.map((space) => (
        <PopoverClose
          key={space.id}
          className={`flex h-9 select-none items-center justify-between rounded px-2 leading-none transition-colors duration-200 hover:bg-slate-700 ${
            page.space?.id === space.id
              ? "pointer-events-none opacity-30"
              : "pointer-events-auto opacity-100"
          }`}
          onClick={() => onMovePage(space.id)}
        >
          <div className="flex items-center gap-3">
            <Icon type="Space" icon={space.icon} />
            <span>{space.title}</span>
          </div>
          <time
            dateTime={space.createdAt.toISOString()}
            className="text-slate-400"
          >
            {formatDate(space.createdAt)}
          </time>
        </PopoverClose>
      ))}
    </div>
  ) : (
    <p className="text-center">You have no spaces</p>
  )
}
