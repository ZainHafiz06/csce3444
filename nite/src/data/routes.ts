export type RouteCardData = {
  id: string;
  badge: string;
  destination: string;
  eta: string;
  distance: string;
  price: string;
  provider: string;
  arrives: string;
  /** 0-1 progress toward pickup, drives the thin ETA bar. */
  progress: number;
};

export type PickupSpot = {
  id: string;
  name: string;
  subtitle: string;
  distance: string;
  price: string;
};

export const suggestedRoutes: RouteCardData[] = [
  {
    id: 'home',
    badge: 'to campus',
    destination: 'UTD → Home',
    eta: '12 min',
    distance: '2.8 mi',
    price: '$12',
    provider: 'UberX',
    arrives: 'Arrives in 4 min',
    progress: 0.78,
  },
  {
    id: 'legacy-west',
    badge: 'to event',
    destination: 'UTD → Legacy West',
    eta: '8 min',
    distance: '1.9 mi',
    price: '$9',
    provider: 'Lyft',
    arrives: 'Arrives in 3 min',
    progress: 0.3,
  },
];

export const pickupSpots: PickupSpot[] = [
  {
    id: 'utd-library',
    name: 'UTD Library',
    subtitle: 'Safe Pick-Up Zone',
    distance: '0.2 mi',
    price: 'Free',
  },
  {
    id: 'legacy-west-spot',
    name: 'Legacy West',
    subtitle: 'Main Rideshare Spot',
    distance: '4.1 mi',
    price: 'Free',
  },
];
