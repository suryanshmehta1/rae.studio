import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-brand-black overflow-hidden px-6">
      <div className="container mx-auto">
        <motion.div 
          style={{ opacity }}
          className="relative aspect-[16/9] w-full overflow-hidden group"
        >
          <motion.img 
            style={{ scale }}
            src="/IMG_20260313_132629_521.jpg" 
            alt="Cinematic Masterpiece"
            className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 pointer-events-none">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-brand-red text-xs uppercase tracking-[0.5em] font-black mb-6"
            >
              Highlight of the Season
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-5xl md:text-9xl font-black italic tracking-tighter"
            >
              Eternal <span className="text-brand-white">Elegance</span>
            </motion.h2>
          </div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-12 left-12 w-20 h-20 border-t border-l border-brand-red/30 pointer-events-none" />
          <div className="absolute bottom-12 right-12 w-20 h-20 border-b border-r border-brand-red/30 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
