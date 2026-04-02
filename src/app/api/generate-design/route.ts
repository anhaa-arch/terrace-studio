import { NextResponse } from "next/server";
import { createDesign } from "@/app/(dashboard)/projects/actions";
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

    // AI-д зориулсан Англи prompt угсрах
    const aiPrompt = `High-quality 3D render of a modern Mongolian apartment roof terrace. 
Terrace type: ${type}. 
Materials: ${material || "modern wood and stone"}. 
Approximate size: ${width_cm || 0}cm by ${depth_cm || 0}cm. 
Style: minimal, cozy, suitable for real estate marketing. 
Additional details: ${notes || "No additional notes"}. 
Golden hour lighting, ultra realistic, 4k, architectural visualization.`;

    console.log("Generating Design with Prompt:", aiPrompt);

    // Бодит AI дуудлага хийх (DALL-E 3)
    // DALL-E 3 supports 1024x1024 by default
    const { imageUrl: generatedImageUrl } = await generateTerraceImage(
      aiPrompt,
      1024,
      1024
    );

    const newDesign = await createDesign({
      project_id: projectId,
      type: type,
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
    return NextResponse.json(
      { error: "Алдаа гарлаа: " + error.message },
      { status: 500 }
    );
  }
}
