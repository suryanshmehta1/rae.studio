import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Camera, Sparkles, WifiOff, Zap } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

// Knowledge base for offline/static mode
const KNOWLEDGE_BASE = [
  { keywords: ['who', 'founder', 'suryansh', 'owner', 'mehta'], response: "Rae Studio was founded by Suryansh Mehta. He's a visionary photographer known for high-contrast, luxury cinematic visuals." },
  { keywords: ['preset', 'dng', 'laboratory', 'download', 'edit', 'mobile'], response: "Our 'Presets Laboratory' offers exclusive DNG files that give your photos a professional, cinematic look. You can find them in the Laboratory section!" },
  { 
    keywords: ['price', 'charge', 'cost', 'rate', 'website', 'shoot', 'basic', 'advance', 'custom', 'package', 'fees'], 
    response: "Here are our rates:\n\n• Basic Website: ₹3000+ (depends on the domain the client wants)\n• Advanced Website: ₹5000+ (depends on the domain the client wants)\n• Basic Photo Shoot: ₹899\n• Custom Shoot Package: Please inquire through WhatsApp for a custom package here: https://wa.me/919928974000?text=Hi%20Rae%20Studio!%20I%20would%20like%20to%20inquire%20about%20a%20custom%20photo%20shoot%20package." 
  },
  { keywords: ['book', 'contact', 'hire', 'service', 'email'], response: "For bookings and inquiries, you can reach out directly via email at raestudioo1@gmail.com, use the contact form, or connect with us on WhatsApp!" },
  { keywords: ['style', 'look', 'creative', 'photography', 'black', 'white'], response: "We specialize in cinematic, high-contrast, and luxury aesthetics, often focusing on monochrome and minimal color palettes to tell deeper stories." },
  { keywords: ['where', 'located', 'studio', 'place'], response: "We are a creative studio operating globally, with a focus on delivering high-end visual stories for brands and individuals." },
  { keywords: ['what', 'do', 'offer', 'work'], response: "We offer professional photography services (portraits, commercial, street) and exclusive digital assets for photographers through our Laboratory." },
  { keywords: ['hello', 'hi', 'hey', 'greetings'], response: "Hello! I'm Rae. How can I help you explore the creative world of Rae Studio today?" },
  { keywords: ['thank', 'thanks', 'cool', 'awesome'], response: "You're welcome! Feel free to ask anything else about our work or presets." }
];

const getOfflineResponse = (input: string) => {
  const lowercaseInput = input.toLowerCase();
  for (const item of KNOWLEDGE_BASE) {
    if (item.keywords.some(keyword => lowercaseInput.includes(keyword))) {
      return item.response;
    }
  }
  return "That's an interesting perspective. While I might not have a specific detail on that right now, Suryansh's work is all about finding depth in the unseen. Would you like to know about our presets or how to book a session?";
};

const renderMessageContent = (content: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-red font-bold hover:underline transition-all inline-flex items-center gap-1 break-all"
        >
          {part.includes('wa.me') ? 'WhatsApp Inquiry Link ↗' : part}
        </a>
      );
    }
    return part;
  });
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hi there! I'm Rae. I'm here to guide you through the cinematic world of Rae Studio. Whether you're a photographer or a fan of visual storytelling, ask me anything!",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let responseText = '';

    // Priority 1: Try Gemini API
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [
            ...messages.map(m => ({ 
              role: m.role as "user" | "model", 
              parts: [{ text: m.content }] 
            })),
            { role: 'user', parts: [{ text: query }] }
          ],
          config: {
            systemInstruction: "You are Rae, the cinematic AI assistant for Rae Studio. The studio was founded by Suryansh Mehta and is named after his best friend Rashi (Rae). Rashi used to playfully ask 'Sabse sundar kaun? Rashi sabse sundar.' PRICING & SERVICES (Strict adherence required): For a basic website, the price is '₹3000 plus (depends on the domain the client wants)'. For a slightly more advanced website than basic, the price is '₹5000 plus (depends on the domain the client wants)'. For a basic photo shoot, the price is '₹899'. For any custom shoot package, instruct them to send an inquiry through WhatsApp with an automatic written message using this link: https://wa.me/919928974000?text=Hi%20Rae%20Studio!%20I%20would%20like%20to%20inquire%20about%20a%20custom%20photo%20shoot%20package. Keep responses under 80 words, mysterious, cinematic, helpful, and luxury. Use raw emotion in your tone.",
            temperature: 0.7,
            topP: 0.95,
          }
        });
        
        responseText = response.text || "The frame is blurring. I'm momentarily lost.";
        setIsOffline(false);
      } else {
        throw new Error('No API Key');
      }
    } catch (error) {
      console.warn("Rae context switching to core knowledge base...");
      responseText = getOfflineResponse(query);
      setIsOffline(true);
    }

    const modelMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: responseText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        id="chat-trigger"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-brand-red text-brand-white rounded-full flex items-center justify-center shadow-2xl transition-shadow hover:shadow-brand-red/20 outline-none"
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-window"
            initial={{ opacity: 0, y: 100, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.9, x: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-28 right-8 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] bg-brand-black border border-brand-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-brand-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red">
                  <Camera size={20} />
                </div>
                <div>
                  <h3 className="text-brand-white font-serif italic text-lg leading-none">Rae</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${isOffline ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="text-[9px] text-brand-grey uppercase tracking-[0.2em] font-bold">
                      {isOffline ? 'Knowledge Mode' : 'AI Intelligence'}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-brand-grey hover:text-brand-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Offline Banner */}
            <AnimatePresence>
              {isOffline && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-amber-500 text-[10px] uppercase tracking-widest font-bold">
                    <WifiOff size={10} />
                    Offline Version Active
                  </div>
                  <div className="text-brand-grey/50 text-[9px] uppercase">Using Studio Knowledge Base</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-brand-red text-brand-white rounded-tr-none shadow-lg shadow-brand-red/10' 
                      : 'bg-white/5 text-brand-grey rounded-tl-none border border-brand-white/5'
                  }`}>
                    {renderMessageContent(msg.content)}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-brand-white/5 flex gap-1 items-center">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-1.5 h-1.5 bg-brand-red rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-brand-red rounded-full" 
                    />
                    <span className="text-[10px] text-brand-grey/40 uppercase tracking-widest ml-2">Searching...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-6 bg-white/[0.02] border-t border-brand-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isLoading ? "Rae is thinking..." : "Ask Rae anything..."}
                  disabled={isLoading}
                  className="w-full bg-brand-black border border-brand-white/10 rounded-full py-4 pl-6 pr-14 text-sm text-brand-white placeholder:text-brand-grey/50 focus:border-brand-red transition-colors outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-brand-white hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-red/20"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-brand-grey/40 text-center mt-4 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                {isOffline ? <Zap size={8} className="text-amber-500" /> : <Sparkles size={8} className="text-brand-red" />} 
                {isOffline ? 'Studio Core Intelligence' : 'Enhanced AI Intelligence'}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
