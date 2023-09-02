"use client"

import * as React from "react"
import * as RadixAlert from "@radix-ui/react-alert-dialog"

import { cn } from "../utils"

const AlertRoot = RadixAlert.Root
const AlertTrigger = RadixAlert.Trigger
const AlertPortal = RadixAlert.Portal
const AlertCancel = RadixAlert.Cancel
const AlertAction = RadixAlert.Action

const AlertOverlay = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixAlert.Overlay>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixAlert.Overlay>>
  ) => {
    return (
      <RadixAlert.Overlay
        ref={ref}
        className={cn(
          className,
          "fixed inset-0 z-[120] bg-black/30 data-[state=open]:animate-overlayShow"
        )}
        {...props}
      />
    )
  }
)
AlertOverlay.displayName = "AlertOverlay"

const AlertContent = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixAlert.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixAlert.Content>>
  ) => {
    return (
      <RadixAlert.Content
        ref={ref}
        className={cn(
          "focus:outline:none fixed left-1/2 top-1/2 z-[150] flex max-h-[85vh] w-[95vw] max-w-[480px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded bg-slate-900 p-4 shadow-xl data-[state=open]:animate-contentShow",
          className
        )}
        {...props}
      />
    )
  }
)
AlertContent.displayName = "AlertContent"

const AlertTitle = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixAlert.Title>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixAlert.Title>>
  ) => {
    return (
      <RadixAlert.Title
        ref={ref}
        className={cn("font-bold", className)}
        {...props}
      />
    )
  }
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixAlert.Description>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixAlert.Description>>
  ) => {
    return (
      <RadixAlert.Description
        ref={ref}
        className={cn("text-slate-300", className)}
        {...props}
      />
    )
  }
)
AlertDescription.displayName = "AlertDescription"

export {
  AlertRoot,
  AlertTrigger,
  AlertPortal,
  AlertOverlay,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertAction,
  AlertCancel,
}
