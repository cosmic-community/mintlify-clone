'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { SidebarSection } from '@/types';
import type { Version } from '@/types';
import SectionIcon from '@/components/SectionIcon';
import SearchDialog from '@/components/SearchDialog';
import { useState, useMemo } from 'react';
// Changed: Import getMetafieldValue from shared utility (safe for client components)
import { getMetafieldValue } from '@/lib/utils';

interface SidebarProps {
  sidebarData: SidebarSection[];
  version: Version | null;
}

export default function Sidebar({ sidebarData, version }: SidebarProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  const allPages = useMemo(
    () => sidebarData.flatMap((s) => s.pages),
    [sidebarData]
  );

  return (
    <>
      <aside className="fixed top-0 left-0 h-screen w-72 bg-sidebar text-sidebar-text flex flex-col z-40 border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="font-bold text-white text-base">DevDocs</span>
            {version?.metadata?.current_version && (
              <span className="ml-2 text-xs bg-sidebar-hover text-sidebar-text px-1.5 py-0.5 rounded font-mono">
                v{version.metadata.current_version}
              </span>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="px-4 py-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-sidebar-text rounded-lg border border-sidebar-border hover:border-sidebar-text/30 hover:bg-sidebar-hover transition-all duration-200"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search docs...</span>
            <kbd className="ml-auto text-xs bg-sidebar-hover px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="px-4 py-2">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              pathname === '/'
                ? 'bg-sidebar-active text-sidebar-text-active'
                : 'text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <Link
            href="/changelog"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 mt-1 ${
              pathname === '/changelog'
                ? 'bg-sidebar-active text-sidebar-text-active'
                : 'text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Changelog
          </Link>
        </div>

        {/* Divider */}
        <div className="mx-4 my-2 border-t border-sidebar-border" />

        {/* Doc Sections */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin">
          {sidebarData.map(({ section, pages }) => (
            <div key={section.id} className="mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-sidebar-text/60 uppercase tracking-wider">
                <SectionIcon icon={section.metadata?.icon} size="sm" />
                <span className="truncate">
                  {/* Changed: Use getMetafieldValue to safely extract string from potential {key,value} object */}
                  {getMetafieldValue(section.metadata?.name) || section.title}
                </span>
              </div>
              <div className="mt-1 space-y-0.5">
                {pages.map((page) => {
                  const isActive = pathname === `/docs/${page.slug}`;
                  return (
                    <Link
                      key={page.id}
                      href={`/docs/${page.slug}`}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-accent/20 text-accent-light font-medium border-l-2 border-accent ml-0'
                          : 'text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-text-active'
                      }`}
                    >
                      <span className="truncate">{page.title}</span>
                      {/* Changed: Use getMetafieldValue to safely extract badge string */}
                      {getMetafieldValue(page.metadata?.badge) && (
                        <span className="ml-auto text-[10px] bg-accent/20 text-accent-light px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                          {getMetafieldValue(page.metadata?.badge)}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        pages={allPages}
      />
    </>
  );
}