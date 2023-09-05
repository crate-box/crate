import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../utils"
import { iconButtonVariants } from "../variants"

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef(
  (
    { className, shape, variant, size, ...props }: IconButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        className={cn(iconButtonVariants({ shape, variant, size }), className)}
        {...props}
      />
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }
