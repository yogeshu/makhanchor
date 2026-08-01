/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, BookOpen, X, ArrowUp, CheckCircle, Flame, Gift, Sparkles, ChevronRight } from 'lucide-react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import BookShowcase from './components/BookShowcase';
import AboutSanctuary from './components/AboutSanctuary';
import BlogGrid from './components/BlogGrid';
import ReviewGrid from './components/ReviewGrid';
import ReelsPage from './components/ReelsPage';
import ContactForm from './components/ContactForm';
import ExcerptBooklet from './components/ExcerptBooklet';
import GuestbookFeed from './components/GuestbookFeed';
import ChapterPreview from './components/ChapterPreview';
import LegalModal, { LegalDocType } from './components/LegalModal';
import Footer from './components/Footer';
import SEO from './components/SEO';
import ReadingProgress from './components/ReadingProgress';
import MailingListPopup from './components/MailingListPopup';
import { BlogPost } from './types';
import { BLOG_POSTS, BOOK_METADATA } from './data';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeTab, setActiveTab] = useState('home');
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isReelsVisible, setIsReelsVisible] = useState(true); // Always show reels segment on index
  const [selectedPurchaseOption, setSelectedPurchaseOption] = useState<string | null>(null);
  const [isChapterOpen, setIsChapterOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalDocType, setLegalDocType] = useState<LegalDocType>('privacy');

  const handleOpenLegal = (type: LegalDocType) => {
    setLegalDocType(type);
    setIsLegalOpen(true);
  };

  // Synchronize Active Section with Window Scroll, URL Path, and Hash on Mount / Popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      setCurrentPath(pathname);

      // Check real pathname routing first (highly SEO friendly)
      if (pathname.startsWith('/blog/')) {
        const slug = pathname.split('/blog/')[1];
        const blog = BLOG_POSTS.find((b) => b.slug === slug);
        if (blog) {
          setActiveBlog(blog);
          setActiveTab('blog');
          return;
        }
      }

      if (pathname === '/blog') {
        setActiveBlog(null);
        setActiveTab('blog');
        return;
      }

      if (pathname === '/about') {
        setActiveBlog(null);
        const hash = window.location.hash.replace('#', '');
        if (hash === 'poetry') {
          setActiveTab('poetry');
          setTimeout(() => {
            const element = document.getElementById('poetry');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        } else {
          setActiveTab('about');
        }
        return;
      }

      // Root path '/'
      setActiveBlog(null);
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveTab(hash);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        if (window.scrollY < 200) {
          setActiveTab('home');
        }
      }
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    // Trigger on initial load
    handleLocationChange();

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Intersection Observer to update active navigation tab based on scrolling position
  useEffect(() => {
    const sections = ['home', 'about', 'books', 'poetry', 'blog', 'reviews', 'reels', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // focused in the middle of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (window.location.pathname !== '/') return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Only update section tab automatically if we aren't deep-linked into a blog post path
          if (!window.location.pathname.startsWith('/blog/')) {
            setActiveTab(entry.target.id);
          }
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sec) => {
        const el = document.getElementById(sec);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleOpenPurchase = () => {
    setIsPurchaseModalOpen(true);
  };

  const handleSelectBlog = (blog: BlogPost | null) => {
    setActiveBlog(blog);
    if (blog) {
      window.history.pushState(null, '', `/blog/${blog.slug}`);
      setCurrentPath(`/blog/${blog.slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState(null, '', '/blog');
      setCurrentPath('/blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSetActiveTab = (tab: string) => {
    if (tab === 'about') {
      window.history.pushState(null, '', '/about');
      setCurrentPath('/about');
      setActiveTab('about');
      setActiveBlog(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'blog') {
      window.history.pushState(null, '', '/blog');
      setCurrentPath('/blog');
      setActiveTab('blog');
      setActiveBlog(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'home') {
      window.history.pushState(null, '', '/');
      setCurrentPath('/');
      setActiveTab('home');
      setActiveBlog(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'poetry') {
      if (window.location.pathname !== '/about') {
        window.history.pushState(null, '', '/about#poetry');
        setCurrentPath('/about');
        setActiveTab('poetry');
        setActiveBlog(null);
        setTimeout(() => {
          const element = document.getElementById('poetry');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        window.history.pushState(null, '', '/about#poetry');
        setActiveTab('poetry');
        const element = document.getElementById('poetry');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // It's a homepage section anchor: 'books', 'reviews', 'reels', 'contact'
      if (window.location.pathname !== '/') {
        window.history.pushState(null, '', `/#${tab}`);
        setCurrentPath('/');
        setActiveTab(tab);
        setActiveBlog(null);
        setTimeout(() => {
          const element = document.getElementById(tab);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        window.history.pushState(null, '', `/#${tab}`);
        setActiveTab(tab);
        const element = document.getElementById(tab);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleNewsletterSubscribe = (email: string) => {
    console.log(`Subscribed newsletter with: ${email}`);
    // State is managed in component
  };

  return (
    <div className="relative min-h-screen bg-brand-obsidian text-white selection:bg-brand-coral/30 antialiased font-sans flex flex-col justify-between">
      {/* 1. Dynamic document metadata & JSON-LD injection */}
      <SEO activeBlog={activeBlog} activeTab={activeTab} />

      {/* Scroll-linked reading progress indicator */}
      <ReadingProgress activeBlog={activeBlog} />

      {/* 2. Top Glassmorphism Navigation Header */}
      <NavBar
        activeTab={activeTab}
        setActiveTab={handleSetActiveTab}
        onGetBook={handleOpenPurchase}
        onReadFirstChapter={() => setIsChapterOpen(true)}
      />

      {/* 3. Main Site Grid Blocks */}
      <main id="primary-content" className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPath === '/about' ? (
            <motion.div
              key="about-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-20"
            >
              <AboutSanctuary />
            </motion.div>
          ) : currentPath === '/blog' || currentPath.startsWith('/blog/') ? (
            <motion.div
              key="blog-page"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="pt-20"
            >
              <BlogGrid
                activeBlog={activeBlog}
                onSelectBlog={handleSelectBlog}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero split-screen block */}
              <Hero
                onExploreBook={() => {
                  const element = document.getElementById('books');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                onReadBlog={() => handleSetActiveTab('blog')}
              />

              {/* Award/Feature trust strip showing review highlights */}
              <TrustStrip />

              {/* Featured Book Showcase (Cream segment) */}
              <BookShowcase
                onBuyNow={handleOpenPurchase}
                onAmazonClick={() => window.open(BOOK_METADATA.amazonUrl, '_blank')}
                onReadFirstChapter={() => setIsChapterOpen(true)}
              />

              {/* Dynamic Interactive Novel Excerpt Reader */}
              <ExcerptBooklet />

              {/* Masonry Review Block (Cream segment) */}
              <ReviewGrid />

              {/* Lazy-Loaded Spoken Word Reels Section */}
              <ReelsPage isVisible={isReelsVisible} />

              {/* Anonymous "Midnight Notes" Guestbook Feed */}
              <GuestbookFeed />

              {/* Vintage Desk Contact Box / Letter Form */}
              <ContactForm />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Elegant footer component */}
      <Footer onSubscribe={handleNewsletterSubscribe} onOpenLegal={handleOpenLegal} />

      {/* 5. Custom Poetry Purchase Overlay (Popup Modal) */}
      <AnimatePresence>
        {isPurchaseModalOpen && (
          <motion.div
            id="purchase-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-lg bg-brand-cream text-brand-charcoal rounded-[30px] p-8 sm:p-10 shadow-2xl border border-black/10 flex flex-col overflow-hidden"
            >
              {/* Top Banner overlay background */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-coral via-[#e0694a] to-brand-coral" />

              {/* Close button */}
              <button
                onClick={() => {
                  setIsPurchaseModalOpen(false);
                  setSelectedPurchaseOption(null);
                }}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-brand-charcoal cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header info */}
                <div className="text-left space-y-2 pr-8">
                  <div className="flex items-center space-x-2 text-brand-coral">
                    <Gift className="w-4 h-4" />
                    <span className="text-[10px] font-bold tracking-widest uppercase">
                      AUTHOR EXCLUSIVE GIFT
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-medium tracking-tight text-brand-charcoal">
                    Get your copy of the Novel
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-charcoal/70 leading-relaxed font-sans">
                    Choose your preferred portal below to enter 'Love, Loss and Life'.
                  </p>
                </div>

                {/* Grid of purchasing portals */}
                <div className="space-y-4 text-left max-h-[360px] overflow-y-auto pr-1" id="purchase-options">
                  
                  {/* Channel 1: Notion Press Store */}
                  <div
                    onClick={() => setSelectedPurchaseOption('notion')}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 ${
                      selectedPurchaseOption === 'notion'
                        ? 'bg-white border-brand-coral ring-1 ring-brand-coral'
                        : 'bg-white/50 border-black/10 hover:border-brand-coral/40'
                    }`}
                  >
                    <div className="p-3 bg-brand-coral/10 text-brand-coral rounded-xl">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 flex-grow">
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-semibold text-brand-charcoal text-sm sm:text-base">
                          Notion Press Store
                        </span>
                        <span className="text-[10px] font-bold text-brand-coral bg-brand-coral/10 px-2 py-0.5 rounded-full">
                          OFFICIAL PUBLISHER
                        </span>
                      </div>
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                        Read on the official Notion Press store. Fast publishing shipments & directly supports the author.
                      </p>
                    </div>
                  </div>

                  {/* Channel 2: Amazon India Physical Book */}
                  <div
                    onClick={() => setSelectedPurchaseOption('amazon')}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 ${
                      selectedPurchaseOption === 'amazon'
                        ? 'bg-white border-brand-coral ring-1 ring-brand-coral'
                        : 'bg-white/50 border-black/10 hover:border-brand-coral/40'
                    }`}
                  >
                    <div className="p-3 bg-brand-coral/10 text-brand-coral rounded-xl">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 flex-grow">
                      <span className="font-sans font-semibold text-brand-charcoal text-sm sm:text-base block">
                        Amazon India Bookstore (Paperback)
                      </span>
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                        Order your physical copy with fast delivery options across India.
                      </p>
                    </div>
                  </div>

                  {/* Channel 3: Amazon India Alternative Option */}
                  <div
                    onClick={() => setSelectedPurchaseOption('amazon_alternate')}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 ${
                      selectedPurchaseOption === 'amazon_alternate'
                        ? 'bg-white border-brand-coral ring-1 ring-brand-coral'
                        : 'bg-white/50 border-black/10 hover:border-brand-coral/40'
                    }`}
                  >
                    <div className="p-3 bg-brand-coral/10 text-brand-coral rounded-xl">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 flex-grow">
                      <span className="font-sans font-semibold text-brand-charcoal text-sm sm:text-base block">
                        Amazon India (Alternative Listing)
                      </span>
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                        Alternative purchase portal and Kindle/paperback link for regional fulfillment.
                      </p>
                    </div>
                  </div>

                  {/* Channel 4: Flipkart Bookstore */}
                  <div
                    onClick={() => setSelectedPurchaseOption('flipkart')}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 ${
                      selectedPurchaseOption === 'flipkart'
                        ? 'bg-white border-brand-coral ring-1 ring-brand-coral'
                        : 'bg-white/50 border-black/10 hover:border-brand-coral/40'
                    }`}
                  >
                    <div className="p-3 bg-brand-coral/10 text-brand-coral rounded-xl">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 flex-grow">
                      <span className="font-sans font-semibold text-brand-charcoal text-sm sm:text-base block">
                        Flipkart Bookstore
                      </span>
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                        Enjoy secure checkout, easy returns, and seller offers on Flipkart.
                      </p>
                    </div>
                  </div>

                  {/* Channel 5: Amazon US / Global Bookstore */}
                  <div
                    onClick={() => setSelectedPurchaseOption('amazon_com')}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start space-x-4 ${
                      selectedPurchaseOption === 'amazon_com'
                        ? 'bg-white border-brand-coral ring-1 ring-brand-coral'
                        : 'bg-white/50 border-black/10 hover:border-brand-coral/40'
                    }`}
                  >
                    <div className="p-3 bg-brand-coral/10 text-brand-coral rounded-xl">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 flex-grow">
                      <span className="font-sans font-semibold text-brand-charcoal text-sm sm:text-base block">
                        Amazon USA & International
                      </span>
                      <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                        Available globally on Amazon.com and other international Amazon sites.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Confirm Active Selected Channel Button */}
                <button
                  onClick={() => {
                    if (selectedPurchaseOption === 'notion') {
                      window.open(BOOK_METADATA.notionPressUrl, '_blank');
                    } else if (selectedPurchaseOption === 'amazon') {
                      window.open(BOOK_METADATA.amazonUrl, '_blank');
                    } else if (selectedPurchaseOption === 'amazon_alternate') {
                      window.open(BOOK_METADATA.amazonAlternateUrl, '_blank');
                    } else if (selectedPurchaseOption === 'flipkart') {
                      window.open(BOOK_METADATA.flipkartUrl, '_blank');
                    } else if (selectedPurchaseOption === 'amazon_com') {
                      window.open(BOOK_METADATA.amazonComUrl, '_blank');
                    } else {
                      // fallback to notionpress default
                      window.open(BOOK_METADATA.notionPressUrl, '_blank');
                    }
                    setIsPurchaseModalOpen(false);
                    setSelectedPurchaseOption(null);
                  }}
                  className="w-full bg-brand-charcoal hover:bg-black text-white font-semibold py-4 rounded-xl transition-colors text-sm shadow-md mt-4 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Proceed to Bookstore</span>
                  <ChevronRight className="w-4 h-4 text-brand-coral" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <MailingListPopup />
      <ChapterPreview isOpen={isChapterOpen} onClose={() => setIsChapterOpen(false)} />
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} initialDocType={legalDocType} />
    </div>
  );
}
