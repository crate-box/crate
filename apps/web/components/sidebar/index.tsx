"use client"

import * as React from "react"
import type { ResizeCallback } from "re-resizable"
import { Resizable } from "re-resizable"

import ProfileButton from "~/components/profile/profile-button"
import { useMediaQueries, useMounted, useStore } from "~/hooks"
import SidebarSkeleton from "../skeletons/sidebar-skeleton"
import SidebarContent from "./sidebar-content"

const SIDEBAR_DEFAULT_WIDTH = 240
const SIDEBAR_MAX_WIDTH = 360

export default function Sidebar() {
  const mounted = useMounted()
  const setSidebarWidth = useStore((state) => state.setSidebarWidth)
  const isSidebarOpen = useStore((state) => state.isSidebarOpen)

  const onResizeStop: ResizeCallback = (_, __, elemRef) => {
    setSidebarWidth(elemRef.getBoundingClientRect().width)
  }

  const [isTablet] = useMediaQueries(["(max-width: 768px)"])

  return mounted ? (
    <div
      className={`absolute left-0 top-0 z-10 h-screen ${
        isSidebarOpen
          ? "pointer-events-auto translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-full opacity-0"
      } shadow-2xl transition-all duration-300 tablet:shadow-none`}
    >
      <Resizable
        className="w-full min-w-[240px] max-w-full bg-slate-950 transition-all duration-300 tablet:w-auto tablet:max-w-[400px]"
        defaultSize={{
          width: isTablet ? "60vw" : SIDEBAR_DEFAULT_WIDTH,
          height: "100%",
        }}
        minWidth={isTablet ? "60vw" : SIDEBAR_DEFAULT_WIDTH}
        maxWidth={isTablet ? "60vw" : SIDEBAR_MAX_WIDTH}
        enable={{
          top: false,
          right: true,
          bottom: false,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
        onResizeStop={onResizeStop}
        as="aside"
      >
        <div className="flex h-full w-full flex-col items-stretch gap-2">
          <React.Suspense fallback={<SidebarSkeleton />}>
            <ProfileButton />
            <SidebarContent />
          </React.Suspense>
        </div>
      </Resizable>
    </div>
  ) : null
}
