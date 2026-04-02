"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Project, Database } from "@/types/database";

/**
 * Төсөл шинээр үүсгэх action
 */
export async function createProject(formData: {
  title: string;
  description?: string;
  original_image_url: string;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .insert([
      {
        title: formData.title,
        description: formData.description,
        original_image_url: formData.original_image_url,
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Төсөл үүсгэхэд алдаа гарлаа: ${error.message}`);
  }

  revalidatePath("/projects");
  return data as Project;
}

/**
 * Төслүүдийг жагсаалтаар авах
 */
export async function getProjects() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Төсөл уншихад алдаа:", error.message);
    return [];
  }

  return data as Project[];
}

/**
 * Төслийг ID-аар нь авах
 */
export async function getProjectById(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Төсөл олдсонгүй: ${error.message}`);
  }

  return data as Project;
}

/**
 * Төслийн бүх загваруудыг авах
 */
export async function getDesignsByProjectId(projectId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("designs")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Загвар уншихад алдаа:", error.message);
    return [];
  }

  return data as Database["public"]["Tables"]["designs"]["Row"][];
}

/**
 * Загвар шинээр хадгалах
 */
export async function createDesign(payload: Database["public"]["Tables"]["designs"]["Insert"]) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("designs")
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(`Загвар хадгалахад алдаа гарлаа: ${error.message}`);
  }

  revalidatePath(`/projects/${payload.project_id}`);
  return data;
}

/**
 * Dashboard статистик авах
 */
export async function getDashboardStats() {
  const supabase = createClient();

  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: designCount } = await supabase
    .from("designs")
    .select("*", { count: "exact", head: true });

  return {
    projects: projectCount || 0,
    designs: designCount || 0,
  };
}
