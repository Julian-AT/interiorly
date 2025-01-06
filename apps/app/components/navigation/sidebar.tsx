'use client';
import { GlobalSidebarSkeleton } from '@/components/skeletons/sidebar-skeleton';
import { UserProfilePopover } from '@/components/user/user-profile-popover';
import {
  EXAMPLE_PAGES,
  SECONDARY_NAV,
  WORKSPACE_NAV,
} from '@/lib/constants/navigation';
import { useOrganization, useUser } from '@interiorly/auth/client';
import { Button } from '@interiorly/design-system/components/ui/button';
import { Separator } from '@interiorly/design-system/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@interiorly/design-system/components/ui/sidebar';
import { cn } from '@interiorly/design-system/lib/utils';
import {
  HelpCircleIcon,
  PencilEdit02Icon,
  SearchList01Icon,
  UserAdd01Icon,
} from 'hugeicons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';
import HelpPopover from '../dashboard/help-popover';
import { QuickSearch } from '../dashboard/quick-search-dialog';
import OrganizationInviteMembersDialog from '../organization/organization-invite-members-dialog';
import { OrganizationPopover } from '../organization/organization-popover';
import SidebarDocumentButton from './sidebar-document-button';

type GlobalSidebarProperties = {
  readonly children: ReactNode;
};

export const GlobalSidebar = ({ children }: GlobalSidebarProperties) => {
  const pathname = usePathname();
  const router = useRouter();
  const { organization } = useOrganization();
  const { user } = useUser();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      for (const item of WORKSPACE_NAV) {
        if (e.key === item.command.split('+')[1] && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          router.push(item.url);
        }
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [router]);

  if (!user || !organization) {
    return <GlobalSidebarSkeleton />;
  }

  return (
    <>
      <Sidebar>
        <SidebarRail />
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <OrganizationPopover />
              <Button variant="ghost" size="icon">
                <PencilEdit02Icon className="h-5 w-5 text-muted-foreground" />
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {WORKSPACE_NAV.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={
                      <div className="flex max-w-64 gap-2">
                        <span className="flex-1">{item.tooltip}</span>
                        {item.command && (
                          <span className="h-max w-max rounded-md border px-1 text-muted-foreground text-xs">
                            ⌘ {item.command.split('+')[1].toUpperCase()}
                          </span>
                        )}
                      </div>
                    }
                  >
                    <Link
                      href={item.url}
                      className={cn(
                        'flex items-center justify-between',
                        pathname === item.url && 'bg-muted'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <QuickSearch>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    tooltip={'Find documents, pages and more'}
                  >
                    <div className="flex cursor-pointer items-center justify-between">
                      <div className="flex items-center gap-2">
                        <SearchList01Icon className="h-5 w-5" />
                        <span>Quick Find</span>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </QuickSearch>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Documents</SidebarGroupLabel>
            <SidebarMenu>
              {EXAMPLE_PAGES.map((item) => (
                <SidebarDocumentButton
                  key={item.name}
                  name={item.name}
                  url={item.url}
                  icon={<item.icon className="h-5 w-5" />}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {SECONDARY_NAV.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.tooltip}
                      className="group/collapsible [&_svg]:size-5 [&_svg]:shrink-0"
                    >
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="size-6" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <HelpPopover>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={'Useful links and resources'}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center justify-start gap-2 font-normal [&_svg]:size-5 [&_svg]:shrink-0"
                      >
                        <HelpCircleIcon className="size-6" />
                        <span>Help</span>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </HelpPopover>
                <OrganizationInviteMembersDialog>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={'Invite members to your workspace'}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center justify-start gap-2 font-normal [&_svg]:size-5 [&_svg]:shrink-0"
                      >
                        <UserAdd01Icon className="size-6" />
                        <span>Invite Members</span>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </OrganizationInviteMembersDialog>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <Separator />
        <SidebarFooter className="p-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <UserProfilePopover />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};
