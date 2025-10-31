import { LuCrown, LuStar, LuSparkles } from 'react-icons/lu';

type Props = {
  tier: string;
  score: number;
  tierNumber?: number; // Optional tier number (e.g., "Tier 5")
  statusMessage?: string; // e.g., "Lifetime Status Achieved"
  subtitle?: string; // e.g., "Platform Ambassador — No higher tier"
};

export default function TierScoreBanner({
  tier,
  score,
  tierNumber,
  statusMessage = 'Lifetime Status Achieved',
  subtitle,
}: Props) {
  // Format score with commas (score is a number)
  const formattedScore = score.toLocaleString();

  // Calculate tier number from tier name if not provided
  const displayTierNum = tierNumber ?? (() => {
    if (tier.includes('Newcomer')) return 1;
    if (tier.includes('Trail Maker')) return 2;
    if (tier.includes('Kanto Guide') || tier.includes('Krawl Master')) return 5;
    return undefined;
  })();

  return (
    <div className="w-full rounded-lg bg-verde-700 text-white p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        {/* Left: Tier Info */}
        <div className="flex items-start gap-3">
          <LuCrown className="text-yellow-400 shrink-0 mt-1" size={24} />
          <div>
           <div className="heading-4 text-white">{tier}</div>
{displayTierNum && (
  <div className="body-sm text-white mt-0.5">Tier {displayTierNum}</div>
)}
          </div>
        </div>

        {/* Right: Score & Status */}
        <div className="text-left sm:text-right">
          <div className="flex items-baseline gap-2 justify-end">
            <LuStar className="text-yellow-400 shrink-0" size={18} />
            <div>

<span className="heading-3 text-white">{formattedScore}</span>
<span className="body-sm text-white ml-1">points</span>

            </div>
          </div>
          {statusMessage && (
            <div className="flex items-center gap-1.5 justify-end mt-2">
              <LuSparkles className="text-yellow-300 shrink-0" size={14} />
             
<span className="body-sm text-white">{statusMessage}</span>

            </div>
          )}
          {subtitle && (
     
<div className="body-xs text-white mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}