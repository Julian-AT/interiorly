import {
  Button,
  buttonVariants,
} from '@interiorly/design-system/components/ui/button';
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

interface SidebarDocumentButtonProps {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const SidebarDocumentButton = ({
  name,
  url,
  icon,
}: SidebarDocumentButtonProps) => {
  return (
    <Collapsible>
      <SidebarMenuItem key={name}>
        <SidebarMenuButton
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'group/collapsible flex items-center justify-between px-2 text-muted-foreground [&_svg]:size-5 [&_svg]:shrink-0'
          )}
        >
          <div className="flex items-center gap-2">
            <CollapsibleTrigger asChild className="group/collapsible">
              <Button
                variant="ghost"
                className="relative flex h-6 w-6 items-center justify-center px-0 hover:bg-primary/5"
              >
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover/collapsible:opacity-0 [&>svg]:size-6">
                  {icon}
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-200 group-hover/collapsible:opacity-100">
                  <ArrowRight01Icon className="size-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </div>
              </Button>
            </CollapsibleTrigger>
            <span className="text-sm">{name}</span>
          </div>
          <div className="hidden gap-1 group-hover/collapsible:flex">
            <Button
              variant="ghost"
              className="relative flex h-6 w-6 items-center justify-center px-0 hover:bg-primary/5"
            >
              <MoreHorizontalIcon className="size-4" />
            </Button>
            <Button
              variant="ghost"
              className="relative flex h-6 w-6 items-center justify-center px-0 hover:bg-primary/5"
            >
              <Add01Icon className="size-4" />
            </Button>
          </div>
        </SidebarMenuButton>
        <AnimatePresence initial={false}>
          <CollapsibleContent>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SidebarMenuSub>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground/50">
                    No pages found
                  </span>
                </div>
              </SidebarMenuSub>
            </motion.div>
          </CollapsibleContent>
        </AnimatePresence>
      </SidebarMenuItem>
    </Collapsible>
  );
};

export default SidebarDocumentButton;
