import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const categories = ['All', 'Portraits', 'Street', 'Emotions', 'Abstract'];

const works = [
  {
    id: 1,
    category: 'Portraits',
    image: '/p1.jpg',
    title: 'Essence of Thought'
  },
  {
    id: 2,
    category: 'Street',
    image: '/p2.jpg',
    title: 'Urban Pulse'
  },
  {
    id: 3,
    category: 'Emotions',
    image: '/p3.jpg',
    title: 'Muted Whispers'
  },
  {
    id: 4,
    category: 'Abstract',
    image: '/p4.png',
    title: 'Shadow Geometry'
  },
  {
    id: 5,
    category: 'Portraits',
    image: '/hero.jpg',
    title: 'The Gaze'
  },
  {
    id: 6,
    category: 'Street',
    image: '/p6.jpg',
    title: 'Night Walk'
  },
  {
    id: 7,
    category: 'Emotions',
    image: '/featured.jpg',
    title: 'Soul Reflection'
  },
  {
    id: 8,
    category: 'Abstract',
    image: '/p8.png',
    title: 'Monochrome Flow'
  },
  {
    id: 9,
    category: 'Portraits',
    image: '/p9.jpg',
    title: 'Eternal Pose'
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const filteredWorks = filter === 'All' ? works : works.filter(w => w.category === filter);

  return (
    <section id="work" className="py-24 bg-brand-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-brand-red text-xs uppercase tracking-[0.4em] font-bold">The Archive</span>
            <h2 className="text-5xl md:text-7xl font-black mt-4 italic">Selected Works</h2>
          </div>
          
          <div className="flex flex-wrap gap-6">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative pb-1 ${
                  filter === cat ? 'text-brand-white after:w-full' : 'text-brand-grey after:w-0 hover:text-brand-white'
                } after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-brand-red after:transition-all`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              >
                <img 
                  src={work.image} 
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[100%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/40 transition-colors duration-500" />
                
                {/* Info Overlay */}
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold mb-1 block">{work.category}</span>
                  <h3 className="text-xl font-serif italic text-brand-white">{work.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
