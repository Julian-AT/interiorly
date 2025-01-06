import { Skeleton } from '@interiorly/design-system/components/ui/skeleton';
import { cn } from '@interiorly/design-system/lib/utils';
import { Loading03Icon } from 'hugeicons-react';
import Image from 'next/image';
import { type HTMLAttributes, Suspense } from 'react';

interface OrganizationImageProps extends HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  className?: string;
  isLoading?: boolean;
}

const OrganizationImage = ({
  imageUrl,
  name,
  className,
  isLoading = false,
}: OrganizationImageProps) => {
  if (isLoading) {
    return (
      <span
        className={cn(
          'flex items-center justify-center rounded-md font-medium text-sm',
          className
        )}
      >
        <Loading03Icon className="h-6 w-6 animate-spin" />
      </span>
    );
  }

  return imageUrl ? (
    <Suspense fallback={<Skeleton className="h-full w-full rounded-md" />}>
      <Image
        src={imageUrl}
        alt={name}
        width={64}
        height={64}
        className={cn('h-full w-full rounded-md object-cover', className)}
      />
    </Suspense>
  ) : (
    <span className={cn('font-medium text-sm', className)}>
      {name.charAt(0)}
    </span>
  );
};

export default OrganizationImage;
