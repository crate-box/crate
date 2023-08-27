"use client"

import * as React from "react"
import * as RadixPopover from "@radix-ui/react-popover"

import { cn } from "../utils"

const PopoverRoot = RadixPopover.Root
const PopoverTrigger = RadixPopover.Trigger
const PopoverPortal = RadixPopover.Portal
const PopoverClose = RadixPopover.Close
const PopoverAnchor = RadixPopover.Anchor

const PopoverContent = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixPopover.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixPopover.Content>>
  ) => {
    return (
      <RadixPopover.Content
        ref={ref}
        className={cn(
          "data-[side=bottom]:animate-slideTopAndFade relative z-30 w-[320px] rounded bg-slate-800 p-4 shadow-xl will-change-[opacity,transform] focus:shadow-2xl focus:outline-none focus-visible:outline-none data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade",
          className
        )}
        {...props}
      />
    )
  }
)
PopoverContent.displayName = "PopoverContent"

const PopoverArrow = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixPopover.Arrow>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixPopover.Arrow>>
  ) => {
    return (
      <RadixPopover.Arrow
        ref={ref}
        className={cn("fill-slate-800", className)}
        {...props}
      />
    )
  }
)
PopoverArrow.displayName = "PopoverArrow"

export {
  PopoverRoot,
  PopoverTrigger,
  PopoverAnchor,
  PopoverPortal,
  PopoverContent,
  PopoverClose,
  PopoverArrow,
}
