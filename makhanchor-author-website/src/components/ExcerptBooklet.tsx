/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, ChevronLeft, ChevronRight, Volume2, VolumeX, Eye } from 'lucide-react';

interface ExcerptPage {
  title: string;
  type: 'poem' | 'prose' | 'cover' | 'back';
  content: string[];
  number?: number;
  date?: string;
  category?: string;
}

export default function ExcerptBooklet() {
  const [currentPage, setCurrentPage] = useState(0); // 0 (Cover), 1 (Pages 1-2), 2 (Pages 3-4), 3 (Back cover)
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');

  // Interactive excerpt booklet pages (6 booklet pages overall)
  const pages: ExcerptPage[] = [
    {
      title: "LOVE, LOSS AND LIFE",
      type: "cover",
      content: [
        "A Curated Selection",
        "of Poetry & Prose",
        "By Yogesh Bhavsar",
        "(Makhanchor)"
      ]
    },
    {
      title: "She Speaks with Her Eyes",
      type: "poem",
      category: "I. UNREQUITED",
      date: "First Sight",
      content: [
        "She speaks with her eyes,",
        "and only I understand the language they hold.",
        "In the depths of those unspoken words,",
        "I find myself craving more—",
        "not just her presence, but the quiet secrets,",
        "the universe only she knows.",
        "",
        "Her gaze is filled with stories of stars",
        "that dare to dance alone,",
        "of whispers that travel through galaxies."
      ],
      number: 1
    },
    {
      title: "The Weakness of Expectations",
      type: "poem",
      category: "II. LOSS",
      date: "Midnight Musings",
      content: [
        "Love can be anything,",
        "but expectations—",
        "they are the weakness that breaks us.",
        "",
        "True love must learn to let go,",
        "to give without conditions,",
        "to accept without needing validation.",
        "",
        "We pour our hearts onto pages,",
        "our words the only witnesses to our anguish."
      ],
      number: 2
    },
    {
      title: "Messy Healing",
      type: "poem",
      category: "III. HEALING",
      date: "The Healing Dawn",
      content: [
        "Healing is messy,",
        "growth is gradual,",
        "and every ending leaves behind a lesson.",
        "",
        "You are not broken,",
        "just beautifully rearranged.",
        "Every crack of light",
        "is simply proof",
        "that you are coming alive again."
      ],
      number: 3
    },
    {
      title: "Becoming Someone",
      type: "prose",
      category: "REFLECTIONS",
      date: "December Rain",
      content: [
        "Love isn't about possessing someone;",
        "it's about becoming someone.",
        "",
        "It's about growing into the kind of person",
        "who can love deeply, even without guarantees.",
        "",
        "True love isn't defined by physical touch",
        "or the need to hold someone close.",
        "It is a beautiful journey",
        "of finding strength after heartbreak."
      ],
      number: 4
    },
    {
      title: "EPILOGUE",
      type: "back",
      content: [
        "Thank you for sampling the verse.",
        "",
        "\"LOVE, LOSS AND LIFE\"",
        "is a sanctuary for the romantic,",
        "the healing, and the midnight dreamers.",
        "",
        "Published in Pune, India.",
        "© Yogesh Bhavsar"
      ]
    }
  ];

  // Synthesize a realistic paper "shhhk" sound with Web Audio API (completely self-contained!)
  const playPageTurnSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const bufferSize = ctx.sampleRate * 0.35; // 350ms duration
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Fill with bandpass-filtered noise resembling paper sliding
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Simple lowpass/bandpass filter simulation
        lastOut = 0.85 * lastOut + 0.15 * white;
        
        // Custom volume decay envelope (fast rise, slow decay for friction)
        const progress = i / bufferSize;
        const env = progress < 0.15 
          ? (progress / 0.15) // quick ramp-up
          : Math.exp(-6 * (progress - 0.15)); // decay
          
        data[i] = lastOut * env * 0.08;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    } catch (err) {
      // Gracefully catch browser interaction blocks
    }
  };

  const handleNextPage = () => {
    if (currentPage >= 3) return; // Last spread reached
    if (isFlipping) return; // Prevent double clicks during active flip
    setFlipDirection('next');
    setIsFlipping(true);
    playPageTurnSound();
    setCurrentPage((prev) => prev + 1);
    
    setTimeout(() => {
      setIsFlipping(false);
    }, 250);
  };

  const handlePrevPage = () => {
    if (currentPage <= 0) return; // First spread reached
    if (isFlipping) return; // Prevent double clicks during active flip
    setFlipDirection('prev');
    setIsFlipping(true);
    playPageTurnSound();
    setCurrentPage((prev) => prev - 1);
    
    setTimeout(() => {
      setIsFlipping(false);
    }, 250);
  };

  return (
    <div id="excerpt-booklet-section" className="max-w-6xl mx-auto px-6 py-12 relative">
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-3 text-left">
          <BookOpen className="w-5 h-5 text-brand-coral" />
          <div>
            <h3 className="font-serif text-2xl font-semibold tracking-tight text-white">
              Instant Novel Excerpt Preview
            </h3>
            <p className="text-white/40 text-xs font-sans">
              Leaf through 4 chosen poems directly from the novel's pages.
            </p>
          </div>
        </div>

        {/* Audio feedback settings */}
        <div className="flex items-center space-x-3.5">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center space-x-1.5 text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            id="toggle-page-sound"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>Sounds On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/30" />
                <span>Muted</span>
              </>
            )}
          </button>
          
          <span className="text-[10px] font-mono uppercase text-brand-coral/60 tracking-widest bg-brand-coral/10 border border-brand-coral/20 px-2.5 py-1 rounded">
            Spread {currentPage + 1} of 4
          </span>
        </div>
      </div>

      {/* Book stage container */}
      <div className="relative mx-auto max-w-4xl bg-brand-obsidian p-1 sm:p-6 rounded-[36px] border border-white/5 shadow-[0_30px_70px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Soft shadow on desk */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />

        {/* The Flat Book Container */}
        <div 
          className="relative grid grid-cols-1 md:grid-cols-2 bg-[#120f22] rounded-2xl overflow-hidden min-h-[380px] sm:min-h-[480px] border border-white/10 shadow-inner"
        >
          {/* Real physical gutter (middle spine of the book) */}
          <div className="absolute top-0 bottom-0 left-1/2 -ml-[2px] w-[4px] bg-gradient-to-r from-black/45 via-black/85 to-black/45 pointer-events-none z-30 hidden md:block" />
          {/* Subtle page creases near gutter */}
          <div className="absolute top-0 bottom-0 left-1/2 -ml-[22px] w-[20px] bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-20 hidden md:block" />
          <div className="absolute top-0 bottom-0 left-1/2 ml-[2px] w-[20px] bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-20 hidden md:block" />

          {/* PAGE SPREAD RENDERER */}
          {currentPage === 0 && (
              <motion.div
                key="spread-0"
                initial={{ opacity: 0, x: flipDirection === 'next' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: flipDirection === 'next' ? -20 : 20 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="col-span-2 grid grid-cols-1 md:grid-cols-2 h-full w-full"
              >
              {/* Left page placeholder (Blank cream or dark interior) */}
              <div className="hidden md:flex bg-[#0b0816] items-center justify-center p-8 border-r border-white/5">
                <div className="text-center space-y-4">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mx-auto text-brand-coral/40">
                    <Eye className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-white/30 font-mono tracking-wider max-w-[180px] leading-relaxed">
                    Click "Next Page" to open the volume.
                  </p>
                </div>
              </div>

              {/* Right Page (The front cover of the book itself) */}
              <div 
                className="bg-gradient-to-b from-[#1c1833] to-[#0a0814] p-8 flex flex-col justify-between text-center relative shadow-2xl h-full border-t border-r border-white/10 group cursor-pointer"
                onClick={handleNextPage}
              >
                {/* 3D highlights on page edges */}
                <div className="absolute top-0 right-0 w-[4px] h-full bg-gradient-to-r from-transparent to-white/10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-t from-transparent to-black/20 pointer-events-none" />
                <div className="absolute top-0 left-0 w-[10px] h-full bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

                <div className="space-y-1 mt-6">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#dfbe6b]">
                    A NOVEL & VERSE
                  </span>
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-[#dfbe6b]/30 to-transparent w-16 mx-auto" />
                </div>

                <div className="space-y-4 py-8">
                  <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[0.08em] uppercase leading-tight bg-gradient-to-r from-[#ffeaa5] via-[#dfbe6b] to-[#fce498] bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                    LOVE , LOSS
                  </h1>
                  <h2 className="font-serif font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-[0.1em] uppercase leading-none bg-gradient-to-r from-[#ffeaa5] via-[#dfbe6b] to-[#fce498] bg-clip-text text-transparent drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                    AND LIFE
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <p className="font-cursive text-xl text-[#fae1e8]/80">
                    Yogesh Bhavsar
                  </p>
                  <p className="text-[9px] font-mono tracking-widest text-[#dfbe6b]/60 uppercase">
                    — MAKHANCHOR —
                  </p>
                  
                  {/* Visual helper badge */}
                  <div className="inline-flex items-center space-x-1.5 bg-brand-coral/20 border border-brand-coral/30 px-3 py-1 rounded-full text-[10px] font-mono uppercase text-white/80 mx-auto mt-2 animate-pulse">
                    <span>Open Booklet</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SPREAD 1: Excerpt Page 1 & 2 */}
          {currentPage === 1 && (
            <motion.div
              key="spread-1"
              initial={{ opacity: 0, x: flipDirection === 'next' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: flipDirection === 'next' ? -20 : 20 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="col-span-2 grid grid-cols-1 md:grid-cols-2 h-full w-full"
            >
              {/* Left Page (The Wet Raincoat Pocket) */}
              <div className="bg-[#faf4e8] text-brand-charcoal p-8 sm:p-12 flex flex-col justify-between relative border-r border-black/5 h-full">
                {/* 3D shadows on interior paper folds */}
                <div className="absolute top-0 bottom-0 right-0 w-[10px] bg-gradient-to-l from-black/10 to-transparent pointer-events-none hidden md:block" />
                
                <div className="space-y-5 text-left">
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[10px] font-mono text-brand-charcoal/50 uppercase tracking-widest">{pages[1].category}</span>
                    <span className="text-[9px] font-mono text-brand-charcoal/40">{pages[1].date}</span>
                  </div>
                  
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-charcoal/95 pt-2">
                    {pages[1].title}
                  </h3>

                  <div className="space-y-2 pt-2 text-sm sm:text-base font-serif italic text-brand-charcoal/80 leading-relaxed tracking-wide antialiased">
                    {pages[1].content.map((line, i) => (
                      <p key={i} className="min-h-[1.2rem]">{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-black/10 pt-3 flex items-center justify-between text-[10px] font-mono text-brand-charcoal/40">
                  <span>YOGESH BHAVSAR</span>
                  <span>PAGE {pages[1].number}</span>
                </div>
              </div>

              {/* Right Page (Midnight Coffee) */}
              <div className="bg-[#faf4e8] text-brand-charcoal p-8 sm:p-12 flex flex-col justify-between relative h-full">
                {/* Left side book shadow */}
                <div className="absolute top-0 bottom-0 left-0 w-[10px] bg-gradient-to-r from-black/10 to-transparent pointer-events-none hidden md:block" />

                <div className="space-y-5 text-left">
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[10px] font-mono text-brand-charcoal/50 uppercase tracking-widest">{pages[2].category}</span>
                    <span className="text-[9px] font-mono text-brand-charcoal/40">{pages[2].date}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-charcoal/95 pt-2">
                    {pages[2].title}
                  </h3>

                  <div className="space-y-2 pt-2 text-sm sm:text-base font-serif italic text-brand-charcoal/80 leading-relaxed tracking-wide antialiased">
                    {pages[2].content.map((line, i) => (
                      <p key={i} className="min-h-[1.2rem]">{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-black/10 pt-3 flex items-center justify-between text-[10px] font-mono text-brand-charcoal/40">
                  <span>LOVE, LOSS AND LIFE</span>
                  <span>PAGE {pages[2].number}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* SPREAD 2: Excerpt Page 3 & 4 */}
          {currentPage === 2 && (
            <motion.div
              key="spread-2"
              initial={{ opacity: 0, x: flipDirection === 'next' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: flipDirection === 'next' ? -20 : 20 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="col-span-2 grid grid-cols-1 md:grid-cols-2 h-full w-full"
            >
              {/* Left Page (Sunrise Over Pebbles) */}
              <div className="bg-[#faf4e8] text-brand-charcoal p-8 sm:p-12 flex flex-col justify-between relative border-r border-black/5 h-full">
                <div className="absolute top-0 bottom-0 right-0 w-[10px] bg-gradient-to-l from-black/10 to-transparent pointer-events-none hidden md:block" />

                <div className="space-y-5 text-left">
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[10px] font-mono text-brand-charcoal/50 uppercase tracking-widest">{pages[3].category}</span>
                    <span className="text-[9px] font-mono text-brand-charcoal/40">{pages[3].date}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-charcoal/95 pt-2">
                    {pages[3].title}
                  </h3>

                  <div className="space-y-2 pt-2 text-sm sm:text-base font-serif italic text-brand-charcoal/80 leading-relaxed tracking-wide antialiased">
                    {pages[3].content.map((line, i) => (
                      <p key={i} className="min-h-[1.2rem]">{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-black/10 pt-3 flex items-center justify-between text-[10px] font-mono text-brand-charcoal/40">
                  <span>YOGESH BHAVSAR</span>
                  <span>PAGE {pages[3].number}</span>
                </div>
              </div>

              {/* Right Page (The Anatomy of a Letter) */}
              <div className="bg-[#faf4e8] text-brand-charcoal p-8 sm:p-12 flex flex-col justify-between relative h-full">
                <div className="absolute top-0 bottom-0 left-0 w-[10px] bg-gradient-to-r from-black/10 to-transparent pointer-events-none hidden md:block" />

                <div className="space-y-5 text-left">
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[10px] font-mono text-brand-charcoal/50 uppercase tracking-widest">{pages[4].category}</span>
                    <span className="text-[9px] font-mono text-brand-charcoal/40">{pages[4].date}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-charcoal/95 pt-2">
                    {pages[4].title}
                  </h3>

                  <div className="space-y-2 pt-2 text-sm sm:text-base font-serif italic text-brand-charcoal/85 leading-relaxed tracking-wide antialiased">
                    {pages[4].content.map((line, i) => (
                      <p key={i} className="min-h-[1.2rem]">{line}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-black/10 pt-3 flex items-center justify-between text-[10px] font-mono text-brand-charcoal/40">
                  <span>LOVE, LOSS AND LIFE</span>
                  <span>PAGE {pages[4].number}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* SPREAD 3: Back cover layout */}
          {currentPage === 3 && (
            <motion.div
              key="spread-3"
              initial={{ opacity: 0, x: flipDirection === 'next' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: flipDirection === 'next' ? -20 : 20 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="col-span-2 grid grid-cols-1 md:grid-cols-2 h-full w-full"
            >
              {/* Left Page (EPILOGUE / Summary page) */}
              <div className="bg-[#faf4e8] text-brand-charcoal p-8 sm:p-12 flex flex-col justify-between relative border-r border-black/5 h-full">
                <div className="absolute top-0 bottom-0 right-0 w-[10px] bg-gradient-to-l from-black/10 to-transparent pointer-events-none hidden md:block" />

                <div className="space-y-5 text-left">
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[10px] font-mono text-brand-charcoal/50 uppercase tracking-widest">EPILOGUE</span>
                    <span className="text-[9px] font-mono text-brand-charcoal/40">The Final Chord</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-charcoal/95 pt-2">
                    A Note From Makhanchor
                  </h3>

                  <div className="space-y-4 pt-2 text-sm sm:text-base font-serif leading-relaxed text-brand-charcoal/85 antialiased">
                    <p className="italic">
                      "I wrote these lines during the quietest hours of the night. I hope they find you in yours, and help you carry whatever weight you are holding close."
                    </p>
                    <p className="font-cursive text-2xl font-bold text-amber-950 pt-4 leading-tight">
                      — Yogesh Bhavsar
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-black/10 pt-3 flex items-center justify-between text-[10px] font-mono text-brand-charcoal/40">
                  <span>LOVE, LOSS AND LIFE</span>
                  <span>END OF EXCERPT</span>
                </div>
              </div>

              {/* Right Page (The physical back cover) */}
              <div className="bg-gradient-to-b from-[#1c1833] to-[#0a0814] p-8 flex flex-col justify-between text-center relative h-full border-t border-r border-white/10">
                <div className="absolute top-0 right-0 w-[4px] h-full bg-gradient-to-r from-transparent to-white/10 pointer-events-none" />
                <div className="absolute top-0 left-0 w-[10px] h-full bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

                <div className="space-y-2 mt-8">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-[#dfbe6b]/70 uppercase block">
                    ABOUT THE AUTHOR
                  </span>
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-[#dfbe6b]/30 to-transparent w-12 mx-auto" />
                </div>

                <div className="space-y-4 py-4 px-4 text-white/70 text-xs font-sans leading-relaxed">
                  <p>
                    Yogesh Bhavsar (Makhanchor) is a contemporary poet and storyteller based in Pune, India. His verses capture the fragile spectrum of human emotion, bridging unrequited devotion, heavy silences, and restorative dawns.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="text-[8.5px] font-mono tracking-widest text-[#dfbe6b]/50 uppercase">
                    ISBN 978-3-16-148410-0
                  </div>
                  <div className="w-24 h-12 bg-white/10 border border-white/15 mx-auto rounded flex items-center justify-center opacity-30 select-none">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-white/50">BARCODE</span>
                  </div>
                  <span className="text-[8.5px] font-mono text-[#ffffff]/30 uppercase block">
                    © 2026 Yogesh Bhavsar
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Page bend active animation element */}
          {isFlipping && (
            <motion.div
              initial={{ rotateY: flipDirection === 'next' ? 0 : -180 }}
              animate={{ rotateY: flipDirection === 'next' ? -180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 left-1/2 w-1/2 bg-[#efe6d4] border-l border-black/10 origin-left z-40 shadow-2xl pointer-events-none hidden md:block"
              style={{
                perspective: 1200,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Shadow gradient inside flip */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/5 pointer-events-none" />
            </motion.div>
          )}
        </div>

        {/* BOOK SPREAD TURN BUTTONS */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-40">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="p-3 rounded-full bg-brand-obsidian/80 backdrop-blur-md border border-white/10 hover:border-brand-coral/40 text-white/80 hover:text-brand-coral transition-all active:scale-90 disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-lg"
            title="Previous Page"
            id="booklet-prev-btn"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-40">
          <button
            onClick={handleNextPage}
            disabled={currentPage === 3}
            className="p-3 rounded-full bg-brand-obsidian/80 backdrop-blur-md border border-white/10 hover:border-brand-coral/40 text-white/80 hover:text-brand-coral transition-all active:scale-90 disabled:opacity-30 disabled:pointer-events-none cursor-pointer shadow-lg"
            title="Next Page"
            id="booklet-next-btn"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Guide text */}
      <div className="text-center mt-6 text-xs text-white/40 font-mono tracking-wider">
        <span>Click the left/right arrow buttons or booklet edge to turn the page.</span>
      </div>
    </div>
  );
}
