import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  Instruction,
  InstructionCollection,
  InstructionFilter,
  InstructionStats,
  InstructionVersion,
  InstructionCategory,
  InstructionStatus,
  InstructionPriority,
} from '@/app/types/instructions';

const DATA_FILE = path.join(process.cwd(), 'data', 'instructions.json');

async function readInstructions(): Promise<InstructionCollection> {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      metadata: {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        totalInstructions: 0,
        branches: [],
        commits: [],
      },
      instructions: [],
    };
  }
}

async function writeInstructions(data: InstructionCollection): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function filterInstructions(
  instructions: Instruction[],
  filter: InstructionFilter
): Instruction[] {
  return instructions.filter((instruction) => {
    if (filter.category && !filter.category.includes(instruction.category)) {
      return false;
    }
    if (filter.status && !filter.status.includes(instruction.status)) {
      return false;
    }
    if (filter.priority && !filter.priority.includes(instruction.priority)) {
      return false;
    }
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      if (
        !instruction.title.toLowerCase().includes(term) &&
        !instruction.versions.some((v) =>
          v.description.toLowerCase().includes(term)
        )
      ) {
        return false;
      }
    }
    if (filter.tags && filter.tags.length > 0) {
      const latestVersion = instruction.versions[instruction.versions.length - 1];
      if (!latestVersion || !filter.tags.some((tag) => latestVersion.metadata.tags.includes(tag))) {
        return false;
      }
    }
    if (filter.branch) {
      if (!instruction.versions.some((v) => v.source.branch === filter.branch)) {
        return false;
      }
    }
    if (filter.dateRange) {
      const updatedAt = new Date(instruction.updatedAt);
      const from = new Date(filter.dateRange.from);
      const to = new Date(filter.dateRange.to);
      if (updatedAt < from || updatedAt > to) {
        return false;
      }
    }
    return true;
  });
}

function calculateStats(instructions: Instruction[]): InstructionStats {
  const stats: InstructionStats = {
    total: instructions.length,
    byCategory: {} as Record<string, number>,
    byStatus: {} as Record<string, number>,
    byPriority: {} as Record<string, number>,
    completionRate: 0,
  };

  let completed = 0;

  instructions.forEach((instruction) => {
    stats.byCategory[instruction.category] = (stats.byCategory[instruction.category] || 0) + 1;
    stats.byStatus[instruction.status] = (stats.byStatus[instruction.status] || 0) + 1;
    stats.byPriority[instruction.priority] = (stats.byPriority[instruction.priority] || 0) + 1;

    if (instruction.status === 'completed') {
      completed++;
    }
  });

  stats.completionRate = instructions.length > 0 ? (completed / instructions.length) * 100 : 0;

  return stats;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const data = await readInstructions();

    const statsParam = searchParams.get('stats');
    if (statsParam === 'true') {
      const stats = calculateStats(data.instructions);
      return NextResponse.json(stats);
    }

    const filter: InstructionFilter = {
      category: searchParams.get('category')?.split(',') as InstructionCategory[] | undefined,
      status: searchParams.get('status')?.split(',') as InstructionStatus[] | undefined,
      priority: searchParams.get('priority')?.split(',') as InstructionPriority[] | undefined,
      tags: searchParams.get('tags')?.split(','),
      searchTerm: searchParams.get('search') || undefined,
      branch: searchParams.get('branch') || undefined,
    };

    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    if (dateFrom && dateTo) {
      filter.dateRange = { from: dateFrom, to: dateTo };
    }

    const filtered = filterInstructions(data.instructions, filter);

    return NextResponse.json({
      metadata: data.metadata,
      instructions: filtered,
      count: filtered.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch instructions', details: message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await readInstructions();

    const now = new Date().toISOString();
    const instructionId = uuidv4();
    const versionId = uuidv4();

    const version: InstructionVersion = {
      versionId,
      instructionId,
      version: 1,
      title: body.title,
      description: body.description,
      category: body.category,
      priority: body.priority,
      status: body.status || 'pending',
      source: body.source,
      metadata: body.metadata || {
        tags: [],
        relatedFiles: [],
        relatedInstructions: [],
      },
      content: body.content || '',
      createdAt: now,
      createdBy: body.createdBy || 'system',
      changes: 'Initial version',
    };

    const instruction: Instruction = {
      id: instructionId,
      currentVersion: 1,
      latestVersionId: versionId,
      title: body.title,
      category: body.category,
      status: body.status || 'pending',
      priority: body.priority,
      createdAt: now,
      updatedAt: now,
      versions: [version],
      synthesizedFrom: body.synthesizedFrom,
    };

    data.instructions.push(instruction);
    data.metadata.totalInstructions = data.instructions.length;
    data.metadata.lastUpdated = now;

    if (body.source.branch && !data.metadata.branches.includes(body.source.branch)) {
      data.metadata.branches.push(body.source.branch);
    }
    if (body.source.commit && !data.metadata.commits.includes(body.source.commit)) {
      data.metadata.commits.push(body.source.commit);
    }

    await writeInstructions(data);

    return NextResponse.json(instruction, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to create instruction', details: message },
      { status: 500 }
    );
  }
}
