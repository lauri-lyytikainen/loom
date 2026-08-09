import { load, type Store } from "@tauri-apps/plugin-store"

const STORE_FILENAME = "settings.json"
let storePromise: Promise<Store> | null = null

function getStore() {
  if (!storePromise) {
    storePromise = load(STORE_FILENAME, { autoSave: false }).catch((err: unknown) => {
      // Don't cache a failed load — let the next call retry instead of
      // permanently breaking persistence for the rest of the session.
      storePromise = null
      throw err
    })
  }
  return storePromise
}

export async function getPersistedVaultPath(): Promise<string | null> {
  const store = await getStore()
  return (await store.get<string>("vaultPath")) ?? null
}

export async function setPersistedVaultPath(path: string | null) {
  const store = await getStore()
  if (path === null) await store.delete("vaultPath")
  else await store.set("vaultPath", path)
  await store.save()
}

export type PersistedTheme = "light" | "dark"

export async function getPersistedTheme(): Promise<PersistedTheme | null> {
  const store = await getStore()
  return (await store.get<PersistedTheme>("theme")) ?? null
}

export async function setPersistedTheme(theme: PersistedTheme) {
  const store = await getStore()
  await store.set("theme", theme)
  await store.save()
}
