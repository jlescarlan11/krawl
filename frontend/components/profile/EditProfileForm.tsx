'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { updateMyProfile } from '@/lib/users';
import type { MyProfile } from '@/types/user';

export default function EditProfileForm({
  initialUsername,
  initialBio,
  startEditing = false,
  onUpdated,
}: {
  initialUsername: string;
  initialBio: string | null | undefined;
  startEditing?: boolean;
  onUpdated: (profile: MyProfile) => void;
}) {
  const [isEditing, setIsEditing] = useState(!!startEditing);
  const [username, setUsername] = useState<string>(initialUsername);
  const [bio, setBio] = useState<string>(initialBio ?? '');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (startEditing) setIsEditing(true);
  }, [startEditing]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload: { username?: string; bio?: string } = {};
      if (username !== initialUsername) payload.username = username.trim();
      if ((initialBio ?? '') !== bio) payload.bio = bio;

      if (Object.keys(payload).length === 0) {
        setIsEditing(false);
        return;
      }

      const updated = await updateMyProfile(payload);
      onUpdated(updated);
      toast.success('Profile updated');
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to update');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="space-y-3" id="edit-section">
{!isEditing ? (
  <div className="space-y-2">
    {initialBio ? (
      <p className="body-base whitespace-pre-wrap">{initialBio}</p>
    ) : (
      <p className="body-sm text-neutral-500">No bio yet</p>
    )}

    <div className="flex justify-end">
      <button
        type="button"
        className="px-4 py-2 rounded-md bg-sand-800 text-white"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>
    </div>
  </div>
) : (
        <form onSubmit={onSave} className="space-y-3">
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

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              disabled={isSaving}
              className="px-4 py-2 rounded-md border border-neutral-300"
              onClick={() => {
                setUsername(initialUsername);
                setBio(initialBio ?? '');
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 rounded-md bg-sand-800 text-white disabled:opacity-50"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}