"use client";

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
      title={undefined}
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
