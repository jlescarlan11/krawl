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

  // Only show status if earned (score > 0 or max tier)
  const showStatus = score > 0 || tier === 'Krawl Master';

  return (
    <div className="w-full rounded-lg bg-verde-500 text-white p-4 shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4">
        {/* Left: Tier Info */}
        <div className="flex items-center gap-2">
          <LuCrown className="text-mango-400 shrink-0" size={20} />
          <div>
            <div className="heading-5 text-white">{tier}</div>
            {displayTierNum && (
              <div className="body-xs text-white/80">Tier {displayTierNum}</div>
            )}
          </div>
        </div>

        {/* Right: Score & Status */}
        <div className="text-left sm:text-right">
          <div className="flex items-center gap-2 sm:justify-end">
            <LuStar className="text-mango-400 shrink-0" size={16} />
            <span className="heading-5 text-white">{formattedScore}</span>
            <span className="body-xs text-white/80">points</span>
          </div>
          {showStatus && statusMessage && (
            <div className="flex items-center gap-1.5 sm:justify-end mt-1">
              <LuSparkles className="text-mango-400 shrink-0" size={12} />
              <span className="body-xs text-white/90">{statusMessage}</span>
            </div>
          )}
          {subtitle && (
            <div className="body-xs text-white/80 mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}