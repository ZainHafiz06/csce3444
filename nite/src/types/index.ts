export type CrashListing = {
  id: string;
  hostId: string;
  hostName: string;
  title: string;
  description?: string;
  price: string;
  isFree: boolean;
  approximateArea: string;
  distanceMiles: number;
  capacity: number;
  spotsRemaining: number;
  available: boolean;
  verifiedHost?: boolean;
};

export type CrashRequestStatus = 'pending' | 'accepted' | 'declined';

export type CrashRequest = {
  id: string;
  listingId: string;
  hostId: string;
  guestId: string;
  status: CrashRequestStatus;
  createdAt: string;
};

export type GhostPost = {
  id: string;
  authorId: string;
  authorLabel: string;
  text: string;
  approximateLocation?: string;
  createdAt: string;
  expiresAt: string;
};

export type FinderReportType = 'lost' | 'found';
export type FinderStatus = 'open' | 'resolved';

export type FinderItem = {
  id: string;
  reporterId: string;
  reportType: FinderReportType;
  title: string;
  description: string;
  category?: string;
  approximateLocation?: string;
  createdAt: string;
  status: FinderStatus;
};
