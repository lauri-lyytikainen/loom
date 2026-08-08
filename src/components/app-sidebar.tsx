import * as React from "react"
import { FileText, Trash2, Workflow, Layers } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { notebooks, tagColorClasses, tags } from "@/lib/mock-data"
import { useAppState, type View } from "@/lib/app-state"
import { cn } from "@/lib/utils"

const navMain: { title: string; view: View; icon: React.ElementType; count: number }[] = [
  { title: "Notes", view: "notes", icon: FileText, count: 4 },
  { title: "Mindmaps", view: "mindmaps", icon: Workflow, count: 2 },
  { title: "Flashcards", view: "flashcards", icon: Layers, count: 2 },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { activeView, setActiveView } = useAppState()

  return (
    <Sidebar {...props}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={activeView === item.view}
                  onClick={() => setActiveView(item.view)}
                  render={
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon />
                        <span
                          className={cn(
                            activeView === item.view ? "font-bold" : "font-normal"
                          )}
                        >
                          {item.title}
                        </span>
                      </div>
                    </div>
                  }
                />
                <SidebarMenuBadge>{item.count}</SidebarMenuBadge>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Notebooks</SidebarGroupLabel>
          <SidebarMenu>
            {notebooks.map((notebook) => (
              <SidebarMenuItem key={notebook.id}>
                <SidebarMenuButton
                  render={
                    <div className="flex items-center gap-2">
                      <span>{notebook.name}</span>
                    </div>
                  }
                />
                <SidebarMenuBadge>{notebook.count}</SidebarMenuBadge>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tags</SidebarGroupLabel>
          <SidebarMenu>
            {tags.map((tag) => (
              <SidebarMenuItem key={tag.id}>
                <SidebarMenuButton
                  render={
                    <div className="flex items-center gap-2">
                      <span
                        className={`size-2 rounded-full ${tagColorClasses[tag.color]}`}
                      />
                      <span>{tag.name}</span>
                    </div>
                  }
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Trash2 />
                  <span>Trash</span>
                </div>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
