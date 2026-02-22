import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Store } from 'lucide-react';

interface StoreFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function StoreFilter({ value, onChange }: StoreFilterProps) {
  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2 mb-2">
        <Store className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Store</h3>
      </div>
      
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="both" id="both" />
          <Label htmlFor="both" className="cursor-pointer">Both Stores</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Home Depot" id="homedepot" />
          <Label htmlFor="homedepot" className="cursor-pointer">Home Depot</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Lowe's" id="lowes" />
          <Label htmlFor="lowes" className="cursor-pointer">Lowe's</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
