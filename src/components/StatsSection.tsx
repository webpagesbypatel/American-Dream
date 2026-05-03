import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface StatItemProps {
  label: string;
  value: number;
  suffix: string;
  delay: number;
  key?: number | string;
}

const StatItem = ({ label, value, suffix, delay }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000; // 2 seconds

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      const timeout = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay]);

  return (
    <div ref={ref} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl group interactive transition-all hover:bg-white/10 hover:border-luxury-gold/30 flex flex-col justify-center items-center md:items-start border-l-luxury-gold/20">
      <h3 className="text-3xl md:text-5xl font-serif mb-2 text-luxury-gold group-hover:text-luxury-cream transition-colors">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium text-center md:text-left">
        {label}
      </p>
    </div>
  );
};

export default function StatsSection() {
  const stats = [
    { label: 'Annual Visitors', value: 40, suffix: 'M+', delay: 0.1 },
    { label: 'Square Footage', value: 3, suffix: 'M+', delay: 0.3 },
    { label: 'Brand Partners', value: 450, suffix: '+', delay: 0.5 },
    { label: 'Unique Attractions', value: 15, suffix: '+', delay: 0.7 },
  ];

  return (
    <section id="stats" className="snap-section bg-luxury-black flex items-center justify-center p-8 md:p-24">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-10 md:mb-16 text-center md:text-left"
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4 md:mb-6">
            <div className="w-8 h-[1px] bg-white/20"></div>
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/40 font-bold">The Impact</span>
          </div>
          <h2 className="text-luxury-cream font-serif text-4xl md:text-6xl italic leading-tight">The Power of Scale</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatItem key={i} label={stat.label} value={stat.value} suffix={stat.suffix} delay={stat.delay} />
          ))}
        </div>
      </div>
    </section>
  );
}
