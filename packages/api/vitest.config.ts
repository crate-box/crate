import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    name: "api",
    environment: "node",
    globals: true,
    // disable threads to run test files sequentially
    threads: false,
    server: {
      deps: {
        inline: ["vitest-mock-extended", "next", "@auth/nextjs"],
      },
    },
  },
})
