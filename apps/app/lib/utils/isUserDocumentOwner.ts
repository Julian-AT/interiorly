import type { DocumentUser } from '@interiorly/collaboration/types';
import type { RoomInfo } from '@liveblocks/node';

interface IsUserDocumentOwnerProps {
  room: RoomInfo;
  userId: DocumentUser['id'];
}

/**
 * Returns true if owner is set on room, and owner is equal to userId
 *
 * @param room - The room to test
 * @param userId - The user's id to check
 */
export function isUserDocumentOwner({
  room,
  userId,
}: IsUserDocumentOwnerProps): boolean {
  if (!room?.metadata?.owner) {
    return false;
  }

  const owner = Array.isArray(room.metadata.owner)
    ? room.metadata.owner[0]
    : room.metadata.owner;

  return owner === userId;
}
