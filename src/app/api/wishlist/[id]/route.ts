import { NextRequest, NextResponse } from 'next/server';
import { updateWishlistItem } from '@/app/utils/wishlistDb';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { fulfilled } = await request.json();
        const { id } = params;
        
        const updatedItem = await updateWishlistItem(id, fulfilled);
        
        if (!updatedItem) {
            return NextResponse.json(
                { error: 'Item not found' },
                { status: 404 }
            );
        }
        
        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error('Error updating wishlist item:', error);
        return NextResponse.json(
            { error: 'Failed to update wishlist item' },
            { status: 500 }
        );
    }
}
