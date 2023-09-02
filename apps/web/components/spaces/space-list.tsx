import * as React from "react"
import Link from "next/link"

import { PopoverClose } from "@acme/web-ui"

import Icon from "~/components/icon"
import { api } from "~/lib/api"
import { formatDate } from "~/lib/utils"

export default function SpaceList() {
  const [spaces] = api.space.all.useSuspenseQuery()

  return (
    <div className="flex flex-col items-stretch gap-1 overflow-auto">
      {spaces.length > 0 ? (
        spaces.map((space) => (
          <PopoverClose key={space.id} asChild>
            <Link
              href={`/space/${space.id}`}
              className="flex h-9 cursor-pointer items-center justify-between rounded px-2 transition-colors duration-200 hover:bg-slate-800"
            >
              <div className="inline-flex items-center gap-2">
                <Icon type="Space" icon={space.icon} />
                <span className="truncate font-medium">{space.title}</span>
              </div>
              <div className="space-x-4">
                <time
                  dateTime={space.createdAt.toISOString()}
                  className="text-slate-500"
                >
                  {formatDate(space.createdAt)}
                </time>
              </div>
            </Link>
          </PopoverClose>
        ))
      ) : (
        <p className="text-center">You have no spaces</p>
      )}
    </div>
  )
}
