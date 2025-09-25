
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateText = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("AI functionality is disabled. Please configure your API key. This is a sample response to demonstrate the application's UI and functionality without making a live API call.");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content from AI. Please check your API key and network connection.");
  }
};
