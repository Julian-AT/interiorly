import { env } from '@/env';
import { auth, currentUser } from '@interiorly/auth/server';
import { showBetaFeature } from '@interiorly/feature-flags';
import { secure } from '@interiorly/security';
import React from 'react'

interface AppLayoutProps {
    children: React.ReactNode
}

const AppLayout = async ({ children }: AppLayoutProps) => {
if (env.ARCJET_KEY) {
    await secure(['CATEGORY:PREVIEW']);
  }

  const user = await currentUser();
  const { redirectToSignIn } = await auth();
  const betaFeature = await showBetaFeature();

  if (!user) {
    redirectToSignIn();
  }

  return children
}

export default AppLayout