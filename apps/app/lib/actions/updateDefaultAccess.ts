'use server';

import {
  buildDocument,
  documentAccessToRoomAccesses,
  userAllowedInRoom,
} from '@/lib/utils';
import { auth } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type { Document, DocumentAccess } from '@interiorly/collaboration/types';
import type { RoomData } from '@liveblocks/node';

type Props = {
  documentId: Document['id'];
  access: DocumentAccess;
};

/**
 * Update Default Access
 *
 * Given a document, update its default access
 * Uses custom API endpoint
 *
 * @param documentId - The document to update
 * @param access - The new DocumentAccess permission level
 */
export async function updateDefaultAccess({ documentId, access }: Props) {
  const user = await auth();

  if (!user || !user.userId || !user.orgId) {
    return {
      error: {
        code: 401,
        message: 'Not authenticated',
        suggestion: 'Please sign in',
      },
    };
  }

  let room: RoomData | null;
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

  // Check current logged-in user has write access to the room
  if (
    !userAllowedInRoom({
      accessAllowed: 'write',
      userId: user.userId,
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

  // If room exists, create default access parameter for room
  const defaultAccesses = documentAccessToRoomAccesses(access);

  // Update the room with the new collaborators
  let updatedRoom: RoomData | null;
  try {
    updatedRoom = await liveblocks.updateRoom(documentId, {
      defaultAccesses,
    });
  } catch (err) {
    return {
      error: {
        code: 401,
        message: "Can't edit default access level in room",
        suggestion: 'Please refresh the page and try again',
      },
    };
  }

  if (!updatedRoom) {
    return {
      error: {
        code: 404,
        message: 'Updated room not found',
        suggestion: 'Contact an administrator',
      },
    };
  }

  // If successful, covert to custom document format and return
  const document: Document = buildDocument(updatedRoom);
  return { data: document };
}
