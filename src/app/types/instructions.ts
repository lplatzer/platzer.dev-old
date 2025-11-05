/**
 * Instruction Management System - Type Definitions
 * 
 * This module defines types for a versioning/tracing system that tracks
 * implementation instructions, changes, and history across the codebase.
 */

export type InstructionCategory = 
  | 'feature'
  | 'bugfix'
  | 'refactor'
  | 'documentation'
  | 'configuration'
  | 'dependency'
  | 'security'
  | 'performance'
  | 'ui-ux'
  | 'api'
  | 'testing';

export type InstructionStatus = 
  | 'pending'
  | 'in-progress'
  | 'completed'
  | 'deprecated'
  | 'superseded';

export type InstructionPriority = 'low' | 'medium' | 'high' | 'critical';

export interface InstructionSource {
  type: 'branch' | 'commit' | 'conversation' | 'manual' | 'documentation';
  branch?: string;
  commit?: string;
  conversationId?: string;
  documentPath?: string;
  author?: string;
  timestamp: string;
}

export interface InstructionMetadata {
  tags: string[];
  relatedFiles: string[];
  relatedInstructions: string[];
  estimatedEffort?: string;
  actualEffort?: string;
  dependencies?: string[];
}

export interface InstructionVersion {
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
}

export interface Instruction {
  id: string;
  currentVersion: number;
  latestVersionId: string;
  title: string;
  category: InstructionCategory;
  status: InstructionStatus;
  priority: InstructionPriority;
  createdAt: string;
  updatedAt: string;
  versions: InstructionVersion[];
  synthesizedFrom?: string[];
}

export interface InstructionCollection {
  metadata: {
    version: string;
    lastUpdated: string;
    totalInstructions: number;
    branches: string[];
    commits: string[];
  };
  instructions: Instruction[];
}

export interface InstructionSynthesisResult {
  instruction: Instruction;
  sources: InstructionSource[];
  conflicts?: string[];
  suggestions?: string[];
}

export interface InstructionFilter {
  category?: InstructionCategory[];
  status?: InstructionStatus[];
  priority?: InstructionPriority[];
  tags?: string[];
  searchTerm?: string;
  branch?: string;
  dateRange?: {
    from: string;
    to: string;
  };
}

export interface InstructionStats {
  total: number;
  byCategory: Record<InstructionCategory, number>;
  byStatus: Record<InstructionStatus, number>;
  byPriority: Record<InstructionPriority, number>;
  completionRate: number;
  averageEffort?: string;
}
