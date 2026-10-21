import { GhostPost } from '../types';

const hoursFromNow = (hours: number) => new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

export const initialGhostPosts: GhostPost[] = [
  {
    id: 'ghost-1',
    authorId: 'user-anon-1',
    authorLabel: 'anon',
    text: 'line for the rooftop mixer is basically gone now, come through',
    approximateLocation: 'Campus Rooftop',
    createdAt: hoursAgo(1),
    expiresAt: hoursFromNow(23),
  },
  {
    id: 'ghost-2',
    authorId: 'user-anon-2',
    authorLabel: 'anon',
    text: 'open mic guy doing covers rn, actually good tonight',
    approximateLocation: 'Riverdale Coffee',
    createdAt: hoursAgo(3),
    expiresAt: hoursFromNow(21),
  },
];
