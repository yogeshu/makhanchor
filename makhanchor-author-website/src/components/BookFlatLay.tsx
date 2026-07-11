/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import BookCover from './BookCover';

interface BookFlatLayProps {
  className?: string;
}

export default function BookFlatLay({ className = '' }: BookFlatLayProps) {
  return (
    <div 
      className={`relative w-full aspect-[4/5] max-w-[500px] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.25)] bg-[#b3c5af] p-6 flex items-center justify-center select-none ${className}`}
      id="aesthetic-quilted-flatlay"
    >
      {/* 1. Real Quilted Fabric Grid Stitching Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="quilt-stitch" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect 
              width="48" 
              height="48" 
              fill="none" 
              stroke="#2e3d2a" 
              strokeWidth="0.75" 
              strokeDasharray="2,3" 
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#quilt-stitch)" />
      </svg>

      {/* Fabric soft folds vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/15 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* 2. Dried Red Rose with long stem on the left */}
      <div className="absolute left-[8%] top-[12%] bottom-[10%] w-[15%] z-20 pointer-events-none opacity-90">
        <svg viewBox="0 0 100 500" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dried Rose Flower Bud (Burgundy/Crimson) */}
          <path 
            d="M 50 80 C 25 75, 20 120, 50 140 C 80 120, 75 75, 50 80 Z" 
            fill="#5a151b" 
            stroke="#3a0a0e" 
            strokeWidth="2"
          />
          <path 
            d="M 40 85 C 32 90, 35 110, 50 125 C 65 110, 68 90, 60 85 C 55 95, 45 95, 40 85 Z" 
            fill="#420d12" 
          />
          {/* Stem */}
          <path 
            d="M 50 140 Q 42 220, 48 300 T 52 460" 
            stroke="#3b482a" 
            strokeWidth="3.5" 
            strokeLinecap="round"
          />
          {/* Dried Leaves */}
          <path d="M 45 200 Q 20 185, 30 175 Q 40 180, 46 200" fill="#313d22" stroke="#1d2613" strokeWidth="1" />
          <path d="M 49 260 Q 75 250, 65 240 Q 55 245, 48 260" fill="#313d22" stroke="#1d2613" strokeWidth="1" />
          <path d="M 47 340 Q 25 330, 32 320 Q 40 325, 47 340" fill="#2d3b20" stroke="#1d2613" strokeWidth="1" />
        </svg>
      </div>

      {/* 3. Top-Left Card: Ghost Love (Dusty Rose) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -14 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="absolute left-[10%] top-[12%] w-[100px] h-[135px] bg-[#bf8281] rounded-lg shadow-[4px_6px_12px_rgba(0,0,0,0.18)] border border-white/10 p-2 flex flex-col items-center justify-between z-10"
      >
        {/* Soft pink heart background badge */}
        <div className="w-full h-full border border-white/20 rounded flex flex-col items-center justify-center relative bg-[#bf8281]/50">
          {/* Floating red hearts */}
          <div className="absolute top-2 text-[8px] text-red-600 animate-pulse">❤️</div>
          
          {/* Cute Ghosts representation */}
          <div className="flex space-x-2 mt-4">
            {/* Ghost 1 */}
            <div className="relative w-6 h-8 bg-white rounded-t-full flex flex-col justify-start pt-1.5 px-0.5 shadow-sm">
              <div className="flex justify-around w-full px-0.5">
                <div className="w-0.75 h-0.75 bg-black rounded-full" />
                <div className="w-0.75 h-0.75 bg-black rounded-full" />
              </div>
              <div className="text-[5px] text-red-500 text-center mt-1">♥</div>
            </div>
            {/* Ghost 2 */}
            <div className="relative w-6 h-8 bg-white rounded-t-full flex flex-col justify-start pt-1.5 px-0.5 shadow-sm">
              <div className="flex justify-around w-full px-0.5">
                <div className="w-0.75 h-0.75 bg-black rounded-full" />
                <div className="w-0.75 h-0.75 bg-black rounded-full" />
              </div>
              <div className="text-[5px] text-red-500 text-center mt-1">♥</div>
            </div>
          </div>
          
          <div className="text-[7px] font-serif text-white/80 tracking-wider mt-2 italic uppercase">
            Spooky Love
          </div>
        </div>
      </motion.div>

      {/* 4. Top-Right Card: Hands in Heart (Lilac Grid) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute right-[8%] top-[10%] w-[105px] h-[140px] bg-[#c5b9d3] rounded-lg shadow-[6px_8px_16px_rgba(0,0,0,0.18)] border border-white/10 p-2 z-10"
      >
        {/* Lilac grid pattern lines */}
        <div className="w-full h-full border border-white/20 rounded relative flex flex-col items-center justify-center bg-grid-lilac overflow-hidden">
          {/* Large white heart */}
          <div className="w-12 h-12 bg-white rounded-full relative flex items-center justify-center shadow-sm">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 text-xl">♥</div>
            
            {/* Stylized holding hands inside */}
            <svg viewBox="0 0 100 100" className="w-10 h-10 z-10 opacity-70" fill="none">
              {/* Hand 1 */}
              <path d="M 15 50 Q 35 40, 45 52" stroke="#5d4037" strokeWidth="4" strokeLinecap="round" />
              {/* Hand 2 */}
              <path d="M 85 48 Q 65 42, 53 51" stroke="#8d6e63" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          <div className="text-[7px] font-mono text-purple-900/60 tracking-widest mt-2 uppercase">
            Connected
          </div>
        </div>
      </motion.div>

      {/* 5. Center: The Book "Love, Loss and Life" */}
      <motion.div 
        initial={{ opacity: 0, y: 30, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -3 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.8 }}
        className="relative z-30 w-[190px] h-[270px] sm:w-[220px] sm:h-[310px] shadow-[12px_20px_45px_rgba(0,0,0,0.45)] rounded-r-lg group cursor-pointer"
      >
        <BookCover className="absolute inset-0 group-hover:scale-[1.02] transition-transform duration-500" />
        <div className="absolute top-0 right-0 w-[4px] h-full bg-gradient-to-r from-transparent to-white/15" />
      </motion.div>

      {/* 6. Bottom-Left Card: Lovebirds on Branch (Light Pink Grid) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -10 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute left-[6%] bottom-[12%] w-[100px] h-[135px] bg-[#ead4d8] rounded-lg shadow-[4px_8px_14px_rgba(0,0,0,0.18)] border border-white/10 p-2 z-10"
      >
        <div className="w-full h-full border border-white/20 rounded relative flex flex-col items-center justify-between p-1 bg-grid-pink">
          <div className="text-[6px] font-mono text-red-800/40 tracking-wider uppercase mt-1">Together</div>
          
          {/* Birds artwork */}
          <div className="relative w-full h-12 flex flex-col items-center justify-center">
            {/* Branch */}
            <div className="w-12 h-0.75 bg-amber-950/60 rounded-full absolute bottom-3" />
            
            {/* Two Birds */}
            <div className="flex space-x-1 absolute bottom-3">
              {/* Bird 1 */}
              <div className="w-4 h-4 bg-amber-700 rounded-full relative">
                <div className="w-1 h-1 bg-amber-400 rotate-45 absolute -right-0.5 top-1.5" />
                <div className="w-0.75 h-0.75 bg-white rounded-full absolute left-1 top-1" />
              </div>
              {/* Bird 2 */}
              <div className="w-4 h-4 bg-amber-600 rounded-full relative">
                <div className="w-1 h-1 bg-amber-400 rotate-45 absolute -left-0.5 top-1.5" />
                <div className="w-0.75 h-0.75 bg-white rounded-full absolute right-1 top-1" />
              </div>
            </div>

            {/* Little hearts floating */}
            <div className="absolute top-1 text-[7px] text-red-500 animate-bounce">♥</div>
          </div>
          
          <div className="h-1" />
        </div>
      </motion.div>

      {/* 7. Bottom-Right Card: I Love You Note (Deep Red with Hearts) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 25 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 16 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute right-[8%] bottom-[10%] w-[105px] h-[140px] bg-[#9a282b] rounded-lg shadow-[6px_10px_18px_rgba(0,0,0,0.22)] border border-white/10 p-2 z-10"
      >
        <div className="w-full h-full border border-white/20 rounded relative flex flex-col items-center justify-center p-2 overflow-hidden bg-[#9a282b]">
          {/* Small hearts background pattern */}
          <div className="absolute inset-0 opacity-15 flex flex-wrap gap-1 p-1 pointer-events-none select-none text-[5px]">
            {"♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥".split("").map((h, i) => (
              <span key={i}>♥</span>
            ))}
          </div>

          {/* White Sticky note overlay */}
          <div className="w-[85%] h-[80%] bg-white rounded-sm shadow-md rotate-3 p-1.5 flex flex-col justify-between z-10">
            <div className="text-[8px] font-cursive text-stone-800 leading-tight mt-1">
              I love <br /> you
            </div>
            
            {/* Draw a little pen */}
            <div className="self-end mr-1">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-stone-400" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
