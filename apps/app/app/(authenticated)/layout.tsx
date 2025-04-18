import { env } from '@/env';
import { auth, currentUser } from '@interiorly/auth/server';
import { secure } from '@interiorly/security';
import type React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = async ({ children }: AppLayoutProps) => {
  if (env.ARCJET_KEY) {
    await secure(['CATEGORY:PREVIEW']);
  }

  const user = await currentUser();
  const { redirectToSignIn, orgId } = await auth();

  if (!user || user.banned) {
    redirectToSignIn();
  }

  return children;
};

export default AppLayout;
