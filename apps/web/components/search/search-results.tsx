import Link from "next/link"

import { DialogClose } from "@acme/web-ui"

import Icon from "~/components/icon"
import { api } from "~/lib/api"
import { formatDate } from "~/lib/utils"

export default function SearchResults({ query }: { query: string }) {
  const [pages] = api.page.all.useSuspenseQuery({
    query,
  })
  const [spaces] = api.space.all.useSuspenseQuery({
    query,
  })

  return (
    <div className="mt-2 flex flex-1 flex-col items-stretch gap-1 overflow-auto">
      {pages.length === 0 && spaces.length === 0 && (
        <p className="text-center">No results</p>
      )}
      {pages.map((page) => (
        <DialogClose asChild key={page.id}>
          <Link
            href={`/${page.id}`}
            className="flex h-9 cursor-pointer items-center justify-between rounded px-2 transition-colors duration-200 hover:bg-slate-800"
          >
            <div className="inline-flex items-center gap-2">
              <Icon type="Page" icon={page.icon} />
              <span className="truncate font-medium">{page.title}</span>
            </div>
            <div className="space-x-4">
              <span>Page</span>
              <time
                dateTime={page.createdAt.toISOString()}
                className="text-slate-500"
              >
                {formatDate(page.createdAt)}
              </time>
            </div>
          </Link>
        </DialogClose>
      ))}
      {spaces.map((space) => (
        <DialogClose asChild key={space.id}>
          <Link
            href={`/space/${space.id}`}
            className="flex h-9 cursor-pointer items-center justify-between rounded px-2 transition-colors duration-200 hover:bg-slate-800"
          >
            <div className="inline-flex items-center gap-2">
              <Icon type="Space" icon={space.icon} />
              <span className="truncate font-medium">{space.title}</span>
            </div>
            <div className="space-x-4">
              <span>Space</span>
              <time
                dateTime={space.createdAt.toISOString()}
                className="text-slate-500"
              >
                {formatDate(space.createdAt)}
              </time>
            </div>
          </Link>
        </DialogClose>
      ))}
    </div>
  )
}
