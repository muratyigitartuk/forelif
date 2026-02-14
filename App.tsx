import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Section from './components/Section';
import FinalSurprise from './components/FinalSurprise';
import { StorySection } from './types';

// Story Data with Landscape Images
const storyData: StorySection[] = [
  {
    id: 'intro',
    text: "Eğer o gün tanışmasaydık...",
    subText: "Her şey ne kadar farklı olurdu, hiç düşündün mü?",
    // Misty mountains
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1920&auto=format&fit=crop",
    type: 'gray'
  },
  {
    id: 'gray-1',
    text: "Dünya sadece griden ibaret kalırdı.",
    subText: "Sabah kahvelerinin kokusu, yağmurun sesi anlamsızlaşırdı.",
    // Fixed: Gloomy misty road/forest - High quality & reliable
    image: "https://images.unsplash.com/photo-1445217143695-467124038776?q=80&w=1920&auto=format&fit=crop",
    type: 'gray'
  },
  {
    id: 'gray-2',
    text: "Müzikler hep yarım çalardı.",
    subText: "En güzel şarkıların sözlerini hiç duymazdım.",
    // Lonely sea/lake
    image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=1920&auto=format&fit=crop",
    type: 'gray'
  },
  {
    id: 'gray-3',
    text: "Zaman akıp giderdi ama...",
    subText: "İçinde yaşanacak bir anı bulunmazdı.",
    // Abstract nature/texture dark
    image: "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?q=80&w=1920&auto=format&fit=crop",
    type: 'gray'
  },
  {
    id: 'transition',
    text: "Ama...",
    subText: "Kaderin en güzel tesadüfü gerçekleşti.",
    // Dramatic clouds/light
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1920&auto=format&fit=crop",
    type: 'gray'
  },
  {
    id: 'climax',
    text: "İyi ki o gün vardın Elifim.",
    subText: "Ve dünyamı renklendirdin.",
    // Vibrant sunset/landscape
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1920&auto=format&fit=crop",
    type: 'color'
  }
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-rose-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Scroll Indicator */}
      <motion.div 
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 text-white/50 flex flex-col items-center gap-2 pointer-events-none"
        animate={{ opacity: showScrollIndicator ? 1 : 0, y: showScrollIndicator ? 0 : 20 }}
      >
        <span className="text-xs uppercase tracking-widest">Aşağı Kaydır</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Story Sections */}
      <div className="relative z-0">
        {storyData.map((section, index) => (
          <Section 
            key={section.id} 
            data={section} 
            index={index} 
            isLast={index === storyData.length - 1} 
          />
        ))}
      </div>

      {/* Final Surprise Section (Normal Scroll Flow) */}
      <div className="relative z-10 bg-white">
        <FinalSurprise />
      </div>

    </div>
  );
};

export default App;