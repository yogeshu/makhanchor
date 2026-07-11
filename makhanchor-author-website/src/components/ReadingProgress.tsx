/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles } from 'lucide-react';
import { BlogPost } from '../types';

interface ReadingProgressProps {
  activeBlog: BlogPost | null;
}

export default function ReadingProgress({ activeBlog }: ReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState<'books' | 'blog' | 'article' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // If modal is open, track the modal scroll container
      if (activeBlog) {
        const modalContainer = document.getElementById('modal-scroll-container');
        if (modalContainer) {
          const { scrollTop, scrollHeight, clientHeight } = modalContainer;
          const totalScroll = scrollHeight - clientHeight;
          if (totalScroll > 0) {
            const p = Math.round((scrollTop / totalScroll) * 100);
            setProgress(p);
            setIsVisible(true);
            setCurrentSection('article');
          } else {
            setProgress(0);
            setIsVisible(false);
          }
        }
        return;
      }

      // If modal is closed, track progress across books and blog sections
      const booksEl = document.getElementById('books');
      const blogEl = document.getElementById('blog');

      if (booksEl && blogEl) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;

        // Start tracking from when the books section enters the screen
        const startOffset = booksEl.offsetTop;
        // End tracking when the blog section is scrolled past
        const endOffset = blogEl.offsetTop + blogEl.offsetHeight;

        const totalRange = endOffset - startOffset;
        // Midpoint of screen relative to tracked range
        const currentScroll = scrollTop - startOffset + (viewportHeight / 2);

        if (scrollTop + viewportHeight > startOffset && scrollTop < endOffset) {
          let p = Math.round((currentScroll / totalRange) * 100);
          p = Math.max(0, Math.min(100, p));
          setProgress(p);
          setIsVisible(true);

          // Identify which section is currently centered
          const rectBooks = booksEl.getBoundingClientRect();
          const rectBlog = blogEl.getBoundingClientRect();
          
          if (rectBooks.bottom > viewportHeight / 2) {
            setCurrentSection('books');
          } else if (rectBlog.top < viewportHeight / 2) {
            setCurrentSection('blog');
          }
        } else {
          setIsVisible(false);
          setCurrentSection(null);
        }
      } else {
        setIsVisible(false);
        setCurrentSection(null);
      }
    };

    // Attach listener with capture: true so we hear scroll events on modal div as well as window
    window.addEventListener('scroll', handleScroll, true);
    
    // Initial check
    handleScroll();

    // Small delay to let modal mount and re-calculate if opening
    const timer = setTimeout(() => {
      handleScroll();
    }, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      clearTimeout(timer);
    };
  }, [activeBlog]);

  return (
    <>
      {/* 1. Universal Top Progress Bar Line */}
      <div 
        id="scroll-progress-wrapper"
        className={`fixed top-0 left-0 w-full z-[100] h-[3.5px] bg-white/5 transition-opacity duration-300 pointer-events-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          id="scroll-progress-fill"
          className="h-full bg-gradient-to-r from-brand-coral via-[#ea8d73] to-[#ffb199] transition-all duration-75 ease-out shadow-[0_1px_10px_rgba(219,122,96,0.6)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 2. Ambient Indicator Badge in corner */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id="scroll-depth-badge"
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[49] pointer-events-none hidden sm:flex items-center space-x-2.5 bg-brand-charcoal/90 border border-white/15 backdrop-blur-md rounded-full px-4.5 py-2 text-[11px] font-mono text-white/90 tracking-wider shadow-xl shadow-black/40"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-coral/10 text-brand-coral">
              <BookOpen className="w-3 h-3 animate-pulse" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[9px] text-white/50 uppercase tracking-widest leading-none mb-0.5">
                {currentSection === 'article' 
                  ? 'READING ARTICLE' 
                  : currentSection === 'books' 
                    ? 'BOOK SHOWCASE' 
                    : 'BLOG DEPTH'}
              </span>
              <span className="font-sans font-semibold text-xs leading-none">
                {currentSection === 'article' && activeBlog
                  ? `${activeBlog.title.slice(0, 24)}...` 
                  : currentSection === 'books'
                    ? 'Featured Showcase'
                    : 'Browsing Writeups'}
              </span>
            </div>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <span className="text-brand-coral font-bold text-sm leading-none flex items-center">
              {progress}%
              <Sparkles className="w-2.5 h-2.5 ml-1 text-brand-coral/80 animate-pulse" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
