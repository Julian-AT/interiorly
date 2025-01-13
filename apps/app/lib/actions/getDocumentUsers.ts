'use server';

import { buildDocumentUsers } from '@/lib/utils';
import { currentUser } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type {
  Document,
  DocumentUser,
} from '@interiorly/collaboration/types/document';
import type { RoomData } from '@liveblocks/node';

type Props = {
  documentId: Document['id'];
};

/**
 * Get Document Users
 *
 * Get the DocumentUsers in a given document
 * Uses custom API endpoint
 *
 * @param documentId - The document id
 */
export async function getDocumentUsers({ documentId }: Props) {
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

  // If successful, convert room to a list of groups and send
  const result: DocumentUser[] = await buildDocumentUsers(room, user.id);
  return { data: result };
}
