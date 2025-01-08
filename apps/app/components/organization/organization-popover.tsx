'use client';

import OrganizationImage from '@/components/organization/organization-image';
import {
  OrganizationProfile,
  useOrganization,
  useOrganizationList,
} from '@interiorly/auth/client';
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
import { Separator } from '@interiorly/design-system/components/ui/separator';
import { cn } from '@interiorly/design-system/lib/utils';
import {
  ArrowDown01Icon,
  GithubIcon,
  Settings02Icon,
  UserAdd02Icon,
} from 'hugeicons-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import OrganizationInviteMembersDialog from './organization-invite-members-dialog';
import { OrganizationSelector } from './organization-selector';

export const OrganizationPopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { organization } = useOrganization();
  const { userMemberships, isLoaded } = useOrganizationList({
    userMemberships: true,
  });

  if (!isLoaded || !organization || !userMemberships.data) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative flex h-9 w-full flex-1 items-center justify-between gap-2 overflow-hidden transition-all'
      )}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'flex max-w-full flex-1 items-center justify-start gap-2 px-1.5'
          )}
        >
          <div className="flex h-6 w-6 items-center rounded-md border bg-secondary">
            <OrganizationImage
              imageUrl={organization.imageUrl}
              name={organization.name}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="max-w-max flex-1 truncate font-medium text-foreground text-sm">
              {organization.name}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? -90 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <ArrowDown01Icon className="h-3.5 w-3.5 text-muted-foreground" />
          </motion.div>
        </PopoverTrigger>
        <PopoverContent
          className="mt-2 ml-16 flex w-64 min-w-full flex-col bg-secondary p-3"
          side="right"
          align="start"
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
                  <Button variant="ghost" className="h-7 border px-1.5">
                    <Settings02Icon className="h-3 w-3" />
                    <span className="text-xs">Settings</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="min-w-fit border-none bg-transparent">
                  <DialogTitle className="sr-only">
                    Organization Settings
                  </DialogTitle>
                  <OrganizationProfile
                    routing="hash"
                    afterLeaveOrganizationUrl="/onboarding"
                  />
                </DialogContent>
              </Dialog>
              <OrganizationInviteMembersDialog>
                <Button variant="ghost" className="h-7 border px-1.5">
                  <UserAdd02Icon className="h-3 w-3" />
                  <span className="text-xs">Invite Members</span>
                </Button>
              </OrganizationInviteMembersDialog>
            </div>
            <Separator />
            <OrganizationSelector setIsOpen={setIsOpen} />
            <Separator />
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">
                Interiorly version 1.0.0
              </span>
              <span className="text-muted-foreground text-xs">
                Build ID: 1234567890
              </span>
            </div>
            <Separator />
            <Link
              href="https://github.com/interiorly"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'link' }),
                'w-full justify-start p-1.5 text-muted-foreground'
              )}
            >
              <GithubIcon className="h-3 w-3" />
              <span className="truncate text-xs">Interiorly on GitHub</span>
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
