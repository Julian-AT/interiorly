import { TextEditor } from '@/components/dashboard/editor';
import EditorLayout from '@/components/dashboard/editor/editor-layout';
import { DocumentProviders } from '@/components/provider/documents-provider';
import { getDocument } from '@/lib/actions';
import { notFound } from 'next/navigation';

interface DocumentPageProps {
  params: Promise<{
    id: string;
  }>;
}

// export async function generateMetadata({ params }: DocumentPageProps) {
//   const { id } = params;

//   const document = await getDocument({ documentId: id });

//   if (!document || document.error || !document.data) {
//     return {
//       title: 'Document',
//     };
//   }

//   return {
//     title: document.data.name
//       ? `${
//           // biome-ignore lint/performance/useTopLevelRegex: <explanation>
//           document.data.icon?.match(/^\p{Emoji}$/u) ? document.data.icon : ''
//         } ${document.data.name}`
//       : 'Document',
//   };
// }

const DocumentPage = async ({ params }: DocumentPageProps) => {
  const { id } = await params;

  const { data = null, error = null } = await getDocument({
    documentId: id,
  });

  console.log(data);

  if (!data || error) {
    return notFound();
  }

  return (
    <DocumentProviders roomId={id} initialDocument={data}>
      <EditorLayout document={data}>
        <TextEditor />
      </EditorLayout>
    </DocumentProviders>
  );
};

export default DocumentPage;
