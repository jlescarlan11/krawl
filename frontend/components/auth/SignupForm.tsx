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
  termsAccepted: boolean;
};

// Validation logic for the signup form
function validate(values: SignupValues) {
  const errors: Partial<Record<keyof SignupValues, string>> = {};

  // Username Validation
  if (!values.username.trim()) {
    errors.username = 'Username is required';
  } else if (values.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  } else if (values.username.length > 20) {
    errors.username = 'Username cannot exceed 20 characters';
  } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
    errors.username = 'Can only contain letters, numbers, and underscores';
  }

  // Email Validation
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Password Validation
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = 'Must contain at least one uppercase letter';
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = 'Must contain at least one lowercase letter';
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'Must contain at least one number';
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
    errors.password = 'Must contain at least one special character';
  }

  // Confirm Password Validation
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Terms Accepted Validation
  if (!values.termsAccepted) {
    errors.termsAccepted = 'You must accept the terms and conditions to sign up';
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
    <AuthForm<SignupValues>
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
