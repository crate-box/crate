"use client"

import Link from "next/link"

import { api } from "~/lib/api"
import Icon from "../icon"

export default function SidebarPinned() {
  const [pinnedPages] = api.page.all.useSuspenseQuery({
    pinned: true,
  })
  const [pinnedSpaces] = api.space.all.useSuspenseQuery({
    pinned: true,
  })

  return (
    <>
      {pinnedPages.map((page) => (
        <Link
          href={`/${page.id}`}
          key={page.id}
          className="flex h-8 select-none items-center gap-3 rounded px-2 leading-none transition-colors duration-200 hover:bg-slate-800"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center">
            <Icon type="Page" icon={page.icon} />
          </span>
          <div>{page.title}</div>
        </Link>
      ))}
      {pinnedSpaces.map((space) => (
        <Link
          href={`/space/${space.id}`}
          key={space.id}
          className="flex h-8 select-none items-center gap-3 rounded px-2 leading-none transition-colors duration-200 hover:bg-slate-800"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center">
            <Icon type="Space" icon={space.icon} />
          </span>
          <div>{space.title}</div>
        </Link>
      ))}
    </>
  )
}
