import Link from "next/link"

import {
  AlertAction,
  AlertCancel,
  AlertContent,
  AlertDescription,
  AlertOverlay,
  AlertPortal,
  AlertRoot,
  AlertTitle,
  AlertTrigger,
  Button,
  IconButton,
  PopoverClose,
  Tooltip,
} from "@acme/web-ui"
import { RemoveIcon, UndoIcon } from "@acme/web-ui/icons"

import Icon from "~/components/icon"
import type { RouterOutputs } from "~/lib/api"
import type { InferElement } from "~/types"

interface TrashPageProps {
  page: InferElement<RouterOutputs["page"]["all"]>
  onRestore: () => void
  onDelete: () => void
}

export default function TrashPage({
  page,
  onRestore,
  onDelete,
}: TrashPageProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <PopoverClose asChild>
        <Link
          href={`/${page.id}`}
          className="flex h-8 flex-1 items-center justify-between rounded px-2 transition-colors duration-200 ease-out hover:bg-slate-800"
        >
          <div className="flex min-h-[32px] items-center gap-2">
            <Icon type="Page" icon={page.icon} />
            <div className="truncate font-medium leading-normal">
              {page.title}
            </div>
          </div>
          {page.space?.title && (
            <div className="truncate text-slate-500">{page.space.title}</div>
          )}
        </Link>
      </PopoverClose>
      <div className="flex items-center gap-2">
        <Tooltip text="Restore">
          <IconButton className="hover:bg-slate-700" onClick={onRestore}>
            <UndoIcon className="h-[18px] w-[18px]" />
          </IconButton>
        </Tooltip>
        <AlertRoot>
          <Tooltip text="Delete">
            <AlertTrigger asChild>
              <IconButton className="hover:bg-slate-700">
                <RemoveIcon className="h-[18px] w-[18px]" />
              </IconButton>
            </AlertTrigger>
          </Tooltip>
          <AlertPortal>
            <AlertOverlay />
            <AlertContent>
              <AlertTitle>
                Delete page &quot;{page.title}&quot; permanently
              </AlertTitle>
              <AlertDescription>
                This will delete the page permanently. This action cannot be
                undone.
              </AlertDescription>
              <div className="flex items-center justify-end gap-2">
                <AlertAction asChild>
                  <Button variant="destructive" onClick={onDelete}>
                    Delete
                  </Button>
                </AlertAction>
                <AlertCancel asChild>
                  <Button variant="text">Cancel</Button>
                </AlertCancel>
              </div>
            </AlertContent>
          </AlertPortal>
        </AlertRoot>
      </div>
    </div>
  )
}
