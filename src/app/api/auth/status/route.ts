import { NextResponse } from 'next/server';
import { getAuthStatus } from '@/lib/auth';

export async function GET() {
  try {
    const status = await getAuthStatus();
    return NextResponse.json(status);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to get auth status', details: message },
      { status: 500 }
    );
  }
}
