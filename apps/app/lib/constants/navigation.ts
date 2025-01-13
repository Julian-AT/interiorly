import { AiFileIcon } from '@/components/icons/ai-file-icon';
import { Home05Icon, InboxIcon } from 'hugeicons-react';

export const WORKSPACE_NAV = [
  {
    title: 'Home',
    tooltip: 'View recent changes and more',
    url: '/',
    icon: Home05Icon,
    command: 'crtl+h',
  },
  {
    title: 'Inbox',
    url: '/inbox',
    icon: InboxIcon,
    command: 'crtl+u',
    tooltip: 'View @mentions and the updates',
  },
  {
    title: 'Interiorly AI',
    url: '/chat',
    icon: AiFileIcon,
    command: '',
    tooltip:
      'Create drafts, ask questions about your workspace and more powered by AI',
    isBeta: true,
  },
] as const;
