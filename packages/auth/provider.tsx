'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import type { Theme } from '@clerk/types';
import { defaultTheme } from '@interiorly/tailwind-config';
import { useTheme } from 'next-themes';
import type { ComponentProps } from 'react';

export const AuthProvider = (
  properties: ComponentProps<typeof ClerkProvider>
) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const baseTheme = isDark ? dark : undefined;
  const variables: Theme['variables'] = {
    // Core
    fontFamily: defaultTheme.fontFamily.sans.join(', '),
    fontFamilyButtons: defaultTheme.fontFamily.sans.join(', '),
    fontSize: defaultTheme.fontSize.sm.join(', '),
    fontWeight: {
      bold: defaultTheme.fontWeight.bold,
      normal: defaultTheme.fontWeight.normal,
      medium: defaultTheme.fontWeight.medium,
    },
    spacingUnit: defaultTheme.spacing[4],
  };

  const elements: Theme['elements'] = {
    dividerLine: 'bg-border',
    socialButtonsIconButton: 'bg-card',
    navbarButton: 'text-foreground',
    organizationSwitcherTrigger__open: 'bg-background',
    organizationPreviewMainIdentifier: 'text-foreground',
    organizationSwitcherTriggerIcon: 'text-muted-foreground',
    organizationPreview__organizationSwitcherTrigger: 'gap-2',
    organizationPreviewAvatarContainer: 'shrink-0',
  };

  return (
    <ClerkProvider
      {...properties}
      appearance={{ baseTheme, variables, elements }}
    />
  );
};
