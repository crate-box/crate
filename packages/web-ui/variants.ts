import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center outline-none focus-visible:outline-none text-base rounded font-medium transition-colors leading-none disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-slate-800 hover:bg-primary-dark",
        secondary: "bg-secondary text-slate-200 hover:bg-secondary-light",
        outline:
          "border border-primary text-primary hover:bg-primary hover:text-slate-800",
        text: "text-inherit hover:bg-slate-800",
        destructive: "bg-destructive text-slate-800 hover:bg-destructive-dark",
        unstyled: "",
      },
      size: {
        base: "h-8 px-4",
        sm: "h-7 px-3",
        lg: "h-10 px-6",
        xl: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
)

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center bg-transparent hover:bg-slate-800 transition-colors focus:outline-none focus-visible:outline-none",
  {
    variants: {
      shape: {
        rounded: "rounded",
        circle: "rounded-full",
      },
      variant: {
        default: "text-slate-200",
        destructive: "text-destructive",
        primary: "text-primary",
        success: "text-success",
        info: "text-info",
        warn: "text-warn",
      },
      size: {
        base: "w-7 h-7",
        sm: "w-6 h-6",
      },
    },
    defaultVariants: {
      shape: "rounded",
      variant: "default",
      size: "base",
    },
  }
)
