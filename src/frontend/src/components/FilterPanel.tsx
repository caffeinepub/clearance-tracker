import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { LocationFilter } from './LocationFilter';
import { StoreFilter } from './StoreFilter';
import { CategoryFilter } from './CategoryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';

interface FilterPanelProps {
  storeFilter: string;
  onStoreFilterChange: (value: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  onLocationFilterChange: (city: string, state: string, radius: number) => void;
  onPriceFilterChange: (min: number, max: number) => void;
  onClearFilters: () => void;
}

export function FilterPanel({
  storeFilter,
  onStoreFilterChange,
  selectedCategories,
  onCategoriesChange,
  onLocationFilterChange,
  onPriceFilterChange,
  onClearFilters
}: FilterPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear All
        </Button>
      </div>
      
      <StoreFilter value={storeFilter} onChange={onStoreFilterChange} />
      <CategoryFilter selectedCategories={selectedCategories} onChange={onCategoriesChange} />
      <PriceRangeFilter onFilterChange={onPriceFilterChange} />
      <LocationFilter onFilterChange={onLocationFilterChange} />
    </div>
  );
}
