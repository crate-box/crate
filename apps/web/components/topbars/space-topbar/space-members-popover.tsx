"use client"

import * as React from "react"
import { useForm } from "react-hook-form"

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
  Avatar,
  Button,
  IconButton,
  Input,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import { ClearIcon, RemoveIcon } from "@acme/web-ui/icons"

import { useDebounce } from "~/hooks"
import type { RouterOutputs } from "~/lib/api"
import { api } from "~/lib/api"

interface AddMemberFormInputs {
  query: string
}

export default function SpaceMembersPopover({
  space,
}: {
  space: RouterOutputs["space"]["byId"]
}) {
  const { toast } = useToast()

  const context = api.useContext()
  const { mutateAsync: addMember } = api.space.addMember.useMutation({
    async onSuccess(data) {
      await context.space.byId.invalidate({ id: data.id })
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot add member",
        description: err.message,
      })
    },
  })
  const { mutateAsync: removeMember } = api.space.removeMember.useMutation({
    async onSuccess(data) {
      await context.space.byId.invalidate({ id: data.id })
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot remove member",
        description: err.message,
      })
    },
  })

  const addMemberForm = useForm<AddMemberFormInputs>({
    defaultValues: {
      query: "",
    },
  })

  const debouncedMemberQuery = useDebounce(addMemberForm.watch("query"))
  const { data: candidates } = api.user.search.useQuery(
    {
      query: debouncedMemberQuery,
    },
    { enabled: debouncedMemberQuery !== "" }
  )

  const onAddSpaceMember = async (memberId: string) => {
    if (!space) return
    await addMember({ memberId, id: space.id })
  }

  const onRemoveSpaceMember = async (memberId: string) => {
    if (!space) return
    await removeMember({ memberId, id: space.id })
  }

  return (
    <>
      <div className="font-medium">Members</div>
      <div className="mt-2 flex flex-col items-stretch">
        <div className="relative">
          <form className="relative flex items-center gap-2">
            <Input
              {...addMemberForm.register("query")}
              placeholder="Find user by email or ID"
              className="bg-slate-900"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 inline-flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full bg-slate-700 transition-[opacity] duration-200 data-[hidden=true]:opacity-0"
              data-hidden={addMemberForm.watch("query") === ""}
              onClick={() => {
                addMemberForm.reset()
                addMemberForm.setFocus("query")
              }}
            >
              <ClearIcon className="h-3.5 w-3.5" />
            </button>
          </form>
          {candidates && candidates.length > 0 && (
            <div className="absolute top-full z-10 mt-1 flex w-full flex-col items-stretch gap-1 rounded bg-slate-900 p-1">
              {candidates?.map((c) => (
                <button
                  key={c.id}
                  className={`flex h-10 items-center justify-between rounded px-2 hover:bg-slate-700 ${
                    space.members.map(({ id }) => id).includes(c.id)
                      ? "pointer-events-none opacity-40"
                      : "pointer-events-auto opacity-100"
                  }`}
                  onClick={() => onAddSpaceMember(c.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={c.image ?? undefined}
                      alt={c.name ?? undefined}
                      fallback={c?.name ?? ""}
                    />
                    <div className="font-medium">{c.name}</div>
                  </div>
                  <div className="text-slate-400">{c.email}</div>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col items-stretch gap-1">
          {space.members.map((member) => (
            <div
              key={member.id}
              className="flex h-9 items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src={member?.image ?? undefined}
                  alt={member?.name ?? undefined}
                  fallback={member?.name ?? ""}
                />
                <span>{member.name}</span>
              </div>
              <AlertRoot>
                <AlertTrigger asChild>
                  <IconButton className="text-slate-400 hover:bg-slate-700">
                    <RemoveIcon className="h-[18px] w-[18px]" />
                  </IconButton>
                </AlertTrigger>
                <AlertPortal>
                  <AlertOverlay />
                  <AlertContent>
                    <AlertTitle>
                      Remove this user &quot;{member.name}&quot;
                    </AlertTitle>
                    <AlertDescription>
                      This will remove completely the user from this space. This
                      action cannot be undone.
                    </AlertDescription>
                    <div className="flex items-center justify-end gap-2">
                      <AlertAction>
                        <Button
                          variant="destructive"
                          onClick={() => onRemoveSpaceMember(member.id)}
                        >
                          Remove
                        </Button>
                      </AlertAction>
                      <AlertCancel>
                        <Button variant="text">Cancel</Button>
                      </AlertCancel>
                    </div>
                  </AlertContent>
                </AlertPortal>
              </AlertRoot>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
