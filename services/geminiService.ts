import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRomanticPoem = async (name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, very romantic, and deep Turkish poem for a woman named ${name}. 
      The theme should be about how she brought color into a previously gray and meaningless life. 
      It should be emotional, sincere, and professional literary quality. 
      Do not add any markdown formatting or titles, just the poem text.`,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "Seni kelimelerle anlatamayacak kadar çok seviyorum...";
  } catch (error) {
    console.error("Error generating poem:", error);
    return "Seni her şeyden çok seviyorum, kelimeler yetersiz kalsa bile...";
  }
};