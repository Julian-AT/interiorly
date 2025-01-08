import type { Document } from '@prisma/client';
import { createStore } from 'zustand';

export type WorkspaceDocumentState = {
  workspaceId: string | null;
  documents: Document[];
};

export type WorkspaceDocumentAction = {
  setWorkspaceId: (workspaceId: string | null) => void;
  setDocuments: (documents: Document[]) => void;
  updateDocument: (document: Document) => void;
  deleteDocument: (documentId: string) => void;
};

export type WorkspaceDocumentStore = WorkspaceDocumentState &
  WorkspaceDocumentAction;

export const defaultInitState: WorkspaceDocumentState = {
  workspaceId: null,
  documents: [],
};

export const createWorkspaceDocumentStore = (
  initState: WorkspaceDocumentState = defaultInitState
) => {
  return createStore<WorkspaceDocumentStore>()((set) => ({
    ...initState,
    setWorkspaceId: (workspaceId) => set({ workspaceId }),
    setDocuments: (documents) => set({ documents }),
    updateDocument: (document) =>
      set((state) => ({
        documents: state.documents.map((d) =>
          d.id === document.id ? document : d
        ),
      })),
    deleteDocument: (documentId) =>
      set((state) => ({
        documents: state.documents.filter((d) => d.id !== documentId),
      })),
  }));
};
