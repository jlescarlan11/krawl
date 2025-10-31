'use client';

import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import AuthForm, { FieldConfig } from '@/components/auth/AuthForm';
import { useRecaptcha } from '@/components/auth/hooks/useRecaptcha';
import { registerSchema, type RegisterFormValues } from '@/components/auth/schemas/register';
import { makeZodValidator } from '@/components/auth/schemas/validateAdapter';
import { registerRequest } from '@/lib/auth';

const validate = makeZodValidator(registerSchema);

export default function RegisterVerifyForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const pendingSubmitRef = useRef<{ username: string; email: string } | null>(null);
  
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const urlParams = useMemo(() => new URLSearchParams(search), [search]);
  const visibleCaptcha = urlParams.get('captcha') === 'visible';

  // Prefill from query params if present
  const initialUsername = urlParams.get('username') ?? '';
  const initialEmail = urlParams.get('email') ?? '';

  const { isReady, execute, reset, containerProps } = useRecaptcha({
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
    visible: visibleCaptcha,
    containerId: 'recaptcha-register',
    onToken: async (token: string) => {
      if (!pendingSubmitRef.current) return;

      setLoading(true);
      try {
        await registerRequest({
          username: pendingSubmitRef.current.username,
          email: pendingSubmitRef.current.email,
          captchaToken: token,
        });
        toast.success('Verification email sent! Please check your inbox.');
        setSent(true);
        pendingSubmitRef.current = null;
      } catch (error: any) {
        console.error('Registration request failed:', error);
        // Error messages are already shown via toast in api.ts for ApiError
        if (error?.name !== 'ApiError') {
          if (error instanceof TypeError || error?.message?.includes('fetch') || error?.message === 'OFFLINE') {
            toast.error('Network error. Please check your connection and try again.');
          } else if (error?.message) {
            toast.error(error.message);
          } else {
            toast.error('Failed to send verification email. Please try again.');
          }
        }
        setSent(false);
        reset();
      } finally {
        setLoading(false);
      }
    },
  });

  const fields: FieldConfig<RegisterFormValues>[] = [
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      placeholder: 'juandelacruz',
      autoComplete: 'username',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'juan@krawl.com',
      autoComplete: 'email',
    },
  ];

  const handleSubmit = async (values: RegisterFormValues) => {
    if (!isReady) {
      toast.error('CAPTCHA is not ready. Please try again.');
      return;
    }

    // Store values for submission after CAPTCHA token is received
    pendingSubmitRef.current = {
      username: values.username.trim(),
      email: values.email.trim(),
    };

    // Execute CAPTCHA (for invisible mode) or wait for user interaction (visible mode)
    if (visibleCaptcha) {
      // For visible CAPTCHA, user will interact and callback will be triggered
      // Just wait - no need to execute programmatically
    } else {
      // For invisible CAPTCHA, execute programmatically
      execute();
    }
  };

  if (sent) {
    return (
      <div className="mx-auto w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-6 shadow-md md:p-8">
        <div className="text-center space-y-4 py-8">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Registration Successful!</h3>
            <p className="text-sm text-neutral-600 mb-1">
              We've sent a verification link to your email.
            </p>
            <p className="text-sm text-neutral-600">
              Please check your inbox and click the link to complete your registration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl ">
      <div {...containerProps} />
      {visibleCaptcha && (
        <p className="text-xs text-neutral-600 mb-4">
          Debug: CAPTCHA is visible. Please complete it before submitting.
        </p>
      )}
      <AuthForm<RegisterFormValues>
        initialValues={{ username: initialUsername, email: initialEmail }}
        fields={fields}
        validate={validate}
        submitLabel="Send verification link"
        submittingLabel="Sending…"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
