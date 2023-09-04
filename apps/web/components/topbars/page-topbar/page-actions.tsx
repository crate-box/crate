"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
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
  ClearIcon,
  CodeIcon,
  CopyIcon,
  EyeIcon,
  LinkIcon,
  MoreHorizIcon,
  ShortcutIcon,
  StarIcon,
  TrashIcon,
} from "@acme/web-ui/icons"

import Icon from "~/components/icon"
import ListSkeleton from "~/components/skeletons/list-skeleton"
import { useClipboard, useStore } from "~/hooks"
import type { RouterOutputs } from "~/lib/api"
import { api } from "~/lib/api"
import { formatDate } from "~/lib/utils"
import MenuButton from "../menu-button"
import MenuSwitch from "../menu-switch"
import PageMovePopover from "./page-move-popover"

export default function PageActions({
  page,
}: {
  page: RouterOutputs["page"]["byId"]
}) {
  const router = useRouter()
  const { toast } = useToast()

  const { mode, setMode } = useStore()

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
  const { mutateAsync: createPage } = api.page.create.useMutation({
    async onSuccess(data) {
      router.push(`/${data.id}`)
      await context.page.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot create page",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const { copy } = useClipboard()

  const toggleMode = () => {
    setMode(mode === "EDIT" ? "PREVIEW" : "EDIT")
    if (mode !== "PREVIEW") router.refresh()
  }

  const onUpdatePagePinned = async (checked: boolean) => {
    if (!page) return
    await updatePage({ id: page.id, data: { pinned: checked } })
  }

  const onUpdatePageTrashed = async (trashed: boolean) => {
    if (!page) return
    if (trashed) router.push("/welcome")
    await updatePage({ id: page.id, data: { trashed } })
  }

  const onCopyLink = async () => {
    try {
      const isSuccess = await copy(window.location.href)
      if (isSuccess) {
        toast({
          variant: "success",
          title: "Copy link to clipboard",
          description: "The page's link has been copied to clipboard",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Cannot copy link to clipboard",
          description:
            "There was an error copying the page's link to clipboard",
        })
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Cannot copy link to clipboard",
        description: "There was an error copying the page link to clipboard",
      })
    }
  }

  const onDuplicatePage = async () => {
    if (!page) return
    await createPage({
      data: {
        icon: page.icon ?? undefined,
        title: page.title,
        body: page.body,
      },
    })
  }

  return (
    <div className="flex items-center gap-2">
      {page.space && (
        <Tooltip text={page.space.title}>
          <Link
            href={`/space/${page.space.id}`}
            className="inline-flex h-7 items-center justify-center gap-3 rounded px-2 font-medium leading-normal transition-colors duration-200 ease-out hover:bg-slate-800"
          >
            <Icon type="Space" icon={page.space.icon} />
          </Link>
        </Tooltip>
      )}
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <div className="select-none text-slate-400">
            <span className="hidden phone:inline">Edited </span>
            {formatDate(page.updatedAt)}
          </div>
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent sideOffset={2} className="text-slate-400">
            <p>
              Created by{" "}
              <em className="font-medium not-italic text-slate-200">
                {page.createdBy.name}
              </em>{" "}
              on {formatDate(page.createdAt)}
            </p>
            {page.editedBy && (
              <p className="mt-1">
                Edited by{" "}
                <em className="font-medium not-italic text-slate-200">
                  {page.editedBy.name}
                </em>{" "}
                on {formatDate(page.updatedAt)}
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
                <MenuButton
                  icon={mode === "EDIT" ? EyeIcon : CodeIcon}
                  onClick={toggleMode}
                  aria-label="Toggle mode"
                >
                  {mode === "EDIT" ? "Preview" : "Edit"}
                </MenuButton>
              </PopoverClose>
              <hr className="my-1 text-slate-600" />
              <PopoverRoot>
                <PopoverTrigger asChild>
                  <MenuButton icon={ShortcutIcon} aria-label="Move page">
                    Move to
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
                    <h3 className="font-medium">Move to</h3>
                    <React.Suspense
                      fallback={
                        <ListSkeleton
                          size={6}
                          elementClassName="bg-slate-700"
                        />
                      }
                    >
                      <PageMovePopover page={page} />
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
                <MenuSwitch
                  icon={StarIcon}
                  checked={page.pinned}
                  onCheckedChange={onUpdatePagePinned}
                  aria-label="Toggle pin sidebar"
                >
                  Pin to sidebar
                </MenuSwitch>
              </PopoverClose>
              <PopoverClose asChild>
                <MenuButton
                  icon={LinkIcon}
                  onClick={onCopyLink}
                  aria-label="Copy page link"
                >
                  Copy link
                </MenuButton>
              </PopoverClose>
              <PopoverClose asChild>
                <MenuButton
                  icon={CopyIcon}
                  onClick={onDuplicatePage}
                  aria-label="Duplicate page"
                >
                  Duplicate
                </MenuButton>
              </PopoverClose>
              <hr className="my-1 text-slate-600" />
              <PopoverClose asChild>
                <MenuButton
                  icon={TrashIcon}
                  onClick={() => onUpdatePageTrashed(true)}
                  disabled={page.trashed}
                  aria-label="Move page to trash"
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
