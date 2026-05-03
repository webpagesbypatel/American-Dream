import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'The Vision', id: 'hero' },
    { name: 'Impact', id: 'stats' },
    { name: 'Neighborhoods', id: 'neighborhoods' },
    { name: 'Opportunity', id: 'pitch' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-10 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col mix-blend-difference pointer-events-auto cursor-pointer">
          <span className="text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-bold text-gray-500 mb-1 md:mb-2">The Destination</span>
          <div className="text-lg md:text-2xl font-serif tracking-tightest text-luxury-cream">AMERICAN DREAM</div>
        </div>
        <div className="flex gap-4 md:gap-12 items-center pointer-events-auto">
          <div className="hidden md:flex gap-8 text-[11px] tracking-[0.2em] uppercase font-semibold text-gray-400">
            <span onClick={() => scrollToSection('hero')} className="text-white border-b border-white pb-1 cursor-pointer">Experience</span>
            <span onClick={() => scrollToSection('neighborhoods')} className="hover:text-white cursor-pointer transition-colors">Neighborhoods</span>
            <span onClick={() => scrollToSection('pitch')} className="hover:text-white cursor-pointer transition-colors">Leasing</span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 md:px-8 py-2 md:py-3 border border-luxury-gold/50 bg-luxury-gold/10 backdrop-blur-md rounded-full text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-black transition-all interactive shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            id="menu-toggle"
          >
            {isOpen ? 'Close' : 'Inquire Now'}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-luxury-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 text-luxury-cream p-4 interactive"
            >
              <X className="w-8 h-8" />
            </button>
            <ul className="space-y-8 text-center">
              {menuItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-luxury-cream text-5xl font-serif hover:text-luxury-gold transition-colors interactive italic"
                  >
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
