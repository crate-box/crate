import { serialize } from "next-mdx-remote/serialize"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

export async function serializeMdx(
  code: string,
  settings: { previewCodeblockTheme: string }
) {
  const source = await serialize(code, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["subheading-anchor"],
              ariaLabel: "Link to section",
            },
          },
        ],
        [
          rehypePrettyCode,
          { theme: settings.previewCodeblockTheme, keepBackground: true },
        ],
        rehypeSlug,
        rehypeAccessibleEmojis,
      ],
    },
  })
  return source
}
