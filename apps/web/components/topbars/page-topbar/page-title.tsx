"use client"

import * as React from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"

import {
  Button,
  EmojiPicker,
  IconButton,
  Input,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  Tooltip,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"

import Icon from "~/components/icon"
import type { RouterOutputs } from "~/lib/api"
import { api } from "~/lib/api"

interface PageTitleFormInputs {
  title: string
}

export default function PageTitle({
  page,
}: {
  page: RouterOutputs["page"]["byId"]
}) {
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
        description: err.message,
      })
    },
  })

  const pageTitleForm = useForm<PageTitleFormInputs>({
    defaultValues: { title: page?.title ?? "Untitled" },
  })

  const onUpdatePageIcon = async (icon: string) => {
    if (!page) return
    await updatePage({ id: page.id, data: { icon } })
  }

  const onUpdatePageTitle: SubmitHandler<PageTitleFormInputs> = async (
    data
  ) => {
    if (!page) return
    await updatePage({ id: page.id, data: { title: data.title } })
  }

  return (
    <div className="flex items-center">
      <PopoverRoot>
        <PopoverTrigger asChild>
          <IconButton>
            <Icon type="Page" icon={page.icon} />
          </IconButton>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent side="bottom" className="w-auto">
            <div className="mb-2 font-semibold">Choose an icon</div>
            <EmojiPicker
              onSelect={(emojiData) => onUpdatePageIcon(emojiData.unified)}
            />
            <PopoverArrow />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
      <PopoverRoot>
        <Tooltip text={page.title}>
          <PopoverTrigger asChild>
            <Button
              variant="text"
              size="sm"
              className="max-w-[320px] font-medium leading-normal"
            >
              <span className="truncate">{page.title}</span>
            </Button>
          </PopoverTrigger>
        </Tooltip>
        <PopoverPortal>
          <PopoverContent>
            <form
              className="flex items-center gap-2"
              onSubmit={pageTitleForm.handleSubmit(onUpdatePageTitle)}
            >
              <Input
                {...pageTitleForm.register("title")}
                placeholder="Page title"
                className="bg-slate-900"
              />
              <Button>Save</Button>
            </form>
            <PopoverArrow />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  )
}
