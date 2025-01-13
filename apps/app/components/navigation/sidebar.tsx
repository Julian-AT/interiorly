'use client';
import { GlobalSidebarSkeleton } from '@/components/skeletons/sidebar-skeleton';
import { UserProfilePopover } from '@/components/user/user-profile-popover';
import { createDocument, getDocuments } from '@/lib/actions';
import { WORKSPACE_NAV } from '@/lib/constants/navigation';
import { useDocumentsFunctionSWR } from '@/lib/hooks';
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
  Add01Icon,
  Delete02Icon,
  File02Icon,
  HelpCircleIcon,
  PencilEdit02Icon,
  SearchList01Icon,
  UserAdd01Icon,
} from 'hugeicons-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useCallback, useEffect, useMemo } from 'react';
import CreateDocumentDialog from '../dashboard/create-document-dialog';
import HelpPopover from '../dashboard/help-popover';
import { QuickSearch } from '../dashboard/quick-search-dialog';
import OrganizationInviteMembersDialog from '../organization/organization-invite-members-dialog';
import { OrganizationPopover } from '../organization/organization-popover';
import EditorLayoutSkeleton from '../skeletons/editor-layout-skeleton';
import SidebarDocumentButton from './sidebar-document-button';

type GlobalSidebarProperties = {
  readonly children: ReactNode;
};

export const GlobalSidebar = ({ children }: GlobalSidebarProperties) => {
  const pathname = usePathname();
  const router = useRouter();
  const { organization } = useOrganization();
  const { user } = useUser();
  const { data, error, isLoading } = useDocumentsFunctionSWR(
    [
      getDocuments,
      {
        userId: user?.id,
      },
    ],
    {
      refreshInterval: 10000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
    }
  );

  // Memoize keyboard shortcut handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) return;

      const item = WORKSPACE_NAV.find(
        (item) =>
          item.command && e.key === item.command.split('+')[1].toLowerCase()
      );

      if (item) {
        e.preventDefault();
        router.push(item.url);
      }
    },
    [router]
  );

  // Handle keyboard shortcuts
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Handle document creation
  const handleCreateDocument = useCallback(async () => {
    if (!user?.id || !organization?.id) return;

    try {
      const response = await createDocument(
        {
          name: 'Untitled Document',
          userId: user.id,
          type: 'text',
          groupIds: [organization.id],
          userAccesses: [user.id],
        },
        true
      );

      if (response?.data?.id) {
        router.push(`/text/${response.data.id}`);
      }
    } catch (error) {
      console.error('Failed to create document:', error);
    }
  }, [user?.id, router, organization?.id]);

  // Memoize workspace navigation items
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

  // Memoize document list
  const documentList = useMemo(
    () =>
      data?.documents.map((document) => (
        <SidebarDocumentButton
          key={document.id}
          name={document.name}
          url={`/${document.type}/${document.id}`}
          icon={<File02Icon className="size-5" />}
          className={
            pathname === `/${document.type}/${document.id}`
              ? 'bg-muted'
              : undefined
          }
        />
      )),
    [data?.documents, pathname]
  );

  if (isLoading || !user || !organization || !data || error) {
    return (
      <div className="relative flex min-h-screen w-full min-w-full">
        <GlobalSidebarSkeleton />
        <EditorLayoutSkeleton />
      </div>
    );
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
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="group group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="group/documents justify-between">
              Documents
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 hover:bg-muted"
                onClick={handleCreateDocument}
              >
                <Add01Icon className="size-4" />
              </Button>
            </SidebarGroupLabel>
            <SidebarMenu>{documentList}</SidebarMenu>
          </SidebarGroup>
          <SidebarGroup className="mt-auto">
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
