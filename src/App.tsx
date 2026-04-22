/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import FeaturedWork from './components/FeaturedWork';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Presets from './components/Presets';

export default function App() {
  return (
    <main className="relative selection:bg-brand-red selection:text-white">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <FeaturedWork />
      <Presets />
      <Services />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
