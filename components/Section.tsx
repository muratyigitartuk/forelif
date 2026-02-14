import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StorySection } from '../types';

interface SectionProps {
  data: StorySection;
  index: number;
  isLast?: boolean;
}

const Section: React.FC<SectionProps> = ({ data, index, isLast = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Smoother Opacity Logic
  const opacity = useTransform(
    scrollYProgress, 
    // Entering -> Center -> Leaving
    index === 0 
      ? [0, 0.8] // First slide just fades out
      : [0, 0.2, 0.5, 0.8], // Others fade in/out
    index === 0 
      ? [1, 0] 
      : isLast 
        ? [0, 1, 1, 1] // Last slide stays visible
        : [0, 1, 1, 0] // Normal slides fade out
  );
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1.2]);
  const grayscale = data.type === 'gray' ? 'grayscale(100%)' : 'grayscale(0%)';

  const isColorSection = data.type === 'color';

  return (
    // FORCE FULL HEIGHT: Added inline style height: '100dvh' to guarantee it works on mobile
    // Added flex/items-center/justify-center explicitly in style to prevent Tailwind loading glitches
    <div 
      ref={ref} 
      className="w-full relative overflow-hidden sticky top-0 bg-black"
      style={{ 
        height: '100dvh', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Background Image */}
      <motion.div 
        style={{ scale, filter: isColorSection ? 'none' : grayscale }}
        className="absolute inset-0 w-full h-full z-0 bg-black"
      >
        <img 
          src={data.image} 
          alt="Atmosphere" 
          className="w-full h-full object-cover transition-all duration-1000 opacity-90"
        />
        {/* Stronger Overlay for better text readability */}
        <div className={`absolute inset-0 ${isColorSection ? 'bg-black/40' : 'bg-black/70'}`} />
        {/* Gradient at the bottom to help text pop */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
      </motion.div>

      {/* Text Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center justify-center h-full"
      >
        <div className="backdrop-blur-[2px] p-4 rounded-xl">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
            {data.text}
          </h2>
          {data.subText && (
            <p className="font-sans text-lg md:text-xl font-light tracking-wide text-gray-200 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              {data.subText}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Section;