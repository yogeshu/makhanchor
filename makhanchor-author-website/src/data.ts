/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost, Review, Reel } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    category: 'REFLECTIONS',
    title: "Maybe It's the Weather",
    subtitle: 'Struggling to put transient emotions into words.',
    slug: 'maybe-its-the-weather',
    excerpt: "Maybe it's the weather. Maybe I'm thinking about the past I never truly had the chance to live...",
    date: 'July 12, 2026',
    readTime: '2 min read',
    imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=600&h=800&q=80',
    content: [
      "Maybe it's the weather. Maybe I'm thinking about the past I never truly had the chance to live.",
      "My days are full. I keep myself occupied with work, goals, and responsibilities. Yet somehow, I can never completely detach from those thoughts. They always find their way back.",
      "I think I need to understand myself more. But life feels strangely complicated right now.",
      "I want to be happy while I'm actually living a happy life. Why is that so difficult?",
      "Sometimes I wonder...",
      "Do I simply want love?",
      "Or do I need it?",
      "I can't even explain what I'm feeling.",
      "For the first time in a long time, I'm struggling to put my emotions into words.",
      "— Yogesh"
    ]
  },
  {
    id: 'blog-2',
    category: 'LOVE & LIFE',
    title: 'Successful Lovebirds',
    subtitle: 'How two people find each other and keep the spark alive.',
    slug: 'successful-lovebirds',
    excerpt: "I'm yet to understand how two people find each other, how they go on dates, how they approach one another...",
    date: 'July 08, 2026',
    readTime: '2 min read',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&h=800&q=80',
    content: [
      "I'm yet to understand how two people find each other, how they go on dates, how they approach one another, and how they know it's real.",
      "I'm not talking about those couples who spent their entire college life together and then cry about \"gharwale nahi maane.\"",
      "I'm talking about the successful lovebirds—the ones who still haven't lost their spark even after marriage.",
      "How?",
      "What god did you pray to?",
      "Either I'm operating on a completely different level from ordinary humans...",
      "or I'm simply too unlucky to understand any of this.",
      "All credits @the.makhanchor (yogesh)"
    ]
  },
  {
    id: 'blog-3',
    category: 'POETRY',
    title: 'Unconditional Love & The Moon’s Dream',
    subtitle: 'Living love raw and unfiltered, without walls or boundaries.',
    slug: 'unconditional-love',
    excerpt: 'At least I truly understand love and the ache it leaves behind. I don’t weave imaginary words...',
    date: 'July 01, 2026',
    readTime: '2 min read',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&h=800&q=80',
    mostLoved: true,
    content: [
      "At least I truly understand love and the ache it leaves behind. I don’t weave imaginary words to console others; I live love, raw and unfiltered, without walls or boundaries. Even when others urge me to let go, calling it unattainable, I hold on fiercely.",
      "I make the moon dare to dream of shining brighter than the sun, proving that even the impossible can crave the extraordinary.",
      "#love #unconditionallove"
    ]
  }
];

export const AmazonReviews = [
  {
    "name": "Rashmi (Bookish_maa)",
    "platform": "Amazon",
    "rating": 5,
    "quote": "A thought-provoking and emotionally resonant narrative that beautifully balances light and dark moments. A powerful reminder of the human capacity for love, resilience, and growth that lingers long after you finish reading."
  },
  {
    "name": "Karishmita Das",
    "platform": "Amazon",
    "rating": 4,
    "quote": "A soul-stirring read for anyone dealing with one-sided love. The author's raw honesty makes this book feel like a close friend, reminding you that you're not alone and that healing is possible."
  },
  {
    "name": "Anchal Agarwal",
    "platform": "Amazon",
    "rating": 5,
    "quote": "An honest and emotionally touching book that presents love as it truly is—raw, confusing, and deeply meaningful. The poems and shayaris add beautiful depth while reminding us that every heartbreak teaches us something valuable."
  },
  {
    "name": "Priya",
    "platform": "Amazon",
    "rating": 5,
    "quote": "A poignant masterpiece that explores the complexities of love with honesty and vulnerability. It's more than a love story—it's a reminder of how fragile and beautiful human connections can be."
  },
  {
    "name": "Meena",
    "platform": "Amazon",
    "rating": 5,
    "quote": "A heart-opening book that made me both laugh and cry. It beautifully shows that love isn't about what you expect, but what you give. Every person who has experienced one-sided love should read this."
  },
  {
    "name": "Samiksha Gaur",
    "platform": "Amazon",
    "rating": 5,
    "quote": "A beautiful, soul-touching read filled with raw vulnerability and poetic writing. It gently shows how one-sided love can break you, heal you, and teach you the importance of self-love."
  }
];

