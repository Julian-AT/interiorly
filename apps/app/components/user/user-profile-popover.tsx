import { UserProfile, useUser } from '@interiorly/auth/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@interiorly/design-system/components/ui/avatar';
import {
  Button,
  buttonVariants,
} from '@interiorly/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@interiorly/design-system/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@interiorly/design-system/components/ui/popover';
import { cn } from '@interiorly/design-system/lib/utils';
import { Settings02Icon } from 'hugeicons-react';
import UserLogoutDialog from './user-logout-dialog';

export const UserProfilePopover = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'flex h-min w-full items-center gap-2 rounded-none p-2'
        )}
      >
        <Avatar className="h-8 w-8 rounded-md">
          <AvatarImage src={user.imageUrl} />
          <AvatarFallback>
            {user.fullName?.charAt(0) ||
              user.emailAddresses[0].emailAddress.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-1 flex-col items-start">
          <span className="truncate text-foreground text-sm">
            {user.fullName || user.username}
          </span>
          <span className="truncate text-muted-foreground text-xs">
            {user.emailAddresses[0].emailAddress}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="mb-3 ml-2 flex w-full min-w-full max-w-xs flex-col gap-2 bg-secondary"
        side="right"
      >
        <div className="flex items-center gap-2">
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
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 border px-1.5">
                <Settings02Icon className="h-3 w-3" />
                <span className="text-xs">Settings</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-fit border-none bg-transparent">
              <DialogTitle className="hidden">User Settings</DialogTitle>
              <UserProfile routing="hash" />
            </DialogContent>
          </Dialog>
          <UserLogoutDialog />
        </div>
      </PopoverContent>
    </Popover>
  );
};
