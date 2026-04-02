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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="studio-glass studio-card-hover group border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Идэвхтэй төсөл</CardTitle>
            <FolderKanban className="h-4 w-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-white tracking-tighter">{stats.projects}</div>
            <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase">Нийт бүрэн хэмжээ</p>
          </CardContent>
        </Card>
        <Card className="studio-glass studio-card-hover group border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Нийт загвар</CardTitle>
            <Layers className="h-4 w-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-white tracking-tighter">{stats.designs}</div>
            <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase">AI Боловсруулалт</p>
          </CardContent>
        </Card>
        <Card className="studio-glass studio-card-hover group border-white/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">AI Кредит</CardTitle>
            <Sparkles className="h-4 w-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-white tracking-tighter">Infinite</div>
            <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase">Хязгааргүй эрх</p>
          </CardContent>
        </Card>
        <Card className="studio-glass studio-card-hover group border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">Үр ашиг</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-white tracking-tighter">99.9%</div>
            <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase">Хугацаа хэмнэлт</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 grid-cols-1">
        <Link href="/projects">
          <Card className="studio-glass studio-card-hover overflow-hidden relative group cursor-pointer border-white/10 hover:border-primary/50 transition-all p-1">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
            <CardHeader className="p-8">
              <div className="flex items-center space-x-1 mb-2">
                 <div className="w-8 h-px bg-primary" />
                 <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Ажлын урсгал</span>
              </div>
              <CardTitle className="text-3xl font-bold text-white tracking-tight">Шуурхай загвар гаргагч</CardTitle>
            </CardHeader>
            <CardContent className="h-48 md:h-64 flex items-center justify-center border border-dashed border-white/5 mx-8 mb-8 rounded-2xl group-hover:border-primary/50 transition-colors bg-black/40 relative">
               <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               <div className="text-center space-y-4 relative z-10">
                 <div className="p-5 studio-glass rounded-full inline-block group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-primary/20">
                    <Plus className="h-10 w-10 text-primary-foreground fill-primary-foreground animate-pulse" />
                 </div>
                 <p className="text-muted-foreground italic font-medium">Төсөл сонгон AI загвар гаргаж эхлэх</p>
               </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
