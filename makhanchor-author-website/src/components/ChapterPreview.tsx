/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, ChevronRight, ShoppingBag, Eye, Volume2, VolumeX, Sparkles, Sliders, Type, HelpCircle } from 'lucide-react';
import { BOOK_METADATA } from '../data';

interface ChapterPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChapterPreview({ isOpen, onClose }: ChapterPreviewProps) {
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [theme, setTheme] = useState<'parchment' | 'midnight' | 'paper'>('parchment');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Play a soft paper rustling or page turn sound using native Web Audio synthesizer
  const playPaperSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const bufferSize = ctx.sampleRate * 0.4; // 400ms duration
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Simulating friction: light filtering and slow decaying envelope
        lastOut = 0.82 * lastOut + 0.18 * white;
        
        const progress = i / bufferSize;
        const env = progress < 0.1
          ? (progress / 0.1)
          : Math.exp(-5.5 * (progress - 0.1));
          
        data[i] = lastOut * env * 0.06;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start();
    } catch (e) {}
  };

  // Prevent background scrolling when first chapter modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      playPaperSound();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const fontClasses = {
    sm: 'text-sm sm:text-base leading-relaxed',
    md: 'text-base sm:text-lg leading-relaxed sm:leading-loose',
    lg: 'text-lg sm:text-xl leading-relaxed sm:leading-loose',
    xl: 'text-xl sm:text-2xl leading-loose',
  };

  const themeClasses = {
    parchment: 'bg-[#faf4e8] text-[#2c1d11] selection:bg-amber-800/20',
    midnight: 'bg-[#0a0712] text-[#e2dcf0] selection:bg-brand-coral/30',
    paper: 'bg-white text-gray-900 selection:bg-brand-coral/10',
  };

  // Chapter 1 content: Realistic beautifully crafted pages from the first chapter of Love, Loss and Life
  const paragraphs = [
    {
      type: 'chapter-title',
      text: `Chapter One`
    },
    {
      type: 'chapter-heading',
      text: `TO KNOW LOVE: ECHOES OF A SILENT VOLCANO`
    },
    {
      type: 'narrative',
      text: `The thing about love is that everyone believes it’s about themselves and their partner. Yet, when we dive into books, poems, and the countless narrations of love stories, one thing remains consistent—a feeling so profound that it separates love from fleeting emotions like infatuation or the poetic Sahar in Urdu. No matter how many books you read, love cannot truly be understood through words alone. Real love is lived, felt, and endured. That’s why this chapter is not just about reading—it’s about experiencing what love does to a soul.`
    },
    {
      type: 'narrative',
      text: `Life before love is like a dormant volcano. Everything seems to be in place, yet something essential is missing. You live each moment, but it passes through your fingers like sand. You attend school, learn science, and grow into adulthood, but no one prepares you for how love will strike—not your body, but your heart—with the force of a lightning bolt.`
    },
    {
      type: 'narrative',
      text: `In college, life feels like a series of fleeting moments: the laughter of friends, the pranks, the endless assignments, and the obsession with movies, shows, and maybe anime, if you’re wired like me. You see couples around you and secretly hope for the same. You dream of the One—someone who will fill the emptiness you’ve carried and choose you repeatedly.`
    },
    {
      type: 'narrative',
      text: `Friendship offers company, but often, betrayal leaves scars. Family love is divine, yet it never quite quenches that desire for something more profound – a connection that defies explanation, a bond that feels destined.`
    },
    {
      type: 'narrative',
      text: `You know the concept of this love, but you’ve never dared to imagine it honestly. You’ve only read about it, watched it unfold on screens, or glimpsed it in stolen kisses in a movie. Then, one day, something changes as you walk across the empty campus.`
    },
    {
      type: 'narrative',
      text: `You sit with a book or skim another article about love—either glorifying it or mocking it. But that’s when something remarkable happens: you see her (or) him—sitting beneath a large tree, laughing with friends. Then, as if the universe conspired for this moment, they turn and look at you. And that’s it—a fleeting glance. Yet, your heart, once steady, is now an unsteady drum.`
    },
    {
      type: 'narrative',
      text: `All the biology you’ve learned about the human body instantly dissolves. You’re no longer the person you were a moment ago. The days that follow are no longer ordinary. Your college campus transforms into a stage, and you are the centre of every act. You linger in places where you know you might see them again.`
    },
    {
      type: 'narrative',
      text: `The most straightforward smile on their face feels like sunshine, and suddenly, life feels brighter. You replay memories of that glance. You analyse every action and every rumour you hear about them, weaving their essence into the fabric of your days. You try to bring them into your conversations—subtly, of course, because openly confessing feels like baring your soul to a storm.`
    },
    {
      type: 'narrative',
      text: `To outsiders, it’s easy to say, ‘Just talk to them’. But they don’t understand. You can’t even look into their eyes without your entire world tilting off its axis. This is where love begins—not with grand gestures or poetic confessions, but with a quiet longing. A longing so gentle yet profound, it etches itself into your heart. It’s not yet love in its purest form, but it’s something more than a crush. The spark sets your soul alight, a melody only your heart can hear. To know love is to understand this feeling—the ache, the hope, and the beauty of simply wanting someone to be part of your world.`
    },
    {
      type: 'narrative',
      text: `He wrote in his notebook:`
    },
    {
      type: 'poem-block',
      lines: [
        "They told me stories of love, where no battles were ever fought,",
        "But my heart was barren, ruined by summers, or so I thought.",
        "Everyone claimed their love was true, their victory assured,",
        "Yet I doubted—let me explore the bloodless history they endured.",
        "",
        "They spoke of women in tones so unfair, as if her life held no scope beyond her despair.",
        "Still, they said love was essential, the axis of life,",
        "and I, so carefree, dreamed she’d be my wife.",
        "",
        "This all began in a dream, her eyes meeting mine.",
        "The gods were enraged, and the storm clouds aligned.",
        "The world outside was dangerous; the skies filled with dread.",
        "But my heart soared to a place where only love is bred.",
        "",
        "In my dream, knowing her felt like fate’s grand design.",
        "Yet it faded to a whisper, a fictional shrine.",
        "I woke to the sun, coffee in hand, on my balcony’s edge.",
        "It was a dream but profound—I had to honour its pledge.",
        "",
        "At dawn, I ran to the private classes she often attends",
        "to find her laughing softly among her friends.",
        "She glanced at me, puzzled, “Why is this boy here today?”",
        "But who could guess what my heart was trying to convey?",
        "",
        "A feeling stirred, unfamiliar, profound;",
        "once lost in darkness, now in her, my light was found.",
        "Her presence ignited a fire I couldn’t contain.",
        "A yearning so fierce it blurred joy and pain.",
        "",
        "Was it love or a spark destined to fade?",
        "I chased her shadow, drawn to the promise it made.",
        "In her eyes, it was a universe I longed to explore.",
        "A story unfinished—one I craved to know more about."
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4"
          id="chapter-preview-modal"
        >
          {/* Main Container */}
          <motion.div
            initial={{ scale: 0.95, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 200 }}
            className={`w-full h-full sm:h-[92vh] sm:max-w-4xl rounded-none sm:rounded-3xl flex flex-col overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 ${themeClasses[theme]}`}
          >
            {/* Control Bar */}
            <div className={`px-6 py-4 flex items-center justify-between border-b ${
              theme === 'midnight' ? 'border-white/10 bg-[#0e0a1b]' : 'border-black/10 bg-black/5'
            }`}>
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-5 h-5 text-brand-coral" />
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase opacity-60 block">
                    FREE SAMPLE CHAPTER
                  </span>
                  <span className="font-serif text-sm font-semibold tracking-tight">
                    Love, Loss and Life — Chapter 1
                  </span>
                </div>
              </div>

              {/* Reader customization options */}
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* Font size picker */}
                <div className="flex items-center space-x-1 bg-black/10 rounded-lg p-1">
                  <button
                    onClick={() => { setFontSize('sm'); playPaperSound(); }}
                    className={`p-1.5 rounded text-xs transition-all cursor-pointer ${fontSize === 'sm' ? 'bg-brand-coral text-white font-bold' : 'opacity-60 hover:opacity-100'}`}
                    title="Small font"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => { setFontSize('md'); playPaperSound(); }}
                    className={`p-1.5 rounded text-xs transition-all cursor-pointer ${fontSize === 'md' ? 'bg-brand-coral text-white font-bold' : 'opacity-60 hover:opacity-100'}`}
                    title="Medium font"
                  >
                    A
                  </button>
                  <button
                    onClick={() => { setFontSize('lg'); playPaperSound(); }}
                    className={`p-1.5 rounded text-xs transition-all cursor-pointer ${fontSize === 'lg' ? 'bg-brand-coral text-white font-bold' : 'opacity-60 hover:opacity-100'}`}
                    title="Large font"
                  >
                    A+
                  </button>
                </div>

                {/* Theme selector */}
                <div className="flex items-center space-x-1 bg-black/10 rounded-lg p-1">
                  <button
                    onClick={() => { setTheme('parchment'); playPaperSound(); }}
                    className={`w-5 h-5 rounded-full bg-[#fcf5e8] border border-amber-900/20 transition-all cursor-pointer ${theme === 'parchment' ? 'scale-125 ring-2 ring-brand-coral' : ''}`}
                    title="Parchment theme"
                  />
                  <button
                    onClick={() => { setTheme('midnight'); playPaperSound(); }}
                    className={`w-5 h-5 rounded-full bg-[#0d0a1d] border border-white/20 transition-all cursor-pointer ${theme === 'midnight' ? 'scale-125 ring-2 ring-brand-coral' : ''}`}
                    title="Midnight theme"
                  />
                  <button
                    onClick={() => { setTheme('paper'); playPaperSound(); }}
                    className={`w-5 h-5 rounded-full bg-white border border-gray-300 transition-all cursor-pointer ${theme === 'paper' ? 'scale-125 ring-2 ring-brand-coral' : ''}`}
                    title="Clean paper theme"
                  />
                </div>

                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg hover:bg-black/10 transition-colors cursor-pointer opacity-70 hover:opacity-100 text-current"
                  title={soundEnabled ? "Mute paper sounds" : "Unmute paper sounds"}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/10 transition-colors cursor-pointer text-current"
                  id="close-chapter-preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Read Flow Container */}
            <div
              ref={scrollContainerRef}
              className="flex-grow overflow-y-auto px-6 py-12 sm:px-16 sm:py-16 scroll-smooth space-y-8"
              id="chapter-text-container"
            >
              {/* Novel Layout / Page Head */}
              <div className="max-w-2xl mx-auto text-center space-y-10 pb-8 border-b border-current/10">
                <span className="font-mono text-xs tracking-[0.4em] uppercase opacity-50 block">
                  Love, Loss and Life
                </span>
                <span className="font-serif italic text-4xl sm:text-5xl opacity-80 block font-medium">
                  Yogesh Bhavsar
                </span>
                <div className="flex justify-center items-center space-x-3 w-40 mx-auto opacity-30">
                  <div className="h-[1px] bg-current flex-grow" />
                  <span className="text-sm">❦</span>
                  <div className="h-[1px] bg-current flex-grow" />
                </div>
              </div>

              {/* Parsed paragraphs */}
              <div className="max-w-2xl mx-auto space-y-6 text-left">
                {paragraphs.map((p, idx) => {
                  if (p.type === 'chapter-title') {
                    return (
                      <span
                        key={idx}
                        className="block font-mono text-xs uppercase tracking-[0.3em] text-brand-coral font-bold text-center pt-8"
                      >
                        {p.text}
                      </span>
                    );
                  }
                  if (p.type === 'chapter-heading') {
                    return (
                      <h2
                        key={idx}
                        className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-center pb-8 pt-2"
                      >
                        {p.text}
                      </h2>
                    );
                  }
                  if (p.type === 'poem-block' && p.lines) {
                    return (
                      <div
                        key={idx}
                        className={`my-8 py-6 px-8 border-l-[3px] border-brand-coral italic font-serif text-sm sm:text-base leading-relaxed tracking-wide antialiased rounded-r-xl ${
                          theme === 'midnight' ? 'bg-white/5 text-white/90' : 'bg-black/[0.03] text-black/90'
                        }`}
                      >
                        {p.lines.map((line, lineIdx) => (
                          <p key={lineIdx} className="min-h-[1.2rem]">{line}</p>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <p
                      key={idx}
                      className={`font-serif ${fontClasses[fontSize]} text-justify tracking-wide leading-relaxed sm:leading-loose opacity-90 indent-8`}
                    >
                      {p.text}
                    </p>
                  );
                })}
              </div>

              {/* End of Chapter flourish */}
              <div className="max-w-2xl mx-auto text-center pt-10 pb-6 opacity-40">
                <span className="font-serif text-2xl tracking-[0.2em]">❦ ❦ ❦</span>
              </div>

              {/* SPECIAL PERSISTENT CALL TO ACTION BUY BANNER (AS REQUESTED) */}
              <div 
                className={`max-w-2xl mx-auto rounded-2xl p-6 sm:p-8 border relative overflow-hidden text-center space-y-6 shadow-xl ${
                  theme === 'midnight' 
                    ? 'bg-[#150f28] border-brand-coral/20 text-white' 
                    : 'bg-[#fffcf3] border-[#eedfcc] text-[#2c1d11]'
                }`}
                id="chapter-buy-banner"
              >
                {/* Background flare */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-coral/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-2 bg-brand-coral/15 border border-brand-coral/30 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-brand-coral">
                    <Sparkles className="w-3.5 h-3.5 mr-1 animate-pulse text-brand-coral" />
                    <span>Support The Poet & Novelist</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                    Enjoying the Chapter?
                  </h3>
                  <p className="text-xs sm:text-sm opacity-70 max-w-md mx-auto font-sans leading-relaxed">
                    Own the beautiful print copy of <strong className="font-serif italic font-medium">Love, Loss and Life</strong> by Yogesh Bhavsar to follow the boy's complete path to healing, self-discovery, and ultimate peace.
                  </p>
                </div>

                {/* Purchase buttons direct to Amazon / NotionPress */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto pt-2">
                  <a
                    href={BOOK_METADATA.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2.5 bg-brand-charcoal hover:bg-black text-white py-3.5 px-6 rounded-xl font-semibold transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                  >
                    <span>Get on Amazon</span>
                    <ShoppingBag className="w-4 h-4 text-[#ffb09c]" />
                  </a>

                  <a
                    href={BOOK_METADATA.notionPressUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 border border-brand-coral/40 hover:border-brand-coral bg-brand-coral/5 hover:bg-brand-coral/10 text-brand-coral py-3.5 px-6 rounded-xl font-semibold transition-all active:scale-95 cursor-pointer text-sm"
                  >
                    <span>Order on NotionPress</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="text-[10px] opacity-40 font-mono">
                  <span>Available as Paperback, Hardcover, and Kindle Editions</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
