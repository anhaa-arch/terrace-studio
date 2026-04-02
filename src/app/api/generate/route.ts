import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { prompt, projectId } = body;

    if (!prompt || !projectId) {
      return new NextResponse("Prompt and projectId are required", { status: 400 });
    }

    // Placeholder for actual AI generation logic (e.g., Replicate, OpenAI, etc.)
    console.log(`Generating design for project ${projectId} with prompt: ${prompt}`);

    // Update database placeholder
    const { data, error } = await supabase
      .from("designs")
      .insert({
        project_id: projectId,
        prompt: prompt,
        status: "processing",
      })
      .select()
      .single();

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }

    // Simulate async processing
    // In a real app, this would be a webhook or a long-running background task
    
    return NextResponse.json({ 
      message: "Generation started", 
      designId: data.id 
    });

  } catch (error) {
    console.error("[GENERATE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
