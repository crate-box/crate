"use client"

import * as React from "react"
import { debounce } from "debounce"
import { signOut } from "next-auth/react"
import type { SubmitHandler } from "react-hook-form"
import { Controller, useForm } from "react-hook-form"

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
  Input,
  Label,
  Switch,
} from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import { ClearIcon } from "@acme/web-ui/icons"

import { api } from "~/lib/api"

interface DeleteAccountInputs {
  name: string
}

export default function AccountSettings() {
  const { toast } = useToast()
  const { control, handleSubmit, watch } = useForm<DeleteAccountInputs>({
    defaultValues: {
      name: "",
    },
  })

  const context = api.useContext()
  const [session] = api.session.get.useSuspenseQuery()
  const { mutateAsync: updateAccount } = api.user.update.useMutation({
    async onSuccess() {
      await context.session.get.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot update account",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const { mutateAsync: deleteAccount } = api.user.delete.useMutation({
    async onSuccess() {
      await signOut()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot delete account",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const { mutateAsync: deleteAllSessions } = api.session.deleteAll.useMutation({
    async onSuccess() {
      await signOut()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot log out of all sessions",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const debouncedUpdateAccount = debounce(updateAccount, 500)

  const [name, setName] = React.useState(session?.user.name ?? "")
  const onUpdateAccountName = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setName(value)
    await debouncedUpdateAccount({ data: { name: value } })
  }

  const onDeleteAccountSubmit: SubmitHandler<DeleteAccountInputs> = async (
    data
  ) => {
    if (data.name !== session?.user.name) return
    await deleteAccount()
  }

  const onLogoutSessions = async () => {
    await deleteAllSessions()
  }

  return (
    <div className="flex flex-col items-stretch divide-y divide-slate-800">
      <div className="space-y-2 py-4">
        <h3 className="font-medium">My Profile</h3>
        <div className="flex items-center gap-4">
          <form className="group relative">
            <div>
              <label htmlFor="image">
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img
                  src={session?.user.image ?? ""}
                  alt={session?.user.name ?? "Unauthorized"}
                  width={64}
                  height={64}
                  className="rounded"
                />
              </label>
              <input
                aria-label="Profile Image"
                id="image"
                type="file"
                name="image"
                className="hidden"
              />
              <button
                aria-label="Remove Profile Image"
                type="button"
                className="pointer-events-none absolute -right-[9px] top-[-9px] grid h-[18px] w-[18px] place-items-center rounded-full bg-slate-800 opacity-0 transition-colors duration-100 hover:bg-slate-700 group-hover:pointer-events-auto group-hover:opacity-100"
              >
                <ClearIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
          <form>
            <div className="space-y-1">
              <Label htmlFor="name">Preferred Name</Label>
              <Input
                aria-labelledby="name"
                id="name"
                placeholder="Your preferred name"
                value={name}
                onChange={onUpdateAccountName}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="space-y-2 py-4">
        <h3 className="font-medium">Account Security</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Email</div>
              <div className="text-slate-400">{session?.user.email}</div>
            </div>
            <Button aria-label="Change email" variant="secondary">
              Change email
            </Button>
          </div>
          <div className="pointer-events-none flex items-center justify-between opacity-40">
            <div>
              <div className="font-medium">2-step Verification</div>
              <div className="text-slate-400">
                Add an additional layer to secure your account
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </div>
      <div className="space-y-2 py-4">
        <h3 className="font-medium">Danger</h3>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Log out of all sessions</div>
              <div className="text-slate-400">
                Log out of all sessions on your devices
              </div>
            </div>
            <AlertRoot>
              <AlertTrigger asChild>
                <Button aria-label="Log out" variant="secondary">
                  Log out
                </Button>
              </AlertTrigger>
              <AlertPortal>
                <AlertOverlay />
                <AlertContent>
                  <AlertTitle>Logout on your devices</AlertTitle>
                  <AlertDescription>
                    This will delete all sessions on your devices. This action
                    cannot be undone.
                  </AlertDescription>
                  <div className="flex items-center justify-end gap-2">
                    <AlertAction asChild>
                      <Button
                        aria-label="Log out"
                        variant="destructive"
                        onClick={onLogoutSessions}
                      >
                        Log out
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
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-destructive">
                Delete my account
              </div>
              <div className="text-slate-400">
                Permanently delete your account
              </div>
            </div>
            <AlertRoot>
              <AlertTrigger asChild>
                <Button variant="destructive">Delete account</Button>
              </AlertTrigger>
              <AlertPortal>
                <AlertOverlay />
                <AlertContent>
                  <AlertTitle>Delete Account</AlertTitle>
                  <AlertDescription>
                    This will delete your account and your data permanently.
                    This action cannot be undone.
                  </AlertDescription>
                  <form
                    className="flex flex-col items-stretch gap-2"
                    onSubmit={handleSubmit(onDeleteAccountSubmit)}
                  >
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          aria-label="Account name"
                          {...field}
                          placeholder="Enter your account name"
                        />
                      )}
                    />
                    <Button
                      aria-label="Delete account"
                      type="submit"
                      variant="destructive"
                      disabled={watch("name") === ""}
                    >
                      Delete my account permanently
                    </Button>
                    <AlertCancel asChild>
                      <Button
                        aria-label="Cancel"
                        type="button"
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                    </AlertCancel>
                  </form>
                </AlertContent>
              </AlertPortal>
            </AlertRoot>
          </div>
        </div>
      </div>
    </div>
  )
}
