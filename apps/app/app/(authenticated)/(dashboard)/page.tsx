'use client';

import LearnCarouselSkeleton from '@/components/skeletons/learn-carousel-skeleton';
import TemplateCarouselSkeleton from '@/components/skeletons/template-carousel-skeleton';
import { useUser } from '@interiorly/auth/client';
import {
  BookBookmark02Icon,
  Clock04Icon,
  GeometricShapes01Icon,
  Moon02Icon,
  SunriseIcon,
  SunsetIcon,
} from 'hugeicons-react';
import Image from 'next/image';
import type { ReactNode } from 'react';

interface HomeSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

const HomeSection = ({ icon, title, children }: HomeSectionProps) => {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="font-semibold text-muted-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
};

interface DocumentCardProps {
  id: string;
  title: string;
  imageUrl?: string;
}

const DocumentCard = ({ id, title, imageUrl }: DocumentCardProps) => {
  return (
    <div
      key={id}
      className="group flex aspect-square cursor-pointer flex-col rounded-xl bg-secondary transition-all duration-200 hover:ring-1 hover:ring-muted"
    >
      <div className="flex h-2/5 w-full rounded-t-xl bg-muted transition-colors group-hover:bg-muted/80">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            width={300}
            height={200}
            className="h-full w-full rounded-t-xl object-cover"
          />
        ) : (
          <div className="h-full w-full rounded-t-xl bg-muted" />
        )}
      </div>
      <div className="flex h-3/5 w-full flex-col rounded-b-xl p-4">
        <h2 className="line-clamp-2 flex-1 font-semibold text-foreground text-sm">
          {title}
        </h2>
        <div className="flex w-full items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-muted transition-colors group-hover:bg-muted/80" />
          <div className="h-5 flex-1 rounded-md bg-muted transition-colors group-hover:bg-muted/80" />
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-lg text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    const displayName = user.fullName || user.emailAddresses[0].emailAddress;

    const greetings = [
      {
        condition: currentHour >= 23 || currentHour < 5,
        icon: <Moon02Icon className="h-7 w-7 text-secondary-foreground" />,
        text: 'Good night',
      },
      {
        condition: currentHour < 12,
        icon: <SunriseIcon className="h-7 w-7 text-secondary-foreground" />,
        text: 'Good morning',
      },
      {
        condition: currentHour < 18,
        icon: <SunsetIcon className="h-7 w-7 text-secondary-foreground" />,
        text: 'Good afternoon',
      },
      {
        condition: true, // default case
        icon: <SunsetIcon className="h-7 w-7 text-secondary-foreground" />,
        text: 'Good evening',
      },
    ];

    const { icon, text } =
      greetings.find(({ condition }) => condition) || greetings[0];

    return (
      <div className="flex w-full items-center justify-center gap-3">
        {icon}
        <span className="font-semibold text-3xl">
          {text}, {displayName}
        </span>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-24">
        <div className="py-12 text-center font-bold text-3xl text-foreground tracking-tight">
          {getGreeting()}
        </div>

        <div className="space-y-8">
          <HomeSection
            icon={<Clock04Icon className="h-5 w-5 text-muted-foreground" />}
            title="Recently visited"
          >
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {[1, 2, 3].map((i) => (
                <DocumentCard
                  key={i}
                  id={i.toString()}
                  title={`Project ${i}`}
                />
              ))}
            </div>
          </HomeSection>

          <HomeSection
            icon={
              <BookBookmark02Icon className="h-5 w-5 text-muted-foreground" />
            }
            title="Learn"
          >
            <LearnCarouselSkeleton count={8} />
          </HomeSection>
          <HomeSection
            icon={
              <GeometricShapes01Icon className="h-5 w-5 text-muted-foreground" />
            }
            title="Featured Templates"
          >
            <TemplateCarouselSkeleton count={8} />
          </HomeSection>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
