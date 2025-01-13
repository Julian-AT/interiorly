'use server';

import type { GetDocumentsResponse } from '@/lib/actions/getDocuments';
import { buildDocuments, userAllowedInRoom } from '@/lib/utils';
import { currentUser } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type { RoomData } from '@liveblocks/node';

type Props = {
  nextCursor: string;
};

/**
 * Get Next Documents
 *
 * Get the next set of documents using userId and nextPage.
 * nextPage can be retrieved from getDocumentsByGroup.ts
 * Uses custom API endpoint
 *
 * @param nextPage - nextPage, retrieved from getDocumentByGroup
 */
export async function getNextDocuments({ nextCursor }: Props) {
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

  let getRoomsResponse: {
    nextPage: string | null;
    nextCursor: string | null;
    data: RoomData[];
  };
  try {
    // Get session and rooms
    getRoomsResponse = await liveblocks.getRooms({ startingAfter: nextCursor });
  } catch (err) {
    console.log(err);
    return {
      error: {
        code: 500,
        message: 'Error fetching rooms',
        suggestion: 'Refresh the page and try again',
      },
    };
  }

  const { data: rooms, nextCursor: newNextCursor } = getRoomsResponse;

  if (!rooms) {
    return {
      error: {
        code: 404,
        message: 'No more rooms found',
        suggestion: 'No more rooms to paginate',
      },
    };
  }

  // In case a room has changed, filter rooms the user no longer has access to
  const finalRooms = [];
  for (const room of rooms) {
    if (
      userAllowedInRoom({
        accessAllowed: 'read',
        userId: user.id,
        groupIds: [],
        room: room,
      })
    ) {
      finalRooms.push(room);
    }
  }

  // Convert to our document format and return
  const documents = buildDocuments(finalRooms);
  const result: GetDocumentsResponse = {
    documents: documents,
    nextCursor: newNextCursor,
  };

  return { data: result };
}
