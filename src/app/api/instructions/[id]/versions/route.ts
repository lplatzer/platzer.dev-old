import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { InstructionCollection } from '@/app/types/instructions';

const DATA_FILE = path.join(process.cwd(), 'data', 'instructions.json');

async function readInstructions(): Promise<InstructionCollection> {
  const data = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(data);
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

    return NextResponse.json({
      instructionId: instruction.id,
      currentVersion: instruction.currentVersion,
      totalVersions: instruction.versions.length,
      versions: instruction.versions,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch versions', details: message },
      { status: 500 }
    );
  }
}
