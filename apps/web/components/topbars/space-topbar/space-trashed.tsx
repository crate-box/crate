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

export default function SpaceTrashed({
  space,
}: {
  space: RouterOutputs["space"]["byId"]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const context = api.useContext()
  const { mutateAsync: updateSpace } = api.space.update.useMutation({
    async onSuccess(data) {
      await context.space.byId.invalidate({ id: data.id })
      await context.space.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot update this space",
        description: err.message,
      })
    },
  })
  const { mutateAsync: deleteSpace } = api.space.delete.useMutation({
    async onSuccess(data) {
      if (data.id === pathname.replace("/space/", "")) {
        router.push("/welcome")
      }
      await context.space.byId.invalidate({ id: data.id })
      await context.space.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot delete this space",
        description: err.message,
      })
    },
  })

  const onRestoreSpace = async () => {
    if (!space) return
    await updateSpace({ id: space.id, data: { trashed: false } })
  }

  const onDeleteSpace = async () => {
    if (!space) return
    await deleteSpace({ id: space.id })
  }

  return space.trashed ? (
    <div className="flex items-center justify-center gap-2 text-destructive">
      <p>This space is currently in your trash.</p>{" "}
      <Button size="sm" variant="text" onClick={onRestoreSpace}>
        Restore space
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
            <AlertTitle>Delete Space</AlertTitle>
            <AlertDescription>
              This will delete the space permanently. This action cannot be
              undone.
            </AlertDescription>
            <div className="flex items-center justify-end gap-2">
              <AlertAction asChild>
                <Button variant="destructive" onClick={onDeleteSpace}>
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
