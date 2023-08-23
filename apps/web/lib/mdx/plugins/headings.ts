import type { Options as RehypeLinkOptions } from "rehype-autolink-headings"
import rehypeLink from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import type { PluggableList } from "unified"

const rehypeLinkOptions: RehypeLinkOptions = {
  behavior: "prepend",
  content: { type: "text", value: "# " },
  test: ["h1", "h2", "h3", "h4", "h5", "h6"],
}

export const getMdxHeadings = (): PluggableList => [
  rehypeSlug,
  [rehypeLink, rehypeLinkOptions],
]
