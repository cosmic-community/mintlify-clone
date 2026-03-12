import type { Version } from '@/types';

interface VersionBadgeProps {
  version: Version;
}

export default function VersionBadge({ version }: VersionBadgeProps) {
  const currentVersion = version.metadata?.current_version;
  const releaseDate = version.metadata?.release_date;

  if (!currentVersion) return null;

  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div className="inline-flex items-center gap-2 bg-accent-subtle border border-accent/20 text-accent rounded-full px-3 py-1">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
      <span className="text-xs font-semibold font-mono">v{currentVersion}</span>
      {formattedDate && (
        <>
          <span className="text-accent/40">·</span>
          <span className="text-xs text-accent/70">{formattedDate}</span>
        </>
      )}
    </div>
  );
}