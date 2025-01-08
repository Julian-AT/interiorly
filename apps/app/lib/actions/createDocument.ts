'use server';

import { buildDocument, getDraftsGroupName } from '@/lib/utils';
import { auth, currentUser } from '@interiorly/auth/server';
import { authenticate } from '@interiorly/collaboration/auth';
import { DOCUMENT_URL } from '@interiorly/collaboration/constants';
import type {
  Document,
  DocumentGroup,
  DocumentRoomMetadata,
  DocumentType,
  DocumentUser,
} from '@interiorly/collaboration/types';
import type { RoomAccesses } from '@liveblocks/node';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';

type Props = {
  name: Document['name'];
  type: DocumentType;
  userId: DocumentUser['id'];
  groupIds?: DocumentGroup['id'][];
  draft?: boolean;
};

/**
 * Create Document
 *
 * Create a new document, with a specified name and type, from userId and groupId
 * Uses custom API endpoint
 *
 * @param options - Document creation options
 * @param options.name - The name of the new document
 * @param options.type - The type of the new document e.g. "canvas"
 * @param options.groupIds - The new document's initial groups
 * @param options.userId - The user creating the document
 * @param options.draft - If the document is a draft (no public or group access, but can invite)
 * @param redirectToDocument - Redirect to the newly created document on success
 */
export async function createDocument(
  { name, type, groupIds, userId, draft = false }: Props,
  redirectToDocument?: boolean
) {
  const user = await auth();

  if (!user || !user.userId || !user.orgId) {
    return {
      error: {
        code: 401,
        message: 'Not signed in',
        suggestion: 'Sign in to create a new document',
      },
    };
  }

  const metadata: DocumentRoomMetadata = {
    name: name,
    type: type,
    owner: userId,
    draft: draft ? 'yes' : 'no',
  };

  const usersAccesses: RoomAccesses = {
    [userId]: ['room:write'],
  };

  const groupsAccesses: RoomAccesses = {};

  if (draft) {
    groupsAccesses[getDraftsGroupName(userId)] = ['room:write'];
  } else if (groupIds) {
    for (const groupId of groupIds) {
      groupsAccesses[groupId] = ['room:write'];
    }
  }

  const userInfo = await currentUser();

  const roomId = nanoid();
  const liveblocks = authenticate({
    userId: user.userId,
    orgId: user.orgId,
    userInfo: {
      avatar: userInfo?.imageUrl,
      color: '',
      name: userInfo?.fullName,
    },
  });

  let room;
  try {
    room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      groupsAccesses,
      defaultAccesses: [],
    });
  } catch (err) {
    return {
      error: {
        code: 401,
        message: "Can't create room",
        suggestion: 'Please refresh the page and try again',
      },
    };
  }

  const document: Document = buildDocument(room);

  if (redirectToDocument) {
    // Has to return `undefined`
    return redirect(DOCUMENT_URL(document.type, document.id));
  }

  return { data: document };
}
