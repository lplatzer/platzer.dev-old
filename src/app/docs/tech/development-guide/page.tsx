'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function DevelopmentGuideDocsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="mb-6">
            <Link href="/docs/tech" className="text-blue-600 hover:text-blue-800">
              ← Back to Technical Docs
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Development Guide</h1>
            <p className="text-lg text-gray-600">
              Setup, conventions, and best practices for developers
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Setup</h2>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`# Clone repository
git clone https://github.com/lplatzer/platzer.dev
cd platzer.dev

# Install dependencies
pnpm install

# Set up environment
cp .env.local.example .env.local
# Edit .env.local with your values

# Run development server
pnpm dev

# Build for production
pnpm build

# Run production
pnpm start`}</pre>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Code Conventions</h2>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>TypeScript:</strong> Strict mode, no any types</li>
                <li>• <strong>Naming:</strong> camelCase variables, PascalCase components</li>
                <li>• <strong>Imports:</strong> Absolute paths with @ alias</li>
                <li>• <strong>Components:</strong> Functional with hooks</li>
                <li>• <strong>Styling:</strong> Tailwind CSS utilities</li>
                <li>• <strong>API:</strong> RESTful conventions</li>
              </ul>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Testing Checklist</h2>
              <div className="space-y-2">
                {['Build succeeds: pnpm build', 'No lint errors: pnpm lint', 'Manual testing of features', 
                  'Check mobile responsiveness', 'Verify API endpoints', 'Test error states'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
