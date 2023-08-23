"use client"

import * as React from "react"

import { api } from "~/lib/api"
import { setGlobalCssVar } from "~/lib/utils"

export default function Init() {
  const [settings] = api.settings.get.useSuspenseQuery()

  React.useEffect(() => {
    setGlobalCssVar({
      "--global-font-family": settings.globalFontFamily,
      "--global-font-size": `${settings.globalFontSize}px`,
      "--editor-font-family": settings.editorFontFamily,
      "--editor-font-size": `${settings.editorFontSize}px`,
      "--editor-line-height": `${settings.editorLineHeight.toString()}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
