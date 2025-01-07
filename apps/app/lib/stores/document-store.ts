// import type { Document } from '@prisma/client';
// import { createStore } from 'zustand';

// export type WorkspaceDocumentState = {
//   workspaceId: string | null;
//   documents: Document[];
// };

// export type WorkspaceDocumentAction = {
//   setWorkspaceId: (workspaceId: string | null) => void;
//   setDocuments: (documents: Document[]) => void;
// };

// export type WorkspaceDocumentStore = WorkspaceDocumentState &
//   WorkspaceDocumentAction;

// export const defaultInitState: WorkspaceDocumentState = {
//   workspaceId: null,
//   documents: [],
// };

// export const createWorkspaceDocumentStore = (
//   initState: WorkspaceDocumentState = defaultInitState
// ) => {
//   return createStore<WorkspaceDocumentStore>()((set) => ({
//     ...initState,
//     setWorkspaceId: (workspaceId) => set({ workspaceId }),
//     setDocuments: (documents) => set({ documents }),
//   }));
// };
