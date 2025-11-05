import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { WishlistData, WishlistItem } from '@/app/types/wishlist';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'wishlist.json');

/**
 * Read wishlist data from JSON file
 */
async function readWishlistData(): Promise<WishlistData> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent) as WishlistData;
  } catch (error) {
    // If file doesn't exist or is invalid, return empty structure
    console.error('Error reading wishlist data:', error);
    return { items: [] };
  }
}

/**
 * Write wishlist data to JSON file
 */
async function writeWishlistData(data: WishlistData): Promise<void> {
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing wishlist data:', error);
    throw new Error('Failed to write wishlist data');
  }
}

/**
 * GET /api/wishlist
 * Returns all wishlist items
 */
export async function GET() {
  try {
    const data = await readWishlistData();
    return NextResponse.json(data.items, { status: 200 });
  } catch (error) {
    console.error('GET /api/wishlist error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist items' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/wishlist
 * Creates a new wishlist item
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.productUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, productUrl' },
        { status: 400 }
      );
    }

    // Read current data
    const data = await readWishlistData();

    // Create new wishlist item
    const newItem: WishlistItem = {
      id: uuidv4(),
      title: body.title,
      description: body.description,
      productUrl: body.productUrl,
      geizhalsUrl: body.geizhalsUrl || undefined,
      idealoUrl: body.idealoUrl || undefined,
      imageUrl: body.imageUrl || undefined,
      isGifted: body.isGifted || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to items array
    data.items.push(newItem);

    // Write back to file
    await writeWishlistData(data);

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('POST /api/wishlist error:', error);
    return NextResponse.json(
      { error: 'Failed to create wishlist item' },
      { status: 500 }
    );
  }
}
