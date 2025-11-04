import { NextResponse } from 'next/server';
import { getWishlistItems } from '@/app/utils/wishlistDb';

export async function GET() {
    try {
        const items = await getWishlistItems();
        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        return NextResponse.json(
            { error: 'Failed to fetch wishlist items' },
            { status: 500 }
        );
    }
}
