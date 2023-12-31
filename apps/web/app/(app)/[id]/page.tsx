import { Suspense } from "react"

import { appRouter } from "@acme/api"
import { auth } from "@acme/auth"
import { prisma } from "@acme/db"

import Preview from "~/components/preview"
import AppLoading from "../loading"
import SinglePage from "./single-page"

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth()
  const caller = appRouter.createCaller({ session, prisma })
  const page = await caller.page.byId({ id: params.id })
  const settings = await caller.settings.get()

  return (
    <Suspense fallback={<AppLoading />}>
      <SinglePage params={params}>
        <Preview
          body={page.body}
          settings={{ previewCodeblockTheme: settings.previewCodeblockTheme }}
        />
      </SinglePage>
    </Suspense>
  )
}
