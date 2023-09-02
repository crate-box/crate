import * as React from "react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../utils"

const iconButtonVariants = cva(
  "w-7 h-7 inline-flex items-center justify-center bg-transparent hover:bg-slate-800 transition-colors focus:outline-none focus-visible:outline-none",
  {
    variants: {
      variant: {
        rounded: "rounded",
        circle: "rounded-full",
      },
      size: {
        base: "w-7 h-7",
        sm: "w-6 h-6",
      },
    },
    defaultVariants: {
      variant: "rounded",
      size: "base",
    },
  }
)

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef(
  (
    { className, variant, size, ...props }: IconButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
