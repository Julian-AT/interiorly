import { OrganizationProfile, useOrganization } from '@interiorly/auth/client';
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
import {
  ArrowDown01Icon,
  PencilEdit02Icon,
  Settings02Icon,
  UserAdd02Icon,
} from 'hugeicons-react';
import OrganizationImage from './organization-image';

type OrganizationSelectorProperties = {
  readonly isOpen: boolean;
};

export const OrganizationSelector = ({
  isOpen,
}: OrganizationSelectorProperties) => {
  const { organization } = useOrganization();

  if (!organization) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex h-9 w-full items-center justify-between gap-2 overflow-hidden transition-all',
        isOpen ? '' : 'mx-3'
      )}
    >
      <Popover>
        <PopoverTrigger
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex max-w-max flex-1 items-center gap-2 px-1.5'
          )}
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-background">
            <OrganizationImage
              imageUrl={organization.imageUrl}
              name={organization.name}
            />
          </div>
          <div className="flex flex-1 items-center gap-2">
            <span className="max-w-max flex-1 truncate font-medium text-foreground text-sm">
              {organization.name}
            </span>
            <ArrowDown01Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="mt-3 ml-20 flex w-full min-w-full max-w-xs flex-col bg-secondary"
          side="right"
        >
          <div className="flex flex-col gap-3">
            <div className="flex h-9 gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-background">
                <OrganizationImage
                  imageUrl={organization.imageUrl}
                  name={organization.name}
                />
              </div>
              <div className="flex flex-1 flex-col">
                <span className="truncate font-medium text-sm">
                  {organization.name}
                </span>
                <span className="text-muted-foreground text-xs">
                  Free Plan · {organization.membersCount} member
                  {organization.membersCount === 1 ? '' : 's'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 border px-1.5"
                  >
                    <Settings02Icon className="h-3 w-3" />
                    <span className="text-xs">Settings</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="min-w-fit border-none bg-transparent">
                  <DialogTitle className="hidden">
                    Organization Settings
                  </DialogTitle>
                  <OrganizationProfile
                    routing="hash"
                    appearance={{
                      variables: {
                        colorBackground: '#1F1F1F',
                      },
                    }}
                  />
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" className="h-7 border px-1.5">
                <UserAdd02Icon className="h-3 w-3" />
                <span className="text-xs">Invite Members</span>
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button variant="ghost" size="icon">
        <PencilEdit02Icon className="h-5 w-5 text-muted-foreground" />
      </Button>
    </div>
  );
};
