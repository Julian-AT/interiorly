'use server';

import { buildDocument, userAllowedInRoom } from '@/lib/utils';
import { currentUser } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type { Document } from '@interiorly/collaboration/types/document';
import type { RoomData } from '@liveblocks/node';

type Props = {
  documentId: Document['id'];
};

/**
 * Get a document.
 * Only allow if user has access to room (including logged-out users and public rooms).
 *
 * @param documentId - The document id
 */
export async function getDocument({ documentId }: Props) {
  const user = await currentUser();

  if (!user || user.banned) {
    return {
      error: {
        code: 401,
        message: 'Not signed in',
        suggestion: 'Sign in to get a document',
      },
    };
  }

  let room: RoomData;
  try {
    room = await liveblocks.getRoom(documentId);
  } catch (err) {
    console.error(err);
    return {
      error: {
        code: 500,
        message: 'Error fetching document',
        suggestion: 'Refresh the page and try again',
      },
    };
  }

  if (!room) {
    return {
      error: {
        code: 404,
        message: 'Document not found',
        suggestion: "Check that you're on the correct page",
      },
    };
  }

  // Check current user has access to the room (if not logged in, use empty values)
  if (
    !userAllowedInRoom({
      accessAllowed: 'read',
      userId: user.id,
      groupIds: [],
      room,
    })
  ) {
    return {
      error: {
        code: 403,
        message: 'Not allowed access',
        suggestion: "Check that you've been given permission to the room",
      },
    };
  }

  // Convert room into our custom document format and return
  const document: Document = buildDocument(room);
  return { data: document };
}
