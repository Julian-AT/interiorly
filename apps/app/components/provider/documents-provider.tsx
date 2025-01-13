'use client';

import { InitialDocumentProvider } from '@/lib/hooks';
import {
  createInitialPresence,
  createInitialStorage,
} from '@/liveblocks.config';
import type { Document } from '@interiorly/collaboration/types/document';
import { RoomProvider } from '@liveblocks/react/suspense';
import type { ReactNode } from 'react';
import LiveblocksProvider from './liveblocks-provider';

type Props = {
  roomId: string;
  initialDocument: Document;
  children: ReactNode;
};

export function DocumentProviders({
  roomId,
  initialDocument,
  children,
}: Props) {
  return (
    <LiveblocksProvider>
      <RoomProvider
        id={roomId}
        initialPresence={createInitialPresence()}
        initialStorage={createInitialStorage()}
      >
        <InitialDocumentProvider initialDocument={initialDocument}>
          {children}
        </InitialDocumentProvider>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
