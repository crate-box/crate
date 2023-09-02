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
