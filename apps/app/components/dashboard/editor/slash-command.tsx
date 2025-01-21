import {
  Heading01Icon,
  Heading02Icon,
  Heading03Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  QuoteDownIcon,
  SourceCodeIcon,
  TaskAdd01Icon,
  TextIcon,
  TwitterIcon,
  YoutubeIcon,
} from 'hugeicons-react';
import { createSuggestionItems } from 'novel/extensions';
import { Command, renderItems } from 'novel/extensions';

export const suggestionItems = createSuggestionItems([
  {
    title: 'Text',
    description: 'Just start typing with plain text.',
    searchTerms: ['p', 'paragraph'],
    icon: <TextIcon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode('paragraph', 'paragraph')
        .run();
    },
  },
  {
    title: 'To-do List',
    description: 'Track tasks with a to-do list.',
    searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
    icon: <TaskAdd01Icon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: 'Heading 1',
    description: 'Big section heading.',
    searchTerms: ['title', 'big', 'large'],
    icon: <Heading01Icon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 1 })
        .run();
    },
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading.',
    searchTerms: ['subtitle', 'medium'],
    icon: <Heading02Icon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 2 })
        .run();
    },
  },
  {
    title: 'Heading 3',
    description: 'Small section heading.',
    searchTerms: ['subtitle', 'small'],
    icon: <Heading03Icon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 3 })
        .run();
    },
  },
  {
    title: 'Bullet List',
    description: 'Create a simple bullet list.',
    searchTerms: ['unordered', 'point'],
    icon: <LeftToRightListBulletIcon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: 'Numbered List',
    description: 'Create a list with numbering.',
    searchTerms: ['ordered'],
    icon: <LeftToRightListNumberIcon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: 'Quote',
    description: 'Capture a quote.',
    searchTerms: ['blockquote'],
    icon: <QuoteDownIcon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) =>
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .toggleNode('paragraph', 'paragraph')
        .toggleBlockquote()
        .run(),
  },
  {
    title: 'Code',
    description: 'Capture a code snippet.',
    searchTerms: ['codeblock'],
    icon: <SourceCodeIcon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: 'Youtube',
    description: 'Embed a Youtube video.',
    searchTerms: ['video', 'youtube', 'embed'],
    icon: <YoutubeIcon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) => {
      const videoLink = prompt('Please enter Youtube Video Link');

      if (!videoLink) {
        return;
      }

      //From https://regexr.com/3dj5t
      const ytregex = new RegExp(
        // biome-ignore lint/performance/useTopLevelRegex: <explanation>
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/
      );

      if (ytregex.test(videoLink)) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setYoutubeVideo({
            src: videoLink,
          })
          .run();
      } else if (videoLink !== null) {
        alert('Please enter a correct Youtube Video Link');
      }
    },
  },
  {
    title: 'Twitter',
    description: 'Embed a Tweet.',
    searchTerms: ['twitter', 'embed'],
    icon: <TwitterIcon size={18} />,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    command: ({ editor, range }: { editor: any; range: any }) => {
      const tweetLink = prompt('Please enter Twitter Link');

      if (!tweetLink) {
        return;
      }

      const tweetRegex = new RegExp(
        // biome-ignore lint/performance/useTopLevelRegex: <explanation>
        /^https?:\/\/(www\.)?x\.com\/([a-zA-Z0-9_]{1,15})(\/status\/(\d+))?(\/\S*)?$/
      );

      if (tweetRegex.test(tweetLink)) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setTweet({
            src: tweetLink,
          })
          .run();
      } else if (tweetLink !== null) {
        alert('Please enter a correct Twitter Link');
      }
    },
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
