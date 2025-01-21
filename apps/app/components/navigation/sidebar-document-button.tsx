import { buttonVariants } from '@interiorly/design-system/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@interiorly/design-system/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@interiorly/design-system/components/ui/sidebar';
import { cn } from '@interiorly/design-system/lib/utils';
import {
  Add01Icon,
  ArrowRight01Icon,
  MoreHorizontalIcon,
} from 'hugeicons-react';
import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { IconWrapper } from './icon-wrapper';

interface SidebarDocumentButtonProps {
  name: string;
  url: string;
  icon: React.ReactNode;
  className?: string;
}

const SidebarDocumentButton = ({
  name,
  url,
  icon,
  className,
}: SidebarDocumentButtonProps) => {
  return (
    <Collapsible>
      <SidebarMenuItem key={name}>
        <SidebarMenuButton
          asChild
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'group/item flex w-full items-center justify-between px-2 text-muted-foreground hover:bg-muted',
            className
          )}
        >
          <a href={url} className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <CollapsibleTrigger asChild>
                <IconWrapper className="group/trigger">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {icon}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-0 group-hover/trigger:opacity-100">
                    <ArrowRight01Icon className="size-5 transition-transform duration-200 group-data-[state=open]/trigger:rotate-90" />
                  </div>
                </IconWrapper>
              </CollapsibleTrigger>
              <span className="text-sm">{name}</span>
            </div>

            <div className="hidden gap-1 group-hover/item:flex">
              <IconWrapper tooltip="More options">
                <MoreHorizontalIcon className="size-4" />
              </IconWrapper>
              <IconWrapper tooltip="Add page inside">
                <Add01Icon className="size-4" />
              </IconWrapper>
            </div>
          </a>
        </SidebarMenuButton>

        <CollapsibleContent>
          <AnimatePresence initial={false}>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SidebarMenuSub>
                <div className="flex items-center gap-2 py-1 text-sm">
                  <span className="text-muted-foreground/50">
                    No pages found
                  </span>
                </div>
              </SidebarMenuSub>
            </motion.div>
          </AnimatePresence>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default SidebarDocumentButton;
