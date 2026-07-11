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
      text: 'Chapter One'
    },
    {
      type: 'chapter-heading',
      text: 'The Wet Raincoat Pocket'
    },
    {
      type: 'narrative',
      text: 'It is three in the morning when the sky finally decides to weep. Pune has a way of storing its grief in the clouds until the streets are entirely empty, letting the rain fall only when there is no one left to watch it happen.'
    },
    {
      type: 'narrative',
      text: 'Our boy sat at his vintage wooden desk, the window pane catching the first silver drops of the storm. In front of him sat a dark green notebook, its edges worn down from hours of nervous handling. He didn’t write yet. Instead, his fingers tracing the gold foil lettering on the front cover, he closed his eyes and let his mind slip back to a Tuesday afternoon that refused to fade.'
    },
    {
      type: 'narrative',
      text: 'It had been raining then too. The kind of heavy, sudden monsoon downpour that catches you unprepared on the sidewalk, forcing strangers under the narrow cloth awnings of tea stalls.'
    },
    {
      type: 'narrative',
      text: 'She had run under the awning laughing, shaking water from her dark hair. Her shoulder had brushed against his—briefly, purely by accident. He had frozen, holding his breath, afraid that the slightest movement would break the sudden magic of her proximity.'
    },
    {
      type: 'poem-block',
      lines: [
        "I still carry that rain in my coat,",
        "a cold heavy circle in my right-hand pocket,",
        "where your fingers once rested,",
        "by mistake, for three blocks.",
        "",
        "I refuse to dry the wool.",
        "Let the water rot the threads;",
        "some weights are warmer than being free,",
        "and some rains never learn to clear."
      ]
    },
    {
      type: 'narrative',
      text: 'She had slipped her hand into his right-hand raincoat pocket, searching for shelter from the biting cold wind. Her fingers had met his. For three blocks, they walked in complete silence, the rhythm of their footsteps matching the rain hitting the pavement. He didn’t dare look at her. He didn’t dare speak.'
    },
    {
      type: 'narrative',
      text: 'He knew, even then, that it was a mistake. A sweet, momentary misunderstanding born of cold weather and a shared umbrella. She was thinking of someone else, of a future he had no part in. But his heart, hopelessly romantic and tragically stubborn, didn’t care about logic.'
    },
    {
      type: 'narrative',
      text: 'By the time they reached her gate, she had pulled her hand away with a soft, apologetic smile. "Thanks for the umbrella," she’d said, her voice vanishing into the sound of the wind.'
    },
    {
      type: 'narrative',
      text: 'And that was it. She went inside, and he walked back alone.'
    },
    {
      type: 'narrative',
      text: 'Now, months later, the raincoat still hung on the peg behind his door. It was completely dry, but to him, that right pocket remained forever damp, heavy with the weight of unrequited hope.'
    },
    {
      type: 'narrative',
      text: 'He dipped his pen in the black ink. The clock ticked. 3:15 a.m. The battle of expectations had begun. He started to write...'
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
