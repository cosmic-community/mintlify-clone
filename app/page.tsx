import Link from 'next/link';
import { getDocSections, getDocPages, getVersion, getChangelogEntries } from '@/lib/cosmic';
import SectionIcon from '@/components/SectionIcon';
import VersionBadge from '@/components/VersionBadge';

export default async function HomePage() {
  const [sections, pages, version, changelog] = await Promise.all([
    getDocSections(),
    getDocPages(),
    getVersion(),
    getChangelogEntries(),
  ]);

  const firstPage = pages[0];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="relative max-w-5xl mx-auto px-6 py-20 lg:py-28">
          <div className="flex items-center gap-3 mb-6">
            {version && <VersionBadge version={version} />}
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            API{' '}
            <span className="bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
            Everything you need to integrate with our API. Explore guides, references, and examples to get started quickly.
          </p>
          <div className="flex flex-wrap gap-4">
            {firstPage ? (
              <Link
                href={`/docs/${firstPage.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-colors duration-200 shadow-lg shadow-accent/25"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Get Started
              </Link>
            ) : (
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-dark text-white font-medium rounded-lg transition-colors duration-200 shadow-lg shadow-accent/25"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Browse Docs
              </Link>
            )}
            <Link
              href="/changelog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Changelog
            </Link>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore the Docs</h2>
        <p className="text-gray-500 mb-10">Jump into any section to find what you need.</p>

        {sections.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-lg font-medium">No documentation sections yet</p>
            <p className="mt-1">Add sections in your Cosmic dashboard to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((section) => {
              const sectionPages = pages.filter((p) => {
                const ps = p.metadata?.section;
                if (!ps) return false;
                return ps.id === section.id || ps.slug === section.slug;
              });

              const firstSectionPage = sectionPages[0];

              return (
                <Link
                  key={section.id}
                  href={firstSectionPage ? `/docs/${firstSectionPage.slug}` : '/docs'}
                  className="group relative bg-white rounded-xl border border-gray-200 p-6 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent-subtle flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      <SectionIcon icon={section.metadata?.icon} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-accent transition-colors">
                        {section.metadata?.name || section.title}
                      </h3>
                      {section.metadata?.description && (
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                          {section.metadata.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        {sectionPages.length} page{sectionPages.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 text-gray-300 group-hover:text-accent transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Recent Changelog */}
      {changelog.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Recent Changes</h2>
              <p className="text-gray-500">Stay up to date with the latest updates.</p>
            </div>
            <Link
              href="/changelog"
              className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {changelog.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100"
              >
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-accent mt-2" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{entry.title}</h3>
                    {entry.metadata?.version_tag && (
                      <span className="text-xs font-mono bg-accent-subtle text-accent px-2 py-0.5 rounded-full">
                        {entry.metadata.version_tag}
                      </span>
                    )}
                  </div>
                  {entry.metadata?.date && (
                    <p className="text-xs text-gray-400">
                      {new Date(entry.metadata.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}