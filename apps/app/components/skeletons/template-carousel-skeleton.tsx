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

interface TemplateCarouselSkeletonProps {
  count: number;
}

const TemplateCarouselSkeleton = ({
  count: itemsCount,
}: TemplateCarouselSkeletonProps) => {
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

    api.on('select', updateState);

    return () => {
      api.off('select', updateState);
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
              <div className="mx-7 flex flex-col p-3">
                <h3 className="line-clamp-1 h-6 font-medium text-foreground text-sm">
                  <Skeleton className="h-4 w-3/4" />
                </h3>
                <div className="text-muted-foreground text-sm">
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <Skeleton className="ml-10 h-20 w-[calc(100%-2.5rem)] rounded-none rounded-tl-lg" />
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

export default TemplateCarouselSkeleton;
