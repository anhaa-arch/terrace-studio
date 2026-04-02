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
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-dashed border-white/10 rounded-2xl">
          <ImageIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <p className="text-muted-foreground">Одоогоор төсөл байхгүй байна.</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Шинэ төсөл үүсгэж эхэлнэ үү.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group h-full flex flex-col overflow-hidden hover:scale-[1.02] active:scale-[0.98]">
                <div className="aspect-video w-full relative overflow-hidden bg-black/40">
                  <img 
                    src={project.original_image_url} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardHeader className="py-4 space-y-1">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold truncate pr-6">{project.title}</CardTitle>
                    <MoreVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  {project.description && (
                    <CardDescription className="line-clamp-2 text-xs leading-relaxed">
                      {project.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardFooter className="mt-auto pt-0 pb-4 flex items-center justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-widest border-t border-white/5 pt-3 mx-4 px-0">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {format(new Date(project.created_at), "MMM d, yyyy")}
                  </span>
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded ring-1 ring-primary/20">
                    ҮЗЭХ
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
