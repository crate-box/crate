import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((value) => (value ? `https://${value}` : undefined)),
    PORT: z.coerce.number().default(3000),
  },
  server: {
    DATABASE_URL: z.string().url(),
    CLOUDINARY_URL: z.string().url(),
  },
  client: {
    // NEXT_PUBLIC_CLIENT_VAR: z.string().min(1),
  },
  runtimeEnv: {
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
})
