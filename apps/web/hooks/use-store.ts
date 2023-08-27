import { create } from "zustand"

type Mode = "EDIT" | "PREVIEW"

interface AppState {
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
