"use client"

import * as React from "react"
import * as RadixSelect from "@radix-ui/react-select"

import { ChevronDownIcon, ChevronUpIcon, CircleIcon } from "../icons"
import { cn } from "../utils"

const SelectRoot = RadixSelect.Root
const SelectPortal = RadixSelect.Portal

const SelectTrigger = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Trigger>>
  ) => {
    return (
      <RadixSelect.Trigger
        ref={ref}
        className={cn(
          "inline-flex h-8 items-center justify-between gap-4 rounded bg-slate-800 pl-4 pr-2",
          className
        )}
        {...props}
      />
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Value>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Value>>
  ) => {
    return (
      <RadixSelect.Value
        ref={ref}
        className={cn("text-base", className)}
        {...props}
      />
    )
  }
)
SelectValue.displayName = "SelectValue"

const SelectIcon = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Icon>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Icon>>
  ) => {
    return (
      <RadixSelect.Icon
        ref={ref}
        className={cn("text-slate-500", className)}
        {...props}
      />
    )
  }
)
SelectIcon.displayName = "SelectIcon"

const SelectContent = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Content>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Content>>
  ) => {
    return (
      <RadixSelect.Content
        ref={ref}
        className={cn(
          "z-[250] overflow-hidden rounded bg-slate-800 shadow-xl",
          className
        )}
        {...props}
      />
    )
  }
)
SelectContent.displayName = "SelectContent"

const SelectViewport = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Viewport>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Viewport>>
  ) => {
    return (
      <RadixSelect.Viewport
        ref={ref}
        className={cn("p-1", className)}
        {...props}
      />
    )
  }
)
SelectViewport.displayName = "SelectViewport"

const SelectGroup = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Group>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Group>>
  ) => {
    return (
      <RadixSelect.Group ref={ref} className={cn("", className)} {...props} />
    )
  }
)
SelectGroup.displayName = "SelectGroup"

const SelectLabel = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Label>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Label>>
  ) => {
    return (
      <RadixSelect.Label
        ref={ref}
        className={cn(
          "inline-flex h-8 items-center justify-center px-4 font-semibold",
          className
        )}
        {...props}
      />
    )
  }
)
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Item>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Item>>
  ) => {
    return (
      <RadixSelect.Item
        ref={ref}
        className={cn(
          "relative flex h-8 select-none items-center rounded pl-6 pr-4 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-slate-700 data-[disabled]:text-slate-400 data-[highlighted]:outline-none",
          className
        )}
        {...props}
      />
    )
  }
)
SelectItem.displayName = "SelectItem"

const SelectItemText = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.ItemText>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.ItemText>>
  ) => {
    return (
      <RadixSelect.ItemText
        ref={ref}
        className={cn("", className)}
        {...props}
      />
    )
  }
)
SelectItemText.displayName = "SelectItemText"

const SelectItemIndicator = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.ItemIndicator>,
    ref: React.ForwardedRef<
      React.ComponentRef<typeof RadixSelect.ItemIndicator>
    >
  ) => {
    return (
      <RadixSelect.ItemIndicator
        ref={ref}
        className={cn(
          "absolute left-0 inline-flex w-6 items-center justify-center",
          className
        )}
        {...props}
      />
    )
  }
)
SelectItemIndicator.displayName = "SelectItemIndicator"

const SelectArrow = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Arrow>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Arrow>>
  ) => {
    return (
      <RadixSelect.Arrow ref={ref} className={cn("", className)} {...props} />
    )
  }
)
SelectArrow.displayName = "SelectArrow"

const SelectSeparator = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixSelect.Separator>>
  ) => {
    return (
      <RadixSelect.Separator
        ref={ref}
        className={cn("h-[1px] bg-slate-400", className)}
        {...props}
      />
    )
  }
)
SelectSeparator.displayName = "SelectSeparator"

const SelectScrollDownButton = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.ScrollDownButton>,
    ref: React.ForwardedRef<
      React.ComponentRef<typeof RadixSelect.ScrollDownButton>
    >
  ) => {
    return (
      <RadixSelect.ScrollDownButton
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center bg-slate-700 text-slate-400",
          className
        )}
        {...props}
      />
    )
  }
)
SelectScrollDownButton.displayName = "SelectScrollDownButton"

const SelectScrollUpButton = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixSelect.ScrollUpButton>,
    ref: React.ForwardedRef<
      React.ComponentRef<typeof RadixSelect.ScrollUpButton>
    >
  ) => {
    return (
      <RadixSelect.ScrollUpButton
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center bg-slate-700 text-slate-400",
          className
        )}
        {...props}
      />
    )
  }
)
SelectScrollUpButton.displayName = "SelectScrollUpButton"

interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectRoot> {
  placeholder: string
  options: { value: string; label: string }[]
  className?: string
}
function Select({ className, placeholder, options, ...props }: SelectProps) {
  return (
    <SelectRoot {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
        <SelectIcon>
          <ChevronDownIcon />
        </SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            {options.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                <SelectItemText>{label}</SelectItemText>
                <SelectItemIndicator>
                  <CircleIcon className="h-2 w-2" />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  )
}

export {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectSeparator,
  SelectArrow,
}
