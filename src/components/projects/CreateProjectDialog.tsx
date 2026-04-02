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
import { Plus, Upload, Loader2, Image as ImageIcon } from "lucide-react";
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
      // 1. Storage руу зураг хуулах
      const imageUrl = await uploadImage(file);

      // 2. DB дээр төсөл үүсгэх
      await createProject({
        title,
        description,
        original_image_url: imageUrl,
      });

      setOpen(false);
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Төсөл үүсгэхэд алдаа гарлаа.");
    } finally {
      setLoading(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="font-semibold shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Шинэ төсөл
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle>Шинэ төсөл үүсгэх</DialogTitle>
          <DialogDescription>
            Төслийн нэр болон эх зургийг оруулна уу.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Төслийн нэр</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Жишээ: Хатанбаатарын террас"
              required
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Тайлбар</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Төслийн товч тайлбар (заавал биш)"
              className="bg-white/5 border-white/10"
            />
          </div>
          <div className="space-y-2">
            <Label>Эх зураг (Original Image)</Label>
            <div 
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-white/10 rounded-xl hover:border-primary/50 transition-colors cursor-pointer bg-white/5 relative overflow-hidden group"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <div className="absolute inset-0">
                   <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <p className="text-white text-sm font-medium">Солих</p>
                   </div>
                </div>
              ) : (
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="flex text-sm text-muted-foreground">
                    <span>Зураг сонгох</span>
                  </div>
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
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={loading || !file || !title} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
