"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowLeft, Download, Share2, History, Wand2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center space-x-4">
        <Link href="/projects">
          <Button variant="ghost" size="icon" className="hover:bg-white/5">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Sunset Villa Terrace</h1>
          <p className="text-muted-foreground">Project ID: {params.id} • Last modified 2h ago</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Design Generator Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white/5 border-white/10 overflow-hidden">
            <CardHeader className="border-b border-white/5 bg-white/5">
              <CardTitle className="text-lg flex items-center">
                <Wand2 className="mr-2 h-5 w-5 text-primary" />
                AI Design Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-black/40 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-center space-y-4 p-8 z-10">
                  <div className="p-4 bg-primary/20 rounded-full inline-block animate-pulse">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground max-w-md">
                    Ready to generate a new architectural deck design. 
                    Input your parameters to begin the transformation.
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <textarea 
                  className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Describe the desired terrace style (e.g., 'Modern minimalist wooden deck with glass railings and integrated LED lighting during golden hour')..."
                />
                <Button 
                  className="w-full h-12 font-bold text-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
                  onClick={() => setIsGenerating(true)}
                  disabled={isGenerating}
                >
                  {isGenerating ? "Synthesizing Design..." : "Generate AI Sketch"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar/History Column */}
        <div className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <History className="mr-2 h-5 w-5 text-muted-foreground" />
                Recent Sketches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex space-x-3 group cursor-pointer">
                  <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 group-hover:border-primary/50 transition-colors" />
                  <div className="space-y-1 py-1">
                    <p className="text-sm font-medium">Sketch_v{i}.png</p>
                    <p className="text-xs text-muted-foreground">Generated 2h ago</p>
                    <div className="flex space-x-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="h-3 w-3 text-muted-foreground hover:text-white" />
                      <Share2 className="h-3 w-3 text-muted-foreground hover:text-white" />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-muted-foreground hover:text-foreground">
                View All History
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6 space-y-4">
              <h4 className="font-bold text-primary">Terrace Pro Tip</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use specific material keywords like 'Ipe wood', 'brushed aluminum', or 'natural slate' to improve AI accuracy for structural details.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
