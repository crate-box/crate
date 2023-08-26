export default function SidebarSkeleton() {
  return (
    <>
      <div className="flex h-11 w-full items-center gap-3 px-4">
        <div className="aspect-square h-6 animate-pulse rounded-full bg-slate-800">
          &nbsp;
        </div>
        <div className="h-5 w-full animate-pulse bg-slate-800">&nbsp;</div>
      </div>
      <div className="flex flex-col items-stretch gap-2 px-2">
        <div className="flex flex-col items-stretch gap-0.5">
          <SidebarButtonSkeleton />
          <SidebarButtonSkeleton />
          <SidebarButtonSkeleton />
          <SidebarButtonSkeleton />
        </div>
        <div className="flex flex-col items-stretch gap-0.5">
          <SidebarButtonSkeleton />
          <SidebarButtonSkeleton />
          <SidebarButtonSkeleton />
          <SidebarButtonSkeleton />
        </div>
      </div>
    </>
  )
}

function SidebarButtonSkeleton() {
  return (
    <div className="flex h-8 select-none items-center gap-3 rounded px-2 leading-none">
      <div className="inline-flex aspect-square h-6 animate-pulse items-center justify-center rounded bg-slate-900">
        &nbsp;
      </div>
      <div className="h-5 w-full animate-pulse bg-slate-900">&nbsp;</div>
    </div>
  )
}
