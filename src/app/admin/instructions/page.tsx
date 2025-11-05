'use client';

import { useState, useEffect } from 'react';
import {
  Instruction,
  InstructionStats,
  InstructionFilter,
  InstructionCategory,
  InstructionStatus,
  InstructionPriority,
} from '@/app/types/instructions';

const CATEGORIES: InstructionCategory[] = [
  'feature',
  'bugfix',
  'refactor',
  'documentation',
  'configuration',
  'dependency',
  'security',
  'performance',
  'ui-ux',
  'api',
  'testing',
];

const STATUSES: InstructionStatus[] = [
  'pending',
  'in-progress',
  'completed',
  'deprecated',
  'superseded',
];

const PRIORITIES: InstructionPriority[] = ['low', 'medium', 'high', 'critical'];

export default function InstructionsPage() {
  const [instructions, setInstructions] = useState<Instruction[]>([]);
  const [stats, setStats] = useState<InstructionStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<InstructionFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstruction, setSelectedInstruction] = useState<Instruction | null>(null);

  useEffect(() => {
    fetchInstructions();
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function fetchInstructions() {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (filter.category?.length) params.set('category', filter.category.join(','));
      if (filter.status?.length) params.set('status', filter.status.join(','));
      if (filter.priority?.length) params.set('priority', filter.priority.join(','));
      if (filter.searchTerm) params.set('search', filter.searchTerm);
      if (filter.branch) params.set('branch', filter.branch);

      const response = await fetch(`/api/instructions?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch instructions');
      }

      setInstructions(data.instructions || []);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const response = await fetch('/api/instructions?stats=true');
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setFilter({ ...filter, searchTerm });
  }

  function toggleFilter<T extends keyof InstructionFilter>(
    key: T,
    value: string
  ) {
    const current = (filter[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setFilter({ ...filter, [key]: updated.length > 0 ? updated : undefined });
  }

  function clearFilters() {
    setFilter({});
    setSearchTerm('');
  }

  const getCategoryColor = (category: InstructionCategory) => {
    const colors: Record<InstructionCategory, string> = {
      feature: 'bg-blue-100 text-blue-800',
      bugfix: 'bg-red-100 text-red-800',
      refactor: 'bg-purple-100 text-purple-800',
      documentation: 'bg-gray-100 text-gray-800',
      configuration: 'bg-yellow-100 text-yellow-800',
      dependency: 'bg-orange-100 text-orange-800',
      security: 'bg-red-100 text-red-900',
      performance: 'bg-green-100 text-green-800',
      'ui-ux': 'bg-pink-100 text-pink-800',
      api: 'bg-indigo-100 text-indigo-800',
      testing: 'bg-teal-100 text-teal-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: InstructionStatus) => {
    const colors: Record<InstructionStatus, string> = {
      pending: 'bg-gray-200 text-gray-700',
      'in-progress': 'bg-blue-200 text-blue-800',
      completed: 'bg-green-200 text-green-800',
      deprecated: 'bg-red-200 text-red-800',
      superseded: 'bg-orange-200 text-orange-800',
    };
    return colors[status];
  };

  const getPriorityColor = (priority: InstructionPriority) => {
    const colors: Record<InstructionPriority, string> = {
      low: 'text-gray-600',
      medium: 'text-yellow-600',
      high: 'text-orange-600',
      critical: 'text-red-600',
    };
    return colors[priority];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Instruction Management System
          </h1>
          <p className="text-gray-600">
            Track and manage all implementation instructions with full version history
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">Total Instructions</div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">Completed</div>
              <div className="text-2xl font-bold text-green-600">
                {stats.byStatus?.completed || 0}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">In Progress</div>
              <div className="text-2xl font-bold text-blue-600">
                {stats.byStatus?.['in-progress'] || 0}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-600">Completion Rate</div>
              <div className="text-2xl font-bold text-gray-900">
                {stats.completionRate.toFixed(0)}%
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search instructions..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
              <button
                type="button"
                onClick={clearFilters}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Clear
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleFilter('category', category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filter.category?.includes(category)
                        ? getCategoryColor(category)
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((status) => (
                  <button
                    key={status}
                    onClick={() => toggleFilter('status', status)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filter.status?.includes(status)
                        ? getStatusColor(status)
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {PRIORITIES.map((priority) => (
                  <button
                    key={priority}
                    onClick={() => toggleFilter('priority', priority)}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      filter.priority?.includes(priority)
                        ? 'border-current ' + getPriorityColor(priority) + ' bg-opacity-10'
                        : 'border-gray-300 text-gray-600'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading instructions...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <strong>Error:</strong> {error}
          </div>
        ) : instructions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No instructions found</p>
            <p className="text-gray-400 mt-2">
              Try adjusting your filters or add new instructions
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {instructions.map((instruction) => (
              <div
                key={instruction.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedInstruction(instruction)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {instruction.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {instruction.versions[instruction.versions.length - 1]?.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        instruction.status
                      )}`}
                    >
                      {instruction.status}
                    </span>
                    <span
                      className={`text-xs font-semibold ${getPriorityColor(
                        instruction.priority
                      )}`}
                    >
                      {instruction.priority}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span
                    className={`px-2 py-1 rounded ${getCategoryColor(instruction.category)}`}
                  >
                    {instruction.category}
                  </span>
                  <span>v{instruction.currentVersion}</span>
                  <span>
                    Updated: {new Date(instruction.updatedAt).toLocaleDateString()}
                  </span>
                  {instruction.versions[instruction.versions.length - 1]?.source.branch && (
                    <span className="px-2 py-1 bg-gray-100 rounded">
                      {instruction.versions[instruction.versions.length - 1].source.branch}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedInstruction && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedInstruction(null)}
          >
            <div
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedInstruction.title}
                  </h2>
                  <button
                    onClick={() => setSelectedInstruction(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Version History ({selectedInstruction.versions.length} versions)
                    </h3>
                    <div className="space-y-3">
                      {selectedInstruction.versions
                        .slice()
                        .reverse()
                        .map((version) => (
                          <div
                            key={version.versionId}
                            className="border border-gray-200 rounded p-4"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className="font-semibold text-gray-900">
                                v{version.version} - {version.title}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(version.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">
                              {version.description}
                            </p>
                            {version.changes && (
                              <p className="text-gray-600 text-xs italic">
                                Changes: {version.changes}
                              </p>
                            )}
                            {version.metadata.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {version.metadata.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
