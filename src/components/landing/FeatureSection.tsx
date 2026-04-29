'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

interface FeatureSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  accent: 'terracotta' | 'leaf-green' | 'lemon-gold' | 'mediterranean';
  reversed?: boolean;
  onBookClick: () => void;
}

const accentColors = {
  terracotta: '#C75B39',
  'leaf-green': '#5A8F6E',
  'lemon-gold': '#E8A435',
  mediterranean: '#1A4B7A',
};

export default function FeatureSection({
  id,
  title,
  subtitle,
  description,
  imageUrl,
  accent,
  reversed = false,
  onBookClick,
}: FeatureSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const accentColor = accentColors[accent];

  return (
    <section id={id} ref={ref} className="relative py-16 sm:py-20 lg:py-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center ${reversed ? 'lg:direction-rtl' : ''}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? 60 : -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ${reversed ? 'lg:order-1' : ''}`}
          >
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div 
              className="absolute top-0 left-0 w-1 h-full"
              style={{ backgroundColor: accentColor }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -60 : 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className={`${reversed ? 'lg:pr-4 xl:pr-8 lg:order-2' : 'lg:pl-4 xl:pl-8'}`}
          >
            {/* Animated underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '60px' } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-0.5 mb-6"
              style={{ backgroundColor: accentColor }}
            />

            <p 
              className="text-sm sm:text-base tracking-[0.3em] uppercase mb-3 font-medium"
              style={{ color: accentColor }}
            >
              {subtitle}
            </p>

            <h2 
              className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-4 sm:mb-6 leading-tight"
              style={{ color: '#0D3B66' }}
            >
              {title}
            </h2>

            <p 
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: '#1A4B7A', opacity: 0.7 }}
            >
              {description}
            </p>

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
                style={{ color: '#1A4B7A' }}
              >
                <MapPin className="w-4 h-4" />
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-md mt-16 sm:mt-20 lg:mt-24">
        <div className="section-divider" />
      </div>
    </section>
  );
}