/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  // Enable hot reloading for local packages
  transpilePackages: ["@acme/api", "@acme/auth", "@acme/db", "@acme/web-ui"],
  // Already run lint and typecheck in CI
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Set output to run inside docker container
  output: "standalone",
}

export default config
