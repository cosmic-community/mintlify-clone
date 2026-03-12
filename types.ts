export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface DocSection extends CosmicObject {
  type: 'doc-sections';
  metadata: {
    name?: string;
    description?: string;
    icon?: string;
    order?: number | string;
  };
}

export interface DocPage extends CosmicObject {
  type: 'doc-pages';
  metadata: {
    section?: DocSection;
    content?: string;
    badge?: string;
    order?: number | string;
  };
}

export interface Version extends CosmicObject {
  type: 'version';
  metadata: {
    current_version?: string;
    release_date?: string;
  };
}

export interface ChangelogEntry extends CosmicObject {
  type: 'changelog-entries';
  metadata: {
    version_tag?: string;
    date?: string;
    category?: string | { key: string; value: string };
    content?: string;
  };
}

export interface SidebarSection {
  section: DocSection;
  pages: DocPage[];
}

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

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}