import { Canvas } from '@/components/dashboard/canvas';
import { DocumentProviders } from '@/components/provider/documents-provider';
import { getDocument } from '@/lib/actions';
import { notFound } from 'next/navigation';

interface DocumentPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: DocumentPageProps) {
  const { id } = await params;

  const document = await getDocument({ documentId: id });

  if (!document || document.error || !document.data) {
    return {
      title: 'Document',
    };
  }

  return {
    title: document.data.name
      ? `${
          // biome-ignore lint/performance/useTopLevelRegex: <explanation>
          document.data.icon?.match(/^\p{Emoji}$/u) ? document.data.icon : ''
        } ${document.data.name}`
      : 'Document',
  };
}

const CanvasDocumentPage = async ({ params }: DocumentPageProps) => {
  const { id } = await params;

  console.log(id);

  const { data = null, error = null } = await getDocument({
    documentId: id,
  });

  if (!data || error) {
    return notFound();
  }

  return (
    <DocumentProviders roomId={id} initialDocument={data}>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Canvas />
      </div>
    </DocumentProviders>
  );
};

export default CanvasDocumentPage;
