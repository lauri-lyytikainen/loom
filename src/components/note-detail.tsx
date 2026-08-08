import { Eye, FileText, Pencil, Plus, SquareSplitHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { notes } from "@/lib/mock-data"
import { useAppState } from "@/lib/app-state"

export function NoteDetail() {
  const { selectedNoteId } = useAppState()
  const note = notes.find((n) => n.id === selectedNoteId)

  if (!note) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 text-muted-foreground">
        <FileText className="size-8" />
        <p>Select a note to view it</p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b p-4">
        <div>
          <h1 className="text-2xl font-bold">{note.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
            <Button variant="ghost" size="xs">
              <Plus />
              Add tag
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm">
            <Pencil />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <SquareSplitHorizontal />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <Eye />
          </Button>
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 divide-x overflow-hidden">
        <div className="overflow-auto p-4">
          <div className="whitespace-pre-wrap font-mono text-sm text-muted-foreground">
            {note.editorText}
          </div>
        </div>
        <div className="overflow-auto p-4">
          <div className="whitespace-pre-wrap text-sm">{note.outputText}</div>
        </div>
      </div>
    </div>
  )
}
