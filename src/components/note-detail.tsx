import { Eye, FileText, Pencil, Plus, SquareSplitHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { notes, type OutputBlock } from "@/lib/mock-data"
import { useAppState } from "@/lib/app-state"

function OutputBlocks({ blocks }: { blocks: OutputBlock[] }) {
  return (
    <div className="flex flex-col gap-4 text-sm">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h3 key={i} className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
              {block.text}
            </h3>
          )
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="flex flex-col gap-2">
              {block.items.map((item) => (
                <li key={item.term} className="flex gap-2">
                  <span>·</span>
                  <span>
                    <span className="font-bold">{item.term}</span>
                    {item.text ? ` — ${item.text}` : null}
                  </span>
                </li>
              ))}
            </ul>
          )
        }
        return <p key={i}>{block.text}</p>
      })}
    </div>
  )
}

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
          <OutputBlocks blocks={note.output} />
        </div>
      </div>
    </div>
  )
}
