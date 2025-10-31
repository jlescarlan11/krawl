'use client';

import { useEffect, useRef, useState } from 'react';
import AuthForm, { FieldConfig } from '@/components/auth/AuthForm';
import { registerCompleteSchema, type RegisterCompleteFormValues } from '@/components/auth/schemas/registerComplete';
import { makeZodValidator } from '@/components/auth/schemas/validateAdapter';

const validate = makeZodValidator(registerCompleteSchema);

export interface PasswordConfirmFormProps {
  /**
   * Token for the password reset/activation flow
   */
  token: string;
  /**
   * Callback when form is submitted successfully
   */
  onSubmit: (password: string) => Promise<void>;
  /**
   * Submit button label
   */
  submitLabel?: string;
  /**
   * Submit button label while submitting
   */
  submittingLabel?: string;
  /**
   * Optional error message to display
   */
  error?: string | null;
  /**
   * Callback when error occurs (optional)
   */
  onError?: (error: Error) => void;
  /**
   * Password field label
   */
  passwordLabel?: string;
  /**
   * Confirm password field label
   */
  confirmLabel?: string;
  /**
   * Helper text for password field
   */
  passwordHelperText?: string;
}

/**
 * Shared password confirmation form component
 * Used for both password reset and account activation flows
 */
export default function PasswordConfirmForm({
  token,
  onSubmit,
  submitLabel = 'Set password',
  submittingLabel = 'Setting password…',
  error,
  onError,
  passwordLabel = 'New password',
  confirmLabel = 'Confirm password',
  passwordHelperText = 'Must be at least 8 characters and include an uppercase, lowercase, and a number.',
}: PasswordConfirmFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(error || null);
  const formRef = useRef<HTMLDivElement>(null);

  // Update password input visibility when toggle state changes
  useEffect(() => {
    const updatePasswordVisibility = () => {
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      const confirmInput = document.getElementById('confirmPassword') as HTMLInputElement;
      
      if (passwordInput) {
        passwordInput.type = showPassword ? 'text' : 'password';
      }
      
      if (confirmInput) {
        confirmInput.type = showConfirmPassword ? 'text' : 'password';
      }
    };

    // Small delay to ensure AuthForm has rendered
    const timeout = setTimeout(updatePasswordVisibility, 100);
    updatePasswordVisibility();

    return () => clearTimeout(timeout);
  }, [showPassword, showConfirmPassword]);

  // Sync external error prop
  useEffect(() => {
    setSubmitError(error || null);
  }, [error]);

  const fields: FieldConfig<RegisterCompleteFormValues>[] = [
    {
      name: 'password',
      label: passwordLabel,
      type: 'password',
      placeholder: '••••••••',
      autoComplete: 'new-password',
      showToggle: false, // Using custom toggle instead
      helperText: passwordHelperText,
    },
    {
      name: 'confirmPassword',
      label: confirmLabel,
      type: 'password',
      placeholder: '••••••••',
      autoComplete: 'new-password',
      showToggle: false, // Using custom toggle instead
    },
  ];

  // Insert custom toggle buttons into the form after render
  useEffect(() => {
    if (!formRef.current) return;

    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');
    
    const updateToggle = (input: HTMLElement | null, isPassword: boolean) => {
      if (!input) return;
      const container = input.parentElement;
      if (!container) return;
      
      const toggleClass = isPassword ? 'custom-password-toggle' : 'custom-confirm-toggle';
      const existingToggle = container.querySelector(`.${toggleClass}`);
      
      if (existingToggle) {
        existingToggle.remove();
      }
      
      // Create new toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = `${toggleClass} absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700`;
      const showState = isPassword ? showPassword : showConfirmPassword;
      toggleBtn.setAttribute('aria-label', showState ? (isPassword ? 'Hide password' : 'Hide confirm password') : (isPassword ? 'Show password' : 'Show confirm password'));
      
      // Create icon element
      const iconContainer = document.createElement('span');
      if (showState) {
        iconContainer.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
      } else {
        iconContainer.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
      }
      toggleBtn.appendChild(iconContainer);
      
      toggleBtn.onclick = () => {
        if (isPassword) {
          setShowPassword(!showPassword);
        } else {
          setShowConfirmPassword(!showConfirmPassword);
        }
      };
      
      container.style.position = 'relative';
      container.appendChild(toggleBtn);
    };

    // Small delay to ensure form is rendered
    const timeout = setTimeout(() => {
      updateToggle(passwordInput, true);
      updateToggle(confirmInput, false);
    }, 150);

    return () => clearTimeout(timeout);
  }, [showPassword, showConfirmPassword]);

  const handleSubmit = async (values: RegisterCompleteFormValues) => {
    setSubmitError(null);
    try {
      await onSubmit(values.password);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An error occurred. Please try again.';
      setSubmitError(errorMessage);
      onError?.(e instanceof Error ? e : new Error(errorMessage));
    }
  };

  return (
    <div ref={formRef} className="w-full max-w-md space-y-4">
      <AuthForm<RegisterCompleteFormValues>
        initialValues={{ password: '', confirmPassword: '' }}
        fields={fields}
        validate={validate}
        submitLabel={submitLabel}
        submittingLabel={submittingLabel}
        onSubmit={handleSubmit}
      />
      {submitError && <p className="text-sm text-red-600">{submitError}</p>}
    </div>
  );
}

