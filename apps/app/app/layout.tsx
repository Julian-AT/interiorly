import '@interiorly/design-system/styles/globals.css';
import { DesignSystemProvider } from '@interiorly/design-system';
import { fonts } from '@interiorly/design-system/lib/fonts';
import { Toolbar } from '@interiorly/feature-flags/components/toolbar';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>{children}</DesignSystemProvider>
      <Toolbar />
    </body>
  </html>
);

export default RootLayout;
