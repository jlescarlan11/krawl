'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { updateMyProfile } from '@/lib/users';
import type { MyProfile } from '@/types/user';

type Props = {
  open: boolean;
  initialUsername: string;
  initialBio?: string | null;
  onClose: () => void;
  onUpdated: (p: MyProfile) => void;
};

export default function ProfileEditModal({
  open,
  initialUsername,
  initialBio,
  onClose,
  onUpdated,
}: Props) {
  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio ?? '');
  const [saving, setSaving] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (open) {
      setUsername(initialUsername);
      setBio(initialBio ?? '');
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
  }, [open, initialUsername, initialBio, onClose]);

  if (!mounted || !open) return null;

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: { username?: string; bio?: string } = {};
      if (username.trim() !== initialUsername) payload.username = username.trim();
      if ((initialBio ?? '') !== bio) payload.bio = bio;
      if (Object.keys(payload).length === 0) {
        onClose();
        return;
      }
      const updated = await updateMyProfile(payload);
      onUpdated(updated);
      toast.success('Profile updated');
      onClose();
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-lg rounded-lg bg-white p-5 shadow-lg"
      >
        <h3 className="heading-4 mb-3">Edit Profile</h3>
        <form onSubmit={save} className="space-y-3">
          <div>
            <label className="body-sm text-neutral-600">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 rounded-md border border-neutral-300 p-2"
              maxLength={50}
              autoComplete="username"
              placeholder="yourname"
            />
          </div>
          <div>
            <label className="body-sm text-neutral-600">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full mt-1 rounded-md border border-neutral-300 p-2"
              maxLength={1000}
              placeholder="Tell others about your local expertise"
            />
            <div className="text-right body-xs text-neutral-500">{bio.length}/1000</div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-neutral-300"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-sand-800 text-white disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}