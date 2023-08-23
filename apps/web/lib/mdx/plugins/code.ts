import fs from "fs"
import path from "path"
import type { Options as RehypeCodeOptions } from "rehype-pretty-code"
import rehypeCode from "rehype-pretty-code"
import * as shiki from "shiki"
import type { PluggableList } from "unified"

// Shiki loads languages and themes using "fs" instead of "import", so Next.js
// doesn't bundle them into production build. To work around, we manually copy
// them over to our source code (lib/shiki/*) and update the "paths".
//
// Note that they are only referenced on server side
// See: https://github.com/shikijs/shiki/issues/138
const getShikiPath = (): string => {
  return path.join(process.cwd(), "lib/mdx/shiki")
}

const touched = { current: false }

// "Touch" the shiki assets so that Vercel will include them in the production
// bundle. This is required because shiki itself dynamically access these files,
// so Vercel doesn't know about them by default
const touchShikiPath = (): void => {
  if (touched.current) return // only need to do once
  fs.readdirSync(getShikiPath()) // fire and forget
  touched.current = true
}

const getHighlighter: RehypeCodeOptions["getHighlighter"] = async (options) => {
  touchShikiPath()

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const highlighter = await shiki.getHighlighter({
    // This is technically not compatible with shiki's interface but
    // necessary for rehype-pretty-code to work
    // - https://rehype-pretty-code.netlify.app/ (see Custom Highlighter)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(options as any),
    paths: {
      languages: `${getShikiPath()}/languages/`,
      themes: `${getShikiPath()}/themes/`,
    },
  })

  return highlighter
}

const getPrettyCodeOptions = (theme: string): Partial<RehypeCodeOptions> => ({
  // Requirements for theme:
  // - Has light and dark version
  // - Uses italic in several places
  theme,
  // Need to use a custom highlighter because rehype-pretty-code doesn't
  // let us customize "paths".
  getHighlighter,
})

export const getMdxCode = (theme: string): PluggableList => [
  [rehypeCode, getPrettyCodeOptions(theme)],
]
