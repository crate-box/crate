"use client"

import * as React from "react"
import * as RadixSwitch from "@radix-ui/react-switch"

import { cn } from "../utils"

type SwitchRootProps = React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>
const SwitchRoot = React.forwardRef(
  (
    { className, ...props }: SwitchRootProps,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSwitch.Root>>
  ) => {
    return (
      <RadixSwitch.Root
        ref={ref}
        className={cn(
          "relative h-5 w-10 cursor-default rounded-full bg-slate-600 shadow-xl outline-none data-[state=checked]:bg-primary-light",
          className
        )}
        {...props}
      />
    )
  }
)
SwitchRoot.displayName = "SwitchRoot"

const SwitchThumb = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSwitch.Thumb>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSwitch.Thumb>>
  ) => {
    return (
      <RadixSwitch.Thumb
        ref={ref}
        className={cn(
          "block h-[16px] w-[16px] translate-x-[2px] rounded-full bg-slate-200 shadow-md transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-slate-700",
          className
        )}
        {...props}
      />
    )
  }
)
SwitchThumb.displayName = "SwitchThumb"

function Switch(props: SwitchRootProps) {
  return (
    <SwitchRoot {...props}>
      <SwitchThumb />
    </SwitchRoot>
  )
}

export { Switch, SwitchRoot, SwitchThumb }
