import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NEIGHBORHOODS = [
  {
    title: 'The Avenue',
    description: 'The pinnacle of luxury luxury retail. Homage to the world\'s most iconic fashion houses.',
    image: 'https://images.unsplash.com/photo-1620332372374-f108c53d2e03?q=80&w=2672&auto=format&fit=crop',
    tag: 'RETAIL'
  },
  {
    title: 'DreamWorks Water Park',
    description: 'Year-round tropical paradise with global sponsorship dominance.',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2670&auto=format&fit=crop',
    tag: 'ADRENALINE'
  },
  {
    title: 'Nickelodeon Universe',
    description: 'World-class events venue and family entertainment epicentre.',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=2670&auto=format&fit=crop',
    tag: 'EVENTS'
  },
  {
    title: 'Big SNOW',
    description: 'North America\'s first indoor real-snow ski slope.',
    image: 'https://images.unsplash.com/photo-1551698618-1fed5d97550a?q=80&w=2670&auto=format&fit=crop',
    tag: 'ACTIVATION'
  },
];

export default function NeighborhoodsGallery() {
  const horizontalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!horizontalRef.current || !containerRef.current) return;

    // Only apply horizontal scroll on desktop (md and up)
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    
    if (!isDesktop) return;

    const sections = gsap.utils.toArray('.horizontal-section');
    
    // Create the horizontal scroll animation
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1.5,
        scroller: ".snap-container",
        start: "top top",
        end: () => "+=" + horizontalRef.current!.offsetWidth,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      }
    });

    // Parallax only on horizontal scroll
    sections.forEach((section: any) => {
      const img = section.querySelector('img');
      gsap.fromTo(img, 
        { xPercent: -15 }, 
        { 
          xPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            scrub: true,
            scroller: ".snap-container",
          }
        }
      );
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="neighborhoods" className="min-h-screen h-auto md:h-screen w-full overflow-x-hidden md:overflow-hidden bg-luxury-black">
      <div ref={horizontalRef} className="flex flex-col md:flex-row h-auto md:h-full md:w-[400%]">
        {NEIGHBORHOODS.map((item, i) => (
          <div key={i} className="horizontal-section relative group w-full md:w-1/4 h-[70vh] md:h-full flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover scale-110 md:scale-110 group-hover:scale-100 transition-transform duration-[2s]" 
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
            
            <div className="relative z-10 h-full flex flex-col justify-center md:justify-end items-center md:items-start text-center md:text-left p-8 md:p-24 max-w-4xl mx-auto md:mx-0">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="glass-overlay px-4 md:px-6 py-3 md:py-4 rounded-xl inline-block mb-6 md:mb-8 self-center md:self-start"
              >
                <span className="text-luxury-gold font-mono text-[9px] md:text-[10px] tracking-[0.5em] uppercase block mb-1">0{i + 1} / {item.tag}</span>
                <h2 className="text-luxury-cream font-serif text-3xl md:text-6xl italic leading-none">
                  {item.title}
                </h2>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-luxury-cream/80 text-base md:text-xl font-light max-w-lg mb-6 md:mb-8 leading-relaxed"
              >
                {item.description}
              </motion.p>
              
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '3rem' }}
                transition={{ duration: 1, delay: 0.6 }}
                className="h-[1px] bg-luxury-gold/50" 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
