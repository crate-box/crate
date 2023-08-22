"use client"

import { useToast } from "../hooks"
import { ClearIcon } from "../icons"
import {
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from "./toast"

function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <ToastRoot key={id} {...props}>
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
          {action}
          <ToastClose>
            <ClearIcon className="h-4 w-4" />
          </ToastClose>
        </ToastRoot>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

export { Toaster }
