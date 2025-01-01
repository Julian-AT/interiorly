import '@interiorly/design-system/styles/globals.css';
import './styles/web.css';
import { DesignSystemProvider } from '@interiorly/design-system';
import { fonts } from '@interiorly/design-system/lib/fonts';
import { cn } from '@interiorly/design-system/lib/utils';
import { Toolbar } from '@interiorly/feature-flags/components/toolbar';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html
    lang="en"
    className={cn(fonts, 'scroll-smooth')}
    suppressHydrationWarning
  >
    <body>
      <DesignSystemProvider>
        <Header />
        {children}
        <Footer />
      </DesignSystemProvider>
      <Toolbar />
    </body>
  </html>
);

export default RootLayout;
