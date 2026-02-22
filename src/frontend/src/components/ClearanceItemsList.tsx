import { ClearanceItemCard } from './ClearanceItemCard';
import type { ClearanceItem } from '../backend';
import { Package } from 'lucide-react';

interface ClearanceItemsListProps {
  items: Array<ClearanceItem & { distance?: number }>;
  isLoading?: boolean;
}

export function ClearanceItemsList({ items, isLoading }: ClearanceItemsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No items found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters to see more clearance items
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <ClearanceItemCard 
          key={Number(item.id)} 
          item={item}
          distance={item.distance}
        />
      ))}
    </div>
  );
}
