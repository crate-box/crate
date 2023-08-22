import Link from "next/link"

import { buttonVariants } from "@acme/web-ui"
import Logo from "@acme/web-ui/logo"

import MainNav from "./main-nav"

export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="container flex h-16 items-center gap-8">
        <Link href="/">
          <Logo className="h-8 w-8 text-primary" />
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/auth/signin"
            className={buttonVariants({ variant: "text", size: "base" })}
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  )
}
