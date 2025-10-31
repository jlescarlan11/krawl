'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import AuthScaffold from '@/components/auth/AuthScaffold';
import { registerRequest } from '@/lib/auth';

declare global {
  interface Window {
    grecaptcha?: any;
    onRecaptchaVerified?: (token: string) => void;
  }
}

export default function RegisterStartPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const widgetIdRef = useRef<number | null>(null);
  const pendingSubmitRef = useRef(false);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
  // Debug logs to ensure env is injected and used
  console.log('siteKey from env:', process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY);
  console.log('resolved siteKey:', siteKey);

  const search = typeof window !== 'undefined' ? window.location.search : '';
  const urlParams = useMemo(() => new URLSearchParams(search), [search]);
  const visibleCaptcha = urlParams.get('captcha') === 'visible';

  // Prefill from query params if present
  useEffect(() => {
    const qUsername = urlParams.get('username');
    const qEmail = urlParams.get('email');
    if (qUsername) setUsername(qUsername);
    if (qEmail) setEmail(qEmail);
  }, [urlParams]);

  useEffect(() => {
    if (!siteKey) return;
    if (!document.querySelector('script[src="https://www.google.com/recaptcha/api.js?render=explicit"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      document.body.appendChild(script);
    }

    const interval = setInterval(() => {
      if (window.grecaptcha && !widgetIdRef.current) {
        try {
          window.grecaptcha.ready(() => {
            console.log('rendering grecaptcha');
            const id = window.grecaptcha.render('recaptcha-container', {
              sitekey: siteKey,
              size: visibleCaptcha ? 'normal' : 'invisible',
              callback: (token: string) => {
                console.log('captcha token:', typeof token === 'string' ? token.slice(0, 10) : token);
                setCaptchaToken(token);
                if (pendingSubmitRef.current) {
                  void actuallySubmit(token);
                  pendingSubmitRef.current = false;
                }
              },
            });
            widgetIdRef.current = id;
            console.log('grecaptcha widget id:', id);
          });
          clearInterval(interval);
        } catch {}
      }
    }, 200);

    return () => clearInterval(interval);
  }, [siteKey]);

  async function actuallySubmit(token: string) {
    setLoading(true);
    setSent(false); // Always reset sent state when starting a new submission
    try {
      const usernameValue = (usernameInputRef.current?.value ?? username).trim();
      const emailValue = (emailInputRef.current?.value ?? email).trim();

      if (!usernameValue || !emailValue) {
        console.log('register payload invalid (blank fields):', { usernameValue, emailValue });
        toast.error('Please enter a username and email.');
        setSent(false);
        return;
      }

      console.log('register payload:', {
        username: usernameValue,
        email: emailValue,
        captchaToken: (typeof token === 'string' ? token.slice(0, 10) + '…' : token),
      });
      await registerRequest({ username: usernameValue, email: emailValue, captchaToken: token });
      toast.success('Verification email sent! Please check your inbox.');
      setSent(true);
      // Don't clear form - show success message instead
    } catch (error: any) {
      console.error('Registration request failed:', error);
      // Error messages are already shown via toast in api.ts for ApiError
      // Only show toast for non-API errors that aren't already handled
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
    } finally {
      setLoading(false);
      setCaptchaToken(null);
      try {
        if (window.grecaptcha && widgetIdRef.current !== null) {
          window.grecaptcha.reset(widgetIdRef.current);
        }
      } catch {}
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(false); // Reset sent state when form is submitted
    if (!siteKey || !window.grecaptcha || widgetIdRef.current === null) {
      toast.error('CAPTCHA is not ready. Please try again.');
      setSent(false);
      return;
    }
    if (!captchaToken) {
      pendingSubmitRef.current = true;
      try {
        console.log('executing grecaptcha', { widget: widgetIdRef.current, siteKey, visibleCaptcha });
        if (visibleCaptcha) {
          // For visible widget, user interaction will trigger callback; just wait briefly
          setTimeout(() => {
            if (!captchaToken) {
              console.log('no token yet after visible render');
            }
          }, 1500);
        } else {
          window.grecaptcha.execute(widgetIdRef.current);
          // Retry once after 1s if no token
          setTimeout(() => {
            if (!captchaToken && widgetIdRef.current !== null) {
              console.log('retrying grecaptcha.execute');
              try { window.grecaptcha.execute(widgetIdRef.current!); } catch {}
            }
          }, 1000);
        }
      } catch {
        toast.error('Failed to execute CAPTCHA.');
      }
      return;
    }
    await actuallySubmit(captchaToken);
  }

  return (
    <AuthScaffold
      heading="Create your account"
      subheading="Enter your username and email; we'll send you a link to set your password."
    >
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
        <div
          id="recaptcha-container"
          style={visibleCaptcha ? { marginBottom: 12 } : { display: 'none' }}
        />
        {visibleCaptcha ? (
          <p className="text-xs text-neutral-600">
            Debug: CAPTCHA is visible. Please complete it before submitting.
          </p>
        ) : null}
        {sent ? (
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
        ) : (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Username</label>
              <input
                className="w-full rounded-md border px-3 py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                ref={usernameInputRef}
                autoComplete="username"
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailInputRef}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Send verification link'}
            </button>
          </>
        )}
      </form>
    </AuthScaffold>
  );
}


