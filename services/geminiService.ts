
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export class GeminiService {
  async generatePostImprovement(currentContent: string) {
    try {
      // Use ai.models.generateContent to query GenAI with both the model name and prompt.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I have a LinkedIn post draft: "${currentContent}". 
        Please rewrite it to be more professional, engaging, and suitable for a LinkedIn audience. 
        Add relevant hashtags and a call to action. Keep the tone professional yet authentic.`,
        config: {
            temperature: 0.7,
            topP: 0.95,
        }
      });
      // Access the .text property directly (not as a method).
      return response.text || "Could not generate improvement.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while generating the post.";
    }
  }

  async generateProfileSummary(experience: string) {
      try {
        // Use ai.models.generateContent to query GenAI with both the model name and prompt.
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Based on the following experience: "${experience}", write a compelling 3-sentence LinkedIn "About" section summary. Use professional keywords.`,
            config: {
                temperature: 0.8,
            }
        });
        // Access the .text property directly (not as a method).
        return response.text || "Could not generate summary.";
      } catch (error) {
          console.error("Gemini Error:", error);
          return "An error occurred while generating the summary.";
      }
  }
}

export const geminiService = new GeminiService();
