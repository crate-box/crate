import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "@acme/web-ui/utils"

const calloutVariants = cva(
  "my-6 flex rounded-md border border-l-4 p-4 bg-slate-800",
  {
    variants: {
      type: {
        default: "",
        warning: "border-warn",
        danger: "border-destructive",
      },
    },
  }
)

interface CalloutProps
  extends React.PropsWithChildren,
    VariantProps<typeof calloutVariants> {}

export default function Callout({
  children,
  type = "default",
  ...props
}: CalloutProps) {
  return (
    <div className={cn(calloutVariants({ type }))} {...props}>
      {children}
    </div>
  )
}
