import { NextResponse } from "next/server";
import { createDesign, getProjectById } from "@/app/(dashboard)/projects/actions";
import { generateTerraceImage } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectId, type, material, width_cm, depth_cm, notes } = body;

    if (!projectId || !type) {
      return NextResponse.json(
        { error: "Мэдээлэл дутуу байна." },
        { status: 400 }
      );
    }

    // Supabase-аас төслийн мэдээллийг авах (Original Image URL-д зориулж)
    const project = await getProjectById(projectId);
    if (!project) {
      throw new Error("Төсөл олдсонгүй.");
    }

    // Бодит AI дуудлага хийх
    const { imageUrl: generatedImageUrl } = await generateTerraceImage({
      project: {
        title: project.title,
        description: project.description,
        original_image_url: project.original_image_url,
      },
      type,
      material,
      width_cm,
      depth_cm,
      notes,
    });

    // Үр дүнг мэдээллийн санд хадгалах
    const newDesign = await createDesign({
      project_id: projectId,
      type: type as any,
      material: material || "Unknown",
      width_cm: width_cm || 0,
      depth_cm: depth_cm || 0,
      notes: notes || "",
      generated_image_url: generatedImageUrl,
      ai_provider: "OpenAI-DALL-E-3",
    });

    return NextResponse.json({ success: true, design: newDesign });
  } catch (error: any) {
    console.error("Design Generation Error:", error);

    // OpenAI Billing Limit алдааг шалгах (Status: 400, Message: Billing hard limit)
    const errorMessage = error.message || "";
    if (error.status === 400 || errorMessage.includes("Billing hard limit")) {
      return NextResponse.json(
        { 
          error: "OPENAI_BILLING_LIMIT",
          message: "OpenAI хэрэглээний лимит хүрсэн тул одоогоор AI зураг гаргах боломжгүй байна. OpenAI billing тохиргоогоо шалгана уу." 
        }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: "GENERIC_AI_ERROR", 
        message: errorMessage || "Тодорхойгүй алдаа гарлаа." 
      },
      { status: 500 }
    );
  }
}
