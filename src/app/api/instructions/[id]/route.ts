import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  InstructionCollection,
  InstructionVersion,
} from '@/app/types/instructions';

const DATA_FILE = path.join(process.cwd(), 'data', 'instructions.json');

async function readInstructions(): Promise<InstructionCollection> {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

async function writeInstructions(data: InstructionCollection): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readInstructions();
    const instruction = data.instructions.find((i) => i.id === id);

    if (!instruction) {
      return NextResponse.json(
        { error: 'Instruction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(instruction);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch instruction', details: message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await readInstructions();
    const instructionIndex = data.instructions.findIndex((i) => i.id === id);

    if (instructionIndex === -1) {
      return NextResponse.json(
        { error: 'Instruction not found' },
        { status: 404 }
      );
    }

    const instruction = data.instructions[instructionIndex];
    const now = new Date().toISOString();

    if (body.createVersion) {
      const versionId = uuidv4();
      const newVersion: InstructionVersion = {
        versionId,
        instructionId: instruction.id,
        version: instruction.currentVersion + 1,
        title: body.title || instruction.title,
        description: body.description,
        category: body.category || instruction.category,
        priority: body.priority || instruction.priority,
        status: body.status || instruction.status,
        source: body.source,
        metadata: body.metadata || instruction.versions[instruction.versions.length - 1].metadata,
        content: body.content || '',
        createdAt: now,
        createdBy: body.createdBy || 'system',
        changes: body.changes || 'Updated version',
      };

      instruction.versions.push(newVersion);
      instruction.currentVersion = newVersion.version;
      instruction.latestVersionId = versionId;
      instruction.updatedAt = now;

      if (body.title) instruction.title = body.title;
      if (body.category) instruction.category = body.category;
      if (body.priority) instruction.priority = body.priority;
      if (body.status) instruction.status = body.status;
    } else {
      if (body.status !== undefined) instruction.status = body.status;
      if (body.priority !== undefined) instruction.priority = body.priority;
      if (body.category !== undefined) instruction.category = body.category;
      if (body.title !== undefined) instruction.title = body.title;
      instruction.updatedAt = now;
    }

    data.metadata.lastUpdated = now;
    await writeInstructions(data);

    return NextResponse.json(instruction);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to update instruction', details: message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readInstructions();
    const instructionIndex = data.instructions.findIndex((i) => i.id === id);

    if (instructionIndex === -1) {
      return NextResponse.json(
        { error: 'Instruction not found' },
        { status: 404 }
      );
    }

    data.instructions.splice(instructionIndex, 1);
    data.metadata.totalInstructions = data.instructions.length;
    data.metadata.lastUpdated = new Date().toISOString();

    await writeInstructions(data);

    return NextResponse.json({ message: 'Instruction deleted successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to delete instruction', details: message },
      { status: 500 }
    );
  }
}
