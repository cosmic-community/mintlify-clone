import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import MobileNav from '@/components/MobileNav';
import CosmicBadge from '@/components/CosmicBadge';
import { getSidebarData, getVersion } from '@/lib/cosmic';

export const metadata: Metadata = {
  title: 'DevDocs — API Documentation',
  description:
    'Beautiful API documentation for your SaaS platform. Browse docs, track versions, and follow the changelog.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarData, version] = await Promise.all([
    getSidebarData(),
    getVersion(),
  ]);

  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📘</text></svg>"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <Sidebar sidebarData={sidebarData} version={version} />
          </div>

          {/* Mobile Nav */}
          <MobileNav sidebarData={sidebarData} version={version} />

          {/* Main Content */}
          <main className="flex-1 min-w-0 lg:ml-72">
            <div className="pt-16 lg:pt-0">{children}</div>
          </main>
        </div>

        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}