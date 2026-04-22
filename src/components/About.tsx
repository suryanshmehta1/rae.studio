import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-40 bg-brand-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-1000 group">
              <img 
                src="/founder.jpg" 
                alt="Founder of Rae Studio"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/p9.jpg";
                }}
              />
            </div>
            {/* Artistic Overlay */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-brand-red hidden md:block z-[-1]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-serif font-black text-brand-white/5 pointer-events-none whitespace-nowrap hidden lg:block uppercase">
              SURYANSH MEHTA
            </div>
          </motion.div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl mb-6 italic">The Visionnaire</h2>
              <p className="text-brand-grey leading-relaxed text-lg max-w-xl">
                Capturing the raw tension between light and shadow. Behind the Sony lens, I find the narratives that go unspoken, documenting the silent frequencies of human existence with an unyielding eye for authenticity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-brand-grey leading-relaxed">
                Based in the heart of artistry, Rae Studio was born from a desire to bridge the gap between perfection and truth. Every shutter click is an attempt to freeze a feeling that words fail to capture.
              </p>
              
              <div className="pt-6">
                <span className="text-5xl font-serif text-brand-white italic font-light tracking-tighter">Suryansh Mehta</span>
                <p className="text-brand-red text-xs uppercase tracking-[0.3em] font-bold mt-2">Founder & Lead Photographer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
