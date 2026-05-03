import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    // Pinning effect with zoom
    gsap.to(videoRef.current, {
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        scroller: ".snap-container",
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });
  }, []);

  return (
    <section ref={containerRef} id="hero" className="snap-section bg-luxury-black">
      <div className="absolute inset-0 overflow-hidden">
        {/* Cinematic Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 mix-blend-luminosity"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2670&auto=format&fit=crop)' }}
        />
        {/* Secondary Texture Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2670&auto=format&fit=crop)' }}
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20 scale-105 mix-blend-screen"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-fashion-model-on-a-rooftop-34531-large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black z-10" />
      </div>

      <div className="relative z-20 h-full flex flex-col justify-end md:justify-end items-center md:items-start text-center md:text-left p-6 md:p-24 pt-32 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl flex flex-col items-center md:items-start"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6 md:mb-8">
            <div className="w-8 md:w-12 h-[1px] bg-white/40"></div>
            <span className="text-[9px] md:text-[11px] tracking-[0.3em] uppercase text-white/60 font-semibold">New Jersey / NYC Gateway</span>
          </div>
          <h1 className="text-luxury-cream font-serif text-[clamp(2.2rem,11vw,120px)] leading-[0.9] md:leading-[0.85] tracking-tightest mb-6 md:mb-8 italic">
            The World’s <br />
            <span className="not-italic">Largest Stage.</span>
          </h1>
          <p className="text-white/70 font-sans text-lg md:text-2xl max-w-lg font-light leading-relaxed mb-10 md:mb-12">
            More than a mall. A global destination for retail, culture, and adrenaline—architected for the boldest brands in the world.
          </p>
          
          <button 
            onClick={() => {
              document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="md:hidden flex items-center gap-4 text-white group interactive"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Explore the Vision</span>
            <div className="w-8 h-[1px] bg-white/40" />
          </button>
        </motion.div>
      </div>

      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-24 pointer-events-none opacity-20 hidden md:flex">
        <span className="-rotate-90 text-[10px] tracking-[0.4em] font-serif uppercase text-white">01 / 04</span>
      </div>
    </section>
  );
}
