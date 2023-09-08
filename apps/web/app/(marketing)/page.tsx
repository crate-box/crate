import Link from "next/link"
import { redirect } from "next/navigation"

import { buttonVariants } from "@acme/web-ui"

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
          <h1 className="text-center font-heading text-4xl font-bold tracking-tight text-primary tablet:text-6xl">
            Write MDX <br />
            As A Developer
          </h1>
          <h3 className="text-center text-xl tablet:text-2xl">
            Crate lets you write and organize your MDX contents in a single
            space.
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <Link
            className={buttonVariants({ variant: "primary", size: "lg" })}
            href="/welcome"
          >
            Open Workspace
          </Link>
          <a
            className={buttonVariants({ variant: "secondary", size: "lg" })}
            href="https://github.com/crate-box/crate"
            target="_blank"
            rel="noreferrer"
          >
            Github Repo
          </a>
        </div>
      </section>
    </main>
  )
}
