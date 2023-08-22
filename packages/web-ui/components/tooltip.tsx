"use client"

import * as React from "react"
import * as RadixTooltip from "@radix-ui/react-tooltip"

import { cn } from "../utils"

const TooltipProvider = RadixTooltip.Provider
const TooltipRoot = RadixTooltip.Root
const TooltipTrigger = RadixTooltip.Trigger
const TooltipPortal = RadixTooltip.Portal

const TooltipContent = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixTooltip.Content>>
  ) => {
    return (
      <RadixTooltip.Content
        ref={ref}
        className={cn(
          "rounded bg-slate-700 px-3 py-1 text-sm font-medium shadow-xl data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
          className
        )}
        {...props}
      />
    )
  }
)
TooltipContent.displayName = "TooltipContent"

const TooltipArrow = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixTooltip.Arrow>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixTooltip.Arrow>>
  ) => {
    return (
      <RadixTooltip.Arrow
        ref={ref}
        className={cn("fill-slate-700", className)}
        {...props}
      />
    )
  }
)
TooltipArrow.displayName = "TooltipArrow"

interface TooltipProps
  extends Omit<
      React.ComponentPropsWithRef<typeof RadixTooltip.Root>,
      "children"
    >,
    React.PropsWithChildren {
  text: string
}
function Tooltip({ children, text, ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipRoot {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>
            {text}
            <TooltipArrow />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export {
  Tooltip,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
}
