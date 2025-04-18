import {
  AnchoredThreads,
  FloatingComposer,
  FloatingThreads,
} from '@liveblocks/react-tiptap';
import { useThreads } from '@liveblocks/react/suspense';
import { useEditor } from 'novel';
import { useSyncExternalStore } from 'react';

export function Threads() {
  const { editor } = useEditor();
  const isMobile = useIsMobile();
  const { threads } = useThreads({ query: { resolved: false } });

  if (!editor) {
    return null;
  }

  return (
    <>
      <FloatingComposer
        editor={editor}
        className="w-[1000px] rounded-md bg-secondary"
      />
      {isMobile ? (
        <FloatingThreads
          editor={editor}
          threads={threads}
          style={{ width: '350px' }}
        />
      ) : (
        <AnchoredThreads
          editor={editor}
          threads={threads}
          style={{ width: '350px' }}
        />
      )}
    </>
  );
}

export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

function subscribe(callback: () => void) {
  const query = window.matchMedia('(max-width: 1279px)');

  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function getSnapshot() {
  const query = window.matchMedia('(max-width: 1279px)');
  return query.matches;
}
