"use client"

import Link from "next/link"

import { buttonVariants, cn } from "@acme/web-ui"
import { ClearIcon } from "@acme/web-ui/icons"

import { useStore } from "~/hooks"
import MainNav from "./main-nav"

export default function MobileNav() {
  const isMobileNavOpen = useStore((state) => state.isMobileNavOpen)
  const setIsMobileNavOpen = useStore((state) => state.setIsMobileNavOpen)

  return (
    <div
      className={`fixed left-0 top-0 ${
        isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
      } z-10 block h-screen w-screen bg-slate-900 transition-transform duration-500 tablet:hidden`}
    >
      <div className="flex h-16 w-full items-center justify-end px-4">
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded tablet:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        >
          <ClearIcon className="h-7 w-7" />
        </button>
      </div>
      <MainNav />
      <div className="px-4">
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "primary", size: "lg" }),
            "w-full text-lg tablet:text-base"
          )}
        >
          Sign In
        </Link>
      </div>
    </div>
  )
}
