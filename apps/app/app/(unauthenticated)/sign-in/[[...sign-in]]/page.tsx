import { createMetadata } from '@interiorly/seo/metadata';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const title = 'Welcome back';
const description = 'Enter your details to sign in.';
const SignIn = dynamic(() =>
  import('@interiorly/auth/components/sign-in').then((mod) => mod.SignIn)
);

export const metadata: Metadata = createMetadata({ title, description });

const SignInPage = () => (
  <div className="flex flex-col items-center justify-center gap-4 bg-background">
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <h1 className="-my-4 font-medium text-3xl">Welcome to Interiorly</h1>
      <span>
        Don't have an account?{' '}
        <Link href="/sign-up" className="font-medium text-blue-600">
          Sign up for free
        </Link>
      </span>
      {/*       
      <div className="flex w-full flex-col gap-2 py-3">
        <Input placeholder="Email" className="w-full py-5" />
        <Input placeholder="Password" type="password" className="w-full py-5" />
      </div>
      <Button className="w-full rounded-full py-6">Login</Button> */}
    </div>
    <SignIn />
  </div>
);

export default SignInPage;
