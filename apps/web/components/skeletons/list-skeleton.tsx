import { cn } from "@acme/web-ui"

interface ListSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  elementHeight?: number
  size?: number
  elementClassName?: string
}
export default function ListSkeleton({
  elementHeight = 36,
  size = 8,
  className,
  elementClassName = "",
  ...props
}: ListSkeletonProps) {
  return (
    <div
      className={cn("flex flex-col items-stretch gap-1", className)}
      {...props}
    >
      {Array(size)
        .fill(undefined)
        .map((_, index) => (
          <div
            key={index}
            style={{ height: `${elementHeight}px` }}
            className="flex items-center justify-between px-2"
          >
            <div className="flex items-stretch gap-3">
              <div
                className={cn(
                  "h-6 w-6 animate-pulse rounded bg-slate-800",
                  elementClassName
                )}
              >
                &nbsp;
              </div>
              <div
                className={cn(
                  "h-6 min-w-[200px] animate-pulse rounded bg-slate-800",
                  elementClassName
                )}
              >
                &nbsp;
              </div>
            </div>
            <div
              className={cn(
                "h-6 min-w-[40px] animate-pulse rounded bg-slate-800",
                elementClassName
              )}
            >
              &nbsp;
            </div>
          </div>
        ))}
    </div>
  )
}
