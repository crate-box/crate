"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import {
  Avatar,
  AvatarStack,
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
  IconButton,
  PopoverAnchor,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  Tooltip,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import {
  AddIcon,
  ClearIcon,
  MoreHorizIcon,
  PageIcon,
  StarIcon,
  TrashIcon,
} from "@acme/web-ui/icons"

import ListSkeleton from "~/components/skeletons/list-skeleton"
import type { RouterOutputs } from "~/lib/api"
import { api } from "~/lib/api"
import { formatDate } from "~/lib/utils"
import MenuButton from "../menu-button"
import MenuSwitch from "../menu-switch"
import AddPagePopover from "./add-page-popover"
import SpaceMembersPopover from "./space-members-popover"

export default function SpaceActions({
  space,
}: {
  space: RouterOutputs["space"]["byId"]
}) {
  const router = useRouter()
  const { toast } = useToast()

  const context = api.useContext()

  const { mutateAsync: createPage } = api.page.create.useMutation({
    async onSuccess() {
      await context.page.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot create new page",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const { mutateAsync: addPageToSpace } = api.space.addPage.useMutation({
    async onSuccess(data) {
      await context.space.byId.invalidate({ id: data.id })
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot add page to this space",
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
        title: "Cannot update space",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const onUpdateSpacePinned = async (checked: boolean) => {
    if (!space) return
    await updateSpace({ id: space.id, data: { pinned: checked } })
  }

  const onUpdateSpaceTrashed = async (trashed: boolean) => {
    if (!space) return
    if (trashed) router.push("/welcome")
    await updateSpace({ id: space.id, data: { trashed } })
  }

  const onNewPage = async () => {
    if (!space) return
    const page = await createPage({
      data: {
        title: "Untitled",
      },
    })
    await addPageToSpace({ pageId: page.id, id: space.id })
  }

  return (
    <div className="flex items-center gap-2">
      <PopoverRoot>
        <Tooltip text={space.members.length + " members"}>
          <PopoverTrigger className="h-8 rounded px-2 transition-colors duration-200 hover:bg-slate-800">
            <AvatarStack aria-label="Space members" role="button">
              {space.members.map((member) => (
                <Avatar
                  key={member.id}
                  src={member?.image ?? undefined}
                  alt={member?.name ?? undefined}
                  fallback={member?.name ?? ""}
                />
              ))}
            </AvatarStack>
          </PopoverTrigger>
        </Tooltip>
        <PopoverPortal>
          <PopoverContent sideOffset={4} className="min-w-[440px]">
            <SpaceMembersPopover space={space} />
            <PopoverClose asChild>
              <IconButton
                size="sm"
                className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
                aria-label="Close"
              >
                <ClearIcon className="h-[18px] w-[18px]" />
              </IconButton>
            </PopoverClose>
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <div className="select-none text-slate-400">
            <span className="hidden phone:inline">Edited </span>
            {formatDate(space.updatedAt)}
          </div>
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent sideOffset={2} className="text-slate-400">
            <p>
              Created by{" "}
              <em className="font-medium not-italic text-slate-200">
                {space.createdBy.name}
              </em>{" "}
              on {formatDate(space.createdAt)}
            </p>
            {space.editedBy && (
              <p className="mt-1">
                Edited by{" "}
                <em className="font-medium not-italic text-slate-200">
                  {space.editedBy.name}
                </em>{" "}
                on {formatDate(space.updatedAt)}
              </p>
            )}
            <HoverCardArrow />
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCardRoot>
      <PopoverRoot>
        <Tooltip text="More actions">
          <PopoverTrigger asChild>
            <IconButton aria-label="More actions">
              <MoreHorizIcon className="h-6 w-6" />
            </IconButton>
          </PopoverTrigger>
        </Tooltip>
        <PopoverPortal>
          <PopoverContent className="p-2">
            <div className="flex flex-col items-stretch">
              <PopoverClose asChild>
                <MenuSwitch
                  aria-label="Toggle pin sidebar"
                  icon={StarIcon}
                  checked={space.pinned}
                  onCheckedChange={onUpdateSpacePinned}
                >
                  Pin to sidebar
                </MenuSwitch>
              </PopoverClose>
              <hr className="my-1 text-slate-600" />
              <PopoverClose asChild>
                <MenuButton
                  icon={AddIcon}
                  onClick={onNewPage}
                  aria-label="Add new page"
                >
                  New page
                </MenuButton>
              </PopoverClose>
              <PopoverRoot>
                <PopoverTrigger asChild>
                  <MenuButton icon={PageIcon} aria-label="Add an existing page">
                    Add an existing page
                  </MenuButton>
                </PopoverTrigger>
                <PopoverAnchor asChild>
                  <div className="pointer-events-none fixed left-0 top-0 opacity-0 tablet:relative" />
                </PopoverAnchor>
                <PopoverPortal>
                  <PopoverContent
                    side="left"
                    sideOffset={12}
                    className="-mr-3 h-screen w-screen tablet:mr-0 tablet:h-[280px] tablet:w-[320px]"
                  >
                    <h3 className="font-medium">Add an existing page</h3>
                    <React.Suspense
                      fallback={
                        <ListSkeleton
                          size={6}
                          elementClassName="bg-slate-700"
                        />
                      }
                    >
                      <AddPagePopover space={space} />
                    </React.Suspense>
                    <PopoverClose asChild>
                      <IconButton
                        size="sm"
                        className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
                        aria-label="Close"
                      >
                        <ClearIcon className="h-[18px] w-[18px]" />
                      </IconButton>
                    </PopoverClose>
                  </PopoverContent>
                </PopoverPortal>
              </PopoverRoot>
              <hr className="my-1 text-slate-600" />
              <PopoverClose asChild>
                <MenuButton
                  icon={TrashIcon}
                  onClick={() => onUpdateSpaceTrashed(true)}
                  aria-label="Move space to trash"
                >
                  Delete
                </MenuButton>
              </PopoverClose>
            </div>
            <PopoverArrow />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  )
}
