'use client';

import React, { useState } from 'react';
import { gaEvent } from '../lib/ga'
import './AuthorPage.css';
import bookMockup from '../../app/assets/image/PosterWebsite.png';
import author from '../../app/assets/image/AImakhanchor.png';
import { ShoppingCart, Instagram, Youtube, ChevronDown, BookOpen, Heart, TrendingUp, Copy, Check, Zap, Award } from 'lucide-react';
import Image from 'next/image';

// Enhanced BuyButton Component with Coupon Badge
const BuyButton = ({
    variant = 'primary',
    children,
    icon: Icon,
    href,
    price,
    originalPrice,
    benefit,
    couponCode,
    discount,
    featured,
    onClick,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(couponCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        gaEvent('coupon_code_copied', { coupon_code: couponCode });
    };

    const baseClasses = "group relative rounded-2xl font-bold transition-all duration-300 flex flex-col gap-3 overflow-hidden w-full sm:w-auto backdrop-blur-sm";

    const variants = {
        primary: "px-8 py-6 md:py-8 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 hover:from-purple-500 hover:via-pink-500 hover:to-purple-600 text-white shadow-2xl shadow-purple-900/50 hover:shadow-purple-900/70 hover:scale-105 border border-purple-400/30 hover:border-purple-300/50",
        secondary: "px-8 py-6 md:py-8 bg-gradient-to-br from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-2xl shadow-amber-900/50 hover:shadow-amber-900/70 hover:scale-105 border-2 border-amber-300 hover:border-amber-200"
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClasses} ${variants[variant]} ${featured ? 'ring-2 ring-offset-2 ring-amber-400' : ''}`}
            onClick={onClick}
        >
            {featured && (
                <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 z-20">
                    <Zap className="w-3 h-3" />
                    BEST DEAL
                </div>
            )}

            <div className="relative z-10 w-full space-y-2">
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-7 h-7" />}
                    <span className="text-xl md:text-2xl font-black">{children}</span>
                </div>

                <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-black">{price}</span>
                        {originalPrice && (
                            <span className="text-lg line-through opacity-75">{originalPrice}</span>
                        )}
                        {discount && (
                            <span className="bg-white/20 px-2 py-1 rounded text-sm font-bold">{discount}% OFF</span>
                        )}
                    </div>
                </div>

                {benefit && <p className="text-sm md:text-base font-semibold opacity-90">{benefit}</p>}

                {couponCode && (
                    <div
                        className="mt-3 bg-white/10 border border-white/20 rounded-lg p-2 flex items-center justify-between gap-2 cursor-pointer hover:bg-white/15 transition-colors"
                        onClick={handleCopy}
                    >
                        <div className="flex items-center gap-2 flex-1">
                            <Award className="w-4 h-4 text-amber-300" />
                            <span className="font-mono font-bold text-sm">{couponCode}</span>
                        </div>
                        {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                        ) : (
                            <Copy className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                        )}
                    </div>
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </a>
    );
};

// Purchase Guide Component
const PurchaseGuide = () => {
    const steps = [
        {
            title: "Choose Your Edition",
            desc: "Pick Amazon for fastest delivery with Prime, or NotionPress for the best price with direct author support",
            icon: ShoppingCart
        },
        {
            title: "Apply Coupon Code",
            desc: "Use code LOVELOSS175 on NotionPress for maximum savings and support independent publishing",
            icon: Award
        },
        {
            title: "Complete Purchase",
            desc: "Follow the secure checkout process on your chosen platform",
            icon: Check
        },
        {
            title: "Receive & Enjoy",
            desc: "Get your copy delivered and start your transformative journey through poetry",
            icon: BookOpen
        }
    ];

    return (
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">How to Get Your Copy</h3>
            <div className="grid md:grid-cols-4 gap-4 md:gap-6">
                {steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                        <div key={i} className="relative">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h4 className="font-bold text-white">{step.title}</h4>
                                <p className="text-sm text-slate-300">{step.desc}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-6 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
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
            <Image src={bookMockup} alt="Love, Loss, and Life Book Cover" width={300} height={400} className="w-full h-auto rounded-2xl shadow-2xl transform hover:rotate-y-6 hover:scale-105 transition-transform duration-500" />
        </div>
    );
};

// Main Landing Page
export default function AuthorPage() {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            question: "What is 'Love, Loss, and Life' about?",
            answer: "A book focused on love, loss, and life weaves a poignant narrative that explores human emotions. It delves into romantic connections, the heartache of parting, and the resilience needed to navigate existence. Through vivid storytelling, readers experience the joy of new love, the sorrow of loss, and the hope life offers. Characters undergo transformative journeys that challenge their perceptions and foster growth, highlighting the beauty and fragility of life. This exploration of universal themes invites readers to reflect on their own experiences."
        },
        {
            question: "Who is this book for?",
            answer: "This book is for anyone who has loved deeply, experienced loss, or is on a journey of self-discovery. Whether you're navigating a relationship, healing from heartbreak, or seeking motivation, these poems offer companionship and understanding."
        },
        {
            question: "What makes this novel unique?",
            answer: "Written by Makhanchor (Yogesh Bhavsar), this book blends contemporary style with timeless emotions. The poems are raw, relatable, and crafted to resonate with modern readers who seek authenticity in art."
        },
        {
            question: "Which platform should I buy from?",
            answer: "Amazon is perfect for fastest delivery with Prime eligibility and convenience. NotionPress offers the best price at ₹175 AND includes the coupon code LOVELOSS175 for additional savings, plus direct support for the independent author. Choose NotionPress to directly support Makhanchor!"
        },
        {
            question: "How do I use the coupon code LOVELOSS175?",
            answer: "Simply go to NotionPress, add the book to your cart, and enter the coupon code LOVELOSS175 at checkout. The discount will be automatically applied, giving you the best possible price while supporting the author directly."
        },
        {
            question: "Can I gift this book?",
            answer: "Absolutely! 'Love, Loss, and Life' makes a thoughtful gift for poetry lovers, book clubs, or anyone experiencing major life transitions. Both platforms offer gift options and easy digital delivery."
        },
        {
            question: "Is this book available internationally?",
            answer: (
                <>
                    Yes! The book is available for international shipping.<br />
                    <strong>Order from:</strong>
                    <span className="list-disc list-inside mt-2">
                        <li>
                            <a
                                href="https://a.co/d/hhwzXlh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-300 underline hover:text-pink-300"
                            >
                                Amazon.com (Worldwide)
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.barnesandnoble.com/w/love-loss-and-life-yogesh-bhavsar/1147025903"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-300 underline hover:text-pink-300"
                            >
                                Barnes &amp; Noble (US/International)
                            </a>
                        </li>
                    </span>
                    <span className="block mt-2">
                        Also Check options on NotionPress Website for India and other countries.
                    </span>
                </>
            )
        }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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
                                    "Love, Loss, and Life" - A deeply moving story of love, heartbreak, and the quiet strength it takes to live on.
                                </p>
                            </div>

                            <div className="pt-4 space-y-6">
                                <div>
                                    <p className="text-sm text-purple-300 uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        Get Your Copy Now
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <BuyButton
                                            onClick={() => gaEvent('buy_notionpress_clicked', { platform: 'NotionPress', label: 'hero_learn_more' })}
                                            variant="secondary"
                                            icon={Award}
                                            href="https://notionpress.com/in/read/love-loss-and-life"
                                            price="₹175"
                                            originalPrice="₹299"
                                            benefit="✓ Best Price • Delivery included"
                                            couponCode="LOVELOSS175"
                                            discount={42}
                                            featured={true}
                                        >
                                            NotionPress
                                        </BuyButton>

                                        <BuyButton
                                            onClick={() => gaEvent('buy_amazon_clicked', { platform: 'Amazon', label: 'hero_learn_more' })}
                                            variant="primary"
                                            icon={ShoppingCart}
                                            href="https://amzn.in/d/4H2hwRy"
                                            price="₹224"
                                            originalPrice="₹249"
                                            benefit="✓ Prime: Free Delivery • 10% OFF"
                                            discount={10}
                                            format="paperback"
                                        >
                                            Amazon
                                        </BuyButton>
                                    </div>
                                </div>

                                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-100">
                                    <p className="font-semibold mb-1">💡 Pro Tip:</p>
                                    <p>Use NotionPress with coupon code <span className="font-mono font-bold text-amber-300">LOVELOSS175</span> to get the best deal and support the author directly!</p>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-slate-900" />
                                    ))}
                                </div>
                                <span className="font-medium">500+ readers • 4.6★ rating</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to Purchase Section */}
            <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-5xl mx-auto">
                    <PurchaseGuide />
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
                        Why Readers Love This Novel
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[
                            { icon: Heart, title: 'Deeply Emotional', desc: 'Raw, authentic poetry and write-ups that speak to the heart and soul of human experience', color: 'from-pink-500 to-rose-500' },
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
                            "Love, Loss, and Life" - A deeply moving story of love, heartbreak, and the quiet strength it takes to live on.
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-8">
                            {[
                                { title: 'Romance & Love', desc: 'Passionate verses exploring desire, connection, and the intoxication of love', gradient: 'from-pink-500 to-purple-500' },
                                { title: 'Healing & Loss', desc: 'Poems that honor grief, validate pain, and guide you toward healing', gradient: 'from-purple-500 to-indigo-500' },
                                { title: 'Growth & Life', desc: 'Motivational Novel celebrating resilience, wisdom, and personal transformation', gradient: 'from-indigo-500 to-pink-500' }
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
                            <Image src={author} alt="Makhanchor (Yogesh Bhavsar)" width={192} height={192} className="w-full h-full rounded-full object-cover" />
                        </div>

                        <div className="flex-1 space-y-6">
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">About Makhanchor</h2>
                            <p className="text-base md:text-lg text-slate-200 leading-relaxed">
                                Yogesh Bhavsar, known as “Makhanchor”, writes poetry and write-ups inspired by personal experiences of love, loss, self-doubt, healing, and quiet hope. His work is rooted in emotional honesty, combining traditional sensitivity with a contemporary voice, appealing to readers seeking reflection over performance. Makhanchor’s words resonate during moments when emotions feel heavy, unspoken, or hard to express, offering comfort and connection to thousands of readers through that shared silence.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    onClick={() => gaEvent('follow_instagram_clicked', { platform: 'Instagram', label: 'author_section' })}
                                    href="https://www.instagram.com/the.makhanchor?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-semibold transition-all hover:scale-105 shadow-lg"
                                >
                                    <Instagram className="w-5 h-5" />
                                    <span>Follow on Instagram</span>
                                </a>
                                <a
                                    onClick={() => gaEvent('follow_youtube_clicked', { platform: 'YouTube', label: 'author_section' })}
                                    href="https://www.youtube.com/@makhanchor646"
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
                                onClick={() => {
                                    setOpenFAQ(openFAQ === index ? null : index);
                                    gaEvent('faq_item_clicked', { question: faq.question, label: 'faq_section', name: faq.question });
                                }}
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
                            onClick={() => gaEvent('buy_notionpress_clicked', { platform: 'NotionPress', label: 'footer_cta' })}

                            variant="secondary"
                            icon={Award}
                            href="https://notionpress.com/in/read/love-loss-and-life"
                            price="₹175"
                            originalPrice="₹299"
                            benefit="✓ Best Price • Delivery included"
                            couponCode="LOVELOSS175"
                            discount={42}
                            featured={true}
                        >
                            NotionPress
                        </BuyButton>

                        <BuyButton
                            onClick={() => gaEvent('buy_amazon_clicked', { platform: 'Amazon', label: 'footer_cta' })}
                            variant="primary"
                            icon={ShoppingCart}
                            href="https://amzn.in/d/4H2hwRy"
                            price="₹224"
                            originalPrice="₹249"
                            benefit="✓ Prime: Free Delivery • 10% OFF"
                            discount={10}
                            format="paperback"
                        >
                            Amazon
                        </BuyButton>
                    </div>
                </div>
            </section>

            {/* Footer - Full Width */}
            <footer className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
                <div className="w-full max-w-7xl mx-auto text-center text-slate-400 text-sm">
                    <p>© 2025 Makhanchor (Yogesh Bhavsar). All rights reserved. | Novel: Love, Loss, and Life</p>
                </div>
            </footer>
        </div>
    );
}