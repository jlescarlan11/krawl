'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthForm, { FieldConfig } from '@/components/auth/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { LuUser } from 'react-icons/lu'; // Assuming you might want a user icon

// Define the shape of the form's values
type SignupValues = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Validation logic for the signup form
function validate(values: SignupValues) {
  const errors: Partial<Record<keyof SignupValues, string>> = {};

  if (!values.username.trim()) {
    errors.username = 'Username is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return errors;
}

export default function SignupForm() {
  const { signup } = useAuth(); // You will need to implement signup in your AuthContext
  const router = useRouter();

  // Configuration for the form fields
  const fields: FieldConfig<SignupValues>[] = [
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
      autoComplete: 'new-password', // Important for password managers
      showToggle: true,
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      autoComplete: 'new-password',
      showToggle: true,
    },
  ];

  return (
    <AuthForm<SignupValues>
      title="Create an Account"
      initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
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
