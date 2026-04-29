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
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-mediterranean/95 backdrop-blur-md shadow-lg py-3' : 'bg-gradient-to-b from-black/40 to-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sun className="w-6 h-6 text-lemon-gold" />
            <div className="flex flex-col">
              <span className="text-linen font-heading text-lg tracking-widest uppercase">Terrazza</span>
              <span className="text-lemon-gold/80 text-[10px] tracking-[0.3em] uppercase -mt-1">di Sole</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-linen/90 text-sm tracking-wider uppercase hover:text-lemon-gold transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-lemon-gold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <div className="hidden sm:flex items-center gap-3">
                <Link href="/profile" className="text-linen/90 text-sm tracking-wider uppercase hover:text-lemon-gold transition-colors">Profile</Link>
                {session.user?.role === 'admin' && (
                  <Link href="/admin" className="text-lemon-gold text-sm tracking-wider uppercase hover:text-amber transition-colors">Admin</Link>
                )}
                <button onClick={() => signOut()} className="text-linen/60 text-sm hover:text-linen transition-colors">Sign out</button>
              </div>
            ) : (
              <Link href="/auth/login" className="hidden sm:block text-linen/90 text-sm tracking-wider uppercase hover:text-lemon-gold transition-colors">Sign in</Link>
            )}
            <button onClick={onBookClick} className="bg-terracotta hover:bg-terracotta/90 text-linen px-6 py-2.5 rounded-full text-sm tracking-wider uppercase transition-all duration-300 hover:scale-105">Reserve</button>
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden text-linen p-2">
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-mediterranean/98 backdrop-blur-lg lg:hidden">
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setIsMobileOpen(false)} className="text-linen font-heading text-2xl tracking-wider hover:text-lemon-gold transition-colors">{l.label}</a>
              ))}
              <div className="flex flex-col items-center gap-4 mt-8">
                {!session && <Link href="/auth/login" onClick={() => setIsMobileOpen(false)} className="text-linen/90 text-lg tracking-wider uppercase hover:text-lemon-gold transition-colors">Sign in</Link>}
                {session && <><Link href="/profile" onClick={() => setIsMobileOpen(false)} className="text-linen text-lg">Profile</Link><button onClick={() => signOut()} className="text-linen/60 text-lg">Sign out</button></>}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
