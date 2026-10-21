import { initialFinderItems } from '../data/finderItems';
import { FinderItem, FinderReportType } from '../types';

/**
 * In-memory fallback store. Swap the bodies below for Firestore reads/writes
 * (finderItems/) without touching FinderScreen.
 */
let items: FinderItem[] = [...initialFinderItems];

export async function getItems(): Promise<FinderItem[]> {
  return [...items].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export type NewFinderReport = {
  reportType: FinderReportType;
  title: string;
  description: string;
  category?: string;
  approximateLocation?: string;
};

export async function createItem(report: NewFinderReport): Promise<FinderItem> {
  const item: FinderItem = {
    id: `finder-${Date.now()}`,
    reporterId: 'me',
    reportType: report.reportType,
    title: report.title.trim(),
    description: report.description.trim(),
    category: report.category?.trim() || undefined,
    approximateLocation: report.approximateLocation?.trim() || undefined,
    createdAt: new Date().toISOString(),
    status: 'open',
  };
  items = [item, ...items];
  return item;
}
