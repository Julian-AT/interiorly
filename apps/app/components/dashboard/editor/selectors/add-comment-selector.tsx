import { Button } from '@interiorly/design-system/components/ui/button';
import { cn } from '@interiorly/design-system/lib/utils';
import { CommentAdd01Icon } from 'hugeicons-react';
import { useEditor } from 'novel';

export const AddCommentSelector = () => {
  const { editor } = useEditor();

  if (!editor) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('w-12 rounded-none', {
        'text-blue-500': editor.isActive('liveblocksCommentMark'),
      })}
      onClick={() => {
        editor.chain().focus().addPendingComment().run();
      }}
    >
      <CommentAdd01Icon
        className={cn('size-4', {
          'text-blue-500': editor.isActive('liveblocksCommentMark'),
        })}
      />
    </Button>
  );
};
