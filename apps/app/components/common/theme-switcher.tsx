'use client';

import { cn } from '@interiorly/design-system/lib/utils';
import { ComputerSettingsIcon, Moon02Icon, Sun03Icon } from 'hugeicons-react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    {
      key: 'system',
      icon: ComputerSettingsIcon,
      label: 'System theme',
    },
    {
      key: 'light',
      icon: Sun03Icon,
      label: 'Light theme',
    },
    {
      key: 'dark',
      icon: Moon02Icon,
      label: 'Dark theme',
    },
  ];

  return (
    <div className="relative flex h-8 w-28 max-w-max rounded-full bg-backdrop p-1 ring-1 ring-border">
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            type="button"
            key={key}
            className="relative h-6 w-6 rounded-full"
            onClick={() => setTheme(key)}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-full bg-background"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                'relative m-auto h-4 w-4',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
