import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, Layers, Sparkles, TrendingUp, Plus } from "lucide-react";
import { getDashboardStats } from "./projects/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
          Сайн байна уу, Админ
        </h1>
        <p className="text-muted-foreground text-lg italic">
          Террас архитектурын ирээдүйг загварчлаарай.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Идэвхтэй төсөл</CardTitle>
            <FolderKanban className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-white">{stats.projects}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Нийт загвар</CardTitle>
            <Layers className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-white">{stats.designs}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Кредит</CardTitle>
            <Sparkles className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-white">Infinite</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Үр ашиг</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono text-white">99.9%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1">
        <Link href="/projects">
          <Card className="bg-white/5 border-white/10 overflow-hidden relative group cursor-pointer hover:border-primary/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CardHeader>
              <CardTitle className="text-xl text-white">Шуурхай загвар гаргагч</CardTitle>
            </CardHeader>
            <CardContent className="h-48 flex items-center justify-center border-2 border-dashed border-white/5 m-6 mt-0 rounded-xl group-hover:border-primary/50 transition-colors bg-black/20">
               <div className="text-center space-y-2">
                 <Plus className="h-8 w-8 mx-auto text-primary animate-pulse" />
                 <p className="text-muted-foreground italic">Төсөл сонгон AI загвар гаргаж эхлэх</p>
               </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
