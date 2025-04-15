'use client';

import { Button } from '@interiorly/design-system/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-8 w-8 cursor-pointer rounded-full"
    >
      <Sun className="dark:-rotate-90 h-8 w-8 scale-100 text-primary transition-all dark:scale-0" />
      <Moon className="absolute h-8 w-8 rotate-90 scale-0 text-primary transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
