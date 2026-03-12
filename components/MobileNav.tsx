'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { SidebarSection } from '@/types';
import type { Version } from '@/types';
import SectionIcon from '@/components/SectionIcon';
import SearchDialog from '@/components/SearchDialog';
import { useMemo } from 'react';

interface MobileNavProps {
  sidebarData: SidebarSection[];
  version: Version | null;
}

export default function MobileNav({ sidebarData, version }: MobileNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const allPages = useMemo(
    () => sidebarData.flatMap((s) => s.pages),
    [sidebarData]
  );

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar text-white flex items-center justify-between px-4 z-50 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-sm">DevDocs</span>
            {version?.metadata?.current_version && (
              <span className="text-[10px] bg-sidebar-hover text-sidebar-text px-1.5 py-0.5 rounded font-mono">
                v{version.metadata.current_version}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => setSearchOpen(true)}
          className="p-2 rounded-lg hover:bg-sidebar-hover transition-colors"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 bottom-0 w-72 bg-sidebar text-sidebar-text z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto scrollbar-thin ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Navigation Links */}
        <div className="px-4 py-3">
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'bg-sidebar-active text-white'
                : 'hover:bg-sidebar-hover hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <Link
            href="/changelog"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mt-1 ${
              pathname === '/changelog'
                ? 'bg-sidebar-active text-white'
                : 'hover:bg-sidebar-hover hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Changelog
          </Link>
        </div>

        <div className="mx-4 my-2 border-t border-sidebar-border" />

        {/* Doc Sections */}
        <nav className="px-4 py-2 pb-8">
          {sidebarData.map(({ section, pages }) => (
            <div key={section.id} className="mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-sidebar-text/60 uppercase tracking-wider">
                <SectionIcon icon={section.metadata?.icon} size="sm" />
                <span className="truncate">
                  {section.metadata?.name || section.title}
                </span>
              </div>
              <div className="mt-1 space-y-0.5">
                {pages.map((page) => {
                  const isActive = pathname === `/docs/${page.slug}`;
                  return (
                    <Link
                      key={page.id}
                      href={`/docs/${page.slug}`}
                      className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-all ${
                        isActive
                          ? 'bg-accent/20 text-accent-light font-medium'
                          : 'hover:bg-sidebar-hover hover:text-white'
                      }`}
                    >
                      <span className="truncate">{page.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        pages={allPages}
      />
    </>
  );
}