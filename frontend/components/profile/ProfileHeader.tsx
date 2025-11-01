type Props = {
  username: string;
  bio?: string | null;
  memberSince?: string; // ISO date string
  action?: React.ReactNode; // Right-aligned button (Edit/Vouch)
  avatarText?: string; // Optional initials
};

export default function ProfileHeader({
  username,
  bio,
  memberSince,
  action,
  avatarText,
}: Props) {
  const fmt = (iso?: string) => {
    if (!iso) return null;
    try {
      const d = new Date(iso);
      return d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
    } catch {
      return null;
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 min-w-[80px] min-h-[80px] rounded-full bg-sand-200 flex items-center justify-center font-semibold text-sand-900 flex-shrink-0 aspect-square">
          {avatarText ?? username.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="heading-3">@{username}</h2>
          </div>

          {bio ? (
            <p className="body-base mt-1 text-neutral-700 whitespace-pre-wrap break-words">{bio}</p>
          ) : (
            <p className="body-sm mt-1 text-neutral-500">Tell others about your expertise</p>
          )}

          {memberSince && (
            <div className="body-sm text-neutral-500 mt-2">
              Joined {fmt(memberSince)}
            </div>
          )}
        </div>
      </div>

      {action ? <div className="self-start">{action}</div> : null}
    </div>
  );
}