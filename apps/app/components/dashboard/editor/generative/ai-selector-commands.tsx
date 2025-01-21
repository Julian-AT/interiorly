import AiEditingIcon from '@/components/icons/ai-editing-stroke-rounded';
import {
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@interiorly/design-system/components/ui/command';
import {
  AiEraserIcon,
  ArrowTurnForwardIcon,
  SortByDown01Icon,
  SortByUp01Icon,
} from 'hugeicons-react';
import { useEditor } from 'novel';
import { getPrevText } from 'novel/utils';

const options = [
  {
    value: 'improve',
    label: 'Improve writing',
    icon: AiEditingIcon,
  },

  {
    value: 'fix',
    label: 'Fix grammar',
    icon: AiEraserIcon,
  },
  {
    value: 'shorter',
    label: 'Make shorter',
    icon: SortByDown01Icon,
  },
  {
    value: 'longer',
    label: 'Make longer',
    icon: SortByUp01Icon,
  },
];

interface AISelectorCommandsProps {
  onSelect: (value: string, option: string) => void;
}

const AISelectorCommands = ({ onSelect }: AISelectorCommandsProps) => {
  const { editor } = useEditor();

  return (
    <>
      <CommandGroup heading="Edit or review selection">
        {options.map((option) => (
          <CommandItem
            onSelect={(value) => {
              if (!editor) {
                return;
              }

              const slice = editor.state.selection.content();
              const text = editor.storage.markdown.serializer.serialize(
                slice.content
              );
              onSelect(text, value);
            }}
            className="flex gap-2 px-4"
            key={option.value}
            value={option.value}
          >
            <option.icon className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground text-sm">
              {option.label}
            </span>
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Use AI to do more">
        <CommandItem
          onSelect={() => {
            if (!editor) {
              return;
            }

            const pos = editor.state.selection.from;

            const text = getPrevText(editor, pos);
            onSelect(text, 'continue');
          }}
          value="continue"
          className="gap-2 px-4"
        >
          <ArrowTurnForwardIcon className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground text-sm">
            Continue writing
          </span>
        </CommandItem>
      </CommandGroup>
    </>
  );
};

export default AISelectorCommands;
