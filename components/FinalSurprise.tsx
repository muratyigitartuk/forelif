import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FinalSurprise: React.FC = () => {
  const poem = `Sen gelmeden önce mevsimler hep kıştı,
Gökyüzü gri, şarkılar yarım, yollar boştu.
Sonra sen geldin, o gün, o an,
Gökkuşağı indi sanki şehre bir anda.

Sesinle renk geldi sabahlarıma,
Gülüşünle güneş doğdu karanlığıma.
İyi ki o gün, o saat, o saniye,
Kader bizi birleştirdi bu hikayede.

Seni seviyorum Elifim,
Siyah beyaz filmimin en güzel rengi.`;

  return (
    <div className="min-h-screen w-full bg-romantic-50 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              y: -100,
              x: Math.random() * 200 - 100 
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 5 
            }}
            className="absolute text-rose-300"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 2 + 1}rem` 
            }}
          >
            <Heart fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="z-10 text-center max-w-2xl bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-rose-100"
      >
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-rose-800 mb-4">
          Seni Çok Seviyorum Elifim
        </h1>
        <p className="font-sans text-xl text-rose-600 mb-8 italic">
          "Hayatıma kattığın her renk için teşekkür ederim."
        </p>

        <div className="w-full h-px bg-rose-200 my-8" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-rose-50 rounded-xl border border-rose-100"
        >
          <p className="font-serif text-lg text-rose-900 whitespace-pre-line leading-relaxed">
            {poem}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FinalSurprise;