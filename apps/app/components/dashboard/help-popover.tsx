import {
  Button,
  buttonVariants,
} from '@interiorly/design-system/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@interiorly/design-system/components/ui/popover';
import { Separator } from '@interiorly/design-system/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@interiorly/design-system/components/ui/tooltip';
import { cn } from '@interiorly/design-system/lib/utils';
import {
  BookOpen01Icon,
  Bug01Icon,
  CommandIcon,
  DiscoverCircleIcon,
  NewReleasesIcon,
} from 'hugeicons-react';
import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

interface HelpPopoverProps {
  children: ReactNode;
}

interface PopoverItemProps extends ComponentProps<typeof Link> {
  icon: ReactNode;
  tooltip: string;
  children: ReactNode;
  className?: string;
  asButton?: boolean;
}

interface PopoverItemConfig {
  href?: string;
  icon: ReactNode;
  label: string;
  tooltip: string;
  className?: string;
  asButton?: boolean;
}

const PopoverItem = ({
  icon,
  tooltip,
  children,
  className,
  asButton = false,
  ...props
}: PopoverItemProps) => {
  const sharedClassName = cn(
    buttonVariants({ variant: 'ghost', size: 'sm' }),
    'flex select-none items-center justify-start gap-2 text-xs',
    className
  );

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  return (
    <Tooltip delayDuration={1000} defaultOpen={false}>
      <TooltipTrigger asChild>
        {asButton ? (
          <Button className={sharedClassName} variant="ghost">
            {content}
          </Button>
        ) : (
          <Link {...props} className={sharedClassName}>
            {content}
          </Link>
        )}
      </TooltipTrigger>
      <TooltipContent side="right" className="ml-2 bg-secondary">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};

const HelpPopover = ({ children }: HelpPopoverProps) => {
  const items: { section: PopoverItemConfig[] }[] = [
    {
      section: [
        {
          href: 'https://docs.interiorly.dev/',
          icon: <BookOpen01Icon className="h-5 w-5" />,
          label: 'Help & Documentation',
          tooltip: 'View documentation',
        },
        {
          href: 'https://github.com/Interiorly/interiorly/issues/new',
          icon: <Bug01Icon className="h-5 w-5" />,
          label: 'Bug Report',
          tooltip: 'Report an issue',
        },
      ],
    },
    {
      section: [
        {
          icon: <CommandIcon className="h-5 w-5" />,
          label: 'Keyboard Shortcuts',
          tooltip: 'View keyboard shortcuts',
          asButton: true,
        },
        {
          href: 'https://github.com/Julian-AT/interiorly/deployments',
          icon: <NewReleasesIcon className="h-5 w-5" />,
          label: "What's new?",
          tooltip: 'View latest changes',
        },
      ],
    },
    {
      section: [
        {
          href: 'https://interiorly.dev/terms',
          icon: <Bug01Icon className="h-5 w-5" />,
          label: 'Terms & Privacy',
          tooltip: 'View terms and privacy policy',
          className: 'text-muted-foreground',
        },
        {
          href: 'https://status.interiorly.dev/',
          icon: <DiscoverCircleIcon className="h-5 w-5" />,
          label: 'Status',
          tooltip: 'View system status',
          className: 'text-muted-foreground',
        },
      ],
    },
  ];

  return (
    <TooltipProvider>
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent
          side="right"
          className="mb-3 ml-4 w-48 bg-secondary p-0"
        >
          <div className="flex flex-col">
            {items.map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-col">
                <div className="flex flex-col p-1">
                  {group.section.map((item, itemIndex) => (
                    <PopoverItem
                      key={itemIndex}
                      href={item.href || ''}
                      icon={item.icon}
                      tooltip={item.tooltip}
                      className={item.className}
                      asButton={item.asButton}
                      target={item.href ? '_blank' : undefined}
                      rel={item.href ? 'noopener noreferrer' : undefined}
                    >
                      {item.label}
                    </PopoverItem>
                  ))}
                </div>
                {groupIndex < items.length - 1 && (
                  <Separator className="h-[1px]" />
                )}
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex flex-col p-1 px-2 text-muted-foreground text-xs">
            <span>Interiorly 1.0.0</span>
            <span>Build ID: 123456</span>
          </div>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};

export default HelpPopover;
