# Wishlist Feature

## Overview
A wishlist page where you can add items you want, and visitors can mark items as fulfilled. The state is persisted in SurrealDB.

## Features
- Display wishlist items with title, description, and images
- Links to original product page and price comparison sites (Idealo, Geizhals)
- Mark items as fulfilled/unfulfilled (toggleable by any visitor)
- Responsive grid layout
- Visual indication of fulfilled items (grayed out, strike-through)

## Files Created
1. **`src/app/utils/wishlistDb.ts`** - Database utilities for wishlist operations
2. **`src/app/api/wishlist/route.ts`** - GET endpoint to fetch all wishlist items
3. **`src/app/api/wishlist/[id]/route.ts`** - PATCH endpoint to update item status
4. **`src/app/tools/wishlist/page.tsx`** - Main wishlist page UI
5. **`src/app/seed/wishlist_data.ts`** - Template data for seeding wishlist items

## Usage

### Accessing the Wishlist
Navigate to `/tools/wishlist` or update your navigation to link to it.

### Adding New Items
You can add items in two ways:

#### 1. Using the Seed Script
Edit `src/app/seed/wishlist_data.ts` and add your items to the array:

```typescript
{
    title: "Your Product Name",
    description: "Short description of the product",
    link: "https://seller-link.com/product",
    idealoLink: "https://www.idealo.de/...",
    geizhalsLink: "https://geizhals.de/...",
    imageUrl: "https://example.com/image.jpg",
    fulfilled: false
}
```

Then run: `npx tsx src/app/seed/wishlist_data.ts`

#### 2. Programmatically
```typescript
import { createWishlistItem } from '@/app/utils/wishlistDb';

await createWishlistItem({
    title: "Product Name",
    description: "Description",
    link: "https://...",
    idealoLink: "https://www.idealo.de/...",
    geizhalsLink: "https://geizhals.de/...",
    imageUrl: "https://...",
    fulfilled: false
});
```

### Marking Items as Fulfilled
Any visitor can click the circle icon next to an item title to toggle its fulfilled status. Fulfilled items will:
- Show a green checkmark
- Have a strike-through title
- Appear with reduced opacity

## Database Schema
The wishlist items are stored in SurrealDB with the following structure:

```typescript
{
    id: string;
    title: string;
    description: string;
    link: string;
    idealoLink?: string;
    geizhalsLink?: string;
    imageUrl?: string;
    fulfilled: boolean;
    createdAt: string;
}
```

## API Endpoints

### GET /api/wishlist
Fetches all wishlist items ordered by creation date (newest first).

### PATCH /api/wishlist/[id]
Updates the fulfilled status of a specific item.

**Body:**
```json
{
    "fulfilled": true
}
```

## Notes
- Image URLs should be publicly accessible
- The feature uses react-icons for UI icons (already in dependencies)
- All links open in new tabs
- The database connection is reused across requests for performance
