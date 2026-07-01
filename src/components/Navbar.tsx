import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Presets', href: '#presets' },
  { name: 'Services', href: '#services' },
  { name: 'Reviews', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 transform ${
        isScrolled 
          ? 'bg-brand-black/95 py-4 backdrop-blur-md border-b border-brand-white/10 translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0 pointer-events-none py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button
          onClick={() => handleScrollTo('home')}
          className="text-2xl tracking-tighter text-brand-white font-normal focus:outline-none"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Rae Studio<sup className="text-xs">®</sup>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          <button
            onClick={() => handleScrollTo('home')}
            className="text-xs uppercase tracking-widest font-medium text-brand-grey hover:text-brand-white transition-colors duration-300 focus:outline-none"
          >
            Home
          </button>
          <button
            onClick={() => handleScrollTo('about')}
            className="text-xs uppercase tracking-widest font-medium text-brand-grey hover:text-brand-white transition-colors duration-300 focus:outline-none"
          >
            About
          </button>
          <button
            onClick={() => handleScrollTo('work')}
            className="text-xs uppercase tracking-widest font-medium text-brand-grey hover:text-brand-white transition-colors duration-300 focus:outline-none"
          >
            Work
          </button>
          <button
            onClick={() => handleScrollTo('presets')}
            className="text-xs uppercase tracking-widest font-medium text-brand-grey hover:text-brand-white transition-colors duration-300 focus:outline-none"
          >
            Presets
          </button>
          <button
            onClick={() => handleScrollTo('services')}
            className="text-xs uppercase tracking-widest font-medium text-brand-grey hover:text-brand-white transition-colors duration-300 focus:outline-none"
          >
            Services
          </button>
          <button
            onClick={() => handleScrollTo('testimonials')}
            className="text-xs uppercase tracking-widest font-medium text-brand-grey hover:text-brand-white transition-colors duration-300 focus:outline-none"
          >
            Reviews
          </button>
          <button
            onClick={() => handleScrollTo('contact')}
            className="text-xs uppercase tracking-widest font-medium text-brand-grey hover:text-brand-white transition-colors duration-300 focus:outline-none"
          >
            Contact
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-black z-50 flex flex-col items-center justify-center space-y-8"
          >
            <button
              className="absolute top-8 right-6 text-brand-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <button
              onClick={() => handleScrollTo('home')}
              className="text-4xl font-serif uppercase tracking-tighter hover:text-brand-red transition-colors focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="text-4xl font-serif uppercase tracking-tighter hover:text-brand-red transition-colors focus:outline-none"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo('work')}
              className="text-4xl font-serif uppercase tracking-tighter hover:text-brand-red transition-colors focus:outline-none"
            >
              Work
            </button>
            <button
              onClick={() => handleScrollTo('presets')}
              className="text-4xl font-serif uppercase tracking-tighter hover:text-brand-red transition-colors focus:outline-none"
            >
              Presets
            </button>
            <button
              onClick={() => handleScrollTo('services')}
              className="text-4xl font-serif uppercase tracking-tighter hover:text-brand-red transition-colors focus:outline-none"
            >
              Services
            </button>
            <button
              onClick={() => handleScrollTo('testimonials')}
              className="text-4xl font-serif uppercase tracking-tighter hover:text-brand-red transition-colors focus:outline-none"
            >
              Reviews
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="text-4xl font-serif uppercase tracking-tighter hover:text-brand-red transition-colors focus:outline-none"
            >
              Contact
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
