'use client';

import { getUsers } from '@/app/actions/users/get';
import { searchUsers } from '@/app/actions/users/search';
import { authorizeLiveblocks } from '@/lib/actions/authorizeLiveblocks';
import { LiveblocksProvider as _LiveblocksProvider } from '@liveblocks/react';
import Router from 'next/router';
import type React from 'react';

interface LiveblocksProviderProps {
  children: React.ReactNode;
}

const LiveblocksProvider = ({ children }: LiveblocksProviderProps) => {
  const resolveUsers = async ({ userIds }: { userIds: string[] }) => {
    const response = await getUsers(userIds);

    if ('error' in response) {
      throw new Error('Problem resolving users');
    }

    return response.data;
  };

  const resolveMentionSuggestions = async ({ text }: { text: string }) => {
    const response = await searchUsers(text);

    if ('error' in response) {
      throw new Error('Problem resolving mention suggestions');
    }

    return response.data;
  };

  return (
    <_LiveblocksProvider
      authEndpoint={async () => {
        const { data, error } = await authorizeLiveblocks();
        if (error) {
          Router.push({
            query: {
              ...Router.query,
              error: encodeURIComponent(JSON.stringify(error)),
            },
          });
          return;
        }
        return data;
      }}
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={resolveMentionSuggestions}
      throttle={16}
    >
      {children}
    </_LiveblocksProvider>
  );
};

export default LiveblocksProvider;
