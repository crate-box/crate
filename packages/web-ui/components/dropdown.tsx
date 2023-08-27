"use client"

import * as React from "react"
import * as RadixDropdown from "@radix-ui/react-dropdown-menu"

import { cn } from "../utils"

const DropdownRoot = RadixDropdown.Root
const DropdownTrigger = RadixDropdown.Trigger
const DropdownPortal = RadixDropdown.Portal
const DropdownSub = RadixDropdown.Sub
const DropdownGroup = RadixDropdown.Group
const DropdownRadioGroup = RadixDropdown.RadioGroup

const DropdownContent = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDropdown.Content>>
  ) => {
    return (
      <RadixDropdown.Content
        ref={ref}
        className={cn(
          "data-[side=bottom]:animate-slideTopAndFade z-30 min-w-[240px] rounded bg-slate-800 p-2 shadow-xl will-change-[opacity,transform] data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade",
          className
        )}
        {...props}
      />
    )
  }
)
DropdownContent.displayName = "DropdownContent"

const DropdownItem = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.Item>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDropdown.Item>>
  ) => {
    return (
      <RadixDropdown.Item
        ref={ref}
        className={cn(
          "group relative flex h-8 select-none items-center rounded px-1 pl-[28px] leading-none outline-none transition-colors duration-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-600 data-[disabled]:text-slate-400 data-[highlighted]:text-white",
          className
        )}
        {...props}
      />
    )
  }
)
DropdownItem.displayName = "DropdownItem"

const DropdownSubTrigger = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.SubTrigger>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDropdown.SubTrigger>>
  ) => {
    return (
      <RadixDropdown.SubTrigger
        ref={ref}
        className={cn(
          "group relative flex h-8 select-none items-center rounded px-1 pl-[28px] leading-none outline-none transition-colors duration-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-600 data-[disabled]:text-slate-400 data-[highlighted]:text-white",
          className
        )}
        {...props}
      />
    )
  }
)
DropdownSubTrigger.displayName = "DropdownSubTrigger"

const DropdownSubContent = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.SubContent>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDropdown.SubContent>>
  ) => {
    return (
      <RadixDropdown.SubContent
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
DropdownSubContent.displayName = "DropdownSubContent"

const DropdownSeparator = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.Separator>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDropdown.Separator>>
  ) => {
    return (
      <RadixDropdown.Separator
        ref={ref}
        className={cn("my-1 h-[1px] bg-slate-600", className)}
        {...props}
      />
    )
  }
)
DropdownSeparator.displayName = "DropdownSeparator"

const DropdownCheckboxItem = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.CheckboxItem>,
    ref: React.ForwardedRef<
      React.ComponentRef<typeof RadixDropdown.CheckboxItem>
    >
  ) => {
    return (
      <RadixDropdown.CheckboxItem
        ref={ref}
        className={cn(
          "group relative flex h-8 select-none items-center rounded px-2 leading-none outline-none transition-colors duration-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-600 data-[disabled]:text-slate-400 data-[highlighted]:text-white",
          className
        )}
        {...props}
      />
    )
  }
)
DropdownCheckboxItem.displayName = "DropdownCheckboxItem"

const DropdownItemIndicator = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.ItemIndicator>,
    ref: React.ForwardedRef<
      React.ComponentRef<typeof RadixDropdown.ItemIndicator>
    >
  ) => {
    return (
      <RadixDropdown.ItemIndicator
        ref={ref}
        className={cn("mr-1", className)}
        {...props}
      />
    )
  }
)
DropdownItemIndicator.displayName = "DropdownItemIndicator"

const DropdownLabel = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.Label>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDropdown.Label>>
  ) => {
    return (
      <RadixDropdown.Label
        ref={ref}
        className={cn("font-semibold", className)}
        {...props}
      />
    )
  }
)
DropdownLabel.displayName = "DropdownLabel"

const DropdownArrow = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.Arrow>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDropdown.Arrow>>
  ) => {
    return (
      <RadixDropdown.Arrow
        ref={ref}
        className={cn("fill-slate-800", className)}
        {...props}
      />
    )
  }
)
DropdownArrow.displayName = "DropdownArrow"

const DropdownRadioItem = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixDropdown.RadioItem>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixDropdown.RadioItem>>
  ) => {
    return (
      <RadixDropdown.RadioItem
        ref={ref}
        className={cn(
          "group relative flex h-8 select-none items-center rounded px-2 leading-none outline-none transition-colors duration-200 data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-600 data-[disabled]:text-slate-400 data-[highlighted]:text-white",
          className
        )}
        {...props}
      />
    )
  }
)
DropdownRadioItem.displayName = "DropdownRadioItem"

export {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  DropdownLabel,
  DropdownGroup,
  DropdownItem,
  DropdownCheckboxItem,
  DropdownItemIndicator,
  DropdownRadioGroup,
  DropdownRadioItem,
  DropdownSub,
  DropdownSubTrigger,
  DropdownSubContent,
  DropdownSeparator,
  DropdownArrow,
}
