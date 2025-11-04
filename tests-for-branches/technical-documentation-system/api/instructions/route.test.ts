/**
 * Instructions API Route Tests
 * Tests for GET and POST endpoints of the instructions API
 *
 * TO USE: Copy this file to src/app/api/instructions/__tests__/route.test.ts in the
 * feature/technical-documentation-system branch
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '../route';
import { promises as fs } from 'fs';
import { InstructionCollection, Instruction } from '@/app/types/instructions';

// Mock fs module
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

// Mock uuid
jest.mock('uuid', () => ({
  v4: jest.fn()
    .mockReturnValueOnce('instruction-uuid')
    .mockReturnValueOnce('version-uuid')
    .mockReturnValue('mock-uuid'),
}));

describe('Instructions API Routes', () => {
  const mockInstructionsData: InstructionCollection = {
    metadata: {
      version: '1.0.0',
      lastUpdated: '2025-01-01T00:00:00.000Z',
      totalInstructions: 2,
      branches: ['main', 'feature/test'],
      commits: ['abc123', 'def456'],
    },
    instructions: [
      {
        id: 'instr-1',
        currentVersion: 1,
        latestVersionId: 'ver-1',
        title: 'Test Instruction 1',
        category: 'feature',
        status: 'active',
        priority: 'high',
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
        versions: [
          {
            versionId: 'ver-1',
            instructionId: 'instr-1',
            version: 1,
            title: 'Test Instruction 1',
            description: 'Test description',
            category: 'feature',
            priority: 'high',
            status: 'active',
            source: {
              branch: 'main',
              commit: 'abc123',
            },
            metadata: {
              tags: ['test', 'feature'],
              relatedFiles: [],
              relatedInstructions: [],
            },
            content: 'Test content',
            createdAt: '2025-01-01T00:00:00.000Z',
            createdBy: 'user1',
            changes: 'Initial version',
          },
        ],
      },
      {
        id: 'instr-2',
        currentVersion: 1,
        latestVersionId: 'ver-2',
        title: 'Test Instruction 2',
        category: 'bug-fix',
        status: 'completed',
        priority: 'medium',
        createdAt: '2025-01-02T00:00:00.000Z',
        updatedAt: '2025-01-02T00:00:00.000Z',
        versions: [
          {
            versionId: 'ver-2',
            instructionId: 'instr-2',
            version: 1,
            title: 'Test Instruction 2',
            description: 'Bug fix description',
            category: 'bug-fix',
            priority: 'medium',
            status: 'completed',
            source: {
              branch: 'feature/test',
              commit: 'def456',
            },
            metadata: {
              tags: ['bug', 'fix'],
              relatedFiles: ['file.ts'],
              relatedInstructions: [],
            },
            content: 'Fix content',
            createdAt: '2025-01-02T00:00:00.000Z',
            createdBy: 'user2',
            changes: 'Initial version',
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('GET /api/instructions', () => {
    it('should return all instructions', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockInstructionsData)
      );

      const request = new NextRequest('http://localhost:3000/api/instructions');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.instructions).toHaveLength(2);
      expect(data.count).toBe(2);
      expect(data.metadata).toEqual(mockInstructionsData.metadata);
    });

    it('should return stats when stats=true', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockInstructionsData)
      );

      const request = new NextRequest(
        'http://localhost:3000/api/instructions?stats=true'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('total', 2);
      expect(data).toHaveProperty('byCategory');
      expect(data).toHaveProperty('byStatus');
      expect(data).toHaveProperty('byPriority');
      expect(data).toHaveProperty('completionRate', 50);
    });

    it('should filter by category', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockInstructionsData)
      );

      const request = new NextRequest(
        'http://localhost:3000/api/instructions?category=feature'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.instructions).toHaveLength(1);
      expect(data.instructions[0].category).toBe('feature');
    });

    it('should filter by status', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockInstructionsData)
      );

      const request = new NextRequest(
        'http://localhost:3000/api/instructions?status=completed'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.instructions).toHaveLength(1);
      expect(data.instructions[0].status).toBe('completed');
    });

    it('should filter by priority', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockInstructionsData)
      );

      const request = new NextRequest(
        'http://localhost:3000/api/instructions?priority=high'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.instructions).toHaveLength(1);
      expect(data.instructions[0].priority).toBe('high');
    });

    it('should filter by search term', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockInstructionsData)
      );

      const request = new NextRequest(
        'http://localhost:3000/api/instructions?search=bug'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.instructions).toHaveLength(1);
      expect(data.instructions[0].title).toContain('2');
    });

    it('should filter by tags', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockInstructionsData)
      );

      const request = new NextRequest(
        'http://localhost:3000/api/instructions?tags=test'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.instructions).toHaveLength(1);
    });

    it('should filter by branch', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockInstructionsData)
      );

      const request = new NextRequest(
        'http://localhost:3000/api/instructions?branch=main'
      );
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.instructions).toHaveLength(1);
      expect(data.instructions[0].versions[0].source.branch).toBe('main');
    });

    it('should return empty collection when file does not exist', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(
        new Error('ENOENT: no such file or directory')
      );

      const request = new NextRequest('http://localhost:3000/api/instructions');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.instructions).toEqual([]);
      expect(data.metadata.totalInstructions).toBe(0);
    });
  });

  describe('POST /api/instructions', () => {
    it('should create a new instruction', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify({
          metadata: {
            version: '1.0.0',
            lastUpdated: '2025-01-01T00:00:00.000Z',
            totalInstructions: 0,
            branches: [],
            commits: [],
          },
          instructions: [],
        })
      );
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const request = new NextRequest('http://localhost:3000/api/instructions', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Instruction',
          description: 'New instruction description',
          category: 'feature',
          priority: 'high',
          status: 'pending',
          source: {
            branch: 'feature/new',
            commit: 'xyz789',
          },
          content: 'Instruction content',
          createdBy: 'test-user',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toMatchObject({
        id: 'instruction-uuid',
        title: 'New Instruction',
        category: 'feature',
        status: 'pending',
        priority: 'high',
        currentVersion: 1,
      });
      expect(data.versions).toHaveLength(1);
      expect(data.versions[0]).toMatchObject({
        versionId: 'version-uuid',
        title: 'New Instruction',
        description: 'New instruction description',
        content: 'Instruction content',
        createdBy: 'test-user',
      });

      // Verify writeFile was called
      expect(fs.writeFile).toHaveBeenCalled();
      const writeCall = (fs.writeFile as jest.Mock).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      expect(writtenData.instructions).toHaveLength(1);
      expect(writtenData.metadata.branches).toContain('feature/new');
      expect(writtenData.metadata.commits).toContain('xyz789');
    });

    it('should set default status to pending if not provided', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify({
          metadata: {
            version: '1.0.0',
            lastUpdated: '2025-01-01T00:00:00.000Z',
            totalInstructions: 0,
            branches: [],
            commits: [],
          },
          instructions: [],
        })
      );
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const request = new NextRequest('http://localhost:3000/api/instructions', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Instruction',
          description: 'Description',
          category: 'feature',
          priority: 'low',
          source: {
            branch: 'test',
            commit: 'abc',
          },
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.status).toBe('pending');
    });

    it('should handle file write errors', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify({
          metadata: {
            version: '1.0.0',
            lastUpdated: '2025-01-01T00:00:00.000Z',
            totalInstructions: 0,
            branches: [],
            commits: [],
          },
          instructions: [],
        })
      );
      (fs.writeFile as jest.Mock).mockRejectedValue(
        new Error('Write permission denied')
      );

      const request = new NextRequest('http://localhost:3000/api/instructions', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Instruction',
          description: 'Description',
          category: 'feature',
          priority: 'high',
          source: { branch: 'test', commit: 'abc' },
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('Failed to create instruction');
    });
  });
});
