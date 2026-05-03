import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const OPPORTUNITIES = {
  leasing: {
    title: 'Retail Leasing',
    copy: 'Position your brand at the gateway of NYC. Access high-spend demographics in an environment designed for discovery.',
    stats: ['40M+ Feet on Ground', '$1.2B+ GMV Potential', '98% Retention Rate'],
    media: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop'
  },
  sponsorship: {
    title: 'Brand Partnership',
    copy: 'Total brand immersion across 3 million square feet. Every surface is a canvas for your legacy.',
    stats: ['Global Reach', 'Social Impact', '24/7 Visibility'],
    media: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop'
  },
  events: {
    title: 'Global Impact Events',
    copy: 'The perfect stage for concerts, live broadcasts, and pop-up launches that echo worldwide.',
    stats: ['State-of-the-art Tech', 'Massive Capacity', 'Plug & Play Logistics'],
    media: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2670&auto=format&fit=crop'
  }
};

export default function BusinessPitch() {
  const [selected, setSelected] = useState<keyof typeof OPPORTUNITIES>('leasing');

  return (
    <section id="pitch" className="snap-section bg-luxury-black flex flex-col md:flex-row">
      {/* Left: Media */}
      <div className="w-full md:w-1/2 h-[45vh] md:h-full relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={OPPORTUNITIES[selected].media}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'circOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-luxury-black/60 md:bg-transparent" />
      </div>

      {/* Right: Content */}
      <div className="w-full md:w-1/2 min-h-[55vh] md:h-full flex items-center p-6 md:p-24 relative overflow-hidden">
        {/* Subtle Background Decoration */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop)', backgroundSize: 'cover' }}
        />
        <div className="absolute inset-0 bg-luxury-black/60 md:bg-transparent" />

        <div className="max-w-xl w-full relative z-10">
          <div className="flex flex-wrap items-center justify-center md:items-start md:justify-start gap-4 mb-10 md:mb-16">
            {(Object.keys(OPPORTUNITIES) as Array<keyof typeof OPPORTUNITIES>).map((key) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className={`text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold transition-all interactive relative pb-2 ${
                  selected === key 
                    ? 'text-white' 
                    : 'text-white/20 hover:text-white/40'
                }`}
              >
                {key}
                {selected === key && (
                  <motion.div 
                    layoutId="active-tab" 
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" 
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4 md:mb-6">
                <div className="w-8 md:w-12 h-[1px] bg-white/20"></div>
                <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-white/40">Strategic Partnership</span>
              </div>
              <h2 className="text-luxury-cream font-serif text-4xl md:text-7xl italic mb-6 md:mb-8 leading-tight">
                {OPPORTUNITIES[selected].title}
              </h2>
              <p className="text-white/70 text-base md:text-xl font-light mb-8 md:mb-12 leading-relaxed">
                {OPPORTUNITIES[selected].copy}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-10 md:mb-16">
                {OPPORTUNITIES[selected].stats.map((stat, i) => (
                  <div key={i} className="glass-overlay p-3 md:p-4 rounded-xl">
                    <span className="text-white font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-40">
                      {stat}
                    </span>
                  </div>
                ))}
              </div>

              <button className="w-full md:w-auto px-10 py-5 bg-white text-black rounded-full text-[10px] tracking-[0.3em] font-bold uppercase transition-all hover:bg-luxury-gold interactive">
                Inquire now
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
