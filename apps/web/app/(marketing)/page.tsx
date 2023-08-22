import { redirect } from "next/navigation"

import { Button } from "@acme/web-ui"

import { getSession } from "~/lib/auth"

export default async function Home() {
  const session = await getSession()

  if (session?.user) {
    redirect("/welcome")
  }

  return (
    <main>
      <section className="container flex min-h-[calc(100vh-64px)] flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center font-heading text-6xl font-bold tracking-tight text-primary">
            Write Markdown <br />
            As A Developer
          </h1>
          <h3 className="text-2xl">
            Crate lets you write and organize your markdowns in a single space.
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg">Open Workspace</Button>
          <Button variant="secondary" size="lg">
            Github Repository
          </Button>
        </div>
      </section>
    </main>
  )
}
