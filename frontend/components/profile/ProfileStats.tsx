import { LuMapPin, LuRoute } from 'react-icons/lu';
import EmptyState from '@/components/common/EmptyState';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  count: number;
  bgColor?: string;
  iconColor?: string;
};

function StatCard({ icon, label, count, bgColor = 'bg-verde-600', iconColor = 'text-mango-400' }: StatCardProps) {
  const formattedCount = count.toLocaleString();
  
  return (
    <div className={`w-full rounded-lg ${bgColor} text-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className={`${iconColor} shrink-0 mt-1`}>
            {icon}
          </div>
          <div>
            <div className="body-sm text-white/90">{label}</div>
            <div className="heading-3 text-white mt-1">{formattedCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfileStats({
  gemsCreated,
  krawlsCreated,
}: {
  gemsCreated: number;
  krawlsCreated: number;
}) {
  const router = useRouter();

  // Show empty state if no activity
  if (gemsCreated === 0 && krawlsCreated === 0) {
    return (
      <EmptyState
        icon={<LuMapPin size={64} />}
        title="No activity yet"
        description="Start exploring by pinning your first gem!"
        action={
          <Button
            variant="primary"
            onClick={() => router.push('/')}
          >
            Explore Map
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        icon={<LuMapPin size={24} />}
        label="Gems Created"
        count={gemsCreated}
        bgColor="bg-verde-600"
        iconColor="text-mango-400"
      />
      <StatCard
        icon={<LuRoute size={24} />}
        label="Krawls Created"
        count={krawlsCreated}
        bgColor="bg-verde-700"
        iconColor="text-mango-400"
      />
    </div>
  );
}


