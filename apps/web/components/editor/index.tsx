"use client"

import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import debounce from "debounce"

import { useToast } from "@acme/web-ui/hooks"

import type { RouterOutputs } from "~/lib/api"
import { api } from "~/lib/api"
import CodeMirror from "./codemirror"

export default function Editor({
  page,
}: {
  page: RouterOutputs["page"]["byId"]
}) {
  const queryClient = useQueryClient()

  const { toast } = useToast()

  const context = api.useContext()
  const [settings] = api.settings.get.useSuspenseQuery()

  const { mutateAsync: updatePage } = api.page.update.useMutation({
    async onSuccess() {
      await context.page.all.invalidate()
      await context.page.byId.invalidate()
    },
    // optimistic updates
    async onMutate(data) {
      const key = getQueryKey(api.page.byId)
      await queryClient.cancelQueries({ queryKey: key })
      const prevPage = queryClient.getQueryData(key)
      queryClient.setQueryData(key, () => data)
      return prevPage
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot update the page body",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const debouncedUpdatePage = debounce(updatePage, 500)

  const onUpdateBody = async (text: string) => {
    if (!page) return
    await debouncedUpdatePage({ id: page.id, data: { body: text } })
  }

  return (
    <CodeMirror
      text={page.body}
      onTextChange={onUpdateBody}
      settings={{
        editorTabSize: settings.editorTabSize,
        editorHighlightActiveLine: settings.editorHighlightActiveLine,
        editorLineNumbers: settings.editorLineNumbers,
        editorAutocomplete: settings.editorAutocomplete,
        editorLineWrapping: settings.editorLineWrapping,
      }}
    />
  )
}
