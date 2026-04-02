"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Image as ImageIcon, Sparkles } from "lucide-react";
import { Design } from "@/types/database";
import { format } from "date-fns";

interface DesignHistoryProps {
  designs: Design[];
}

export function DesignHistory({ designs }: DesignHistoryProps) {
  return (
    <Card className="studio-glass border-white/10 shadow-2xl">
      <CardHeader className="border-b border-white/5 bg-white/[0.02] py-5">
        <CardTitle className="text-lg font-bold flex items-center text-white tracking-tight">
          <History className="mr-3 h-5 w-5 text-primary" />
          Өмнөх загварууд
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {designs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center space-y-3 opacity-40">
            <div className="p-3 bg-white/5 rounded-full">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Түүх байхгүй</p>
          </div>
        ) : (
          <div className="space-y-4">
            {designs.map((design) => (
              <div 
                key={design.id} 
                className="group relative rounded-xl overflow-hidden bg-black/40 border border-white/5 hover:border-primary/40 transition-all cursor-pointer shadow-lg"
              >
                <div className="aspect-video w-full relative">
                  <img 
                    src={design.generated_image_url || "/placeholder-design.jpg"} 
                    alt="Generated design" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-2 right-2">
                    <div className="bg-primary/20 backdrop-blur-md border border-primary/40 p-1.5 rounded-lg shadow-xl translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
                      <Sparkles className="h-3.5 w-3.5 text-primary-foreground fill-primary-foreground" />
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                     <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 drop-shadow-md">
                       {design.type}
                     </p>
                     <p className="text-[10px] text-white/60 font-medium truncate drop-shadow-md">
                       {design.material || "Материал тодорхойгүй"} • {design.width_cm}x{design.depth_cm}см
                     </p>
                  </div>
                </div>
                <div className="px-3 py-2 flex items-center justify-between bg-black/20">
                   <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-tighter">
                     {format(new Date(design.created_at), "HH:mm • MMM d")}
                   </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
