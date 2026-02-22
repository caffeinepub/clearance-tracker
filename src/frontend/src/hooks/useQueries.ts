import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { AvailabilityStatus, type ClearanceItem, type StoreName, type City, type State, type Price } from '../backend';

export function useGetAllClearanceItems() {
  const { actor, isFetching } = useActor();

  return useQuery<ClearanceItem[]>({
    queryKey: ['clearanceItems', 'all'],
    queryFn: async () => {
      if (!actor) return [];
      
      // Fetch from both stores and combine
      const [homeDepotItems, lowesItems] = await Promise.all([
        actor.getClearanceItemsByStore('Home Depot'),
        actor.getClearanceItemsByStore("Lowe's")
      ]);
      
      return [...homeDepotItems, ...lowesItems];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetClearanceItemsByStore(storeName: StoreName) {
  const { actor, isFetching } = useActor();

  return useQuery<ClearanceItem[]>({
    queryKey: ['clearanceItems', 'store', storeName],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getClearanceItemsByStore(storeName);
    },
    enabled: !!actor && !isFetching && !!storeName,
  });
}

export function useGetClearanceItemsByLocation(city: City, state: State) {
  const { actor, isFetching } = useActor();

  return useQuery<ClearanceItem[]>({
    queryKey: ['clearanceItems', 'location', city, state],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getClearanceItemsByLocation(city, state);
    },
    enabled: !!actor && !isFetching && !!city && !!state,
  });
}

export function useGetClearanceItemsByPriceRange(minPrice: Price, maxPrice: Price) {
  const { actor, isFetching } = useActor();

  return useQuery<ClearanceItem[]>({
    queryKey: ['clearanceItems', 'priceRange', minPrice, maxPrice],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getClearanceItemsByPriceRange(minPrice, maxPrice);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddClearanceItem() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: {
      storeName: StoreName;
      productName: string;
      originalPrice: Price;
      clearancePrice: Price;
      discountPercentage: number;
      productCategory: string;
      address: string;
      city: City;
      state: State;
      zipCode: bigint;
      coordinates: [number, number];
      availabilityStatus: AvailabilityStatus;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addClearanceItem(
        item.storeName,
        item.productName,
        item.originalPrice,
        item.clearancePrice,
        item.discountPercentage,
        item.productCategory,
        item.address,
        item.city,
        item.state,
        item.zipCode,
        item.coordinates,
        item.availabilityStatus
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clearanceItems'] });
    },
  });
}
