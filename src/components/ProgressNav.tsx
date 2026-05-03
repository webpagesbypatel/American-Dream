import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ProgressNavProps {
  sections: string[];
}

export default function ProgressNav({ sections }: ProgressNavProps) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = document.querySelector('.snap-container');
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const height = container.clientHeight;
      
      // Calculate active section based on the most visible section center
      const index = Math.min(
        sections.length - 1,
        Math.max(0, Math.floor((scrollPos + height / 3) / height))
      );
      setActiveSection(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed right-0 top-0 h-full w-24 border-l border-white/5 flex flex-col items-center justify-center gap-16 z-40 hidden md:flex pointer-events-none">
      <div className="flex flex-col gap-5 pointer-events-auto">
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const container = document.querySelector('.snap-container');
              if (container) {
                container.scrollTo({ top: i * container.clientHeight, behavior: 'smooth' });
              }
            }}
            className="group relative p-2 md:p-3 interactive"
          >
            <motion.div
              animate={{
                scale: activeSection === i ? 1.5 : 1,
                backgroundColor: activeSection === i ? '#FFFFFF' : 'rgba(255, 255, 255, 0.2)',
              }}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            />
          </button>
        ))}
      </div>
      <div className="rotate-90 origin-center whitespace-nowrap text-[10px] tracking-[0.6em] uppercase text-white/20 font-bold font-sans mt-24">
        SCROLL TO EXPLORE THE LEGACY
      </div>
    </div>
  );
}
