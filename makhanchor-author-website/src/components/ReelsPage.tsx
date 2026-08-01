/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Eye, Heart, X, Sparkles, Film, Phone, Volume2 } from 'lucide-react';
import { REELS } from '../data';
import { Reel } from '../types';

interface ReelsPageProps {
  isVisible: boolean;
  onClose?: () => void;
}

export default function ReelsPage({ isVisible, onClose }: ReelsPageProps) {
  const [activeReel, setActiveReel] = useState<Reel | null>(null);

  if (!isVisible) return null;

  return (
    <section
      id="reels"
      className="bg-brand-obsidian py-24 text-white relative overflow-hidden border-b border-white/5"
    >
      {/* Background Star Ambient Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-brand-coral/10 blur-[110px]" />
        <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-blue-950/10 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16" id="reels-header">
          <div className="text-left space-y-2">
            <div className="flex items-center space-x-2 text-brand-coral">
              <Film className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">
                POETIC VERTICAL EXPERIENCES
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
              Spoken Word Reels
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl font-sans leading-relaxed">
              Watch brief, cinematic recitations and quiet midnight thoughts adapted for mobile screens. Click any card to load the video.
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="mt-6 md:mt-0 text-sm font-semibold border border-white/10 hover:border-brand-coral bg-white/5 px-6 py-3 rounded-full hover:bg-brand-coral/10 transition-all cursor-pointer"
            >
              Back to Home
            </button>
          )}
        </div>

        {/* 9:16 Vertical Card Grid */}
        <div
          id="reels-grid"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
        >
          {REELS.map((reel) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[9/16] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl border border-white/10 group cursor-pointer"
              onClick={() => setActiveReel(reel)}
            >
              {/* Premium Preview Thumbnail */}
              <img
                src={reel.thumbnailUrl}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-75 group-hover:brightness-90"
                referrerPolicy="no-referrer"
              />

              {/* Ambient Red/Coral Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-brand-coral/10 opacity-70 group-hover:opacity-60 transition-opacity" />

              {/* Stat Indicators top right */}
              <div className="absolute top-4 right-4 flex flex-col space-y-1 z-10 text-right">
                <span className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/90">
                  <Eye className="w-3 h-3 text-brand-coral" />
                  <span>{reel.views}</span>
                </span>
                <span className="flex items-center space-x-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-white/90">
                  <Heart className="w-3 h-3 text-pink-500 fill-current" />
                  <span>{reel.likes}</span>
                </span>
              </div>

              {/* Centered Large Play trigger button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-14 h-14 rounded-full bg-brand-coral text-white flex items-center justify-center shadow-lg group-hover:bg-[#e0694a] transition-colors"
                >
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </motion.div>
              </div>

              {/* Bottom Card Caption */}
              <div className="absolute bottom-0 left-0 w-full p-5 text-left z-10 space-y-2">
                <h3 className="font-serif text-sm sm:text-base text-white/95 font-medium line-clamp-2 leading-snug group-hover:text-brand-coral transition-colors">
                  {reel.title}
                </h3>
                <span className="block text-[10px] text-brand-coral font-bold tracking-widest uppercase">
                  @scripted_by_yogesh
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lazy-Loaded High-Performance Video Player Overlay (Smartphone Frame Vibe) */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            id="video-player-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button floating outer top right */}
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-brand-coral text-white transition-all cursor-pointer z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Simulated Smartphone Frame to present the 9:16 vertical reel perfectly */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-[340px] aspect-[9/16] bg-brand-charcoal rounded-[45px] border-4 border-[#2b2d35] p-3 shadow-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Smartphone Notch/Camera Detail */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#2b2d35] rounded-full z-40 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-black/80 mr-2 border border-blue-900/40" />
                <div className="w-12 h-1 bg-black/50 rounded-full" />
              </div>

              {/* Real Lazy Loaded Video Player inside Frame */}
              <div className="w-full h-full rounded-[36px] overflow-hidden bg-black relative z-10">
                {/* 
                  Lazy loading YouTube player or an elegant aesthetic loop representation 
                  We use process.env.NODE_ENV or just general lazy iframe trigger
                */}
                <iframe
                  id="reel-player-iframe"
                  src={activeReel.videoUrl}
                  title={activeReel.title}
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Ambient Audio Alert bottom */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center space-x-2 text-[10px] text-white/80 pointer-events-none shadow-md">
                <Volume2 className="w-3.5 h-3.5 text-brand-coral" />
                <span>Audio is enabled</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}