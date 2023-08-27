"use client"

import * as React from "react"
import * as RadixDialog from "@radix-ui/react-dialog"

import { cn } from "../utils"

const DialogRoot = RadixDialog.Root
const DialogTrigger = RadixDialog.Trigger
const DialogPortal = RadixDialog.Portal
const DialogClose = RadixDialog.Close

const DialogOverlay = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDialog.Overlay>>
  ) => {
    return (
      <RadixDialog.Overlay
        ref={ref}
        className={cn(
          "fixed inset-0 z-20 bg-black/30 data-[state=open]:animate-overlayShow",
          className
        )}
        {...props}
      />
    )
  }
)
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDialog.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDialog.Content>>
  ) => {
    return (
      <RadixDialog.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-30 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded bg-slate-900 p-4 shadow-xl focus:outline-none data-[state=open]:animate-contentShow",
          className
        )}
        {...props}
      />
    )
  }
)
DialogContent.displayName = "DialogContent"

const DialogTitle = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDialog.Title>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDialog.Title>>
  ) => {
    return (
      <RadixDialog.Title
        ref={ref}
        className={cn("font-semibold", className)}
        {...props}
      />
    )
  }
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDialog.Description>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDialog.Description>>
  ) => {
    return (
      <RadixDialog.Description
        ref={ref}
        className={cn("mt-2 text-slate-400", className)}
        {...props}
      />
    )
  }
)
DialogDescription.displayName = "DialogDescription"

export {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
