import { useInboxNotifications } from '@interiorly/collaboration/hooks';

export function InboxNotifications() {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <div className="flex flex-col gap-2">
      {inboxNotifications.length}
      {inboxNotifications.map((inboxNotification) => (
        <div key={inboxNotification.id}>
          {inboxNotification.id}
          {inboxNotification.kind}
          {inboxNotification.notifiedAt.toISOString()}
          {inboxNotification.readAt?.toISOString()}
          {inboxNotification.roomId}
        </div>
      ))}
    </div>
  );
}
