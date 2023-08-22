"use client"

import { useCodeMirror } from "~/hooks"
import type { UseCodeMirrorParams } from "~/hooks"

export default function CodeMirror(props: UseCodeMirrorParams) {
  const { ref } = useCodeMirror(props)

  return (
    <div className="flex h-full flex-col items-stretch">
      <div
        ref={ref}
        className="h-full [&>.cm-editor]:flex [&>.cm-editor]:max-h-full [&>.cm-editor]:min-h-full [&>.cm-editor]:min-w-full [&>.cm-editor]:flex-col [&>.cm-editor]:overflow-hidden [&>.cm-editor]:!font-mono [&>.cm-editor]:text-[length:var(--editor-font-size)] [&_.cm-gutterElement]:!pl-2 [&_.cm-gutterElement]:!pr-4 [&_.cm-gutter]:leading-relaxed [&_.cm-lineWrapping]:py-0 [&_.cm-line]:leading-relaxed [&_.cm-scroller]:flex-1 [&_.cm-scroller]:overflow-auto [&_.cm-scroller]:font-mono"
      />
    </div>
  )
}
