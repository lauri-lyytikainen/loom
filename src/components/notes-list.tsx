import { FileText, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { notes } from "@/lib/mock-data"
import { useAppState } from "@/lib/app-state"
import { cn } from "@/lib/utils"

export function NotesList() {
  const { selectedNoteId, setSelectedNoteId } = useAppState()

  return (
    <div className="flex h-full w-80 shrink-0 flex-col border-r">
      <div className="flex items-center justify-between p-4 pb-3">
        <h2 className="text-lg font-semibold">Notes</h2>
        <Button variant="ghost" size="icon-sm">
          <Plus />
        </Button>
      </div>
      <div className="px-4 pb-3">
        <Input placeholder="Filter" />
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 px-2 pb-2">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelectedNoteId(note.id)}
              className={cn(
                "flex flex-col gap-1 rounded-md p-2.5 text-left transition-colors hover:bg-muted",
                selectedNoteId === note.id && "bg-muted"
              )}
            >
              <div className="flex items-center gap-1.5">
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate font-medium">{note.title}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{note.updatedAt}</span>
                <span className="text-primary">{note.tags[0]}</span>
              </div>
              <p className="truncate text-sm text-muted-foreground">
                {note.preview}
              </p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
