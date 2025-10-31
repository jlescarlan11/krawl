'use client';

import AuthScaffold from '@/components/auth/AuthScaffold';
import RegisterVerifyForm from '@/components/auth/RegisterVerifyForm';

export default function RegisterStartPage() {
  return (
    <AuthScaffold
      heading="Create your account"
      subheading="Enter your username and email; we'll send you a link to set your password."
    >
      <RegisterVerifyForm />
    </AuthScaffold>
  );
}
