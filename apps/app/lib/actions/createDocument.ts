'use server';

import { buildDocument } from '@/lib/utils';
import { auth, currentUser } from '@interiorly/auth/server';
import { DOCUMENT_URL } from '@interiorly/collaboration/constants';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type {
  Document,
  DocumentGroup,
  DocumentRoomMetadata,
  DocumentType,
  DocumentUser,
} from '@interiorly/collaboration/types';
import type { RoomAccesses, RoomData } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';

type Props = {
  name: Document['name'];
  type: DocumentType;
  userId: DocumentUser['id'];
  userAccesses?: DocumentUser['id'][];
  groupIds?: DocumentGroup['id'][];
};

/**
 * Create Document
 *
 * Create a new document, with a specified name and type, from userId and groupId
 * Uses custom API endpoint
 *
 * @param options - Document creation options
 * @param options.name - The name of the new document
 * @param options.type - The type of the new document e.g. "canvas"
 * @param options.userAccesses - The new document's initial user accesses
 * @param options.groupIds - The new document's initial groups
 * @param options.userId - The user creating the document
 * @param redirectToDocument - Redirect to the newly created document on success
 */
export async function createDocument(
  { name, type, userAccesses, userId, groupIds }: Props,
  redirectToDocument?: boolean
) {
  const user = await currentUser();
  const { orgId } = await auth();

  if (!user || !orgId) {
    return {
      error: {
        code: 401,
        message: 'Not signed in',
        suggestion: 'Sign in to get a document',
      },
    };
  }

  const metadata: DocumentRoomMetadata = {
    name: name,
    icon: type,
    coverImageUrl: '',
    type: type,
    owner: userId,
  };

  const usersAccesses: RoomAccesses = {
    [userId]: ['room:write'],
    ...(userAccesses
      ? Object.fromEntries(userAccesses.map((user) => [user, ['room:write']]))
      : {}),
  };

  const groupsAccesses: RoomAccesses = {};

  if (groupIds) {
    for (const groupId of groupIds) {
      groupsAccesses[groupId] = ['room:write'];
    }
  }

  const roomId = nanoid();

  let room: RoomData;
  try {
    room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      groupsAccesses,
      defaultAccesses: [],
    });
  } catch (err) {
    return {
      error: {
        code: 401,
        message: "Can't create room",
        suggestion: 'Please refresh the page and try again',
      },
    };
  }

  const document: Document = buildDocument(room);

  if (redirectToDocument) {
    // Has to return `undefined`
    return redirect(DOCUMENT_URL(document.type, document.id));
  }

  return { data: document };
}
