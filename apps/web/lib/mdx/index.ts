import { serialize } from "next-mdx-remote/serialize"
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis"
import remarkGfm from "remark-gfm"

import { getMdxCode } from "./plugins/code"
import { getMdxHeadings } from "./plugins/headings"

export async function serializeMdx(
  code: string,
  settings: { previewCodeblockTheme: string }
) {
  const source = await serialize(code, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        ...getMdxCode(settings.previewCodeblockTheme),
        ...getMdxHeadings(),
        rehypeAccessibleEmojis,
      ],
    },
  })
  return source
}
