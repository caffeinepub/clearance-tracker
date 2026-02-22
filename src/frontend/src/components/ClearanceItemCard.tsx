import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Tag } from 'lucide-react';
import { AvailabilityStatus, type ClearanceItem } from '../backend';

interface ClearanceItemCardProps {
  item: ClearanceItem;
  distance?: number;
}

export function ClearanceItemCard({ item, distance }: ClearanceItemCardProps) {
  const isHomeDepot = item.store_name === 'Home Depot';
  const storeBadgeColor = isHomeDepot ? 'bg-orange-600 hover:bg-orange-700' : 'bg-blue-600 hover:bg-blue-700';
  
  const availabilityText = 
    item.availability_status === AvailabilityStatus.available ? 'In Stock' :
    item.availability_status === AvailabilityStatus.limited_quantity ? 'Limited Stock' :
    'Out of Stock';
  
  const availabilityColor =
    item.availability_status === AvailabilityStatus.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
    item.availability_status === AvailabilityStatus.limited_quantity ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' :
    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={`${storeBadgeColor} text-white`}>
            {item.store_name}
          </Badge>
          <Badge variant="destructive" className="text-lg font-bold px-3 py-1">
            {Math.round(item.discount_percentage)}% OFF
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2">{item.product_name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-bold text-primary">
            ${item.clearance_price.toFixed(2)}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            ${item.original_price.toFixed(2)}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{item.product_category}</span>
        </div>
        
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-muted-foreground">
              {item.store_location.city}, {item.store_location.state}
            </div>
            {distance !== undefined && (
              <div className="text-primary font-medium mt-1">
                {distance} miles away
              </div>
            )}
          </div>
        </div>
        
        <Badge variant="outline" className={availabilityColor}>
          {availabilityText}
        </Badge>
      </CardContent>
    </Card>
  );
}
