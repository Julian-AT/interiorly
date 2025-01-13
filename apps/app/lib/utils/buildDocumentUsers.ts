import { roomAccessesToDocumentAccess } from '@/lib/utils/convertAccessType';
import { currentUser } from '@interiorly/auth/server';
import type { DocumentUser } from '@interiorly/collaboration/types';
import type { RoomInfo } from '@liveblocks/node';
import { colors } from '../data/colors';

/**
 * Convert a Liveblocks room result into a list of DocumentUsers
 *
 * @param result - Liveblocks getRoomById() result
 * @param userId - The current user's id
 */
export async function buildDocumentUsers(result: RoomInfo, userId: string) {
  const users: DocumentUser[] = [];

  for (const [id, accessValue] of Object.entries(result.usersAccesses)) {
    const user = await currentUser();

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    if (user) {
      users.push({
        access: roomAccessesToDocumentAccess(accessValue, true),
        id: user.id,
        name: user.username || user.emailAddresses[0].emailAddress,
        avatar: user.imageUrl,
        color: randomColor,
        isCurrentUser: id === userId,
        groupIds: [],
      });
    }
  }

  return users;
}
