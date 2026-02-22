import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface LocationFilterProps {
  onFilterChange: (city: string, state: string, radius: number) => void;
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export function LocationFilter({ onFilterChange }: LocationFilterProps) {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [radius, setRadius] = useState('25');

  const handleApply = () => {
    if (city && state) {
      onFilterChange(city, state, parseInt(radius));
    }
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Location</h3>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="state">State</Label>
        <Select value={state} onValueChange={setState}>
          <SelectTrigger id="state">
            <SelectValue placeholder="Select state" />
          </SelectTrigger>
          <SelectContent>
            {US_STATES.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="radius">Distance</Label>
        <Select value={radius} onValueChange={setRadius}>
          <SelectTrigger id="radius">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">Within 10 miles</SelectItem>
            <SelectItem value="25">Within 25 miles</SelectItem>
            <SelectItem value="50">Within 50 miles</SelectItem>
            <SelectItem value="100">Within 100 miles</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button onClick={handleApply} className="w-full" disabled={!city || !state}>
        Apply Location Filter
      </Button>
    </div>
  );
}
