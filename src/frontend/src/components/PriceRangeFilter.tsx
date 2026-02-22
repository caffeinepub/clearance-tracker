import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

interface PriceRangeFilterProps {
  onFilterChange: (min: number, max: number) => void;
}

export function PriceRangeFilter({ onFilterChange }: PriceRangeFilterProps) {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  const handleApply = () => {
    const minPrice = min ? parseFloat(min) : 0;
    const maxPrice = max ? parseFloat(max) : Infinity;
    
    if (minPrice <= maxPrice) {
      onFilterChange(minPrice, maxPrice);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Price Range</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="minPrice">Min</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="0"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maxPrice">Max</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Any"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>
      </div>
      
      <Button onClick={handleApply} className="w-full">
        Apply Price Filter
      </Button>
    </div>
  );
}
