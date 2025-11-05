import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { WishlistData } from '@/app/types/wishlist';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'wishlist.json');

/**
 * Read wishlist data from JSON file
 */
async function readWishlistData(): Promise<WishlistData> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent) as WishlistData;
  } catch (error) {
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
 * GET /api/wishlist/[id]
 * Fetches a single wishlist item by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Read current data
    const data = await readWishlistData();

    // Find item
    const item = data.items.find((item) => item.id === id);

    if (!item) {
      return NextResponse.json(
        { error: 'Wishlist item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error('GET /api/wishlist/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch wishlist item' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/wishlist/[id]
 * Updates an existing wishlist item
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Read current data
    const data = await readWishlistData();

    // Find item index
    const itemIndex = data.items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Wishlist item not found' },
        { status: 404 }
      );
    }

    // Update item with provided fields
    const updatedItem = {
      ...data.items[itemIndex],
      ...body,
      id, // Ensure ID cannot be changed
      updatedAt: new Date().toISOString(),
    };

    // Replace item in array
    data.items[itemIndex] = updatedItem;

    // Write back to file
    await writeWishlistData(data);

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error('PATCH /api/wishlist/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to update wishlist item' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/wishlist/[id]
 * Deletes a wishlist item
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Read current data
    const data = await readWishlistData();

    // Find item index
    const itemIndex = data.items.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'Wishlist item not found' },
        { status: 404 }
      );
    }

    // Remove item from array
    const deletedItem = data.items[itemIndex];
    data.items.splice(itemIndex, 1);

    // Write back to file
    await writeWishlistData(data);

    return NextResponse.json(
      { message: 'Wishlist item deleted successfully', item: deletedItem },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/wishlist/[id] error:', error);
    return NextResponse.json(
      { error: 'Failed to delete wishlist item' },
      { status: 500 }
    );
  }
}
