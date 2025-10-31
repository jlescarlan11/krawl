# Auth Components

Reusable, minimal abstractions for auth flows using a single `AuthForm` component, Zod schemas for validation, and shared hooks for common functionality like reCAPTCHA.

## Core Concepts

- **`AuthForm<T>`** - Standardized form component that handles layout, fields, validation, submitting state, and accessibility
- **Zod Schemas** - Centralized validation schemas in `schemas/` directory
- **`makeZodValidator`** - Adapter to convert Zod schemas to AuthForm's validation function signature
- **`useRecaptcha`** - Hook for managing Google reCAPTCHA integration
- **Per-flow wrappers** - Thin components that only define:
  - Field configurations
  - Validation (via Zod schemas)
  - Submit action

## Component Structure

```
components/auth/
├── AuthForm.tsx              # Core reusable form component
├── AuthScaffold.tsx          # Layout wrapper for auth pages
├── LoginForm.tsx             # Login form implementation
├── SignupForm.tsx             # Signup form implementation
├── RegisterVerifyForm.tsx    # Registration request form (with reCAPTCHA)
├── hooks/
│   └── useRecaptcha.ts       # reCAPTCHA integration hook
└── schemas/
    ├── login.ts              # Login form schema
    ├── signup.ts             # Signup form schema
    ├── register.ts           # Registration request schema
    └── validateAdapter.ts    # Zod to AuthForm validator adapter
```

## Example: Login

```tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthForm, { FieldConfig } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { loginSchema, type LoginFormValues } from '@/components/auth/schemas/login';
import { makeZodValidator } from '@/components/auth/schemas/validateAdapter';

const validate = makeZodValidator(loginSchema);

export default function LoginForm({ redirect = '/' }: { redirect?: string }) {
  const { login } = useAuth();
  const router = useRouter();

  const fields: FieldConfig<LoginFormValues>[] = [
    {
      name: 'emailOrUsername',
      label: 'Email or Username',
      type: 'text',
      placeholder: 'juan@krawl.com or juandelacruz',
      autoComplete: 'username',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      autoComplete: 'current-password',
      placeholder: '••••••••',
      showToggle: true,
    },
    {
      name: 'remember',
      label: 'Remember me',
      type: 'checkbox',
      rightAccessory: (
        <Link href="/forgot-password" className="text-sm font-medium text-verde-700 hover:underline">
          Forgot password?
        </Link>
      ),
    },
  ];

  return (
    <AuthForm<LoginFormValues>
      initialValues={{ emailOrUsername: '', password: '', remember: false }}
      fields={fields}
      validate={validate}
      submitLabel="Log In"
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-sm font-medium text-verde-700 hover:underline">
            Sign up
          </Link>
        </>
      }
      onSubmit={async (values) => {
        await login(values.emailOrUsername, values.password, values.remember);
        router.push(redirect);
      }}
    />
  );
}
```

## Example: Sign Up

```tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthForm, { FieldConfig } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { signupSchema, type SignupFormValues } from '@/components/auth/schemas/signup';
import { makeZodValidator } from '@/components/auth/schemas/validateAdapter';

const validate = makeZodValidator(signupSchema);

export default function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();

  const fields: FieldConfig<SignupFormValues>[] = [
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
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      autoComplete: 'new-password',
      showToggle: true,
      helperText: 'Must be at least 8 characters and include an uppercase, lowercase, number, and special character.',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: '••••••••',
      autoComplete: 'new-password',
      showToggle: true,
    },
    {
      name: 'termsAccepted',
      label: (
        <>
          I agree to the{' '}
          <Link href="/terms" target="_blank" className="text-verde-700 hover:underline">
            Terms and Conditions
          </Link>{' '}
          and{' '}
          <Link href="/privacy" target="_blank" className="text-verde-700 hover:underline">
            Privacy Policy
          </Link>
        </>
      ),
      type: 'checkbox',
    },
  ];

  return (
    <AuthForm<SignupFormValues>
      initialValues={{ username: '', email: '', password: '', confirmPassword: '', termsAccepted: false }}
      fields={fields}
      validate={validate}
      submitLabel="Sign Up"
      submittingLabel="Signing Up..."
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="text-sm font-medium text-verde-700 hover:underline">
            Log in
          </Link>
        </>
      }
      onSubmit={async (values) => {
        await signup(values.username, values.email, values.password);
        router.push('/');
      }}
    />
  );
}
```

