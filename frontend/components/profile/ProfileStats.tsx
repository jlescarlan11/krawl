import { LuMapPin, LuRoute } from 'react-icons/lu';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  count: number;
  bgColor?: string;
  iconColor?: string;
};

function StatCard({ icon, label, count, bgColor = 'bg-verde-600', iconColor = 'text-yellow-400' }: StatCardProps) {
  const formattedCount = count.toLocaleString();
  
  return (
    <div className={`w-full rounded-lg ${bgColor} text-white p-6`}>
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <StatCard
        icon={<LuMapPin size={24} />}
        label="Gems Created"
        count={gemsCreated}
        bgColor="bg-verde-600"
        iconColor="text-yellow-400"
      />
      <StatCard
        icon={<LuRoute size={24} />}
        label="Krawls Created"
        count={krawlsCreated}
        bgColor="bg-verde-700"
        iconColor="text-yellow-300"
      />
    </div>
  );
}


