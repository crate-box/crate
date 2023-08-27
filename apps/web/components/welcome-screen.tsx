"use client"

import { useRouter } from "next/navigation"

import { Button } from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"
import { ProductLaunch } from "@acme/web-ui/illustrations"

import { api } from "~/lib/api"
import Topbar from "./topbars/topbar"

export default function WelcomeScreen() {
  const router = useRouter()
  const { toast } = useToast()
  const context = api.useContext()

  const { mutateAsync: createPage } = api.page.create.useMutation({
    async onSuccess(data) {
      router.push(`/${data.id}`)
      await context.page.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot create page",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const { mutateAsync: createSpace } = api.space.create.useMutation({
    async onSuccess(data) {
      router.push(`/space/${data.id}`)
      await context.space.all.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot create space",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const onCreatePage = async () => {
    await createPage({
      data: {
        title: "Untitled",
      },
    })
  }

  const onCreateSpace = async () => {
    await createSpace({
      data: {
        title: "Untitled space",
        description: "Space description",
      },
    })
  }

  return (
    <>
      <Topbar />
      <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <ProductLaunch className="h-[320px] text-primary" />
          <p className="text-lg">
            Welcome back! Ready to boost your workspace?
          </p>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Button onClick={onCreatePage}>New Page</Button>
          <Button variant="secondary" onClick={onCreateSpace}>
            New Space
          </Button>
        </div>
      </div>
    </>
  )
}
