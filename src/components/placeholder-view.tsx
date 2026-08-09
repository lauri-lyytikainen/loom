import { Plus, type LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function PlaceholderView({
  title,
  description,
  icon: Icon,
  actionLabel,
}: {
  title: string
  description: string
  icon: LucideIcon
  actionLabel: string
}) {
  return (
    <Empty className="flex-1 border-none">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <Plus />
          {actionLabel}
        </Button>
      </EmptyContent>
    </Empty>
  )
}
