"use client"

import * as React from "react"

import { PopoverClose } from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"

import Icon from "~/components/icon"
import type { RouterOutputs } from "~/lib/api"
import { api } from "~/lib/api"
import { formatDate } from "~/lib/utils"

export default function AddPagePopover({
  space,
}: {
  space: RouterOutputs["space"]["byId"]
}) {
  const { toast } = useToast()

  const context = api.useContext()
  const { data: pages } = api.page.all.useQuery()

  const { mutateAsync: addPage } = api.space.addPage.useMutation({
    async onSuccess(data) {
      await context.space.byId.invalidate({ id: data.id })
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot add page to this space",
        description: err.message,
      })
    },
  })

  const onAddPage = async (pageId: string) => {
    if (!space) return
    await addPage({ id: space.id, pageId })
  }

  return (
    <>
      <h3 className="font-medium">Add an existing page</h3>
      {pages?.length && pages.length > 0 ? (
        <div className="mt-2 flex flex-col items-stretch gap-1">
          {pages?.map((page) => (
            <PopoverClose
              key={page.id}
              className={`flex h-8 select-none items-center justify-between rounded px-2 leading-none transition-colors duration-200 hover:bg-slate-700 ${
                page.space?.id === space.id
                  ? "pointer-events-none opacity-30"
                  : "pointer-events-auto opacity-100"
              }`}
              onClick={() => onAddPage(page.id)}
            >
              <div className="flex items-center gap-3">
                <Icon type="Page" icon={page.icon} />
                <span className="truncate">{page.title}</span>
              </div>
              <time
                dateTime={page.createdAt.toISOString()}
                className="text-slate-400"
              >
                {formatDate(page.createdAt)}
              </time>
            </PopoverClose>
          ))}
        </div>
      ) : (
        <p className="text-center">You have no pages</p>
      )}
    </>
  )
}
