import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StorySection } from '../types';

interface SectionProps {
  data: StorySection;
  index: number;
}

const Section: React.FC<SectionProps> = ({ data, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Opacity Logic:
  // Index 0: Starts visible (1) and fades out (0) as we scroll down.
  // Others: Fade in -> Stay fully opaque (plateau) -> Fade out.
  // Previous logic peaked at exactly 50% scroll, causing it to look transparent at other times.
  // New logic keeps it at opacity 1 between 35% and 65% of the scroll progress.
  const opacity = useTransform(
    scrollYProgress, 
    index === 0 ? [0, 0.8] : [0.15, 0.35, 0.65, 0.85], 
    index === 0 ? [1, 0] : [0, 1, 1, 0]
  );
  
  const scale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.8, 1, 1.2]);
  const grayscale = data.type === 'gray' ? 'grayscale(100%)' : 'grayscale(0%)';

  // Specific transition logic for the final color reveal
  const isColorSection = data.type === 'color';

  return (
    <div ref={ref} className="h-screen w-full flex items-center justify-center relative overflow-hidden sticky top-0 bg-black">
      {/* Background Image - Added bg-black to container and removed opacity reduction on img to prevent see-through */}
      <motion.div 
        style={{ scale, filter: isColorSection ? 'none' : grayscale }}
        className="absolute inset-0 w-full h-full z-0 bg-black"
      >
        <img 
          src={data.image} 
          alt="Atmosphere" 
          className="w-full h-full object-cover transition-all duration-1000 opacity-100"
        />
        <div className={`absolute inset-0 ${isColorSection ? 'bg-rose-900/20' : 'bg-black/60'}`} />
      </motion.div>

      {/* Text Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <h2 className={`font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl ${isColorSection ? 'text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]' : 'text-gray-300'}`}>
          {data.text}
        </h2>
        {data.subText && (
          <p className={`font-sans text-lg md:text-xl font-light tracking-wide drop-shadow-lg ${isColorSection ? 'text-rose-100 font-medium' : 'text-gray-400'}`}>
            {data.subText}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Section;