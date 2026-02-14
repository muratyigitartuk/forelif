import { GoogleGenAI } from "@google/genai";

// Safety check: Ensure API key access doesn't crash the app if process.env is missing in browser
const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';

// Only initialize if key exists, otherwise we'll fail gracefully in the function
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateRomanticPoem = async (name: string): Promise<string> => {
  if (!ai) {
    console.warn("API Key missing, returning fallback poem.");
    return "Seni her şeyden çok seviyorum, kelimeler yetersiz kalsa bile...";
  }

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