import { useUser } from '@interiorly/auth/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@interiorly/design-system/components/ui/avatar';
import {} from '@interiorly/design-system/components/ui/dialog';
import {
  Popover,
  PopoverTrigger,
} from '@interiorly/design-system/components/ui/popover';
import {} from 'hugeicons-react';

export const UserProfileSection = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-md px-2 py-2">
      <Popover>
        <PopoverTrigger className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage src={user.imageUrl} />
            <AvatarFallback>
              {user.fullName?.charAt(0) ||
                user.emailAddresses[0].emailAddress.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex w-full flex-1 flex-col">
            <span className="truncate text-foreground text-sm">
              {user.fullName || user.username}
            </span>
            <span className="truncate text-muted-foreground text-xs">
              {user.emailAddresses[0].emailAddress}
            </span>
          </div>
        </PopoverTrigger>
        {/* ... Rest of the user profile popover content ... */}
      </Popover>
    </div>
  );
};
