import OpenAI from "openai";

// OpenAI client instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * AI ашиглан террасын зураг generate хийх функц
 * @param options - Дизайн гаргахад шаардлагатай мэдээллүүд
 */
export async function generateTerraceImage(options: {
  project: { title: string; description?: string | null; original_image_url: string };
  type: string;
  material?: string;
  width_cm?: number;
  depth_cm?: number;
  notes?: string;
}): Promise<{ imageUrl: string }> {
  try {
    const { project, type, material, width_cm, depth_cm, notes } = options;

    // AI-д зориулсан Англи prompt угсрах
    // Хэрэглэгчийн өгсөн мэдээлэл дээр үндэслэн нарийн тайлбар үүсгэнэ.
    const aiPrompt = `High-quality 3D architectural visualization of a modern ${type.toLowerCase()} design. 
    Context: On top of an apartment building similar to: ${project.title}.
    Materials to use: ${material || "modern eco-friendly materials, wood, and glass"}. 
    Approximate dimensions: ${width_cm || 0}cm width by ${depth_cm || 0}cm depth. 
    Style: Minimalist, luxury, cozy outdoor living space with premium furniture. 
    Additional user requirements: ${notes || "Create a beautiful, functional space"}. 
    Lighting: Golden hour sunset lighting, soft shadows. 
    Technical: Ultra-realistic 4k render, cinematic architectural photography, octane render style.`;

    console.log("Generating Terrace Image with Prompt:", aiPrompt);

    // DALL-E 3 ашиглан зураг generate хийх
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: aiPrompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "vivid",
    });

    const imageUrl = response.data && response.data.length > 0 ? response.data[0].url : null;

    if (!imageUrl) {
      throw new Error("Зургийн URL буцаасангүй.");
    }

    /**
     * TODO: Дараагийн шатанд OpenAI Images Edit (Inpainting) API ашиглан 
     * хэрэглэгчийн original_image_url дээр шууд "зурах" боломжийг хэрэгжүүлнэ.
     * Энэ нь маск (mask) болон original image-ийг prompt-той хамт илгээхийг шаардана.
     */

    return { imageUrl };
  } catch (error: any) {
    console.error("OpenAI Image Generation Error:", error);
    throw new Error(`AI generation failed: ${error.message}`);
  }
}
