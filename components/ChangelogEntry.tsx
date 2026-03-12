import type { ChangelogEntry as ChangelogEntryType } from '@/types';
import { getMetafieldValue } from '@/types';

interface ChangelogEntryProps {
  entry: ChangelogEntryType;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  feature: { bg: 'bg-badge-green', text: 'text-badge-green-text' },
  improvement: { bg: 'bg-badge-blue', text: 'text-badge-blue-text' },
  bugfix: { bg: 'bg-badge-red', text: 'text-badge-red-text' },
  bug: { bg: 'bg-badge-red', text: 'text-badge-red-text' },
  fix: { bg: 'bg-badge-red', text: 'text-badge-red-text' },
  breaking: { bg: 'bg-badge-yellow', text: 'text-badge-yellow-text' },
  deprecation: { bg: 'bg-badge-yellow', text: 'text-badge-yellow-text' },
  security: { bg: 'bg-badge-purple', text: 'text-badge-purple-text' },
};

function getCategoryStyle(rawCategory: string): { bg: string; text: string } {
  const key = rawCategory.toLowerCase().replace(/[\s-_]/g, '');
  
  for (const [pattern, style] of Object.entries(categoryColors)) {
    if (key.includes(pattern)) {
      return style;
    }
  }

  return { bg: 'bg-gray-100', text: 'text-gray-700' };
}

export default function ChangelogEntry({ entry }: ChangelogEntryProps) {
  const category = getMetafieldValue(entry.metadata?.category);
  const categoryStyle = category ? getCategoryStyle(category) : null;

  const formattedDate = entry.metadata?.date
    ? new Date(entry.metadata.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="relative pl-8 animate-fade-in">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-white border-[3px] border-accent z-10" />

      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors duration-200">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
          {entry.metadata?.version_tag && (
            <span className="text-xs font-mono bg-accent-subtle text-accent px-2 py-0.5 rounded-full font-medium">
              {entry.metadata.version_tag}
            </span>
          )}
          {category && categoryStyle && (
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${categoryStyle.bg} ${categoryStyle.text}`}
            >
              {category}
            </span>
          )}
        </div>

        {/* Date */}
        {formattedDate && (
          <p className="text-sm text-gray-400 mb-4">{formattedDate}</p>
        )}

        {/* Content */}
        {entry.metadata?.content && (
          <div
            className="changelog-content"
            dangerouslySetInnerHTML={{ __html: entry.metadata.content }}
          />
        )}
      </div>
    </div>
  );
}