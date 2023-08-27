"use client"

import * as React from "react"
import { Resizable } from "re-resizable"

import ProfileButton from "~/components/profile/profile-button"
import SidebarSkeleton from "../skeletons/sidebar-skeleton"
import SidebarContent from "./sidebar-content"

export default function Sidebar() {
  return (
    <Resizable
      className="relative min-w-[240px] bg-slate-950"
      defaultSize={{ width: 240, height: "auto" }}
      minWidth={240}
      maxWidth={400}
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
    >
      <div className="flex h-full w-full flex-col items-stretch gap-2">
        <React.Suspense fallback={<SidebarSkeleton />}>
          <ProfileButton />
          <SidebarContent />
        </React.Suspense>
      </div>
    </Resizable>
  )
}
