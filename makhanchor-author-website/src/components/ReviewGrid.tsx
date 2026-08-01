/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Quote, X, PlusCircle, PenTool, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data';
import { Review } from '../types';

export default function ReviewGrid() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, review: '', location: '' });
  const [successMessage, setSuccessMessage] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'amazon' | 'goodreads' | 'local'>('all');

  const filteredReviews = reviewsList.filter((rev) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'amazon') return rev.source === 'amazon';
    if (activeFilter === 'goodreads') return rev.source === 'goodreads';
    if (activeFilter === 'local') return !rev.source;
    return true;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.review) return;

    const submittedReview: Review = {
      id: `custom-rev-${Date.now()}`,
      name: newReview.name,
      rating: newReview.rating,
      review: newReview.review,
      date: 'Just now',
      location: newReview.location || 'Anonymous Reader'
    };

    setReviewsList([submittedReview, ...reviewsList]);
    setNewReview({ name: '', rating: 5, review: '', location: '' });
    setSuccessMessage(true);
    setTimeout(() => {
      setSuccessMessage(false);
      setIsFormOpen(false);
    }, 2000);
  };

  return (
    <section
      id="reviews"
      className="bg-brand-cream py-24 text-brand-charcoal overflow-hidden border-b border-black/5 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
          <span className="text-xs font-bold tracking-widest text-brand-coral uppercase block">
            READERS' CORNER
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-brand-charcoal">
            Words from the Heart
          </h2>
          <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed font-sans">
            Read how 'Love, Loss and Life' touched the lives, healed the wounds, and echoed the silent thoughts of our global reading family.
          </p>
          
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center space-x-2 bg-brand-charcoal hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-md transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-brand-coral" />
            <span>Write a Testimonial</span>
          </button>
        </div>

        {/* Filter Tabs / Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 mb-12 max-w-3xl mx-auto">
          {[
            { id: 'all', label: 'All Reviews', count: reviewsList.length },
            { id: 'amazon', label: 'Amazon Verified', count: reviewsList.filter(r => r.source === 'amazon').length },
            { id: 'goodreads', label: 'Goodreads Community', count: reviewsList.filter(r => r.source === 'goodreads').length },
            { id: 'local', label: 'Reader Testimonials', count: reviewsList.filter(r => !r.source).length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border cursor-pointer flex items-center space-x-1.5 ${
                activeFilter === tab.id
                  ? 'bg-brand-charcoal border-brand-charcoal text-white shadow-sm'
                  : 'bg-white border-black/5 hover:border-black/15 text-brand-charcoal/70'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${activeFilter === tab.id ? 'bg-white/20 text-white' : 'bg-black/5 text-brand-charcoal/60'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div
          id="reviews-masonry"
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]"
        >
          {filteredReviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="break-inside-avoid bg-white p-8 rounded-2xl border border-black/5 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 relative group flex flex-col justify-between"
              id={`review-card-${rev.id}`}
            >
              {/* Star Rating & Quote Accent */}
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-1.5">
                  <div className="flex items-center space-x-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-coral text-brand-coral" />
                    ))}
                    {[...Array(5 - rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-black/10" />
                    ))}
                  </div>

                  {/* High fidelity Source Badge */}
                  {rev.source === 'amazon' && (
                    <span className="inline-flex items-center text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-200/60 rounded px-2 py-0.5 font-sans tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5 animate-pulse" />
                      Amazon Verified
                    </span>
                  )}
                  {rev.source === 'goodreads' && (
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 rounded px-2 py-0.5 font-sans tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                      Goodreads Community
                    </span>
                  )}
                  {!rev.source && (
                    <span className="inline-flex items-center text-[10px] font-bold text-brand-coral bg-brand-coral/5 border border-brand-coral/10 rounded px-2 py-0.5 font-sans tracking-wide">
                      Reader Testimonial
                    </span>
                  )}
                </div>
                <Quote className="w-8 h-8 text-brand-coral/10 group-hover:text-brand-coral/20 transition-colors" />
              </div>

              {/* Review Prose */}
              <p className="text-brand-charcoal/80 text-sm leading-relaxed font-serif italic mb-6 text-left">
                "{rev.review}"
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-black/5 w-full mb-4" />

              {/* Author & Info Block */}
              <div className="flex items-center justify-between text-left">
                <div>
                  <span className="block font-sans font-semibold text-brand-charcoal text-sm">
                    {rev.name}
                  </span>
                  <span className="block text-[11px] text-brand-charcoal/50 font-sans">
                    {rev.location}
                  </span>
                </div>
                <span className="text-[10px] text-brand-charcoal/40 font-mono">
                  {rev.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Polaroid Reader Snapshots section */}
        <div className="mt-28 border-t border-black/5 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-brand-coral uppercase block">
              READER SNAPSHOTS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-brand-charcoal">
              Love, Loss and Life in the Wild
            </h3>
            <p className="text-brand-charcoal/70 text-sm sm:text-base leading-relaxed font-sans">
              Stunning aesthetic moments captured and shared by our incredible reading family across the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 sm:px-0">
            {[
              {
                id: 'moment-1',
                imageUrl: '/screenshot-1.png',
                caption: 'Love, Loss and Life styled beautifully. 📖✨',
                location: 'Instagram Review',
                rotation: '-rotate-2'
              },
              {
                id: 'moment-2',
                imageUrl: '/screenshot-2.png',
                caption: 'Deeply touching page dedication. 🌸',
                location: 'Instagram Review',
                rotation: 'rotate-3'
              },
              {
                id: 'moment-3',
                imageUrl: '/screenshot-3.png',
                caption: 'Every word resonates deeply. 💚',
                location: 'Instagram Review',
                rotation: '-rotate-1'
              },
              {
                id: 'moment-4',
                imageUrl: '/screenshot-4.png',
                caption: 'Cozy 3 a.m. aesthetic & candle light. 🕯️💙',
                location: 'Instagram Review',
                rotation: 'rotate-2'
              },
              {
                id: 'moment-5',
                imageUrl: '/screenshot-5.png',
                caption: 'Accompanied by beautiful green nature. 🍃✍️',
                location: 'Instagram Review',
                rotation: '-rotate-3'
              },
              {
                id: 'moment-6',
                imageUrl: '/screenshot-6.png',
                caption: 'Lost in the magic of the pages. 🌳📖',
                location: 'Instagram Review',
                rotation: 'rotate-1'
              },
              {
                id: 'moment-7',
                imageUrl: '/screenshot-7.png',
                caption: 'Perfect flat lay setup with cozy vibes. ☁️✨',
                location: 'Instagram Review',
                rotation: '-rotate-2'
              }
            ].map((moment) => (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className={`bg-white p-4 pb-6 rounded-lg shadow-[0_15px_30px_-15px_rgba(0,0,0,0.12)] border border-black/5 hover:shadow-2xl transition-all duration-300 transform ${moment.rotation}`}
              >
                {/* Image Box */}
                <div className="aspect-[3/4] rounded-sm overflow-hidden bg-brand-cream border border-black/5 relative group/img">
                  <img
                    src={moment.imageUrl}
                    alt={moment.caption}
                    className="w-full h-full object-cover grayscale-[20%] group-hover/img:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle paper shadow vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Handwritten Polaroid Caption */}
                <div className="mt-5 text-center space-y-1">
                  <p className="font-cursive text-xl text-brand-charcoal leading-none">
                    {moment.caption}
                  </p>
                  <p className="text-[10px] font-mono tracking-wider uppercase text-brand-charcoal/40 font-semibold">
                    {moment.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Dialog Popup */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            id="testimonial-dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-brand-cream text-brand-charcoal p-8 rounded-3xl w-full max-w-md relative border border-black/10 shadow-2xl"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-brand-charcoal cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-brand-coral mb-4">
                <PenTool className="w-5 h-5" />
                <span className="text-xs font-bold tracking-widest uppercase">
                  WRITE A TESTIMONIAL
                </span>
              </div>

              <h3 className="font-serif text-2xl font-semibold mb-6 text-left">
                Share your journey
              </h3>

              {successMessage ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-brand-coral/10 rounded-full flex items-center justify-center text-brand-coral mx-auto">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-brand-charcoal">Thank You!</h4>
                  <p className="text-sm text-brand-charcoal/70">Your heartfelt words have been added.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-brand-charcoal/70">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Priyanshi"
                      className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-coral focus:border-brand-coral"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-brand-charcoal/70">Location</label>
                      <input
                        type="text"
                        value={newReview.location}
                        onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                        placeholder="e.g. Jaipur, India"
                        className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-coral focus:border-brand-coral"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-brand-charcoal/70">Rating *</label>
                      <select
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-coral focus:border-brand-coral"
                      >
                        <option value={5}>5 Stars (Excellent)</option>
                        <option value={4}>4 Stars (Very Good)</option>
                        <option value={3}>3 Stars (Good)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-brand-charcoal/70">Your Testimonial *</label>
                    <textarea
                      required
                      rows={4}
                      value={newReview.review}
                      onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                      placeholder="Write your beautiful thoughts here..."
                      className="w-full bg-white border border-black/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-coral focus:border-brand-coral resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-charcoal hover:bg-black text-white font-semibold py-3 rounded-xl transition-colors text-sm shadow-md mt-2 cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
