import path from "path"
import react from "@vitejs/plugin-react"
import tsConfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "."),
    },
  },
  test: {
    name: "web",
    environment: "jsdom",
    globals: true,
    setupFiles: "./setup-tests.ts",
    server: {
      deps: {
        inline: ["vitest-mock-extended", "next", "@auth/nextjs"],
      },
    },
  },
})
