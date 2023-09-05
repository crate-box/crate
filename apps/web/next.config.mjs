import "./env.mjs"
import "@acme/auth/env.mjs"

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  // Enable hot reloading for local packages
  transpilePackages: ["@acme/api", "@acme/auth", "@acme/db", "@acme/web-ui"],
  // Already run lint and typecheck in CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Set output to run inside docker container
  output: "standalone",
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["shiki", "vscode-oniguruma"],
  },
}

export default config
