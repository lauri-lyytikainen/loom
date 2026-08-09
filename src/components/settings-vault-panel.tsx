import { CheckCircle2, AlertTriangle, FolderX, Loader2, FolderOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSettings } from "@/lib/settings-context"
import type { VaultPathStatus } from "@/lib/vault"

export function SettingsVaultPanel() {
  const { vaultPath, vaultStatus, isValidatingVault, chooseVaultFolder, revalidateVault } =
    useSettings()

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-medium">Vault Location</h3>
        <p className="text-sm text-muted-foreground">
          Choose the folder on your computer where Loom will keep your notes.
        </p>
      </div>

      <div className="rounded-md border border-border bg-muted/30 p-3">
        <p className="truncate font-mono text-xs text-foreground" title={vaultPath ?? undefined}>
          {vaultPath ?? "No vault selected yet"}
        </p>
      </div>

      {isValidatingVault && (
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Loader2 className="size-3.5 animate-spin" /> Checking folder…
        </p>
      )}

      {!isValidatingVault && vaultPath && vaultStatus && (
        <StatusMessage
          status={vaultStatus}
          onRetry={() => void revalidateVault()}
          onChoose={() => void chooseVaultFolder()}
        />
      )}

      <div className="flex gap-2">
        <Button
          variant={vaultPath ? "outline" : "default"}
          disabled={isValidatingVault}
          onClick={() => void chooseVaultFolder()}
        >
          <FolderOpen /> {vaultPath ? "Change" : "Choose Folder"}
        </Button>
      </div>
    </div>
  )
}

function StatusMessage({
  status,
  onRetry,
  onChoose,
}: {
  status: VaultPathStatus
  onRetry: () => void
  onChoose: () => void
}) {
  if (status.exists && status.isDirectory && status.writable) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
        <CheckCircle2 className="size-3.5" /> Vault is ready
      </p>
    )
  }
  if (!status.exists) {
    return (
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-1.5 text-sm text-destructive">
          <FolderX className="size-3.5" /> This folder could not be found. It may have been
          moved, renamed, or deleted.
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={onRetry}>
            Retry
          </Button>
          <Button size="sm" onClick={onChoose}>
            Locate Vault
          </Button>
        </div>
      </div>
    )
  }
  if (!status.isDirectory) {
    return (
      <p className="flex items-center gap-1.5 text-sm text-destructive">
        <AlertTriangle className="size-3.5" /> This path exists but isn't a folder.
      </p>
    )
  }
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-1.5 text-sm text-destructive">
        <AlertTriangle className="size-3.5" /> Loom doesn't have permission to write to this
        folder.
      </p>
      <Button size="sm" variant="outline" onClick={onRetry} className="w-fit">
        Retry
      </Button>
    </div>
  )
}
