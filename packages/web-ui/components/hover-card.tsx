"use client"

import * as React from "react"
import * as RadixHoverCard from "@radix-ui/react-hover-card"

import { cn } from "../utils"

const HoverCardRoot = RadixHoverCard.Root
const HoverCardTrigger = RadixHoverCard.Trigger
const HoverCardPortal = RadixHoverCard.Portal

const HoverCardContent = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixHoverCard.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixHoverCard.Content>>
  ) => {
    return (
      <RadixHoverCard.Content
        ref={ref}
        className={cn(
          "data-[side=bottom]:animate-slideTopAndFade min-w-[240px] rounded bg-slate-800 p-2 shadow-xl will-change-[opacity,transform] data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade",
          className
        )}
        {...props}
      />
    )
  }
)
HoverCardContent.displayName = "HoverCardContent"

const HoverCardArrow = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixHoverCard.Arrow>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixHoverCard.Arrow>>
  ) => {
    return (
      <RadixHoverCard.Arrow
        ref={ref}
        className={cn("fill-slate-800", className)}
        {...props}
      />
    )
  }
)
HoverCardArrow.displayName = "HoverCardArrow"

export {
  HoverCardRoot,
  HoverCardTrigger,
  HoverCardPortal,
  HoverCardContent,
  HoverCardArrow,
}
