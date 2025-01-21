import { WORKSPACE_NAV } from '@/lib/constants/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const KbdShortcutHandler = () => {
  const router = useRouter();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!e.metaKey && !e.ctrlKey) {
        return;
      }

      const item = WORKSPACE_NAV.find(
        (item) =>
          item.command && e.key === item.command.split('+')[1].toLowerCase()
      );

      if (item) {
        e.preventDefault();
        router.push(item.url);
      }
    },
    [router]
  );

  // Handle keyboard shortcuts
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  return null;
};

export default KbdShortcutHandler;
