import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getClient() {
    if (!this.ai) {
      const apiKey = process.env.API_KEY;
      if (!apiKey || apiKey === 'undefined') {
        console.warn("Gemini API Key is missing. AI features will be disabled.");
        return null;
      }
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  async generatePostImprovement(currentContent: string) {
    const client = this.getClient();
    if (!client) return "AI features are currently unavailable. Please check your API key.";

    try {
      const response = await client.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I have a LinkedIn post draft: "${currentContent}". 
        Please rewrite it to be more professional, engaging, and suitable for a LinkedIn audience. 
        Add relevant hashtags and a call to action. Keep the tone professional yet authentic.`,
        config: {
            temperature: 0.7,
            topP: 0.95,
        }
      });
      return response.text || "Could not generate improvement.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while generating the post.";
    }
  }

  async generateProfileSummary(experience: string) {
    const client = this.getClient();
    if (!client) return "AI features are currently unavailable.";

    try {
      const response = await client.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Based on the following experience: "${experience}", write a compelling 3-sentence LinkedIn "About" section summary. Use professional keywords.`,
          config: {
              temperature: 0.8,
          }
      });
      return response.text || "Could not generate summary.";
    } catch (error) {
        console.error("Gemini Error:", error);
        return "An error occurred while generating the summary.";
    }
  }
}

export const geminiService = new GeminiService();
