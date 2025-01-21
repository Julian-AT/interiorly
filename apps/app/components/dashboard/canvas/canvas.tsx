'use client';

import 'tldraw/tldraw.css';
import './canvas.css';
import { AvatarStack } from '@/components/collaboration/avatar-stack';
import { Button } from '@interiorly/design-system/components/ui/button';
import { Separator } from '@interiorly/design-system/components/ui/separator';
import { useSidebar } from '@interiorly/design-system/components/ui/sidebar';
import { ClientSideSuspense } from '@liveblocks/react';
import { useSelf } from '@liveblocks/react/suspense';
import { Menu01Icon } from 'hugeicons-react';
import { Tldraw } from 'tldraw';
import { useStorageStore } from './useStorageStore';

export function Canvas() {
  return (
    <ClientSideSuspense fallback={<div>Loading...</div>}>
      <LiveblocksCanvas />
    </ClientSideSuspense>
  );
}

function LiveblocksCanvas() {
  // Getting authenticated user info. Doing this using selectors instead
  // of just `useSelf()` to prevent re-renders on Presence changes
  const id = useSelf((me) => me.id);
  const info = useSelf((me) => me.info);
  const canWrite = useSelf((me) => me.canWrite);

  const store = useStorageStore({
    user: { id, color: info.color, name: info.name },
  });

  const components = {
    MenuPanel,
  };

  return (
    <div
      style={{ height: '100%', width: '100%' }}
      className="tldraw__editor z-10 border-l"
    >
      <Tldraw
        components={components}
        store={store}
        onMount={(editor) => {
          editor.updateInstanceState({ isReadonly: !canWrite });
        }}
        autoFocus
        inferDarkMode
      />
    </div>
  );
}

function MenuPanel() {
  const { setOpen, open } = useSidebar();

  return (
    <div className="absolute z-[500] flex w-max items-center justify-between gap-2 rounded-br-md bg-secondary p-2 font-normal text-base">
      <Button
        onClick={() => setOpen(!open)}
        variant="ghost"
        size="icon"
        className="z-20 size-5 p-0"
      >
        <Menu01Icon />
      </Button>
      <span>Canvas Document</span>
      <Separator orientation="vertical" className="mx-1 h-5" />
      <div className="tldraw__share-panel z-100 w-max rounded-br-lg bg-secondary text-lg">
        <AvatarStack />
      </div>
    </div>
  );
}
