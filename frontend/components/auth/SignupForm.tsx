'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthForm, { FieldConfig } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { signupSchema, type SignupFormValues } from '@/components/auth/schemas/signup';
import { makeZodValidator } from '@/components/auth/schemas/validateAdapter';

const validate = makeZodValidator(signupSchema);

export default function SignupForm() {
  const { signup } = useAuth(); // You will need to implement signup in your AuthContext
  const router = useRouter();

  // Configuration for the form fields
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
      autoComplete: 'new-password', // Important for password managers
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
      // title="Create an Account"
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
        // NOTE: You need to implement the 'signup' function in your AuthContext
        // It would likely take username, email, and password as arguments.
        await signup(values.username, values.email, values.password);
        router.push('/'); // Redirect to the home page after successful signup
      }}
    />
  );
}
