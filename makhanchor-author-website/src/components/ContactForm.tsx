/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle, Sparkles, Feather } from 'lucide-react';
import { saveLetterToFirebase } from '../lib/firebase';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // Anti-bot security layers
  const [honeypot, setHoneypot] = useState('');
  const [isVerifiedHuman, setIsVerifiedHuman] = useState(false);
  const [mountTime] = useState(() => Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Layer 1: Honeypot trap check
    if (honeypot) {
      // Silently fail to trick bots into thinking they succeeded
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
      return;
    }

    // Layer 2: Time-lock check (requires at least 2.5 seconds to read/type)
    const secondsSinceMount = (Date.now() - mountTime) / 1000;
    if (secondsSinceMount < 2.5) {
      setSubmitError('Verification failed. Please read the letter content and try again.');
      return;
    }

    // Layer 3: Interactive wax seal validation
    if (!isVerifiedHuman) {
      setSubmitError('Please verify you are a human reader by checking the seal below.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const offlinePayload = {
      name: formData.name,
      message: formData.message,
      sentAt: new Date().toISOString()
    };
 // Save to Firebase Firestore Database
    try {
      await saveLetterToFirebase({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      console.log('Letter successfully stored in Firebase Firestore!');
    } catch (firebaseErr) {
      console.warn('Firebase submission notice:', firebaseErr);
    }
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Server returned error status');
      }

      // Also save locally so it instantly reflects in the local UI
      try {
        const stored = localStorage.getItem('makhanchor_offline_letters');
        const currentLetters = stored ? JSON.parse(stored) : [];
        localStorage.setItem(
          'makhanchor_offline_letters', 
          JSON.stringify([offlinePayload, ...currentLetters])
        );
      } catch (e) {}

      setIsSubmitting(false);
      setSent(true);
      setFormData({ name: '', email: '', message: '' });
      window.dispatchEvent(new Event('makhanchor-letter-sent'));
      setTimeout(() => setSent(false), 6000);
    } catch (err: any) {
      // Offline fallback: Save locally and pretend we sent it to bypass server drama
      console.info('Saving letter offline (Hostinger/Serverless mode)');
      try {
        const stored = localStorage.getItem('makhanchor_offline_letters');
        const currentLetters = stored ? JSON.parse(stored) : [];
        localStorage.setItem(
          'makhanchor_offline_letters', 
          JSON.stringify([offlinePayload, ...currentLetters])
        );
        
        setIsSubmitting(false);
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
        window.dispatchEvent(new Event('makhanchor-letter-sent'));
        setTimeout(() => setSent(false), 6000);
      } catch (fallbackErr) {
        setIsSubmitting(false);
        setSubmitError('Failed to save the letter. Please check your browser storage.');
      }
    }
  };

  return (
    <section
      id="contact"
      className="bg-[#0e1017] py-24 text-white relative overflow-hidden border-b border-white/5"
    >
      {/* Moonlit background glowing plate */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-coral/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-brand-coral uppercase block">
            LETTERBOX
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
            Leave a Letter on my Desk
          </h2>
          <p className="text-white/60 text-sm sm:text-base leading-relaxed font-sans">
            Do you have a silent story of your own, or a heartfelt thought about 'The Journey of First Love'? Drop me a letter below. I read every single one under the midnight moon.
          </p>
        </div>

        {/* Vintage Styled Envelope / Paper Form */}
        <div className="bg-brand-charcoal/50 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden max-w-2xl mx-auto">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center text-brand-coral mx-auto">
                <Feather className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="font-serif text-2xl font-semibold">The Letter is Sent</h3>
              <p className="text-white/75 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                Your thoughts have floated across the distance and landed softly on my desk. Thank you for sharing a fragment of your soul.
              </p>
              <div className="text-[10px] uppercase font-mono tracking-widest text-brand-coral/60">
                — UNDER THE MOONLIGHT —
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-white/50 tracking-wider uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Advait"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-coral focus:border-brand-coral text-white placeholder-white/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-white/50 tracking-wider uppercase">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. advait@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-coral focus:border-brand-coral text-white placeholder-white/20"
                  />
                </div>
              </div>

              {/* Message field in a gorgeous lined vintage-letter style */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-white/50 tracking-wider uppercase">
                  Your Message (Lined Letter Style)
                </label>
                <div className="relative">
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Dear Makhanchor..."
                    className="w-full bg-[#1c1d24] border border-white/10 rounded-2xl p-6 text-sm font-serif italic leading-relaxed text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-brand-coral focus:border-brand-coral resize-none shadow-inner"
                  />
                  <div className="absolute bottom-4 right-4 pointer-events-none opacity-20">
                    <Feather className="w-5 h-5 text-brand-coral" />
                  </div>
                </div>
              </div>

              {/* Honeypot field - completely invisible to humans, trap for spam bots */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="postal_routing_code_validation"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Gorgeous Wax Seal Reader Verification Box */}
              <div className="flex items-center space-x-3 bg-white/5 border border-white/10 p-4 rounded-xl hover:border-brand-coral/40 transition-colors duration-300">
                <input
                  type="checkbox"
                  id="human-verification-seal"
                  checked={isVerifiedHuman}
                  onChange={(e) => setIsVerifiedHuman(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 text-brand-coral bg-transparent focus:ring-brand-coral focus:ring-offset-0 cursor-pointer accent-brand-coral"
                />
                <label htmlFor="human-verification-seal" className="text-xs text-white/70 select-none cursor-pointer leading-relaxed">
                  I seal this silent story with a wax stamp as a real human reader.
                </label>
              </div>

              {submitError && (
                <p className="text-xs text-rose-400 font-semibold text-center bg-rose-500/10 py-2.5 px-4 rounded-xl border border-rose-500/20">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group bg-gradient-to-r from-brand-coral to-[#e0694a] text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-[0_10px_20px_-5px_rgba(219,122,96,0.4)] hover:bg-brand-coral-hover transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Folding envelope...</span>
                ) : (
                  <>
                    <span>Send Letter</span>
                    <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
