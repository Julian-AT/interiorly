import type { DocumentType } from './types';

export const DASHBOARD_URL = '/';
export const DASHBOARD_DRAFTS_URL = `${DASHBOARD_URL}/drafts`;
export const DASHBOARD_GROUP_URL = (id: string) =>
  `${DASHBOARD_URL}/group/${id}`;

export const DOCUMENT_URL = (type: DocumentType, id: string) =>
  `/${type}/${id}`;
