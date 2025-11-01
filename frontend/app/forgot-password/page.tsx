'use client';

import { useState } from 'react';
import AuthForm, { type FieldConfig } from '@/components/auth/AuthForm';
import AuthScaffold from '@/components/auth/AuthScaffold';
import { forgotPassword } from '@/lib/auth';

type Values = { email: string };

function validate(v: Values) {
  const e: Partial<Record<keyof Values & string, string>> = {};
  if (!v.email?.trim()) e.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email';
  return e;
}

export default function ForgotPasswordPage() {
  const [done, setDone] = useState(false);

  const fields: FieldConfig<Values>[] = [
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
  ];

  if (done) {
    return (
      <AuthScaffold
        heading="Reset Your Password"
        subheading="Enter your email address and we'll send you a reset link"
      >
        <div className="mx-auto w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-6 shadow-md md:p-8">
          <h2 className="mb-2 text-xl font-semibold text-neutral-800">Check your email</h2>
          <p className="mb-3 text-neutral-700">
            If an account exists for that email, we sent a reset link.
          </p>
          <p className="text-sm text-neutral-600">
            <strong>Can't find the email?</strong> Please check your spam or junk folder. Some email providers may filter automated emails.
          </p>
        </div>
      </AuthScaffold>
    );
  }

  return (
    <AuthScaffold
      heading="Reset Your Password"
      subheading="Enter your email address and we'll send you a reset link"
    >
      <AuthForm<Values>
        title={undefined}
        initialValues={{ email: '' }}
        fields={fields}
        validate={validate}
        submitLabel="Send reset link"
        submittingLabel="Sending..."
        onSubmit={async (values) => {
          await forgotPassword({ email: values.email });
          setDone(true);
        }}
      />
    </AuthScaffold>
  );
}


