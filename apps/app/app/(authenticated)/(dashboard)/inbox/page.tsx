'use client';

import { InboxNotifications } from '@/components/dashboard/notifications';
import LiveblocksProvider from '@/components/provider/liveblocks-provider';

export default function InboxPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background">
      <LiveblocksProvider>
        <InboxNotifications />
      </LiveblocksProvider>
    </div>
  );
}
