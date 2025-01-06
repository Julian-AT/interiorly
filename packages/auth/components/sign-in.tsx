import { SignIn as ClerkSignIn } from '@clerk/nextjs';

export const SignIn = () => (
  <ClerkSignIn
    appearance={{
      elements: {
        header: 'hidden',
      },
    }}
    signUpUrl={'/sign-up'}
  />
);
