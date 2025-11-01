'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { updateMyProfile } from '@/lib/users';
import type { MyProfile } from '@/types/user';
import Button from '@/components/ui/Button';

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
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (open) {
      setUsername(initialUsername);
      setBio(initialBio ?? '');
      
      // Save current focus and focus first input
      previousFocusRef.current = document.activeElement as HTMLElement;
      setTimeout(() => firstInputRef.current?.focus(), 0);
      
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    } else {
      // Restore focus when modal closes
      previousFocusRef.current?.focus();
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
      aria-labelledby="edit-profile-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg mx-4"
      >
        <h3 id="edit-profile-title" className="heading-4 mb-4">Edit Profile</h3>
        <form onSubmit={save} className="space-y-4">
          <div>
            <label htmlFor="username-input" className="body-sm text-neutral-600 block mb-1">
              Username
            </label>
            <input
              id="username-input"
              ref={firstInputRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-neutral-300 p-2 focus-ring"
              maxLength={50}
              autoComplete="username"
              placeholder="yourname"
              required
            />
          </div>
          <div>
            <label htmlFor="bio-input" className="body-sm text-neutral-600 block mb-1">
              Bio
            </label>
            <textarea
              id="bio-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-neutral-300 p-2 focus-ring"
              maxLength={1000}
              placeholder="Tell others about your local expertise"
            />
            <div className="text-right body-xs text-neutral-500 mt-1">{bio.length}/1000</div>
          </div>
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={saving}
              className="sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={saving}
              className="sm:order-2"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}