import { PostHogIdentifier } from '@/components/common/posthog-identifier';
import { QuickSearch } from '@/components/dashboard/quick-search-dialog';
import { GlobalSidebar } from '@/components/navigation/sidebar';
import { env } from '@/env';
import { auth } from '@interiorly/auth/server';
import { SidebarProvider } from '@interiorly/design-system/components/ui/sidebar';
import { showBetaFeature } from '@interiorly/feature-flags';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

const CollaborationProvider = dynamic(() =>
  import('@/components/provider/collaboration-provider').then(
    (mod) => mod.CollaborationProvider
  )
);

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProperties) => {
  const { orgId } = await auth();

  if (!orgId) {
    return redirect('/onboarding');
  }

  if (!env.LIVEBLOCKS_SECRET) {
    return <div>No liveblocks secret</div>;
  }

  return (
    <SidebarProvider>
      <GlobalSidebar>
        <CollaborationProvider orgId={orgId}>{children}</CollaborationProvider>
      </GlobalSidebar>
      <PostHogIdentifier />
      <QuickSearch />
      {/* <div className="fixed right-4 bottom-4 h-10 w-10 rounded-full bg-muted" /> */}
    </SidebarProvider>
  );
};

export default AppLayout;
