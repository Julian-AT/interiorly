import { Tooltip } from '@interiorly/design-system/components/ui/tooltip';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@interiorly/design-system/components/ui/tooltip';
import type React from 'react';

const TooltipItem = ({
  children,
  tooltip,
}: { children: React.ReactNode; tooltip?: string | React.ReactNode }) => {
  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    children
  );
};

export default TooltipItem;
