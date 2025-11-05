'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function DataStorageDocsPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Data Storage & Models</h1>
            <p className="text-lg text-gray-600">
              Data structures, storage strategies, and migration paths
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Storage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Instructions</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>File:</strong> <code>/data/instructions.json</code>
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Size:</strong> ~1,500 lines capacity
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Features:</strong> Version history, metadata, source tracking
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Wishlist</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>File:</strong> <code>/data/wishlist.json</code>
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Size:</strong> ~100 items capacity
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Features:</strong> Images, prices, gifted status
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Migration Path</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                <p className="text-sm text-gray-700">
                  When ready to scale (&gt;500 instructions or &gt;50 concurrent users), migrate to PostgreSQL.
                </p>
              </div>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Step 1: Schema Design</h3>
                  <p className="text-sm text-gray-600">Create tables matching TypeScript interfaces</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Step 2: Migration Script</h3>
                  <p className="text-sm text-gray-600">Convert JSON to database records</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Step 3: Update API</h3>
                  <p className="text-sm text-gray-600">Swap storage backend, keep interface unchanged</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
