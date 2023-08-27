import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

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
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"

import type { RouterOutputs } from "~/lib/api"
import { api } from "~/lib/api"

export default function PageTrashed({
  page,
}: {
  page: RouterOutputs["page"]["byId"]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const context = api.useContext()
  const { mutateAsync: updatePage } = api.page.update.useMutation({
    async onSuccess(data) {
      await context.page.byId.invalidate({ id: data.id })
      await context.page.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot update this page",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const { mutateAsync: deletePage } = api.page.delete.useMutation({
    async onSuccess(data) {
      if (data.id === pathname.replace("/", "")) {
        router.push("/welcome")
      }
      await context.page.byId.invalidate({ id: data.id })
      await context.page.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot delete this page",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const onRestorePage = async () => {
    if (!page) return
    await updatePage({ id: page.id, data: { trashed: false } })
  }

  const onDeletePage = async () => {
    if (!page) return
    await deletePage({ id: page.id })
  }

  return page.trashed ? (
    <div className="flex items-center justify-center gap-2 text-destructive">
      <p>This page is currently in your trash.</p>{" "}
      <Button size="sm" variant="text" onClick={onRestorePage}>
        Restore page
      </Button>
      <AlertRoot>
        <AlertTrigger asChild>
          <Button variant="destructive" size="sm">
            Delete permanently
          </Button>
        </AlertTrigger>
        <AlertPortal>
          <AlertOverlay />
          <AlertContent>
            <AlertTitle>Delete Page</AlertTitle>
            <AlertDescription>
              This will delete the page permanently. This action cannot be
              undone.
            </AlertDescription>
            <div className="flex items-center justify-end gap-2">
              <AlertAction asChild>
                <Button variant="destructive" onClick={onDeletePage}>
                  Delete
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
  ) : null
}
