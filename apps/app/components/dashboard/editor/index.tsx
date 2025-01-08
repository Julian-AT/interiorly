'use client';
import styles from '@/components/dashboard/editor/text-editor.module.css';
import '@/components/dashboard/editor/text-editor.css';
import {
  ClientSideSuspense,
  useThreads,
} from '@interiorly/collaboration/hooks';
import {
  FloatingComposer,
  FloatingThreads,
  useLiveblocksExtension,
} from '@liveblocks/react-tiptap';
import Highlight from '@tiptap/extension-highlight';
import { Image } from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Typography } from '@tiptap/extension-typography';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Loading03Icon } from 'hugeicons-react';
import { EditorView } from 'prosemirror-view';

export function TextEditor() {
  return (
    <ClientSideSuspense
      fallback={<Loading03Icon className="size-4 animate-spin" />}
    >
      <Editor />
    </ClientSideSuspense>
  );
}

export function Editor() {
  const liveblocks = useLiveblocksExtension();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
    extensions: [
      liveblocks,
      StarterKit.configure({
        blockquote: {
          HTMLAttributes: {
            class: 'tiptap-blockquote',
          },
        },
        code: {
          HTMLAttributes: {
            class: 'tiptap-code',
          },
        },
        codeBlock: {
          languageClassPrefix: 'language-',
          HTMLAttributes: {
            class: 'tiptap-code-block',
            spellcheck: false,
          },
        },
        heading: {
          levels: [1, 2, 3],
          HTMLAttributes: {
            class: 'tiptap-heading',
          },
        },
        history: false,
        horizontalRule: {
          HTMLAttributes: {
            class: 'tiptap-hr',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'tiptap-list-item',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'tiptap-ordered-list',
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: 'tiptap-paragraph',
          },
        },
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'tiptap-highlight',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'tiptap-image',
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'tiptap-link',
        },
      }),
      Placeholder.configure({
        placeholder: 'Start writing…',
        emptyEditorClass: 'tiptap-empty',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Typography,
      Youtube.configure({
        modestBranding: true,
        HTMLAttributes: {
          class: 'tiptap-youtube',
        },
      }),
    ],
  });

  const { threads } = useThreads();

  return (
    <div className={styles.editorPanel}>
      {/* {editor && <SelectionMenu editor={editor} />} */}
      <EditorContent editor={editor} className={styles.editorContainer} />
      <FloatingComposer editor={editor} style={{ width: 350 }} />
      <FloatingThreads threads={threads} editor={editor} />
    </div>
  );
}

// Prevents a matchesNode error on hot reloading
EditorView.prototype.updateState = function updateState(state) {
  // @ts-ignore
  if (!this.docView) return;
  // @ts-ignore
  this.updateStateInner(state, this.state.plugins !== state.plugins);
};
