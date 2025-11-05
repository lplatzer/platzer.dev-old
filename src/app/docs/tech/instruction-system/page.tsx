'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function InstructionSystemDocsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/docs/tech" className="text-blue-600 hover:text-blue-800">
              ← Back to Technical Docs
            </Link>
          </div>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Instruction Management System
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              A comprehensive versioning and tracking system for all implementation
              instructions, architecture decisions, and development patterns.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                ✅ Production Ready
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Version 1.0.0
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                11 Files Created
              </span>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              📑 Table of Contents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <a href="#overview" className="text-blue-600 hover:text-blue-800">
                1. System Overview
              </a>
              <a href="#architecture" className="text-blue-600 hover:text-blue-800">
                2. Architecture
              </a>
              <a href="#data-models" className="text-blue-600 hover:text-blue-800">
                3. Data Models
              </a>
              <a href="#api" className="text-blue-600 hover:text-blue-800">
                4. API Endpoints
              </a>
              <a href="#ui" className="text-blue-600 hover:text-blue-800">
                5. User Interface
              </a>
              <a href="#usage" className="text-blue-600 hover:text-blue-800">
                6. Usage Examples
              </a>
              <a href="#features" className="text-blue-600 hover:text-blue-800">
                7. Key Features
              </a>
              <a href="#files" className="text-blue-600 hover:text-blue-800">
                8. Files Created
              </a>
            </div>
          </div>

          <div className="space-y-8">
            {/* System Overview */}
            <section id="overview" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. System Overview
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  The Instruction Management System provides a comprehensive solution
                  for tracking all implementation instructions, architecture decisions,
                  and development patterns across the platzer.dev codebase.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  Purpose
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <strong>Full History:</strong> Never lose context of why decisions
                    were made
                  </li>
                  <li>
                    <strong>Traceability:</strong> Link instructions to branches,
                    commits, conversations
                  </li>
                  <li>
                    <strong>Searchability:</strong> Find relevant instructions by
                    category, tags, content
                  </li>
                  <li>
                    <strong>Versioning:</strong> Track how instructions evolve over
                    time
                  </li>
                  <li>
                    <strong>Statistics:</strong> Monitor completion rates, effort
                    estimates
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  What Was Synthesized
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 my-4">
                  <p className="text-gray-700 mb-2">
                    <strong>Branches Analyzed:</strong>
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>
                      <strong>main:</strong> Production baseline, Tailwind CSS setup
                    </li>
                    <li>
                      <strong>dev:</strong> ETF tracker, Coffee tools, WorkOS auth,
                      Documentation system
                    </li>
                    <li>
                      <strong>claude/wishlist-*:</strong> Digital wishlist feature with
                      comprehensive transcripts
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Architecture */}
            <section id="architecture" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. System Architecture
              </h2>
              <div className="prose max-w-none">
                <div className="bg-gray-900 text-gray-100 rounded-lg p-6 font-mono text-sm overflow-x-auto my-4">
                  <pre>{`Instruction System
├── Types (/src/app/types/instructions.ts)
│   ├── Instruction
│   ├── InstructionVersion
│   ├── InstructionSource
│   ├── InstructionMetadata
│   ├── InstructionFilter
│   └── InstructionStats
├── Storage (/data/instructions.json)
│   └── InstructionCollection
├── API Routes
│   ├── /api/instructions (GET, POST)
│   ├── /api/instructions/[id] (GET, PATCH, DELETE)
│   └── /api/instructions/[id]/versions (GET)
├── UI (/admin/instructions)
│   ├── Dashboard with statistics
│   ├── Search and filtering
│   ├── Instruction list view
│   └── Detail view with version history
└── Documentation
    ├── INSTRUCTIONS_SYNTHESIS.md (770 lines)
    ├── INSTRUCTION_SYSTEM_README.md (616 lines)
    ├── IMPLEMENTATION_SUMMARY.md (405 lines)
    └── QUICK_REFERENCE.md`}</pre>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                  Components
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      📦 Data Layer
                    </h4>
                    <p className="text-sm text-gray-600">
                      TypeScript types, JSON storage, version history tracking
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      🔌 API Layer
                    </h4>
                    <p className="text-sm text-gray-600">
                      RESTful endpoints, CRUD operations, filtering, statistics
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      🎨 UI Layer
                    </h4>
                    <p className="text-sm text-gray-600">
                      Dashboard, search, filters, version history viewer
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      📚 Documentation
                    </h4>
                    <p className="text-sm text-gray-600">
                      Comprehensive guides, API reference, quick reference cards
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Models */}
            <section id="data-models" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Data Models
              </h2>
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Instruction
                </h3>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6">
                  <pre>{`interface Instruction {
  id: string;                    // UUID
  currentVersion: number;        // Latest version number
  latestVersionId: string;       // UUID of latest version
  title: string;
  category: InstructionCategory;
  status: InstructionStatus;
  priority: InstructionPriority;
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
  versions: InstructionVersion[];
  synthesizedFrom?: string[];    // Source instruction IDs
}`}</pre>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  InstructionVersion
                </h3>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-6">
                  <pre>{`interface InstructionVersion {
  versionId: string;
  instructionId: string;
  version: number;
  title: string;
  description: string;
  category: InstructionCategory;
  priority: InstructionPriority;
  status: InstructionStatus;
  source: InstructionSource;
  metadata: InstructionMetadata;
  content: string;
  createdAt: string;
  createdBy: string;
  changes?: string;
}`}</pre>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Categories & Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      📋 Categories (11)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['feature', 'bugfix', 'refactor', 'documentation', 'configuration', 
                        'dependency', 'security', 'performance', 'ui-ux', 'api', 'testing'].map(cat => (
                        <span key={cat} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      📊 Status Types (5)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {['pending', 'in-progress', 'completed', 'deprecated', 'superseded'].map(status => (
                        <span key={status} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {status}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Continue in next message due to length... */}
            <section id="api" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. API Endpoints
              </h2>
              <div className="prose max-w-none">
                <div className="space-y-4">
                  {/* GET /api/instructions */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      GET /api/instructions
                    </h3>
                    <p className="text-gray-700 mb-2">List and filter instructions</p>
                    <div className="bg-gray-50 rounded p-3">
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Query Parameters:</strong>
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1 ml-4">
                        <li>• <code>category</code> - Filter by category</li>
                        <li>• <code>status</code> - Filter by status</li>
                        <li>• <code>priority</code> - Filter by priority</li>
                        <li>• <code>tags</code> - Filter by tags</li>
                        <li>• <code>search</code> - Full-text search</li>
                        <li>• <code>branch</code> - Filter by source branch</li>
                        <li>• <code>stats=true</code> - Get statistics</li>
                      </ul>
                    </div>
                  </div>

                  {/* POST /api/instructions */}
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      POST /api/instructions
                    </h3>
                    <p className="text-gray-700 mb-2">Create new instruction</p>
                    <div className="bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono overflow-x-auto">
                      <pre>{`{
  "title": "Instruction title",
  "description": "What needs to be done",
  "category": "feature",
  "priority": "high",
  "status": "pending",
  "source": {
    "type": "branch",
    "branch": "feature/new",
    "author": "developer",
    "timestamp": "2025-11-04T12:00:00Z"
  },
  "metadata": {
    "tags": ["tag1", "tag2"],
    "relatedFiles": ["/path/to/file.ts"]
  }
}`}</pre>
                    </div>
                  </div>

                  {/* PATCH /api/instructions/[id] */}
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      PATCH /api/instructions/[id]
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Update instruction (creates new version if requested)
                    </p>
                    <div className="bg-gray-900 text-gray-100 rounded p-3 text-xs font-mono overflow-x-auto">
                      <pre>{`{
  "createVersion": true,
  "status": "completed",
  "changes": "What changed in this version"
}`}</pre>
                    </div>
                  </div>

                  {/* Other endpoints */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded p-3">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        GET /api/instructions/[id]
                      </h4>
                      <p className="text-xs text-gray-600">
                        Get single instruction with all versions
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded p-3">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        DELETE /api/instructions/[id]
                      </h4>
                      <p className="text-xs text-gray-600">
                        Delete instruction permanently
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded p-3 md:col-span-2">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">
                        GET /api/instructions/[id]/versions
                      </h4>
                      <p className="text-xs text-gray-600">
                        Get complete version history for instruction
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Links */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                📖 Additional Resources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link
                  href="/admin/instructions"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  → Live Dashboard
                </Link>
                <Link
                  href="/docs/tech/api-reference"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  → Complete API Reference
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
