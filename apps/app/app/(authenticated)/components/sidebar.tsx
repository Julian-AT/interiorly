'use client';

import { OrganizationSelector } from '@/app/(authenticated)/components/organization/organization-popover';
import { GlobalSidebarSkeleton } from '@/app/(authenticated)/components/sidebar-skeleton';
import { UserProfilePopover } from '@/app/(authenticated)/components/user/user-profile-popover';
import {
  EXAMPLE_PAGES,
  SECONDARY_NAV,
  WORKSPACE_NAV,
} from '@/app/(authenticated)/constants/navigation';
import { useOrganization, useUser } from '@interiorly/auth/client';
import { Collapsible } from '@interiorly/design-system/components/ui/collapsible';
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
  useSidebar,
} from '@interiorly/design-system/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect } from 'react';

type GlobalSidebarProperties = {
  readonly children: ReactNode;
};

export const GlobalSidebar = ({ children }: GlobalSidebarProperties) => {
  const sidebar = useSidebar();
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
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <OrganizationSelector isOpen={sidebar.open} />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {WORKSPACE_NAV.map((item) => (
                <Collapsible key={item.title} asChild>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <a
                        href={item.url}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-secondary px-1.5 font-medium font-mono text-muted-foreground text-xs opacity-100">
                          ⌘ {item.command.split('+')[1].toUpperCase()}
                        </kbd>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="group pr-4 group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarMenu>
              {EXAMPLE_PAGES.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                {SECONDARY_NAV.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon className="h-6 w-6" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <UserProfilePopover />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarRail />
      <SidebarInset>{children}</SidebarInset>
    </>
  );
};
