'use client';

import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection({ onBookClick }: { onBookClick: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-coastal-city-with-buildings-4659-large.mp4';

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay muted={isMuted} loop playsInline className="w-full h-full object-cover ken-burns" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-mediterranean-deep/60 via-transparent to-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lemon-gold text-sm sm:text-base tracking-[0.4em] uppercase mb-4 font-light">Amalfi Coast, Italy</motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-linen leading-none tracking-wide mb-6" style={{ textShadow: '0 4px 30px rgba(232, 164, 53, 0.3)' }}>
          Terrazza<br /><span className="text-lemon-gold/90">di Sole</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-linen/90 text-lg sm:text-xl md:text-2xl font-light tracking-wider italic mb-12" style={{ fontFamily: 'var(--font-playfair), serif' }}>La dolce vita, elevated.</motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
          <button onClick={onBookClick} className="cta-button bg-terracotta hover:bg-terracotta/90 text-linen px-10 py-4 rounded-full text-base sm:text-lg tracking-[0.2em] uppercase font-medium">Reserve Your Terrazza</button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-3">
        <button onClick={() => setIsPlaying(!isPlaying)} className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-linen/80 hover:text-linen transition-colors" aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button onClick={() => setIsMuted(!isMuted)} className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-linen/80 hover:text-linen transition-colors" aria-label={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-linen/60 text-xs tracking-widest uppercase">Discover</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-linen/60 to-transparent" />
      </motion.div>
    </div>
  );
}
