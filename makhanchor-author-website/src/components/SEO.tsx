/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BlogPost } from '../types';
import { BOOK_METADATA } from '../data';

interface SEOProps {
  title?: string;
  description?: string;
  activeBlog?: BlogPost | null;
  activeTab?: string;
}

export default function SEO({ title, description, activeBlog, activeTab }: SEOProps) {
  useEffect(() => {
    const pathname = window.location.pathname;

    // 1. Update Document Title
    let displayTitle = 'Makhanchor | Poetry & Stories that Heal';
    let displayDesc = BOOK_METADATA.description;

    if (activeBlog) {
      displayTitle = `${activeBlog.title} | Blog by Makhanchor`;
      displayDesc = activeBlog.excerpt || activeBlog.subtitle;
    } else if (pathname === '/about') {
      displayTitle = 'About the Author | Makhanchor';
      displayDesc = 'Meet Yogesh Bhavsar (Makhanchor), a poet and novelist writing novels and words to map the silent architecture of the human heart, unrequited love, and emotional healing.';
    } else if (pathname === '/blog') {
      displayTitle = 'Midnight Whispers Blog | Makhanchor';
      displayDesc = 'Read the latest essays, poetry, and stories on unrequited love, midnight loneliness, and healing by Makhanchor (Yogesh Bhavsar).';
    } else if (title) {
      displayTitle = `${title} | Makhanchor`;
      if (description) displayDesc = description;
    } else if (activeTab && activeTab !== 'home') {
      displayTitle = `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} | Makhanchor`;
    }

    document.title = displayTitle;

    // 2. Update Meta Description (use a shorter content for SERP while keeping full OG description)
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    const shortDesc = displayDesc.length > 155 ? displayDesc.slice(0, 152) + '...' : displayDesc;
    metaDesc.setAttribute('content', shortDesc);

    // Helper to find or create and update a meta tag by property or name
    const updateMetaTag = (attributeName: 'property' | 'name', attributeValue: string, contentValue: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 4. Update Open Graph and Twitter Card tags
    const siteUrl = 'https://www.makhanchor.in/';
    const currentUrl = activeBlog 
      ? `${siteUrl}blog/${activeBlog.slug}` 
      : `${siteUrl}${pathname === '/' ? '' : pathname.substring(1)}`;
    const currentImage = activeBlog?.imageUrl || `${siteUrl}og-image.svg`;
    const currentType = activeBlog ? 'article' : 'website';

    updateMetaTag('property', 'og:title', displayTitle);
    updateMetaTag('property', 'og:description', displayDesc);
    updateMetaTag('property', 'og:image', currentImage);
    updateMetaTag('property', 'og:url', currentUrl);
    updateMetaTag('property', 'og:type', currentType);
    updateMetaTag('property', 'og:site_name', 'Makhanchor');

    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', displayTitle);
    updateMetaTag('name', 'twitter:description', displayDesc);
    updateMetaTag('name', 'twitter:image', currentImage);
    // Add Twitter attribution tags
    updateMetaTag('name', 'twitter:site', '@the.makhanchor');
    updateMetaTag('name', 'twitter:creator', '@scripted_by_yogesh');

    // Ensure a canonical link is present and points to the current URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Ensure robots meta exists
    updateMetaTag('name', 'robots', 'index,follow');

    // 3. Inject JSON-LD Schema
    const oldSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    oldSchemas.forEach((el) => el.remove());

    const schemas: any[] = [];

    // Author Schema
    const authorSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Makhanchor',
      'url': 'https://www.makhanchor.in/',
      'sameAs': [
        'https://www.instagram.com/scripted_by_yogesh/',
        'https://www.instagram.com/the.makhanchor/',
        'https://www.youtube.com/@makhanchor646'
      ],
      'jobTitle': 'Poet & Author',
      'description': 'A voice for romantic poetry, one-sided love, healing, and heartfelt stories.'
    };
    schemas.push(authorSchema);

    // Book Schema
    const bookSchema = {
      '@context': 'https://schema.org',
      '@type': 'Book',
      'name': BOOK_METADATA.title,
      'author': {
        '@type': 'Person',
        'name': 'Makhanchor'
      },
      'url': 'https://www.makhanchor.in/',
      'workExample': [
        {
          '@type': 'Book',
          'isbn': BOOK_METADATA.isbn,
          'bookFormat': 'https://schema.org/Paperback',
          'potentialAction': {
            '@type': 'BuyAction',
            'target': [
              {
                '@type': 'EntryPoint',
                'urlTemplate': BOOK_METADATA.amazonUrl,
                'actionPlatform': [
                  'http://schema.org/DesktopWebPlatform',
                  'http://schema.org/MobileWebPlatform'
                ]
              }
            ],
            'priceSpecification': {
              '@type': 'UnitPriceSpecification',
              'price': '299',
              'priceCurrency': 'INR'
            }
          }
        }
      ]
    };
    schemas.push(bookSchema);

    // Article Schema (If viewing a blog post)
    if (activeBlog) {
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': activeBlog.title,
        'description': activeBlog.excerpt,
        'image': activeBlog.imageUrl,
        'datePublished': new Date(activeBlog.date).toISOString(),
        'author': {
          '@type': 'Person',
          'name': 'Makhanchor',
          'url': 'https://www.makhanchor.in/'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Makhanchor Publications',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://www.makhanchor.in/logo.png'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': `https://www.makhanchor.in/blog/${activeBlog.slug}`
        }
      };
      schemas.push(articleSchema);
    }

    // Append new schemas to head
    schemas.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

    return () => {
      // Clean up on unmount or before running again
      const currentSchemas = document.querySelectorAll('script[type="application/ld+json"]');
      currentSchemas.forEach((el) => el.remove());
    };
  }, [title, description, activeBlog, activeTab]);

  return null; // Side effect component
}
