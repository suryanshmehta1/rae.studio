import { motion } from 'motion/react';
import { Camera, Code, Film, Share2, Palette } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36 bg-brand-black relative overflow-hidden">
      {/* Decorative background grid and ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,9,20,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(154,154,154,0.02),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="mb-20 text-center md:text-left">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-red text-xs uppercase tracking-[0.4em] font-bold"
          >
            The Collective
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black mt-4"
          >
            The Minds Behind Rae
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-brand-grey text-base mt-4 max-w-2xl leading-relaxed font-light"
          >
            Bridging raw emotion and pristine execution. We are a boutique digital and visual studio crafting luxury photography, bespoke websites, cinematic video edits, and comprehensive social media footprints for elite clients.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 lg:gap-20">
          
          {/* Member 1: Suryansh Mehta */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 group"
          >
            {/* Interactive Dual Photo Frame for Suryansh */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-brand-white/5 border border-brand-white/10">
              <div className="absolute inset-0 pointer-events-none z-10 border border-brand-white/10" />
              
              {/* Primary Image: @Capturewith_suryanshh.jpg */}
              <img 
                src="/@Capturewith_suryanshh.jpg" 
                alt="Suryansh Mehta - Creative Artist"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/founder.jpg";
                }}
              />

              {/* Red overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/10 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 z-1" />

              {/* Overlay Role Indicator */}
              <div className="absolute bottom-6 left-6 z-10 flex flex-wrap gap-2">
                <span className="bg-brand-black/80 backdrop-blur-md border border-brand-white/10 text-brand-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                  <Camera size={10} className="text-brand-red" /> Photography
                </span>
                <span className="bg-brand-black/80 backdrop-blur-md border border-brand-white/10 text-brand-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                  <Code size={10} className="text-brand-red" /> Web Design
                </span>
                <span className="bg-brand-black/80 backdrop-blur-md border border-brand-white/10 text-brand-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                  <Share2 size={10} className="text-brand-red" /> Social Media Handling
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-baseline border-b border-brand-white/10 pb-4">
                <h3 className="text-3xl font-serif text-brand-white">Suryansh Mehta</h3>
                <span className="text-brand-red text-xs uppercase tracking-widest font-bold">Founder & Lead Artist</span>
              </div>
              <p className="text-brand-grey leading-relaxed text-sm">
                Behind the lens and the editor, Suryansh uncovers the unspoken narratives of human existence and translates them into pristine digital architectures. He believes a great photo freezes truth, while a great website delivers it beautifully.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-white/60">Skills:</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-red">Photography</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-red">Web Design</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-red">Social Media Handling</span>
              </div>
            </div>
          </motion.div>

          {/* Member 2: Khush Mehta */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8 group"
          >
            {/* Interactive Portrait for Khush */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-brand-white/5 border border-brand-white/10">
              <div className="absolute inset-0 pointer-events-none z-10 border border-brand-white/10" />
              
              {/* Primary Image: khushm.png */}
              <img 
                src="/khushm.png" 
                alt="Khush Mehta"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/IMG_20260119_203633_289.jpg";
                }}
              />

              {/* Red overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/10 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700 z-1" />

              {/* Overlay Role Indicator */}
              <div className="absolute bottom-6 left-6 z-10 flex flex-wrap gap-2">
                <span className="bg-brand-black/80 backdrop-blur-md border border-brand-white/10 text-brand-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                  <Film size={10} className="text-brand-red" /> Video Editing
                </span>
                <span className="bg-brand-black/80 backdrop-blur-md border border-brand-white/10 text-brand-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                  <Palette size={10} className="text-brand-red" /> Graphic Designing
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-baseline border-b border-brand-white/10 pb-4">
                <h3 className="text-3xl font-serif text-brand-white">Khush Mehta</h3>
                <span className="text-brand-red text-xs uppercase tracking-widest font-bold">Lead Video Editor & Designer</span>
              </div>
              <p className="text-brand-grey leading-relaxed text-sm">
                Khush handles the heartbeat of motion and brand identity at Rae Studio. Directing post-production, sound engineering, and high-impact graphic assets, he captures visual focus and guides social media channels with unmatched rhythm and flow.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-white/60">Skills:</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-red">Video Editing</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-red">Graphic Designing</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
