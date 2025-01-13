import type { Group, User } from './data';

/**
 * This is the main type of your Documents.
 * Make sure to edit /lib/server/utils/buildDocuments.ts when adding new
 * properties.
 */
export type Document = {
  id: string;
  name: string;
  accesses: DocumentAccesses;
  owner: DocumentUser['id'];
  icon: string | null;
  coverImageUrl: string | null;
  created: string;
  lastConnection: string;
  draft: boolean;
  type: DocumentType;
};

export type DocumentType = 'text' | 'whiteboard' | 'canvas';

export type DocumentGroup = Group & {
  access: DocumentAccess;
};

export type DocumentUser = User & {
  access: DocumentAccess;
  isCurrentUser: boolean;
};

export enum DocumentAccess {
  // Can edit, read, and modify invited users
  FULL = 'full',

  // Can edit and read the document
  EDIT = 'edit',

  // Can only read the document
  READONLY = 'readonly',

  // Can't view the document
  NONE = 'none',
}

export type DocumentAccesses = {
  default: DocumentAccess;
  groups: Record<DocumentGroup['id'], DocumentAccess>;
  users: Record<DocumentUser['id'], DocumentAccess>;
};

// Room metadata used when creating a new document
export interface DocumentRoomMetadata
  extends Record<string, string | string[]> {
  name: Document['name'];
  type: DocumentType;
  owner: User['id'];
}

export type ErrorData = {
  message: string;
  code?: number;
  suggestion?: string;
};
