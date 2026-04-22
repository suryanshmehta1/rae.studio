import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-brand-black border-t border-brand-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-xl font-serif italic text-brand-white">Rae Studio</h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-grey mt-2">© 2026 Raw Emotion. All rights reserved.</p>
          </div>

          <div className="flex items-center space-x-12">
            {[
              { icon: Instagram, href: 'https://www.instagram.com/rae.studioo' },
              { icon: Twitter, href: '#' },
              { icon: Facebook, href: '#' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-grey hover:text-brand-red transition-all duration-300 transform hover:scale-110"
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <span className="text-[8px] uppercase tracking-[0.5em] text-brand-grey/50">Crafted for Cinematic Souls</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
