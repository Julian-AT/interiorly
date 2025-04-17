'use client';
import {
  CreateOrganization,
  useOrganization,
  useOrganizationList,
} from '@interiorly/auth/client';

const OnboardingPage = () => {
  const { organization, isLoaded: isLoadedOrg } = useOrganization();
  const {
    setActive,
    userMemberships,
    isLoaded: isLoadedOrgList,
  } = useOrganizationList({
    userMemberships: true,
  });

  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center">
      <CreateOrganization hideSlug />
    </div>
  );

  // if (!isLoadedOrg || !isLoadedOrgList) {
  //   return (
  //     <div className="flex h-screen items-center justify-center gap-4">
  //       <Loading03Icon className="animate-spin" />
  //       <span className="text-muted-foreground">Getting things ready...</span>
  //     </div>
  //   );
  // }

  // if (!organization) {
  //   return <OrganizationSelector />
  // }

  // if (organization) {
  //   return redirect('/');
  // }

  // if (setActive && userMemberships.count > 0) {
  //   const newOrg = userMemberships.data[0].organization;
  //   setActive({ organization: newOrg.id });
  //   return redirect('/');
  // }

  // return (
  //   <div className="flex h-screen flex-col items-center justify-center gap-4">
  //     <h1 className="font-bold text-2xl">Welcome to Interiorly</h1>
  //     <p className="text-muted-foreground">
  //       You currently have {userMemberships.count} organization
  //       {userMemberships.count === 1 ? '' : 's'}
  //     </p>
  //   </div>
  // );
};

export default OnboardingPage;
