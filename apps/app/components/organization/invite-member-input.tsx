import { Badge } from '@interiorly/design-system/components/ui/badge';
import { Button } from '@interiorly/design-system/components/ui/button';
import { Input } from '@interiorly/design-system/components/ui/input';
import { cn } from '@interiorly/design-system/lib/utils';
import { Cancel01Icon } from 'hugeicons-react';
import type React from 'react';
import {
  type ChangeEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

type InputTagsProps = React.ComponentProps<'input'> & {
  value: string[];
  onChange: (data: string[] | ChangeEvent<HTMLInputElement>) => void;
  validator?: (value: string) => boolean;
};

export const InputTags = forwardRef<HTMLInputElement, InputTagsProps>(
  ({ value, onChange, onError, validator = () => true, ...props }, ref) => {
    const [pendingDataPoint, setPendingDataPoint] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // biome-ignore lint/style/noNonNullAssertion: quick fix
    useImperativeHandle(ref, () => inputRef.current!);

    const addPendingDataPoint = () => {
      if (pendingDataPoint && validator(pendingDataPoint)) {
        const newDataPoints = new Set([...value, pendingDataPoint]);
        onChange(Array.from(newDataPoints));
        setPendingDataPoint('');
        setError(false);
      } else if (!validator(pendingDataPoint)) {
        setError(true);
      }
    };

    return (
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            'flex',
            error && 'rounded-lg border border-destructive'
          )}
        >
          <Input
            value={pendingDataPoint}
            type="email"
            placeholder="invite@interiorly.dev"
            onChange={(e) => setPendingDataPoint(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addPendingDataPoint();
              } else if (e.key === ',' || e.key === ' ') {
                e.preventDefault();
                addPendingDataPoint();
              }
              if (error) {
                setError(false);
              }
            }}
            className="rounded-r-none focus-visible:ring-0 "
            {...props}
            ref={inputRef}
          />
          <Button
            type="button"
            variant="secondary"
            className={cn(
              'rounded-l-none border border-l-0',
              error && 'border-l-destructive'
            )}
            onClick={addPendingDataPoint}
          >
            Add
          </Button>
        </div>
        <div className="flex min-h-[2.5rem] flex-wrap items-center gap-2 overflow-y-auto rounded-md pt-2">
          {value.map((item, idx) => (
            <Badge
              key={idx}
              variant={'secondary'}
              className="border border-border"
            >
              {item}
              <button
                type="button"
                className="ml-2 w-3"
                onClick={() => {
                  onChange(value.filter((i) => i !== item));
                }}
              >
                <Cancel01Icon className="w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    );
  }
);
