"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Upload, Loader2, Image as ImageIcon, X } from "lucide-react";
import { createProject } from "@/app/(dashboard)/projects/actions";
import { uploadImage } from "@/lib/supabase/storage";
import { useRouter } from "next/navigation";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setLoading(true);
    try {
      const imageUrl = await uploadImage(file);
      console.log("Image uploaded successfully, URL:", imageUrl);

      await createProject({
        title,
        description,
        original_image_url: imageUrl,
      });

      console.log("Project created successfully in Database");
      setOpen(false);
      resetForm();
      router.refresh();
    } catch (error: any) {
      console.error("Project Creation Flow Error:", error);
      const errorMessage = error instanceof Error ? error.message : "Тодорхойгүй алдаа гарлаа";
      alert(`Төсөл үүсгэхэд алдаа гарлаа: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFile(null);
    setPreview(null);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if(!v) resetForm(); }}>
      <DialogTrigger asChild>
        <Button className="font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all h-11 px-6">
          <Plus className="mr-2 h-5 w-5" /> Шинэ төсөл
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] studio-glass border-white/20 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold text-white uppercase tracking-tight">Шинэ төсөл үүсгэх</DialogTitle>
          <DialogDescription className="text-muted-foreground pt-1">
            Төслийн нэр болон эх зургийг оруулж ажлаа эхлээрэй.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white font-semibold">Төслийн нэр</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Жишээ: Төв талбайн ресторан"
                required
                className="studio-input h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white font-semibold">Тайлбар (Заавал биш)</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Төслийн товч мэдээлэл..."
                className="studio-input h-12 text-base"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white font-semibold">Эх зураг (Original Image)</Label>
              <div 
                className="relative mt-1 group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-colors">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex items-center space-x-2 bg-black/60 px-4 py-2 rounded-full border border-white/20">
                        <Upload className="h-4 w-4 text-white" />
                        <span className="text-white text-sm font-medium">Зураг солих</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl bg-black/20 group-hover:bg-black/40 group-hover:border-primary/40 transition-all">
                    <div className="p-4 bg-primary/10 rounded-full mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">Зургаа энд чирч оруулна уу</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-1 uppercase tracking-widest">PNG, JPG up to 10MB</p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="pt-2">
            <Button 
              type="submit" 
              disabled={loading || !file || !title} 
              className="w-full h-12 text-lg font-bold shadow-xl shadow-primary/20"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Үүсгэж байна...
                </>
              ) : (
                "Төсөл үүсгэх"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
