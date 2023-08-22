"use client"

import * as React from "react"
import * as RadixLabel from "@radix-ui/react-label"

import { cn } from "../utils"

const Label = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithoutRef<typeof RadixLabel.Root>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixLabel.Root>>
  ) => {
    return (
      <RadixLabel.Root ref={ref} className={cn("", className)} {...props} />
    )
  }
)
Label.displayName = "Label"

export { Label }
