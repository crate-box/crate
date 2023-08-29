import * as React from "react"

import { IconButton } from "@acme/web-ui"
import { MenuIcon } from "@acme/web-ui/icons"

import { useStore } from "~/hooks"

export default function Topbar() {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)
  const setIsSidebarOpen = useStore((state) => state.setIsSidebarOpen)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-10 items-center justify-between border-b border-slate-800 px-4 leading-none">
      <IconButton onClick={toggleSidebar} aria-label="Toggle sidebar">
        <MenuIcon className="h-6 w-6" />
      </IconButton>
    </div>
  )
}
