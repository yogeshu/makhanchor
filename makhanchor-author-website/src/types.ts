/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
  id: string;
  category: 'HEALING' | 'WRITING' | 'POETRY' | 'LOVE & LIFE' | 'REFLECTIONS';
  title: string;
  subtitle: string;
  slug: string;
  excerpt: string;
  content: string[]; // split into paragraphs for elegant rendering
  imageUrl: string;
  readTime: string;
  date: string;
  mostLoved?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  date: string;
  location: string;
  source?: 'amazon' | 'goodreads';
}

export interface Reel {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: string;
  likes: string;
}

export interface BookInfo {
  title: string;
  author: string;
  description: string;
  purchaseUrl: string;
  amazonUrl: string;
}
