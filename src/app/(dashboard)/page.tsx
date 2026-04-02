import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Layers, Sparkles, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
          Welcome back, Admin
        </h1>
        <p className="text-muted-foreground text-lg italic">
          Design the future of terrace architecture.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">12</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Designs Generated</CardTitle>
            <Layers className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">156</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Tokens Used</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">4.2k</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Efficiency Index</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">98.4%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1">
        <Card className="bg-white/5 border-white/10 overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <CardHeader>
            <CardTitle className="text-xl">Quick Design Generator</CardTitle>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center border-2 border-dashed border-white/5 m-6 mt-0 rounded-xl hover:border-primary/50 transition-colors cursor-pointer bg-black/20">
             <div className="text-center space-y-2">
               <Sparkles className="h-8 w-8 mx-auto text-primary animate-pulse" />
               <p className="text-muted-foreground">Click to start a new architectural design prompt</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
