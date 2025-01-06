'use client';

import { useOrganization, useOrganizationList } from '@interiorly/auth/client';
import { redirect } from 'next/navigation';

const OnboardingPage = () => {
  const { organization } = useOrganization();
  const { setActive, userMemberships } = useOrganizationList({
    userMemberships: true,
  });

  if (!organization) {
    if (setActive && userMemberships.count > 0) {
      const newOrg = userMemberships.data[0].organization;
      setActive({ organization: newOrg.id });
      return redirect('/');
    }

    return redirect('/onboarding');
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-2xl">Welcome to Interiorly</h1>
      <p className="text-muted-foreground">
        You currently have {userMemberships.count} organization
        {userMemberships.count === 1 ? '' : 's'}
      </p>
    </div>
  );
};

export default OnboardingPage;
