'use client';

import AICompletionCommands from '@/components/dashboard/editor/generative/ai-completion-command';
import AISelectorCommands from '@/components/dashboard/editor/generative/ai-selector-commands';
import { useCompletion } from '@interiorly/ai/lib/react';
import { Button } from '@interiorly/design-system/components/ui/button';
import {
  Command,
  CommandInput,
} from '@interiorly/design-system/components/ui/command';
import { ScrollArea } from '@interiorly/design-system/components/ui/scroll-area';
import { useToast } from '@interiorly/design-system/components/ui/use-toast';
import { AiMagicIcon, ArrowUp01Icon, Loading03Icon } from 'hugeicons-react';
import { useEditor } from 'novel';
import { addAIHighlight } from 'novel/extensions';
import { useState } from 'react';
import Markdown from 'react-markdown';

interface AISelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AISelector({ onOpenChange }: AISelectorProps) {
  const { editor } = useEditor();
  const [inputValue, setInputValue] = useState('');
  const { toast } = useToast();

  const { completion, complete, isLoading } = useCompletion({
    api: '/api/generate',
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onResponse: (response: any) => {
      if (response.status === 429) {
        toast({
          title: 'You have reached your request limit for the day.',
          description: 'Please try again tomorrow.',
          variant: 'destructive',
        });
        return;
      }
    },
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    onError: (e: any) => {
      toast({
        title: 'Error',
        description: e.message,
        variant: 'destructive',
      });
    },
  });

  const hasCompletion = completion.length > 0;

  return (
    <Command className="w-[350px]">
      {hasCompletion && (
        <div className="flex max-h-[400px]">
          <ScrollArea>
            <div className="prose dark:prose-invert prose-sm p-2 px-4">
              <Markdown>{completion}</Markdown>
            </div>
          </ScrollArea>
        </div>
      )}

      {isLoading && (
        <div className="flex h-12 w-full items-center px-4 font-medium text-muted-foreground text-muted-foreground text-sm">
          <AiMagicIcon className="mr-2 h-4 w-4 shrink-0 text-primary" />
          AI is thinking
          <div className="mt-1 ml-2">
            <Loading03Icon className="animate-spin" />
          </div>
        </div>
      )}
      {!isLoading && (
        <>
          <div className="relative">
            <CommandInput
              value={inputValue}
              onValueChange={setInputValue}
              autoFocus
              placeholder={
                hasCompletion
                  ? 'Tell AI what to do next'
                  : 'Ask AI to edit or generate...'
              }
              onFocus={() => {
                if (!editor) {
                  return;
                }

                addAIHighlight(editor);
              }}
            />
            <Button
              size="icon"
              className="-translate-y-1/2 absolute top-1/2 right-2 h-6 w-6 rounded-full bg-primary hover:bg-primary/90"
              onClick={() => {
                if (!editor) {
                  return;
                }

                if (completion) {
                  return complete(completion, {
                    body: { option: 'zap', command: inputValue },
                  }).then(() => setInputValue(''));
                }

                const slice = editor.state.selection.content();
                const text = editor.storage.markdown.serializer.serialize(
                  slice.content
                );

                complete(text, {
                  body: { option: 'zap', command: inputValue },
                }).then(() => setInputValue(''));
              }}
            >
              <ArrowUp01Icon className="h-4 w-4" />
            </Button>
          </div>
          {hasCompletion ? (
            <AICompletionCommands
              onDiscard={() => {
                if (!editor) {
                  return;
                }

                editor.chain().unsetHighlight().focus().run();
                onOpenChange(false);
              }}
              completion={completion}
            />
          ) : (
            <AISelectorCommands
              onSelect={(value, option) =>
                complete(value, { body: { option } })
              }
            />
          )}
        </>
      )}
    </Command>
  );
}
