import { ClearanceItemCard } from './ClearanceItemCard';
import type { ClearanceItem } from '../backend';
import { Sparkles } from 'lucide-react';

interface BestDealsSectionProps {
  items: ClearanceItem[];
}

export function BestDealsSection({ items }: BestDealsSectionProps) {
  // Sort by discount percentage and take top 12
  const bestDeals = [...items]
    .sort((a, b) => b.discount_percentage - a.discount_percentage)
    .slice(0, 12);

  if (bestDeals.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="h-7 w-7 text-amber-600 dark:text-amber-400" />
        <h2 className="text-3xl font-bold">Best Deals</h2>
      </div>
      
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {bestDeals.map((item) => (
            <ClearanceItemCard key={Number(item.id)} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
