import { availableTonight, popularStays } from '../data/crashListings';
import { CrashListing, CrashRequest } from '../types';

/**
 * In-memory fallback store. Swap the bodies below for Firestore reads/writes
 * (crashListings/, crashRequests/) without touching CrashLinkScreen.
 */
const requests = new Map<string, CrashRequest>();

const requestKey = (listingId: string, guestId: string) => `${listingId}:${guestId}`;

export async function getAvailableTonight(): Promise<CrashListing[]> {
  return availableTonight;
}

export async function getPopularStays(): Promise<CrashListing[]> {
  return popularStays;
}

export async function getMyRequest(listingId: string, guestId: string): Promise<CrashRequest | null> {
  return requests.get(requestKey(listingId, guestId)) ?? null;
}

export async function requestStay(listing: CrashListing, guestId: string): Promise<CrashRequest> {
  const key = requestKey(listing.id, guestId);
  const existing = requests.get(key);
  if (existing) return existing;

  const request: CrashRequest = {
    id: `req-${Date.now()}`,
    listingId: listing.id,
    hostId: listing.hostId,
    guestId,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  requests.set(key, request);
  return request;
}
