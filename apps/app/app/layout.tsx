import '@interiorly/design-system/styles/globals.css';
import { DesignSystemProvider } from '@interiorly/design-system';
import { Toaster } from '@interiorly/design-system/components/ui/toaster';
import { fonts } from '@interiorly/design-system/lib/fonts';
import { Toolbar } from '@interiorly/feature-flags/components/toolbar';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://interiorly.dev'),
  openGraph: {
    siteName: 'Interiorly',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://interiorly.dev/rss.xml',
    },
  },
  applicationName: 'Interiorly',
  appleWebApp: {
    title: 'Interiorly',
    statusBarStyle: 'default',
    capable: true,
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    shortcut: [
      {
        url: '/favicon.ico',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: '/apple-icon-57x57.png',
        sizes: '57x57',
        type: 'image/png',
      },
      {
        url: '/apple-icon-60x60.png',
        sizes: '60x60',
        type: 'image/png',
      },
    ],
  },
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>{children}</DesignSystemProvider>
      <Toolbar />
      <SpeedInsights />
      <Analytics />
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
