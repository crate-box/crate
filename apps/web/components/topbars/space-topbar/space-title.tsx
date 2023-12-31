"use client"

import * as React from "react"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"

import {
  Button,
  EmojiPicker,
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
  IconButton,
  Input,
  Label,
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import { MenuIcon } from "@acme/web-ui/icons"

import Icon from "~/components/icon"
import { useStore } from "~/hooks"
import type { RouterOutputs } from "~/lib/api"
import { api } from "~/lib/api"

interface UpdateSpaceFormInputs {
  title: string
  description: string
}

export default function SpaceTitle({
  space,
}: {
  space: RouterOutputs["space"]["byId"]
}) {
  const { toast } = useToast()
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useStore((state) => state.setIsSidebarOpen)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const context = api.useContext()

  const { mutateAsync: updateSpace } = api.space.update.useMutation({
    async onSuccess(data) {
      await context.space.byId.invalidate({ id: data.id })
      await context.space.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot update space",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const spaceForm = useForm<UpdateSpaceFormInputs>({
    defaultValues: {
      title: space?.title ?? "Untitled Space",
      description: space?.description ?? "Space Description",
    },
  })

  const onUpdateSpaceIcon = async (icon: string) => {
    if (!space) return
    await updateSpace({ id: space.id, data: { icon } })
  }

  const onUpdateSpaceTitle: SubmitHandler<UpdateSpaceFormInputs> = async (
    data
  ) => {
    if (!space) return
    await updateSpace({ id: space.id, data })
  }

  return (
    <div className="flex items-center">
      <IconButton
        className="mr-2"
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
      >
        <MenuIcon className="h-6 w-6" />
      </IconButton>
      <PopoverRoot>
        <PopoverTrigger asChild>
          <IconButton aria-label="Change space icon">
            <Icon type="Space" icon={space.icon} />
          </IconButton>
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent side="bottom" className="w-auto">
            <div className="mb-2 font-semibold">Choose an icon</div>
            <EmojiPicker
              onSelect={(emojiData) => onUpdateSpaceIcon(emojiData.unified)}
            />
            <PopoverArrow />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
      <PopoverRoot>
        <HoverCardRoot>
          <HoverCardTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="text"
                size="sm"
                className="max-w-[320px] px-2 font-medium leading-normal"
                aria-label="Change space title"
              >
                <span className="truncate">{space.title}</span>
              </Button>
            </PopoverTrigger>
          </HoverCardTrigger>
          <HoverCardPortal>
            <HoverCardContent>
              <p className="font-medium">{space.title}</p>
              <p className="text-slate-400">{space.description}</p>
              <HoverCardArrow />
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCardRoot>
        <PopoverPortal>
          <PopoverContent side="bottom" sideOffset={4}>
            <form
              className="flex flex-col items-stretch gap-4"
              onSubmit={spaceForm.handleSubmit(onUpdateSpaceTitle)}
            >
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  {...spaceForm.register("title")}
                  placeholder="Space title"
                  className="bg-slate-900"
                  aria-label="Space title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  {...spaceForm.register("description")}
                  placeholder="Space description"
                  className="bg-slate-900"
                  aria-label="Space description"
                />
              </div>
              <Button aria-label="Save">Save</Button>
            </form>
            <PopoverArrow />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  )
}
