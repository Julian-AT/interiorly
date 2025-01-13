'use server';

import { userAllowedInRoom } from '@/lib/utils';
import { auth, currentUser } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type { Document } from '@interiorly/collaboration/types/document';
import type { RoomData } from '@liveblocks/node';

type Props = {
  documentId: Document['id'];
};

/**
 * Delete Document
 *
 * Deletes a document from its id
 * Uses custom API endpoint
 *
 * @param documentId - The document's id
 */
export async function deleteDocument({ documentId }: Props) {
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
  let room: RoomData;
  try {
    room = await liveblocks.getRoom(documentId);
  } catch (err) {
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

  if (
    !userAllowedInRoom({
      accessAllowed: 'write',
      userId: user.id,
      groupIds: [],
      room,
    })
  ) {
    // Check current user has write access on the room (if not logged in, use empty values)
    return {
      error: {
        code: 403,
        message: 'Not allowed access',
        suggestion: "Check that you've been given permission to the room",
      },
    };
  }

  // Delete room
  try {
    await liveblocks.deleteRoom(documentId);
  } catch (err) {
    return {
      error: {
        code: 401,
        message: "Can't delete the room",
        suggestion: 'Please try again',
      },
    };
  }

  return { data: documentId };
}
