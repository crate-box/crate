import * as React from "react"

import type { SVGProps } from "@acme/web-ui/types"

const MenuButton = React.forwardRef(
  (
    {
      icon: Icon,
      children,
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
      icon: React.FC<SVGProps>
    },
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className="inline-flex h-9 cursor-pointer items-center gap-3 rounded px-2 leading-none transition-colors duration-200 ease-out hover:bg-slate-700 hover:text-slate-100 disabled:pointer-events-none disabled:opacity-50"
        {...props}
      >
        <Icon className="h-5 w-5" />
        <span>{children}</span>
      </button>
    )
  }
)
MenuButton.displayName = "MenuButton"

export default MenuButton
