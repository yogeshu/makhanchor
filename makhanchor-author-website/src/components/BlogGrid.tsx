/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Clock, Heart, Sparkles, X, ChevronUp, Share2, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import SEO from './SEO';

interface BlogGridProps {
  onSelectBlog: (blog: BlogPost | null) => void;
  activeBlog: BlogPost | null;
}

export default function BlogGrid({ onSelectBlog, activeBlog }: BlogGridProps) {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Categories and their color matches
  const categoryColors: Record<string, string> = {
    HEALING: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    WRITING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    POETRY: 'bg-brand-coral/15 text-brand-coral border-brand-coral/30',
    'LOVE & LIFE': 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    REFLECTIONS: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 320; // estimate card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const shareBlog = (blog: BlogPost) => {
    navigator.clipboard.writeText(`https://www.makhanchor.in/#blog/${blog.slug}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section
      id="blog"
      className="bg-[#0e0f13] py-24 border-b border-white/5 relative overflow-hidden"
    >
      {/* Dynamic SEO Injector inside Blog Section when active */}
      <SEO activeBlog={activeBlog} />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Module */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12" id="blog-header">
          <div className="text-left space-y-2">
            <span className="text-xs font-bold tracking-widest text-brand-coral uppercase block">
              SEO WRITEUPS ENGINE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-medium tracking-tight">
              Latest from the Blog
            </h2>
          </div>

          <div className="flex items-center space-x-6 mt-6 md:mt-0" id="blog-navigation-controls">
            {/* Terracotta/Coral styled slider buttons */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleScroll('left')}
                className="w-12 h-12 rounded-full border border-brand-coral/20 hover:border-brand-coral bg-brand-coral/10 hover:bg-brand-coral text-brand-coral hover:text-white flex items-center justify-center transition-all duration-300 transform active:scale-90 cursor-pointer"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="w-12 h-12 rounded-full border border-brand-coral/20 hover:border-brand-coral bg-brand-coral/10 hover:bg-brand-coral text-brand-coral hover:text-white flex items-center justify-center transition-all duration-300 transform active:scale-90 cursor-pointer"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <button
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
              className="text-sm font-semibold text-white/70 hover:text-brand-coral transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>View all blogs</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Asymmetric Masonry Slider Grid */}
        <div
          id="blog-cards-slider"
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory px-2 select-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {BLOG_POSTS.map((blog) => {
            const isMostLoved = blog.mostLoved;
            const categoryColorClass = categoryColors[blog.category] || 'bg-white/10 text-white';

            return (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id={`blog-card-${blog.id}`}
                className={`flex-none snap-start relative rounded-2xl overflow-hidden transition-all duration-500 group flex flex-col justify-end p-6 cursor-pointer ${
                  isMostLoved
                    ? 'w-[300px] sm:w-[350px] h-[520px] shadow-[0_20px_40px_-10px_rgba(219,122,96,0.3)] ring-1 ring-brand-coral/30 hover:ring-brand-coral/50'
                    : 'w-[280px] sm:w-[310px] h-[480px] shadow-lg hover:shadow-2xl border border-white/5 hover:border-white/10'
                }`}
                onClick={() => onSelectBlog(blog)}
              >
                {/* Star-lit Background Photo with Dark Overlay */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Distinct Dark-mode ambient overlay pop-out effect */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isMostLoved
                        ? 'bg-gradient-to-t from-black via-black/50 to-brand-coral/10'
                        : 'bg-gradient-to-t from-black via-black/60 to-black/20'
                    }`}
                  />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-4 flex flex-col h-full justify-between">
                  
                  {/* Top Badge Tag */}
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full border ${categoryColorClass}`}>
                      {blog.category}
                    </span>

                    {isMostLoved && (
                      <span className="flex items-center space-x-1 bg-brand-coral text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-[0_4px_12px_rgba(219,122,96,0.5)]">
                        <Heart className="w-3 h-3 fill-current" />
                        <span>Most Loved</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Info Module */}
                  <div className="space-y-2 text-left">
                    <div className="flex items-center space-x-4 text-white/50 text-xs font-mono">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-brand-coral" />
                        <span>{blog.readTime}</span>
                      </span>
                      <span>•</span>
                      <span>{blog.date}</span>
                    </div>

                    <h3
                      className={`font-serif text-white font-medium leading-tight group-hover:text-brand-coral transition-colors ${
                        isMostLoved ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                      }`}
                    >
                      {blog.title}
                    </h3>

                    <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>

                    <div className="pt-2 flex items-center space-x-1.5 text-brand-coral font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      <span>Read More</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Immersive "Reading Room" Blog Reader Modal */}
      <AnimatePresence>
        {activeBlog && (
          <motion.div
            id="reading-room-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            {/* Modal Body: Creamy vintage reading style paper */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-4xl bg-brand-cream text-brand-charcoal rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Close and Share controls floating at top right */}
              <div className="absolute top-6 right-6 flex items-center space-x-3 z-30">
                <button
                  onClick={() => shareBlog(activeBlog)}
                  className="p-3 rounded-full bg-brand-charcoal/10 hover:bg-brand-coral hover:text-white transition-all text-brand-charcoal cursor-pointer relative"
                  title="Copy link to blog"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedLink && (
                    <span className="absolute -bottom-8 right-0 bg-brand-charcoal text-white text-[10px] py-1 px-2 rounded-md shadow-md whitespace-nowrap z-50">
                      Link Copied!
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onSelectBlog(null)}
                  className="p-3 rounded-full bg-brand-charcoal/10 hover:bg-brand-coral hover:text-white transition-all text-brand-charcoal cursor-pointer"
                  title="Close Reading Room"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Container with Custom Theme */}
              <div id="modal-scroll-container" className="overflow-y-auto p-6 sm:p-12 space-y-8 select-text">
                {/* Category Header */}
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold tracking-widest text-brand-coral uppercase">
                    {activeBlog.category}
                  </span>
                  <span className="text-brand-coral/40">•</span>
                  <span className="text-xs text-brand-charcoal/50 font-mono">
                    {activeBlog.date}
                  </span>
                </div>

                {/* Main Title Block */}
                <div className="space-y-4 text-left">
                  <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight leading-tight text-brand-charcoal">
                    {activeBlog.title}
                  </h1>
                  <p className="text-lg sm:text-xl font-serif italic text-brand-charcoal/70 border-l-2 border-brand-coral/60 pl-4 py-1 leading-relaxed">
                    {activeBlog.subtitle}
                  </p>
                </div>

                {/* Hero Featured Photo Inside Blog */}
                <div className="w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden relative shadow-md">
                  <img
                    src={activeBlog.imageUrl}
                    alt={activeBlog.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Beautiful Heart Divider */}
                <div className="flex items-center justify-center space-x-3 py-4">
                  <div className="h-[1px] bg-brand-coral/30 flex-grow max-w-xs" />
                  <span className="font-cursive text-brand-coral text-2xl">♡</span>
                  <div className="h-[1px] bg-brand-coral/30 flex-grow max-w-xs" />
                </div>

                {/* Real Paragraphs with Literary Spacing */}
                <article className="max-w-2xl mx-auto space-y-6 text-left text-base sm:text-lg text-brand-charcoal/85 leading-relaxed font-sans">
                  {activeBlog.content.map((paragraph, index) => {
                    // Render poetry verses specially if poetry blog
                    const isPoemVerse = paragraph.startsWith('‘') || paragraph.startsWith('`') || activeBlog.category === 'POETRY' && index === 3;
                    return (
                      <p
                        key={index}
                        className={`${
                          isPoemVerse
                            ? 'font-serif italic text-brand-coral pl-6 py-2 border-l border-brand-coral/30 text-lg sm:text-xl'
                            : ''
                        }`}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </article>

                {/* Post Footer Profile */}
                <div className="max-w-2xl mx-auto pt-8 border-t border-brand-charcoal/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-brand-coral text-white font-cursive text-2xl flex items-center justify-center shadow-md">
                      M
                    </div>
                    <div className="text-left">
                      <div className="font-serif font-semibold text-brand-charcoal">Written by Makhanchor</div>
                      <div className="text-xs text-brand-charcoal/50">Author, Poet & Heartweaver</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectBlog(null)}
                    className="flex items-center space-x-2 text-brand-coral hover:text-brand-coral-hover font-bold text-sm transition-colors cursor-pointer"
                  >
                    <span>Back to all posts</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
