'use client';

import LearnCarousel from '@/app/(authenticated)/components/home/learn-carousel';
import TemplateCarousel from '@/app/(authenticated)/components/home/template-carousel';
import { useUser } from '@interiorly/auth/client';
import {} from '@interiorly/design-system/components/ui/carousel';
import {
  BookBookmark02Icon,
  Clock04Icon,
  GeometricShapes01Icon,
  Moon02Icon,
  SunriseIcon,
  SunsetIcon,
} from 'hugeicons-react';

const HomePage = () => {
  const { user } = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    const displayName = user.fullName || user.emailAddresses[0].emailAddress;

    if (currentHour >= 23 || currentHour < 5) {
      return (
        <div className="flex w-full items-center justify-center gap-3">
          <Moon02Icon className="h-7 w-7 text-secondary-foreground" />
          <span className="font-semibold text-3xl">
            Good night, {displayName}
          </span>
        </div>
      );
    }

    if (currentHour < 12) {
      return (
        <div className="flex w-full items-center justify-center gap-3">
          <SunriseIcon className="h-7 w-7 text-secondary-foreground" />
          <span className="font-semibold text-3xl">
            Good morning, {displayName}
          </span>
        </div>
      );
    }

    if (currentHour < 18) {
      return (
        <div className="flex w-full items-center justify-center gap-3">
          <SunsetIcon className="h-7 w-7 text-secondary-foreground" />
          <span className="font-semibold text-3xl">
            Good afternoon, {displayName}
          </span>
        </div>
      );
    }
  };

  return (
    <main className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-24">
        <h1 className="py-12 text-center font-bold text-3xl text-foreground tracking-tight">
          {getGreeting()}
        </h1>

        <div className="space-y-8">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Clock04Icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-muted-foreground">
                Recently visited
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex aspect-square flex-col rounded-xl bg-secondary transition-shadow duration-200 hover:shadow-lg"
                >
                  <div className="flex h-2/5 w-full rounded-t-xl bg-secondary" />
                  <div className="flex h-3/5 w-full flex-col rounded-b-xl bg-muted p-4">
                    <h2 className="line-clamp-2 flex-1 font-semibold text-foreground text-sm">
                      Project {i}
                    </h2>
                    <div className="flex w-full gap-2 bg-red-500">
                      <div className="h-5 w-5 rounded-full bg-muted" />
                      <div className="h-5 w-full bg-muted" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section>
            <div className="mb-4 flex items-center gap-2">
              <BookBookmark02Icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-muted-foreground">Learn</h2>
            </div>
            <LearnCarousel
              items={[
                {
                  imageUrl: '',
                  readTime: '5m',
                  title: 'Getting Started with Interior Design',
                  url: '/learn/getting-started',
                },
                {
                  imageUrl: '',
                  readTime: '3m',
                  title: 'Color Theory Fundamentals',
                  url: '/learn/color-theory',
                },
                {
                  imageUrl: '',
                  readTime: '4m',
                  title: 'Space Planning Essentials',
                  url: '/learn/space-planning',
                },
                {
                  imageUrl: '',
                  readTime: '6m',
                  title: 'Lighting Design 101',
                  url: '/learn/lighting',
                },
                {
                  imageUrl: '',
                  readTime: '4m',
                  title: 'Material Selection Guide',
                  url: '/learn/materials',
                },
                {
                  imageUrl: '',
                  readTime: '7m',
                  title: 'Furniture Arrangement Tips',
                  url: '/learn/furniture',
                },
                {
                  imageUrl: '',
                  readTime: '5m',
                  title: 'Design Styles Overview',
                  url: '/learn/styles',
                },
                {
                  imageUrl: '',
                  readTime: '3m',
                  title: 'Sustainable Design Practices',
                  url: '/learn/sustainability',
                },
              ]}
            />
          </section>
          <section>
            <div className="mb-4 flex items-center gap-2">
              <GeometricShapes01Icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-muted-foreground">
                Featured Templates
              </h2>
            </div>
            <TemplateCarousel
              items={[
                {
                  author: 'Interiorly',
                  imageUrl: '',
                  title: 'Modern Minimalist Living Room',
                  url: '/templates/modern-minimalist',
                },
                {
                  author: 'Interiorly',
                  imageUrl: '',
                  title: 'Cozy Scandinavian Bedroom',
                  url: '/templates/scandinavian-bedroom',
                },
                {
                  author: 'Interiorly',
                  imageUrl: '',
                  title: 'Industrial Style Kitchen',
                  url: '/templates/industrial-kitchen',
                },
                {
                  author: 'Interiorly',
                  imageUrl: '',
                  title: 'Bohemian Home Office',
                  url: '/templates/boho-office',
                },
                {
                  author: 'Interiorly',
                  imageUrl: '',
                  title: 'Contemporary Dining Room',
                  url: '/templates/contemporary-dining',
                },
                {
                  author: 'Interiorly',
                  imageUrl: '',
                  title: 'Mid-Century Modern Study',
                  url: '/templates/midcentury-study',
                },
                {
                  author: 'Interiorly',
                  imageUrl: '',
                  title: 'Rustic Farmhouse Kitchen',
                  url: '/templates/farmhouse-kitchen',
                },
                {
                  author: 'Interiorly',
                  imageUrl: '',
                  title: 'Japanese Zen Bathroom',
                  url: '/templates/zen-bathroom',
                },
              ]}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
