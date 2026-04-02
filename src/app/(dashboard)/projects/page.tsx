import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

const MOCK_PROJECTS = [
  { id: 1, name: "Sunset Villa Terrace", status: "In Progress", sketches: 12, lastModified: "2h ago" },
  { id: 2, name: "Skyline Garden", status: "Completed", sketches: 45, lastModified: "1d ago" },
  { id: 3, name: "Modernist Deck", status: "Draft", sketches: 3, lastModified: "5m ago" },
  { id: 4, name: "Alpine Retreat", status: "In Progress", sketches: 8, lastModified: "1w ago" },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground italic">Manage and generate deck designs.</p>
        </div>
        <Button className="font-semibold shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 bg-white/5 border-white/10" placeholder="Search projects..." />
        </div>
        <Button variant="outline" className="border-white/10 bg-white/5">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {MOCK_PROJECTS.map((project) => (
          <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    project.status === "Completed" ? "bg-green-500/10 text-green-500" :
                    project.status === "In Progress" ? "bg-blue-500/10 text-blue-500" :
                    "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {project.status}
                  </span>
                  <span className="text-xs text-muted-foreground">• {project.sketches} sketches</span>
                  <span className="text-xs text-muted-foreground">• Modified {project.lastModified}</span>
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
