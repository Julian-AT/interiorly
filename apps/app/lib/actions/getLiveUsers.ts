'use server';

import { currentUser } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type { Document } from '@interiorly/collaboration/types/document';
import type { RoomUser } from '@liveblocks/node';

type LiveUserList = { documentId: Document['id']; users: RoomUser[] };

type Props = {
  documentIds: Document['id'][];
};

/**
 * Get Live Users
 *
 * Get the online users in the documents passed
 * Uses custom API endpoint
 *
 * @param documentIds - An array of document ids
 */
export async function getLiveUsers({ documentIds }: Props) {
  const promises: ReturnType<typeof liveblocks.getActiveUsers>[] = [];

  for (const roomId of documentIds) {
    promises.push(liveblocks.getActiveUsers(roomId));
  }

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

  let currentActiveUsers = [];
  try {
    // Get session and rooms
    const [, ...roomUsers] = await Promise.all([...promises]);
    currentActiveUsers = roomUsers;
  } catch (err) {
    console.error(err);
    return {
      error: {
        code: 500,
        message: 'Error fetching rooms',
        suggestion: 'Refresh the page and try again',
      },
    };
  }

  const result: LiveUserList[] = [];
  // Add active user info to list ready to return
  for (const [i, roomId] of documentIds.entries()) {
    const { data } = currentActiveUsers[i];
    const users = data ?? [];

    result.push({
      documentId: roomId,
      users: users,
    });
  }

  return { data: result };
}
