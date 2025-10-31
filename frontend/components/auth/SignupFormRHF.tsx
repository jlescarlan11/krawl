'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuMail, LuLock, LuUser, LuEye, LuEyeOff } from 'react-icons/lu';
import { useMemo, useState } from 'react';
import { signupSchema, type SignupFormValues } from '@/components/auth/schemas/signup';
import PasswordStrength from '@/components/auth/PasswordStrength';
import { useAuth } from '@/context/AuthContext';

export default function SignupFormRHF() {
  const router = useRouter();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
    watch,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    mode: 'onBlur',
  });

  const passwordValue = watch('password');
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const onSubmit = async (values: SignupFormValues) => {
    await signup(values.username, values.email, values.password);
    router.push('/');
  };

  const sendVerificationLink = () => {
    const values = ((): SignupFormValues => {
      // react-hook-form get values via watch
      return {
        username: watch('username') || '',
        email: watch('email') || '',
        password: watch('password') || '',
        confirmPassword: watch('confirmPassword') || '',
        termsAccepted: !!watch('termsAccepted'),
      } as SignupFormValues;
    })();
    const username = encodeURIComponent(values.username.trim());
    const email = encodeURIComponent(values.email.trim());
    router.push(`/register-start?username=${username}&email=${email}`);
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-6 shadow-md md:p-8">
        {/* <h2 className="mb-6 text-xl font-semibold text-neutral-800">Create your account</h2> */}
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="mb-1 block text-sm font-medium text-neutral-700">
              Username
            </label>
            <div className="relative">
              <LuUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                id="username"
                type="text"
                autoComplete="username"
                className={`w-full rounded-md border px-10 py-2 text-sm outline-none transition-colors focus:ring-2 ${
                  errors.username ? 'border-error focus:ring-error/30' : 'border-neutral-300 focus:ring-verde-600/30'
                }`}
                placeholder="juandelacruz"
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? 'username-error' : undefined}
                {...register('username')}
              />
            </div>
            {errors.username ? (
              <p id="username-error" className="mt-2 text-xs text-error">
                {errors.username.message}
              </p>
            ) : null}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-neutral-700">
              Email
            </label>
            <div className="relative">
              <LuMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                id="email"
                type="email"
                autoComplete="email"
                className={`w-full rounded-md border px-10 py-2 text-sm outline-none transition-colors focus:ring-2 ${
                  errors.email ? 'border-error focus:ring-error/30' : 'border-neutral-300 focus:ring-verde-600/30'
                }`}
                placeholder="juan@krawl.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
              />
            </div>
            {errors.email ? (
              <p id="email-error" className="mt-2 text-xs text-error">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-neutral-700">
              Password
            </label>
            <div className="relative">
              <LuLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                className={`w-full rounded-md border px-10 py-2 text-sm outline-none transition-colors focus:ring-2 ${
                  errors.password ? 'border-error focus:ring-error/30' : 'border-neutral-300 focus:ring-verde-600/30'
                }`}
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                {showPassword ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            {errors.password ? (
              <p id="password-error" className="mt-2 text-xs text-error">
                {errors.password.message}
              </p>
            ) : (
              <p className="mt-2 text-xs text-neutral-500">
                Must be at least 8 characters and include an uppercase, lowercase, and a number.
              </p>
            )}
            <PasswordStrength password={passwordValue} />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-neutral-700">
              Confirm Password
            </label>
            <div className="relative">
              <LuLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                className={`w-full rounded-md border px-10 py-2 text-sm outline-none transition-colors focus:ring-2 ${
                  errors.confirmPassword ? 'border-error focus:ring-error/30' : 'border-neutral-300 focus:ring-verde-600/30'
                }`}
                placeholder="••••••••"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                {showConfirm ? <LuEyeOff size={18} /> : <LuEye size={18} />}
              </button>
            </div>
            {errors.confirmPassword ? (
              <p id="confirmPassword-error" className="mt-2 text-xs text-error">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          {/* Terms */}
          <div className="mb-6">
            <label className="flex items-start gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                className={`mt-1 h-4 w-4 rounded border ${errors.termsAccepted ? 'border-error' : 'border-neutral-300'}`}
                aria-invalid={!!errors.termsAccepted}
                aria-describedby={errors.termsAccepted ? 'termsAccepted-error' : undefined}
                {...register('termsAccepted')}
              />
              <span>
                I agree to the{' '}
                <Link href="/terms" target="_blank" className="text-verde-700 hover:underline">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" target="_blank" className="text-verde-700 hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.termsAccepted ? (
              <p id="termsAccepted-error" className="mt-2 text-xs text-error">
                {errors.termsAccepted.message as string}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="w-full rounded-md bg-verde-700 px-4 py-3 text-center text-white shadow-md transition-colors hover:bg-verde-800 focus:outline-none focus:ring-2 focus:ring-verde-600 disabled:opacity-75"
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>

          <div className="my-4 text-center text-xs text-neutral-500">or</div>

          <button
            type="button"
            onClick={sendVerificationLink}
            className="w-full rounded-md border border-neutral-300 px-4 py-3 text-center text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50"
          >
            Send verification link instead
          </button>

          <div className="mt-6 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-sm font-medium text-verde-700 hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}


