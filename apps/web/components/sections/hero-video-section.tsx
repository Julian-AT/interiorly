import { HeroVideoDialog } from '@interiorly/design-system/components/ui/hero-video-dialog';

export function HeroVideoSection() {
  return (
    <div className="relative mt-16 px-6">
      <div className="relative size-full overflow-hidden rounded-2xl shadow-xl">
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/watch?v=xSJn3R0x0-A"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/watch?v=xSJn3R0x0-A"
          thumbnailSrc="https://www.julianschmidt.cv/_next/image?url=%2Fassets%2Fimages%2Finteriorly_screen.png&w=1920&q=75"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
  );
}
