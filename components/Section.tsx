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

  // Opacity Logic:
  // index 0: Fade out only.
  // Normal sections: Fade in -> Plateau -> Fade out.
  // Last section: Fade in -> Plateau -> STAY VISIBLE (until covered by next section).
  // This ensures the "Climax" text is readable until the white surprise section slides over it.
  const opacity = useTransform(
    scrollYProgress, 
    index === 0 ? [0, 0.8] : [0.1, 0.3, 0.8, 0.98], 
    index === 0 ? [1, 0] : isLast ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.8, 1, 1.2]);
  const grayscale = data.type === 'gray' ? 'grayscale(100%)' : 'grayscale(0%)';

  // Specific transition logic for the final color reveal
  const isColorSection = data.type === 'color';

  return (
    // Used h-[100dvh] for better mobile support (dynamic viewport height)
    <div ref={ref} className="h-[100dvh] w-full flex items-center justify-center relative overflow-hidden sticky top-0 bg-black">
      {/* Background Image */}
      <motion.div 
        style={{ scale, filter: isColorSection ? 'none' : grayscale }}
        className="absolute inset-0 w-full h-full z-0 bg-black"
      >
        <img 
          src={data.image} 
          alt="Atmosphere" 
          className="w-full h-full object-cover transition-all duration-1000 opacity-100"
        />
        {/* Overlay to ensure text readability */}
        <div className={`absolute inset-0 ${isColorSection ? 'bg-black/50' : 'bg-black/60'}`} />
      </motion.div>

      {/* Text Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <h2 className={`font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl ${isColorSection ? 'text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]' : 'text-gray-300'}`}>
          {data.text}
        </h2>
        {data.subText && (
          <p className={`font-sans text-lg md:text-xl font-light tracking-wide drop-shadow-xl ${isColorSection ? 'text-white/90 font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]' : 'text-gray-400'}`}>
            {data.subText}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Section;