'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navigation({ onBookClick }: { onBookClick: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const h = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const links = [
    { label: 'Suites', href: '#suites' },
    { label: 'Spa', href: '#spa' },
    { label: 'Dining', href: '#cucina' },
    { label: 'Experiences', href: '#sentiero' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-mediterranean-deep/95 backdrop-blur-md shadow-lg'
            : 'bg-gradient-to-b from-black/40 to-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between" style={{ minHeight: isScrolled ? '56px' : '72px' }}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 py-2" aria-label="Terrazza di Sole home">
              <Sun className="w-6 h-6 text-lemon-gold" />
              <div className="flex flex-col leading-none">
                <span className="text-linen font-heading text-lg tracking-widest uppercase">Terrazza</span>
                <span className="text-lemon-gold/80 text-[10px] tracking-[0.3em] uppercase">di Sole</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-linen/90 text-sm tracking-wider uppercase hover:text-lemon-gold transition-colors relative group py-2"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-lemon-gold group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {session ? (
                <div className="hidden sm:flex items-center gap-3">
                  <Link href="/profile" className="text-linen/90 text-sm tracking-wider uppercase hover:text-lemon-gold transition-colors">
                    Profile
                  </Link>
                  {session.user?.role === 'admin' && (
                    <Link href="/admin" className="text-lemon-gold text-sm tracking-wider uppercase hover:text-lemon-gold/80 transition-colors">
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="text-linen/60 text-sm hover:text-linen transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="hidden sm:block text-linen/90 text-sm tracking-wider uppercase hover:text-lemon-gold transition-colors"
                >
                  Sign in
                </Link>
              )}
              <button
                onClick={onBookClick}
                className="bg-terracotta hover:bg-terracotta/90 text-linen px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{ minHeight: 44 }}
              >
                Reserve
              </button>
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden text-linen p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Open menu"
                style={{ minHeight: 44, minWidth: 44 }}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-mediterranean-deep/98 backdrop-blur-lg lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Close button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="text-linen p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close menu"
                  style={{ minHeight: 44, minWidth: 44 }}
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, staggerChildren: 0.08 }}
                className="flex flex-col items-center justify-center flex-1 gap-6 px-8"
              >
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-linen font-heading text-3xl tracking-wider hover:text-lemon-gold transition-colors py-3"
                  >
                    {l.label}
                  </motion.a>
                ))}

                <div className="mt-8 flex flex-col items-center gap-4 pt-8 border-t border-linen/20 w-full">
                  {!session ? (
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMobileOpen(false)}
                      className="text-linen/90 text-lg tracking-wider uppercase hover:text-lemon-gold transition-colors py-2"
                    >
                      Sign in
                    </Link>
                  ) : (
                    <>
                      <Link href="/profile" onClick={() => setIsMobileOpen(false)} className="text-linen text-lg py-2">
                        Profile
                      </Link>
                      <button onClick={() => signOut()} className="text-linen/60 text-lg py-2">
                        Sign out
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => { setIsMobileOpen(false); onBookClick(); }}
                    className="bg-terracotta text-linen px-10 py-3.5 rounded-full text-sm tracking-wider uppercase mt-2"
                    style={{ minHeight: 48 }}
                  >
                    Reserve Now
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
