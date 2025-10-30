# Auth Components

Reusable, minimal abstractions for auth flows using a single `AuthForm` and thin wrappers per flow.

## Core Concepts

- `AuthForm<T>` renders standardized layout, fields, validation, submitting state, and accessibility.
- Per-flow wrappers only define:
  - fields config
  - validation rules
  - submit action

## Example: Login

```tsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthForm, { FieldConfig } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

type LoginValues = { email: string; password: string; remember: boolean };

function validate(v: LoginValues) {
  const e: Partial<Record<keyof LoginValues & string, string>> = {};
  if (!v.email.trim()) e.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email';
  if (!v.password) e.password = 'Password is required';
  else if (v.password.length < 8) e.password = 'Must be at least 8 characters';
  return e;
}

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const fields: FieldConfig<LoginValues>[] = [
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'juan@halina.com' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'current-password', showToggle: true },
    { name: 'remember', label: 'Remember me', type: 'checkbox' },
  ];

  return (
    <AuthForm<LoginValues>
      initialValues={{ email: '', password: '', remember: false }}
      fields={fields}
      validate={validate}
      submitLabel="Log In"
      submittingLabel="Logging in..."
      secondaryRow={<><span /> <Link href="/forgot-password" className="text-sm font-medium text-verde-700 hover:underline">Forgot password?</Link></>}
      footer={<>Don&apos;t have an account? <Link href="/signup" className="text-sm font-medium text-verde-700 hover:underline">Sign up</Link></>}
      onSubmit={async (values) => { await login(values.email, values.password, values.remember); router.push('/'); }}
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
import { register } from '@/lib/auth';

type SignupValues = { name: string; email: string; password: string; confirm: string };

function validate(v: SignupValues) {
  const e: Partial<Record<keyof SignupValues & string, string>> = {};
  if (!v.name.trim()) e.name = 'Name is required';
  if (!v.email.trim()) e.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email';
  if (!v.password) e.password = 'Password is required';
  else if (v.password.length < 8) e.password = 'Must be at least 8 characters';
  if (v.confirm !== v.password) e.confirm = 'Passwords do not match';
  return e;
}

export default function SignupForm() {
  const { setSession } = useAuth();
  const router = useRouter();

  const fields: FieldConfig<SignupValues>[] = [
    { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Juan Dela Cruz' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'juan@halina.com' },
    { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password', showToggle: true },
    { name: 'confirm', label: 'Confirm Password', type: 'password', autoComplete: 'new-password', showToggle: true },
  ];

  return (
    <AuthForm<SignupValues>
      title="Create your account"
      initialValues={{ name: '', email: '', password: '', confirm: '' }}
      fields={fields}
      validate={validate}
      submitLabel="Sign Up"
      submittingLabel="Creating account..."
      footer={<>Already have an account? <Link href="/login" className="text-sm font-medium text-verde-700 hover:underline">Log in</Link></>}
      onSubmit={async (v) => { const res = await register({ name: v.name, email: v.email, password: v.password }); setSession(res.token, res.user, true); router.push('/'); }}
    />
  );
}
```

## Example: Forgot Password

```tsx
'use client';
import AuthForm, { FieldConfig } from '@/components/auth/AuthForm';
import { forgotPassword } from '@/lib/auth';
import { toast } from 'sonner';

type ForgotValues = { email: string };

function validate(v: ForgotValues) {
  const e: Partial<Record<keyof ForgotValues & string, string>> = {};
  if (!v.email.trim()) e.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email';
  return e;
}

export default function ForgotPasswordForm() {
  const fields: FieldConfig<ForgotValues>[] = [
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'juan@halina.com' },
  ];

  return (
    <AuthForm<ForgotValues>
      title="Reset your password"
      initialValues={{ email: '' }}
      fields={fields}
      validate={validate}
      submitLabel="Send reset link"
      submittingLabel="Sending..."
      onSubmit={async (v) => { await forgotPassword({ email: v.email }); toast.success('If that email exists, a reset link has been sent.'); }}
    />
  );
}
```

Tips:
- Use `submittingLabel` to customize the in-progress button text.
- Validation is synchronous and lightweight; surface server errors via `apiFetch` toasts.

- Added concise JSDoc above `FieldConfig` and `AuthFormProps` so usage is clear by reading types.
- Provided a short `README.md` with Login, Signup, and Forgot Password examples for quick copy/use.