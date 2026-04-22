import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API Route
  app.post("/api/chat", async (req, res) => {
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

      res.json({ text: response.text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to communicate with AI." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
