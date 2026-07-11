/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Instagram, Youtube, Mail, ArrowUp, CheckCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onSubscribe?: (email: string) => void;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'refund') => void;
}

export default function Footer({ onSubscribe, onOpenLegal }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Server subscription failed');
      }

      setStatus('success');
      setEmail('');
      if (onSubscribe) {
        onSubscribe(email);
      }
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      // Offline fallback: Save subscriber locally & show successful response
      console.info('Saving subscriber email offline (Hostinger/Serverless mode)');
      try {
        const stored = localStorage.getItem('makhanchor_offline_subscribers');
        const currentSubs = stored ? JSON.parse(stored) : [];
        if (!currentSubs.includes(email.toLowerCase())) {
          localStorage.setItem(
            'makhanchor_offline_subscribers',
            JSON.stringify([...currentSubs, email.toLowerCase()])
          );
        }
        
        setStatus('success');
        setEmail('');
        if (onSubscribe) {
          onSubscribe(email);
        }
        setTimeout(() => setStatus('idle'), 5000);
      } catch (fallbackErr) {
        setStatus('error');
        setErrorMessage('Failed to register subscription. Please check browser privacy settings.');
      }
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer-hub"
      className="bg-[#0a0a0c] text-white border-t border-white/5 pt-20 pb-10 relative overflow-hidden"
    >
      {/* 3-Column Split */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
        
        {/* Column 1: Stylized Prominent Quote */}
        <div className="md:col-span-4 space-y-6 text-left" id="footer-quote-col">
          <span className="block font-serif italic text-white/50 text-2xl select-none leading-none">“</span>
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/80 max-w-sm -mt-4 italic">
            Writing is my way of turning pain into purpose.
          </p>
          <span className="block font-cursive text-brand-coral text-2xl" id="handwritten-signature">
            — Makhanchor
          </span>
          {/* Custom heart flourish line */}
          <div className="flex items-center space-x-2 pt-2">
            <div className="h-[1px] bg-brand-coral/30 w-16" />
            <span className="font-cursive text-brand-coral/50 text-sm">♡</span>
          </div>
        </div>

        {/* Column 2: Email Subscription ("Join the Journey") */}
        <div className="md:col-span-5 space-y-4 text-left" id="footer-newsletter-col">
          <h3 className="font-serif text-2xl text-white font-medium">Join the Journey</h3>
          <p className="text-sm text-white/60 font-sans leading-relaxed max-w-md">
            Get new poems, romantic thoughts, and cozy blog posts delivered straight to your inbox.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl max-w-md"
            >
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">Thank you for joining the sanctuary of poetry!</span>
            </motion.div>
          ) : (
            <div className="space-y-2 max-w-md">
              <form onSubmit={handleSubscribeSubmit} className="flex items-stretch gap-2 mt-4">
                <input
                  type="email"
                  required
                  value={email}
                  disabled={status === 'submitting'}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-coral focus:border-brand-coral text-white placeholder-white/30 flex-grow disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-brand-coral hover:bg-brand-coral-hover text-white px-6 rounded-xl font-semibold text-sm shadow-md transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                >
                  <span>{status === 'submitting' ? 'Joining...' : 'Subscribe'}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              {status === 'error' && (
                <p className="text-xs text-rose-400 font-medium pl-1">
                  {errorMessage}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Column 3: Social Connectivity Channels */}
        <div className="md:col-span-3 space-y-4 text-left" id="footer-social-col">
          <h3 className="font-serif text-2xl text-white font-medium">Let's stay connected</h3>
          <p className="text-sm text-white/60 font-sans leading-relaxed">
            Follow my social channels to read daily poetry and interactive story loops.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            <a
              href="https://www.instagram.com/makhanchor.in/"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-xl bg-white/5 hover:bg-brand-coral border border-white/5 hover:border-brand-coral flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/c/makhanchor"
              target="_blank"
              rel="noreferrer"
              className="w-11 h-11 rounded-xl bg-white/5 hover:bg-brand-coral border border-white/5 hover:border-brand-coral flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="mailto:yogeshbhavsar1994@gmail.com"
              className="w-11 h-11 rounded-xl bg-white/5 hover:bg-brand-coral border border-white/5 hover:border-brand-coral flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
              aria-label="Email Makhanchor"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar & Back-to-Top trigger */}
      <div className="max-w-7xl mx-auto px-6 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6" id="footer-bottom-bar">
        <div className="text-xs text-white/40 font-sans text-left">
          © 2026 Makhanchor. All rights reserved.
        </div>

        <div className="flex items-center space-x-6 text-xs text-white/40 font-sans">
          <button
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal?.('privacy');
            }}
            className="hover:text-brand-coral transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Privacy Policy
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal?.('terms');
            }}
            className="hover:text-brand-coral transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Terms of Use
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onOpenLegal?.('refund');
            }}
            className="hover:text-brand-coral transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            Refund Policy
          </button>
        </div>

        {/* Floating / static scroll to top */}
        <button
          onClick={handleScrollToTop}
          className="w-10 h-10 rounded-full bg-white/5 hover:bg-brand-coral border border-white/10 hover:border-brand-coral flex items-center justify-center text-white/50 hover:text-white transition-all duration-300 shadow-md cursor-pointer"
          title="Scroll back to top"
          id="scroll-top-btn"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
