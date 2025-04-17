import { siteConfig } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    'Interiorly',
    'Interior Design',
    'AI Design Assistant',
    'Room Transformation',
    'Design Collaboration',
    'Real-time Visualization',
    'Smart Automation',
    'Interior Visualization',
    'Home Design',
    'AI-powered Design',
    'Design Efficiency',
    'Secure Collaboration',
  ],
  authors: [
    {
      name: 'Julian Schmidt',
      url: 'https://julianschmidt.cv',
    },
  ],
  creator: 'JulianAT',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@JulianAT',
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
};
