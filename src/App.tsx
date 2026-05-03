/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ProgressNav from './components/ProgressNav';
import Hero from './components/Hero';
import StatsSection from './components/StatsSection';
import NeighborhoodsGallery from './components/NeighborhoodsGallery';
import BusinessPitch from './components/BusinessPitch';
import ContactOverlay from './components/ContactOverlay';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Disable standard scroll restoration to handle snaps correctly
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const sections = ['hero', 'stats', 'neighborhoods', 'pitch'];

  return (
    <main className="relative bg-luxury-black font-sans selection:bg-luxury-gold selection:text-luxury-black min-h-screen">
      <CustomCursor />
      <Navbar />
      <ProgressNav sections={sections} />
      <ContactOverlay />
      
      {/* Scroll Progress Bar at the Top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-luxury-gold origin-left z-[70]"
        style={{ scaleX }}
      />

      <div className="snap-container grainy-overlay">
        <Hero />
        <StatsSection />
        <NeighborhoodsGallery />
        <BusinessPitch />
        
        {/* Footer section inside snap */}
        <section className="snap-section bg-luxury-black flex items-center justify-center p-8 md:p-24 text-center">
          <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-24 pointer-events-none opacity-20 hidden md:flex">
            <span className="-rotate-90 text-[10px] tracking-[0.4em] font-serif uppercase text-white">04 / 04</span>
          </div>
          <div className="max-w-3xl">
            <h2 className="text-luxury-cream font-serif text-4xl md:text-8xl italic mb-8 md:mb-12 leading-tight">The Future is<br />American Dream.</h2>
            <div className="h-px w-16 md:w-24 bg-white/20 mx-auto mb-8 md:mb-12" />
            <p className="text-white/20 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.6em] px-4">
              © 2026 TRIPLE FIVE GROUP • NEW JERSEY • NEW YORK
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

