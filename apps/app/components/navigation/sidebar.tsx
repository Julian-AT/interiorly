'use client';

import { WORKSPACE_NAV } from '@/lib/constants/navigation';
import { Separator } from '@interiorly/design-system/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@interiorly/design-system/components/ui/sidebar';
import { cn } from '@interiorly/design-system/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const GlobalSidebar = () => {
  const pathname = usePathname();

  const workspaceNavItems = useMemo(
    () =>
      WORKSPACE_NAV.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            tooltip={
              <div className="flex max-w-64 gap-2">
                <span className="flex-1">{item.tooltip}</span>
                {item.command && (
                  <span className="h-max w-max rounded-md border px-1 text-muted-foreground text-xs">
                    {item.command.includes('meta') ? '⌘' : 'Ctrl'}{' '}
                    {item.command.split('+')[1].toUpperCase()}
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
      )),
    [pathname]
  );

  return (
    <>
      {/* <KbdShortcutHandler /> */}
      <Sidebar collapsible="icon">
        <SidebarRail />
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              test
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            {/* <SidebarMenu>
              {workspaceNavItems}
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
            </SidebarMenu> */}
          </SidebarGroup>
          <SidebarGroup className="group group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="group/documents justify-between">
              Documents
            </SidebarGroupLabel>
          </SidebarGroup>
          {/* <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <CreateDocumentDialog>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={'Create a new document'}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center justify-start gap-2 font-normal [&_svg]:size-5 [&_svg]:shrink-0"
                      >
                        <Add01Icon className="size-6" />
                        <span>New Document</span>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </CreateDocumentDialog>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={'View deleted documents'}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center justify-start gap-2 font-normal [&_svg]:size-5 [&_svg]:shrink-0"
                    >
                      <Delete02Icon className="size-6" />
                      <span>Trash</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
          </SidebarGroup> */}
        </SidebarContent>
        <Separator />
        <SidebarFooter className="p-0">
          <SidebarMenu>
            <SidebarMenuItem>{/* <UserProfilePopover /> */}</SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
