'use client';

import React, { useState } from 'react';
import './AuthorPage.css';
import { ShoppingCart, ExternalLink, Instagram, Youtube, Sparkles, ChevronDown, BookOpen, Heart, TrendingUp } from 'lucide-react';

// BuyButton Component - Isolated for analytics tracking
const BuyButton = ({ 
  variant = 'primary', 
  children, 
  icon: Icon, 
  href, 
  price,
  benefit
}) => {
  const baseClasses = "group relative px-6 py-5 rounded-xl font-bold transition-all duration-300 flex flex-col items-start gap-2 overflow-hidden w-full sm:w-auto min-w-[280px]";
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-xl shadow-purple-900/40 hover:shadow-purple-900/60 hover:scale-105",
    secondary: "bg-slate-800 hover:bg-slate-700 border-2 border-purple-500 text-white shadow-xl shadow-slate-900/40 hover:shadow-slate-900/60 hover:scale-105"
  };

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variants[variant]}`}
      onClick={() => {
        console.log(`Button clicked: ${children}`);
      }}
    >
      <span className="relative z-10 w-full">
        <span className="flex items-center gap-3 text-lg">
          {Icon && <Icon className="w-6 h-6" />}
          <span>{children}</span>
        </span>
        {price && <span className="text-2xl font-black mt-1">{price}</span>}
        {benefit && <span className="text-sm font-normal opacity-90">{benefit}</span>}
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </a>
  );
};

// FAQ Component
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-700 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 px-6 flex items-start justify-between gap-4 text-left hover:bg-slate-800/30 transition-colors"
      >
        <span className="text-lg font-semibold text-white flex-1">{question}</span>
        <ChevronDown className={`w-6 h-6 text-purple-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <p className="px-6 pb-6 text-slate-300 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// Book 3D Mockup Component
const BookMockup = () => {
  return (
    <div className="relative w-full max-w-sm mx-auto perspective-1000">
      <div className="relative transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700">
        <div className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-purple-950 rounded-r-lg shadow-2xl aspect-[2/3] overflow-hidden border-l-8 border-purple-950">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="space-y-6">
              <Sparkles className="w-12 h-12 text-pink-300 mx-auto" />
              <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                Love, Loss,<br />and Life
              </h3>
              <div className="w-24 h-px bg-pink-400/60 mx-auto" />
              <p className="text-pink-200 text-sm tracking-widest uppercase font-medium">
                Makhanchor
              </p>
            </div>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-purple-900/50 blur-xl rounded-full" />
      </div>
    </div>
  );
};

