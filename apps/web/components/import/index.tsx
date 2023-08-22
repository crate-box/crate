import { PopoverContent, PopoverPortal } from "@acme/web-ui"

import ImportForm from "./import-form"

export default function Import() {
  return (
    <PopoverPortal>
      <PopoverContent
        side="right"
        sideOffset={12}
        className="flex h-[25vh] min-w-[400px] flex-col items-stretch border border-slate-800 bg-slate-900 shadow-2xl"
      >
        <div className="font-medium">Import</div>
        <div className="grid-cols-[repeat(3, 80px)] mt-2 grid gap-2">
          <ImportForm />
        </div>
      </PopoverContent>
    </PopoverPortal>
  )
}
