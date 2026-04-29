'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sun, MapPin, Phone, Mail, Camera, Heart } from 'lucide-react';

interface FooterProps {
  onBookClick: () => void;
}

export default function Footer({ onBookClick }: FooterProps) {
  const navLinks = [
    { href: '#suites', label: 'Cliffside Suites' },
    { href: '#spa', label: 'Limonaia Spa' },
    { href: '#cucina', label: 'Cucina della Costa' },
    { href: '#sentiero', label: 'Sentiero degli Dei' },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#0D3B66', color: '#FAF3E0' }}>
      {/* Curved top */}
      <div 
        className="absolute top-0 left-0 right-0 h-16 sm:h-20"
        style={{ 
          backgroundColor: '#FAF3E0',
          clipPath: 'ellipse(55% 100% at 50% 0%)'
        }}
      />

      <div className="relative z-10 pt-16 sm:pt-20 pb-10 sm:pb-12">
        {/* Location Card */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl p-6 sm:p-8 lg:p-12"
            style={{ 
              backgroundColor: 'rgba(26, 75, 122, 0.3)', 
              border: '1px solid rgba(26, 75, 122, 0.4)'
            }}
          >
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl mb-3 sm:mb-4" style={{ color: '#FAF3E0' }}>
                  Find Us on the Coast
                </h3>
                <p className="leading-relaxed mb-6" style={{ color: '#FAF3E0', opacity: 0.7 }}>
                  Perched 150 meters above the Tyrrhenian Sea, between Positano and Praiano.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <div className="flex items-center gap-2" style={{ color: '#FAF3E0', opacity: 0.8 }}>
                    <MapPin className="w-4 h-4 shrink-0" style={{ color: '#E8A435' }} />
                    <span className="text-xs sm:text-sm">Via Terrazza 42, 84017 Positano SA</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#FAF3E0', opacity: 0.8 }}>
                    <span className="text-xs sm:text-sm">40.6280° N, 14.4850° E</span>
                  </div>
                </div>
              </div>

              {/* Mini Map */}
              <div 
                className="relative aspect-[4/3] rounded-xl overflow-hidden p-3 sm:p-4"
                style={{ 
                  backgroundColor: 'rgba(26, 75, 122, 0.2)', 
                  border: '2px solid rgba(232, 164, 53, 0.3)'
                }}
              >
                <svg viewBox="0 0 400 300" className="w-full h-full" aria-label="Map showing hotel location">
                  <rect x="0" y="150" width="400" height="150" fill="#1A4B7A" opacity="0.6" />
                  <path d="M0,180 Q100,140 150,160 Q200,120 250,150 Q300,100 350,140 L400,130 L400,300 L0,300 Z" fill="#5A8F6E" opacity="0.5" />
                  <path d="M0,180 Q100,140 150,160 Q200,120 250,150 Q300,100 350,140 L400,130" fill="none" stroke="#C75B39" strokeWidth="3" />
                  <circle cx="250" cy="140" r="8" fill="#E8A435" />
                  <text x="250" y="125" textAnchor="middle" fill="#FAF3E0" fontSize="10" fontFamily="serif">Terrazza</text>
                  <circle cx="150" cy="155" r="5" fill="#E8A435" opacity="0.8" />
                  <text x="150" y="172" textAnchor="middle" fill="#FAF3E0" fontSize="8">Positano</text>
                  <text x="200" y="250" textAnchor="middle" fill="#FAF3E0" fontSize="12" fontStyle="italic" opacity="0.6">Tyrrhenian Sea</text>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Footer */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-6 h-6" style={{ color: '#E8A435' }} />
                <span className="font-heading text-lg sm:text-xl tracking-widest">Terrazza di Sole</span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#FAF3E0', opacity: 0.6 }}>
                A boutique cliffside hotel where the Amalfi Coast reveals its most intimate secrets.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-heading text-base sm:text-lg mb-4" style={{ color: '#E8A435' }}>
                Explore
              </h4>
              <ul className="space-y-3 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="transition-colors hover:opacity-100"
                      style={{ color: '#FAF3E0', opacity: 0.7 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-base sm:text-lg mb-4" style={{ color: '#E8A435' }}>
                Contact
              </h4>
              <ul className="space-y-3 text-sm" style={{ color: '#FAF3E0', opacity: 0.7 }}>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#E8A435' }} />
                  <span>Via Terrazza 42<br/>84017 Positano SA, Italy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" style={{ color: '#E8A435' }} />
                  <span>+39 089 875 XXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" style={{ color: '#E8A435' }} />
                  <span>sole@terrazza.it</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div 
            className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderColor: 'rgba(26, 75, 122, 0.4)', borderTopWidth: '1px' }}
          >
            <p className="text-xs sm:text-sm" style={{ color: '#FAF3E0', opacity: 0.4 }}>
              © 2026 Terrazza di Sole. All rights reserved.
            </p>
            <button 
              onClick={onBookClick}
              className="flex items-center gap-2 text-xs sm:text-sm tracking-wider uppercase transition-colors"
              style={{ color: '#E8A435' }}
            >
              <Heart className="w-4 h-4" />
              Reserve Your Escape
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}