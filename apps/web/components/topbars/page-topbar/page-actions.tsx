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
  PopoverArrow,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  Tooltip,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import {
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
import Spinner from "~/components/spinner"
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
        description: err.message,
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
        description: err.message,
      })
    },
  })
  const [_, copy] = useClipboard()

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
      await copy(window.location.href)
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
        <Link
          href={`/space/${page.space.id}`}
          className="inline-flex h-7 items-center justify-center gap-3 rounded px-2 font-medium leading-none transition-colors duration-200 ease-out hover:bg-slate-800"
        >
          <Icon type="Space" icon={page.space.icon} />
          <span>{page.space.title}</span>
        </Link>
      )}
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <div className="select-none text-slate-400">
            Edited {formatDate(page.updatedAt)}
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
            <IconButton>
              <MoreHorizIcon className="h-5 w-5" />
            </IconButton>
          </PopoverTrigger>
        </Tooltip>
        <PopoverPortal>
          <PopoverContent className="p-2">
            <div className="flex flex-col items-stretch">
              <MenuButton
                icon={mode === "EDIT" ? EyeIcon : CodeIcon}
                onClick={toggleMode}
              >
                {mode === "EDIT" ? "Preview" : "Edit"}
              </MenuButton>
              <hr className="my-1 text-slate-600" />
              <PopoverRoot>
                <PopoverTrigger asChild>
                  <MenuButton icon={ShortcutIcon}>Move to</MenuButton>
                </PopoverTrigger>
                <PopoverPortal>
                  <PopoverContent side="left" sideOffset={12}>
                    <React.Suspense
                      fallback={<Spinner text="Loading spaces" />}
                    >
                      <PageMovePopover page={page} />
                    </React.Suspense>
                  </PopoverContent>
                </PopoverPortal>
              </PopoverRoot>
              <hr className="my-1 text-slate-600" />
              <MenuSwitch
                icon={StarIcon}
                checked={page.pinned}
                onCheckedChange={onUpdatePagePinned}
              >
                Pin to sidebar
              </MenuSwitch>
              <MenuButton icon={LinkIcon} onClick={onCopyLink}>
                Copy link
              </MenuButton>
              <MenuButton icon={CopyIcon} onClick={onDuplicatePage}>
                Duplicate
              </MenuButton>
              <hr className="my-1 text-slate-600" />
              <MenuButton
                icon={TrashIcon}
                onClick={() => onUpdatePageTrashed(true)}
                disabled={page.trashed}
              >
                Delete
              </MenuButton>
            </div>
            <PopoverArrow />
          </PopoverContent>
        </PopoverPortal>
      </PopoverRoot>
    </div>
  )
}
