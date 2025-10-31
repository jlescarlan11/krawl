'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthScaffold from '@/components/auth/AuthScaffold';
import PasswordConfirmForm from '@/components/auth/PasswordConfirmForm';
import { registerComplete } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';

export default function RegisterCompleteForm({ token }: { token: string }) {
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const { setSession } = useAuth();

  return (
    <AuthScaffold
      heading="Set your password"
      subheading="Choose a strong password to complete your account setup."
    >
      <PasswordConfirmForm
        token={token}
        submitLabel="Create account"
        submittingLabel="Submitting…"
        error={err}
        onError={() => setErr('The link is invalid or has expired.')}
        onSubmit={async (password) => {
          const res = await registerComplete({ token, password });
          setSession(res.token, res.user, true);
          router.push('/');
        }}
      />
    </AuthScaffold>
  );
}
