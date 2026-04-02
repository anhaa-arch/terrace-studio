import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, Settings, LogOut, Sparkles, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navItems = [
    { href: "/", label: "Хянах самбар", icon: LayoutDashboard },
    { href: "/projects", label: "Төслүүд", icon: FolderKanban },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 border-r border-white/5 bg-sidebar/50 backdrop-blur-3xl flex-col p-6 space-y-8 z-20">
        <div className="flex items-center space-x-3 px-2">
          <div className="p-2.5 bg-primary/20 rounded-xl ring-1 ring-primary/40 shadow-lg shadow-primary/20">
            <Sparkles className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Terrace Studio</span>
        </div>

        <nav className="flex-1 flex flex-col space-y-1.5 focus-visible:outline-none">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground hover:text-white hover:bg-white/5 h-12 px-4 transition-all duration-300 group"
              >
                <item.icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Button>
            </Link>
          ))}
          <div className="flex-1" />
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-white hover:bg-white/5 h-12 px-4 transition-all duration-300">
              <Settings className="mr-3 h-5 w-5" />
              Тохиргоо
            </Button>
          </Link>
        </nav>

        <div className="pt-4 border-t border-white/5">
          <form action="/auth/signout" method="post">
            <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 h-12 px-4 group">
              <LogOut className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Гарах</span>
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between h-16 px-6 border-b border-white/5 bg-background/80 backdrop-blur-lg z-30">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg tracking-tight">Terrace Studio</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 bg-sidebar border-white/5 p-6">
              <SheetHeader className="mb-8">
                <SheetTitle className="flex items-center space-x-3">
                   <Sparkles className="w-6 h-6 text-primary" />
                   <span className="text-white">Terrace Studio</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button variant="ghost" className="w-full justify-start text-muted-foreground h-12">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-white/5">
                   <Link href="/settings">
                      <Button variant="ghost" className="w-full justify-start text-muted-foreground h-12">
                        <Settings className="mr-3 h-5 w-5" />
                        Тохиргоо
                      </Button>
                   </Link>
                   <form action="/auth/signout" method="post" className="mt-2">
                      <Button variant="ghost" className="w-full justify-start text-destructive h-12 hover:bg-destructive/10">
                        <LogOut className="mr-3 h-5 w-5" />
                        Гарах
                      </Button>
                   </form>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        {/* Scrollable Content Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
