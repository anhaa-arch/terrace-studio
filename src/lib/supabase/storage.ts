import { createClient } from "./client";

/**
 * Uploads a file to a Supabase Storage bucket.
 * @param file The file to upload.
 * @param bucket The bucket name (default: 'projects').
 * @returns The public URL of the uploaded file.
 */
export async function uploadImage(file: File): Promise<string> {
  const bucket = "projects";
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Supabase Storage Upload Error Detail:", uploadError);
    throw new Error(`Зураг хуулахад алдаа гарлаа: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  if (!data?.publicUrl) {
    console.error("Failed to generate Public URL for path:", filePath);
    throw new Error("Зургийн хаяг үүсгэхэд алдаа гарлаа.");
  }

  return data.publicUrl;
}
