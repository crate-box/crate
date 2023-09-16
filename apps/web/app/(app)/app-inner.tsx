"use client"

import Sidebar from "~/components/sidebar"
import { useMediaQueries, useStore } from "~/hooks"

export default function AppInner({ children }: React.PropsWithChildren) {
  const [isTablet] = useMediaQueries(["(max-width: 768px)"])
  const sidebarWidth = useStore((state) => state.sidebarWidth)
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)

  return (
    <>
      <Sidebar />
      <div
        className="relative w-screen flex-1 delay-100 duration-300 ease-in-out"
        style={{
          paddingLeft: isTablet ? "0px" : isSidebarOpen ? sidebarWidth : "0px",
          transform:
            isTablet && isSidebarOpen
              ? `translateX(${sidebarWidth}px)`
              : `translateX(0px)`,
        }}
      >
        {children}
      </div>
    </>
  )
}
