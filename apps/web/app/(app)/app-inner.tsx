"use client"

import * as React from "react"

import Sidebar from "~/components/sidebar"
import { useMediaQueries, useMounted, useStore } from "~/hooks"

export default function AppInner({ children }: React.PropsWithChildren) {
  const mounted = useMounted()
  const [isTablet] = useMediaQueries(["(max-width: 768px)"])
  const sidebarWidth = useStore((state) => state.sidebarWidth)
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)

  const paddingValue = React.useMemo(
    () => (isTablet ? 0 : isSidebarOpen ? sidebarWidth : 0),
    [isTablet, sidebarWidth, isSidebarOpen]
  )
  const translateValue = React.useMemo(
    () => (isTablet && isSidebarOpen ? sidebarWidth : 0),
    [isTablet, sidebarWidth, isSidebarOpen]
  )

  return mounted ? (
    <>
      <Sidebar />
      <div
        className="relative w-screen flex-1 delay-100 duration-300 ease-in-out"
        style={{
          paddingLeft: paddingValue,
          transform: `translateX(${translateValue}px)`,
        }}
      >
        {children}
      </div>
    </>
  ) : null
}
