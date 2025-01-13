'use client';
import { Skeleton } from '@interiorly/design-system/components/ui/skeleton';

const EditorLayoutSkeleton = () => {
  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="flex h-10 items-center justify-between bg-background px-1 text-sm">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-48" />
        </div>
        <div className="flex items-center gap-1 text-primary">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-7" />
        </div>
      </div>
      <Skeleton className="h-64 rounded-none" />
      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-hidden text-pretty bg-background px-8 pt-16 shadow-sm">
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="absolute top-4 left-8 h-7 w-14" />
        <Skeleton className="absolute top-4 left-24 h-7 w-14" />
        <Skeleton className="absolute top-4 left-40 h-7 w-14" />
        <div className="flex flex-col gap-4 py-6">
          {Array.from({ length: 6 }).map((_, index) =>
            index === 3 ? (
              <Skeleton key={index} className="aspect-video w-1/2" />
            ) : (
              <Skeleton
                key={index}
                className="h-8"
                style={{
                  width: `${[85, 65, 95, 75, 90, 70, 80, 95, 65][index]}%`,
                  opacity: 0.8,
                }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorLayoutSkeleton;
