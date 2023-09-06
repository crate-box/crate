import type { EditorView } from "@codemirror/view"
import { create } from "zustand"

type Mode = "EDIT" | "PREVIEW"

interface AppState {
  editorView: EditorView | null
  setEditorView: (view: EditorView | null) => void
  mode: Mode
  setMode: (mode: Mode) => void
  isMobileNavOpen: boolean
  setIsMobileNavOpen: (value: boolean) => void
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
  sidebarWidth: number
  setSidebarWidth: (value: number) => void
}

export const useStore = create<AppState>()((set) => ({
  editorView: null,
  setEditorView: (view: EditorView | null) =>
    set((state) => ({ ...state, editorView: view })),
  mode: "EDIT",
  setMode: (mode) => set((state) => ({ ...state, mode })),
  isMobileNavOpen: false,
  setIsMobileNavOpen: (value: boolean) =>
    set((state) => ({ ...state, isMobileNavOpen: value })),
  isSidebarOpen: true,
  setIsSidebarOpen: (value: boolean) =>
    set((state) => ({ ...state, isSidebarOpen: value })),
  sidebarWidth: 240,
  setSidebarWidth: (value: number) =>
    set((state) => ({ ...state, sidebarWidth: value })),
}))
