/* eslint-disable @next/next/no-img-element */
'use client';

import {
  Reasoning,
  ReasoningContent,
  ReasoningResponse,
} from '@interiorly/design-system/components/ui/reasoning';
import { Icons } from '@interiorly/design-system/components/web/icons';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

export function ReasoningBasic() {
  const reasoningText =
    'For your Scandinavian modern room, I suggest light wood elements, textured textiles, and soft neutral colors with occasional muted blue or green accents. Minimalist furniture with clean lines will maintain the aesthetic while creating an inviting atmosphere.';

  return (
    <Reasoning>
      <ReasoningContent className="">
        <ReasoningResponse text={reasoningText} />
      </ReasoningContent>
    </Reasoning>
  );
}

export function FirstBentoAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isInView) {
      timeoutId = setTimeout(() => {
        setShouldAnimate(true);
      }, 1000);
    } else {
      setShouldAnimate(false);
    }

    return () => {
      // biome-ignore lint/style/useBlockStatements: <explanation>
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView]);

  return (
    <div
      ref={ref}
      className="flex h-full w-full flex-col items-center justify-center gap-5 p-4"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-20 w-full bg-gradient-to-t from-background to-transparent" />
      <motion.div
        className="mx-auto flex w-full max-w-md flex-col gap-2"
        animate={{
          y: shouldAnimate ? -75 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
      >
        <div className="flex items-end justify-end gap-3">
          <motion.div
            className="ml-auto max-w-[280px] rounded-2xl bg-secondary p-4 text-white shadow-[0_0_10px_rgba(0,0,0,0.05)]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            <p className="text-sm">
              I want to create a Scandinavian modern living room. What elements
              should I include to make it feel warm while keeping that clean
              aesthetic?
            </p>
          </motion.div>
          <div className="flex w-fit flex-shrink-0 items-center rounded-full border border-border bg-background">
            {/* biome-ignore lint/nursery/noImgElement: <explanation> */}
            <img
              src="https://randomuser.me/api/portraits/women/79.jpg"
              alt="User Avatar"
              className="size-8 flex-shrink-0 rounded-full"
            />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full border border-border bg-background shadow-[0_0_10px_rgba(0,0,0,0.05)]">
            <Icons.logo className="size-4" />
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              {shouldAnimate ? (
                <motion.div
                  key="response"
                  layout
                  className="md:minuw-[300px]omin-w-[220px] rderbg-accentder absolute top-0 left-0 rounded-xl bg-background p-4 shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeOut',
                  }}
                >
                  <ReasoningBasic />
                </motion.div>
              ) : (
                <motion.div
                  key="dots"
                  className="roubackground absolute top-0 left-0 border border-border p-4bg-primar2xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    duration: 0.2,
                    ease: 'easeOut',
                  }}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        className="222uhx2rderprimary/50w-[0_0_1,full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.2,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
