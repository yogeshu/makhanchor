/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BlogPost, Review, Reel } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    category: 'LOVE & LIFE',
    title: 'The Belonging',
    subtitle: 'Moments that precede the breaking of ones solitude, where belonging is felt even when unspoken.',
    slug: 'the-belonging',
    excerpt: "But love is not a simple declaration—it is a silent upheaval...",
    date: 'June 28, 2026',
    readTime: '2 min read',
    imageUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=600&h=800&q=80',
    content: [
      "You know now what it is to be in love and to say, with pride and vulnerability, that someone has captured your heart. But love is not a simple declaration—it is a silent upheaval, a transformation often unnoticed by the world.",
      "This chapter is not about the change love brings but about the moments that precede the breaking of one's solitude, where belonging is felt even when it's unspoken.",
      "Our boy, hopelessly romantic and entirely unaware of what the future holds, finds himself entangled in thoughts of her."
    ]
  },
  {
    id: 'blog-2',
    category: 'HEALING',
    title: 'The Duality of Healing',
    subtitle: 'Why night brings a relentless tide of loneliness, and the journal becomes a sanctuary.',
    slug: 'the-duality-of-healing',
    excerpt: 'Love can be anything, but expectations—they are the weakness that breaks us...',
    date: 'May 14, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&h=800&q=80',
    content: [
      "During the day, the boy felt composed, his time filled with acts of self-discovery and growth. He read religious books and trusted in karma, believing that everything would eventually find its place.",
      "But when night fell, it brought with it a relentless tide of loneliness. The stillness of 3 a.m. became his battlefield when suppressed feelings surged forth, unrelenting and raw.",
      "Tears would stain his pillow, his screams stifled by the need to maintain a facade of normalcy. He could not let his family see his pain. Instead, his journal became his sanctuary. By moonlight, he poured his heart onto pages, his words the only witnesses to his anguish.",
      "'Love can be anything,' he wrote one night. 'But expectations—they are the weakness that breaks us. True love must learn to let go, to give without conditions, to accept without needing validation.'"
    ]
  },
  {
    id: 'blog-3',
    category: 'POETRY',
    title: 'The Weight of Moving On',
    subtitle: 'When the writing shifts. It is no longer about her. It is about him.',
    slug: 'the-weight-of-moving-on',
    excerpt: 'She speaks with her eyes, and only I understand the language they hold...',
    date: 'April 02, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&h=800&q=80',
    mostLoved: true,
    content: [
      "He poured his emotions into words, hoping to untangle the mess within. But this time, his writing shifted. It was no longer about her. It was about him. About healing. About finding closure.",
      "Still, old habits die hard. One day, he stumbled across an old write-up he had penned for her:",
      "'She speaks with her eyes, and only I understand the language they hold. In the depths of those unspoken words, I find myself craving more—not just her presence, but the quiet secrets, the universe only she knows.'",
      "'Her gaze is filled with stories of stars that dare to dance alone, of whispers that travel through galaxies, and of angels that linger unseen. Her eyes are like an uncharted world, a boundless truth trying to anchor me, to keep me from unravelling the fragile threads of reality. She is my peace, the reason the world feels gentle, as though her quiet strength alone could still the chaos in all of us.'",
      "Could someone who wrote such words move on quickly? The answer was clear."
    ]
  },
  {
    id: 'blog-4',
    category: 'REFLECTIONS',
    title: 'Forgiveness and Freedom',
    subtitle: 'Releasing both of you: her from expectations, and yourself from regret.',
    slug: 'forgiveness-and-freedom',
    excerpt: 'Acceptance didn\'t come quickly. It required him to confront his deepest wounds...',
    date: 'March 19, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1505236851219-540722df1206?auto=format&fit=crop&w=600&h=800&q=80',
    content: [
      "Acceptance didn't come quickly. It required him to confront his deepest wounds and, most importantly, to forgive—not only the girl who had unknowingly caused his heartbreak but also himself. He had waged an internal war for months, blaming his heart for feeling too deeply and his mind for replaying memories in endless loops.",
      "But then, clarity began to dawn. He realized the girl wasn't responsible for his pain; her indifference wasn't cruelty. It was simply her truth.",
      "Just as his love reflected his reality, her lack of reciprocation reflected hers. Forgiveness became his means of releasing them both—her from unspoken expectations and himself from the chains of regret."
    ]
  },
  {
    id: 'blog-5',
    category: 'REFLECTIONS',
    title: 'Words as Healing',
    subtitle: 'Love isn\'t about possessing someone; it\'s about becoming someone.',
    slug: 'words-as-healing',
    excerpt: 'True love is a force that can bring life to a desert...',
    date: 'February 10, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1511108690759-009324a90311?auto=format&fit=crop&w=600&h=800&q=80',
    content: [
      "The boy's journal entries became his refuge and a tool for reflection. One evening, he wrote:",
      "'Love isn't about possessing someone; it's about becoming someone. It's about growing into the kind of person who can love deeply, even without guarantees. True love isn't defined by physical touch or the need to hold someone close.'",
      "'It's magical—a force that can bring life to a desert and joy to the darkest corners of the heart.'",
      "These words, scribbled late at night, gave him the strength to face another day. Gradually, his anguish began to transform into wisdom, heartbreak into resilience."
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Aanya Sharma',
    rating: 5,
    review: "This novel felt like someone had sneaked into my personal journal and turned my most private heartaches into a beautiful story. The transition of the boy's emotions from intense unrequited love to healing and self-discovery is written with so much raw vulnerability. I cried, I smiled, and I finally felt understood. Highly recommended!",
    date: '2 weeks ago',
    location: 'Mumbai, India',
    source: 'amazon'
  },
  {
    id: 'rev-2',
    name: 'Rohan Mehta',
    rating: 5,
    review: "I have never been much of a novel reader, but Yogesh's words hit different. He captures the exact nuance of loving someone silently and the immense weight of holding on. The concept of 3 a.m. loneliness, expectations, and ultimate forgiveness is portrayed beautifully. 'Love, Loss and Life' is a masterpiece of modern romantic fiction.",
    date: '1 month ago',
    location: 'Delhi, India',
    source: 'goodreads'
  },
  {
    id: 'rev-3',
    name: 'Kavya Nair',
    rating: 5,
    review: "A soft, beautiful balm for a grieving soul. The letters, the journal format, the raw 3 a.m. emotions... everything about this book is crafted with pure love. It teaches you that true love isn't about possessing someone, but growing into a better version of yourself. I read it cover to cover in one sitting!",
    date: '3 days ago',
    location: 'Bangalore, India',
    source: 'amazon'
  },
  {
    id: 'rev-4',
    name: 'Arjun Verma',
    rating: 5,
    review: "Some lines hit so close to home that I had to close the book and just breathe for a few minutes. Yogesh captures the exact nuances of loving someone silently and the weight of holding on. The story of the boy under the umbrella in the rain, confronting his expectations, is so relatable. It is a slow, therapeutic burn.",
    date: '3 weeks ago',
    location: 'Pune, India',
    source: 'goodreads'
  },
  {
    id: 'rev-5',
    name: 'Priya Patel',
    rating: 5,
    review: "Simply beautiful. It feels like a late-night conversation with a best friend who knows exactly how much your heart is aching and gently guides you back to healing. The theme of forgiveness—not just of others, but of yourself—is incredibly powerful. A beautiful debut novel.",
    date: '2 months ago',
    location: 'Ahmedabad, India',
    source: 'amazon'
  },
  {
    id: 'rev-6',
    name: 'Siddharth Roy',
    rating: 5,
    review: "The formatting of the journal entries and the letters in the book add an extra layer of emotion. The contrast between his composed daytime life and raw 3 a.m. battles is stunningly authentic. An absolute treasure on my bookshelf that I will revisit for years.",
    date: '1 week ago',
    location: 'Kolkata, India',
    source: 'goodreads'
  }
];

export const REELS: Reel[] = [
  {
    id: 'reel-1',
    title: '“I looked at the stars and thought of you...” 🌌 | Midnight Musings',
    thumbnailUrl: 'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=360&h=640&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Standard clean video embed placeholder
    views: '120K',
    likes: '14K'
  },
  {
    id: 'reel-2',
    title: 'How to survive one-sided love 💔 | Healing Chapter 4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=360&h=640&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '85K',
    likes: '9.2K'
  },
  {
    id: 'reel-3',
    title: 'The exact moment you realize they moved on... 🥀',
    thumbnailUrl: 'https://images.unsplash.com/photo-1508780709619-79562169bc34?auto=format&fit=crop&w=360&h=640&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '240K',
    likes: '32K'
  },
  {
    id: 'reel-4',
    title: 'To the one who stayed in my heart. 💌 | Book Reading',
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=360&h=640&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    views: '180K',
    likes: '22K'
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
  readers: "5K+",
  instagramFollowers: "80K+",
  poemsWritten: "150+",
  booksSold: "25K+",
  isbn: "9798895033501"
};
