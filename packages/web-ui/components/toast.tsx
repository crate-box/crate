"use client"

import * as React from "react"
import * as RadixToast from "@radix-ui/react-toast"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../utils"

const ToastProvider = RadixToast.Provider

const toastVariants = cva(
  "z-40 relative grid min-w-[400px] max-w-[50vw] grid-cols-[auto_max-content] items-center gap-x-4 rounded px-4 py-2 shadow-xl [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-wipe-move)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]",
  {
    variants: {
      variant: {
        default: "bg-slate-800 text-slate-200",
        success: "bg-success text-slate-900",
        destructive: "bg-destructive text-slate-900",
        warn: "bg-warning text-slate-900",
        info: "bg-info text-slate-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
const ToastRoot = React.forwardRef(
  (
    {
      className,
      variant,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixToast.Root> &
      VariantProps<typeof toastVariants>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixToast.Root>>
  ) => {
    return (
      <RadixToast.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
ToastRoot.displayName = "ToastRoot"

const ToastTitle = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixToast.Title>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixToast.Title>>
  ) => {
    return (
      <RadixToast.Title
        ref={ref}
        className={cn("font-semibold [grid-area:_title]", className)}
        {...props}
      />
    )
  }
)
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixToast.Description>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixToast.Description>>
  ) => {
    return (
      <RadixToast.Description
        ref={ref}
        className={cn("mt-1 [grid-area:_description]", className)}
        {...props}
      />
    )
  }
)
ToastDescription.displayName = "ToastDescription"

const ToastAction = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixToast.Action>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixToast.Action>>
  ) => {
    return (
      <RadixToast.Action
        ref={ref}
        className={cn("[grid-area:_action]", className)}
        {...props}
      />
    )
  }
)
ToastAction.displayName = "ToastAction"

const ToastViewport = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixToast.Viewport>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixToast.Viewport>>
  ) => {
    return (
      <RadixToast.Viewport
        ref={ref}
        className={cn(
          "fixed bottom-0 right-0 p-[var(--viewport-padding)] [--viewport-padding:_16px]",
          className
        )}
        {...props}
      />
    )
  }
)
ToastViewport.displayName = "ToastViewport"

const ToastClose = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixToast.Close>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixToast.Close>>
  ) => {
    return (
      <RadixToast.Close
        ref={ref}
        className={cn(
          "absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-800 hover:text-slate-900",
          className
        )}
        {...props}
      />
    )
  }
)
ToastClose.displayName = "ToastClose"

type ToastRootProps = React.ComponentPropsWithoutRef<typeof ToastRoot>
type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastRootProps,
  type ToastActionElement,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastViewport,
  ToastAction,
  ToastClose,
}
