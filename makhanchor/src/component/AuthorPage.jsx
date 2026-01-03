import React from 'react';
import { ShoppingCart, ExternalLink, Instagram, Youtube, Sparkles } from 'lucide-react';

// BuyButton Component - Isolated for analytics tracking
const BuyButton = ({ 
  variant = 'primary', 
  children, 
  icon: Icon, 
  href, 
  badge 
}) => {
  const baseClasses = "group relative px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center gap-3 overflow-hidden";
  const variants = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 hover:scale-105",
    secondary: "border-2 border-purple-500/50 hover:border-purple-400 text-purple-300 hover:bg-purple-950/50"
  };

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variants[variant]}`}
      onClick={() => {
        // Hook for analytics - user can add tracking here
        console.log(`Button clicked: ${children}`);
      }}
    >
      <span className="relative z-10 flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5" />}
        <span className="flex flex-col items-start">
          <span className="text-base">{children}</span>
          {badge && <span className="text-xs opacity-90 font-normal">{badge}</span>}
        </span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </a>
  );
};

// Book 3D Mockup Component
const BookMockup = () => {
  return (
    <div className="relative w-full max-w-md mx-auto perspective-1000">
      <div className="relative transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700">
        {/* Book Cover */}
        <div className="relative bg-gradient-to-br from-purple-900 via-pink-900 to-purple-950 rounded-r-lg shadow-2xl aspect-[2/3] overflow-hidden border-l-8 border-purple-950">
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />
          
          {/* Title on cover */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="space-y-6">
              <Sparkles className="w-12 h-12 text-pink-300 mx-auto" />
              <h3 className="font-serif text-4xl text-white leading-tight">
                Love, Loss,<br />and Life
              </h3>
              <div className="w-24 h-px bg-pink-400/60 mx-auto" />
              <p className="text-pink-200 text-sm tracking-widest uppercase font-medium">
                Makhanchor
              </p>
            </div>
          </div>
          
          {/* Spine effect */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-8 bg-purple-900/50 blur-xl rounded-full" />
      </div>
    </div>
  );
};

// Main Landing Page
export default function AuthorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Book Mockup */}
            <div className="order-2 lg:order-1 animate-fade-in">
              <BookMockup />
            </div>
            
            {/* Hero Content */}
            <div className="order-1 lg:order-2 space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h1 className="font-serif text-6xl md:text-7xl text-white leading-tight">
                  Love, Loss,<br />
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">and Life</span>
                </h1>
                <p className="text-xl text-slate-300 font-light leading-relaxed max-w-xl">
                  A journey through the fires of yearning and the quiet of healing.
                </p>
              </div>
              
              <div className="pt-4 space-y-4">
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
                  Choose Your Destination
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <BuyButton
                    variant="primary"
                    icon={ShoppingCart}
                    href="https://amazon.in"
                    badge="Fastest Delivery"
                  >
                    Order on Amazon
                  </BuyButton>
                  
                  <BuyButton
                    variant="secondary"
                    icon={ExternalLink}
                    href="https://notionpress.com"
                    badge="Best Price: ₹175"
                  >
                    Buy on NotionPress
                  </BuyButton>
                </div>
              </div>
              
              <div className="pt-8 flex items-center gap-4 text-sm text-slate-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-slate-900" />
                  ))}
                </div>
                <span>Join 1,000+ readers on this journey</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Poetry Hook Section */}
      <section className="py-32 px-6 relative overflow-hidden bg-slate-900/50">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center space-y-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto" />
            <blockquote className="font-serif text-3xl md:text-5xl text-white italic leading-relaxed">
              "Her presence ignited a fire I couldn't contain.<br />
              <span className="text-purple-300">A yearning so fierce it blurred joy and pain.</span>"
            </blockquote>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto" />
          </div>
        </div>
      </section>

      {/* About the Book */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-12">
            <h2 className="font-serif text-5xl text-white text-center">About the Book</h2>
            
            <p className="text-lg text-slate-300 leading-relaxed text-center max-w-2xl mx-auto">
              "Love, Loss, and Life" is a raw exploration of the human heart. Through verses that dance between passion and melancholy, this collection captures the essence of love's intoxication, the weight of loss, and the resilience found in living fully.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              {[
                { title: 'Romance', desc: 'The fire and tenderness of connection', gradient: 'from-pink-500 to-purple-500' },
                { title: 'Motivation', desc: 'Finding strength in vulnerability', gradient: 'from-purple-500 to-indigo-500' },
                { title: 'Self-Growth', desc: 'Healing through introspection', gradient: 'from-indigo-500 to-pink-500' }
              ].map((theme, i) => (
                <div key={i} className="text-center space-y-3 p-8 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 transition-all hover:transform hover:scale-105 backdrop-blur-sm">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.gradient} mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl`}>
                    {i + 1}
                  </div>
                  <h3 className="font-serif text-2xl text-white">{theme.title}</h3>
                  <p className="text-slate-400">{theme.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About the Author */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-slate-800/30 p-12 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-7xl font-serif text-white shadow-2xl shadow-purple-900/50 flex-shrink-0">
              M
            </div>
            
            <div className="flex-1 space-y-6">
              <h2 className="font-serif text-5xl text-white">Makhanchor</h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Yogesh Bhavsar writes under the pen name "Makhanchor" — a name that embodies the sweetness and mischief of life's most profound emotions. Through poetry, he distills complex feelings into verses that resonate with anyone who has loved, lost, and dared to live again.
              </p>
              
              <div className="flex gap-4 pt-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-medium transition-all hover:scale-105 shadow-lg"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium transition-all hover:scale-105"
                >
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-2xl text-center space-y-8">
          <h2 className="font-serif text-5xl text-white">
            Begin Your Journey
          </h2>
          <p className="text-slate-300 text-lg">
            Let these words be your companion through the beautiful chaos of being human.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <BuyButton
              variant="primary"
              icon={ShoppingCart}
              href="https://amazon.in"
            >
              Order on Amazon
            </BuyButton>
            <BuyButton
              variant="secondary"
              icon={ExternalLink}
              href="https://notionpress.com"
            >
              Buy on NotionPress
            </BuyButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="container mx-auto text-center text-slate-500 text-sm">
          <p>© 2025 Makhanchor. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .rotate-y-12 {
          transform: rotateY(-12deg);
        }
        
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out 0.2s backwards;
        }
      `}</style>
    </div>
  );
}