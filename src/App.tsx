/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Presets from './components/Presets';
import Story from './components/Story';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showStory, setShowStory] = useState(false);

  return (
    <main className="relative selection:bg-brand-red selection:text-white">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Presets />
      <Services />
      <Testimonials />
      <Contact />
      <AnimatePresence>
        {showAdmin && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            id="admin" 
            className="border-t border-brand-white/5 overflow-hidden"
          >
            <AdminPanel />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showStory && <Story onClose={() => setShowStory(false)} />}
      </AnimatePresence>

      <Footer 
        onStoryTrigger={() => setShowStory(true)} 
        onAdminTrigger={() => setShowAdmin(!showAdmin)} 
      />
      <Chatbot />
    </main>
  );
}
