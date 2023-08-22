import * as React from "react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../utils"

const iconButtonVariants = cva(
  "w-7 h-7 inline-flex items-center justify-center bg-transparent hover:bg-slate-800 transition-colors",
  {
    variants: {
      variant: {
        rounded: "rounded",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "rounded",
    },
  }
)

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef(
  (
    { className, variant, ...props }: IconButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
