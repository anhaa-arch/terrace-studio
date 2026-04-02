import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreVertical, Calendar, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getProjects } from "./actions";
import { CreateProjectDialog } from "@/components/projects/CreateProjectDialog";
import Link from "next/link";
import { format } from "date-fns";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Миний төслүүд</h1>
          <p className="text-muted-foreground italic">Төслийн жагсаалт болон загварчлал.</p>
        </div>
        <CreateProjectDialog />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 bg-white/5 border-white/10" placeholder="Төсөл хайх..." />
        </div>
        <Button variant="outline" className="border-white/10 bg-white/5">
          <Filter className="mr-2 h-4 w-4" /> Шүүлтүүр
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 studio-glass rounded-2xl border-dashed">
          <ImageIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground font-medium">Одоогоор төсөл байхгүй байна.</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Шинэ төсөл үүсгэж эхэлнэ үү.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="studio-glass studio-card-hover group h-full flex flex-col overflow-hidden">
                <div className="aspect-[16/10] w-full relative overflow-hidden bg-black/40">
                  <img 
                    src={project.original_image_url} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-bold text-lg truncate drop-shadow-md">
                      {project.title}
                    </p>
                  </div>
                </div>
                <CardHeader className="py-4 space-y-1 bg-black/10 flex-1">
                  {project.description && (
                    <CardDescription className="line-clamp-2 text-xs leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                      {project.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardFooter className="mt-auto px-4 py-4 flex items-center justify-between border-t border-white/5 bg-black/20">
                  <span className="flex items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <Calendar className="mr-1.5 h-3 w-3 text-primary" />
                    {format(new Date(project.created_at), "MMM d, yyyy")}
                  </span>
                  <div className="flex items-center space-x-1 text-[10px] font-bold text-primary group-hover:translate-x-1 transition-transform">
                    <span>НЭЭХ</span>
                    <Plus className="h-3 w-3 rotate-45" />
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
