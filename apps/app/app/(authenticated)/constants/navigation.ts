import { AiFileIcon } from '@/app/(authenticated)/components/icons/ai-file-icon';
import {
  Add01Icon,
  Delete02Icon,
  File02Icon,
  HelpCircleIcon,
  Home05Icon,
  InboxIcon,
  SearchList01Icon,
  UserAdd01Icon,
} from 'hugeicons-react';

export const WORKSPACE_NAV = [
  {
    title: 'Home',
    url: '/home',
    icon: Home05Icon,
    command: 'crtl+h',
  },
  {
    title: 'Inbox',
    url: '/inbox',
    icon: InboxIcon,
    command: 'crtl+i',
  },
  {
    title: 'Interiorly AI',
    url: '/chat',
    icon: AiFileIcon,
    command: 'crtl+a',
  },
  {
    title: 'Quick Find',
    url: '#',
    icon: SearchList01Icon,
    command: 'crtl+f',
  },
] as const;

export const SECONDARY_NAV = [
  {
    title: 'New Page',
    url: '/',
    icon: Add01Icon,
  },
  {
    title: 'Trash',
    url: '#',
    icon: Delete02Icon,
  },
  {
    title: 'Help',
    url: '#',
    icon: HelpCircleIcon,
  },
  {
    title: 'Invite Members',
    url: '#',
    icon: UserAdd01Icon,
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
