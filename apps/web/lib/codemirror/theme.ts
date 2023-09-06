import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { EditorView } from "@codemirror/view"
import { tags as t } from "@lezer/highlight"

const p = {
  fg0: "#eaeff3",
  fg: "#c5d5df",
  fg2: "#a4bdcd",
  fg3: "#84a5bb",
  fg4: "#6e96af",
  bg0: "#0b1216",
  bg: "#0d1418",
  bg2: "#10191e",
  bg3: "#131e24",
  bg4: "#1a2830",
  red: "#e46769",
  green: "#a4c76f",
  yellow: "#eace60",
  blue: "#619af5",
  magenta: "#9d78d1",
  cyan: "#42b8e6",
  teal: "#5fd7aa",
  orange: "#e39d5f",
  pink: "#d983d7",
  white: "#f0f0f0",
  black: "#345161",
  comment: "#5f8da8",
}

const tokens = {
  attribute: p.yellow, // HTML tag attribues
  boolean: p.orange, // Boolean
  punctuation: p.green, // Brackets and Punctuation
  builtin0: p.red, // Builtin variable
  builtin1: p.yellow, // Builtin type
  builtin2: p.orange, // Builtin const
  builtin3: p.red, // For keywords: return, constructor
  comment: p.comment, // Comment
  conditional: p.pink, // Conditional and loop
  constant: p.orange, // Constants, imports and booleans
  constructor: p.red, // Constructor, JSX elements
  deprecated: p.black, // Deprecated
  field: p.teal, // Field, Property
  func: p.blue, // Functions and Titles
  identifier: p.pink, // Identifiers
  keyword: p.magenta, // Keywords
  number: p.orange, // Numbers
  operator: p.magenta, // Operators
  param: p.yellow, // Params
  preproc: p.magenta, // PreProc
  regex: p.orange, // Regex
  statement: p.magenta, // Statements
  string: p.green, // Strings
  delimiter: p.teal, // Tag delimiter
  type: p.yellow, // Types
  class: p.yellow, // Classes,
  variable: p.fg, // Variables
}

export function createThemeExtension() {
  const cmTheme = EditorView.theme(
    {
      "&": {
        color: p.fg,
        backgroundColor: p.bg,
      },

      ".cm-content": {
        caretColor: p.white,
      },

      ".cm-cursor, .cm-dropCursor": {
        borderLeftColor: p.white,
      },
      "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
        {
          backgroundColor: p.green,
        },

      ".cm-panels": {
        backgroundColor: p.bg0,
        color: p.fg,
      },
      ".cm-panels.cm-panels-top": {
        borderBottom: "none",
      },
      ".cm-panels.cm-panels-bottom": {
        borderTop: "none",
      },

      ".cm-searchMatch": {
        backgroundColor: p.blue,
        color: p.bg,
      },
      ".cm-searchMatch.cm-searchMatch-selected": {
        backgroundColor: p.red,
        color: p.bg,
      },

      ".cm-activeLine": { backgroundColor: p.bg2 },
      ".cm-selectionMatch": { backgroundColor: p.bg4 },

      "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
        color: p.green,
      },

      ".cm-gutters": {
        backgroundColor: p.bg,
        color: p.black,
        border: "none",
      },

      ".cm-activeLineGutter": {
        backgroundColor: p.bg2,
      },

      ".cm-foldPlaceholder": {
        backgroundColor: p.bg2,
        color: p.fg2,
        // border: 'none',
      },

      ".cm-tooltip": {
        backgroundColor: p.bg4,
        color: p.fg,
        // border: 'none',
      },

      ".cm-tooltip .cm-tooltip-arrow:before": {
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
      },

      ".cm-tooltip .cm-tooltip-arrow:after": {
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
      },
      ".cm-tooltip-autocomplete": {
        "& > ul > li[aria-selected]": {
          backgroundColor: p.bg2,
          color: p.fg,
        },
      },
    },
    { dark: true }
  )

  /// The highlighting style for code in codemirror.
  const cmHighlightStyle = HighlightStyle.define([
    { tag: [t.keyword, t.modifier], color: tokens.keyword },
    { tag: [t.definition(t.name)], color: tokens.variable },
    {
      tag: [t.definition(t.function(t.name))],
      color: tokens.func,
    },
    {
      tag: [t.deleted, t.character, t.propertyName, t.macroName],
      color: tokens.field,
    },
    { tag: [t.attributeName], color: tokens.attribute },
    {
      tag: [
        t.function(t.variableName),
        t.function(t.propertyName),
        t.labelName,
      ],
      color: tokens.func,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: tokens.constant,
    },
    { tag: [t.separator], color: tokens.builtin1 },
    { tag: t.tagName, color: tokens.delimiter },
    {
      tag: [
        t.typeName,
        t.className,
        t.changed,
        t.annotation,
        t.self,
        t.namespace,
      ],
      color: tokens.type,
    },
    {
      tag: [t.number],
      color: tokens.number,
    },
    {
      tag: [
        t.operator,
        t.operatorKeyword,
        t.url,
        t.escape,
        t.regexp,
        t.special(t.string),
      ],
      color: tokens.operator,
    },
    { tag: [t.controlKeyword, t.moduleKeyword], color: tokens.conditional },
    { tag: [t.meta, t.comment], color: tokens.comment },
    { tag: t.strong, fontWeight: "bold" },
    { tag: t.emphasis, fontStyle: "italic" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.link, color: tokens.builtin3, textDecoration: "underline" },
    { tag: t.heading, fontWeight: "bold", color: tokens.builtin1 },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: tokens.boolean,
    },
    {
      tag: [t.processingInstruction, t.inserted],
      color: tokens.preproc,
    },
    { tag: [t.string, t.character], color: tokens.string },
    { tag: [t.punctuation], color: tokens.punctuation },
    { tag: t.invalid, color: tokens.builtin1 },
  ])

  /// Extension to enable the One Dark theme (both the editor theme and
  /// the highlight style).
  return [cmTheme, syntaxHighlighting(cmHighlightStyle)]
}
