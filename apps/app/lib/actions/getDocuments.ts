'use server';

import {
  buildDocuments,
  getDraftsGroupName,
  userAllowedInRoom,
} from '@/lib/utils';
import { auth, currentUser } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type {
  Document,
  DocumentType,
  DocumentUser,
} from '@interiorly/collaboration/types/document';
import type { RoomData } from '@liveblocks/node';

export type GetDocumentsProps = {
  userId?: DocumentUser['id'];
  documentType?: DocumentType;
  drafts?: boolean;
  limit?: number;
};

export type GetDocumentsResponse = {
  documents: Document[];
  nextCursor: string | null;
};

/**
 * Get Documents
 *
 * Get a list of documents by groupId, userId, and metadata
 * Uses custom API endpoint
 *
 * @param userId - The user to filter for
 * @param documentType - The document type to filter for
 * @param drafts - Get only drafts
 * @param limit - The amount of documents to retrieve
 */
export async function getDocuments({
  userId = undefined,
  documentType,
  drafts = false,
  limit = 20,
}: GetDocumentsProps) {
  // Build getRooms arguments
  let query: string | undefined;

  if (documentType) {
    query = `metadata["type"]:${JSON.stringify(documentType)}`;
  }

  let getRoomsOptions: Parameters<typeof liveblocks.getRooms>[0] = {
    limit,
    query,
  };

  const draftGroupName = getDraftsGroupName(userId || '');

  if (drafts) {
    getRoomsOptions = {
      ...getRoomsOptions,
      groupIds: [draftGroupName],
    };
  } else {
    getRoomsOptions = {
      ...getRoomsOptions,
      userId: userId,
    };
  }

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

  // only allow documents in the current organization
  getRoomsOptions.groupIds = [orgId];

  console.log(getRoomsOptions);

  let getRoomsResponse: { data: RoomData[]; nextCursor: string | null };
  try {
    // Get session and rooms
    getRoomsResponse = await liveblocks.getRooms(getRoomsOptions);
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

  const { data: rooms, nextCursor } = getRoomsResponse;

  if (!rooms) {
    return {
      error: {
        code: 400,
        message: 'No rooms found',
        suggestion: 'Refresh the page and try again',
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
        room,
      })
    ) {
      finalRooms.push(room);
    }
  }

  // Convert rooms to custom document format
  const documents = buildDocuments(finalRooms);
  const result: GetDocumentsResponse = {
    documents,
    nextCursor,
  };

  return { data: result };
}
