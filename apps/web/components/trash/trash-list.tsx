"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

import { useToast } from "@acme/web-ui/hooks"

import { api } from "~/lib/api"
import TrashPage from "./trash-page"
import TrashSpace from "./trash-space"

export default function TrashList({ query }: { query: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const { toast } = useToast()

  const context = api.useContext()
  const [trashedPages] = api.page.all.useSuspenseQuery({
    query,
    trashed: true,
  })
  const [trashedSpaces] = api.space.all.useSuspenseQuery({
    query,
    trashed: true,
  })
  const { mutateAsync: updatePage } = api.page.update.useMutation({
    async onSuccess(data) {
      await context.page.byId.invalidate({ id: data.id })
      await context.page.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot restore the page",
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
        title: "Cannot delete the page permanently",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const { mutateAsync: updateSpace } = api.space.update.useMutation({
    async onSuccess(data) {
      await context.space.byId.invalidate({ id: data.id })
      await context.space.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot restore the space",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
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
        title: "Cannot delete the space permanently",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const onRestorePage = async (id: string) => {
    await updatePage({ id, data: { trashed: false } })
  }

  const onDeletePage = async (id: string) => {
    await deletePage({ id })
  }

  const onRestoreSpace = async (id: string) => {
    await updateSpace({ id, data: { trashed: false } })
  }

  const onDeleteSpace = async (id: string) => {
    await deleteSpace({ id })
  }

  return (
    <div className="mt-2 flex flex-col items-stretch gap-1 overflow-auto">
      {trashedPages.map((page) => (
        <TrashPage
          key={page.id}
          page={page}
          onRestore={() => onRestorePage(page.id)}
          onDelete={() => onDeletePage(page.id)}
        />
      ))}
      {trashedSpaces.map((space) => (
        <TrashSpace
          key={space.id}
          space={space}
          onRestore={() => onRestoreSpace(space.id)}
          onDelete={() => onDeleteSpace(space.id)}
        />
      ))}
      {trashedPages.length === 0 && trashedSpaces.length === 0 && (
        <p className="text-center">You have no items in your trash</p>
      )}
    </div>
  )
}
