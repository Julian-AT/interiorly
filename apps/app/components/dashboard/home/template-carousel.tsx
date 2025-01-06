'use client';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@interiorly/design-system/components/ui/carousel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface LearnCarouselProps {
  items: {
    title: string;
    imageUrl: string;
    author: string;
    url: string;
  }[];
}

const LearnCarousel = ({ items }: LearnCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [isMouseOver, setIsMouseOver] = React.useState(false);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const updateState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    updateState();

    api.on('select', updateState);
    api.on('scroll', updateState);
    api.on('settle', updateState);

    return () => {
      api.off('select', updateState);
      api.off('scroll', updateState);
      api.off('settle', updateState);
    };
  }, [api]);

  return (
    <div
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
        setApi={setApi}
        opts={{
          align: 'start',
          loop: false,
          skipSnaps: false,
          dragFree: false,
        }}
      >
        <CarouselContent className="-ml-0 z-10 gap-4">
          {items.map((item) => (
            <CarouselItem
              key={item.title}
              className="flex basis-1/2 flex-col rounded-lg bg-secondary pl-0 transition-all hover:shadow-md md:basis-1/3 lg:basis-1/4"
            >
              <Link href={item.url} className="h-full overflow-hidden">
                <div className="mx-7 flex flex-col p-3">
                  <h3 className="line-clamp-1 h-6 font-medium text-foreground text-sm">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    By {item.author}
                  </p>
                </div>
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                ) : (
                  <div className="ml-10 h-20 w-full rounded-t-lg bg-muted " />
                )}
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {isMouseOver && current < count - 1 && (
          <CarouselNext className="-right-5 absolute z-20 hover:bg-secondary" />
        )}
        {isMouseOver && current > 0 && (
          <CarouselPrevious className="-left-5 absolute z-20 hover:bg-secondary" />
        )}
      </Carousel>
    </div>
  );
};

export default LearnCarousel;
