import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-brand-black text-white"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* Fullscreen Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />
        {/* Subtle dark tint overlay to ensure extreme text legibility and cinematic quality */}
        <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />
      </div>

      {/* Navigation Bar (Glassmorphic, integrated into Hero page context) */}
      <header className="relative z-10 w-full">
        <div className="flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
          {/* Logo: Rae Studio® */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleScrollTo('home'); }}
            className="text-3xl tracking-tight text-white focus:outline-none"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Rae Studio<sup className="text-xs">®</sup>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleScrollTo('home')}
              className="text-xs uppercase tracking-widest font-medium text-white transition-colors hover:text-white/80 focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="text-xs uppercase tracking-widest font-medium text-white/60 transition-colors hover:text-white focus:outline-none"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo('work')}
              className="text-xs uppercase tracking-widest font-medium text-white/60 transition-colors hover:text-white focus:outline-none"
            >
              Work
            </button>
            <button
              onClick={() => handleScrollTo('presets')}
              className="text-xs uppercase tracking-widest font-medium text-white/60 transition-colors hover:text-white focus:outline-none"
            >
              Presets
            </button>
            <button
              onClick={() => handleScrollTo('services')}
              className="text-xs uppercase tracking-widest font-medium text-white/60 transition-colors hover:text-white focus:outline-none"
            >
              Services
            </button>
            <button
              onClick={() => handleScrollTo('testimonials')}
              className="text-xs uppercase tracking-widest font-medium text-white/60 transition-colors hover:text-white focus:outline-none"
            >
              Reviews
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="text-xs uppercase tracking-widest font-medium text-white/60 transition-colors hover:text-white focus:outline-none"
            >
              Contact
            </button>
          </nav>

          {/* CTA Button: Explore Work */}
          <div className="hidden md:block">
            <button
              onClick={() => handleScrollTo('work')}
              className="liquid-glass rounded-full px-6 py-2.5 text-sm text-white font-medium hover:scale-[1.03] transition-transform duration-300 shadow-sm cursor-pointer"
            >
              Explore Work
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mx-6 p-6 rounded-2xl bg-black/80 backdrop-blur-lg border border-white/10 z-50 flex flex-col space-y-4"
          >
            <button
              onClick={() => handleScrollTo('home')}
              className="text-left text-sm text-white font-medium py-1.5 border-b border-white/5 focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="text-left text-sm text-white/60 hover:text-white font-medium py-1.5 border-b border-white/5 focus:outline-none"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo('work')}
              className="text-left text-sm text-white/60 hover:text-white font-medium py-1.5 border-b border-white/5 focus:outline-none"
            >
              Work
            </button>
            <button
              onClick={() => handleScrollTo('presets')}
              className="text-left text-sm text-white/60 hover:text-white font-medium py-1.5 border-b border-white/5 focus:outline-none"
            >
              Presets
            </button>
            <button
              onClick={() => handleScrollTo('services')}
              className="text-left text-sm text-white/60 hover:text-white font-medium py-1.5 border-b border-white/5 focus:outline-none"
            >
              Services
            </button>
            <button
              onClick={() => handleScrollTo('testimonials')}
              className="text-left text-sm text-white/60 hover:text-white font-medium py-1.5 border-b border-white/5 focus:outline-none"
            >
              Reviews
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="text-left text-sm text-white/60 hover:text-white font-medium py-1.5 focus:outline-none"
            >
              Contact
            </button>
            <button
              onClick={() => handleScrollTo('work')}
              className="liquid-glass rounded-full py-3 text-center text-sm text-white font-medium hover:scale-[1.02] transition-transform cursor-pointer w-full"
            >
              Explore Work
            </button>
          </motion.div>
        )}
      </header>

      {/* Hero Section Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] max-w-7xl mx-auto my-auto w-full">
        {/* H1 Title */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-white animate-fade-rise"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where <em className="not-italic text-white/60">dreams</em> rise <br />
          <em className="not-italic text-white/60">through the silence.</em>
        </h1>

        {/* Subtext */}
        <p className="text-white/70 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-light animate-fade-rise-delay">
          We're designing tools for deep thinkers, bold creators, and quiet rebels.
          Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </p>

        {/* Big CTA Button */}
        <div className="animate-fade-rise-delay-2">
          <button
            onClick={() => handleScrollTo('work')}
            className="liquid-glass rounded-full px-14 py-5 text-base text-white font-medium mt-12 hover:scale-[1.03] transition-transform duration-300 shadow-lg cursor-pointer"
          >
            Explore Work
          </button>
        </div>
      </div>

      {/* Empty spacer or bottom detail placeholder aligned with the clean requested layout */}
      <div className="relative z-10 w-full h-8" />
    </section>
  );
}
