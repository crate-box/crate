"use client"

import Sidebar from "~/components/sidebar"
import { useStore } from "~/hooks"

export default function AppInner({ children }: React.PropsWithChildren) {
  const sidebarWidth = useStore((state) => state.sidebarWidth)
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)

  return (
    <>
      <Sidebar />
      <div
        className="flex-1"
        style={{ marginLeft: isSidebarOpen ? sidebarWidth + "px" : "0px" }}
      >
        {children}
      </div>
    </>
  )
}
