import { buttonVariants } from '@interiorly/design-system/components/ui/button';
import { cn } from '@interiorly/design-system/lib/utils';
import TooltipItem from '../common/tooltip-item';

export const IconWrapper = ({
  children,
  className,
  tooltip,
}: {
  children: React.ReactNode;
  className?: string;
  tooltip?: string | React.ReactNode;
}) => {
  return (
    <TooltipItem tooltip={tooltip}>
      <div
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'relative flex h-6 w-6 items-center justify-center px-0 hover:bg-primary/5',
          className
        )}
      >
        {children}
      </div>
    </TooltipItem>
  );
};
