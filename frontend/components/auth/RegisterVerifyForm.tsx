'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { LuMail, LuUser } from 'react-icons/lu';
import { registerRequest } from '@/lib/auth';

export default function RegisterVerifyForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
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
                setErr(null);
                try {
                  const u = (usernameRef.current?.value ?? username).trim();
                  const e = (emailRef.current?.value ?? email).trim();
                  if (!u || !e) throw new Error('Blank username/email');
                  await registerRequest({ username: u, email: e, captchaToken: token });
                  setSent(true);
                } catch {
                  setSent(true);
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
    if (!siteKey || !(window as any).grecaptcha || widgetIdRef.current === null) {
      setErr('CAPTCHA is not ready. Please try again.');
      return;
    }
    const u = (usernameRef.current?.value ?? username).trim();
    const emailVal = (emailRef.current?.value ?? email).trim();
    if (!u || !emailVal) {
      setErr('Please enter a username and email.');
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
      setErr('Failed to execute CAPTCHA.');
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
          <p className="text-sm text-neutral-700">
            If the details are valid, we’ve sent a link to your email. Please check your inbox.
          </p>
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
                />
              </div>
            </div>

            {err ? <p className="text-sm text-red-600">{err}</p> : null}

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


