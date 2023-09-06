import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete"
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands"
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from "@codemirror/lang-markdown"
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  indentUnit,
  syntaxHighlighting,
} from "@codemirror/language"
import { languages } from "@codemirror/language-data"
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search"
import type { Extension } from "@codemirror/state"
import { EditorState } from "@codemirror/state"
import {
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from "@codemirror/view"

import type { RouterOutputs } from "../api"

export function basicSetup(): Extension {
  return [
    history(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    highlightSelectionMatches(),
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...completionKeymap,
      ...markdownKeymap,
      indentWithTab,
    ]),
    markdown({
      base: markdownLanguage,
      codeLanguages: languages,
    }),
  ]
}

export function getConfigurableExtensions(
  settings: Pick<
    RouterOutputs["settings"]["get"],
    | "editorLineNumbers"
    | "editorTabSize"
    | "editorHighlightActiveLine"
    | "editorAutocomplete"
    | "editorLineWrapping"
  >
) {
  return [
    settings.editorLineNumbers ? lineNumbers() : [],
    settings.editorHighlightActiveLine
      ? [highlightActiveLine(), highlightActiveLineGutter()]
      : [],
    settings.editorLineWrapping ? EditorView.lineWrapping : [],
    settings.editorAutocomplete ? autocompletion() : [],
    [
      EditorState.tabSize.of(settings.editorTabSize),
      indentUnit.of(" ".repeat(settings.editorTabSize)),
    ],
  ]
}
