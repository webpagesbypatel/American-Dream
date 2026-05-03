import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send } from 'lucide-react';

export default function ContactOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-40">
        <motion.button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          animate={{ x: position.x, y: position.y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 md:gap-4 bg-luxury-cream text-luxury-black pl-6 md:pl-8 pr-1 py-1 rounded-full interactive hover:pr-8 transition-all active:scale-95"
        >
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold whitespace-nowrap">Let's Build Legacy</span>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-luxury-black rounded-full flex items-center justify-center text-luxury-cream group-hover:rotate-12 transition-transform">
            <Send className="w-3 h-3 md:w-4 md:h-4" />
          </div>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-luxury-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-luxury-black border border-white/10 w-full max-w-2xl rounded-3xl p-12 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 text-luxury-cream/40 hover:text-luxury-cream transition-colors interactive"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-12">
                <span className="text-luxury-gold font-mono text-[10px] tracking-[0.5em] uppercase mb-4 block">Step 0{step} / 02</span>
                <h2 className="text-luxury-cream font-serif text-4xl italic">Inquire Privately</h2>
              </div>

              <div className="space-y-8">
                {step === 1 ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="text-[10px] text-luxury-cream/40 uppercase tracking-widest mb-2 block">Your Vision</label>
                      <select className="w-full bg-transparent border-b border-white/20 py-4 text-luxury-cream focus:border-luxury-gold outline-none interactive">
                        <option value="retail">Global Brand Expansion</option>
                        <option value="sponsorship">Strategic Sponsorship</option>
                        <option value="events">Major Event Collaboration</option>
                      </select>
                    </div>
                    <button 
                      onClick={() => setStep(2)}
                      className="w-full py-6 text-luxury-black bg-luxury-cream rounded-xl text-xs uppercase tracking-[0.3em] font-bold interactive"
                    >
                      Next Step
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                   >
                    <div>
                      <label className="text-[10px] text-luxury-cream/40 uppercase tracking-widest mb-2 block">Direct Contact</label>
                      <input 
                        type="email" 
                        placeholder="EMAIL@CORPORATE.GLOBAL"
                        className="w-full bg-transparent border-b border-white/20 py-4 text-luxury-cream focus:border-luxury-gold outline-none interactive placeholder:text-white/10 italic"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setStep(1)}
                        className="flex-1 py-6 text-luxury-cream border border-white/10 rounded-xl text-xs uppercase tracking-[0.3em] interactive"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setIsOpen(false)}
                        className="flex-[2] py-6 text-luxury-black bg-luxury-cream rounded-xl text-xs uppercase tracking-[0.3em] font-bold interactive"
                      >
                        Send Inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
