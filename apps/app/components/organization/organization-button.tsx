import { Button } from '@interiorly/design-system/components/ui/button';
import { cn } from '@interiorly/design-system/lib/utils';
import OrganizationImage from './organization-image';

interface OrganizationButtonProps {
  organization: {
    id: string;
    imageUrl: string;
    name: string;
  };
  onClick?: () => void;
  className?: string;
  showBorder?: boolean;
  isLoading?: boolean;
}

export const OrganizationButton = ({
  organization,
  onClick,
  className,
  showBorder = true,
  isLoading = false,
}: OrganizationButtonProps) => (
  <Button
    variant="ghost"
    className={cn('w-full justify-start p-1.5', className)}
    onClick={onClick}
    disabled={isLoading}
  >
    <OrganizationImage
      imageUrl={organization.imageUrl}
      name={organization.name}
      isLoading={isLoading}
      className={cn('h-6 w-6', showBorder && 'border')}
    />
    <span className="truncate text-xs">{organization.name}</span>
  </Button>
);
