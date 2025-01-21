'use client';

import { defaultExtensions } from '@/components/dashboard/editor/extensions';
import GenerativeMenuSwitch from '@/components/dashboard/editor/generative/generative-menu-switch';
import { AddCommentSelector } from '@/components/dashboard/editor/selectors/add-comment-selector';
import { ColorSelector } from '@/components/dashboard/editor/selectors/color-selector';
import { LinkSelector } from '@/components/dashboard/editor/selectors/link-selector';
import { MathSelector } from '@/components/dashboard/editor/selectors/math-selector';
import { NodeSelector } from '@/components/dashboard/editor/selectors/node-selector';
import { TextButtons } from '@/components/dashboard/editor/selectors/text-buttons';
import {
  slashCommand,
  suggestionItems,
} from '@/components/dashboard/editor/slash-command';
import { Threads } from '@/components/dashboard/editor/threads';
import { Separator } from '@interiorly/design-system/components/ui/separator';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
} from 'novel';
import { ImageResizer, handleCommandNavigation } from 'novel/extensions';
import { useState } from 'react';

interface TextEditorProps {
  setCharsCount: (count: number) => void;
}

export const TextEditor = ({ setCharsCount }: TextEditorProps) => {
  const liveblocks = useLiveblocksExtension();
  const extensions = [...defaultExtensions, slashCommand, liveblocks];

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  return (
    <EditorRoot>
      <EditorContent
        extensions={extensions}
        className="-mt-6 -mx-2 relative min-h-[350px] w-full p-0"
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          // handlePaste: (view, event) =>
          //   handleImagePaste(view, event, uploadFn),
          // handleDrop: (view, event, _slice, moved) =>
          //   handleImageDrop(view, event, moved, uploadFn),
          attributes: {
            class:
              'prose dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
          },
        }}
        onUpdate={({ editor }) =>
          setCharsCount(editor.storage.characterCount.words())
        }
        slotAfter={<ImageResizer />}
        immediatelyRender={false}
      >
        <div className="absolute left-full">
          <Threads />
        </div>
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => {
                  if (!item?.command) {
                    return;
                  }

                  item.command(val);
                }}
                className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
          <Separator orientation="vertical" />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation="vertical" />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation="vertical" />
          <MathSelector />
          <Separator orientation="vertical" />
          <TextButtons />
          <Separator orientation="vertical" />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          <Separator orientation="vertical" />
          <AddCommentSelector />
        </GenerativeMenuSwitch>
      </EditorContent>
    </EditorRoot>
  );
};
