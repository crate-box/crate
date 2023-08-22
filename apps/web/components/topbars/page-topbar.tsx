"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { SubmitHandler } from "react-hook-form"
import { useForm } from "react-hook-form"

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
  EmojiPicker,
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
  IconButton,
  Input,
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
  CodeIcon,
  CopyIcon,
  EyeIcon,
  LinkIcon,
  MoreHorizIcon,
  ShortcutIcon,
  StarIcon,
  TrashIcon,
} from "@acme/web-ui/icons"

import { useClipboard, useStore } from "~/hooks"
import { api } from "~/lib/api"
import { formatDate } from "~/lib/utils"
import Icon from "../icon"
import MenuButton from "./menu-button"
import MenuSwitch from "./menu-switch"

interface PageTitleFormInputs {
  title: string
}

export default function PageTitlebar({ id }: { id: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const { mode, setMode } = useStore()

  const context = api.useContext()
  const { data: page, status } = api.page.byId.useQuery({ id })
  const { data: spaces } = api.space.all.useQuery()
  const { mutateAsync: addPageToSpace } = api.space.addPage.useMutation({
    async onSuccess(data) {
      await context.space.byId.invalidate({ id: data.id })
      await context.page.byId.invalidate({ id: page?.id })
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot move the page",
        description: err.message,
      })
    },
  })
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

  const pageTitleForm = useForm<PageTitleFormInputs>({
    defaultValues: { title: page?.title ?? "Untitled" },
  })

  const toggleMode = () => {
    setMode(mode === "EDIT" ? "PREVIEW" : "EDIT")
    if (mode !== "PREVIEW") router.refresh()
  }

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

  const onMovePageToSpace = async (id: string) => {
    if (!page) return
    await addPageToSpace({ id, pageId: page.id })
    toast({
      variant: "success",
      title: "Moving the page successfully",
      description: `This page has been moved to space ID "${id}"`,
    })
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

  const onDeletePage = async () => {
    if (!page) return
    await deletePage({ id: page.id })
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

  if (status !== "success") return null

  return (
    <div className="flex h-10 items-center justify-between border-b border-slate-800 px-4 leading-none">
      <div className="flex items-center">
        <PopoverRoot>
          <PopoverTrigger asChild>
            <IconButton>
              <Icon type="Page" icon={page.icon} />
            </IconButton>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent side="bottom" className="w-auto p-2">
              <div className="mb-2 font-semibold">Pick a icon</div>
              <EmojiPicker
                onSelect={(emojiData) => onUpdatePageIcon(emojiData.unified)}
              />
              <PopoverArrow />
            </PopoverContent>
          </PopoverPortal>
        </PopoverRoot>
        <PopoverRoot>
          <PopoverTrigger asChild>
            <Button
              variant="text"
              size="sm"
              className="font-medium leading-none"
            >
              {page.title}
            </Button>
          </PopoverTrigger>
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
      {page.trashed && (
        <div className="flex items-center justify-center gap-2 text-destructive">
          <p>This page is currently in your trash.</p>{" "}
          <Button
            size="sm"
            variant="text"
            onClick={() => onUpdatePageTrashed(false)}
          >
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
      )}
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
                <MoreHorizIcon className="h-6 w-6" />
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
                      <h3 className="font-medium">Move to</h3>
                      {spaces?.length && spaces.length > 0 ? (
                        <div className="mt-2 flex flex-col items-stretch gap-1">
                          {spaces?.map((space) => (
                            <PopoverClose
                              key={space.id}
                              className={`flex h-8 select-none items-center justify-between rounded px-2 leading-none transition-colors duration-200 hover:bg-slate-700 ${
                                page.space?.id === space.id
                                  ? "pointer-events-none opacity-30"
                                  : "pointer-events-auto opacity-100"
                              }`}
                              onClick={() => onMovePageToSpace(space.id)}
                            >
                              <div className="flex items-center gap-3">
                                <Icon type="Space" icon={space.icon} />
                                <span>{space.title}</span>
                              </div>
                              <time
                                dateTime={space.createdAt.toISOString()}
                                className="text-slate-400"
                              >
                                {formatDate(space.createdAt)}
                              </time>
                            </PopoverClose>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center">You have no spaces</p>
                      )}
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
    </div>
  )
}
