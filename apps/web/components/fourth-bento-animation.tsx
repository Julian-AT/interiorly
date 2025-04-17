'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { type ReactElement, useEffect, useMemo, useState } from 'react';

export const AnimatedList = React.memo(
  ({
    className,
    children,
    delay = 1000,
  }: {
    className?: string;
    children: React.ReactNode;
    delay?: number;
  }) => {
    const [index, setIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);

      return () => clearInterval(interval);
    }, [childrenArray.length, delay]);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray]
    );

    return (
      <div className={`flex w-full flex-col items-center gap-4 ${className}`}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = 'AnimatedList';

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: 'AI completion has finished',
    description: 'Living room design suggestions',
    time: '15m ago',
    icon: '🤖',
    color: '#00C9A7',
  },
  {
    name: 'Mentioned in workspace',
    description: 'Kitchen renovation project',
    time: '10m ago',
    icon: '📝',
    color: '#FFB800',
  },
  {
    name: 'New comment on design',
    description: 'Bedroom color palette',
    time: '5m ago',
    icon: '💬',
    color: '#FF3D71',
  },
  {
    name: 'Project update available',
    description: 'Bathroom fixtures selection',
    time: '2m ago',
    icon: '🔄',
    color: '#1E86FF',
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, icon, color, time }: Item) => {
  return (
    <figure
      className={cn(
        'relative mx-auto min-h-fit w-3/4 transform cursor-pointer overflow-hidden rounded-lg p-4',
        // animation styles
        'transition-all duration-200 ease-in-out hover:scale-[103%]',
        // light styles
        'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        // dark styles
        'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre font-medium text-lg dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-gray-500 text-xs">{time}</span>
          </figcaption>
          <p className="font-normal text-sm dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function FourthBentoAnimation() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 z-20 h-1/2 w-full bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-1/2 w-full bg-gradient-to-t from-background to-transparent" />
      <div className="h-full w-full px-4 py-6">
        <AnimatedList>
          {notifications.map((item, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
