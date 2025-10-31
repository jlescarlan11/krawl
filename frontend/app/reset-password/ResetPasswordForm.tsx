'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordConfirmForm from '@/components/auth/PasswordConfirmForm';
import { resetPassword } from '@/lib/auth';

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-6 shadow-md md:p-8">
        <h2 className="mb-2 text-xl font-semibold text-neutral-800">Invalid or missing link</h2>
        <p className="text-neutral-700">
          Your reset link is missing or invalid. Please open the reset link directly from the email
          you received (it should look like <code>/reset-password?token=...</code>).
        </p>
      </div>
    );
  }

  return (
    <PasswordConfirmForm
      token={token}
      submitLabel="Reset password"
      submittingLabel="Resetting…"
      error={err}
      onError={() => setErr('The link is invalid or has expired.')}
      onSubmit={async (password) => {
        await resetPassword({ token, newPassword: password });
        router.push('/login?reset=success');
      }}
    />
  );
}


