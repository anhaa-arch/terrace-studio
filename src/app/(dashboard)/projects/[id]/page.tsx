import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Share2, History, Wand2, Info } from "lucide-react";
import Link from "next/link";
import { getProjectById, getDesignsByProjectId } from "../actions";
import { DesignGenerator } from "@/components/projects/DesignGenerator";
import { DesignHistory } from "@/components/projects/DesignHistory";
import { format } from "date-fns";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);
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
            <span>ID: {project.id.split("-")[0]}</span>
            <span>•</span>
            <span>Үүсгэсэн: {format(new Date(project.created_at), "yyyy-MM-dd")}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content: Original Image and Generator */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/5 border-white/10 overflow-hidden shadow-2xl">
            <CardHeader className="border-b border-white/5 bg-white/5 py-4">
              <CardTitle className="text-sm font-medium flex items-center text-muted-foreground uppercase tracking-widest">
                <ImageIcon className="mr-2 h-4 w-4" />
                Эх зураг (Original Image)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="aspect-[16/10] bg-black/40 relative group overflow-hidden">
                  <img 
                    src={project.original_image_url} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                     <p className="text-white/60 text-xs italic line-clamp-2">
                        {project.description || "Тайлбар ороогүй байна."}
                     </p>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* AI Generator Section */}
          <DesignGenerator projectId={project.id} />
        </div>

        {/* Sidebar: History and Tips */}
        <div className="space-y-6">
          <DesignHistory designs={designs} />

          <Card className="bg-primary/5 border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Info className="h-12 w-12" />
            </div>
            <CardContent className="p-6 space-y-4">
              <h4 className="font-bold text-primary flex items-center">
                Зөвлөгөө
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Загвар гаргахдаа материалын төрлийг (жишээ нь: "Ган", "Мод") тодорхой бичвэл AI илүү нарийвчлалтай зураг гаргах боломжтой болно.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper to keep icon imports clean
function ImageIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}
