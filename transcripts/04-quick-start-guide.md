# Digital Wishlist - Quick Start Guide

**Get up and running in 5 minutes!**

---

## For End Users

### Viewing the Wishlist

1. **Navigate to the wishlist page**:
   ```
   https://platzer.dev/tools/digital-wishlist
   ```

2. **Browse wishlist items**:
   - See product images, titles, and descriptions
   - View price comparison links (Geizhals, Idealo)
   - Check which items have been gifted (green border)

3. **Mark an item as gifted**:
   - Click the "Mark as Gifted" button on any item
   - The item will instantly show a green border and "Gifted" badge
   - Everyone viewing the wishlist will see the update

4. **Remove gifted status** (if needed):
   - Click "Mark as Ungifted" on a gifted item
   - The green indicator disappears

### Adding Items to the Wishlist

1. **Click the "+" button** (bottom-right corner)
   - Or navigate to: `https://platzer.dev/tools/digital-wishlist/edit`

2. **Fill in the required fields**:
   - **Title**: Short name of the item (e.g., "Wireless Headphones")
   - **Description**: Why you want it, specifications, etc.
   - **Product URL**: Link to the product page

3. **Add optional information**:
   - **Geizhals URL**: Price comparison link
   - **Idealo URL**: Another price comparison link
   - **Image URL**: Direct link to product image

4. **Auto-fetch image** (optional but recommended):
   - After entering the Product URL, click "Auto-fetch image"
   - The system will automatically find and load the product image
   - If it doesn't work, you can paste an image URL manually

5. **Submit**:
   - Click "Add Item"
   - You'll be redirected back to the wishlist
   - Your new item appears immediately

### Editing Existing Items

1. **Get the item ID**:
   - Currently, you need the item's UUID (future update will add edit buttons)
   - Check the browser console or ask the developer

2. **Navigate to edit page with ID**:
   ```
   https://platzer.dev/tools/digital-wishlist/edit?id=YOUR-ITEM-ID
   ```

3. **Make changes**:
   - Form will be pre-filled with existing data
   - Update any fields you want to change

4. **Save**:
   - Click "Update Item"
   - Changes appear immediately on the wishlist

---

## For Developers

### Initial Setup

**1. Clone and install**:
```bash
git clone https://github.com/lplatzer/platzer.dev.git
cd platzer.dev
pnpm install
```

**2. Start development server**:
```bash
pnpm dev
```

**3. Open in browser**:
```
http://localhost:3000/tools/digital-wishlist
```

**4. Verify it works**:
- You should see an empty wishlist
- Click the "+" button to test adding items

### Project Structure

```
src/app/
├── types/wishlist.ts                    # Data models
├── api/
│   ├── wishlist/route.ts                # List/create items
│   ├── wishlist/[id]/route.ts           # Get/update/delete item
│   └── scrape-image/route.ts            # Auto-fetch images
└── tools/digital-wishlist/
    ├── page.tsx                          # Main display page
    └── edit/page.tsx                     # Add/edit form

data/wishlist.json                        # Data storage
```

### Quick Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Testing
pnpm type-check       # Check TypeScript types
```

### Adding Your First Item (API)

**Using curl**:
```bash
curl -X POST http://localhost:3000/api/wishlist \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Item",
    "description": "This is a test item",
    "productUrl": "https://example.com/product"
  }'
```

**Using JavaScript**:
```javascript
fetch('/api/wishlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Test Item',
    description: 'This is a test item',
    productUrl: 'https://example.com/product',
  }),
})
  .then(res => res.json())
  .then(data => console.log('Created:', data));
```

### Common Tasks

#### Task: Add a Delete Button

**1. Update display page** (`src/app/tools/digital-wishlist/page.tsx`):
```typescript
// Inside the card map
<button
  onClick={() => handleDelete(item.id)}
  className="text-red-600 hover:text-red-800"
>
  Delete
</button>

