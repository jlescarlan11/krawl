'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthForm, { FieldConfig } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';

type LoginValues = {
  emailOrUsername: string;
  password: string;
  remember: boolean;
};

function validate(values: LoginValues) {
  const errors: Partial<Record<keyof LoginValues & string, string>> = {};
  if (!values.emailOrUsername.trim()) {
    errors.emailOrUsername = 'Email or username is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Must be at least 8 characters';
  }
  return errors;
}

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

    const fields: FieldConfig<LoginValues>[] = [
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
    <AuthForm<LoginValues>
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
        router.push('/');
      }}
    />
  );
}
