"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/database";
import { format } from "date-fns";

type Design = Database["public"]["Tables"]["designs"]["Row"];

interface DesignHistoryProps {
  designs: Design[];
}

export function DesignHistory({ designs }: DesignHistoryProps) {
  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="text-lg flex items-center text-white">
          <History className="mr-2 h-5 w-5 text-muted-foreground" />
          Загварын түүх
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {designs.length === 0 ? (
          <p className="text-xs text-muted-foreground text-center py-4">
            Одоогоор загвар үүсгээгүй байна.
          </p>
        ) : (
          designs.map((design) => (
            <div key={design.id} className="flex space-x-3 group cursor-pointer">
              <div className="w-20 h-20 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex-shrink-0 group-hover:border-primary/50 transition-colors">
                {design.generated_image_url ? (
                  <img src={design.generated_image_url} alt={design.type} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground">Зураггүй</span>
                  </div>
                )}
              </div>
              <div className="space-y-1 py-1">
                <p className="text-sm font-medium text-white">{design.type}</p>
                <p className="text-[10px] text-muted-foreground">
                  {format(new Date(design.created_at), "yyyy-MM-dd HH:mm")}
                </p>
                <div className="flex space-x-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   {design.generated_image_url && (
                     <a href={design.generated_image_url} target="_blank" rel="noopener noreferrer">
                       <Download className="h-3 w-3 text-muted-foreground hover:text-white" />
                     </a>
                   )}
                  <Share2 className="h-3 w-3 text-muted-foreground hover:text-white" />
                </div>
              </div>
            </div>
          ))
        )}
        {designs.length > 0 && (
          <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
            Бүх түүхийг үзэх
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
