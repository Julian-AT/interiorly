'use client';

import { InputTags } from '@/components/organization/invite-member-input';
import { useOrganization } from '@interiorly/auth/client';
import { Button } from '@interiorly/design-system/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@interiorly/design-system/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@interiorly/design-system/components/ui/select';
import { HelpCircleIcon, Loading03Icon, Tick02Icon } from 'hugeicons-react';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';

interface OrganizationInviteMembersDialogProps {
  children: ReactNode;
}

const OrganizationInviteMembersDialog = ({
  children,
}: OrganizationInviteMembersDialogProps) => {
  const { organization } = useOrganization();
  const [emails, setEmails] = useState<string[]>([]);
  const [role, setRole] = useState<'member' | 'admin'>('member');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const emailValidator = (email: string) => {
    // biome-ignore lint/performance/useTopLevelRegex: <explanation>
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInvite = async () => {
    if (!organization) {
      return;
    }

    setIsLoading(true);
    await organization.inviteMembers({
      emailAddresses: emails,
      role: `org:${role}`,
    });
    setIsLoading(false);
    setIsSuccess(true);
    setEmails([]);
    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  const isDisabled = isLoading || isSuccess || emails.length === 0;

  if (!organization) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="gap-0 p-0">
        <div className="flex flex-col gap-2 p-6">
          <DialogTitle className="font-normal">
            Invite Members to{' '}
            <span className="font-bold">{organization.name}</span>
          </DialogTitle>
          <DialogDescription>
            Invite members to your organization by adding their email addresses.
            We'll notify them via email to join your organization.
          </DialogDescription>
          <InputTags
            onChange={(data) => {
              if (Array.isArray(data)) {
                setEmails(data);
              }
            }}
            value={emails}
            validator={emailValidator}
          />
          <DialogFooter>
            <Select
              disabled={isDisabled}
              defaultValue="member"
              onValueChange={(v) => {
                setRole(v as 'member' | 'admin');
              }}
            >
              <SelectTrigger className="w-max">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="member">Member</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Button disabled={isDisabled} type="submit" onClick={handleInvite}>
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <Loading03Icon className="h-4 w-4 animate-spin" />
                  <span className="text-xs">Inviting...</span>
                </div>
                // biome-ignore lint/nursery/noNestedTernary: <explanation>
              ) : isSuccess ? (
                <div className="flex items-center gap-1">
                  <Tick02Icon className="h-4 w-4" />
                  <span className="text-xs">Invited</span>
                </div>
              ) : (
                'Invite'
              )}
            </Button>
          </DialogFooter>
        </div>
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 rounded-b-md border-t p-1 px-2 text-muted-foreground text-xs hover:bg-muted"
        >
          <HelpCircleIcon className="h-3 w-3" />
          <span>
            Learn more about invites, roles and permissions on Interiorly
          </span>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationInviteMembersDialog;
