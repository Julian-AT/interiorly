import { SignOutButton } from '@interiorly/auth/client';
import { Button } from '@interiorly/design-system/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@interiorly/design-system/components/ui/dialog';
import { Logout03Icon } from 'hugeicons-react';

const UserLogoutDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 border px-1.5">
          <Logout03Icon className="h-3 w-3" />
          <span className="text-xs">Sign Out</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="font-semibold text-xl">Sign Out</DialogTitle>
        <DialogDescription className="mt-4 text-muted-foreground">
          Are you sure you want to sign out? Your session will be ended and
          you'll need to sign in again to access your account.
        </DialogDescription>
        <DialogFooter className="mt-6 flex gap-3">
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </DialogClose>
          <SignOutButton>
            <Button variant="destructive" type="submit" className="flex-1">
              Sign Out
            </Button>
          </SignOutButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserLogoutDialog;
