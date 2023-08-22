import * as React from "react"
import { Compartment, EditorState } from "@codemirror/state"
import type { ViewUpdate } from "@codemirror/view"
import { EditorView } from "@codemirror/view"

import type { RouterOutputs } from "~/lib/api"
import {
  basicSetup,
  createThemeExtension,
  getConfigurableExtensions,
} from "~/lib/codemirror"

export interface UseCodeMirrorParams {
  text: string
  onTextChange: (text: string) => void
  settings: Pick<
    RouterOutputs["settings"]["get"],
    | "editorLineNumbers"
    | "editorTabSize"
    | "editorHighlightActiveLine"
    | "editorAutocomplete"
    | "editorLineWrapping"
  >
}
export function useCodeMirror({
  text,
  onTextChange,
  settings,
}: UseCodeMirrorParams): {
  ref: React.RefObject<HTMLDivElement>
  view: EditorView | null
} {
  const ref = React.useRef<HTMLDivElement>(null)
  const [view, setView] = React.useState<EditorView | null>(null)
  const themeExtension = React.useMemo(() => createThemeExtension(), [])
  const compartmentRef = React.useRef(new Compartment())

  React.useEffect(() => {
    const editor = ref.current
    if (!editor) return

    const startState = EditorState.create({
      doc: text,
      extensions: [
        basicSetup(),
        themeExtension,
        EditorView.updateListener.of((vu: ViewUpdate) => {
          if (vu.docChanged) onTextChange(vu.state.doc.sliceString(0) ?? "")
        }),
        compartmentRef.current.of(getConfigurableExtensions(settings)),
      ],
    })

    const _view = new EditorView({
      state: startState,
      parent: editor,
    })

    setView(_view)

    return () => {
      editor.innerHTML = ""
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  React.useEffect(() => {
    view?.dispatch({
      effects: compartmentRef.current.reconfigure(
        getConfigurableExtensions(settings)
      ),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  return { ref, view }
}
