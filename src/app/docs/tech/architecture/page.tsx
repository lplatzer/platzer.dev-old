'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function ArchitectureDocsPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              System Architecture
            </h1>
            <p className="text-lg text-gray-600">
              High-level architecture, design patterns, and conventions used across platzer.dev
            </p>
          </div>

          <div className="space-y-8">
            {/* Tech Stack */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Stack</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Frontend</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Framework:</strong> Next.js 15.0.3 (App Router)</li>
                    <li>• <strong>UI Library:</strong> React 19 RC</li>
                    <li>• <strong>Language:</strong> TypeScript 5.7.2</li>
                    <li>• <strong>Styling:</strong> Tailwind CSS v4.0.0</li>
                    <li>• <strong>Components:</strong> Headless UI v2.2.0</li>
                    <li>• <strong>Package Manager:</strong> pnpm</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Backend</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>API:</strong> Next.js API Routes (serverless)</li>
                    <li>• <strong>Storage:</strong> JSON files (MVP)</li>
                    <li>• <strong>Future:</strong> PostgreSQL + Prisma</li>
                    <li>• <strong>External:</strong> Python FastAPI (ETF data)</li>
                    <li>• <strong>Auth:</strong> Simple password + WorkOS (planned)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Project Structure */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Structure</h2>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-6 font-mono text-sm overflow-x-auto">
                <pre>{`src/
├── app/
│   ├── api/              # API routes
│   │   ├── instructions/ # Instruction management
│   │   ├── wishlist/     # Wishlist CRUD
│   │   └── auth/         # Authentication
│   ├── [feature]/        # Feature pages
│   ├── docs/            # Documentation
│   │   └── tech/        # Technical docs (protected)
│   ├── admin/           # Admin interfaces
│   ├── components/      # Page-specific components
│   ├── types/          # TypeScript definitions
│   ├── utils/          # Utility functions
│   ├── seed/           # Seed/static data
│   └── hooks/          # Custom React hooks
├── components/         # Shared UI components
├── lib/               # Libraries & utilities
└── ...

data/                  # JSON data files
├── instructions.json
└── wishlist.json

docs/                 # Markdown documentation
transcripts/         # Implementation transcripts`}</pre>
              </div>
            </section>

            {/* Architecture Patterns */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Architecture Patterns</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">API Route Pattern</h3>
                  <div className="bg-gray-50 border-l-4 border-blue-500 p-4">
                    <p className="text-gray-700 mb-2">Standard structure for all API endpoints:</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Import Next.js types and utilities</li>
                      <li>• Define data file path constants</li>
                      <li>• Implement read/write helpers</li>
                      <li>• Export HTTP method handlers (GET, POST, PATCH, DELETE)</li>
                      <li>• Consistent error handling and response format</li>
                      <li>• TypeScript types for all data structures</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Component Pattern</h3>
                  <div className="bg-gray-50 border-l-4 border-green-500 p-4">
                    <p className="text-gray-700 mb-2">Functional components with hooks:</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• Use &apos;use client&apos; directive for client components</li>
                      <li>• State management with useState/useEffect</li>
                      <li>• Loading, error, and data states</li>
                      <li>• Optimistic UI updates where appropriate</li>
                      <li>• Type-safe props and state</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Storage Pattern</h3>
                  <div className="bg-gray-50 border-l-4 border-purple-500 p-4">
                    <p className="text-gray-700 mb-2">JSON for MVP, database for scale:</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• JSON files in /data/ directory</li>
                      <li>• File-based storage for &lt;1000 items</li>
                      <li>• API interface stays same during migration</li>
                      <li>• Database adapter pattern for future</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Design Decisions */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Design Decisions</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'ADR-001: JSON File Storage',
                    decision: 'Use JSON files instead of database for MVP',
                    rationale: 'Simple, version-controllable, zero cost, sufficient for expected scale',
                    impact: 'Fast development, easy deployment, migration path documented'
                  },
                  {
                    title: 'ADR-002: Optimistic UI Updates',
                    decision: 'Update UI immediately before API confirmation',
                    rationale: 'Better perceived performance, modern UX pattern',
                    impact: 'Snappy interface, requires rollback on errors'
                  },
                  {
                    title: 'ADR-003: TypeScript Throughout',
                    decision: 'Strict TypeScript for all code',
                    rationale: 'Compile-time safety, better IDE support, fewer runtime errors',
                    impact: 'Slightly slower development, much better maintainability'
                  }
                ].map((adr, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{adr.title}</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Decision:</strong> <span className="text-gray-700">{adr.decision}</span></p>
                      <p><strong>Rationale:</strong> <span className="text-gray-700">{adr.rationale}</span></p>
                      <p><strong>Impact:</strong> <span className="text-gray-700">{adr.impact}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Scalability */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Scalability Considerations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Current Limits</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• JSON files: ~1000 items</li>
                    <li>• No concurrent write protection</li>
                    <li>• Single-instance only</li>
                    <li>• No built-in caching</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Migration Path</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• PostgreSQL + Prisma ORM</li>
                    <li>• Redis for caching</li>
                    <li>• Multi-tenant support</li>
                    <li>• API versioning</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
