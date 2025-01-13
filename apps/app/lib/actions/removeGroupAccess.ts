'use server';

import { userAllowedInRoom } from '@/lib/utils';
import { currentUser } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type { Document, DocumentGroup } from '@interiorly/collaboration/types';
import type { RoomData } from '@liveblocks/node';

type Props = {
  groupId: DocumentGroup['id'];
  documentId: Document['id'];
};

/**
 * Remove Group Access
 *
 * Remove a group from a given document with its groupId
 * Uses custom API endpoint
 *
 * @param groupId - The id of the removed group
 * @param documentId - The document id
 */
export async function removeGroupAccess({ groupId, documentId }: Props) {
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

  if (
    !userAllowedInRoom({
      accessAllowed: 'write',
      checkAccessLevel: 'user',
      userId: user.id,
      groupIds: [],
      room,
    })
  ) {
    // Check current logged-in user is set as a user with id, ignoring groupIds and default access
    return {
      error: {
        code: 403,
        message: 'Not allowed access',
        suggestion: "Check that you've been given permission to the document",
      },
    };
  }

  if (!room) {
    // Check the room `documentId` exists
    return {
      error: {
        code: 404,
        message: 'Document not found',
        suggestion: "Check that you're on the correct page",
      },
    };
  }

  // If room exists, create groupsAccess element for removing the current group
  const groupsAccesses = {
    [groupId]: null,
  };

  // Update the room with the new collaborators
  let updatedRoom: RoomData | null;
  try {
    updatedRoom = await liveblocks.updateRoom(documentId, {
      groupsAccesses,
    });
  } catch (err) {
    return {
      error: {
        code: 401,
        message: "Can't edit group in room",
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

  // If successful, convert room to a list of groups and send
  return { data: updatedRoom };
}
