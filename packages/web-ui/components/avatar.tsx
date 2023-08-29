"use client"

import * as React from "react"
import * as RadixAvatar from "@radix-ui/react-avatar"

import { cn } from "../utils"

const AvatarRoot = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithRef<typeof RadixAvatar.Root>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixAvatar.Root>>
  ) => {
    return (
      <RadixAvatar.Root
        ref={ref}
        className={cn(
          "select-none overflow-hidden rounded-full shadow-xl",
          className
        )}
        {...props}
      />
    )
  }
)
AvatarRoot.displayName = "AvatarRoot"

const AvatarImage = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithRef<typeof RadixAvatar.Image>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixAvatar.Image>>
  ) => {
    return (
      <RadixAvatar.Image ref={ref} className={cn("", className)} {...props} />
    )
  }
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef(
  (
    {
      className,
      ...props
    }: React.ComponentPropsWithRef<typeof RadixAvatar.Fallback>,
    ref: React.ForwardedRef<React.ComponentRef<typeof RadixAvatar.Fallback>>
  ) => {
    return (
      <RadixAvatar.Fallback
        ref={ref}
        className={cn(
          "block inline-flex h-full w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-slate-900",
          className
        )}
        {...props}
      />
    )
  }
)
AvatarFallback.displayName = "AvatarFallback"

interface AvatarProps {
  src?: string
  alt?: string
  fallback: string
  size?: number
}
function Avatar({ src, alt, fallback, size = 24 }: AvatarProps) {
  const fallbackValue = React.useMemo(
    () => fallback.slice(0, 2).toUpperCase(),
    [fallback]
  )
  return (
    <AvatarRoot style={{ width: `${size}px`, height: `${size}px` }}>
      <AvatarImage
        style={{ width: `${size}px`, height: `${size}px` }}
        src={src}
        alt={alt}
      />
      <AvatarFallback>{fallbackValue}</AvatarFallback>
    </AvatarRoot>
  )
}

interface AvatarStack extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
}
const AvatarStack = React.forwardRef(
  (
    { max = 3, children, ...props }: AvatarStack,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const c = React.Children.toArray(children)
    const rest = c.length - max
    return (
      <div
        ref={ref}
        className="flex items-center [&>*:not(:first-child)]:-ml-2 [&>*]:border [&>*]:border-slate-900"
        {...props}
      >
        {c.slice(0, max).map((c) => c)}
        {rest > 0 && <Avatar fallback={"+" + rest} />}
      </div>
    )
  }
)
AvatarStack.displayName = "AvatarStack"

export { Avatar, AvatarStack, AvatarRoot, AvatarImage, AvatarFallback }
