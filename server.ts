import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INQUIRIES_FILE = path.join(process.cwd(), "inquiries.json");
const PRESETS_FILE = path.join(process.cwd(), "presets.json");

// Initialize files if they don't exist
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([]));
}
if (!fs.existsSync(PRESETS_FILE)) {
  const defaultPresets = [
    { name: 'cinematic_shadows.dng', size: '12.4 MB', type: 'DNG' },
    { name: 'vintage_noir.dng', size: '8.2 MB', type: 'DNG' },
    { name: 'golden_hour_vibe.dng', size: '15.1 MB', type: 'DNG' }
  ];
  fs.writeFileSync(PRESETS_FILE, JSON.stringify(defaultPresets));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Presets API
  app.get("/api/presets", (req, res) => {
    try {
      const presets = JSON.parse(fs.readFileSync(PRESETS_FILE, "utf-8"));
      res.json(presets);
    } catch (error) {
      res.status(500).json({ error: "Failed to load presets" });
    }
  });

  app.post("/api/presets", (req, res) => {
    const { passcode, preset } = req.body;
    if (passcode !== "rae2026") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const presets = JSON.parse(fs.readFileSync(PRESETS_FILE, "utf-8"));
      presets.unshift(preset);
      fs.writeFileSync(PRESETS_FILE, JSON.stringify(presets, null, 2));
      res.json({ success: true, presets });
    } catch (error) {
      res.status(500).json({ error: "Failed to save preset" });
    }
  });

  app.delete("/api/presets", (req, res) => {
    const { passcode, name } = req.body;
    if (passcode !== "rae2026") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      let presets = JSON.parse(fs.readFileSync(PRESETS_FILE, "utf-8"));
      presets = presets.filter((p: any) => p.name !== name);
      fs.writeFileSync(PRESETS_FILE, JSON.stringify(presets, null, 2));
      res.json({ success: true, presets });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete preset" });
    }
  });

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

  // Inquiry API Route
  app.post("/api/send-inquiry", async (req, res) => {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Save to local file
      const inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, "utf-8"));
      inquiries.push({ name, email, message, date: new Date().toISOString() });
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2));

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: "raestudioo1@gmail.com",
        subject: `New Inquiry from ${name} (Rae Studio Website)`,
        text: `
Name: ${name}
Email: ${email}
Message:
${message}
        `,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #000; border-bottom: 2px solid #ff0000; padding-bottom: 10px;">New Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 30px; font-size: 12px; color: #888;">This email was sent from the Rae Studio website contact form.</p>
          </div>
        `,
      };

      // We still try to send email, but don't fail if SMTP fails (since we saved to file)
      try {
        await transporter.sendMail(mailOptions);
      } catch (smtpError) {
        console.error("SMTP Error (Inquiry saved to file though):", smtpError);
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Inquiry Error:", error);
      res.status(500).json({ error: "Failed to send inquiry." });
    }
  });

  // Admin Inquiries API
  app.get("/api/inquiries", (req, res) => {
    const password = req.query.password;
    if (password !== "rashisabsesunder@1") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const inquiries = JSON.parse(fs.readFileSync(INQUIRIES_FILE, "utf-8"));
    res.json(inquiries);
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
