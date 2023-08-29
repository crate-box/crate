"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import { DevicesIcon } from "@acme/web-ui/icons"

import { api } from "~/lib/api"

const localImportSchema = z.object({
  files: z.custom(
    (value) => (value as FileList)?.length > 0,
    "Provide at least a file"
  ),
})

interface ImportFormInputs {
  files: FileList
}

export default function ImportForm() {
  const router = useRouter()
  const { register, handleSubmit, watch } = useForm<ImportFormInputs>({
    defaultValues: { files: undefined },
    resolver: zodResolver(localImportSchema),
  })

  const { toast } = useToast()

  const context = api.useContext()
  const { mutate: createPage } = api.page.create.useMutation({
    async onSuccess(data) {
      router.push(`/${data.id}`)
      await context.page.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot create page from uploaded file",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const onSubmit: SubmitHandler<ImportFormInputs> = (data) => {
    try {
      if (data.files.length === 0) return
      const file = data.files[0]!
      const reader = new FileReader()
      reader.readAsText(file)

      reader.addEventListener("loadend", (e) => {
        const fr = e.target!
        if (!fr.result) {
          throw new Error("No result from reading the uploaded file")
        }
        createPage({
          data: {
            title: `Page imported from ${file.name}`,
            body: fr.result as string,
          },
        })
      })
      reader.addEventListener("error", () => {
        throw new Error("Error reading the uploaded file")
      })
    } catch (err) {
      if (err instanceof Error) {
        toast({
          variant: "destructive",
          title: "Cannot create page from the uploaded file",
          description: err.message,
        })
      }
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-stretch gap-2"
      >
        <label
          htmlFor="local"
          className="flex h-8 items-center gap-3 rounded px-2 transition-colors duration-200 ease-out hover:bg-slate-800"
        >
          <DevicesIcon className="h-6 w-6" />
          <span>
            {watch("files")?.length > 0
              ? watch("files")[0]?.name
              : "Choose a file from your local device"}
          </span>
        </label>
        <input
          type="file"
          id="local"
          className="hidden"
          {...register("files")}
        />
        <Button aria-label="Import page from local file" variant="outline">
          Import page
        </Button>
      </form>
    </div>
  )
}
