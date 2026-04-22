import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Camera, Sparkles } from 'lucide-react';
import { chatWithRae } from '../services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      content: "Hi there! I'm Rae. I can help you with questions about Suryansh's photography or our cinematic presets. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Format history for Gemini SDK
    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const responseText = await chatWithRae(userMessage.content, history);

    const modelMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      content: responseText || "I'm momentarily lost in a frame. Could you repeat that?",
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
                  <span className="text-[10px] text-brand-red uppercase tracking-[0.2em] font-bold">Studio Assistant</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-brand-grey hover:text-brand-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-red text-brand-white rounded-tr-none' 
                      : 'bg-white/5 text-brand-grey rounded-tl-none border border-brand-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-brand-white/5 flex gap-1">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 1, times: [0, 0.5, 1] }}
                      className="w-1.5 h-1.5 bg-brand-red rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 1, delay: 0.2, times: [0, 0.5, 1] }}
                      className="w-1.5 h-1.5 bg-brand-red rounded-full" 
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ repeat: Infinity, duration: 1, delay: 0.4, times: [0, 0.5, 1] }}
                      className="w-1.5 h-1.5 bg-brand-red rounded-full" 
                    />
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
                  placeholder="Ask a creative question..."
                  className="w-full bg-brand-black border border-brand-white/10 rounded-full py-4 pl-6 pr-14 text-sm text-brand-white placeholder:text-brand-grey/50 focus:border-brand-red transition-colors outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-brand-white hover:bg-brand-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-brand-grey/40 text-center mt-4 uppercase tracking-widest flex items-center justify-center gap-2">
                <Sparkles size={8} /> Powered by Rae Intelligence
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
