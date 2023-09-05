import { AssetType } from "@acme/db"

export function getAssetType(uri: string) {
  const mimetype = uri.split(";")[0]?.replace("data:", "").split("/")[0]
  switch (mimetype) {
    case "image":
      return AssetType.IMAGE
    case "video":
      return AssetType.VIDEO
    default:
      return AssetType.FILE
  }
}