// Main Landing Page
export default function AuthorPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "What is 'Love, Loss, and Life' about?",
      answer: "This poetry collection explores the depths of human emotion through three interconnected themes: the intoxication of love, the weight of loss, and the resilience found in living fully. Each poem is a window into the raw, unfiltered experience of being human."
    },
    {
      question: "Who is this book for?",
      answer: "This book is for anyone who has loved deeply, experienced loss, or is on a journey of self-discovery. Whether you're navigating a relationship, healing from heartbreak, or seeking motivation, these poems offer companionship and understanding."
    },
    {
      question: "What makes this poetry collection unique?",
      answer: "Written by Makhanchor (Yogesh Bhavsar), this collection blends contemporary style with timeless emotions. The poems are raw, relatable, and crafted to resonate with modern readers who seek authenticity in art."
    },
    {
      question: "Which edition should I buy?",
      answer: "Both editions contain the same beautiful poetry. Choose Amazon for fastest delivery (Prime eligible), or NotionPress for the best price at ₹175 with direct author support."
    },
    {
      question: "Can I gift this book?",
      answer: "Absolutely! 'Love, Loss, and Life' makes a thoughtful gift for poetry lovers, book clubs, or anyone experiencing major life transitions. Both platforms offer gift options."
    },
    {
      question: "Is this book available internationally?",
      answer: "Yes! The book is available through Amazon for international shipping. NotionPress primarily serves Indian readers with the most competitive pricing."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section - Full Width */}
      <section className="min-h-screen flex items-center justify-center py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Book Mockup */}
            <div className="order-2 lg:order-1 animate-fade-in px-4">
              <BookMockup />
            </div>
            
            {/* Hero Content */}
            <div className="order-1 lg:order-2 space-y-6 md:space-y-8 animate-fade-in-up px-4">
              <div className="space-y-4">
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight">
                  Love, Loss,<br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">and Life</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-200 font-light leading-relaxed">
                  A transformative poetry collection exploring romance, healing, and self-discovery through 100+ powerful verses
                </p>
              </div>
              
              <div className="pt-4 space-y-4">
                <p className="text-sm text-white uppercase tracking-wider font-bold">
                  Get Your Copy Now
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <BuyButton
                    variant="primary"
                    icon={ShoppingCart}
                    href="https://amazon.in"
                    price="₹199"
                    benefit="✓ Prime Delivery • Fastest Shipping"
                  >
                    Amazon
                  </BuyButton>
                  
                  <BuyButton
                    variant="secondary"
                    icon={ExternalLink}
                    href="https://notionpress.com"
                    price="₹175"
                    benefit="✓ Best Price • Direct from Publisher"
                  >
                    NotionPress
                  </BuyButton>
                </div>
              </div>
              
              <div className="pt-6 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-slate-900" />
                  ))}
                </div>
                <span className="font-medium">1,000+ readers • 4.8★ rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Poetry Hook Section - Full Width */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-slate-900/50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto" />
            <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white italic leading-relaxed">
              "Her presence ignited a fire I couldn't contain.<br />
              <span className="text-purple-300">A yearning so fierce it blurred joy and pain.</span>"
            </blockquote>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto" />
          </div>
        </div>
      </section>

      {/* Why This Book - New Section for SEO */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white text-center mb-12">
            Why Readers Love This Poetry Collection
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: Heart, title: 'Deeply Emotional', desc: 'Raw, authentic poetry that speaks to the heart and soul of human experience', color: 'from-pink-500 to-rose-500' },
              { icon: BookOpen, title: 'Easy to Read', desc: 'Contemporary language that resonates with modern readers of all ages', color: 'from-purple-500 to-indigo-500' },
              { icon: TrendingUp, title: 'Transformative', desc: 'Poetry that inspires personal growth, healing, and self-discovery', color: 'from-indigo-500 to-purple-500' }
            ].map((item, i) => (
              <div key={i} className="p-6 md:p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all hover:transform hover:scale-105 backdrop-blur-sm">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} mb-4 flex items-center justify-center`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Book - Full Width */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto">
          <div className="space-y-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white text-center">About the Book</h2>
            
            <p className="text-lg text-slate-200 leading-relaxed text-center max-w-3xl mx-auto">
              "Love, Loss, and Life" is a comprehensive poetry collection featuring over 100 original poems that explore the full spectrum of human emotion. From the euphoria of new love to the depths of heartbreak, from moments of despair to the triumph of self-discovery, this book is your companion through life's most profound experiences.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-8">
              {[
                { title: 'Romance & Love', desc: 'Passionate verses exploring desire, connection, and the intoxication of love', gradient: 'from-pink-500 to-purple-500' },
                { title: 'Healing & Loss', desc: 'Poems that honor grief, validate pain, and guide you toward healing', gradient: 'from-purple-500 to-indigo-500' },
                { title: 'Growth & Life', desc: 'Motivational poetry celebrating resilience, wisdom, and personal transformation', gradient: 'from-indigo-500 to-pink-500' }
              ].map((theme, i) => (
                <div key={i} className="text-center space-y-3 p-6 md:p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all hover:transform hover:scale-105 backdrop-blur-sm">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${theme.gradient} mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl`}>
                    {i + 1}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-white">{theme.title}</h3>
                  <p className="text-slate-300">{theme.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About the Author - Full Width */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30">
        <div className="w-full max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 bg-slate-800/30 p-6 md:p-12 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl md:text-7xl font-serif text-white shadow-2xl shadow-purple-900/50 flex-shrink-0">
              M
            </div>
            
            <div className="flex-1 space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">About Makhanchor</h2>
              <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                Yogesh Bhavsar, writing as "Makhanchor," is an Indian poet known for his emotionally resonant and relatable verse. Drawing from personal experience and universal human emotions, Makhanchor creates poetry that bridges traditional sensibility with contemporary expression. His work has touched thousands of readers seeking connection, healing, and inspiration through the written word.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold transition-all hover:scale-105 shadow-lg"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Follow on Instagram</span>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all hover:scale-105"
                >
                  <Youtube className="w-5 h-5" />
                  <span>Watch on YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Full Width */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="bg-slate-800/30 rounded-2xl border border-slate-700 backdrop-blur-sm overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA - Full Width */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">
            Begin Your Journey Today
          </h2>
          <p className="text-slate-200 text-lg leading-relaxed">
            Join thousands of readers who have found solace, inspiration, and connection in these pages. Let these words be your companion through the beautiful chaos of being human.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <BuyButton
              variant="primary"
              icon={ShoppingCart}
              href="https://amazon.in"
              price="₹199"
              benefit="Prime Delivery"
            >
              Order on Amazon
            </BuyButton>
            <BuyButton
              variant="secondary"
              icon={ExternalLink}
              href="https://notionpress.com"
              price="₹175"
              benefit="Best Price"
            >
              Buy on NotionPress
            </BuyButton>
          </div>
        </div>
      </section>

      {/* Footer - Full Width */}
      <footer className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="w-full max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>© 2025 Makhanchor (Yogesh Bhavsar). All rights reserved. | Poetry Book: Love, Loss, and Life</p>
        </div>
      </footer>
    </div>
  );
}