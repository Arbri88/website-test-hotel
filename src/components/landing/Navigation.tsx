'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Sun, Menu, X } from 'lucide-react';

interface NavigationProps {
  onBookClick: () => void;
}

export default function Navigation({ onBookClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#suites', label: 'Suites' },
    { href: '#spa', label: 'Spa' },
    { href: '#cucina', label: 'Dining' },
    { href: '#sentiero', label: 'Experiences' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'nav-scrolled' : 'bg-gradient-to-b from-black/40 to-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between" style={{ minHeight: '72px' }}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 py-2" aria-label="Terrazza di Sole home">
            <Sun className="w-6 h-6" style={{ color: '#E8A435' }} />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-lg tracking-widest uppercase" style={{ color: '#FAF3E0' }}>
                Terrazza
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#E8A435', opacity: 0.8 }}>
                di Sole
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wider uppercase transition-colors relative group py-2"
                style={{ color: '#FAF3E0', opacity: 0.9 }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: '#E8A435' }}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/auth/login"
              className="hidden sm:block text-sm tracking-wider uppercase transition-colors"
              style={{ color: '#FAF3E0', opacity: 0.9 }}
            >
              Sign in
            </Link>
            <button
              onClick={onBookClick}
              className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
              style={{ 
                backgroundColor: '#C75B39', 
                color: '#FAF3E0',
                minHeight: '44px'
              }}
            >
              Reserve
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#FAF3E0', minHeight: '44px', minWidth: '44px' }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t"
            style={{ backgroundColor: 'rgba(13, 59, 102, 0.95)', borderColor: 'rgba(232, 164, 53, 0.2)' }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base tracking-wider uppercase py-3"
                  style={{ color: '#FAF3E0' }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-base tracking-wider uppercase py-3"
                style={{ color: '#E8A435' }}
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}