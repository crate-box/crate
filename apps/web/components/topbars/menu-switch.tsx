import * as React from "react"

import { Switch } from "@acme/web-ui"
import type { SVGProps } from "@acme/web-ui/types"

const MenuSwitch = React.forwardRef(
  (
    {
      icon: Icon,
      children,
      checked,
      onCheckedChange,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
      icon: React.FC<SVGProps>
      onCheckedChange: (checked: boolean) => void
      checked: boolean
    },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className="inline-flex h-9 cursor-pointer items-center justify-between rounded px-2 leading-none transition-colors duration-200 ease-out"
        {...props}
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5" />
          <span>{children}</span>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </div>
    )
  }
)
MenuSwitch.displayName = "MenuSwitch"

export default MenuSwitch
