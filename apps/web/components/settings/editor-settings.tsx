import * as React from "react"
import { debounce } from "debounce"

import { Input, Select, Switch } from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"

import { api } from "~/lib/api"
import { setGlobalCssVar } from "~/lib/utils"
import SettingsOption from "./settings-option"

const DEFAULT_EDITOR_FONT_SIZE = 16
const DEFAULT_EDITOR_LINE_HEIGHT = 1.5

export default function EditorSettings() {
  const { toast } = useToast()

  const context = api.useContext()
  const [settings] = api.settings.get.useSuspenseQuery()
  const { mutateAsync: updateSettings } = api.settings.update.useMutation({
    async onSuccess() {
      await context.settings.get.invalidate()
    },
    onError(err) {
      toast({
        variant: "destructive",
        title: "Cannot update editor settings",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const debouncedUpdateSettings = debounce(updateSettings, 500)
  const [editorFontFamily, setEditorFontFamily] = React.useState(
    settings.editorFontFamily
  )
  const [editorFontSize, setEditorFontSize] = React.useState(
    settings.editorFontSize.toString()
  )
  const [editorLineHeight, setEditorLineHeight] = React.useState(
    settings.editorLineHeight.toString()
  )

  const onUpdateEditorFontFamily = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setEditorFontFamily(value)
    setGlobalCssVar({ "--editor-font-family": value })
    await debouncedUpdateSettings({ data: { editorFontFamily: value } })
  }

  const onUpdateEditorFontSize = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    const numValue = parseInt(value) || DEFAULT_EDITOR_FONT_SIZE
    setEditorFontSize(value)
    setGlobalCssVar({ "--editor-font-size": `${numValue}px` })
    await debouncedUpdateSettings({ data: { editorFontSize: numValue } })
  }

  const onUpdateEditorLineHeight = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    const numValue = parseFloat(value) || DEFAULT_EDITOR_LINE_HEIGHT
    setEditorLineHeight(value)
    setGlobalCssVar({ "--editor-line-height": `${numValue}` })
    await debouncedUpdateSettings({ data: { editorLineHeight: numValue } })
  }

  const onUpdateEditorTabSize = async (value: string) => {
    await updateSettings({ data: { editorTabSize: +value } })
  }

  const onUpdateEditorHighlightActiveLine = async (checked: boolean) => {
    await updateSettings({ data: { editorHighlightActiveLine: checked } })
  }

  const onUpdateEditorLineNumbers = async (checked: boolean) => {
    await updateSettings({ data: { editorLineNumbers: checked } })
  }

  const onUpdateEditorAutocomplete = async (checked: boolean) => {
    await updateSettings({ data: { editorAutocomplete: checked } })
  }

  const onUpdateEditorLineWrapping = async (checked: boolean) => {
    await updateSettings({ data: { editorLineWrapping: checked } })
  }

  return (
    <div className="flex flex-col items-stretch divide-y divide-slate-800">
      <SettingsOption
        title="Font Family"
        description="Change editor font family"
      >
        <Input
          placeholder="monospace"
          value={editorFontFamily}
          onChange={onUpdateEditorFontFamily}
        />
      </SettingsOption>
      <SettingsOption title="Font Size" description="Change editor font size">
        <Input
          placeholder={DEFAULT_EDITOR_FONT_SIZE.toString()}
          value={editorFontSize}
          onChange={onUpdateEditorFontSize}
        />
      </SettingsOption>
      <SettingsOption
        title="Line Height"
        description="Change editor line height"
      >
        <Input
          placeholder={DEFAULT_EDITOR_LINE_HEIGHT.toString()}
          value={editorLineHeight}
          onChange={onUpdateEditorLineHeight}
        />
      </SettingsOption>
      <SettingsOption
        title="Tab Size"
        description="Change editor tab size in spaces"
      >
        <Select
          className="min-w-full"
          defaultValue="4"
          value={settings.editorTabSize.toString()}
          onValueChange={onUpdateEditorTabSize}
          placeholder="Choose a tab size"
          options={[2, 4, 6, 8].map((ts) => ({
            value: ts.toString(),
            label: ts.toString(),
          }))}
        />
      </SettingsOption>
      <SettingsOption
        title="Highlight Active Line"
        description="Enable active line highlighting"
      >
        <Switch
          checked={settings.editorHighlightActiveLine}
          onCheckedChange={onUpdateEditorHighlightActiveLine}
        />
      </SettingsOption>
      <SettingsOption
        title="Line Numbers"
        description="Show editor line numbers"
      >
        <Switch
          checked={settings.editorLineNumbers}
          onCheckedChange={onUpdateEditorLineNumbers}
        />
      </SettingsOption>
      <SettingsOption title="Autocomplete" description="Enable autocomplete">
        <Switch
          checked={settings.editorAutocomplete}
          onCheckedChange={onUpdateEditorAutocomplete}
        />
      </SettingsOption>
      <SettingsOption title="Line Wrapping" description="Wrap line">
        <Switch
          checked={settings.editorLineWrapping}
          onCheckedChange={onUpdateEditorLineWrapping}
        />
      </SettingsOption>
    </div>
  )
}
