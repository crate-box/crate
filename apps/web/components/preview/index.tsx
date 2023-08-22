import type { RouterOutputs } from "~/lib/api"
import { serializeMdx } from "~/lib/mdx"
import MdxRenderer from "./mdx-renderer"

interface PreviewProps {
  settings: Pick<RouterOutputs["settings"]["get"], "previewCodeblockTheme">
  body: string
}
export default async function Preview({ settings, body }: PreviewProps) {
  const source = await serializeMdx(body, settings)

  return <MdxRenderer source={source} />
}
