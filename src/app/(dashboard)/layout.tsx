import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, Settings, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background text-foreground bg-studio-gradient overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-background/40 backdrop-blur-xl flex flex-col p-6 space-y-8 z-10">
        <div className="flex items-center space-x-3 px-2">
          <div className="p-2 bg-primary/10 rounded-lg ring-1 ring-primary/20">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">Terrace Studio</span>
        </div>

        <nav className="flex-1 flex flex-col space-y-2">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-white/5 h-11 px-4">
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Overview
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-white/5 h-11 px-4">
              <FolderKanban className="mr-3 h-5 w-5" />
              Projects
            </Button>
          </Link>
          <div className="flex-1" />
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-white/5 h-11 px-4">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Button>
          </Link>
        </nav>

        <div className="pt-4 border-t border-white/5">
          <form action="/auth/signout" method="post">
            <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 h-11 px-4">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
