import Image from 'next/image';
import type { ReactNode } from 'react';

type AuthLayoutProps = {
  readonly children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="grid min-h-screen min-w-screen lg:grid-cols-2">
    <div className="relative hidden flex-col items-center justify-center gap-4 lg:flex">
      <Image
        src="/assets/background.webp"
        alt="background"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover antialiased"
      />
      <div className="absolute inset-0" />
      <div className="absolute z-10 flex flex-col items-center justify-center p-6 text-center text-white">
        <h1 className="my-2 pt-2 text-5xl tracking-tight">
          Everything you need, <br /> to make anything you want.
        </h1>
        <p className="font-light text-lg">
          Transform your space with professional interior design
        </p>
      </div>
    </div>
    {children}
  </div>
);

export default AuthLayout;
