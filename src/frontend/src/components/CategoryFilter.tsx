import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tag } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

const CATEGORIES = [
  'Tools',
  'Appliances',
  'Building Materials',
  'Lawn & Garden',
  'Paint',
  'Hardware',
  'Lighting',
  'Flooring',
  'Plumbing',
  'Electrical'
];

export function CategoryFilter({ selectedCategories, onChange }: CategoryFilterProps) {
  const handleToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter(c => c !== category));
    } else {
      onChange([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2 mb-2">
        <Tag className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Category</h3>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {CATEGORIES.map((category) => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={category}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleToggle(category)}
            />
            <Label htmlFor={category} className="cursor-pointer text-sm">
              {category}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
