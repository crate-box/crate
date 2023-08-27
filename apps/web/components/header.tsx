"use client"

import Link from "next/link"

import { buttonVariants, Portal } from "@acme/web-ui"
import Logo from "@acme/web-ui/logo"

import { useMounted, useStore } from "~/hooks"
import MainNav from "./main-nav"
import MobileNav from "./mobile-nav"

export default function Header() {
  const setIsMobileNavOpen = useStore((state) => state.setIsMobileNavOpen)
  const mounted = useMounted()

  return (
    <header className="border-b border-slate-800 bg-slate-950">
      <div className="container flex h-16 items-center justify-between gap-8">
        <Link href="/">
          <Logo className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
        </Link>
        <div className="hidden flex-1 items-center justify-between sm:flex">
          <MainNav />
          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/sign-in"
              className={buttonVariants({ variant: "primary", size: "base" })}
            >
              Sign In
            </Link>
          </div>
        </div>
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded sm:hidden"
          onClick={() => setIsMobileNavOpen(true)}
        >
          <div className="relative h-4 w-6">
            <span className="absolute left-0 top-0 h-[2px] w-full rounded-full bg-slate-300">
              &nbsp;
            </span>
            <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-slate-300">
              &nbsp;
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-slate-300">
              &nbsp;
            </span>
          </div>
        </button>
        {mounted && (
          <Portal id="mobile-nav">
            <MobileNav />
          </Portal>
        )}
      </div>
    </header>
  )
}
