'use client';

import { useMemo } from 'react';

export type PasswordStrengthProps = {
  password: string;
};

function calculateStrengthScore(password: string): number {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  // Clamp 0..4 to keep UI consistent
  return Math.max(0, Math.min(score, 4));
}

function labelForScore(score: number): string {
  switch (score) {
    case 0:
    case 1:
      return 'Very weak';
    case 2:
      return 'Weak';
    case 3:
      return 'Good';
    case 4:
      return 'Strong';
    default:
      return '';
  }
}

function colorForIndex(idx: number, score: number): string {
  if (idx <= score - 1) {
    if (score <= 2) return 'bg-red-500';
    if (score === 3) return 'bg-yellow-500';
    return 'bg-green-600';
  }
  return 'bg-neutral-200';
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const score = useMemo(() => calculateStrengthScore(password), [password]);
  const label = useMemo(() => labelForScore(score), [score]);

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex gap-1" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 w-full rounded ${colorForIndex(i, score)}`} />
        ))}
      </div>
      <p className="mt-1 text-xs text-neutral-500">Password strength: {label}</p>
    </div>
  );
}


