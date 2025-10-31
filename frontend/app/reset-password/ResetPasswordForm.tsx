'use client';

import { useRouter } from 'next/navigation';
import AuthForm, { type FieldConfig } from '@/components/auth/AuthForm';
import { resetPassword } from '@/lib/auth';

type Values = { password: string; confirm: string };

function validate(v: Values) {
  const e: Partial<Record<keyof Values & string, string>> = {};
  if (!v.password) e.password = 'Password is required';
  else if (v.password.length < 8) e.password = 'Must be at least 8 characters';
  if (v.confirm !== v.password) e.confirm = 'Passwords do not match';
  return e;
}

export default function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();

  const fields: FieldConfig<Values>[] = [
    { name: 'password', label: 'New password', type: 'password', autoComplete: 'new-password', showToggle: true },
    { name: 'confirm', label: 'Confirm password', type: 'password', autoComplete: 'new-password', showToggle: true },
  ];

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
    <AuthForm<Values>
      title="Reset password"
      initialValues={{ password: '', confirm: '' }}
      fields={fields}
      validate={validate}
      submitLabel="Reset password"
      submittingLabel="Resetting..."
      onSubmit={async (values) => {
        await resetPassword({ token, newPassword: values.password });
        router.push('/login?reset=success');
      }}
    />
  );
}


