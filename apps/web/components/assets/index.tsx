import * as React from "react"

import { TabsContent, TabsList, TabsRoot, TabsTrigger } from "@acme/web-ui"
import { AddImageIcon, ImageIcon } from "@acme/web-ui/icons"

import Spinner from "../spinner"
import AssetsManagement from "./assets-management"
import AssetsUploader from "./assets-uploader"

export default function Assets() {
  return (
    <>
      <TabsRoot className="flex-1">
        <TabsList className="mt-2">
          <TabsTrigger value="assets">
            <ImageIcon className="h-[18px] w-[18px]" /> Assets
          </TabsTrigger>
          <TabsTrigger value="upload">
            <AddImageIcon className="h-[18px] w-[18px]" />
            Upload
          </TabsTrigger>
        </TabsList>
        <TabsContent value="assets" className="pt-2">
          <React.Suspense fallback={<Spinner text="Loading assets" />}>
            <AssetsManagement />
          </React.Suspense>
        </TabsContent>
        <TabsContent value="upload" className="pt-2">
          <AssetsUploader />
        </TabsContent>
      </TabsRoot>
    </>
  )
}
