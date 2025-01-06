import { AiFileIcon } from '@/components/icons/ai-file-icon';
import {
  Add01Icon,
  Delete02Icon,
  File02Icon,
  Home05Icon,
  InboxIcon,
} from 'hugeicons-react';

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

export const SECONDARY_NAV = [
  {
    title: 'New Page',
    url: '/',
    icon: Add01Icon,
    tooltip: 'Create a new page',
  },
  {
    title: 'Trash',
    url: '#',
    icon: Delete02Icon,
    tooltip: 'View deleted pages',
  },
] as const;

export const EXAMPLE_PAGES = [
  {
    name: 'Example Page 1',
    url: '#',
    icon: File02Icon,
  },
  {
    name: 'Example Page 2',
    url: '#',
    icon: File02Icon,
  },
  {
    name: 'Example Page 3',
    url: '#',
    icon: File02Icon,
  },
] as const;
