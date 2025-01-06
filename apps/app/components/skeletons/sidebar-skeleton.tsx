'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@interiorly/design-system/components/ui/sidebar';
import { Skeleton } from '@interiorly/design-system/components/ui/skeleton';

export const GlobalSidebarSkeleton = () => {
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <Skeleton className="h-9 flex-1" />
              <Skeleton className="h-9 w-9" />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <Skeleton className="h-4 w-1/3" />
            </SidebarGroupLabel>
            <SidebarMenu className="relative flex flex-col gap-2 overflow-x-hidden">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="h-7 w-full" />
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>
              <Skeleton className="h-4 w-1/3" />
            </SidebarGroupLabel>
            <SidebarMenu className="relative flex flex-col gap-2 overflow-x-hidden">
              <div className="absolute z-10 h-full w-full bg-gradient-to-t from-secondary to-transparent" />
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-7 w-full" />
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <Skeleton className="h-4 w-full" />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-md" />
            <div className="flex flex-1 flex-col gap-1.5">
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
