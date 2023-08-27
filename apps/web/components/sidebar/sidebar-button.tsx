import * as React from "react"

import type { SVGProps } from "@acme/web-ui/types"

interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  icon: React.FC<SVGProps> | string
}

const SidebarButton = React.forwardRef(
  (
    { icon: Icon, children, ...props }: SidebarButtonProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        role="button"
        className="flex h-8 select-none items-center gap-3 rounded px-2 leading-none transition-colors duration-200 hover:bg-slate-800"
        {...props}
      >
        <span className="inline-flex aspect-square h-6 items-center justify-center">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <div>{children}</div>
      </div>
    )
  }
)
SidebarButton.displayName = "SidebarButton"

export default SidebarButton
