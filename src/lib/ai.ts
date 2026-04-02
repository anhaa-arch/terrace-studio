import OpenAI from "openai";

// OpenAI client instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * AI ашиглан террасын зураг generate хийх функц
 * @param prompt - Зургийн тайлбар (Англи хэлээр)
 * @param width - Зургийн өргөн (standard: 1024)
 * @param height - Зургийн өндөр (standard: 1024 for DALL-E 3)
 */
export async function generateTerraceImage(
  prompt: string,
  width: number = 1024,
  height: number = 1024
): Promise<{ imageUrl: string }> {
  try {
    // DALL-E 3 ашиглан зураг generate хийх
    // Анхааруулга: DALL-E 3 нь 1024x1024, 1024x1792, эсвэл 1792x1024 гэсэн хэмжээнүүдийг дэмждэг.
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: `${width}x${height}` as any, // DALL-E 3 defaults to 1024x1024
      quality: "hd", // Өндөр чанартай гаралт
      style: "vivid", // Илүү тод өнгө аястай
    });

    const imageUrl = response.data && response.data.length > 0 ? response.data[0].url : null;

    if (!imageUrl) {
      throw new Error("Зургийн URL буцаасангүй.");
    }

    return { imageUrl };
  } catch (error: any) {
    console.error("OpenAI Image Generation Error:", error);
    throw new Error(`AI generation failed: ${error.message}`);
  }
}
