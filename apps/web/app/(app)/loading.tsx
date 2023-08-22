export default function AppLoading() {
  return (
    <div className="flex flex-1 flex-col items-stretch">
      <div className="flex h-10 items-center justify-between border-b border-slate-800 px-4 leading-none">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-7 w-7 items-center justify-center">
            <div className="h-[18px] w-[18px] animate-pulse rounded-sm bg-slate-800">
              &nbsp;
            </div>
          </div>
          <div className="h-[18px] w-[200px] animate-pulse rounded-sm bg-slate-800">
            &nbsp;
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-[18px] w-[100px] animate-pulse rounded-sm bg-slate-800">
            &nbsp;
          </div>
          <div className="inline-flex h-7 w-7 items-center justify-center">
            <div className="h-[18px] w-[18px] animate-pulse rounded-sm bg-slate-800">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-start gap-6 p-4">
        <div className="h-6 w-[60%] animate-pulse rounded-sm bg-slate-800">
          &nbsp;
        </div>
        <div className="h-6 w-[80%] animate-pulse rounded-sm bg-slate-800">
          &nbsp;
        </div>
        <div className="h-6 w-[25%] animate-pulse rounded-sm bg-slate-800">
          &nbsp;
        </div>
        <div className="h-6 w-[75%] animate-pulse rounded-sm bg-slate-800">
          &nbsp;
        </div>
        <div className="h-6 w-[50%] animate-pulse rounded-sm bg-slate-800">
          &nbsp;
        </div>
        <div className="h-6 w-[80%] animate-pulse rounded-sm bg-slate-800">
          &nbsp;
        </div>
      </div>
    </div>
  )
}
