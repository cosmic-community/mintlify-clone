import Link from 'next/link';
import { getSidebarData, getMetafieldValue } from '@/lib/cosmic';
import SectionIcon from '@/components/SectionIcon';

export const metadata = {
  title: 'Documentation — DevDocs',
  description: 'Browse all documentation sections and pages.',
};

export default async function DocsIndexPage() {
  const sidebarData = await getSidebarData();

  return (
    <div className="max-w-content mx-auto px-6 py-12 lg:py-16 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Documentation</h1>
        <p className="text-gray-500 text-lg">
          Browse all available documentation sections and pages below.
        </p>
      </div>

      {sidebarData.length === 0 ? (
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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-lg font-medium">No documentation yet</p>
          <p className="mt-1">Add doc sections and pages in your Cosmic dashboard.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {sidebarData.map(({ section, pages }) => (
            <div key={section.id}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center text-accent">
                  <SectionIcon icon={section.metadata?.icon} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {/* Changed: Use getMetafieldValue to safely extract string from potential {key,value} object */}
                  {getMetafieldValue(section.metadata?.name) || section.title}
                </h2>
              </div>
              {section.metadata?.description && (
                <p className="text-gray-500 mb-4 ml-11">
                  {/* Changed: Use getMetafieldValue for description */}
                  {getMetafieldValue(section.metadata.description)}
                </p>
              )}
              {pages.length === 0 ? (
                <p className="text-sm text-gray-400 ml-11">No pages in this section yet.</p>
              ) : (
                <div className="ml-11 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pages.map((page) => (
                    <Link
                      key={page.id}
                      href={`/docs/${page.slug}`}
                      className="group flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-accent/30 hover:bg-accent-subtle/50 transition-all duration-200"
                    >
                      <svg
                        className="w-4 h-4 flex-shrink-0 text-gray-400 group-hover:text-accent transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 group-hover:text-accent font-medium transition-colors">
                        {page.title}
                      </span>
                      {page.metadata?.badge && (
                        <span className="ml-auto text-xs bg-badge-blue text-badge-blue-text px-2 py-0.5 rounded-full font-medium">
                          {/* Changed: Use getMetafieldValue for badge */}
                          {getMetafieldValue(page.metadata.badge)}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}