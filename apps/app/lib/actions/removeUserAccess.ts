'use server';

import {
  buildDocumentUsers,
  isUserDocumentOwner,
  userAllowedInRoom,
} from '@/lib/utils';
import { currentUser } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type { Document, DocumentUser } from '@interiorly/collaboration/types';
import type { RoomData } from '@liveblocks/node';

type Props = {
  userId: DocumentUser['id'];
  documentId: Document['id'];
};

/**
 * Remove User Access
 *
 * Remove a user from a given document with their userId
 * Uses custom API endpoint
 *
 * @param userId - The id of the removed user
 * @param documentId - The document id
 */
export async function removeUserAccess({ userId, documentId }: Props) {
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

  if (!user) {
    // Check user exists in system
    return {
      error: {
        code: 400,
        message: 'User not found',
        suggestion: "Check that you've used the correct user id",
      },
    };
  }

  if (isUserDocumentOwner({ room, userId })) {
    // If user exists, check that they are not the owner
    return {
      error: {
        code: 400,
        message: 'User is owner',
        suggestion: `User ${userId} is the document owner and cannot be edited`,
      },
    };
  }

  // If room exists, create userAccesses element for removing the current collaborator
  const usersAccesses = {
    [userId]: null,
  };

  // Send userAccesses to room and remove user
  let updatedRoom: RoomData | null;
  try {
    updatedRoom = await liveblocks.updateRoom(documentId, {
      usersAccesses,
    });
  } catch (err) {
    return {
      error: {
        code: 401,
        message: "Can't remove user from room",
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

  const result: DocumentUser[] = await buildDocumentUsers(updatedRoom, user.id);
  return { data: result };
}
