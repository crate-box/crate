import * as React from "react"
import Link from "next/link"

import { PopoverClose } from "@acme/web-ui"

import Icon from "~/components/icon"
import { api } from "~/lib/api"
import { formatDate } from "~/lib/utils"

export default function PageList() {
  const [pages] = api.page.all.useSuspenseQuery()

  return (
    <div className="mt-2 flex flex-col items-stretch gap-1 overflow-auto">
      {pages.length > 0 ? (
        pages.map((page) => (
          <PopoverClose key={page.id} asChild>
            <Link
              href={`/${page.id}`}
              className="flex h-9 cursor-pointer items-center justify-between rounded px-2 transition-colors duration-200 hover:bg-slate-800"
            >
              <div className="inline-flex items-center gap-2">
                <Icon type="Page" icon={page.icon} />
                <span className="font-medium">{page.title}</span>
              </div>
              <div className="space-x-4">
                <time
                  dateTime={page.createdAt.toISOString()}
                  className="text-slate-500"
                >
                  {formatDate(page.createdAt)}
                </time>
              </div>
            </Link>
          </PopoverClose>
        ))
      ) : (
        <p className="text-center">You have no pages</p>
      )}
    </div>
  )
}
