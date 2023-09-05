import { format, parseISO } from "date-fns"

export function formatDate(date: Date | string, fmt = "LLL dd") {
  if (typeof date === "string") date = new Date(parseISO(date))
  return format(date, fmt)
}

export function generateThemeKey(theme: string) {
  return theme
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-")
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export function setGlobalCssVar(obj: { [key: string]: string }) {
  const root = document.querySelector(":root")

  Object.keys(obj).forEach((key) => {
    ;(root as HTMLElement).style.setProperty(key, obj[key]!)
  })
}

export function getAssetFilename(url: string) {
  return url.split("/").slice(-1)[0]!
}

export function getVideoThumbnailUrl(url: string) {
  const ext = url.split(".").slice(-1)[0]!
  return url.replace(ext, "png")
}
