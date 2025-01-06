'use client';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@interiorly/design-system/components/ui/carousel';
import { Skeleton } from '@interiorly/design-system/components/ui/skeleton';
import { useEffect, useState } from 'react';

interface LearnCarouselSkeletonProps {
  count: number;
}

const LearnCarouselSkeleton = ({
  count: itemsCount,
}: LearnCarouselSkeletonProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const updateState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    updateState();

    api.on('settle', updateState);

    return () => {
      api.off('settle', updateState);
    };
  }, [api]);

  return (
    <section
      role="marquee"
      className="relative"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {current > 0 && (
        <div className="absolute top-0 left-0 z-20 h-full w-10 bg-gradient-to-r from-background to-transparent" />
      )}
      {current < count - 1 && (
        <div className="absolute top-0 right-0 z-20 h-full w-10 bg-gradient-to-l from-background to-transparent" />
      )}
      <Carousel
        className="w-full"
        opts={{
          align: 'start',
          loop: false,
          skipSnaps: false,
          dragFree: false,
        }}
        setApi={setApi}
      >
        <CarouselContent className="-ml-0 z-10 gap-4">
          {Array.from({ length: itemsCount }).map((_, i) => (
            <CarouselItem
              key={i}
              className="flex basis-1/2 flex-col rounded-lg bg-secondary pl-0 transition-all hover:shadow-md md:basis-1/3 lg:basis-1/4"
            >
              <Skeleton className="h-32 w-full rounded-t-lg" />
              <div className="flex flex-col p-3">
                <h3 className="flex h-12 flex-col gap-2 font-medium text-foreground">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </h3>
                <span className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-16" />
                </span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {isMouseOver && current < count - 1 && (
          <CarouselNext className="-right-5 absolute z-20 hover:bg-card" />
        )}
        {isMouseOver && current > 0 && (
          <CarouselPrevious className="-left-5 absolute z-20 hover:bg-card" />
        )}
      </Carousel>
    </section>
  );
};

export default LearnCarouselSkeleton;
