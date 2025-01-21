import { AISelector } from '@/components/dashboard/editor/generative/ai-selector';
import { Button } from '@interiorly/design-system/components/ui/button';
import { AiMagicIcon } from 'hugeicons-react';
import { EditorBubble, useEditor } from 'novel';
import { removeAIHighlight } from 'novel/extensions';
import { type ReactNode, useEffect } from 'react';

interface GenerativeMenuSwitchProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const GenerativeMenuSwitch = ({
  children,
  open,
  onOpenChange,
}: GenerativeMenuSwitchProps) => {
  const { editor } = useEditor();

  useEffect(() => {
    if (!open && editor) {
      removeAIHighlight(editor);
    }
  }, [open, editor]);

  return (
    <EditorBubble
      tippyOptions={{
        placement: open ? 'bottom-start' : 'top',
        onHidden: () => {
          if (!editor) {
            return;
          }

          onOpenChange(false);
          editor.chain().unsetHighlight().run();
        },
      }}
      className="flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl"
    >
      {open && <AISelector open={open} onOpenChange={onOpenChange} />}
      {!open && (
        <>
          <Button
            className="gap-1 rounded-none text-primary"
            variant="ghost"
            onClick={() => onOpenChange(true)}
            size="sm"
          >
            <AiMagicIcon className="h-5 w-5" />
            <span className="text-muted-foreground text-sm">Ask AI</span>
          </Button>
          {children}
        </>
      )}
    </EditorBubble>
  );
};

export default GenerativeMenuSwitch;
