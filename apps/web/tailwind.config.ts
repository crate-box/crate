import type { Config } from "tailwindcss"

import baseConfig from "@acme/tailwind-config"

export default {
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "../../packages/web-ui/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
  },
  presets: [baseConfig],
} satisfies Config
