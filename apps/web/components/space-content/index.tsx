"use client"

import Link from "next/link"

import {
  AlertAction,
  AlertCancel,
  AlertContent,
  AlertDescription,
  AlertOverlay,
  AlertPortal,
  AlertRoot,
  AlertTitle,
  AlertTrigger,
  Button,
  IconButton,
  Tooltip,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import { RemoveIcon } from "@acme/web-ui/icons"

import Icon from "~/components/icon"
import { api } from "~/lib/api"
import type { RouterOutputs } from "~/lib/api"
import { formatDate } from "~/lib/utils"

export default function SpaceContent({
  space,
}: {
  space: RouterOutputs["space"]["byId"]
}) {
  const { toast } = useToast()

  const context = api.useContext()
  const { mutateAsync: removePageFromSpace } = api.space.removePage.useMutation(
    {
      async onSuccess(data) {
        await context.space.byId.invalidate({ id: data.id })
      },
      onError(err) {
        toast({
          variant: "destructive",
          title: "Cannot remove the page from this space",
          description: err.message,
        })
      },
    }
  )

  const onRemovePageFromSpace = async (pageId: string) => {
    if (!space) return
    await removePageFromSpace({ id: space.id, pageId })
  }

  return (
    <div className="mx-auto max-w-[640px] p-4">
      <div className="flex flex-col items-stretch gap-1">
        {space.pages.length === 0 && (
          <p className="text-center">You have no pages in this space</p>
        )}
        {space.pages.map((page) => (
          <div key={page.id} className="flex items-center justify-between">
            <Link
              href={`/${page.id}`}
              className="flex h-9 flex-1 items-center justify-between gap-2 rounded px-4 transition-colors duration-200 ease-out hover:bg-slate-800"
            >
              <div className="flex items-center gap-3">
                <Icon type="Page" icon={page.icon} />
                <span className="font-medium">{page.title}</span>
              </div>
              <time dateTime={page.createdAt.toISOString()}>
                {formatDate(page.createdAt)}
              </time>
            </Link>
            <div>
              <AlertRoot>
                <Tooltip text="Remove">
                  <AlertTrigger asChild>
                    <IconButton
                      className="hover:bg-slate-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <RemoveIcon className="h-[18px] w-[18px]" />
                    </IconButton>
                  </AlertTrigger>
                </Tooltip>
                <AlertPortal>
                  <AlertOverlay />
                  <AlertContent>
                    <AlertTitle>
                      Remove page &quot;{page.title}&quot; from this space
                    </AlertTitle>
                    <AlertDescription>
                      This will move the page outside this space. Are you
                      absolutely sure?
                    </AlertDescription>
                    <div className="flex items-center gap-2">
                      <AlertAction asChild>
                        <Button
                          variant="destructive"
                          onClick={() => onRemovePageFromSpace(page.id)}
                        >
                          Remove
                        </Button>
                      </AlertAction>
                      <AlertCancel asChild>
                        <Button variant="text">Cancel</Button>
                      </AlertCancel>
                    </div>
                  </AlertContent>
                </AlertPortal>
              </AlertRoot>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
