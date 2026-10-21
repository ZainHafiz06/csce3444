import { FinderItem } from '../types';

const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

export const initialFinderItems: FinderItem[] = [
  {
    id: 'finder-1',
    reporterId: 'user-casey',
    reportType: 'found',
    title: 'Blue water bottle',
    description: 'Hydroflask with a UTD sticker, left near the library entrance.',
    category: 'Bottle',
    approximateLocation: 'UTD Library',
    createdAt: daysAgo(1),
    status: 'open',
  },
  {
    id: 'finder-2',
    reporterId: 'user-rio',
    reportType: 'lost',
    title: 'AirPods case',
    description: 'White case, no AirPods inside. Lost near the student union.',
    category: 'Electronics',
    approximateLocation: 'Student Union',
    createdAt: daysAgo(2),
    status: 'open',
  },
];
