import { getChangelogEntries } from '@/lib/cosmic';
import ChangelogEntry from '@/components/ChangelogEntry';

export const metadata = {
  title: 'Changelog — DevDocs',
  description: 'See the latest updates, bug fixes, and new features.',
};

export default async function ChangelogPage() {
  const entries = await getChangelogEntries();

  return (
    <div className="max-w-content mx-auto px-6 py-12 lg:py-16 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Changelog</h1>
        <p className="text-gray-500 text-lg">
          All the latest updates, improvements, and fixes.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p className="text-lg font-medium">No changelog entries yet</p>
          <p className="mt-1">Add changelog entries in your Cosmic dashboard.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gray-200" />

          <div className="space-y-8">
            {entries.map((entry) => (
              <ChangelogEntry key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}