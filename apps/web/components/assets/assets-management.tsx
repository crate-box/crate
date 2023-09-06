"use client"

import * as React from "react"

import { DialogClose, Select } from "@acme/web-ui"

import { useStore } from "~/hooks"
import { api } from "~/lib/api"
import { insertAtCursor } from "~/lib/codemirror"
import AssetImage from "./asset-image"
import AssetVideo from "./asset-video"

type AssetType = "IMAGE" | "VIDEO" | "FILE"

export default function AssetsManagement() {
  const editorView = useStore((state) => state.editorView)
  const [type, setType] = React.useState<AssetType>("IMAGE")
  const [assets] = api.asset.all.useSuspenseQuery({ type })

  const renderGridItems = () => {
    switch (type) {
      case "IMAGE": {
        return assets.map((asset) => (
          <DialogClose key={asset.id} asChild>
            <AssetImage
              asset={asset}
              onClick={() => {
                insertAtCursor(editorView, `\n![](${asset.url})`)
              }}
            />
          </DialogClose>
        ))
      }
      case "VIDEO": {
        return assets.map((asset) => (
          <DialogClose key={asset.id} asChild>
            <AssetVideo
              asset={asset}
              onClick={() => {
                insertAtCursor(editorView, `\n<Video url="${asset.url}" />`)
              }}
            />
          </DialogClose>
        ))
      }
    }
  }

  return (
    <div className="flex h-full flex-col items-stretch gap-2">
      <Select
        className="min-w-[240px]"
        placeholder="Choose asset type"
        options={[
          {
            label: "Images",
            value: "IMAGE",
          },
          {
            label: "Videos",
            value: "VIDEO",
          },
          {
            label: "Files",
            value: "FILE",
          },
        ]}
        value={type}
        onValueChange={(value: AssetType) => setType(value)}
      />
      <div className="grid flex-1 grid-cols-4 gap-2">
        {assets.length > 0 ? (
          renderGridItems()
        ) : (
          <p>You have no {type.toLowerCase()}s</p>
        )}
      </div>
    </div>
  )
}
