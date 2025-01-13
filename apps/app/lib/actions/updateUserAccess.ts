'use server';

import {
  buildDocument,
  buildDocumentUsers,
  documentAccessToRoomAccesses,
  isUserDocumentOwner,
  userAllowedInRoom,
} from '@/lib/utils';
import { auth } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import {
  type Document,
  DocumentAccess,
  type DocumentUser,
} from '@interiorly/collaboration/types';
import type { RoomData } from '@liveblocks/node';

type Props = {
  userId: DocumentUser['id'];
  documentId: Document['id'];
  access: DocumentAccess;
};

/**
 * Update User Access
 *
 * Add a collaborator to a given document with their userId
 * Uses custom API endpoint
 *
 * @param userId - The id of the invited user
 * @param documentId - The document id
 * @param access - The access level of the user
 */
export async function updateUserAccess({ userId, documentId, access }: Props) {
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

  const room = await liveblocks.getRoom(documentId);

  if (!room) {
    return {
      error: {
        code: 404,
        message: 'Document not found',
        suggestion: 'Check that you are on the correct page',
      },
    };
  }

  if (
    !userAllowedInRoom({
      accessAllowed: 'write',
      checkAccessLevel: 'user',
      userId: user.userId,
      groupIds: [],
      room,
    })
  ) {
    return {
      error: {
        code: 403,
        message: 'Not allowed access',
        suggestion: "Check that you've been given permission to the document",
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

  const document = await buildDocument(room);

  // Check user exists in system
  if (!user) {
    return {
      error: {
        code: 400,
        message: 'User not found',
        suggestion: "Check that you've used the correct user id",
      },
    };
  }

  // If user exists, check that they are not the owner
  if (isUserDocumentOwner({ room, userId })) {
    return {
      error: {
        code: 400,
        message: 'User is owner',
        suggestion: `User ${userId} is the document owner and cannot be edited`,
      },
    };
  }

  // If room exists, create userAccesses element for new collaborator with passed access level
  const userAccess = documentAccessToRoomAccesses(access);
  const usersAccesses: Record<
    string,
    ['room:write'] | ['room:read', 'room:presence:write'] | null
  > = {
    [userId]: userAccess.length === 0 ? null : userAccess,
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

  // If the user previously had no access to document, send a notification saying they've been added
  const previousAccessLevel = document.accesses.users[userId];
  if (!previousAccessLevel || previousAccessLevel === DocumentAccess.NONE) {
    liveblocks.triggerInboxNotification({
      userId,
      kind: '$addedToDocument',
      subjectId: document.id,
      roomId: room.id,
      activityData: {
        documentId: document.id,
      },
    });
  }

  const result: DocumentUser[] = await buildDocumentUsers(
    updatedRoom,
    user.userId
  );
  return { data: result };
}
