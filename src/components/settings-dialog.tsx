import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsVaultPanel } from "@/components/settings-vault-panel"
import { SettingsAppearancePanel } from "@/components/settings-appearance-panel"
import { useSettings } from "@/lib/settings-context"

const tabTriggerClass =
  "justify-start after:bg-indigo-500! hover:bg-indigo-500/5! hover:text-indigo-600! data-active:bg-indigo-500/10! data-active:text-indigo-600! dark:hover:bg-indigo-500/10! dark:hover:text-indigo-400! dark:data-active:bg-indigo-500/15! dark:data-active:text-indigo-400!"

export function SettingsDialog({ children }: { children: React.ReactElement }) {
  const { revalidateVault } = useSettings()

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) void revalidateVault()
      }}
    >
      <DialogTrigger render={children} nativeButton={false} />
      <DialogContent className="overflow-hidden sm:max-w-2xl">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Manage your vault location and appearance preferences.
        </DialogDescription>
        {/* Negative margin cancels DialogContent's own p-6 so the tab rail sits flush against the dialog edges. */}
        <div className="-m-6 flex min-h-[26rem]">
          <Tabs defaultValue="vault" orientation="vertical" className="flex-1 gap-0">
            <TabsList
              variant="line"
              className="w-44 shrink-0 items-stretch gap-1 rounded-none border-r border-border bg-muted/30 p-3"
            >
              <TabsTrigger value="vault" className={tabTriggerClass}>
                Vault
              </TabsTrigger>
              <TabsTrigger value="appearance" className={tabTriggerClass}>
                Appearance
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-y-auto p-6">
              <TabsContent value="vault">
                <SettingsVaultPanel />
              </TabsContent>
              <TabsContent value="appearance">
                <SettingsAppearancePanel />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
