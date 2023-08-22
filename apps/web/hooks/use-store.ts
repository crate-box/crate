import { create } from "zustand"

type Mode = "EDIT" | "PREVIEW"

interface AppState {
  mode: Mode
  setMode: (mode: Mode) => void
}

export const useStore = create<AppState>()((set) => ({
  mode: "EDIT",
  setMode: (mode) => set((state) => ({ ...state, mode })),
}))
