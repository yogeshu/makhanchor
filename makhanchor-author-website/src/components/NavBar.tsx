/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Instagram, Youtube, Mail, Menu, X, Feather } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AmbientPlayer from './AmbientPlayer';

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onGetBook: () => void;
  onReadFirstChapter: () => void;
}

export default function NavBar({ activeTab, setActiveTab, onGetBook, onReadFirstChapter }: NavBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'The Novel', id: 'books' },
    { label: 'Poetry', id: 'poetry' },
    { label: 'Blog', id: 'blog' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'Reels', id: 'reels' },
  ];

  const desktopNavLinks = [
    { label: 'The Novel', id: 'books' },
    { label: 'Poetry', id: 'poetry' },
    { label: 'Blog', id: 'blog' },
    { label: 'Reviews', id: 'reviews' },
  ];

  const handleLinkClick = (id: string) => {
    setIsMobileMenuOpen(false);
    setActiveTab(id);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-brand-obsidian/85 backdrop-blur-md border-b border-white/5 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Handwritten Logo with Feather Icon */}
        <button
          id="logo-btn"
          onClick={() => handleLinkClick('home')}
          className="flex items-center space-x-1 group text-left"
        >
          <span className="font-cursive text-3xl sm:text-4xl text-white font-bold tracking-wide transition-all group-hover:text-brand-coral">
            Makhanchor
          </span>
          <Feather className="w-5 h-5 text-brand-coral group-hover:rotate-12 transition-transform duration-300" />
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-2">
          {desktopNavLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className="relative text-sm font-semibold tracking-wide transition-all duration-300 px-4 py-2.5 rounded-full hover:bg-white/5 active:scale-95 cursor-pointer flex items-center justify-center min-h-[44px]"
              style={{
                color: activeTab === link.id ? '#ff7b5c' : 'rgba(255, 255, 255, 0.75)'
              }}
            >
              <span className="relative z-10">{link.label}</span>
              {activeTab === link.id && (
                <motion.span
                  layoutId="activePill"
                  className="absolute inset-0 bg-brand-coral/10 border border-brand-coral/20 rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Action Block: Socials & CTA Button */}
        <div id="right-actions" className="hidden lg:flex items-center space-x-5">
          <div className="flex items-center space-x-4 border-r border-white/10 pr-6">
            <a
              href="https://www.instagram.com/scripted_by_yogesh/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-brand-coral transition-colors flex items-center gap-1"
              id="social-ig-author"
              title="Instagram (Author: @scripted_by_yogesh)"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-[10px] opacity-60 hover:opacity-100 hidden xl:inline">Author</span>
            </a>
            <a
              href="https://www.instagram.com/the.makhanchor/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-brand-coral transition-colors flex items-center gap-1"
              id="social-ig-personal"
              title="Instagram (Personal: @the.makhanchor)"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-[10px] opacity-60 hover:opacity-100 hidden xl:inline">Personal</span>
            </a>
            <a
              href="https://www.youtube.com/@makhanchor646"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-brand-coral transition-colors"
              id="social-yt"
              title="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="mailto:yogeshbhavsarauthor@gmail.com"
              className="text-white/70 hover:text-brand-coral transition-colors"
              id="social-mail"
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Midnight Ambient Player Toggle */}
          <AmbientPlayer />

          <button
            id="read-free-chapter-cta"
            onClick={onReadFirstChapter}
            className="border border-white/20 hover:border-brand-coral bg-white/5 hover:bg-white/10 text-white/90 hover:text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Read Chapter 1 Free
          </button>

          <button
            id="get-book-cta"
            onClick={onGetBook}
            className="bg-brand-coral text-white px-7 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-brand-coral-hover transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
          >
            Get My Book
          </button>
        </div>

        {/* Mobile Header Right Controls */}
        <div className="flex items-center space-x-4 lg:hidden">
          {/* Midnight Ambient Player Toggle (Mobile) */}
          <AmbientPlayer />
          
          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-trigger"
            className="text-white/90 hover:text-brand-coral transition-colors p-2 rounded-xl hover:bg-white/5 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Glassmorphism Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-brand-obsidian/95 backdrop-blur-lg border-b border-white/10 py-8 px-8 lg:hidden flex flex-col space-y-8 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-xl font-semibold text-left px-5 py-4 rounded-2xl transition-all duration-200 flex items-center justify-between min-h-[52px] cursor-pointer ${
                    activeTab === link.id 
                      ? 'bg-brand-coral/10 text-brand-coral border border-brand-coral/20 font-bold shadow-md' 
                      : 'text-white/80 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeTab === link.id && (
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-coral animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-col space-y-3.5 py-4 border-b border-white/5 pb-6">
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.instagram.com/scripted_by_yogesh/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/75 hover:text-brand-coral transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <span className="text-sm text-white/60">@scripted_by_yogesh (Author)</span>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.instagram.com/the.makhanchor/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/75 hover:text-brand-coral transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <span className="text-sm text-white/60">@the.makhanchor (Personal)</span>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="https://www.youtube.com/@makhanchor646"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/75 hover:text-brand-coral transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <span className="text-sm text-white/60">@makhanchor646 (YouTube)</span>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="mailto:yogeshbhavsarauthor@gmail.com"
                  className="text-white/75 hover:text-brand-coral transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <span className="text-sm text-white/60 truncate">yogeshbhavsarauthor@gmail.com</span>
              </div>
            </div>

            <button
              onClick={() => {
                onReadFirstChapter();
                setIsMobileMenuOpen(false);
              }}
              className="border border-white/20 hover:border-brand-coral bg-white/5 text-white py-4 rounded-full text-base font-semibold w-full shadow-lg transition-colors min-h-[48px] cursor-pointer"
            >
              Read Chapter 1 Free
            </button>

            <button
              onClick={() => {
                onGetBook();
                setIsMobileMenuOpen(false);
              }}
              className="bg-brand-coral text-white py-4 rounded-full text-base font-semibold w-full shadow-lg hover:bg-brand-coral-hover transition-colors min-h-[48px] cursor-pointer"
            >
              Get My Book
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