// Add handler function
const handleDelete = async (itemId: string) => {
  if (!confirm('Are you sure you want to delete this item?')) return;

  const response = await fetch(`/api/wishlist/${itemId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }
};
```

#### Task: Add Edit Button

**1. Import Link** from Next.js:
```typescript
import Link from 'next/link';
```

**2. Add button in card**:
```tsx
<Link
  href={`/tools/digital-wishlist/edit?id=${item.id}`}
  className="text-indigo-600 hover:text-indigo-800"
>
  Edit
</Link>
```

#### Task: Add Search/Filter

**1. Add search state**:
```typescript
const [searchQuery, setSearchQuery] = useState('');
```

**2. Add search input**:
```tsx
<input
  type="text"
  placeholder="Search wishlist..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full px-4 py-2 border rounded-md"
/>
```

**3. Filter items**:
```typescript
const filteredItems = items.filter(item =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.description.toLowerCase().includes(searchQuery.toLowerCase())
);
```

**4. Use filteredItems in render**:
```tsx
{filteredItems.map(item => (
  // Card render
))}
```

---

## Testing the Feature

### Manual Test Checklist

**Display Page** (`/tools/digital-wishlist`):
- [ ] Navigate to page
- [ ] See empty state if no items
- [ ] Add first item (click + button)
- [ ] Verify item appears in grid
- [ ] Click "Mark as Gifted"
- [ ] Verify green border/badge appears
- [ ] Click "Mark as Ungifted"
- [ ] Verify green indicator removed
- [ ] Test responsive layout (resize browser)
- [ ] Click product link (opens in new tab)
- [ ] Click Geizhals/Idealo links (if present)

**Edit Page** (`/tools/digital-wishlist/edit`):
- [ ] Navigate to edit page
- [ ] See empty form
- [ ] Try submitting empty form (should see errors)
- [ ] Fill in title only (should see errors for others)
- [ ] Fill in all required fields
- [ ] Enter invalid URL (should see error)
- [ ] Enter valid product URL
- [ ] Click "Auto-fetch image"
- [ ] Verify image preview appears
- [ ] Submit form
- [ ] Verify redirect to wishlist
- [ ] See new item in list

**Edit Mode** (`/tools/digital-wishlist/edit?id=xxx`):
- [ ] Get item ID from wishlist data
- [ ] Navigate with ID query param
- [ ] Verify form pre-filled with item data
- [ ] Change title
- [ ] Submit
- [ ] Verify changes on wishlist

**API Endpoints**:
```bash
# GET all items
curl http://localhost:3000/api/wishlist

# POST new item
curl -X POST http://localhost:3000/api/wishlist \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test desc","productUrl":"https://example.com"}'

# GET single item
curl http://localhost:3000/api/wishlist/YOUR-ITEM-ID

# PATCH update item
curl -X PATCH http://localhost:3000/api/wishlist/YOUR-ITEM-ID \
  -H "Content-Type: application/json" \
  -d '{"isGifted":true}'

# DELETE item
curl -X DELETE http://localhost:3000/api/wishlist/YOUR-ITEM-ID

# Scrape image
curl -X POST http://localhost:3000/api/scrape-image \
  -H "Content-Type: application/json" \
  -d '{"url":"https://amazon.com/product/12345"}'
```

---

## Troubleshooting

### Issue: "No items showing up"

**Check 1**: Verify API is working
```bash
curl http://localhost:3000/api/wishlist
```

**Check 2**: Look at browser console
- Open DevTools (F12)
- Go to Console tab
- Look for errors

**Check 3**: Verify data file exists
```bash
cat data/wishlist.json
```

**Fix**: If file is empty or missing, create it:
```bash
echo '{"items":[]}' > data/wishlist.json
```

### Issue: "Auto-fetch image not working"

**Cause 1**: Website doesn't have Open Graph tags
- Solution: Enter image URL manually

**Cause 2**: Website blocks scraping
- Solution: Copy image URL from website and paste manually

**Cause 3**: Invalid product URL
- Solution: Verify URL is correct and accessible

**Test manually**:
```bash
curl -I "https://your-product-url.com"
```

### Issue: "Changes not persisting"

**Check 1**: Verify file permissions
```bash
ls -la data/wishlist.json
```

**Fix**: Make file writable
```bash
chmod 644 data/wishlist.json
```

**Check 2**: Look at API response
- Open DevTools → Network tab
- Submit form
- Look at `/api/wishlist` request
- Check response status (should be 200/201)

### Issue: "Build fails"

**Solution 1**: Clean and rebuild
```bash
rm -rf .next node_modules
pnpm install
pnpm build
```

**Solution 2**: Check Node version
```bash
node --version  # Should be 18.x or higher
```

**Solution 3**: Check for TypeScript errors
```bash
pnpm tsc --noEmit
```

---

## Data Management

### Backup Wishlist Data

**Manual backup**:
```bash
cp data/wishlist.json data/wishlist.backup.json
```

**Automated backup** (cron job):
```bash
# Add to crontab (run daily at 2 AM)
0 2 * * * cd /path/to/platzer.dev && cp data/wishlist.json backups/wishlist.$(date +\%Y\%m\%d).json
```

### Restore from Backup

```bash
cp data/wishlist.backup.json data/wishlist.json
```

### Export Wishlist

**As JSON**:
```bash
cat data/wishlist.json
```

**As CSV** (requires jq):
```bash
jq -r '.items[] | [.title, .description, .productUrl, .isGifted] | @csv' data/wishlist.json > wishlist.csv
```

### Import Sample Data

Create `data/wishlist.json` with sample items:
```json
{
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Wireless Headphones",
      "description": "Noise-cancelling over-ear headphones with 30h battery life",
      "productUrl": "https://example.com/headphones",
      "geizhalsUrl": "https://geizhals.de/headphones",
      "idealoUrl": "https://idealo.de/headphones",
      "imageUrl": "https://example.com/headphones.jpg",
      "isGifted": false,
      "createdAt": "2025-11-04T10:00:00.000Z",
      "updatedAt": "2025-11-04T10:00:00.000Z"
    },
    {
      "id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      "title": "Mechanical Keyboard",
      "description": "RGB mechanical keyboard with Cherry MX switches",
      "productUrl": "https://example.com/keyboard",
      "geizhalsUrl": "",
      "idealoUrl": "",
      "imageUrl": "https://example.com/keyboard.jpg",
      "isGifted": true,
      "createdAt": "2025-11-03T15:30:00.000Z",
      "updatedAt": "2025-11-04T09:15:00.000Z"
    }
  ]
}
```

---

## Customization

### Change Colors

**Gifted indicator color** (edit `page.tsx`):
```typescript
// Find this line:
className="ring-2 ring-green-500"

// Change to:
className="ring-2 ring-blue-500"  // Blue
className="ring-2 ring-purple-500" // Purple
```

### Change Layout

**Grid columns** (edit `page.tsx`):
```typescript
// Find this line:
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"

// Change to 4 columns on desktop:
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"

// Or 2 columns max:
className="grid grid-cols-1 lg:grid-cols-2 gap-6"
```

### Add Categories

**1. Update type** (`types/wishlist.ts`):
```typescript
export interface WishlistItem {
  // ... existing fields
  category: 'electronics' | 'books' | 'clothing' | 'other';
}
```

**2. Add form field** (`edit/page.tsx`):
```tsx
<Field>
  <Label>Category</Label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
  >
    <option value="electronics">Electronics</option>
    <option value="books">Books</option>
    <option value="clothing">Clothing</option>
    <option value="other">Other</option>
  </select>
</Field>
```

**3. Display category** (`page.tsx`):
```tsx
<span className="text-xs text-gray-500 uppercase">
  {item.category}
</span>
```

**4. Add filtering**:
```typescript
const [selectedCategory, setSelectedCategory] = useState('all');

const filteredItems = items.filter(item =>
  selectedCategory === 'all' || item.category === selectedCategory
);
```

---

## Performance Tips

### Optimize Images

**Use Next.js Image component**:
```tsx
import Image from 'next/image';

<Image
  src={item.imageUrl}
  alt={item.title}
  width={300}
  height={300}
  className="object-cover"
/>
```

### Add Pagination

**Limit items per page**:
```typescript
const [page, setPage] = useState(1);
const ITEMS_PER_PAGE = 12;

const paginatedItems = items.slice(
  (page - 1) * ITEMS_PER_PAGE,
  page * ITEMS_PER_PAGE
);

// Render pagination controls
<div className="flex gap-2">
  <button onClick={() => setPage(p => p - 1)} disabled={page === 1}>
    Previous
  </button>
  <span>Page {page}</span>
  <button onClick={() => setPage(p => p + 1)}>
    Next
  </button>
</div>
```

### Cache API Responses

**Add caching headers** (edit `api/wishlist/route.ts`):
```typescript
return NextResponse.json(items, {
  headers: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  },
});
```

---

## Deployment

### Deploy to Vercel

**1. Push code to GitHub**:
```bash
git add .
git commit -m "Add wishlist feature"
git push origin main
```

**2. Connect to Vercel**:
- Go to https://vercel.com
- Click "New Project"
- Import your GitHub repository
- Deploy

**3. Verify deployment**:
- Visit your Vercel URL
- Navigate to `/tools/digital-wishlist`
- Test all features

### Deploy to Other Platforms

**Next.js supports**:
- Netlify
- AWS Amplify
- Google Cloud Run
- Self-hosted (Node.js)

**Important**: Ensure `data/wishlist.json` is writable in your deployment environment.

---

## Getting Help

### Documentation
- **Detailed Transcript**: `transcripts/01-implementation-transcript-detailed.md`
- **Executive Summary**: `transcripts/02-executive-summary.md`
- **Technical Reference**: `transcripts/03-technical-reference.md`
- **This Guide**: `transcripts/04-quick-start-guide.md`

### Common Questions

**Q: Can I use a database instead of JSON?**
A: Yes! See Technical Reference → "Changing storage backend"

**Q: How do I add authentication?**
A: Use NextAuth.js. See detailed transcript for notes on pending auth integration.

**Q: Can I have multiple wishlists?**
A: Not currently, but you can extend the data model to support this.

**Q: Is there a mobile app?**
A: Not yet, but the website is mobile-responsive. Consider building a PWA.

---

## Next Steps

### Recommended Improvements

1. **Add Edit/Delete Buttons** to item cards
2. **Implement Search** functionality
3. **Add Categories** for better organization
4. **Enable Authentication** (once auth provider ready)
5. **Add Price Tracking** with Geizhals/Idealo APIs
6. **Create Backup System** for data safety
7. **Add Email Notifications** when items are gifted
8. **Build Analytics Dashboard** to track gifting trends

### Learning Resources

- **Next.js Docs**: https://nextjs.org/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Headless UI**: https://headlessui.com

---

**Happy Wishlist Building! 🎁**

If you have questions or issues, check the detailed documentation or create a GitHub issue.
