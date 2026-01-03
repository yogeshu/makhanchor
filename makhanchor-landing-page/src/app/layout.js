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
  title: 'Love, Loss, and Life - Poetry by Makhanchor | Buy Now',
  description: 'A transformative poetry collection exploring romance, healing, and self-discovery. 100+ powerful verses by Makhanchor (Yogesh Bhavsar). Available on Amazon & NotionPress.',
  keywords: 'poetry book, love poems, healing poetry, Indian poet, Makhanchor, Yogesh Bhavsar, self-discovery poems, romantic poetry',
}

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
