import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  metadataBase: new URL('https://makhanchor.in'),

  title: {
    default: 'Love, Loss, and Life — A Novel by Makhanchor (Yogesh Bhavsar)',
    template: '%s | Makhanchor',
  },

  description:
    'Love, Loss, and Life is a deeply moving novel by Makhanchor (Yogesh Bhavsar), exploring love, heartbreak, healing, and self-discovery through 100+ verses. Available on Amazon and NotionPress.',

  keywords: [
    'Love Loss and Life book',
    'Makhanchor novel',
    'Yogesh Bhavsar author',
    'Indian novel',
    'love and heartbreak story',
    'healing journey',
    'modern Indian authors',
    'self-discovery book',
    'romantic fiction India',
    'emotional healing literature',
    'onesided love novel',
    'one sided love poetry',
    'notionpress books',
    'amazon india novels',
    'indian poetry collection',
    'love and loss themes',
    'personal growth literature',
    'contemporary Indian fiction',
  ],

  authors: [{ name: 'Yogesh Bhavsar', url: 'https://makhanchor.in' }],
  creator: 'Makhanchor',
  publisher: 'NotionPress',
  applicationName: 'Love, Loss, and Life',

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://makhanchor.in',
    siteName: 'Love, Loss, and Life',
    title: 'Love, Loss, and Life — Novel by Makhanchor',
    description:
      'A poetic journey through love, loss, and healing. Written by Makhanchor (Yogesh Bhavsar).',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Love, Loss, and Life book cover',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Love, Loss, and Life — Novel by Makhanchor',
    description:
      'A deeply personal novel exploring love, heartbreak, and healing.',
    creator: '@the.makhanchor',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: 'https://makhanchor.in',
  },

  category: 'Books',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-GB9BPFCM37" />
      </body>
    </html>
  );
}
