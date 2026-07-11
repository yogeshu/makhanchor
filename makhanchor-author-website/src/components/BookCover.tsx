/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import heroLoveLossAndLifeCover from '../../assets/images/hero-love-loss-and-life.jpeg';

interface BookCoverProps {
  className?: string;
  src?: string;
}

export default function BookCover({ className = '', src = '' }: BookCoverProps) {
  const [hasError, setHasError] = useState(false);

  // Default to the local hero cover image, while still allowing overrides via src.
  const imageSrc = src || heroLoveLossAndLifeCover;

  const handleError = () => {
    setHasError(true);
  };

  if (!hasError) {
    return (
      <div 
        className={`relative w-full h-full rounded-r-lg overflow-hidden border border-white/10 select-none shadow-[0_20px_50px_rgba(0,0,0,0.55)] bg-[#0f0c1b] ${className}`}
        id="physical-book-cover"
      >
        <img 
          src={imageSrc} 
          className="w-full h-full object-cover" 
          alt="Love, Loss and Life Book Cover" 
          onError={handleError}
          referrerPolicy="no-referrer"
        />
        {/* Real 3D physical book overlays */}
        {/* Glossy left-spine shadow */}
        <div className="absolute top-0 left-0 w-[14px] h-full bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none z-20" />
        {/* Soft paper crease line */}
        <div className="absolute top-0 left-[14px] w-[1px] h-full bg-white/10 pointer-events-none z-20" />
        {/* Right page-edge fold highlight */}
        <div className="absolute top-0 right-0 w-[4px] h-full bg-gradient-to-r from-transparent to-white/15 pointer-events-none z-20" />
        {/* Diagonal paper specular reflection gloss */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-20" />
      </div>
    );
  }

  // Graceful minimalist CSS/HTML text-based fallback ONLY if the image fails to load.
  // This guarantees that the UI never displays a broken image icon.
  return (
    <div 
      className={`relative w-full h-full rounded-r-lg overflow-hidden border border-white/10 select-none shadow-[0_20px_50px_rgba(0,0,0,0.55)] bg-gradient-to-b from-[#15122b] to-[#030206] flex flex-col justify-between py-10 px-5 text-center ${className}`}
      id="physical-book-cover-fallback"
    >
      <div className="space-y-0.5">
        <span className="font-cursive text-[#fae1e8]/90 text-[18px] font-medium block leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          A novel by Yogesh
        </span>
        <span className="font-cursive text-[#fae1e8]/90 text-[18px] font-medium block leading-[1.1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Bhavsar
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="font-serif font-extrabold text-[24px] tracking-[0.05em] uppercase leading-tight drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)] bg-gradient-to-r from-[#ffeaa5] via-[#dfbe6b] to-[#fce498] bg-clip-text text-transparent">
          LOVE , LOSS
        </h2>
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#dfbe6b]/40 to-transparent w-16 mx-auto" />
        <h3 className="font-serif font-extrabold text-[21px] tracking-[0.08em] uppercase leading-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)] bg-gradient-to-r from-[#ffeaa5] via-[#dfbe6b] to-[#fce498] bg-clip-text text-transparent">
          AND LIFE
        </h3>
      </div>

      <div className="text-[8.5px] font-mono text-[#ffffff]/40 tracking-[0.2em] uppercase">
        Poetry & Prose
      </div>

      {/* 3D overlays on fallback */}
      <div className="absolute top-0 left-0 w-[14px] h-full bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 right-0 w-[4px] h-full bg-gradient-to-r from-transparent to-white/15 pointer-events-none z-20" />
    </div>
  );
}
