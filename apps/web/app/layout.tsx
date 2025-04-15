import { Navbar } from '@/components/sections/navbar';
import { siteConfig } from '@/lib/site';
import { ThemeProvider } from '@interiorly/design-system/providers/theme';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@interiorly/design-system/styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: 'black',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <Script src="https://unpkg.com/react-scan/dist/auto.global.js" />
      </head> */}

      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative mx-auto max-w-7xl border-x">
            <div className="absolute top-0 left-6 z-10 block h-full w-px border-border border-l" />
            <div className="absolute top-0 right-6 z-10 block h-full w-px border-border border-r" />
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
