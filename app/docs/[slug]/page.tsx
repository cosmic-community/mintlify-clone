// app/docs/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getDocPageBySlug, getDocPages, getSidebarData } from '@/lib/cosmic';
import DocContent from '@/components/DocContent';
import PageBadge from '@/components/PageBadge';
import Link from 'next/link';

export async function generateStaticParams() {
  const pages = await getDocPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getDocPageBySlug(slug);

  if (!page) {
    return { title: 'Page Not Found — DevDocs' };
  }

  return {
    title: `${page.title} — DevDocs`,
    description: page.metadata?.content
      ? page.metadata.content.replace(/<[^>]*>/g, '').substring(0, 160)
      : `Documentation for ${page.title}`,
  };
}

export default async function DocPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [page, sidebarData] = await Promise.all([
    getDocPageBySlug(slug),
    getSidebarData(),
  ]);

  if (!page) {
    notFound();
  }

  // Find prev/next pages
  const allPages = sidebarData.flatMap((s) => s.pages);
  const currentIndex = allPages.findIndex((p) => p.slug === slug);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : undefined;
  const nextPage =
    currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : undefined;

  const sectionTitle =
    page.metadata?.section?.metadata?.name ||
    page.metadata?.section?.title ||
    '';

  return (
    <div className="max-w-content mx-auto px-6 py-10 lg:py-14 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link
          href="/docs"
          className="hover:text-accent transition-colors"
        >
          Docs
        </Link>
        {sectionTitle && (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-500">{sectionTitle}</span>
          </>
        )}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">{page.title}</span>
      </nav>

      {/* Page Header */}
      <div className="mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {page.title}
          </h1>
          {page.metadata?.badge && (
            <PageBadge badge={page.metadata.badge} />
          )}
        </div>
      </div>

      {/* Content */}
      <DocContent content={page.metadata?.content || ''} />

      {/* Prev / Next Navigation */}
      <div className="mt-16 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
        {prevPage ? (
          <Link
            href={`/docs/${prevPage.slug}`}
            className="group flex flex-col p-4 rounded-xl border border-gray-200 hover:border-accent/40 hover:shadow-md transition-all duration-200"
          >
            <span className="text-xs text-gray-400 mb-1">← Previous</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-accent transition-colors">
              {prevPage.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {nextPage ? (
          <Link
            href={`/docs/${nextPage.slug}`}
            className="group flex flex-col items-end p-4 rounded-xl border border-gray-200 hover:border-accent/40 hover:shadow-md transition-all duration-200"
          >
            <span className="text-xs text-gray-400 mb-1">Next →</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-accent transition-colors">
              {nextPage.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}