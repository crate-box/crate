"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  IconButton,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import {
  AddIcon,
  ClearIcon,
  CogIcon,
  DashboardIcon,
  ImportExportIcon,
  PageIcon,
  RocketIcon,
  SearchIcon,
  TrashIcon,
} from "@acme/web-ui/icons"

import { api } from "~/lib/api"
import Import from "../import"
import Pages from "../pages"
import Search from "../search"
import Settings from "../settings"
import Spaces from "../spaces"
import Trash from "../trash"
import SidebarButton from "./sidebar-button"
import SidebarPinned from "./sidebar-pinned"

export default function SidebarContent() {
  const router = useRouter()
  const { toast } = useToast()

  const context = api.useContext()
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
  const { mutateAsync: createSpace } = api.space.create.useMutation({
    async onSuccess(data) {
      router.push(`/space/${data.id}`)
      await context.space.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot create space",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const onCreatePage = async () => {
    await createPage({
      data: {
        title: "Untitled",
      },
    })
  }

  const onCreateSpace = async () => {
    await createSpace({
      data: {
        title: "Untitled space",
        description: "Space description",
      },
    })
  }

  return (
    <div className="flex flex-col items-stretch gap-2 px-2">
      <div className="flex flex-col items-stretch gap-0.5">
        <DialogRoot>
          <DialogTrigger asChild>
            <SidebarButton icon={SearchIcon} aria-label="Search">
              Search
            </SidebarButton>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className="flex max-h-[80vh] min-h-[40vh] min-w-[540px] flex-col items-stretch">
              <DialogTitle>Search</DialogTitle>
              <Search />
              <DialogClose asChild>
                <IconButton
                  size="sm"
                  className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
                  aria-label="Close"
                >
                  <ClearIcon className="h-[18px] w-[18px]" />
                </IconButton>
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
        <DialogRoot>
          <DialogTrigger asChild>
            <SidebarButton icon={CogIcon} aria-label="Settings">
              Settings
            </SidebarButton>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className="h-[80vh] min-w-[600px]">
              <DialogTitle>Settings</DialogTitle>
              <Settings />
              <DialogClose asChild>
                <IconButton
                  size="sm"
                  className="absolute right-2 top-2 text-slate-500 hover:text-slate-300"
                  aria-label="Close"
                >
                  <ClearIcon className="h-[18px] w-[18px]" />
                </IconButton>
              </DialogClose>
            </DialogContent>
          </DialogPortal>
        </DialogRoot>
        <SidebarButton
          icon={AddIcon}
          onClick={onCreatePage}
          aria-label="New Page"
        >
          New Page
        </SidebarButton>
        <SidebarButton
          icon={RocketIcon}
          onClick={onCreateSpace}
          aria-label="New Space"
        >
          New Space
        </SidebarButton>
      </div>
      <Suspense>
        <SidebarPinned />
      </Suspense>
      <div className="flex flex-col items-stretch gap-0.5">
        <PopoverRoot>
          <PopoverTrigger asChild>
            <SidebarButton icon={PageIcon} aria-label="Pages">
              Pages
            </SidebarButton>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent
              side="right"
              sideOffset={12}
              className="flex h-[40vh] min-w-[480px] flex-col items-stretch border border-slate-800 bg-slate-900 shadow-2xl"
            >
              <Pages />
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
        <PopoverRoot>
          <PopoverTrigger asChild>
            <SidebarButton icon={DashboardIcon} aria-label="Spaces">
              Spaces
            </SidebarButton>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent
              side="right"
              sideOffset={12}
              className="flex h-[40vh] min-w-[480px] flex-col items-stretch border border-slate-800 bg-slate-900 shadow-2xl"
            >
              <Spaces />
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
        <PopoverRoot>
          <PopoverTrigger asChild>
            <SidebarButton icon={ImportExportIcon} aria-label="Import">
              Import
            </SidebarButton>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent
              side="right"
              sideOffset={12}
              className="flex h-[25vh] min-w-[400px] flex-col items-stretch border border-slate-800 bg-slate-900 shadow-2xl"
            >
              <Import />
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
        <PopoverRoot>
          <PopoverTrigger asChild>
            <SidebarButton icon={TrashIcon} aria-label="Trash">
              Trash
            </SidebarButton>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent
              side="right"
              sideOffset={12}
              className="flex h-[40vh] min-w-[540px] flex-col items-stretch gap-2 border border-slate-800 bg-slate-900 shadow-2xl"
            >
              <Trash />
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
      </div>
    </div>
  )
}
