import * as React from "react"
import {
  pickVaultFolder,
  validateVaultPath,
  type VaultPathStatus,
} from "@/lib/vault"
import {
  getPersistedVaultPath,
  setPersistedVaultPath,
  getPersistedTheme,
  setPersistedTheme,
} from "@/lib/settings-store"

export type Theme = "light" | "dark"

interface SettingsContextValue {
  vaultPath: string | null
  vaultStatus: VaultPathStatus | null
  isValidatingVault: boolean
  chooseVaultFolder: () => Promise<void>
  revalidateVault: () => Promise<void>
  theme: Theme
  setTheme: (theme: Theme) => void
}

const SettingsContext = React.createContext<SettingsContextValue | null>(null)

const UNKNOWN_VAULT_STATUS: VaultPathStatus = {
  exists: false,
  isDirectory: false,
  writable: false,
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [vaultPath, setVaultPath] = React.useState<string | null>(null)
  const [vaultStatus, setVaultStatus] = React.useState<VaultPathStatus | null>(null)
  const [isValidatingVault, setIsValidatingVault] = React.useState(false)
  const [theme, setThemeState] = React.useState<Theme>("light")

  // Guards against a slower, superseded validation call overwriting the
  // result of a call that started later (e.g. a stale focus-triggered
  // revalidation of the old path racing a fresh chooseVaultFolder pick).
  const validationIdRef = React.useRef(0)
  // Prevents overlapping chooseVaultFolder invocations (e.g. a double click).
  const isChoosingRef = React.useRef(false)

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [persistedPath, persistedTheme] = await Promise.all([
          getPersistedVaultPath(),
          getPersistedTheme(),
        ])
        if (cancelled) return
        const initialTheme =
          persistedTheme ??
          (window.matchMedia?.("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light")
        setVaultPath(persistedPath)
        setThemeState(initialTheme)

        if (persistedPath) {
          const id = ++validationIdRef.current
          setIsValidatingVault(true)
          try {
            const status = await validateVaultPath(persistedPath)
            if (!cancelled && validationIdRef.current === id) setVaultStatus(status)
          } catch {
            if (!cancelled && validationIdRef.current === id) {
              setVaultStatus(UNKNOWN_VAULT_STATUS)
            }
          } finally {
            if (!cancelled && validationIdRef.current === id) setIsValidatingVault(false)
          }
        }
      } catch {
        // getPersistedVaultPath/getPersistedTheme rejected (e.g. running
        // outside a real Tauri webview) — keep the default empty state.
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const revalidateVault = React.useCallback(async () => {
    if (!vaultPath) return
    const id = ++validationIdRef.current
    setIsValidatingVault(true)
    try {
      const status = await validateVaultPath(vaultPath)
      if (validationIdRef.current === id) setVaultStatus(status)
    } catch {
      if (validationIdRef.current === id) setVaultStatus(UNKNOWN_VAULT_STATUS)
    } finally {
      if (validationIdRef.current === id) setIsValidatingVault(false)
    }
  }, [vaultPath])

  React.useEffect(() => {
    function onFocus() {
      if (vaultPath) void revalidateVault()
    }
    window.addEventListener("focus", onFocus)
    return () => window.removeEventListener("focus", onFocus)
  }, [vaultPath, revalidateVault])

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next)
    void setPersistedTheme(next).catch(() => {})
  }, [])

  const chooseVaultFolder = React.useCallback(async () => {
    if (isChoosingRef.current) return
    isChoosingRef.current = true
    try {
      const picked = await pickVaultFolder().catch(() => null)
      if (!picked) return
      const id = ++validationIdRef.current
      setIsValidatingVault(true)
      try {
        const status = await validateVaultPath(picked)
        if (validationIdRef.current === id) {
          setVaultPath(picked)
          setVaultStatus(status)
        }
        void setPersistedVaultPath(picked).catch(() => {})
      } catch {
        if (validationIdRef.current === id) {
          setVaultPath(picked)
          setVaultStatus(UNKNOWN_VAULT_STATUS)
        }
      } finally {
        if (validationIdRef.current === id) setIsValidatingVault(false)
      }
    } finally {
      isChoosingRef.current = false
    }
  }, [])

  return (
    <SettingsContext.Provider
      value={{
        vaultPath,
        vaultStatus,
        isValidatingVault,
        chooseVaultFolder,
        revalidateVault,
        theme,
        setTheme,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = React.useContext(SettingsContext)
  if (!ctx) throw new Error("useSettings must be used within a SettingsProvider")
  return ctx
}
