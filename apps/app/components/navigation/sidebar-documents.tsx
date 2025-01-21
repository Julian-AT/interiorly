'use client';
import { usePaginatedDocumentsSWR } from '@/lib/hooks';
import { SidebarMenu } from '@interiorly/design-system/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import DocumentTypeIcon from '../collaboration/document-type-icon';
import { GlobalSidebarSkeleton } from '../skeletons/sidebar-skeleton';
import SidebarDocumentButton from './sidebar-document-button';

interface SidebarDocumentsProps {
  userId: string;
  organizationId: string;
}

const SidebarDocuments = ({
  userId,
  organizationId,
}: SidebarDocumentsProps) => {
  const pathname = usePathname();
  const {
    data,
    size,
    setSize,
    mutate: revalidateDocuments,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = usePaginatedDocumentsSWR(
    {
      limit: 20,
      userId,
      groupIds: [organizationId || '__ACCESS_DENIED__'],
    },
    {
      refreshInterval: 10000,
    }
  );

  const documents = data?.flatMap((page) => page.documents) || [];

  const documentList = useMemo(
    () =>
      documents.map((document) => (
        <SidebarDocumentButton
          key={document.id}
          name={document.name}
          url={`/${document.type}/${document.id}`}
          icon={<DocumentTypeIcon type={document.type} />}
          className={
            pathname === `/${document.type}/${document.id}`
              ? 'bg-muted'
              : undefined
          }
        />
      )),
    [documents, pathname]
  );

  if (isLoadingInitialData) {
    return <GlobalSidebarSkeleton />;
  }

  return <SidebarMenu>{documentList}</SidebarMenu>;
};

export default SidebarDocuments;
