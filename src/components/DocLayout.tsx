'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, BookOpen } from 'lucide-react';

interface DocSection {
  title: string;
  id: string;
  subsections?: { title: string; id: string; }[];
}

interface DocLayoutProps {
  title: string;
  description: string;
  sections: DocSection[];
  children: React.ReactNode;
}

export function DocLayout({ title, description, sections, children }: DocLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/docs">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Documentation
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-4xl font-bold">{title}</h1>
        </div>
        <p className="text-lg text-muted-foreground">{description}</p>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        {/* Table of Contents Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <h3 className="font-semibold mb-4">On This Page</h3>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <div key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      {section.title}
                    </a>
                    {section.subsections && (
                      <div className="ml-4 space-y-2 mt-2">
                        {section.subsections.map((sub) => (
                          <a
                            key={sub.id}
                            href={`#${sub.id}`}
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                          >
                            {sub.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="prose prose-slate dark:prose-invert max-w-none">
          {children}
        </main>
      </div>
    </div>
  );
}

interface DocSectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function DocSection({ id, title, children }: DocSectionProps) {
  return (
    <section id={id} className="mb-12 scroll-mt-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}

interface DocSubsectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function DocSubsection({ id, title, children }: DocSubsectionProps) {
  return (
    <div id={id} className="mb-8 scroll-mt-8">
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
