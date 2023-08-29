import { Select } from "@acme/web-ui"
import { useToast } from "@acme/web-ui/hooks"

import { api } from "~/lib/api"
import { generateThemeKey } from "~/lib/utils"
import SettingsOption from "./settings-option"

export default function PreviewSettings() {
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
        title: "Cannot update preview settings",
        description: err.data?.zodError?.fieldErrors?.data?.[0] ?? err.message,
      })
    },
  })

  const onUpdatePreviewCodeblockTheme = async (value: string) => {
    await updateSettings({ data: { previewCodeblockTheme: value } })
  }

  return (
    <div className="flex flex-col items-stretch divide-y divide-slate-800">
      <SettingsOption
        title="Codeblock Theme"
        description="Change preview codeblock theme"
      >
        <Select
          aria-label="Select codeblock theme"
          className="min-w-full"
          defaultValue="dracula"
          value={settings.previewCodeblockTheme}
          onValueChange={onUpdatePreviewCodeblockTheme}
          placeholder="Choose a tab size"
          options={builtinThemes.map((t) => ({
            label: t,
            value: generateThemeKey(t),
          }))}
        />
      </SettingsOption>
    </div>
  )
}

const builtinThemes = [
  "Dark Plus",
  "Dracula Soft",
  "Dracula",
  "Github Dark Dimmed",
  "Github Dark",
  "Github Light",
  "HC Light",
  "Light Plus",
  "Material Theme Darker",
  "Material Theme Lighter",
  "Material Theme Ocean",
  "Material Theme Palenight",
  "Material Theme",
  "Min Dark",
  "Min Light",
  "Monokai",
  "Nord",
  "One Dark Pro",
  "Poimandres",
  "Rose Pine Dawn",
  "Rose Pine Moon",
  "Rose Pine",
  "Slack Dark",
  "Slack Ochin",
  "Solarized Dark",
  "Solarized Light",
  "Vitesse Dark",
  "Vitesse Light",
]
