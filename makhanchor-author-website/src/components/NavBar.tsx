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
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => handleLinkClick(link.id)}
              className="relative text-sm font-medium tracking-wide transition-colors duration-300 py-1"
              style={{
                color: activeTab === link.id ? '#db7a60' : 'rgba(255, 255, 255, 0.8)'
              }}
            >
              {link.label}
              {activeTab === link.id && (
                <motion.span
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-coral"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Right Action Block: Socials & CTA Button */}
        <div id="right-actions" className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-4 border-r border-white/10 pr-6">
            <a
              href="https://www.instagram.com/makhanchor.in/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-brand-coral transition-colors"
              id="social-ig"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/c/makhanchor"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-brand-coral transition-colors"
              id="social-yt"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="mailto:yogeshbhavsar1994@gmail.com"
              className="text-white/70 hover:text-brand-coral transition-colors"
              id="social-mail"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Midnight Ambient Player Toggle */}
          <AmbientPlayer />

          <button
            id="read-free-chapter-cta"
            onClick={onReadFirstChapter}
            className="border border-white/20 hover:border-brand-coral bg-white/5 hover:bg-white/10 text-white/90 hover:text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Read Chapter 1 Free
          </button>

          <button
            id="get-book-cta"
            onClick={onGetBook}
            className="bg-brand-coral text-white px-5 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-brand-coral-hover transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 cursor-pointer"
          >
            Get My Book
          </button>
        </div>

        {/* Mobile Header Right Controls */}
        <div className="flex items-center space-x-3 lg:hidden">
          {/* Midnight Ambient Player Toggle (Mobile) */}
          <AmbientPlayer />
          
          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-trigger"
            className="text-white/90 hover:text-brand-coral transition-colors p-1"
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
            className="absolute top-full left-0 w-full bg-brand-obsidian/95 backdrop-blur-lg border-b border-white/10 py-6 px-6 lg:hidden flex flex-col space-y-6 shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-lg font-medium text-left py-2 border-b border-white/5 ${
                    activeTab === link.id ? 'text-brand-coral font-semibold' : 'text-white/80'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-6 py-2">
              <a
                href="https://www.instagram.com/makhanchor.in/"
                target="_blank"
                rel="noreferrer"
                className="text-white/75 hover:text-brand-coral transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com/c/makhanchor"
                target="_blank"
                rel="noreferrer"
                className="text-white/75 hover:text-brand-coral transition-colors"
              >
                <Youtube className="w-6 h-6" />
              </a>
              <a
                href="mailto:yogeshbhavsar1994@gmail.com"
                className="text-white/75 hover:text-brand-coral transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>

            <button
              onClick={() => {
                onReadFirstChapter();
                setIsMobileMenuOpen(false);
              }}
              className="border border-white/20 hover:border-brand-coral bg-white/5 text-white py-3 rounded-full text-base font-semibold w-full shadow-lg transition-colors"
            >
              Read Chapter 1 Free
            </button>

            <button
              onClick={() => {
                onGetBook();
                setIsMobileMenuOpen(false);
              }}
              className="bg-brand-coral text-white py-3 rounded-full text-base font-semibold w-full shadow-lg hover:bg-brand-coral-hover transition-colors"
            >
              Get My Book
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
