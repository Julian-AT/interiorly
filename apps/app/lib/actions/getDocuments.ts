'use server';

import {
  buildDocuments,
  getDraftsGroupName,
  userAllowedInRoom,
} from '@/lib/utils';
import { auth } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type {
  Document,
  DocumentGroup,
  DocumentType,
  DocumentUser,
} from '@interiorly/collaboration/types';

export type GetDocumentsProps = {
  groupIds?: DocumentGroup['id'][];
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
 * @param groupIds - The groups to filter for
 * @param userId - The user to filter for
 * @param documentType - The document type to filter for
 * @param drafts - Get only drafts
 * @param limit - The amount of documents to retrieve
 */
export async function getDocuments({
  groupIds = [],
  userId = undefined,
  documentType,
  drafts = false,
  limit = 20,
}: GetDocumentsProps) {
  const user = await auth();

  if (!user || !user.orgId || !user.userId) {
    return {
      error: {
        code: 401,
        message: 'Not signed in',
        suggestion: 'Sign in to get documents',
      },
    };
  }

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
    // Drafts are stored as a group that uses the userId
    getRoomsOptions = {
      ...getRoomsOptions,
      groupIds: [draftGroupName],
    };
  } else {
    // Not a draft, use other info
    getRoomsOptions = {
      ...getRoomsOptions,
      groupIds: groupIds.filter((id) => id !== draftGroupName),
      userId: userId,
    };
  }

  if (getRoomsOptions.groupIds?.length === 0) {
    getRoomsOptions.groupIds = [user.orgId];
  }

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let getRoomsResponse;
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
        userId: user.userId,
        groupIds: [user.orgId],
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
