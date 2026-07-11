/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { BOOK_METADATA } from '../data';
import BookFlatLay from './BookFlatLay';

interface BookShowcaseProps {
  onBuyNow: () => void;
  onAmazonClick: () => void;
  onReadFirstChapter: () => void;
}

export default function BookShowcase({ onBuyNow, onAmazonClick, onReadFirstChapter }: BookShowcaseProps) {
  return (
    <section
      id="books"
      className="bg-brand-cream py-24 text-brand-charcoal overflow-hidden border-t border-b border-black/5 relative"
    >
      {/* Decorative Warm Paper Grain or Watercolor Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-900 via-amber-100 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left column: Realistic Flat-lay scene matching the author's real physical book photo on sage-green quilted blanket */}
        <div className="lg:col-span-6 flex justify-center relative py-8" id="asymmetric-showcase">
          <BookFlatLay className="w-full max-w-[440px]" />
        </div>

        {/* Right column: Book specifications & CTA Modules */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6 text-left" id="specifications-column">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs font-bold tracking-widest text-brand-coral uppercase block mb-2">
              FEATURED NOVEL
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-medium leading-[1.2] text-brand-charcoal tracking-tight">
              Love, Loss <br />
              <span className="text-brand-coral font-serif italic font-medium">and Life</span>
            </h2>
          </motion.div>

          {/* Heart Divider element -♡- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 w-40"
          >
            <div className="h-[1px] bg-brand-coral/40 flex-grow" />
            <span className="font-cursive text-brand-coral text-xl">♡</span>
            <div className="h-[1px] bg-brand-coral/40 flex-grow" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-brand-charcoal/75 font-sans leading-relaxed max-w-lg"
          >
            {BOOK_METADATA.description} It explores the silent agony of unrequited love, the raw battles of 3 a.m. loneliness, the power of putting thoughts onto paper, and the beautiful dawn of self-acceptance that comes through letting go and finding forgiveness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4 w-full"
          >
            <h4 className="text-xs font-bold tracking-widest text-brand-charcoal/40 uppercase">
              WHAT READER'S ARE SAYING
            </h4>
            <div className="border-l-2 border-brand-coral/40 pl-4 py-1 italic text-sm text-brand-charcoal/80 font-serif leading-relaxed max-w-md">
              "Every verse inside feels like a soft warm hand on my shoulder, gently reminding me that it's okay to feel deeply."
            </div>
          </motion.div>

          {/* Buy Buttons Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto"
            id="book-ctas"
          >
            <button
              onClick={onBuyNow}
              className="flex items-center justify-center space-x-3 bg-brand-charcoal hover:bg-black text-white px-8 py-4 rounded-full font-semibold shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Buy Now</span>
              <ShoppingBag className="w-4 h-4 text-brand-coral" />
            </button>

            <button
              onClick={onReadFirstChapter}
              className="flex items-center justify-center space-x-2 border-2 border-brand-charcoal/20 hover:border-brand-coral bg-transparent hover:bg-brand-coral/5 text-brand-charcoal hover:text-brand-coral px-6 py-4 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Read Chapter 1 Free</span>
            </button>

            <button
              onClick={onAmazonClick}
              className="group flex items-center justify-center space-x-2 text-brand-charcoal hover:text-brand-coral font-semibold px-6 py-4 transition-colors cursor-pointer"
            >
              <span>View on Amazon</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
