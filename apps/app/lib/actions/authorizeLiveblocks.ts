'use server';

import { getDraftsGroupName } from '@/lib/utils';
import { currentUser } from '@interiorly/auth/server';
import { liveblocks } from '@interiorly/collaboration/liveblocks.server.config';
import type { User } from '@interiorly/collaboration/types';
import { colors } from '../data/colors';

export async function authorizeLiveblocks() {
  const user = await currentUser();

  let userInfo: User;

  // Anonymous user info

  if (user?.id) {
    userInfo = {
      id: user.id,
      name:
        user.fullName || user.username || user.emailAddresses[0].emailAddress,
      color: colors[Math.floor(Math.random() * colors.length)],
      groupIds: [getDraftsGroupName(user.id)],
      avatar: user.imageUrl,
    };
  } else {
    userInfo = {
      id: 'anonymous',
      name: 'Anonymous',
      color: '#ff0000',
      groupIds: [],
    };
  }

  // Get Liveblocks ID token
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: userInfo.id,
      groupIds: [getDraftsGroupName(userInfo.id)],
    },
    {
      userInfo: {
        name: userInfo.name,
        color: userInfo.color,
        avatar: userInfo.avatar,
      },
    }
  );

  if (status !== 200) {
    return {
      error: {
        code: 401,
        message: 'No access',
        suggestion: "You don't have access to this Liveblocks room",
      },
    };
  }

  if (!body) {
    return {
      error: {
        code: 404,
        message: 'ID token issue',
        suggestion: 'Contact an administrator',
      },
    };
  }

  return { data: JSON.parse(body) };
}
