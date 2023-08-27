import Link from "next/link"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"

import {
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
  Input,
  PopoverClose,
  Tooltip,
} from "@acme/web-ui"
import { RemoveIcon, UndoIcon } from "@acme/web-ui/icons"

import Icon from "~/components/icon"
import type { RouterOutputs } from "~/lib/api"
import type { InferElement } from "~/types"

interface TrashspaceItemProps {
  space: InferElement<RouterOutputs["space"]["all"]>
  onRestore: () => Promise<void>
  onDelete: () => Promise<void>
}

interface DeleteSpaceFormInputs {
  title: string
}

export default function TrashspaceItem({
  space,
  onRestore,
  onDelete,
}: TrashspaceItemProps) {
  const deleteForm = useForm<DeleteSpaceFormInputs>({
    defaultValues: { title: "" },
  })

  const onDeleteSubmit: SubmitHandler<DeleteSpaceFormInputs> = async (data) => {
    if (data.title !== space.title) return
    await onDelete()
  }

  return (
    <div className="flex min-h-[40px] items-center justify-between gap-2">
      <PopoverClose asChild>
        <Link
          href={`/space/${space.id}`}
          className="flex h-8 flex-1 items-center justify-between rounded px-2 transition-colors duration-200 ease-out hover:bg-slate-800"
        >
          <div className="flex items-center gap-2">
            <Icon type="Space" icon={space.icon} />
            <div className="truncate font-medium leading-normal">
              {space.title}
            </div>
          </div>
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
              <AlertTitle>Delete Space</AlertTitle>
              <AlertDescription>
                This will delete space &quot;{space.title}&quot; permanently.
                All pages in this space will be moved to trash. This action
                cannot be undone.
              </AlertDescription>
              <form
                className="flex flex-col items-stretch gap-2"
                onSubmit={deleteForm.handleSubmit(onDeleteSubmit)}
              >
                <Controller
                  name="title"
                  control={deleteForm.control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter the space title" />
                  )}
                />
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={deleteForm.watch("title") === ""}
                >
                  Delete this space permanently
                </Button>
                <AlertCancel asChild>
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                </AlertCancel>
              </form>
            </AlertContent>
          </AlertPortal>
        </AlertRoot>
      </div>
    </div>
  )
}
