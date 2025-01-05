import { env } from '@/env';
import { auth, currentUser } from '@interiorly/auth/server';
import { SidebarProvider } from '@interiorly/design-system/components/ui/sidebar';
import { showBetaFeature } from '@interiorly/feature-flags';
import { secure } from '@interiorly/security';
import type { ReactNode } from 'react';
import { PostHogIdentifier } from './components/posthog-identifier';
import { GlobalSidebar } from './components/sidebar';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProperties) => {
  if (env.ARCJET_KEY) {
    await secure(['CATEGORY:PREVIEW']);
  }

  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  const betaFeature = await showBetaFeature();

  if (!user) {
    redirectToSignIn();
  }

  return (
    <SidebarProvider>
      <GlobalSidebar>
        {betaFeature && (
          <div className="m-4 rounded-full bg-success p-1.5 text-center text-sm text-success-foreground">
            Beta feature now available
          </div>
        )}
        {children}
      </GlobalSidebar>
      <PostHogIdentifier />
      <div className="absolute right-4 bottom-4 h-10 w-10 rounded-full bg-muted" />
    </SidebarProvider>
  );
};

export default AppLayout;
