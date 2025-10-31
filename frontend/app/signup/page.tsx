import type { Metadata } from 'next';

import RegisterVerifyForm from '@/components/auth/RegisterVerifyForm';
import AuthScaffold from '@/components/auth/AuthScaffold';

export const metadata: Metadata = {
  title: 'Sign Up | Krawl',
};

export default function SignupPage() {
  return (
    <AuthScaffold
      heading="Create your account"
      subheading="Enter your username and email; we’ll send you a link."
    >
      <RegisterVerifyForm />
    </AuthScaffold>
  );
}
