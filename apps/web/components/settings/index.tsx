"use client"

import { Suspense } from "react"

import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from "@acme/web-ui"
import {
  AccountSettingsIcon,
  CodeIcon,
  EyeIcon,
  PaletteIcon,
} from "@acme/web-ui/icons"

import Spinner from "~/components/spinner"
import AccountSettings from "./account-settings"
import AppearanceSettings from "./appearance-settings"
import EditorSettings from "./editor-settings"
import PreviewSettings from "./preview-settings"

export default function Settings() {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogContent className="h-[80vh] min-w-[600px]">
        <DialogTitle>Settings</DialogTitle>
        <div className="mt-2 h-[calc(100%-30px)]">
          <TabsRoot defaultValue="appearance" className="h-full">
            <TabsList>
              <TabsTrigger value="appearance">
                <PaletteIcon className="h-5 w-5" />
                Appearances
              </TabsTrigger>
              <TabsTrigger value="editor">
                <CodeIcon className="h-5 w-5" />
                Editor
              </TabsTrigger>
              <TabsTrigger value="preview">
                <EyeIcon className="h-5 w-5" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="account">
                <AccountSettingsIcon className="h-5 w-5" />
                Account
              </TabsTrigger>
            </TabsList>
            <TabsContent value="appearance">
              <Suspense
                fallback={<Spinner text="Loading appearance settings" />}
              >
                <AppearanceSettings />
              </Suspense>
            </TabsContent>
            <TabsContent value="editor">
              <Suspense fallback={<Spinner text="Loading editor settings" />}>
                <EditorSettings />
              </Suspense>
            </TabsContent>
            <TabsContent value="preview">
              <Suspense fallback={<Spinner text="Loading preview settings" />}>
                <PreviewSettings />
              </Suspense>
            </TabsContent>
            <TabsContent value="account">
              <Suspense fallback={<Spinner text="Loading account settings" />}>
                <AccountSettings />
              </Suspense>
            </TabsContent>
          </TabsRoot>
        </div>
      </DialogContent>
    </DialogPortal>
  )
}
