'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function HeroSection({ onBookClick }: { onBookClick: () => void }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const videoUrl =
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-coastal-city-with-buildings-4659-large.mp4';

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover animate-ken-burns"
          style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-mediterranean-deep/60 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lemon-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 font-light"
        >
          Amalfi Coast, Italy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
          className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-linen leading-[0.95] tracking-wide mb-6 text-shadow-lg"
        >
          Terrazza
          <br />
          <span className="text-lemon-gold/90">di Sole</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-linen/90 text-lg sm:text-xl md:text-2xl font-light tracking-wider italic mb-10 sm:mb-12 text-shadow"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          La dolce vita, elevated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <button
            onClick={onBookClick}
            className="btn-reserve text-base sm:text-lg px-10 py-4 tracking-[0.2em] shadow-xl"
          >
            Reserve Your Terrazza
          </button>
        </motion.div>
      </div>

      {/* Video Controls (bottom-right) */}
      <div className="absolute bottom-6 sm:bottom-8 right-4 sm:right-8 z-10 flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-linen/80 hover:text-linen transition-colors"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
          style={{ minHeight: 44, minWidth: 44 }}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-linen/80 hover:text-linen transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          style={{ minHeight: 44, minWidth: 44 }}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-linen/60 text-[10px] sm:text-xs tracking-widest uppercase">Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-linen/60 to-transparent"
        />
      </motion.div>
    </div>
  );
}
