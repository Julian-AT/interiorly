import { Skeleton } from '@interiorly/design-system/components/ui/skeleton';

const DocumentListSkeleton = () => {
  return (
    <>
      <div className="absolute z-10 h-full w-full bg-gradient-to-t from-secondary to-transparent" />
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-7 w-full" />
      ))}
    </>
  );
};

export default DocumentListSkeleton;
