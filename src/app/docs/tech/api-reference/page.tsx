'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function APIReferenceDocsPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">API Reference</h1>
            <p className="text-lg text-gray-600">
              Complete API documentation for all endpoints in platzer.dev
            </p>
          </div>

          <div className="space-y-8">
            {/* Instructions API */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions API</h2>
              <p className="text-gray-600 mb-4">
                Manage instructions with full version history and filtering capabilities.
              </p>

              <div className="space-y-6">
                {/* List Instructions */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      GET
                    </span>
                    <code className="text-sm font-mono">/api/instructions</code>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">List and filter instructions</p>
                  <div className="bg-gray-50 rounded p-3 text-sm">
                    <p className="font-semibold mb-2">Query Parameters:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• <code>category</code> - Comma-separated categories</li>
                      <li>• <code>status</code> - Comma-separated statuses</li>
                      <li>• <code>priority</code> - Comma-separated priorities</li>
                      <li>• <code>tags</code> - Comma-separated tags</li>
                      <li>• <code>search</code> - Full-text search term</li>
                      <li>• <code>branch</code> - Filter by source branch</li>
                      <li>• <code>stats=true</code> - Get statistics instead</li>
                    </ul>
                  </div>
                </div>

                {/* Create Instruction */}
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      POST
                    </span>
                    <code className="text-sm font-mono">/api/instructions</code>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">Create new instruction</p>
                  <div className="bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono overflow-x-auto">
                    <pre>{`curl -X POST http://localhost:3000/api/instructions \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Add user authentication",
    "description": "Implement OAuth",
    "category": "feature",
    "priority": "high",
    "source": {
      "type": "branch",
      "branch": "feature/auth"
    }
  }'`}</pre>
                  </div>
                </div>

                {/* Update Instruction */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                      PATCH
                    </span>
                    <code className="text-sm font-mono">/api/instructions/[id]</code>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">Update instruction (creates version if requested)</p>
                  <div className="bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono overflow-x-auto">
                    <pre>{`curl -X PATCH http://localhost:3000/api/instructions/{id} \\
  -H "Content-Type: application/json" \\
  -d '{
    "createVersion": true,
    "status": "completed",
    "changes": "Implementation finished"
  }'`}</pre>
                  </div>
                </div>

                {/* Other endpoints */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-semibold">
                        GET
                      </span>
                      <code className="text-xs font-mono">/api/instructions/[id]</code>
                    </div>
                    <p className="text-xs text-gray-600">Get single instruction</p>
                  </div>
                  <div className="border border-gray-200 rounded p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-semibold">
                        DELETE
                      </span>
                      <code className="text-xs font-mono">/api/instructions/[id]</code>
                    </div>
                    <p className="text-xs text-gray-600">Delete instruction</p>
                  </div>
                  <div className="border border-gray-200 rounded p-3 md:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-semibold">
                        GET
                      </span>
                      <code className="text-xs font-mono">/api/instructions/[id]/versions</code>
                    </div>
                    <p className="text-xs text-gray-600">Get version history</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Wishlist API */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Wishlist API</h2>
              <p className="text-gray-600 mb-4">
                Manage wishlist items with image scraping and gifted status tracking.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      GET
                    </span>
                    <code className="text-sm font-mono">/api/wishlist</code>
                  </div>
                  <p className="text-xs text-gray-600">List all wishlist items</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      POST
                    </span>
                    <code className="text-sm font-mono">/api/wishlist</code>
                  </div>
                  <p className="text-xs text-gray-600">Create wishlist item</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                      PATCH
                    </span>
                    <code className="text-sm font-mono">/api/wishlist/[id]</code>
                  </div>
                  <p className="text-xs text-gray-600">Update item (e.g., mark as gifted)</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                      DELETE
                    </span>
                    <code className="text-sm font-mono">/api/wishlist/[id]</code>
                  </div>
                  <p className="text-xs text-gray-600">Delete wishlist item</p>
                </div>
              </div>
            </section>

            {/* Authentication API */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication API</h2>
              <p className="text-gray-600 mb-4">
                Simple password-based authentication for technical documentation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                      POST
                    </span>
                    <code className="text-xs font-mono">/api/auth/login</code>
                  </div>
                  <p className="text-xs text-gray-600">Authenticate user</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-semibold">
                      POST
                    </span>
                    <code className="text-xs font-mono">/api/auth/logout</code>
                  </div>
                  <p className="text-xs text-gray-600">Clear session</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                      GET
                    </span>
                    <code className="text-xs font-mono">/api/auth/status</code>
                  </div>
                  <p className="text-xs text-gray-600">Check auth status</p>
                </div>
              </div>
            </section>

            {/* Response Format */}
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Response Format</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Success Response</h3>
                  <div className="bg-gray-900 text-gray-100 rounded p-4 text-sm font-mono">
                    <pre>{`{
  "data": { ... },
  "metadata": { ... }
}`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Response</h3>
                  <div className="bg-gray-900 text-gray-100 rounded p-4 text-sm font-mono">
                    <pre>{`{
  "error": "Human-readable message",
  "details": "Technical details",
  "code": "ERROR_CODE"
}`}</pre>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
