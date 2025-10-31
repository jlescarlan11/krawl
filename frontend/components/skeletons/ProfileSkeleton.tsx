export default function ProfileSkeleton() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full bg-neutral-200 animate-pulse" />
          <div className="flex-1">
            <div className="h-6 w-40 bg-neutral-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-neutral-200 rounded mt-2 animate-pulse" />
            <div className="h-3 w-32 bg-neutral-200 rounded mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="w-full rounded-lg bg-neutral-200 h-24 animate-pulse" />
    </div>
  );
}


