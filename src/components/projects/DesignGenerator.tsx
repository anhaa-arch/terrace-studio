"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Wand2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DesignGeneratorProps {
  projectId: string;
}

export function DesignGenerator({ projectId }: DesignGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("TERRACE");
  const [material, setMaterial] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setHeight] = useState("");
  const router = useRouter();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          type,
          material,
          width_cm: parseInt(width),
          depth_cm: parseInt(depth),
        }),
      });

      if (!response.ok) throw new Error("Алдаа гарлаа.");
      
      router.refresh();
      // Clear or show success?
    } catch (error) {
      console.error(error);
      alert("AI загвар үүсгэхэд алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden">
      <CardHeader className="border-b border-white/5 bg-white/5">
        <CardTitle className="text-lg flex items-center">
          <Wand2 className="mr-2 h-5 w-5 text-primary" />
          AI Загвар Боловсруулагч
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Төрөл</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TERRACE">Террас</SelectItem>
                  <SelectItem value="BALCONY">Балкон</SelectItem>
                  <SelectItem value="RAILING">Хашлага</SelectItem>
                  <SelectItem value="WINDOW_GUARD">Цонхны хаалт</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Материал</Label>
              <Input 
                value={material} 
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Жишээ: Мод, Төмөр"
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Урт (см)</Label>
              <Input 
                type="number"
                value={width} 
                onChange={(e) => setWidth(e.target.value)}
                placeholder="0"
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Өргөн/Өндөр (см)</Label>
              <Input 
                type="number"
                value={depth} 
                onChange={(e) => setHeight(e.target.value)}
                placeholder="0"
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full h-12 font-bold text-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Боловсруулж байна...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Загвар гаргах
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
