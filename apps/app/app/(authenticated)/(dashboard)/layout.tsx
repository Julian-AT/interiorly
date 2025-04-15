import { QuickSearch } from '@/components/dashboard/quick-search-dialog';
import { GlobalSidebar } from '@/components/navigation/sidebar';
import { env } from '@/env';
import {
  SidebarInset,
  SidebarProvider,
} from '@interiorly/design-system/components/ui/sidebar';
import type { ReactNode } from 'react';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProperties) => {
  if (!env.LIVEBLOCKS_SECRET) {
    return <div>No liveblocks secret</div>;
  }

  return (
    <>
      <SidebarProvider>
        <GlobalSidebar />
        <SidebarInset>{children}</SidebarInset>
        <QuickSearch />
        {/* <div className="fixed right-4 bottom-4 h-10 w-10 rounded-full bg-muted" /> */}
      </SidebarProvider>
      {/* <PostHogIdentifier /> */}
    </>
  );
};

export default AppLayout;
