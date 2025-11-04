'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Coffee, TrendingUp, QrCode, HelpCircle } from 'lucide-react';

export default function DocsPage() {
  const docSections = [
    {
      title: 'Coffee Tools',
      description: 'Learn how to use the Interactive Coffee Flavour Wheel and other coffee-related tools',
      icon: Coffee,
      href: '/docs/coffee-tools',
      color: 'text-amber-600'
    },
    {
      title: 'General Tools',
      description: 'Guide to using the QR Code Generator and other utility tools',
      icon: QrCode,
      href: '/docs/general-tools',
      color: 'text-blue-600'
    },
    {
      title: 'ETF Tracker',
      description: 'Complete guide to tracking and analyzing Exchange-Traded Funds',
      icon: TrendingUp,
      href: '/docs/etf-tracker',
      color: 'text-green-600'
    },
    {
      title: 'FAQ',
      description: 'Frequently asked questions and troubleshooting tips',
      icon: HelpCircle,
      href: '/docs/faq',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Documentation</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Welcome to the Platzer.dev documentation. Here you'll find comprehensive guides on how to use all the tools and features available on this website.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About Platzer.dev</h2>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              Platzer.dev is created by Luis Platzer, a software developer, former professional barista, coffee roaster, and coffee enthusiast. 
              The goal is to provide useful tools that help you enjoy and improve every cup of coffee, along with other handy utilities.
            </p>
            <p className="text-muted-foreground">
              This website offers a collection of tools designed to bridge the world of software development and coffee culture, 
              with utilities for coffee professionals, investors, and general users.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Browse Documentation</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {docSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2 mb-2">
                          <Icon className={`h-5 w-5 ${section.color}`} />
                          {section.title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {section.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between">
                      Read Documentation
                      <span aria-hidden="true">→</span>
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
        <p className="text-muted-foreground mb-4">
          No registration or login is required for most features. Simply navigate to the tool you want to use and start exploring!
        </p>
        <div className="flex gap-4">
          <Link href="/">
            <Button variant="outline">Go to Home</Button>
          </Link>
          <Link href="/coffee-tools">
            <Button variant="outline">Browse Coffee Tools</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
