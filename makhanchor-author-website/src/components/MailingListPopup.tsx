/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, X, Check, Sparkles, Heart } from "lucide-react";
import { saveSubscriberToFirebase } from "../lib/firebase";

export default function MailingListPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Anti-bot security layers
  const [honeypot, setHoneypot] = useState("");
  const [isVerifiedHuman, setIsVerifiedHuman] = useState(false);
  const [mountTime] = useState(() => Date.now());

  useEffect(() => {
    // 1. Check if user already dismissed or subscribed
    const isStored = localStorage.getItem("makhanchor_mailing_list_interacted");
    if (isStored === "true") {
      return;
    }

    // Check query parameter ?test_popup=true for easy visual testing
    const urlParams = new URLSearchParams(window.location.search);
    const isTestMode = urlParams.get("test_popup") === "true";

    const delay = isTestMode ? 1500 : 30000; // 30 seconds normally, 1.5 seconds in test mode

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Persist closed state so we don't annoy the user
    localStorage.setItem("makhanchor_mailing_list_interacted", "true");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Layer 1: Honeypot trap check
    if (honeypot) {
      // Silently fail/succeed to trick bots
      setStatus("submitting");
      setTimeout(() => {
        setStatus("success");
        localStorage.setItem("makhanchor_mailing_list_interacted", "true");
        setTimeout(() => setIsOpen(false), 3000);
      }, 1000);
      return;
    }

    // Layer 2: Time-lock check (requires at least 2.5 seconds since component mounted)
    const secondsSinceMount = (Date.now() - mountTime) / 1000;
    if (secondsSinceMount < 2.5) {
      setErrorMessage("Verification failed. Please try again in a moment.");
      setStatus("error");
      return;
    }

    // Layer 3: Checkbox verification check
    if (!isVerifiedHuman) {
      setErrorMessage("Please confirm you are a human reader.");
      setStatus("error");
      return;
    }

    if (!email) {
      setErrorMessage("Please enter your email address.");
      setStatus("error");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");
   // Save subscriber to Firebase
    try {
      await saveSubscriberToFirebase(email);
    } catch (fbErr) {
      console.warn("Firebase subscriber save notice:", fbErr);
    }
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error("Server subscription failed");
      }

      setStatus("success");
      // Persist subscribed state
      localStorage.setItem("makhanchor_mailing_list_interacted", "true");

      // Auto close after 3 seconds on success
      setTimeout(() => {
        setIsOpen(false);
      }, 3500);
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
        
        setStatus("success");
        // Persist subscribed state
        localStorage.setItem("makhanchor_mailing_list_interacted", "true");

        // Auto close after 3 seconds on success
        setTimeout(() => {
          setIsOpen(false);
        }, 3500);
      } catch (fallbackErr) {
        setStatus("error");
        setErrorMessage("Failed to register subscription. Please check browser privacy settings.");
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mailing-list-popup"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm p-6 bg-white border border-brand-coral/20 rounded-2xl shadow-2xl backdrop-blur-md text-left"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1.5 text-brand-charcoal/40 hover:text-brand-charcoal/80 bg-black/5 hover:bg-black/10 rounded-full transition-all cursor-pointer"
            aria-label="Close subscription pop-up"
          >
            <X className="w-4 h-4" />
          </button>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-6 space-y-3"
            >
              <div className="p-4 bg-emerald-50 text-emerald-500 rounded-full">
                <Check className="w-8 h-8" />
              </div>
              <h4 className="font-sans font-bold text-brand-charcoal text-lg">
                Welcome to the Healing Space
              </h4>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed max-w-[260px]">
                You're now subscribed. Thank you for walking this path of love, loss, and self-discovery with us.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-brand-coral/10 text-brand-coral rounded-xl">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1 text-xs font-bold tracking-wider text-brand-coral uppercase">
                  <Sparkles className="w-3 h-3" />
                  <span>Makhanchor Healing Circles</span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="font-sans font-bold text-brand-charcoal text-base">
                  Join the Mailing List
                </h4>
                <p className="text-xs text-brand-charcoal/60 leading-relaxed">
                  Subscribe to receive heartfelt poetry, soulful stories, and quiet night reflections directly from Yogesh Bhavsar.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label htmlFor="popup-name" className="text-[10px] font-bold text-brand-charcoal/60 uppercase tracking-wider block">
                    Your Name (Optional)
                  </label>
                  <input
                    id="popup-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full text-xs px-3.5 py-2.5 bg-brand-charcoal/5 focus:bg-white border border-transparent focus:border-brand-coral/40 rounded-xl focus:ring-1 focus:ring-brand-coral/30 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="popup-email" className="text-[10px] font-bold text-brand-charcoal/60 uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <input
                    id="popup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full text-xs px-3.5 py-2.5 bg-brand-charcoal/5 focus:bg-white border border-transparent focus:border-brand-coral/40 rounded-xl focus:ring-1 focus:ring-brand-coral/30 outline-none transition-all"
                    required
                  />
                </div>

                {/* Honeypot anti-bot hidden field */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="phone_extension_backup"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Anti-Bot validation Checkbox */}
                <div className="flex items-center space-x-2 bg-brand-charcoal/5 p-2.5 rounded-xl border border-transparent hover:border-brand-coral/20 transition-all duration-300">
                  <input
                    type="checkbox"
                    id="popup-human-verification"
                    checked={isVerifiedHuman}
                    onChange={(e) => setIsVerifiedHuman(e.target.checked)}
                    className="w-4 h-4 rounded border-brand-charcoal/20 text-brand-coral focus:ring-brand-coral cursor-pointer accent-brand-coral"
                  />
                  <label htmlFor="popup-human-verification" className="text-[11px] text-brand-charcoal/75 select-none cursor-pointer font-medium">
                    I am a genuine human reader.
                  </label>
                </div>

                {status === "error" && (
                  <p className="text-[11px] text-rose-500 font-medium">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center space-x-2 bg-brand-charcoal hover:bg-black text-white font-semibold py-2.5 rounded-xl transition-all text-xs cursor-pointer shadow-md disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <span>Join the Space</span>
                      <Heart className="w-3.5 h-3.5 text-brand-coral fill-brand-coral animate-pulse" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-[10px] text-center text-brand-charcoal/40 pt-1">
                No spam. Unsubscribe at any time.
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
