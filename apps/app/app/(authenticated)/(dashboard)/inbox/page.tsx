'use client';

import { InboxNotifications } from '@/components/dashboard/notifications';

export default function InboxPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background">
      <InboxNotifications />
    </div>
  );
}
