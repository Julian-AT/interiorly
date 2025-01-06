'use client';
import {
  CreateOrganization,
  useOrganization,
  useOrganizationList,
} from '@interiorly/auth/client';
import { Button } from '@interiorly/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@interiorly/design-system/components/ui/dialog';
import {} from '@interiorly/design-system/components/ui/popover';
import { Add01Icon, CrownIcon } from 'hugeicons-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { OrganizationButton } from './organization-button';

const FREE_PLAN_LIMIT = 5;

interface OrganizationSelectorProps {
  setIsOpen?: (isOpen: boolean) => void;
}

export const OrganizationSelector = ({
  setIsOpen,
}: OrganizationSelectorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { organization } = useOrganization();
  const { userMemberships, setActive, isLoaded } = useOrganizationList({
    userMemberships: true,
  });

  if (!isLoaded || !organization || !userMemberships.data) {
    return null;
  }

  const otherOrganizations = userMemberships.data.filter(
    (m) => m.organization.id !== organization.id
  );

  const handleOrganizationSwitch = async (organizationId: string) => {
    setIsLoading(true);
    await setActive({ organization: organizationId });
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-xs">Switch Organization</span>
      <div className="flex flex-col gap-1">
        {otherOrganizations.length > 0 ? (
          otherOrganizations
            .slice(0, FREE_PLAN_LIMIT)
            .map((membership) => (
              <OrganizationButton
                key={membership.organization.id}
                organization={membership.organization}
                onClick={() =>
                  handleOrganizationSwitch(membership.organization.id)
                }
                isLoading={isLoading}
              />
            ))
        ) : (
          <span className="text-muted-foreground text-xs">
            You are not a member of any other organization.
          </span>
        )}
        {userMemberships.count < FREE_PLAN_LIMIT ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start p-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-secondary">
                  <Add01Icon className="h-3 w-3" />
                </div>
                <span className="truncate text-muted-foreground text-xs">
                  Create Organization
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="min-w-fit border-none bg-transparent">
              <DialogTitle className="sr-only">Create Organization</DialogTitle>
              <CreateOrganization hideSlug />
            </DialogContent>
          </Dialog>
        ) : (
          <Button variant="ghost" className="w-full justify-start p-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md border bg-secondary">
              <CrownIcon className="h-3 w-3" />
            </div>
            <span className="truncate text-muted-foreground text-xs">
              Limit Reached, Upgrade to Pro
            </span>
          </Button>
        )}
      </div>
    </div>
  );
};
