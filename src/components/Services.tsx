import { motion } from 'motion/react';
import { Camera, Image, Layers, Sparkles } from 'lucide-react';

const services = [
  {
    title: 'Portrait Photography',
    description: 'Capturing the depth of character through cinematic light and raw emotion.',
    icon: Camera
  },
  {
    title: 'Event Coverage',
    description: 'Documenting the soul of your most significant moments with an artistic lens.',
    icon: Sparkles
  },
  {
    title: 'Commercial Shoots',
    description: 'Elevating brands through high-end visual storytelling and distinctive aesthetics.',
    icon: Layers
  },
  {
    title: 'Fine Art Photography',
    description: 'Exclusive pieces designed for exhibition and luxury collectors.',
    icon: Image
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-40 bg-brand-black border-y border-brand-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-red text-xs uppercase tracking-[0.4em] font-bold"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mt-4 italic"
          >
            Expertise
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 border border-transparent hover:border-brand-white/10 transition-all duration-500 relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 -translate-y-1/2 translate-x-1/2 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="flex items-start gap-6">
                <div className="p-4 bg-brand-white/5 rounded-full group-hover:bg-brand-red/10 transition-colors duration-500">
                  <service.icon className="text-brand-white group-hover:text-brand-red transition-colors duration-500" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-serif italic mb-4 group-hover:text-brand-white transition-colors">{service.title}</h3>
                  <p className="text-brand-grey group-hover:text-brand-white/80 transition-colors leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              
              {/* Animated Border Bottom */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-red group-hover:w-full transition-all duration-700 ease-in-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
