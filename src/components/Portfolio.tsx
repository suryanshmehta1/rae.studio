import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// @ts-ignore
import dzewleryImg from '../assets/images/dzewlery_mockup_1782901390562.jpg';
// @ts-ignore
import gauravImg from '../assets/images/gaurav_chainani_mockup_1782901406334.jpg';
// @ts-ignore
import msgImg from '../assets/images/msg_distribution_mockup_1782901439137.jpg';

interface WorkItem {
  id: number;
  category: string;
  image: string;
  title: string;
  link?: string;
  status?: string;
}

const categories = ['All', 'Portraits', 'Street', 'Emotions', 'Abstract', 'Web Design'];

const works: WorkItem[] = [
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
  },
  {
    id: 10,
    category: 'Web Design',
    image: 'https://image.thum.io/get/width/600/crop/800/maxAge/12/https://candidimagination.com',
    title: 'candidimagination.com',
    link: 'https://candidimagination.com',
    status: 'Successfully Delivered'
  },
  {
    id: 11,
    category: 'Web Design',
    image: dzewleryImg,
    title: 'Dzewlery',
    status: 'Successfully Delivered'
  },
  {
    id: 12,
    category: 'Web Design',
    image: gauravImg,
    title: 'Gaurav Chainani',
    status: 'Successfully Delivered'
  },
  {
    id: 14,
    category: 'Web Design',
    image: msgImg,
    title: 'MSG Distribution System',
    status: 'Successfully Delivered'
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
            {filteredWorks.map((work) => {
              const isWeb = work.category === 'Web Design';
              const Comp = work.link ? 'a' : 'div';
              
              return (
                <motion.div
                  key={work.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                >
                  <Comp
                    {...(work.link ? { href: work.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="block w-full h-full relative"
                  >
                    <img 
                      src={work.image} 
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[100%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/40 transition-colors duration-500" />
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-brand-red font-bold mb-1 block">
                        {work.category} {work.status ? `• ${work.status}` : ''}
                      </span>
                      <h3 className="text-xl font-serif italic text-brand-white capitalize">
                        {work.title}
                      </h3>
                      {work.link && (
                        <span className="text-[9px] uppercase tracking-[0.15em] text-brand-red font-bold mt-2 block group-hover:underline">
                          Visit Site →
                        </span>
                      )}
                    </div>
                  </Comp>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
