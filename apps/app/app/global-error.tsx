'use client';

import { Button } from '@interiorly/design-system/components/ui/button';
import { fonts } from '@interiorly/design-system/lib/fonts';
import { captureException } from '@sentry/nextjs';
import type NextError from 'next/error';
import { useEffect } from 'react';

type GlobalErrorProperties = {
  readonly error: NextError & { digest?: string };
  readonly reset: () => void;
};

const GlobalError = ({ error, reset }: GlobalErrorProperties) => {
  useEffect(() => {
    captureException(error);
  }, [error]);

  return (
    <html lang="en" className={fonts}>
      <body className="flex h-screen flex-col items-center justify-center bg-background">
        <div className="flex flex-col items-center justify-center gap-4 bg-secondary">
          <h1 className="font-bold text-xl">Oops, something went wrong</h1>
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
