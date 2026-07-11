/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ChevronRight, Bookmark, ArrowRight, CornerDownRight, Quote } from 'lucide-react';

export default function AboutSanctuary() {
  const [selectedPoemCategory, setSelectedPoemCategory] = useState<'all' | 'healing' | 'unrequited' | 'hope'>('all');
  const [copiedPoem, setCopiedPoem] = useState<string | null>(null);

  const boardRef = useRef<HTMLDivElement>(null);
  const [newWord, setNewWord] = useState('');
  const [wordsList, setWordsList] = useState<{ id: string; text: string; x: number; y: number }[]>([]);

  useEffect(() => {
    handleResetBoard();
  }, []);

  const handleResetBoard = () => {
    const STARTING_WORDS = [
      "unrequited", "silent", "heart", "twilight", "whisper", "memory", "longing", 
      "healing", "rain", "coat", "pocket", "wind", "pebble", "warmth", "future", 
      "past", "ghost", "laughter", "star", "moon", "desk", "letter", "soul", 
      "love", "loss", "life", "you", "me", "and", "our", "forever", "transient", 
      "soft", "shadows", "beautiful", "rearrange", "live"
    ];

    const initialWords = STARTING_WORDS.map((w, idx) => {
      const col = idx % 6;
      const row = Math.floor(idx / 6);
      const randomJitterX = Math.random() * 16 - 8;
      const randomJitterY = Math.random() * 10 - 5;
      
      return {
        id: `w-${idx}-${Date.now()}`,
        text: w,
        x: 15 + col * 92 + randomJitterX,
        y: 20 + row * 52 + randomJitterY
      };
    });

    setWordsList(initialWords);
  };

  const handleAddCustomWord = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanWord = newWord.trim().toLowerCase();
    if (!cleanWord) return;

    const newChip = {
      id: `custom-${Date.now()}`,
      text: cleanWord,
      x: 100 + Math.random() * 150,
      y: 100 + Math.random() * 100
    };

    setWordsList(prev => [...prev, newChip]);
    setNewWord('');
  };

  const handleClearYourCreation = () => {
    setWordsList([]);
  };

  const shortPoems = [
    {
      id: 'p-1',
      category: 'unrequited',
      title: 'unspoken',
      lines: [
        'I kept your name',
        'in the pocket of my coat,',
        'a silent pebble of warmth',
        'to hold whenever the wind',
        'began to speak of you.'
      ],
      footnote: 'the silence of loving'
    },
    {
      id: 'p-2',
      category: 'healing',
      title: 'after the rain',
      lines: [
        'you are not broken,',
        'just beautifully rearranged.',
        'every crack of light',
        'is simply proof',
        'that you are coming alive.'
      ],
      footnote: 'rebuilding the pieces'
    },
    {
      id: 'p-3',
      category: 'hope',
      title: 'the sky knows',
      lines: [
        'we are looking',
        'at the exact same sky,',
        'but you see the future,',
        'and I see the memory',
        'of what we left behind.'
      ],
      footnote: 'celestial alignments'
    },
    {
      id: 'p-4',
      category: 'unrequited',
      title: 'the shadow of you',
      lines: [
        'I became a ghost',
        'in your house of laughter,',
        'wishing only to be',
        'the wind that blew',
        'the curtain aside.'
      ],
      footnote: 'silent presence'
    }
  ];

  const handleCopyPoem = (poemText: string, id: string) => {
    navigator.clipboard.writeText(poemText);
    setCopiedPoem(id);
    setTimeout(() => setCopiedPoem(null), 2000);
  };

  const filteredPoems = selectedPoemCategory === 'all' 
    ? shortPoems 
    : shortPoems.filter(p => p.category === selectedPoemCategory);

  return (
    <section
      id="about"
      className="bg-[#0c0d11] py-24 text-white relative overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: About the Author Narrative */}
        <div className="lg:col-span-6 space-y-8 text-left" id="author-biography">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest text-brand-coral uppercase block">
              THE AUTHOR'S SANCTUARY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
              Behind the Signature
            </h2>
          </div>

          <div className="space-y-6 text-white/70 font-sans text-base sm:text-lg leading-relaxed">
            <p>
              Hi, I am <span className="text-brand-coral font-semibold">Yogesh Bhavsar</span>, writing under the beloved pen name <span className="text-brand-coral/95 font-semibold">Makhanchor</span>. I write novels and words to map the silent architecture of the human heart. 
              My writing began in the quiet corners of one-sided devotion—a space where love is felt intensely, yet remains completely unspoken.
            </p>
            <p>
              Through storytelling and letters, I translate the heavy aches of nostalgia, the process of healing, and the gentle courage it takes to let go of people who were only meant to be a chapter, not the whole book.
            </p>
            <p className="font-serif italic text-white/90 border-l border-brand-coral/40 pl-4 py-1">
              "My mission is not to make you escape your feelings, but to build a cozy paper house where you can sit with them in peace."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4">
            <div className="flex items-center space-x-3 text-brand-coral">
              <span className="text-sm font-bold tracking-widest uppercase">CONNECT ON INSTAGRAM</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <a
              href="https://www.instagram.com/makhanchor.in/"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-white/80 hover:text-white hover:underline flex items-center space-x-1.5"
            >
              <span>@makhanchor.in</span>
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Poetry Board ("Poetry" nav target) */}
        <div id="poetry" className="lg:col-span-6 space-y-8 text-left bg-brand-charcoal/40 border border-white/5 p-8 rounded-3xl relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-coral/5 blur-[90px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <h3 className="font-serif text-2xl font-medium text-white flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-brand-coral" />
                <span>Midnight Slate</span>
              </h3>
              <p className="text-xs text-white/50 mt-1">Tap Category to filter small verses</p>
            </div>

            {/* Category Selectors */}
            <div className="flex flex-wrap gap-2">
              {(['all', 'healing', 'unrequited', 'hope'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPoemCategory(cat)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border transition-all cursor-pointer ${
                    selectedPoemCategory === cat
                      ? 'bg-brand-coral text-white border-brand-coral'
                      : 'border-white/10 text-white/50 hover:text-white hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Polaroid-style Poem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPoems.map((poem) => {
                const poemTextString = poem.lines.join('\n');
                return (
                  <motion.div
                    key={poem.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-brand-charcoal/80 border border-white/10 p-6 rounded-2xl flex flex-col justify-between aspect-square relative group hover:border-brand-coral/30 hover:shadow-lg transition-all"
                  >
                    <div className="space-y-4">
                      {/* Quote Mark */}
                      <span className="block font-cursive text-brand-coral/40 text-xl leading-none">“</span>

                      {/* Poem Lines */}
                      <div className="font-serif italic text-sm text-white/90 leading-relaxed text-left space-y-1 pl-2">
                        {poem.lines.map((line, lidx) => (
                          <span key={lidx} className="block">{line}</span>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-3 flex justify-between items-center text-left">
                      <div className="pl-2">
                        <span className="block text-[10px] uppercase font-mono tracking-wider text-brand-coral">
                          {poem.title}
                        </span>
                        <span className="block text-[9px] text-white/40 italic">
                          {poem.footnote}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopyPoem(poemTextString, poem.id)}
                        className="text-[10px] font-semibold text-white/40 hover:text-brand-coral group-hover:text-white/60 transition-colors cursor-pointer"
                      >
                        {copiedPoem === poem.id ? 'Copied! ♡' : 'Copy Verse'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Interactive Poetry Bounding Box - Magnetic Board */}
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-16 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-4 space-y-5 text-left flex flex-col justify-center">
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-widest text-brand-coral uppercase block">
                CO-CREATE WITH MAKHANCHOR
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
                Magnetic Poetry Fridge
              </h3>
            </div>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed font-sans">
              Drag, arrange, and stack these poetic magnetic word tiles on the midnight board to craft your own short verse on unrequited love, healing, or silent twilight memories.
            </p>
            
            {/* Custom Word Input */}
            <div className="space-y-2 pt-2">
              <span className="text-xs text-white/40 block font-sans">
                ✨ Add custom tiles to your poetry kit:
              </span>
              <form onSubmit={handleAddCustomWord} className="flex gap-2">
                <input
                  type="text"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value.toLowerCase().slice(0, 15))}
                  placeholder="e.g. devotion"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-coral focus:border-brand-coral text-white placeholder-white/30 flex-grow"
                />
                <button
                  type="submit"
                  className="bg-brand-coral hover:bg-brand-coral-hover text-white px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Add Tile
                </button>
              </form>
            </div>

            {/* Board Controls */}
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={handleResetBoard}
                className="text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Scatter Tiles
              </button>
              <button
                onClick={handleClearYourCreation}
                className="text-xs text-white/50 hover:text-white border border-white/10 hover:border-white/20 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Clean Slate
              </button>
            </div>
          </div>

          {/* Draggable canvas constraint frame */}
          <div 
            className="lg:col-span-8 bg-[#09090b] border border-white/5 rounded-[32px] p-6 relative overflow-hidden h-[460px] shadow-inner select-none" 
            ref={boardRef}
            id="magnetic-poetry-board"
          >
            {/* Grid pattern background */}
            <div className="absolute inset-0 bg-grid-pink opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/20 to-[#0a0a0c]/80 pointer-events-none" />

            <div className="absolute top-5 right-6 text-[9px] font-mono uppercase tracking-widest text-brand-coral/40 pointer-events-none select-none">
              — Makhanchor Poetry Slate —
            </div>

            {/* Interactive container */}
            <div className="w-full h-full relative">
              {wordsList.map((wordObj) => (
                <motion.span
                  key={wordObj.id}
                  drag
                  dragConstraints={boardRef}
                  dragElastic={0.05}
                  dragMomentum={false}
                  initial={{ x: wordObj.x, y: wordObj.y }}
                  animate={{ x: wordObj.x, y: wordObj.y }}
                  whileDrag={{ 
                    scale: 1.15, 
                    rotate: Math.random() * 8 - 4, 
                    zIndex: 50, 
                    cursor: 'grabbing',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.4)'
                  }}
                  className="absolute cursor-grab select-none px-3 py-1.5 text-xs font-serif italic text-brand-charcoal bg-brand-cream border border-black/15 hover:border-brand-coral/60 rounded-lg shadow-[2px_4px_8px_rgba(0,0,0,0.35)] inline-block whitespace-nowrap active:cursor-grabbing font-semibold hover:scale-[1.03] transition-transform duration-150"
                >
                  {wordObj.text}
                </motion.span>
              ))}

              {wordsList.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 space-y-2 pointer-events-none">
                  <span className="text-sm font-sans">The board is silent.</span>
                  <button 
                    onClick={handleResetBoard} 
                    className="text-xs text-brand-coral underline hover:text-brand-coral-hover pointer-events-auto cursor-pointer"
                  >
                    Restore poetry tiles
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
