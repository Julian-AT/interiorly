'use client';

import * as React from 'react';

import { getDocuments } from '@/lib/actions';
import { useDocumentsFunctionSWR } from '@/lib/hooks';
import type { Document } from '@interiorly/collaboration/types';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@interiorly/design-system/components/ui/command';
import {
  Home05Icon,
  InboxIcon,
  Settings02Icon,
  UserSettings01Icon,
} from 'hugeicons-react';
import Link from 'next/link';
import { AiContentGenerator02Icon } from '../icons/ai-content-generator-02';

interface QuickSearchProps {
  children?: React.ReactNode;
}

export function QuickSearch({ children }: QuickSearchProps) {
  const [open, setOpen] = React.useState(false);
  const { data } = useDocumentsFunctionSWR(
    [
      getDocuments,
      {
        limit: 10,
      },
    ],
    {
      revalidateOnFocus: false,
    }
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      {/* biome-ignore lint/nursery/noStaticElementInteractions: quick fix */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: quick fix */}
      <div onClick={() => setOpen(true)}>{children}</div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          {data?.documents && (
            <CommandGroup heading="Documents">
              {data.documents.map((document: Document) => (
                <CommandItem
                  key={document.id}
                  className="flex items-center justify-between"
                >
                  <span key={document.id}>
                    {document.icon} {document.name}
                    <div className="hidden">{document.id}</div>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandGroup heading="Workspace" className="text-muted-foreground">
            <Link href="/">
              <CommandItem>
                <Home05Icon />
                <span>Home</span>
                <CommandShortcut>⌘H</CommandShortcut>
              </CommandItem>
            </Link>
            <Link href="/inbox">
              <CommandItem>
                <InboxIcon />
                <span>Inbox</span>
                <CommandShortcut>⌘U</CommandShortcut>
              </CommandItem>
            </Link>
            <Link href="/chat">
              <CommandItem>
                <AiContentGenerator02Icon />
                <span>Chat</span>
              </CommandItem>
            </Link>
            <CommandItem>
              <Settings02Icon />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Personal" className="text-muted-foreground">
            <CommandItem>
              <UserSettings01Icon />
              <span>Account Settings</span>
            </CommandItem>
            <CommandItem>
              <Settings02Icon />
              <span>Sign Out</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
