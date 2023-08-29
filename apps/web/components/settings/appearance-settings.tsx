import * as React from "react"
import { debounce } from "debounce"

import { Input, Select } from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"

import { api } from "~/lib/api"
import SettingsOption from "./settings-option"

const DEFAULT_GLOBAL_FONT_SIZE = 16

export default function AppearanceSettings() {
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
        title: "Cannot update appearance settings",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })
  const debouncedUpdateSettings = debounce(updateSettings, 500)
  const [globalFontFamily, setGlobalFontFamily] = React.useState(
    settings.globalFontFamily
  )
  const [globalFontSize, setGlobalFontSize] = React.useState(
    settings.globalFontSize.toString()
  )

  const onUpdateGlobalFontFamily = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setGlobalFontFamily(value)
    await debouncedUpdateSettings({
      data: { globalFontFamily: value },
    })
  }

  const onUpdateGlobalFontSize = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    const numValue = parseInt(value) || DEFAULT_GLOBAL_FONT_SIZE
    setGlobalFontSize(value)
    await debouncedUpdateSettings({
      data: { globalFontSize: numValue },
    })
  }

  const onUpdateColorscheme = async (value: string) => {
    await updateSettings({ data: { globalColorscheme: value } })
  }

  return (
    <div className="flex flex-col items-stretch divide-y divide-slate-800">
      <SettingsOption
        title="Font Family"
        description="Change global font family (needs refresh)"
      >
        <Input
          aria-label="Font family"
          placeholder="Inter, sans-serif"
          value={globalFontFamily}
          onChange={onUpdateGlobalFontFamily}
        />
      </SettingsOption>
      <SettingsOption
        title="Font Size"
        description="Change global font size (needs refresh)"
      >
        <Input
          aria-label="Font size"
          placeholder={DEFAULT_GLOBAL_FONT_SIZE.toString()}
          value={globalFontSize}
          onChange={onUpdateGlobalFontSize}
        />
      </SettingsOption>
      <SettingsOption
        title="Colorscheme"
        description="Change global colorscheme"
      >
        <Select
          aria-label="Select colorscheme"
          className="min-w-full"
          defaultValue="CruxAlpha"
          value={settings.globalColorscheme}
          placeholder="Choose a colorscheme"
          options={[{ value: "CruxAlpha", label: "Crux Alpha" }]}
          onValueChange={onUpdateColorscheme}
        />
      </SettingsOption>
    </div>
  )
}
