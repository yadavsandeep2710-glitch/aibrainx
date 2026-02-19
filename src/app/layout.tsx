import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/lib/auth-context';
import './globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'AIBrainX.in — Discover the Best AI Tools for India',
    template: '%s | AIBrainX.in',
  },
  description: 'India\'s #1 AI tools directory. Discover, compare, and find the perfect AI tools with pricing in ₹, reviews from Indian users, and daily AI insights.',
  keywords: ['AI tools', 'artificial intelligence', 'India', 'AI tools directory', 'best AI tools', 'AI tools India', 'free AI tools'],
  authors: [{ name: 'AIBrainX Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://aibrainx.in',
    siteName: 'AIBrainX.in',
    title: 'AIBrainX.in — Discover the Best AI Tools for India',
    description: 'India\'s #1 AI tools directory. Discover, compare, and find the perfect AI tools.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIBrainX.in — Discover the Best AI Tools for India',
    description: 'India\'s #1 AI tools directory with pricing in ₹ and Indian user reviews.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    other: {
      'p:domain_verify': '55c00b58b61f2743d6885a52bb132ac1',
      'impact-site-verification': '71a06b6d-a9b6-40be-a490-572de799ed94',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="VYuhJsP/MadgDoqNhX4W1w"
          strategy="afterInteractive"
        />
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

