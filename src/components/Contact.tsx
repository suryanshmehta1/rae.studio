import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, ArrowRight, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    // Automatically open mail client with pre-filled information
    const subject = `Inquiry from ${formData.name} (Rae Studio)`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    const mailtoUrl = `mailto:raestudioo1@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Simulate a brief "sending" delay for UX
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setStatus('success');
      
      // Reset form after a while
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }, 800);
  };
  return (
    <section id="contact" className="py-24 md:py-40 bg-brand-black relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className="text-brand-red text-xs uppercase tracking-[0.4em] font-bold">Start a Project</span>
            <h2 className="text-5xl md:text-8xl font-black mt-4 italic mb-8">Let's create something unforgettable.</h2>
            <p className="text-brand-grey text-lg max-w-2xl leading-relaxed">
              Available for international bookings and artistic collaborations. 
              Let's weave your story into a visual masterpiece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-brand-white/10">
            <motion.a
                href="tel:+919928974000"
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group"
            >
              <div className="p-5 bg-brand-white/5 rounded-full group-hover:bg-brand-red transition-colors duration-500">
                <Phone className="text-brand-white" size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-grey mb-1">Call Us</p>
                <p className="text-2xl font-serif italic text-brand-white">+91 9928974000</p>
              </div>
            </motion.a>

            <motion.a
                href="mailto:raestudioo1@gmail.com"
                whileHover={{ x: 10 }}
                className="flex items-center gap-6 group"
            >
              <div className="p-5 bg-brand-white/5 rounded-full group-hover:bg-brand-red transition-colors duration-500">
                <Mail className="text-brand-white" size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-brand-grey mb-1">Email Us</p>
                <p className="text-2xl font-serif italic text-brand-white">raestudioo1@gmail.com</p>
              </div>
            </motion.a>
          </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-24 p-12 bg-white/5 border border-brand-white/5 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-brand-red transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-700" />
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center text-brand-red mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-3xl font-serif italic mb-4">Transmission Sent</h3>
                    <p className="text-brand-grey max-w-sm uppercase tracking-widest text-[10px]">
                      Your story has been captured. If your email client didn't open automatically, please reach out directly to raestudioo1@gmail.com
                    </p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-brand-red text-[10px] bg-white hover:text-white transition-all uppercase tracking-[0.3em] font-black"
                    >
                      {/* Empty button for reset */}
                    </button>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-brand-red text-[10px] uppercase tracking-[0.3em] font-black hover:text-brand-white transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-3xl font-serif italic mb-8">Inquiry Card</h3>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="NAME"
                          className="bg-transparent border-b border-brand-white/20 py-4 focus:border-brand-red outline-none transition-colors text-xs uppercase tracking-widest placeholder:text-brand-grey/50"
                        />
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="EMAIL ADDRESS"
                          className="bg-transparent border-b border-brand-white/20 py-4 focus:border-brand-red outline-none transition-colors text-xs uppercase tracking-widest placeholder:text-brand-grey/50"
                        />
                      </div>
                      <textarea 
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="TELL US YOUR STORY"
                        className="w-full bg-transparent border-b border-brand-white/20 py-4 focus:border-brand-red outline-none transition-colors text-xs uppercase tracking-widest placeholder:text-brand-grey/50 resize-none"
                      />
                      <button 
                        type="submit"
                        disabled={status === 'sending'}
                        className="group flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-black hover:text-brand-red transition-colors disabled:opacity-50"
                      >
                        {status === 'sending' ? 'PREPARING...' : 'Send Inquiry'} 
                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
