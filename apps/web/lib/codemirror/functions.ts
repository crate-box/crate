import type { EditorView } from "@codemirror/view"

export function insertAtCursor(view: EditorView | null, text: string) {
  if (!view) return
  const state = view.state
  const range = state.selection.ranges[0]
  if (!range) return
  view.dispatch({
    changes: {
      from: range.from,
      to: range.to,
      insert: text,
    },
    selection: { anchor: range.from },
  })
}
