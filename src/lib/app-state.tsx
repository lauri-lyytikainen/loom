import * as React from "react"

export type View = "notes" | "mindmaps" | "flashcards"

interface AppState {
  activeView: View
  setActiveView: (view: View) => void
  selectedNoteId: string | null
  setSelectedNoteId: (id: string | null) => void
}

const AppStateContext = React.createContext<AppState | null>(null)

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = React.useState<View>("notes")
  const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(
    "cell-structure"
  )

  return (
    <AppStateContext.Provider
      value={{ activeView, setActiveView, selectedNoteId, setSelectedNoteId }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export function useAppState() {
  const context = React.useContext(AppStateContext)
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider")
  }
  return context
}
