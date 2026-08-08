import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "./components/ui/separator"
import { AppStateProvider, useAppState } from "@/lib/app-state"

const viewTitles = {
  notes: "Notes",
  mindmaps: "Mindmaps",
  flashcards: "Flashcards",
}

function LayoutHeader() {
  const { activeView } = useAppState()
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2"/>
        <span className="font-medium">{viewTitles[activeView]}</span>
      </div>
    </header>
  )
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppStateProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <LayoutHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AppStateProvider>
  )
}
