'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

const accentBorder: Record<string, string> = {
  terracotta: 'border-terracotta',
  'leaf-green': 'border-leaf-green',
  'lemon-gold': 'border-lemon-gold',
  mediterranean: 'border-mediterranean',
};

const accentBg: Record<string, string> = {
  terracotta: 'bg-terracotta',
  'leaf-green': 'bg-leaf-green',
  'lemon-gold': 'bg-lemon-gold',
  mediterranean: 'bg-mediterranean',
};

const accentText: Record<string, string> = {
  terracotta: 'text-terracotta',
  'leaf-green': 'text-leaf-green',
  'lemon-gold': 'text-lemon-gold',
  mediterranean: 'text-mediterranean',
};

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  accent: string;
}

export default function FeatureSection({
  feature,
  index,
  isActive,
  onBookClick,
}: {
  feature: Feature;
  index: number;
  isActive: boolean;
  onBookClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.25 });
  const even = index % 2 === 0;
  const border = accentBorder[feature.accent] || 'border-terracotta';
  const bg = accentBg[feature.accent] || 'bg-terracotta';
  const text = accentText[feature.accent] || 'text-terracotta';

  return (
    <motion.section
      ref={ref}
      id={feature.id}
      className="relative py-16 sm:py-20 lg:py-0"
      initial={{ opacity: 0.3 }}
      animate={inView ? { opacity: 1 } : { opacity: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center ${even ? '' : 'lg:direction-rtl'}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: even ? -60 : 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className={`relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ${even ? '' : 'lg:order-1'}`}
          >
            <img
              src={feature.imageUrl}
              alt={feature.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Accent border bar */}
            <div className={`absolute top-0 left-0 w-1 h-full ${bg}`} />
            {/* Subtle gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: even ? 60 : -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className={even ? 'lg:pl-4 xl:pl-8' : 'lg:pr-4 xl:pr-8 lg:order-2'}
          >
            {/* Animated accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 60 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`h-0.5 mb-6 ${bg}`}
            />

            <p className={`${text} text-sm sm:text-base tracking-[0.3em] uppercase mb-3 font-medium`}>
              {feature.subtitle}
            </p>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-mediterranean-deep mb-4 sm:mb-6 leading-tight">
              {feature.title}
            </h2>

            <p className="text-mediterranean/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              {feature.description}
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onBookClick}
                className="btn-reserve flex items-center gap-2"
              >
                Book Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="btn-outline flex items-center gap-2 text-sm"
              >
                <MapPin className="w-4 h-4" />
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}
      {index < 3 && (
        <div className="mx-auto max-w-md mt-16 sm:mt-20 lg:mt-24">
          <div className="section-divider" />
        </div>
      )}
    </motion.section>
  );
}
