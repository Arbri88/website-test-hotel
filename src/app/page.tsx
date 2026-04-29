'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from '@/components/landing/Navigation';
import HeroSection from '@/components/landing/HeroSection';
import FeatureSection from '@/components/landing/FeatureSection';
import BookingModal from '@/components/landing/BookingModal';
import Footer from '@/components/landing/Footer';

const features = [
  {
    id: 'suites',
    title: 'Cliffside Suites',
    subtitle: 'Rooms with private balconies and floor-to-ceiling sea views',
    description: 'Each suite is a sanctuary of hand-painted Vietri ceramic details, linen-draped beds, and terraces that spill into the Mediterranean sky.',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80',
    accent: 'terracotta',
  },
  {
    id: 'spa',
    title: 'Limonaia Spa',
    subtitle: 'Treatments infused with local lemon and olive essences',
    description: 'Nestled in a converted 18th-century lemon house, our spa channels centuries of Mediterranean wellness traditions.',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
    accent: 'leaf-green',
  },
  {
    id: 'cucina',
    title: 'Cucina della Costa',
    subtitle: 'Michelin-adjacent tasting menus from the sea',
    description: 'Hand-caught seafood at dawn, heirloom tomatoes still warm from the sun. Our chef transforms the Amalfi terroir into an experience.',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
    accent: 'lemon-gold',
  },
  {
    id: 'sentiero',
    title: 'Sentiero degli Dei',
    subtitle: 'The legendary Path of the Gods, with gourmet picnics',
    description: 'Walk the trail that connects heaven and earth. Our guides lead you along ancient paths carved into dramatic cliffs.',
    imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1920&q=80',
    accent: 'mediterranean',
  },
];

export default function LandingPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-feature]');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5) {
          setActiveSection(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-linen overflow-hidden">
      <Navigation onBookClick={() => setIsBookingOpen(true)} />
      <HeroSection onBookClick={() => setIsBookingOpen(true)} />
      <section className="relative">
        {features.map((feature, index) => (
          <div key={feature.id} data-feature>
            <FeatureSection feature={feature} index={index} isActive={activeSection === index} onBookClick={() => setIsBookingOpen(true)} />
          </div>
        ))}
      </section>
      <Footer onBookClick={() => setIsBookingOpen(true)} />
      <AnimatePresence>
        {isBookingOpen && <BookingModal onClose={() => setIsBookingOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
