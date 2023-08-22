import * as React from "react"

import { cn } from "../utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef(
  (
    { className, ...props }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-8 w-full rounded bg-slate-800 px-4 font-sans text-base leading-none placeholder:text-slate-500 focus:outline-none",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = React.forwardRef(
  (
    { className, ...props }: TextAreaProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded bg-slate-800 px-4 py-2 font-sans text-base leading-normal focus:outline-none",
          className
        )}
        {...props}
      />
    )
  }
)
TextArea.displayName = "TextArea"

export { Input, TextArea }
