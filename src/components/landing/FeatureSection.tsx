'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const accentBg: Record<string, string> = {
  terracotta: 'bg-terracotta',
  'leaf-green': 'bg-leaf-green',
  'lemon-gold': 'bg-lemon-gold',
  mediterranean: 'bg-mediterranean',
};

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  accent: string;
}

export default function FeatureSection({ feature, index, isActive, onBookClick }: { feature: Feature; index: number; isActive: boolean; onBookClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const even = index % 2 === 0;

  return (
    <motion.section ref={ref} id={feature.id} className="relative min-h-screen flex items-center py-20 lg:py-0" initial={{ opacity: 0.5 }} animate={inView ? { opacity: 1 } : { opacity: 0.5 }} transition={{ duration: 0.6 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${even ? '' : 'lg:direction-rtl'}`}>
          <motion.div initial={{ opacity: 0, x: even ? -60 : 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className={`relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ${even ? '' : 'lg:order-1'}`}>
            <img src={feature.imageUrl} alt={feature.title} className="w-full h-full object-cover ken-burns" loading="lazy" />
            <div className={`absolute top-0 left-0 w-1 h-full ${accentBg[feature.accent] || 'bg-terracotta'}`} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: even ? 60 : -60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className={even ? 'lg:pl-8' : 'lg:pr-8 lg:order-2'}>
            <motion.div initial={{ width: 0 }} animate={inView ? { width: 60 } : {}} transition={{ duration: 0.6, delay: 0.5 }} className={`h-px mb-6 ${accentBg[feature.accent] || 'bg-terracotta'}`} />
            <p className="text-lemon-gold text-sm tracking-[0.3em] uppercase mb-3 font-medium">{feature.subtitle}</p>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-mediterranean-deep mb-6 leading-tight">{feature.title}</h2>
            <p className="text-mediterranean/80 text-lg leading-relaxed mb-8 max-w-lg">{feature.description}</p>
            <div className="flex items-center gap-6">
              <button onClick={onBookClick} className="cta-button bg-terracotta hover:bg-terracotta/90 text-linen px-8 py-3.5 rounded-full text-sm tracking-[0.15em] uppercase font-medium flex items-center gap-2">Book Now <ArrowRight className="w-4 h-4" /></button>
              <button className="text-mediterranean hover:text-terracotta transition-colors flex items-center gap-2 text-sm tracking-wider uppercase"><MapPin className="w-4 h-4" /> Learn More</button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
