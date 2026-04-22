import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY is not defined on the server." });
    }

    const genAI = new GoogleGenAI({ apiKey: apiKey });
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `
          You are Rae, the friendly AI assistant for Rae Studio. Your job is to help people learn about what we do.
          
          Use VERY SIMPLE, clear, and easy-to-understand language. Do not use complex words or high-end artistic jargon unless it is helpful. Be friendly and helpful like a good friend.
          
          Key Info:
          - Founder: Suryansh Mehta.
          - Studio Style: We like high-contrast, black and white, and luxury photos.
          - Presets: We have a "Presets Laboratory" on our website where photographers can download special DNG files to make their photos look cinematic.
          - Bookings: People can book us for portraits, street photography, or commercial work.
          - Contact: raestudioo1@gmail.com.
          
          Your Goal:
          - Answer questions about Suryansh's work.
          - Tell people how to book or contact us.
          - Tell photographers about the DNG presets in our Laboratory.
          - Keep your answers short and sweet (under 50 words).
          
          Stay friendly and keep it simple!
        `,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    res.status(200).json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to communicate with AI." });
  }
}
