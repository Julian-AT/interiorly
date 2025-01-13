import type { Document } from '@interiorly/collaboration/types';
import { type ReactNode, createContext, useContext } from 'react';

const DocumentContext = createContext<Document | undefined>(undefined);

type Props = {
  initialDocument: Document;
  children: ReactNode;
};

export function InitialDocumentProvider({ initialDocument, children }: Props) {
  return (
    <DocumentContext.Provider value={initialDocument}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useInitialDocument() {
  const document = useContext(DocumentContext);

  if (!document) {
    throw new Error(
      'useInitialDocument must be used within an InitialDocumentProvider'
    );
  }

  return document;
}
