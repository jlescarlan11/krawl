'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthScaffold from '@/components/auth/AuthScaffold';
import { registerComplete } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';
import { LuLock, LuEye, LuEyeOff } from 'react-icons/lu';
import PasswordStrength from '@/components/auth/PasswordStrength';

export default function RegisterCompleteForm({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const { setSession } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const valid = password.length >= 8 && password === confirm;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await registerComplete({ token, password });
      setSession(res.token, res.user, true);
      router.push('/');
    } catch (e) {
      setErr('The link is invalid or has expired.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthScaffold
      heading="Set your password"
      subheading="Choose a strong password to complete your account setup."
    >
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">New password</label>
          <div className="relative">
            <LuLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full rounded-md border px-10 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              autoComplete="new-password"
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
          <p className="text-xs text-neutral-500">Must be at least 8 characters and include an uppercase, lowercase, and a number.</p>
          <PasswordStrength password={password} />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Confirm password</label>
          <div className="relative">
            <LuLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type={showConfirm ? 'text' : 'password'}
              className="w-full rounded-md border px-10 py-2"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
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
        </div>
        {err ? <p className="text-sm text-red-600">{err}</p> : null}
        <button
          type="submit"
          disabled={!valid || loading}
          className="w-full rounded-md bg-neutral-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? 'Submitting…' : 'Create account'}
        </button>
      </form>
    </AuthScaffold>
  );
}


