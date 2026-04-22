import { motion } from 'motion/react';
import { MousePointer2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax Vibe */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: 'url("/@Capturewith_suryanshh.jpg")',
          filter: 'grayscale(100%) brightness(0.4)'
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-black/20 to-brand-black z-10" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-6xl md:text-[120px] leading-[0.9] font-black italic mb-8 max-w-5xl mx-auto"
        >
          Capturing <span className="text-brand-white">Emotions</span> <br /> 
          <span className="text-brand-grey font-sans not-italic font-thin text-4xl md:text-6xl tracking-widest">Beyond Frames</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-brand-grey text-sm md:text-base uppercase tracking-[0.2em] max-w-lg mx-auto mb-12 font-medium"
        >
          A fusion of cinematic art and raw human connection.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-brand-red to-transparent animate-bounce" />
        <span className="text-[10px] uppercase tracking-widest text-brand-grey font-bold">Scroll to Explore</span>
      </motion.div>

      {/* Red Accent Shape */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-brand-red/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-brand-red/5 blur-[100px] rounded-full pointer-events-none" />
    </section>
  );
}
