'use client';

import { HeroVideoSection } from '@/components/sections/hero-video-section';
import { siteConfig } from '@/lib/config';
import { FollowPointer } from '@interiorly/design-system/components/ui/following-pointer';
import Link from 'next/link';

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="relative my-3 w-full">
      <div className="relative flex w-full flex-col items-center px-6">
        <div className="absolute inset-0">
          <div className="-z-10 absolute inset-0 h-[600px] w-full rounded-b-xl [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] md:h-[800px]" />
        </div>
        <div className="relative z-10 mx-auto flex h-full w-full max-w-4xl flex-col items-center justify-center gap-10 pt-32">
          {/* <LampContainer> */}
          <FollowPointer
            x={-105}
            y={210}
            title="Emma"
            direction="right"
            colorIndex={0} // #0ea5e9 - sky blue
            animationOffset={153}
          />
          <FollowPointer
            x={42}
            y={438}
            title="Anthony"
            direction="right"
            colorIndex={2} // #14b8a6 - teal
            animationOffset={250}
          />
          <FollowPointer
            x={932}
            y={180}
            title="Sophia"
            colorIndex={4} // #3b82f6 - blue
            animationOffset={176}
          />
          <FollowPointer
            x={791}
            y={372}
            title="Julian"
            colorIndex={6} // #eab308 - yellow
            animationOffset={30}
          />
          <div className="relative flex flex-col items-center justify-center gap-5 border border-blue-500 border-dotted p-6 dark:border-blue-700">
            {/* Badge above the box */}
            <div className="-top-8 absolute left-0 rounded-md bg-secondary px-2 py-0.5 font-medium text-white text-xs">
              &lt;h1&gt;
            </div>

            {/* Corner dots */}
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-0 h-2 w-2 rounded-full bg-primary" />
            <div className="-translate-y-1/2 absolute top-0 right-0 h-2 w-2 translate-x-1/2 rounded-full bg-primary" />
            <div className="-translate-x-1/2 absolute bottom-0 left-0 h-2 w-2 translate-y-1/2 rounded-full bg-primary" />
            <div className="absolute right-0 bottom-0 h-2 w-2 translate-x-1/2 translate-y-1/2 rounded-full bg-primary" />

            {/* Horizontal bars */}
            <div className="-translate-x-1/2 absolute top-0 left-1/2 h-[1px] w-6 translate-y-[4px] bg-primary" />
            <div className="-translate-x-1/2 -translate-y-[4px] absolute bottom-0 left-1/2 h-[1px] w-6 bg-primary" />

            {/* Vertical bars */}
            <div className="-translate-y-1/2 absolute top-1/2 left-0 h-6 w-[1px] translate-x-[4px] bg-primary" />
            <div className="-translate-x-[4px] -translate-y-1/2 absolute top-1/2 right-0 h-6 w-[1px] bg-primary" />

            <h1 className="text-balance text-center font-medium text-3xl text-primary tracking-tighter md:text-4xl lg:text-5xl xl:text-7xl">
              {hero.title}
            </h1>
          </div>
          <p className="-mt-6 text-balance text-center font-medium text-base text-muted-foreground leading-relaxed tracking-tight md:text-lg">
            {hero.description}
          </p>
          {/* </LampContainer> */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href={hero.cta.primary.href}
              className="flex h-9 w-32 items-center justify-center rounded-full border border-white/[0.12] bg-secondary px-4 font-normal text-primary-foreground text-sm tracking-wide shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] transition-all ease-out hover:bg-secondary/80 active:scale-95 dark:text-secondary-foreground"
            >
              {hero.cta.primary.text}
            </Link>
            <Link
              href={hero.cta.secondary.href}
              className="flex h-10 w-32 items-center justify-center rounded-full border border-[#E5E7EB] bg-white px-5 font-normal text-primary text-sm tracking-wide transition-all ease-out hover:bg-white/80 active:scale-95 dark:border-[#27272A] dark:bg-background dark:hover:bg-background/80"
            >
              {hero.cta.secondary.text}
            </Link>
          </div>
        </div>
      </div>
      <HeroVideoSection />
    </section>
  );
}
