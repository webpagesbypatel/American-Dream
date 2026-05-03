import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'hover'>('default');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 500, restDelta: 0.001 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const scale = useSpring(cursorType === 'hover' ? 4 : 1, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the cursor size (20px / 2 = 10)
      mouseX.set(e.clientX - 10);
      mouseY.set(e.clientY - 10);

      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('.interactive') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="custom-cursor hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        scale: scale,
      }}
    />
  );
}
