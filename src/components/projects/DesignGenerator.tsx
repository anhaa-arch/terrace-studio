"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Wand2, Loader2, Info } from "lucide-react";
import { useRouter } from "next/navigation";

interface DesignGeneratorProps {
  projectId: string | number;
}

export function DesignGenerator({ projectId }: DesignGeneratorProps) {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("TERRACE");
  const [material, setMaterial] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setHeight] = useState("");
  const [notes, setNotes] = useState("");
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
          width_cm: parseInt(width) || 0,
          depth_cm: parseInt(depth) || 0,
          notes: notes,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Алдаа гарлаа.");
      }
      
      router.refresh();
      setMaterial("");
      setWidth("");
      setHeight("");
      setNotes("");
    } catch (error: any) {
      console.error(error);
      alert(error.message || "AI загвар үүсгэхэд алдаа гарлаа.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="studio-glass border-white/10 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <CardHeader className="border-b border-white/5 bg-white/[0.02] py-5">
        <CardTitle className="text-xl font-bold flex items-center text-white tracking-tight leading-none">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
             <Wand2 className="h-5 w-5 text-primary" />
          </div>
          AI Загвар Гаргах
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <Label className="text-sm font-semibold text-white/90">Төрөл</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="studio-input h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="studio-glass border-white/10">
                  <SelectItem value="TERRACE">Террас</SelectItem>
                  <SelectItem value="BALCONY">Балкон</SelectItem>
                  <SelectItem value="RAILING">Хашлага</SelectItem>
                  <SelectItem value="WINDOW_GUARD">Цонхны хаалт</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2.5">
              <Label className="text-sm font-semibold text-white/90">Материал</Label>
              <Input 
                value={material} 
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Жишээ: Мод, Төмөр, Шил"
                className="studio-input h-11"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2.5">
              <Label className="text-sm font-semibold text-white/90">Урт (см)</Label>
              <Input 
                type="number"
                value={width} 
                onChange={(e) => setWidth(e.target.value)}
                placeholder="0"
                className="studio-input h-11"
              />
            </div>
            <div className="space-y-2.5">
              <Label className="text-sm font-semibold text-white/90">Өргөн/Өндөр (см)</Label>
              <Input 
                type="number"
                value={depth} 
                onChange={(e) => setHeight(e.target.value)}
                placeholder="0"
                className="studio-input h-11"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <Label className="text-sm font-semibold text-white/90">Нэмэлт тайлбар (Англи эсвэл Монгол)</Label>
            <Input 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Жишээ: High floor, sunset view, many plants"
              className="studio-input h-11"
            />
          </div>

          <div className="flex items-start space-x-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Материалын төрөл болон хэмжээг нарийн оруулснаар AI илүү бодит загвар гаргаж чадна.
            </p>
          </div>

          <Button 
            type="submit"
            className="w-full h-12 font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98] relative overflow-hidden group"
            disabled={loading}
          >
            <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                AI дизайн боловсруулж байна...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse text-primary-foreground" />
                Дизайн гаргах
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
