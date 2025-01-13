'use server';

import { userAllowedInRoom } from '@/lib/utils';
import { auth } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type { Document } from '@interiorly/collaboration/types';
import type { RoomData } from '@liveblocks/node';

interface Props {
  documentId: Document['id'];
  name: Document['name'];
}

/**
 * Update Document Name
 *
 * Given a document, update its name
 * Uses custom API endpoint
 *
 * @param documentId - The documentId to update
 * @param name - The document's new name
 */
export async function renameDocument({ documentId, name }: Props) {
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
    // Get session and room
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

  // Check current user has write access on the room (if not logged in, use empty values)
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

  // Update room name metadata
  try {
    await liveblocks.updateRoom(documentId, {
      metadata: { name },
    });
  } catch (err) {
    return {
      error: {
        code: 401,
        message: "Can't update room name metadata",
        suggestion: 'Please refresh the page and try again',
      },
    };
  }

  return { data: true };
}
