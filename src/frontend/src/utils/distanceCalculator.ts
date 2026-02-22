import type { Coordinates } from '../backend';

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 First coordinate [latitude, longitude]
 * @param coord2 Second coordinate [latitude, longitude]
 * @returns Distance in miles
 */
export function calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Filter items by distance from a given location
 */
export function filterByDistance<T extends { store_location: { coordinates: Coordinates } }>(
  items: T[],
  userCoordinates: Coordinates,
  maxDistance: number
): Array<T & { distance: number }> {
  return items
    .map(item => ({
      ...item,
      distance: calculateDistance(userCoordinates, item.store_location.coordinates)
    }))
    .filter(item => item.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
}
