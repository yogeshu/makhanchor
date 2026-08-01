/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Star, Award, ExternalLink, ShieldCheck, Check } from 'lucide-react';
import { BOOK_METADATA } from '../data';

export default function TrustStrip() {
  const ratingItems = [
    {
      platform: 'Amazon',
      count: BOOK_METADATA.amazonReviews,
      rating: '4.8',
      desc: 'Verified Global Reviews',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
      url: BOOK_METADATA.amazonUrl,
      accentLabel: 'Top New Release'
    },
    {
      platform: 'Goodreads',
      count: BOOK_METADATA.goodreadsRatings,
      rating: '4.7',
      desc: 'Reader Community Ratings',
      color: 'text-brand-coral',
      bgColor: 'bg-brand-coral/10',
      borderColor: 'border-brand-coral/20',
      url: BOOK_METADATA.goodreadsUrl,
      accentLabel: 'Highly Rated'
    }
  ];

  return (
    <div className="relative z-30 bg-[#0d0f16] border-y border-white/5 py-8 md:py-6 overflow-hidden">
      {/* Decorative starry background matching the midnight mood */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -top-12 left-1/3 w-64 h-32 bg-brand-coral/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent bg-[size:4px_4px] bg-repeat" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12">
          
          {/* Section Heading Label */}
          <div className="flex items-center space-x-3 text-center lg:text-left flex-shrink-0">
            <div className="p-2 bg-white/5 rounded-full border border-white/10">
              <ShieldCheck className="w-5 h-5 text-brand-coral" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-brand-coral uppercase block">
                TRUSTED READS
              </span>
              <h3 className="font-serif text-sm sm:text-base font-medium text-white/90">
                Acclaimed by Readers Nationwide
              </h3>
            </div>
          </div>

          {/* Divider Line on Desktop */}
          <div className="hidden lg:block h-8 w-[1px] bg-white/10" />

          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex items-center gap-4 md:gap-6 w-full lg:w-auto flex-grow justify-end">
            {ratingItems.map((item, idx) => (
              <motion.a
                key={item.platform}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="group flex items-center justify-between p-4 bg-brand-charcoal/40 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-brand-charcoal/70 rounded-2xl transition-all duration-300 w-full lg:w-[290px] text-left cursor-pointer shadow-lg"
              >
                <div className="flex items-center space-x-3.5">
                  {/* Rating Stars circle indicator */}
                  <div className={`p-2.5 rounded-xl ${item.bgColor} border ${item.borderColor} flex-shrink-0 relative`}>
                    <Star className={`w-5 h-5 ${item.color} fill-current`} />
                    <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 rounded-full bg-brand-obsidian border border-white/10 text-[8px] font-extrabold text-white">
                      {item.rating}
                    </span>
                  </div>

                  {/* Trust details */}
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-sans text-xs font-bold text-white tracking-wide uppercase">
                        {item.platform}
                      </span>
                      <span className="text-[8px] font-extrabold bg-brand-coral/15 text-brand-coral px-1.5 py-0.5 rounded-full tracking-wider uppercase">
                        {item.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Direct Action Indicator */}
                <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-brand-coral/20 group-hover:text-brand-coral transition-colors text-white/40">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}

            {/* Editorial Feature highlight tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-1 md:col-span-2 lg:col-span-1 flex items-center justify-center lg:justify-start space-x-2 bg-gradient-to-r from-brand-coral/10 via-[#1d212f]/30 to-transparent border border-brand-coral/20 rounded-2xl px-5 py-4 w-full lg:w-auto"
            >
              <Award className="w-4 h-4 text-brand-coral flex-shrink-0 animate-pulse" />
              <div className="text-left">
                <span className="text-[9px] font-bold tracking-widest text-brand-coral uppercase block">
                  EDITORIAL ACCLAIM
                </span>
                <span className="text-xs text-white/80 font-sans font-medium">
                  #1 Debut Poetry-Fiction Novelist
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}
