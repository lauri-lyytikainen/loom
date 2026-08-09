import { invoke } from "@tauri-apps/api/core"
import { open } from "@tauri-apps/plugin-dialog"

export interface VaultPathStatus {
  exists: boolean
  isDirectory: boolean
  writable: boolean
}

/** Opens the native OS folder picker. Returns null if the user cancelled. */
export async function pickVaultFolder(): Promise<string | null> {
  const selected = await open({
    directory: true,
    multiple: false,
    title: "Choose your vault folder",
  })
  return typeof selected === "string" ? selected : null
}

export async function validateVaultPath(path: string): Promise<VaultPathStatus> {
  return invoke<VaultPathStatus>("validate_vault_path", { path })
}
