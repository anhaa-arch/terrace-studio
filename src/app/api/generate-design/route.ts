import { NextResponse } from "next/server";
import { createDesign } from "@/app/(dashboard)/projects/actions";

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

    // AI дуудлага хийх хэсэг (Placeholder)
    // Бодит байдал дээр энд stability.ai эсвэл өөр AI API дуудна
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay

    const placeholderImage = `https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=2070&auto=format&fit=crop`;

    const newDesign = await createDesign({
      project_id: projectId,
      type: type,
      material: material || "Unknown",
      width_cm: width_cm || 0,
      depth_cm: depth_cm || 0,
      notes: notes || "",
      generated_image_url: placeholderImage,
      ai_provider: "TerraceAI-v1",
    });

    return NextResponse.json({ success: true, design: newDesign });
  } catch (error: any) {
    console.error("Design Generation Error:", error);
    return NextResponse.json(
      { error: "Алдаа гарлаа: " + error.message },
      { status: 500 }
    );
  }
}
