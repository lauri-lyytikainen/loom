import { Layers, Workflow } from "lucide-react"

import { NotesList } from "@/components/notes-list"
import { NoteDetail } from "@/components/note-detail"
import { PlaceholderView } from "@/components/placeholder-view"
import { useAppState } from "@/lib/app-state"
import "./App.css"

function App() {
  const { activeView } = useAppState()

  if (activeView === "mindmaps") {
    return (
      <PlaceholderView
        title="No mindmaps yet"
        description="Create a mindmap to visually connect your ideas and notes."
        icon={Workflow}
        actionLabel="New Mindmap"
      />
    )
  }

  if (activeView === "flashcards") {
    return (
      <PlaceholderView
        title="No flashcards yet"
        description="Create a deck to start studying with flashcards."
        icon={Layers}
        actionLabel="New Flashcard Deck"
      />
    )
  }

  return (
    <div className="flex h-full flex-1 overflow-hidden">
      <NotesList />
      <NoteDetail />
    </div>
  )
}

export default App
