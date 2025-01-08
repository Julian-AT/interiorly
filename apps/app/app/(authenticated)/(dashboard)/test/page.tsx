'use client';

import { TextEditor } from '@/components/dashboard/editor';
import { CollaborationProvider } from '@/components/provider/collaboration-provider';
import { useOrganization } from '@interiorly/auth/client';
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

const TestDocumentPage = () => {
  const { setOpen, open } = useSidebar();
  const { organization } = useOrganization();
  const isIconActive = false;

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex h-10 items-center justify-between bg-background px-1 text-sm">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setOpen(!open)}
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
                <BreadcrumbLink>{organization.id}</BreadcrumbLink>
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <span className="text-muted-foreground">Edited 2m ago</span>
          <Button variant="ghost" className="px-2" size="sm">
            <SentIcon className="size-4" />
            Share
          </Button>
          <Button variant="ghost" className="px-2" size="sm">
            <Comment01Icon className="size-4" />
            Comments
          </Button>
          <Button variant="ghost" className="h-8 w-8 px-2" size="icon">
            <StarIcon className="size-5" />
          </Button>
          <Button variant="ghost" className="h-8 w-8 px-2" size="icon">
            <MoreHorizontalSquare01Icon className="size-5 text-white" />
          </Button>
        </div>
      </div>
      <div className="h-64 bg-secondary" />
      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden text-pretty bg-background px-8 py-16 shadow-sm">
        {isIconActive ? (
          <div className="-top-8 absolute left-8 h-16 w-16 rounded-lg bg-primary shadow-md" />
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
          <h1 className="font-bold text-4xl tracking-tight">Luuhhhh Twizzy</h1>
        </div>
        <div className="mt-4">
          <CollaborationProvider orgId={organization.id}>
            <TextEditor />
          </CollaborationProvider>
        </div>
      </div>
    </div>
  );
};

export default TestDocumentPage;
