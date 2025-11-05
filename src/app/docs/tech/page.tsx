'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TechnicalDocsPage() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Technical Documentation
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Comprehensive technical reference for platzer.dev
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Overview */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📚 Documentation Index
            </h2>
            <p className="text-gray-600 mb-6">
              Access detailed technical documentation for all systems and features
              implemented in platzer.dev. This documentation is password-protected
              and intended for developers and technical staff.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="text-blue-600 text-sm font-semibold mb-1">
                  PROTECTED CONTENT
                </div>
                <div className="text-sm text-gray-700">
                  All documentation on this section requires authentication
                </div>
              </div>
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="text-green-600 text-sm font-semibold mb-1">
                  VERSION CONTROLLED
                </div>
                <div className="text-sm text-gray-700">
                  Documentation synced with codebase versions
                </div>
              </div>
            </div>
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Instruction System */}
            <Link
              href="/docs/tech/instruction-system"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  Instruction Management System
                </h3>
                <span className="text-blue-600">→</span>
              </div>
              <p className="text-gray-600 mb-4">
                Complete guide to the instruction versioning and tracking system,
                including API reference, data models, and usage examples.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  API
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                  Versioning
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  TypeScript
                </span>
              </div>
            </Link>

            {/* Architecture Overview */}
            <Link
              href="/docs/tech/architecture"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  System Architecture
                </h3>
                <span className="text-blue-600">→</span>
              </div>
              <p className="text-gray-600 mb-4">
                High-level architecture overview, design decisions, patterns, and
                conventions used across the entire codebase.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                  Architecture
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                  Patterns
                </span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                  ADRs
                </span>
              </div>
            </Link>

            {/* API Reference */}
            <Link
              href="/docs/tech/api-reference"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  API Reference
                </h3>
                <span className="text-blue-600">→</span>
              </div>
              <p className="text-gray-600 mb-4">
                Complete API documentation for all endpoints including instructions,
                wishlist, authentication, and external integrations.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  REST API
                </span>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                  Endpoints
                </span>
                <span className="px-2 py-1 bg-cyan-100 text-cyan-800 text-xs rounded">
                  Examples
                </span>
              </div>
            </Link>

            {/* Database & Storage */}
            <Link
              href="/docs/tech/data-storage"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  Data Storage & Models
                </h3>
                <span className="text-blue-600">→</span>
              </div>
              <p className="text-gray-600 mb-4">
                Data models, storage strategies, JSON structures, and database
                migration paths for all features.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Data Models
                </span>
                <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded">
                  Storage
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded">
                  Migration
                </span>
              </div>
            </Link>

            {/* Development Guide */}
            <Link
              href="/docs/tech/development-guide"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  Development Guide
                </h3>
                <span className="text-blue-600">→</span>
              </div>
              <p className="text-gray-600 mb-4">
                Setup instructions, coding conventions, testing strategies, and
                deployment procedures for developers.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                  Setup
                </span>
                <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded">
                  Conventions
                </span>
                <span className="px-2 py-1 bg-rose-100 text-rose-800 text-xs rounded">
                  Testing
                </span>
              </div>
            </Link>

            {/* Implementation Summary */}
            <Link
              href="/docs/tech/implementation-summary"
              className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-900">
                  Implementation Summary
                </h3>
                <span className="text-blue-600">→</span>
              </div>
              <p className="text-gray-600 mb-4">
                Comprehensive summary of the instruction management system
                implementation, including all files created and features built.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
                  Overview
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-800 text-xs rounded">
                  Summary
                </span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-800 text-xs rounded">
                  Status
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              📖 Quick Reference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/INSTRUCTIONS_SYNTHESIS.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                📄 Instructions Synthesis →
              </a>
              <a
                href="/INSTRUCTION_SYSTEM_README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                📘 System README →
              </a>
              <a
                href="/QUICK_REFERENCE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ⚡ Quick Reference →
              </a>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Technical documentation is regularly updated and version-controlled.
            </p>
            <p className="mt-1">
              Last updated: November 4, 2025 • Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
