/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BookOpen, Users, Star, Award, ChevronRight, Sparkles } from 'lucide-react';
import { BOOK_METADATA } from '../data';
import BookCover from './BookCover';

interface HeroProps {
  onExploreBook: () => void;
  onReadBlog: () => void;
}

export default function Hero({ onExploreBook, onReadBlog }: HeroProps) {
  // Stats items with icons
  const stats = [
    { value: BOOK_METADATA.readers, label: 'Readers', icon: Users },
    { value: BOOK_METADATA.instagramFollowers, label: 'Instagram Family', icon: Star },
    { value: BOOK_METADATA.poemsWritten, label: 'Poems Written', icon: Award },
    { value: BOOK_METADATA.booksSold, label: 'Copies Sold', icon: BookOpen },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-b from-[#0a0a0c] via-[#0f1118] to-[#12141c] overflow-hidden pt-28 pb-16 flex flex-col justify-between"
    >
      {/* 1. Starry sky ambient background with custom nebula glows */}
      <div className="absolute inset-0 z-0 opacity-45 pointer-events-none">
        {/* Glowing ambient background light spots */}
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-brand-coral/10 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-[250px] h-[250px] rounded-full bg-blue-900/10 blur-[90px] animate-pulse" style={{ animationDuration: '6s' }} />
        
        {/* Little starry particles */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/15 via-white/5 to-transparent bg-[size:3px_3px] bg-repeat pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full my-auto">
        {/* Left column: Typography and Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8" id="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-coral" />
            <span className="text-xs font-semibold tracking-widest text-white/90 uppercase">
              WORDS THAT FEEL. STORIES THAT HEAL.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] text-white tracking-tight"
          >
            Poetry for the <br />
            <span className="text-brand-coral font-cursive font-bold italic tracking-wide lowercase px-1 bg-gradient-to-r from-brand-coral/30 to-transparent rounded-lg">
              heart
            </span>{' '}
            that <br />
            remembers.
          </motion.h1>

          {/* Heart Divider element -♡- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center space-x-3 w-full max-w-xs"
          >
            <div className="h-[1px] bg-gradient-to-r from-transparent to-brand-coral/50 flex-grow" />
            <span className="font-cursive text-brand-coral text-2xl">♡</span>
            <div className="h-[1px] bg-gradient-to-l from-transparent to-brand-coral/50 flex-grow" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-white/70 max-w-xl font-sans leading-relaxed"
          >
            A collection of romantic poetry and words born from one-sided love, healing, and the hope that lives in every soul.
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            id="hero-actions"
          >
            <button
              onClick={onExploreBook}
              className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-coral to-[#e0694a] text-white px-7 py-4 rounded-full font-medium shadow-[0_10px_25px_-5px_rgba(219,122,96,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(219,122,96,0.6)] hover:bg-brand-coral-hover transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
            >
              <span>Explore the Novel</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onReadBlog}
              className="group flex items-center justify-center space-x-2 border border-white/20 hover:border-brand-coral bg-white/5 hover:bg-white/10 text-white/90 hover:text-white px-7 py-4 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
            >
              <span>Read My Blog</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right column: 3D Book Cover & Ambient Glow & Candle Vibe */}
        <div className="lg:col-span-5 flex flex-col items-center relative py-12" id="hero-book-showcase">
          {/* Ambient Glowing Backplate */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-brand-coral/20 blur-[120px] pointer-events-none z-0" />

          {/* Realistic 3D Hoverable Book Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="relative perspective-[1500px] cursor-pointer group z-10 select-none pb-8"
          >
            {/* Book Body: Outer container with subtle rotation on hover */}
            <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[440px] transform-style-3d duration-700 ease-out group-hover:rotate-y-15 group-hover:scale-105">
              
              {/* Back cover (shadow layer) */}
              <div className="absolute inset-0 bg-black/40 rounded-r-lg blur-md translate-x-3 translate-y-3 pointer-events-none" />

              {/* Spine edge of the book (Spine thickness) */}
              <div className="absolute top-0 bottom-0 -left-[14px] w-[14px] bg-gradient-to-r from-brand-charcoal via-[#1d1f24] to-brand-obsidian origin-right rotate-y-90 shadow-inner border-y border-white/5 flex flex-col justify-between py-8 items-center text-[8px] font-mono tracking-widest text-white/40 select-none uppercase">
                <span className="rotate-90 origin-center whitespace-nowrap">YOGESH BHAVSAR</span>
                <span className="rotate-90 origin-center whitespace-nowrap">LOVE, LOSS AND LIFE</span>
              </div>

              {/* Front Book Cover */}
              <BookCover className="absolute inset-0 shadow-[5px_5px_30px_rgba(0,0,0,0.8)]" />
            </div>
          </motion.div>

          {/* Quote near the book bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 text-center max-w-sm px-6 relative"
          >
            {/* Elegant text */}
            <p className="font-serif italic text-white/80 text-base leading-relaxed tracking-wide">
              “To truly love someone, you must first love yourself—completely, deeply, and without reservations.”
            </p>
            {/* Signature */}
            <span className="block font-cursive text-brand-coral text-lg mt-2">
              — Yogesh Bhavsar
            </span>
          </motion.div>
        </div>
      </div>

      {/* 2. Horizontal statistic counter ribbon */}
      <div className="max-w-7xl mx-auto px-6 w-full mt-12 relative z-20">
        <div className="bg-brand-charcoal/80 backdrop-blur-md border border-white/10 rounded-2xl py-6 px-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                className="flex items-center space-x-4 justify-center py-4 md:py-0"
                id={`stat-item-${idx}`}
              >
                <div className="p-3 bg-brand-coral/10 rounded-xl text-brand-coral">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