## Example: Registration Request (with reCAPTCHA)

```tsx
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
  const pendingSubmitRef = useRef<{ username: string; email: string } | null>(null);
  
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const urlParams = useMemo(() => new URLSearchParams(search), [search]);
  const visibleCaptcha = urlParams.get('captcha') === 'visible';

  const { isReady, execute, reset, containerProps } = useRecaptcha({
    siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
    visible: visibleCaptcha,
    containerId: 'recaptcha-register',
    onToken: async (token: string) => {
      if (!pendingSubmitRef.current) return;
      
      try {
        await registerRequest({
          username: pendingSubmitRef.current.username,
          email: pendingSubmitRef.current.email,
          captchaToken: token,
        });
        toast.success('Verification email sent!');
        setSent(true);
        pendingSubmitRef.current = null;
      } catch (error) {
        // Error handling...
        reset();
      }
    },
  });

  const fields: FieldConfig<RegisterFormValues>[] = [
    { name: 'username', label: 'Username', type: 'text', autoComplete: 'username' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  ];

  const handleSubmit = async (values: RegisterFormValues) => {
    if (!isReady) {
      toast.error('CAPTCHA is not ready. Please try again.');
      return;
    }

    pendingSubmitRef.current = {
      username: values.username.trim(),
      email: values.email.trim(),
    };

    if (!visibleCaptcha) {
      execute(); // Execute invisible CAPTCHA
    }
    // For visible CAPTCHA, user interaction triggers callback
  };

  // Render success state or form...
}
```

## Using reCAPTCHA Hook

The `useRecaptcha` hook handles all reCAPTCHA integration:

```tsx
import { useRecaptcha } from '@/components/auth/hooks/useRecaptcha';

const { isReady, execute, reset, containerProps, token } = useRecaptcha({
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY,
  visible: false, // or true for visible CAPTCHA
  containerId: 'recaptcha-container',
  onToken: (token) => {
    // Handle token when received
  },
});

// Render container
<div {...containerProps} />

// Execute for invisible mode
<button onClick={execute} disabled={!isReady}>
  Submit
</button>
```

## Validation Patterns

All forms use Zod schemas for validation. The `makeZodValidator` adapter converts Zod schemas to the format expected by `AuthForm`:

```tsx
import { z } from 'zod';
import { makeZodValidator } from '@/components/auth/schemas/validateAdapter';

const mySchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Too short'),
});

const validate = makeZodValidator(mySchema);
```

## Schema Files

- **`login.ts`** - Login form validation (email/username + password)
- **`signup.ts`** - Full signup validation (username, email, password, confirmPassword, termsAccepted)
- **`register.ts`** - Registration request validation (username + email, no password)

## Tips

- Use `submittingLabel` to customize the in-progress button text
- Validation is synchronous and lightweight; surface server errors via `apiFetch` toasts
- For forms with reCAPTCHA, store pending values in a ref and submit when token is received
- Use `AuthScaffold` for consistent page layouts across auth flows
- All schemas should be defined in the `schemas/` directory for consistency

## Best Practices

1. **Always use Zod schemas** - Never write custom validation functions
2. **Use `makeZodValidator`** - Always convert Zod schemas using the adapter
3. **Centralize reCAPTCHA logic** - Use `useRecaptcha` hook instead of duplicating code
4. **Consistent layouts** - Use `AuthScaffold` for all auth pages
5. **Type safety** - Export form value types from schema files and use them throughout
