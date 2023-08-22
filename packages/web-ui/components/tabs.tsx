"use client"

import * as React from "react"
import * as RadixTabs from "@radix-ui/react-tabs"

import { cn } from "../utils"

const TabsRoot = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixTabs.Root>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixTabs.Root>>
  ) => {
    return (
      <RadixTabs.Root
        ref={ref}
        className={cn("relative flex flex-col items-stretch", className)}
        {...props}
      />
    )
  }
)
TabsRoot.displayName = "TabsRoot"

const TabsList = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixTabs.List>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixTabs.List>>
  ) => {
    return (
      <RadixTabs.List
        ref={ref}
        className={cn("flex items-center border-b border-slate-800", className)}
        {...props}
      />
    )
  }
)
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixTabs.Trigger>>
  ) => {
    return (
      <RadixTabs.Trigger
        ref={ref}
        className={cn(
          "inline-flex h-8 cursor-pointer items-center gap-2 rounded-tl rounded-tr px-4 font-medium text-slate-500 transition-colors duration-200 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-200",
          className
        )}
        {...props}
      />
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixTabs.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixTabs.Content>>
  ) => {
    return (
      <RadixTabs.Content
        ref={ref}
        className={cn("flex-1 overflow-auto", className)}
        {...props}
      />
    )
  }
)
TabsContent.displayName = "TabsContent"

export { TabsRoot, TabsList, TabsTrigger, TabsContent }
