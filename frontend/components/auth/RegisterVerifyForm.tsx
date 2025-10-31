'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { LuMail, LuUser } from 'react-icons/lu';
import { registerRequest } from '@/lib/auth';

export default function RegisterVerifyForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const widgetIdRef = useRef<number | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
  const search = typeof window !== 'undefined' ? window.location.search : '';
  const urlParams = useMemo(() => new URLSearchParams(search), [search]);
  const visibleCaptcha = urlParams.get('captcha') === 'visible';

  useEffect(() => {
    if (!siteKey) return;
    if (!document.querySelector('script[src="https://www.google.com/recaptcha/api.js?render=explicit"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      document.body.appendChild(script);
    }
    const interval = setInterval(() => {
      if ((window as any).grecaptcha && widgetIdRef.current === null) {
        try {
          (window as any).grecaptcha.ready(() => {
            const id = (window as any).grecaptcha.render('recaptcha-register', {
              sitekey: siteKey,
              size: visibleCaptcha ? 'normal' : 'invisible',
              callback: async (token: string) => {
                setLoading(true);
                setSent(false); // Always reset sent state when starting a new submission
                try {
                  const u = (usernameRef.current?.value ?? username).trim();
                  const e = (emailRef.current?.value ?? email).trim();
                  if (!u || !e) {
                    toast.error('Please enter a username and email.');
                    setSent(false);
                    setLoading(false);
                    return;
                  }
                  await registerRequest({ username: u, email: e, captchaToken: token });
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
                  try {
                    if ((window as any).grecaptcha && widgetIdRef.current !== null) {
                      (window as any).grecaptcha.reset(widgetIdRef.current);
                    }
                  } catch {}
                }
              },
            });
            widgetIdRef.current = id;
          });
          clearInterval(interval);
        } catch {}
      }
    }, 200);
    return () => clearInterval(interval);
  }, [siteKey, username, email, visibleCaptcha]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(false); // Reset sent state when form is submitted
    if (!siteKey || !(window as any).grecaptcha || widgetIdRef.current === null) {
      toast.error('CAPTCHA is not ready. Please try again.');
      setSent(false);
      return;
    }
    const u = (usernameRef.current?.value ?? username).trim();
    const emailVal = (emailRef.current?.value ?? email).trim();
    if (!u || !emailVal) {
      toast.error('Please enter a username and email.');
      setSent(false);
      return;
    }
    try {
      if (visibleCaptcha) {
        // visible: user will interact
      } else {
        (window as any).grecaptcha.execute(widgetIdRef.current);
        setTimeout(() => {
          if (!sent && widgetIdRef.current !== null) {
            try { (window as any).grecaptcha.execute(widgetIdRef.current); } catch {}
          }
        }, 1000);
      }
    } catch {
      toast.error('Failed to execute CAPTCHA.');
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg border border-neutral-200 bg-white p-6 shadow-md md:p-8">
      <form onSubmit={onSubmit} className="w-full">
        <div
          id="recaptcha-register"
          style={visibleCaptcha ? { marginBottom: 12 } : { display: 'none' }}
        />
        {visibleCaptcha ? (
          <p className="text-xs text-neutral-600">Debug: CAPTCHA is visible. Complete it, then submit.</p>
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
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-neutral-700">Username</label>
              <div className="relative">
                <LuUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input
                  className="w-full rounded-md border px-10 py-2 text-sm outline-none transition-colors focus:ring-2 border-neutral-300 focus:ring-verde-600/30"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  ref={usernameRef}
                  autoComplete="username"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium text-neutral-700">Email</label>
              <div className="relative">
                <LuMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input
                  type="email"
                  className="w-full rounded-md border px-10 py-2 text-sm outline-none transition-colors focus:ring-2 border-neutral-300 focus:ring-verde-600/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailRef}
                  autoComplete="email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-verde-700 px-4 py-3 text-white shadow-md hover:bg-verde-800 disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send verification link'}
            </button>
          </>
        )}
      </form>
    </div>
  );
}


