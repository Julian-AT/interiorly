import { env } from '@/env';
import { auth } from '@interiorly/auth/server';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { AvatarStack } from './components/avatar-stack';
import { Cursors } from './components/cursors';
import { Header } from './components/header';

const title = 'Interiorly';
const description = 'My application.';

const CollaborationProvider = dynamic(() =>
  import('./components/collaboration-provider').then(
    (mod) => mod.CollaborationProvider
  )
);

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  const { orgId } = await auth();

  if (!orgId) {
    notFound();
  }

  return (
    <>
      <Header pages={['Dashboard']} page="Data Fetching">
        {env.LIVEBLOCKS_SECRET && (
          <CollaborationProvider orgId={orgId}>
            <AvatarStack />
            <Cursors />
          </CollaborationProvider>
        )}
      </Header>
      <div className="flex flex-1 flex-col gap-4 bg-background p-4 pt-0">
        <div className="flex h-24 w-24 flex-1 flex-col gap-4 rounded-xl bg-card ">
          testss
        </div>
      </div>
    </>
  );
};

export default App;
