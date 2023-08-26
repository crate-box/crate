"use client"

import * as React from "react"

import ProfileButton from "~/components/profile/profile-button"
import SidebarSkeleton from "../skeletons/sidebar-skeleton"
import SidebarContent from "./sidebar-content"

export default function Sidebar() {
  return (
    <nav className="relative min-w-[240px] bg-slate-950">
      <div className="flex h-full w-full flex-col items-stretch gap-2">
        <React.Suspense fallback={<SidebarSkeleton />}>
          <ProfileButton />
          <SidebarContent />
        </React.Suspense>
      </div>
      <div className="absolute right-0 top-0 h-full w-[2px] bg-destructive">
        &nbsp;
      </div>
    </nav>
  )
}
