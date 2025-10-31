'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
  const [err, setErr] = useState<string | null>(null);
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
    setErr(null);
    try {
      const usernameValue = (usernameInputRef.current?.value ?? username).trim();
      const emailValue = (emailInputRef.current?.value ?? email).trim();

      if (!usernameValue || !emailValue) {
        console.log('register payload invalid (blank fields):', { usernameValue, emailValue });
        setErr('Please enter a username and email.');
        return;
      }

      console.log('register payload:', {
        username: usernameValue,
        email: emailValue,
        captchaToken: (typeof token === 'string' ? token.slice(0, 10) + '…' : token),
      });
      await registerRequest({ username: usernameValue, email: emailValue, captchaToken: token });
      setSent(true);
    } catch {
      setSent(true);
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
    if (!siteKey || !window.grecaptcha || widgetIdRef.current === null) {
      setErr('CAPTCHA is not ready. Please try again.');
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
        setErr('Failed to execute CAPTCHA.');
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
          <p className="text-sm text-neutral-700">
            If the details are valid, we've sent a link to your email. Please check your inbox.
          </p>
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
              />
            </div>
            <div className="space-y-2">
              <label className="block text.sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-md border px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={emailInputRef}
                autoComplete="email"
                required
              />
            </div>
            {err ? <p className="text-sm text-red-600">{err}</p> : null}
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


