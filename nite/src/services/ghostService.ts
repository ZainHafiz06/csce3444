import { initialGhostPosts } from '../data/ghostPosts';
import { GhostPost } from '../types';

/**
 * In-memory fallback store. Swap the bodies below for Firestore reads/writes
 * (ghostPosts/, 24h expiresAt) without touching GhostScreen.
 */
let posts: GhostPost[] = [...initialGhostPosts];

export async function getActivePosts(): Promise<GhostPost[]> {
  const now = Date.now();
  posts = posts.filter((post) => new Date(post.expiresAt).getTime() > now);
  return [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createPost(text: string, approximateLocation?: string): Promise<GhostPost> {
  const now = new Date();
  const post: GhostPost = {
    id: `ghost-${now.getTime()}`,
    authorId: 'me',
    authorLabel: 'you',
    text: text.trim(),
    approximateLocation: approximateLocation?.trim() || undefined,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
  };
  posts = [post, ...posts];
  return post;
}
