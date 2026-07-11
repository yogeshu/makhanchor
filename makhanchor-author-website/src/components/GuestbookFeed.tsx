/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, MessageSquare, Sparkles, RefreshCw } from 'lucide-react';

interface GuestbookNote {
  name: string;
  message: string;
  sentAt: string;
}

export default function GuestbookFeed() {
  const [notes, setNotes] = useState<GuestbookNote[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Core fallback starter notes in case server-side data is unavailable
  const starterNotes: GuestbookNote[] = [
    {
      name: "Ananya S.",
      message: "The poem about the wet raincoat pocket made me weep. It perfectly captures how we carry unrequited love like a secret weight, hoping it never dries.",
      sentAt: "2026-07-08T22:15:00.000Z"
    },
    {
      name: "Kabir",
      message: "Makhanchor's prose reads like a slow, bittersweet song. 'Loss is a silent companion' is a phrase that will live in my notebook forever.",
      sentAt: "2026-07-09T01:40:00.000Z"
    },
    {
      name: "Meera Nair",
      message: "Just finished reading the three-page excerpt. The transition from grieving to finding sunrise on pebbles is breathtaking. Ordered my physical copy immediately!",
      sentAt: "2026-07-09T18:05:00.000Z"
    },
    {
      name: "Aarav",
      message: "To love, to lose, and to live again... Yogesh has bottled the exact aroma of midnight thoughts and unread letters in this gorgeous novel.",
      sentAt: "2026-07-10T04:12:00.000Z"
    }
  ];

  // Load offline saved letters from localStorage
  const getOfflineLetters = (): GuestbookNote[] => {
    try {
      const stored = localStorage.getItem('makhanchor_offline_letters');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to parse offline letters:', e);
    }
    return [];
  };

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/guestbook');
      if (response.ok) {
        const data = await response.json();
        // Even if successful, let's merge with any local offline-first user-created letters
        const localLetters = getOfflineLetters();
        const merged = [...localLetters, ...data];
        // Deduplicate by message just in case
        const unique = merged.filter((item, index, self) =>
          index === self.findIndex((t) => t.message === item.message)
        );
        setNotes(unique.length > 0 ? unique : starterNotes);
      } else {
        throw new Error('Server returned non-ok status');
      }
    } catch (err) {
      console.info('Using local offline-first guestbook fallback (Hostinger/Serverless mode)');
      const localLetters = getOfflineLetters();
      setNotes([...localLetters, ...starterNotes]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();

    const handleLocalUpdate = () => {
      fetchNotes();
      setActiveIndex(0); // Show the newest note at index 0 immediately
    };

    window.addEventListener('makhanchor-letter-sent', handleLocalUpdate);
    return () => {
      window.removeEventListener('makhanchor-letter-sent', handleLocalUpdate);
    };
  }, []);

  const handleNext = () => {
    if (notes.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % notes.length);
  };

  const handlePrev = () => {
    if (notes.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + notes.length) % notes.length);
  };

  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch (e) {
      return 'Midnight Hour';
    }
  };

  // Get a list of 3 notes to show in mobile-optimized stacks or side-by-side desktop view
  const visibleNotes = notes.length > 0 
    ? [
        notes[activeIndex],
        notes[(activeIndex + 1) % notes.length],
        notes[(activeIndex + 2) % notes.length]
      ]
    : [];

  return (
    <div id="midnight-notes-guestbook" className="w-full bg-[#050308] border-y border-white/5 py-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-brand-coral/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#dfbe6b]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 relative z-10">
          <div className="inline-flex items-center space-x-2 bg-brand-coral/10 border border-brand-coral/20 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest text-brand-coral">
            <MessageSquare className="w-3.5 h-3.5 mr-1" />
            <span>Midnight Letterbox Submissions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
            Midnight Notes & Reflections
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto font-sans">
            A live, anonymous feed of heartfelt letters, unrequited thoughts, and beautiful memories other readers have slipped into the author's mailbox.
          </p>
          <button
            onClick={fetchNotes}
            className="inline-flex items-center space-x-1.5 text-xs text-brand-coral hover:text-brand-coral-hover transition-colors mt-2 cursor-pointer"
            title="Refresh guestbook notes"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Retrieving letters...' : 'Refresh letters'}</span>
          </button>
        </div>

        {/* Notes Carousel Content */}
        {isLoading && notes.length === 0 ? (
          <div className="h-[280px] flex items-center justify-center">
            <div className="text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-brand-coral animate-spin mx-auto" />
              <p className="text-xs font-mono text-white/40">Gathering unread letters from the chest...</p>
            </div>
          </div>
        ) : notes.length === 0 ? (
          <div className="h-[280px] flex items-center justify-center">
            <p className="text-sm font-mono text-white/40">The letterbox is currently quiet. Leave a note below!</p>
          </div>
        ) : (
          <div className="relative z-10">
            {/* Desktop: 3-Column deckled-paper grid */}
            <div className="hidden md:grid grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto px-4">
              {visibleNotes.map((note, idx) => {
                // Generate stable pseudorandom design values (rotations, margins) based on note name
                const charSum = note.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                const rotation = (charSum % 6) - 3; // -3deg to +3deg
                const stainX = (charSum * 7) % 60 + 20; // 20% to 80%
                const stainY = (charSum * 13) % 40 + 20; // 20% to 60%

                return (
                  <motion.div
                    key={`${note.name}-${activeIndex}-${idx}`}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.12 }}
                    style={{ rotate: `${rotation}deg` }}
                    className="relative bg-gradient-to-br from-[#faf4e8] to-[#eedfcc] text-brand-charcoal px-7 py-8 rounded-md shadow-[0_15px_30px_rgba(0,0,0,0.45)] border-l-[3px] border-amber-800/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Retro coffee ring stain or shadow in background */}
                    <div className="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none" />
                    <div 
                      className="absolute rounded-full border-[1.5px] border-amber-900/10 pointer-events-none opacity-[0.06]"
                      style={{
                        width: '80px',
                        height: '75px',
                        left: `${stainX}%`,
                        top: `${stainY}%`,
                        transform: 'rotate(15deg)'
                      }}
                    />
                    
                    {/* Deckled ripped paper top and bottom visual borders */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-b from-black/5 to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full h-[5px] bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />

                    {/* Content */}
                    <div className="space-y-4">
                      <Quote className="w-8 h-8 text-amber-900/15 group-hover:text-brand-coral/20 transition-colors" />
                      <p className="font-serif italic text-base leading-relaxed text-brand-charcoal/90 antialiased tracking-wide font-medium relative z-10">
                        "{note.message}"
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-amber-900/10 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-cursive text-lg font-bold text-amber-950 block leading-tight">
                          — {note.name}
                        </span>
                        <span className="text-[10px] font-mono tracking-widest text-amber-900/50 uppercase block">
                          Reader
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-900/40">
                        {formatDate(note.sentAt)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile: Single deckled-paper view with swipe/navigation indicators */}
            <div className="md:hidden max-w-sm mx-auto px-4">
              <AnimatePresence mode="wait">
                {notes[activeIndex] && (
                  <motion.div
                    key={`mobile-note-${activeIndex}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-gradient-to-br from-[#faf4e8] to-[#eedfcc] text-brand-charcoal px-6 py-8 rounded-md shadow-[0_15px_30px_rgba(0,0,0,0.45)] border-l-[3px] border-amber-800/10 flex flex-col justify-between h-[280px] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-paper-texture opacity-20 pointer-events-none" />
                    <div className="space-y-3">
                      <Quote className="w-7 h-7 text-amber-900/15" />
                      <p className="font-serif italic text-sm leading-relaxed text-brand-charcoal/90 antialiased tracking-wide line-clamp-6 font-medium">
                        "{notes[activeIndex].message}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-amber-900/10 flex items-end justify-between">
                      <div>
                        <span className="font-cursive text-base font-bold text-amber-950 block">
                          — {notes[activeIndex].name}
                        </span>
                        <span className="text-[9px] font-mono tracking-widest text-amber-900/40 uppercase block">
                          Reader Note
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-amber-900/40">
                        {formatDate(notes[activeIndex].sentAt)}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center space-x-6 mt-12">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all bg-white/5 active:scale-95 cursor-pointer"
                title="Previous Note"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-1.5">
                {notes.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex ? 'w-6 bg-brand-coral' : 'w-1.5 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-full border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all bg-white/5 active:scale-95 cursor-pointer"
                title="Next Note"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
