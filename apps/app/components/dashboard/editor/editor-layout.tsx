'use client';
import { AvatarStack } from '@/components/collaboration/avatar-stack';
import { useOrganization } from '@interiorly/auth/client';
import type { Document } from '@interiorly/collaboration/types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@interiorly/design-system/components/ui/breadcrumb';
import { Button } from '@interiorly/design-system/components/ui/button';
import { useSidebar } from '@interiorly/design-system/components/ui/sidebar';
import {
  Comment01Icon,
  HappyIcon,
  LinerIcon,
  Menu01Icon,
  MoreHorizontalSquare01Icon,
  SentIcon,
  StarIcon,
} from 'hugeicons-react';
import type { ReactNode } from 'react';

interface EditorLayoutProps {
  document: Document;
  children: ReactNode;
}

const EditorLayout = ({ document, children }: EditorLayoutProps) => {
  const { setOpen, open } = useSidebar();
  const { organization } = useOrganization();

  if (!organization) {
    return <div>No organization found. Please check your permissions.</div>;
  }

  const toggleSidebar = () => setOpen(!open);

  const isIconDefault = document.icon === 'document' || !document.icon;

  return (
    <div className="flex min-h-screen w-full min-w-full flex-col">
      <header className="relative z-50 flex h-10 items-center justify-between bg-background px-1 text-sm">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleSidebar}
            aria-label={open ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu01Icon className="size-4" />
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="cursor-pointer">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <LinerIcon className="-rotate-12 size-4" />
              </BreadcrumbSeparator>
              <BreadcrumbPage className="cursor-pointer">
                <BreadcrumbLink>{document.name}</BreadcrumbLink>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <span className="text-muted-foreground">Edited 2m ago</span>
          <Button variant="ghost" className="gap-2 px-2" size="sm">
            <SentIcon className="size-4" />
            <span>Share</span>
          </Button>
          <Button variant="ghost" className="gap-2 px-2" size="sm">
            <Comment01Icon className="size-4" />
            <span>Comments</span>
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 px-2"
            size="icon"
            aria-label="Star document"
          >
            <StarIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 px-2"
            size="icon"
            aria-label="More options"
          >
            <MoreHorizontalSquare01Icon className="size-5" />
          </Button>
          <AvatarStack />
        </div>
      </header>
      <div className="relative z-20 h-64 bg-secondary" />
      <main className="relative z-30 mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden text-pretty bg-background px-8 py-16 shadow-sm">
        {isIconDefault ? (
          <div className="-top-8 absolute left-8 z-40 h-16 w-16 rounded-lg bg-muted shadow-md">
            {document.icon}
          </div>
        ) : (
          <Button
            variant="ghost"
            className="absolute top-4 left-7 flex h-7 items-center justify-center gap-1.5 rounded-lg px-1.5"
            size="sm"
          >
            <HappyIcon className="size-4 text-muted-foreground" />
            <span className="text-muted-foreground">Add Icon</span>
          </Button>
        )}
        <div className="flex items-center space-x-4">
          <h1 className="font-bold text-4xl tracking-tight">{document.name}</h1>
        </div>
        <div className="mt-4">{children}</div>
      </main>
    </div>
  );
};

export default EditorLayout;
