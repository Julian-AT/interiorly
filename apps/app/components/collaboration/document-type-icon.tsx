import type { DocumentType } from '@interiorly/collaboration/types';
import { CanvasIcon, File02Icon, NoteIcon } from 'hugeicons-react';

const DocumentTypeIcon = ({ type }: { type: DocumentType }) => {
  switch (type) {
    case 'text':
      return <File02Icon className="size-5" />;
    case 'canvas':
      return <CanvasIcon className="size-5" />;
    case 'whiteboard':
      return <NoteIcon className="size-5" />;
    default:
      return <File02Icon className="size-5" />;
  }
};

export default DocumentTypeIcon;
