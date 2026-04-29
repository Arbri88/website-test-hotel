'use client';

import { Sun, MapPin, Mail, Phone, Globe, Heart, Camera } from 'lucide-react';

export default function Footer({ onBookClick }: { onBookClick: () => void }) {
  return (
    <footer className="bg-mediterranean-deep text-linen relative overflow-hidden">
      {/* Curved top edge */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-linen" style={{ clipPath: 'ellipse(55% 100% at 50% 0%)' }} />

      <div className="relative z-10 pt-16 sm:pt-20 pb-10 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          {/* Location Card */}
          <div className="bg-mediterranean/30 rounded-2xl p-6 sm:p-8 lg:p-12 border border-mediterranean/40">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl text-linen mb-3 sm:mb-4">Find Us on the Coast</h3>
                <p className="text-linen/70 leading-relaxed mb-6">
                  Perched 150 meters above the Tyrrhenian Sea, between Positano and Praiano.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 text-linen/80">
                    <MapPin className="w-4 h-4 text-lemon-gold shrink-0" />
                    <span className="text-xs sm:text-sm">Via Terrazza 42, 84017 Positano SA</span>
                  </div>
                  <div className="flex items-center gap-2 text-linen/80">
                    <Globe className="w-4 h-4 text-lemon-gold shrink-0" />
                    <span className="text-xs sm:text-sm">40.6280° N, 14.4850° E</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] bg-mediterranean/20 rounded-xl overflow-hidden border-2 border-lemon-gold/30 p-3 sm:p-4">
                <svg viewBox="0 0 400 300" className="w-full h-full" aria-label="Map showing hotel location on Amalfi Coast">
                  <rect x="0" y="150" width="400" height="150" fill="#1A4B7A" opacity="0.6" />
                  <path d="M0,180 Q100,140 150,160 Q200,120 250,150 Q300,100 350,140 L400,130 L400,300 L0,300 Z" fill="#5A8F6E" opacity="0.5" />
                  <path d="M0,180 Q100,140 150,160 Q200,120 250,150 Q300,100 350,140 L400,130" fill="none" stroke="#C75B39" strokeWidth="3" />
                  <circle cx="250" cy="140" r="8" fill="#E8A435" />
                  <text x="250" y="125" textAnchor="middle" fill="#FAF3E0" fontSize="10" fontFamily="serif">Terrazza</text>
                  <circle cx="150" cy="155" r="5" fill="#E8A435" opacity="0.8" />
                  <text x="150" y="172" textAnchor="middle" fill="#FAF3E0" fontSize="8">Positano</text>
                  <circle cx="320" cy="135" r="5" fill="#E8A435" opacity="0.8" />
                  <text x="320" y="125" textAnchor="middle" fill="#FAF3E0" fontSize="8">Praiano</text>
                  <ellipse cx="350" cy="220" rx="30" ry="15" fill="#5A8F6E" opacity="0.4" />
                  <text x="350" y="225" textAnchor="middle" fill="#FAF3E0" fontSize="8" fontStyle="italic">Capri</text>
                  <circle cx="80" cy="175" r="5" fill="#E8A435" opacity="0.8" />
                  <text x="80" y="192" textAnchor="middle" fill="#FAF3E0" fontSize="8">Amalfi</text>
                  <text x="200" y="250" textAnchor="middle" fill="#FAF3E0" fontSize="12" fontStyle="italic" opacity="0.6">Tyrrhenian Sea</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sun className="w-6 h-6 text-lemon-gold" />
                <span className="font-heading text-lg sm:text-xl tracking-widest text-linen">Terrazza di Sole</span>
              </div>
              <p className="text-linen/60 text-sm leading-relaxed mb-6">
                A boutique cliffside hotel where the Amalfi Coast reveals its most intimate secrets.
              </p>
              <div className="flex gap-3">
                <a href="#" className="p-2.5 rounded-full bg-mediterranean/40 hover:bg-lemon-gold/30 transition-colors" aria-label="Instagram">
                  <Camera className="w-5 h-5 text-linen/70" />
                </a>
                <a href="#" className="p-2.5 rounded-full bg-mediterranean/40 hover:bg-lemon-gold/30 transition-colors" aria-label="Email">
                  <Mail className="w-5 h-5 text-linen/70" />
                </a>
                <a href="#" className="p-2.5 rounded-full bg-mediterranean/40 hover:bg-lemon-gold/30 transition-colors" aria-label="Phone">
                  <Phone className="w-5 h-5 text-linen/70" />
                </a>
              </div>
            </div>

            {/* Explore */}
            <div>
              <h4 className="font-heading text-base sm:text-lg text-lemon-gold mb-4">Explore</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: 'Cliffside Suites', href: '#suites' },
                  { label: 'Limonaia Spa', href: '#spa' },
                  { label: 'Cucina della Costa', href: '#cucina' },
                  { label: 'Sentiero degli Dei', href: '#sentiero' },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-linen/70 hover:text-lemon-gold transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading text-base sm:text-lg text-lemon-gold mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-linen/70">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-lemon-gold shrink-0" />
                  <span>Via Terrazza 42<br />84017 Positano SA, Italy</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-lemon-gold shrink-0" />
                  <span>+39 089 875 XXX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-lemon-gold shrink-0" />
                  <span>sole@terrazza.it</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-mediterranean/40 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-linen/40 text-xs sm:text-sm">
              &copy; 2026 Terrazza di Sole. All rights reserved.
            </p>
            <button
              onClick={onBookClick}
              className="flex items-center gap-2 text-lemon-gold hover:text-lemon-gold/80 transition-colors text-xs sm:text-sm tracking-wider uppercase"
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
