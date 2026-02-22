import { useState, useMemo } from 'react';
import { useGetAllClearanceItems } from '../hooks/useQueries';
import { ClearanceItemsList } from '../components/ClearanceItemsList';
import { BestDealsSection } from '../components/BestDealsSection';
import { FilterPanel } from '../components/FilterPanel';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter, Heart } from 'lucide-react';
import { filterByDistance } from '../utils/distanceCalculator';
import type { ClearanceItem, Coordinates } from '../backend';

export default function MainPage() {
  const { data: allItems = [], isLoading } = useGetAllClearanceItems();
  
  const [storeFilter, setStoreFilter] = useState('both');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });
  const [locationFilter, setLocationFilter] = useState<{ city: string; state: string; radius: number } | null>(null);
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);

  const handleLocationFilterChange = (city: string, state: string, radius: number) => {
    setLocationFilter({ city, state, radius });
    // In a real app, you'd geocode the city/state to get coordinates
    // For demo purposes, using a placeholder coordinate
    setUserCoordinates([40.7128, -74.0060]); // Example: NYC coordinates
  };

  const handleClearFilters = () => {
    setStoreFilter('both');
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: Infinity });
    setLocationFilter(null);
    setUserCoordinates(null);
  };

  const filteredItems = useMemo(() => {
    let filtered = allItems;

    // Store filter
    if (storeFilter !== 'both') {
      filtered = filtered.filter(item => item.store_name === storeFilter);
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(item => 
        selectedCategories.includes(item.product_category)
      );
    }

    // Price range filter
    filtered = filtered.filter(item => 
      item.clearance_price >= priceRange.min && 
      item.clearance_price <= priceRange.max
    );

    // Location filter
    if (locationFilter && userCoordinates) {
      filtered = filtered.filter(item => 
        item.store_location.city === locationFilter.city &&
        item.store_location.state === locationFilter.state
      );
      
      // Add distance calculation
      return filterByDistance(filtered, userCoordinates, locationFilter.radius);
    }

    return filtered;
  }, [allItems, storeFilter, selectedCategories, priceRange, locationFilter, userCoordinates]);

  const filterPanel = (
    <FilterPanel
      storeFilter={storeFilter}
      onStoreFilterChange={setStoreFilter}
      selectedCategories={selectedCategories}
      onCategoriesChange={setSelectedCategories}
      onLocationFilterChange={handleLocationFilterChange}
      onPriceFilterChange={(min, max) => setPriceRange({ min, max })}
      onClearFilters={handleClearFilters}
    />
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Clearance Finder</h1>
              <p className="text-amber-100">Find the best deals from Home Depot & Lowe's</p>
            </div>
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="secondary" size="icon">
                  <Filter className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                {filterPanel}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-8">
              {filterPanel}
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <BestDealsSection items={filteredItems} />
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">All Clearance Items</h2>
              <p className="text-muted-foreground">
                Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </p>
            </div>
            
            <ClearanceItemsList items={filteredItems} isLoading={isLoading} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()} Clearance Finder • Built with{' '}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