export const GoodreadsReviews = [
  {
    "name": "Rutuja",
    "rating": 5,
    "quote": "Love, Loss, and Life is a beautifully written book that really touched my heart. The way Yogesh Bhavsar weaves poetry into the narrative adds such a unique and emotional depth to the story... It's a short read, but it lingers with you long after you finish. A lovely blend of emotion and poetry."
  },
  {
    "name": "Reyan",
    "rating": 5,
    "quote": "Each page felt like a mirror reflecting my own emotions... The author writes with honesty and softness that makes you feel less alone in your own journey... It's a comforting read for anyone who's ever had their heart broken."
  },
  {
    "name": "Read with me",
    "rating": 5,
    "quote": "Love, Loss and Life feels less like a story and more like reading someone's private notebook... Some books end when you close them. This one stays—softly breaking and healing your heart at the same time."
  },
  {
    "name": "May",
    "rating": 5,
    "quote": "The Hindi poems and shayari woven into the story add so much depth... It feels honest. Heartbreak doesn't end you—it shapes you... A short read, but emotionally heavy in the best way."
  },
  {
    "name": "Khushi",
    "rating": 5,
    "quote": "This book beautifully explores one-sided love and the painful yet necessary journey of healing and moving on... Overall, this story is perfect for readers who want to experience love from the perspective of a boy who changes deeply without ever expressing his feelings."
  },
  {
    "name": "Krutika Gor",
    "rating": 4,
    "quote": "Love, Loss and Life is a heartfelt exploration of love, heartbreak, healing, and self-discovery. What I appreciated most was the honesty with which the author portrays human emotions. Healing is messy, growth is gradual, and every ending leaves behind a lesson."
  },
  {
    "name": "Abinaya Annadurai",
    "rating": 4,
    "quote": "It was good to see the journey from immaturity to maturity in understanding love. The poems and shayaris make the book even more engaging. A beautiful reminder that life is about new beginnings and finding strength after heartbreak."
  }
];

export const REVIEWS: Review[] = [
  ...AmazonReviews.map((rev, idx) => ({
    id: `amazon-extra-${idx}`,
    name: rev.name,
    rating: rev.rating,
    review: rev.quote,
    date: 'Verified Buyer',
    location: 'Amazon Verified',
    source: 'amazon' as const
  })),
  ...GoodreadsReviews.map((rev, idx) => ({
    id: `goodreads-extra-${idx}`,
    name: rev.name,
    rating: rev.rating,
    review: rev.quote,
    date: 'Reader Review',
    location: 'Goodreads Community',
    source: 'goodreads' as const
  }))
];

export const REELS: Reel[] = [
  {
    id: 'reel-1',
    title: '“She Speaks with Her Eyes...” 🌌 | Poetry Recitation',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=360&h=640&q=80',
    videoUrl: 'https://www.instagram.com/reel/DHOpwwKqzOR/embed/',
    views: '142K',
    likes: '18.5K'
  },
  {
    id: 'reel-2',
    title: 'The Lightning Strike of Devotion ⚡ | College Campus Memories',
    thumbnailUrl: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=360&h=640&q=80',
    videoUrl: 'https://www.instagram.com/reel/DK_rqL_xLBr/embed/',
    views: '96K',
    likes: '11.2K'
  },
  {
    id: 'reel-3',
    title: 'The Weakness of Expectations 💔 | Quiet Midnight Musings',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508780709619-79562169bc34?auto=format&fit=crop&w=360&h=640&q=80',
    videoUrl: 'https://www.instagram.com/reel/DZ5N9YbNmOQ/embed/',
    views: '275K',
    likes: '35.4K'
  },
  {
    id: 'reel-4',
    title: 'Messy Healing & Letting Go 🥀 | A Letter of Closure',
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=360&h=640&q=80',
    videoUrl: 'https://www.instagram.com/reel/DZ2Y-eUzkhv/embed/',
    views: '188K',
    likes: '24.1K'
  },
  {
    id: 'reel-5',
    title: 'Love Isn’t About Possession 📖 | Becoming Someone New',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=360&h=640&q=80',
    videoUrl: 'https://www.instagram.com/reel/DZxN7tSOKMS/embed/',
    views: '320K',
    likes: '44.8K'
  }
];


export const BOOK_METADATA = {
  title: "Love, Loss and Life",
  author: "Yogesh Bhavsar",
  subtitle: "A novel exploring the fragile threads of reality, healing, and the power of letting go.",
  description: "An emotionally raw, beautiful novel about a boy hopelessly romantic and entirely unaware of what the future holds, entangled in thoughts of her. Navigating 3 a.m. loneliness, expectations, and the path to forgiveness, it is an evocative story of healing and self-discovery.",
  purchaseUrl: "https://amzn.in/d/01LbyZYk",
  amazonUrl: "https://amzn.in/d/01LbyZYk",
  amazonAlternateUrl: "https://amzn.in/d/0bKUrvrX",
  amazonComUrl: "https://www.amazon.com/dp/B0DVSNG1FS",
  notionPressUrl: "https://notionpress.com/in/read/love-loss-and-life",
  flipkartUrl: "https://dl.flipkart.com/dl/love-loss-life/p/itm6d5cb8a359d5c?pid=9798897241460&lid=LSTBOK9798897241460YZGBCV&marketplace=FLIPKART&q=love+loss+and+life+book&store=bks&srno=s_1_32&otracker=search&otracker1=search&fm=Search&iid=bfa7067d-7527-4727-8081-39888aea7785.9798897241460.SEARCH&ppt=sp&ppn=sp&ssid=evs5lctji80000001783597700994&qH=813f493a4e8af835&ov_redirect=true&ov_redirect=true&_refId=&_appId=CL",
  goodreadsUrl: "https://www.goodreads.com/en/book/show/226728159-love-loss-and-life",
  readers: "600+",
  instagramFollowers: "150+",
  poemsWritten: "90+",
  booksSold: "600+",
  amazonReviews: "150+",
  goodreadsRatings: "90+",
  authorRole: "Author & Poet",
  isbn: "9798895033501"
};
