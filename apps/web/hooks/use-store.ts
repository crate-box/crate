import { create } from "zustand"

type Mode = "EDIT" | "PREVIEW"

interface AppState {
  mode: Mode
  setMode: (mode: Mode) => void
  isMobileNavOpen: boolean
  setIsMobileNavOpen: (value: boolean) => void
}

export const useStore = create<AppState>()((set) => ({
  mode: "EDIT",
  setMode: (mode) => set((state) => ({ ...state, mode })),
  isMobileNavOpen: false,
  setIsMobileNavOpen: (value: boolean) =>
    set((state) => ({ ...state, isMobileNavOpen: value })),
}))
