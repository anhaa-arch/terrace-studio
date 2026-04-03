import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { getProjectById, getDesignsByProjectId } from "../actions";
import { DesignGenerator } from "@/components/projects/DesignGenerator";
import { DesignHistory } from "@/components/projects/DesignHistory";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  console.log("Rendering detail page for ID:", params.id);
  
  const project = await getProjectById(params.id);
  
  if (!project) {
    console.error(`Project not found for ID: ${params.id}`);
    notFound();
  }

  const designs = await getDesignsByProjectId(params.id);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/projects">
          <Button variant="ghost" size="icon" className="hover:bg-white/5 h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-white">{project.title}</h1>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground uppercase tracking-widest">
            <span>ID: {typeof project.id === 'string' && project.id.includes("-") ? project.id.split("-")[0] : project.id}</span>
            <span>•</span>
            <span>Үүсгэсэн: {format(new Date(project.created_at), "yyyy-MM-dd")}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content: Original Image and Generator */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="studio-glass border-white/20 p-0 overflow-hidden shadow-2xl group">
             <div className="aspect-[16/10] bg-black/40 relative overflow-hidden">
                <img 
                  src={project.original_image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest mb-2">
                    <div className="w-8 h-px bg-primary" />
                    <span>Эх зураг</span>
                  </div>
                  <h3 className="text-white text-2xl font-bold tracking-tight pr-12 drop-shadow-lg">
                    {project.title}
                  </h3>
                   {project.description && (
                     <p className="text-white/70 text-sm mt-3 line-clamp-2 max-w-2xl font-medium">
                        {project.description}
                     </p>
                   )}
                </div>
             </div>
          </Card>

          {/* AI Generator Section */}
          <DesignGenerator projectId={project.id} />
        </div>

        {/* Sidebar: History and Tips */}
        <div className="space-y-8">
          <DesignHistory designs={designs} />

          <Card className="studio-glass border-primary/20 relative overflow-hidden group bg-primary/5">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Info className="h-16 w-16 text-primary" />
            </div>
            <CardContent className="p-8 space-y-4">
              <h4 className="font-bold text-primary flex items-center text-lg tracking-tight">
                Архитектур зөвлөгөө
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Материалын төрлийг (жишээ нь: "Ipe wood", "natural slate") тодорхой бичвэл AI илүү нарийвчлалтай, бодит бүтэцтэй зураг гаргана.
              </p>
              <div className="pt-2">
                <Button variant="link" className="text-primary p-0 text-sm font-bold hover:no-underline hover:text-primary/80 transition-colors">
                  Дэлгэрэнгүй үзэх →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
