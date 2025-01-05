import { Skeleton } from '@interiorly/design-system/components/ui/skeleton';
import Image from 'next/image';
import { Suspense } from 'react';

const OrganizationImage = ({
  imageUrl,
  name,
}: { imageUrl: string; name: string }) => {
  return imageUrl ? (
    <Suspense fallback={<Skeleton className="h-full w-full rounded-md" />}>
      <Image
        src={imageUrl}
        alt={name}
        width={64}
        height={64}
        className="h-full w-full rounded-md object-cover"
      />
    </Suspense>
  ) : (
    <span className="font-medium text-sm">{name.charAt(0)}</span>
  );
};

export default OrganizationImage;
