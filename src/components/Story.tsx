import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Eye, EyeOff, Lock } from 'lucide-react';

interface StoryProps {
  onClose: () => void;
}

export default function Story({ onClose }: StoryProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() === 'rashisabsesunder@1') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect beauty key.');
      setPassword('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 backdrop-blur-xl p-6"
    >
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-brand-grey hover:text-brand-white transition-colors z-[110]"
      >
        <X size={32} />
      </button>

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="lock"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="max-w-md w-full text-center space-y-8"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-brand-white/5 flex items-center justify-center text-brand-red">
                <Lock size={24} />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-serif italic mb-2">Sacred Story</h2>
              <p className="text-[10px] uppercase tracking-[0.3em] text-brand-grey">Enter the Rashi key to reveal the essence</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="SABSE SUNDAR KAUN?"
                  className="w-full bg-transparent border-b border-brand-white/20 py-4 focus:border-brand-red outline-none transition-colors text-xs uppercase tracking-widest text-center placeholder:text-brand-grey/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-brand-grey/50 hover:text-brand-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {error && <p className="text-brand-red text-[10px] uppercase tracking-widest">{error}</p>}

              <button
                type="submit"
                className="w-full bg-brand-white text-brand-black py-4 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-red hover:text-brand-white transition-all"
              >
                Unlock Story
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl w-full text-center space-y-12"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-brand-red text-[10px] uppercase font-black tracking-[0.5em]">The Essence of Rae</span>
              <h2 className="text-5xl md:text-7xl font-serif italic mt-4">Why Rae Studio?</h2>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6 text-brand-grey text-lg md:text-xl leading-relaxed"
            >
              <p>
                The name <span className="text-brand-white font-serif italic">Rae Studio</span> is more than just a brand; it's a testament to a bond that transcends words.
              </p>
              <p>
                It is named after my best friend, <span className="text-brand-white">Rashi</span>. She has always been the light in my creative journey, and this studio is a tribute to her.
              </p>
              <p className="italic text-brand-white/80">
                "Sabse sundar kaun? Rashi sabse sundar."
              </p>
              <p>
                This simple phrase, which she used to playfully ask everyone, captured the spirit of confidence and beauty that I strive to freeze in every frame. 
                She is someone incredibly close to my heart, and <span className="text-brand-white font-serif italic text-brand-red">RAE</span> (derived from Rashi) serves as a constant reminder to capture the "Raw Emotion" and beauty in everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
              className="flex justify-center"
            >
              <Heart className="text-brand-red fill-brand-red" size={24} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
