"use client"

import Sidebar from "~/components/sidebar"
import { useMediaQueries, useStore } from "~/hooks"

export default function AppInner({ children }: React.PropsWithChildren) {
  const sidebarWidth = useStore((state) => state.sidebarWidth)
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)
  const [isTablet] = useMediaQueries(["(max-width: 768px)"])

  return (
    <>
      <Sidebar />
      <div
        className="w-screen flex-1"
        style={{
          marginLeft: isTablet
            ? "0px"
            : isSidebarOpen
            ? sidebarWidth + "px"
            : "0px",
        }}
      >
        {children}
      </div>
    </>
  )
}
