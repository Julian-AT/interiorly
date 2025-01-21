'use client';
import { AvatarStack } from '@/components/collaboration/avatar-stack';
import { useOrganization } from '@interiorly/auth/client';
import type { Document } from '@interiorly/collaboration/types';
import { Badge } from '@interiorly/design-system/components/ui/badge';
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
import { useSyncStatus } from '@liveblocks/react';
import { HappyIcon, LinerIcon, Menu01Icon } from 'hugeicons-react';
import { useState } from 'react';
import { TextEditor } from '.';

interface EditorLayoutProps {
  document: Document;
}

const EditorLayout = ({ document }: EditorLayoutProps) => {
  const { setOpen, open } = useSidebar();
  const { organization } = useOrganization();
  const [charsCount, setCharsCount] = useState<number>(0);
  const syncStatus = useSyncStatus({ smooth: true });

  if (!organization) {
    return <div>No organization found. Please check your permissions.</div>;
  }

  const toggleSidebar = () => setOpen(!open);

  const isIconDefault = document.icon === 'document' || !document.icon;

  return (
    <div className="flex min-h-screen w-full min-w-full flex-col">
      <header className="sticky top-0 z-50 flex h-10 items-center justify-between bg-background px-1 text-sm">
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
          <Badge variant="outline" className="bg-secondary text-xs">
            {syncStatus === 'synchronizing' ? 'Unsaved' : 'Saved'}
          </Badge>
          <Badge variant="outline" className="bg-secondary text-xs">
            {charsCount} Words
          </Badge>
          <AvatarStack />
        </div>
      </header>
      <div className="relative z-10 h-64 bg-secondary" />
      <main className="relative z-20 flex w-full flex-1 flex-col text-pretty bg-background shadow-sm">
        <div className="relative mx-auto w-full max-w-4xl px-10 pt-16">
          {isIconDefault ? (
            <div className="-top-8 absolute left-9 z-30 h-16 w-16 rounded-lg bg-muted shadow-md">
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
            <h1 className="font-bold text-4xl tracking-tight">
              {document.name}
            </h1>
          </div>
        </div>
        <div className="mx-auto mt-4 w-full max-w-4xl">
          <TextEditor setCharsCount={setCharsCount} />
        </div>
      </main>
    </div>
  );
};

export default EditorLayout;
