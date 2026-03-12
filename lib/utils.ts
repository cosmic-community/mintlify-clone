/**
 * Safely extracts a string value from a metafield that may be returned
 * as a {key, value} object (select-dropdown, radio-buttons, check-boxes)
 * instead of a plain string.
 *
 * This is in a separate utility file so it can be imported by both
 * server components and 'use client' components without pulling in
 * the Cosmic SDK.
 */
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