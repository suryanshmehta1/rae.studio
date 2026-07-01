import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, Camera, Code } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company?: string;
  text: string;
  rating: number;
}

const photographyReviews: Testimonial[] = [
  {
    name: 'Vinaya Chhajer',
    role: 'Editorial Director',
    text: "The depth of feeling captured in Suryansh's portraits is absolutely breathtaking. He doesn't just click photos; he documents raw human essence with pure cinematic magic. Each frame is a masterpiece of light and shadow.",
    rating: 5
  },
  {
    name: 'Harsh Jain',
    role: 'Campaign Lead',
    company: 'Vibe Creative',
    text: "Rae Studio's event coverage is unmatched. They captured every candid expression and emotional beat perfectly. The cinematic framing and pristine color grading exceeded all of our high-end branding expectations.",
    rating: 5
  },
  {
    name: 'Aditya Aggrawal',
    role: 'Creative Director',
    company: 'Stellar Group',
    text: "An incredible commercial shoot! Their unyielding eye for detail, understanding of professional stage lighting, and professional composure completely elevated our visual campaign. Extremely recommended.",
    rating: 5
  }
];

const webDesignReviews: Testimonial[] = [
  {
    name: 'Dzewlery',
    role: 'Luxury Jewelers',
    text: "Our high-end storefront required an ultra-luxurious, pristine layout. Rae Studio delivered a gorgeous digital portal that matches the brilliance of our diamonds. Performance is flawless and the design is pure luxury.",
    rating: 5
  },
  {
    name: 'Gaurav Chainani',
    role: 'Fashion Designer & Artist',
    text: "The creative grid and smooth motion animations are beautiful. They transformed my designer portfolio into an immersive, highly interactive visual showcase. It is literal digital craftsmanship.",
    rating: 5
  },
  {
    name: 'Manoj Panwar',
    role: 'Founder',
    company: 'Candid Imagination',
    text: "Working with Rae Studio was an absolute revelation. They designed our website with pristine visual hierarchy, stunning layout flow, and ultra-smooth performance. Their digital craftsmanship has elevated our brand identity to a whole new tier.",
    rating: 5
  },
  {
    name: 'MSG Distribution System',
    role: 'Operations Board',
    text: "A highly robust, high-performance logistics system designed with an incredibly sleek, dark futuristic dashboard theme. It is both immensely powerful and visually stunning. Complete game-changer for our workflow.",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<'photography' | 'web'>('photography');

  const currentReviews = activeTab === 'photography' ? photographyReviews : webDesignReviews;

  return (
    <section id="testimonials" className="py-24 md:py-36 bg-brand-black relative overflow-hidden border-t border-brand-white/5">
      {/* Visual background lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-red/2 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
          <div className="text-center md:text-left">
            <span className="text-brand-red text-xs uppercase tracking-[0.4em] font-bold">Client Praise</span>
            <h2 className="text-5xl md:text-7xl font-black mt-4">Testimonials</h2>
          </div>

          {/* Toggle Tabs */}
          <div className="flex items-center bg-brand-white/5 p-1 rounded-sm border border-brand-white/10">
            <button
              onClick={() => setActiveTab('photography')}
              className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm ${
                activeTab === 'photography'
                  ? 'bg-brand-red text-brand-white'
                  : 'text-brand-grey hover:text-brand-white'
              }`}
            >
              <Camera size={14} />
              Photography
            </button>
            <button
              onClick={() => setActiveTab('web')}
              className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-sm ${
                activeTab === 'web'
                  ? 'bg-brand-red text-brand-white'
                  : 'text-brand-grey hover:text-brand-white'
              }`}
            >
              <Code size={14} />
              Web Design
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {currentReviews.map((review, idx) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-brand-white/[0.02] border border-brand-white/5 p-8 md:p-10 rounded-sm flex flex-col justify-between relative group hover:border-brand-red/30 transition-all duration-500"
              >
                {/* Accent line top */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-brand-red group-hover:w-full transition-all duration-500" />
                
                {/* Quotation icon decoration */}
                <div className="absolute top-6 right-6 text-brand-white/5 group-hover:text-brand-red/10 transition-colors duration-500 pointer-events-none">
                  <Quote size={56} />
                </div>

                <div className="space-y-6">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-brand-red text-brand-red" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-brand-grey text-base leading-relaxed font-light italic group-hover:text-brand-white/90 transition-colors duration-500">
                    "{review.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="border-t border-brand-white/5 pt-6 mt-8 flex flex-col">
                  <span className="font-serif text-lg text-brand-white tracking-wide">
                    {review.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-brand-grey font-semibold mt-1">
                    {review.role} {review.company ? `• ${review.company}` : ''}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
