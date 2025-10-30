import type { Metadata } from 'next';
import Link from 'next/link';

import SignupForm from '@/components/auth/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up | Krawl',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 py-10 lg:grid-cols-2">
        {/* Left brand column */}
        <div className="block text-center lg:text-left">
          <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
            <img src="/krawl-icon-color.svg" alt="Krawl" className="h-8 w-8" />
            <span className="text-xl font-semibold text-neutral-800">Krawl</span>
          </div>

          <h1 className="heading-1">Join the Krawl</h1>
          <p className="mt-4 text-neutral-600">Create your account to start exploring.</p>
        </div>

        {/* Right form card */}
        <div className="flex items-center justify-center">
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
