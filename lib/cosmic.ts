import { createBucketClient } from '@cosmicjs/sdk';
import type {
  DocSection,
  DocPage,
  Version,
  ChangelogEntry,
  SidebarSection,
} from '@/types';
import { hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Changed: Added getMetafieldValue helper to safely extract string values
// from select-dropdown, radio-buttons, or check-boxes metafields that may
// be returned as {key, value} objects instead of plain strings.
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getDocSections(): Promise<DocSection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'doc-sections' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    const sections = response.objects as DocSection[];
    return sections.sort((a, b) => {
      const orderA = Number(a.metadata?.order) || 999;
      const orderB = Number(b.metadata?.order) || 999;
      return orderA - orderB;
    });
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch doc sections');
  }
}

export async function getDocPages(): Promise<DocPage[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'doc-pages' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    const pages = response.objects as DocPage[];
    return pages.sort((a, b) => {
      const orderA = Number(a.metadata?.order) || 999;
      const orderB = Number(b.metadata?.order) || 999;
      return orderA - orderB;
    });
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch doc pages');
  }
}

export async function getDocPageBySlug(slug: string): Promise<DocPage | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'doc-pages', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    return response.object as DocPage;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch doc page');
  }
}

export async function getVersion(): Promise<Version | null> {
  try {
    const response = await cosmic.objects
      .find({ type: 'version' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1);

    const versions = response.objects as Version[];
    if (!versions || versions.length === 0) {
      return null;
    }
    return versions[0] ?? null;
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch version');
  }
}

export async function getChangelogEntries(): Promise<ChangelogEntry[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'changelog-entries' })
      .props(['id', 'slug', 'title', 'metadata', 'created_at'])
      .depth(1);

    const entries = response.objects as ChangelogEntry[];
    return entries.sort((a, b) => {
      const dateA = new Date(a.metadata?.date || a.created_at || '').getTime();
      const dateB = new Date(b.metadata?.date || b.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error: unknown) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch changelog entries');
  }
}

export async function getSidebarData(): Promise<SidebarSection[]> {
  const [sections, pages] = await Promise.all([
    getDocSections(),
    getDocPages(),
  ]);

  return sections.map((section) => {
    const sectionPages = pages.filter((page) => {
      const pageSection = page.metadata?.section;
      if (!pageSection) return false;
      return pageSection.id === section.id || pageSection.slug === section.slug;
    });

    return {
      section,
      pages: sectionPages,
    };
  });
}