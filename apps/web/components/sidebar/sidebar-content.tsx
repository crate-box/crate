"use client"

import { Suspense } from "react"
import { useRouter } from "next/navigation"

import {
  DialogRoot,
  DialogTrigger,
  PopoverRoot,
  PopoverTrigger,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import {
  AddIcon,
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
        description: err.message,
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
        description: err.message,
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
            <SidebarButton icon={SearchIcon}>Search</SidebarButton>
          </DialogTrigger>
          <Search />
        </DialogRoot>
        <DialogRoot>
          <DialogTrigger asChild>
            <SidebarButton icon={CogIcon}>Settings</SidebarButton>
          </DialogTrigger>
          <Settings />
        </DialogRoot>
        <SidebarButton icon={AddIcon} onClick={onCreatePage}>
          New Page
        </SidebarButton>
        <SidebarButton icon={RocketIcon} onClick={onCreateSpace}>
          New Space
        </SidebarButton>
      </div>
      <Suspense>
        <SidebarPinned />
      </Suspense>
      <div className="flex flex-col items-stretch gap-0.5">
        <PopoverRoot>
          <PopoverTrigger asChild>
            <SidebarButton icon={PageIcon}>Pages</SidebarButton>
          </PopoverTrigger>
          <Pages />
        </PopoverRoot>
        <PopoverRoot>
          <PopoverTrigger asChild>
            <SidebarButton icon={DashboardIcon}>Spaces</SidebarButton>
          </PopoverTrigger>
          <Spaces />
        </PopoverRoot>
        <PopoverRoot>
          <PopoverTrigger asChild>
            <SidebarButton icon={ImportExportIcon}>Import</SidebarButton>
          </PopoverTrigger>
          <Import />
        </PopoverRoot>
        <PopoverRoot>
          <PopoverTrigger asChild>
            <SidebarButton icon={TrashIcon}>Trash</SidebarButton>
          </PopoverTrigger>
          <Trash />
        </PopoverRoot>
      </div>
    </div>
  )
}
