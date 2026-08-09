import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useSettings } from "@/lib/settings-context"

export function SettingsAppearancePanel() {
  const { theme, setTheme } = useSettings()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">Choose how Loom looks.</p>
      </div>
      <div className="flex items-center justify-between rounded-md border border-border p-3">
        <Label htmlFor="dark-mode-switch" className="text-sm">
          Dark Mode
        </Label>
        <Switch
          id="dark-mode-switch"
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>
    </div>
  )
}
