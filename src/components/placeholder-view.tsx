import { Plus, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PlaceholderView({
  title,
  icon: Icon,
  actionLabel,
}: {
  title: string
  icon: LucideIcon
  actionLabel: string
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
      <Icon className="size-8" />
      <p>{title}</p>
      <Button variant="outline" size="sm">
        <Plus />
        {actionLabel}
      </Button>
    </div>
  )
}
