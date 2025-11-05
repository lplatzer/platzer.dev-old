# Digital Wishlist - Technical Reference

**Version**: 1.0.0
**Last Updated**: 2025-11-04
**Maintainer**: Claude AI

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Data Models](#data-models)
3. [API Reference](#api-reference)
4. [Component Reference](#component-reference)
5. [File Structure](#file-structure)
6. [Configuration](#configuration)
7. [Development Guide](#development-guide)
8. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Technology Stack

```
┌─────────────────────────────────────┐
│         Frontend (React)            │
│  - Next.js 15.0.3 (App Router)     │
│  - TypeScript 5.7.2                 │
│  - Tailwind CSS v4.0.0              │
│  - Headless UI v2.2.0               │
└─────────────────────────────────────┘
              ↓ HTTP
┌─────────────────────────────────────┐
│      API Routes (Serverless)        │
│  - Next.js API Handlers             │
│  - Server-side TypeScript           │
└─────────────────────────────────────┘
              ↓ File I/O
┌─────────────────────────────────────┐
│      Data Layer (JSON)              │
│  - data/wishlist.json               │
│  - Node.js fs.promises              │
└─────────────────────────────────────┘
```

### Request Flow

**Display Page**:
```
User → /tools/digital-wishlist
    → GET /api/wishlist
    → Read wishlist.json
    → Return items[]
    → Render grid
```

**Toggle Gifted**:
```
User → Click "Mark as Gifted"
    → Optimistic UI update (instant)
    → PATCH /api/wishlist/[id]
    → Update wishlist.json
    → Confirm or rollback
```

**Add Item**:
```
User → /tools/digital-wishlist/edit
    → Fill form
    → Click "Auto-fetch image" (optional)
        → POST /api/scrape-image
        → Scrape product page
        → Return image URL
    → Submit form
    → POST /api/wishlist
    → Write to wishlist.json
    → Redirect to list
```

---

## Data Models

### WishlistItem

**File**: `src/app/types/wishlist.ts`

```typescript
export interface WishlistItem {
  id: string;              // UUID v4
  title: string;           // Max recommended: 100 chars
  description: string;     // Max recommended: 500 chars
  productUrl: string;      // Valid HTTP/HTTPS URL
  geizhalsUrl?: string;    // Optional, valid URL
  idealoUrl?: string;      // Optional, valid URL
  imageUrl?: string;       // Optional, valid URL
  isGifted: boolean;       // Default: false
  createdAt: string;       // ISO 8601 format
  updatedAt: string;       // ISO 8601 format
}
```

**Field Details**:

| Field | Type | Required | Validation | Example |
|-------|------|----------|------------|---------|
| `id` | string | Yes | UUID v4 | `"550e8400-e29b-41d4-a716-446655440000"` |
| `title` | string | Yes | Non-empty | `"Wireless Headphones"` |
| `description` | string | Yes | Non-empty | `"Noise-cancelling over-ear..."` |
| `productUrl` | string | Yes | Valid URL | `"https://amazon.com/product"` |
| `geizhalsUrl` | string | No | Valid URL or empty | `"https://geizhals.de/..."` |
| `idealoUrl` | string | No | Valid URL or empty | `"https://idealo.de/..."` |
| `imageUrl` | string | No | Valid URL or empty | `"https://cdn.example.com/img.jpg"` |
| `isGifted` | boolean | Yes | true/false | `false` |
| `createdAt` | string | Yes | ISO 8601 | `"2025-11-04T10:30:00.000Z"` |
| `updatedAt` | string | Yes | ISO 8601 | `"2025-11-04T15:45:00.000Z"` |

### WishlistData

```typescript
export interface WishlistData {
  items: WishlistItem[];
}
```

**Storage Format** (`data/wishlist.json`):
```json
{
  "items": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "Example Item",
      "description": "Example description",
      "productUrl": "https://example.com/product",
      "geizhalsUrl": "https://geizhals.de/example",
      "idealoUrl": "https://idealo.de/example",
      "imageUrl": "https://example.com/image.jpg",
      "isGifted": false,
      "createdAt": "2025-11-04T10:30:00.000Z",
      "updatedAt": "2025-11-04T10:30:00.000Z"
    }
  ]
}
```

---

## API Reference

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://platzer.dev/api`

### Authentication
⚠️ **Current**: No authentication required
🔐 **Future**: Bearer token or session cookie

---

### GET /api/wishlist

Fetch all wishlist items.

**Request**:
```http
GET /api/wishlist HTTP/1.1
Host: platzer.dev
```

**Response** (200 OK):
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Wireless Headphones",
    "description": "Noise-cancelling over-ear headphones",
    "productUrl": "https://amazon.com/product",
    "geizhalsUrl": "https://geizhals.de/...",
    "idealoUrl": "https://idealo.de/...",
    "imageUrl": "https://cdn.example.com/image.jpg",
    "isGifted": false,
    "createdAt": "2025-11-04T10:30:00.000Z",
    "updatedAt": "2025-11-04T10:30:00.000Z"
  }
]
```

**Response** (500 Internal Server Error):
```json
{
  "error": "Failed to fetch wishlist items"
}
```

**Code Example**:
```typescript
const response = await fetch('/api/wishlist');
const items: WishlistItem[] = await response.json();
```

---

### POST /api/wishlist

Create a new wishlist item.

**Request**:
```http
POST /api/wishlist HTTP/1.1
Host: platzer.dev
Content-Type: application/json

{
  "title": "Wireless Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "productUrl": "https://amazon.com/product",
  "geizhalsUrl": "https://geizhals.de/...",
  "idealoUrl": "https://idealo.de/...",
  "imageUrl": "https://cdn.example.com/image.jpg"
}
```

**Request Body**:
```typescript
{
  title: string;           // Required
  description: string;     // Required
  productUrl: string;      // Required
  geizhalsUrl?: string;    // Optional
  idealoUrl?: string;      // Optional
  imageUrl?: string;       // Optional
}
```

**Response** (201 Created):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Wireless Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "productUrl": "https://amazon.com/product",
  "geizhalsUrl": "https://geizhals.de/...",
  "idealoUrl": "https://idealo.de/...",
  "imageUrl": "https://cdn.example.com/image.jpg",
  "isGifted": false,
  "createdAt": "2025-11-04T10:30:00.000Z",
  "updatedAt": "2025-11-04T10:30:00.000Z"
}
```

**Response** (400 Bad Request):
```json
{
  "error": "Missing required fields: title, description, productUrl"
}
```

**Code Example**:
```typescript
const response = await fetch('/api/wishlist', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Wireless Headphones',
    description: 'Noise-cancelling over-ear headphones',
    productUrl: 'https://amazon.com/product',
  }),
});

const newItem: WishlistItem = await response.json();
```

---

### GET /api/wishlist/[id]

Fetch a single wishlist item by ID.

**Request**:
```http
GET /api/wishlist/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: platzer.dev
```

**Response** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Wireless Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "productUrl": "https://amazon.com/product",
  "isGifted": false,
  "createdAt": "2025-11-04T10:30:00.000Z",
  "updatedAt": "2025-11-04T10:30:00.000Z"
}
```

**Response** (404 Not Found):
```json
{
  "error": "Wishlist item not found"
}
```

**Code Example**:
```typescript
const response = await fetch(`/api/wishlist/${itemId}`);
if (response.ok) {
  const item: WishlistItem = await response.json();
}
```

---

### PATCH /api/wishlist/[id]

Update an existing wishlist item.

**Request**:
```http
PATCH /api/wishlist/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: platzer.dev
Content-Type: application/json

{
  "isGifted": true
}
```

**Request Body** (all fields optional):
```typescript
{
  title?: string;
  description?: string;
  productUrl?: string;
  geizhalsUrl?: string;
  idealoUrl?: string;
  imageUrl?: string;
  isGifted?: boolean;
}
```

**Notes**:
- Only provided fields will be updated
- `id`, `createdAt` cannot be changed
- `updatedAt` is automatically set to current time

**Response** (200 OK):
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Wireless Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "productUrl": "https://amazon.com/product",
  "isGifted": true,
  "createdAt": "2025-11-04T10:30:00.000Z",
  "updatedAt": "2025-11-04T15:45:00.000Z"
}
```

**Response** (404 Not Found):
```json
{
  "error": "Wishlist item not found"
}
```

**Code Example**:
```typescript
// Toggle gifted status
const response = await fetch(`/api/wishlist/${itemId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ isGifted: true }),
});

const updatedItem: WishlistItem = await response.json();
```

---

### DELETE /api/wishlist/[id]

Delete a wishlist item.

**Request**:
```http
DELETE /api/wishlist/550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Host: platzer.dev
```

**Response** (200 OK):
```json
{
  "message": "Wishlist item deleted successfully",
  "item": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Wireless Headphones",
    ...
  }
}
```

**Response** (404 Not Found):
```json
{
  "error": "Wishlist item not found"
}
```

**Code Example**:
```typescript
const response = await fetch(`/api/wishlist/${itemId}`, {
  method: 'DELETE',
});

if (response.ok) {
  const result = await response.json();
  console.log('Deleted:', result.item.title);
}
```

---

### POST /api/scrape-image

Extract product image URL from a webpage.

**Request**:
```http
POST /api/scrape-image HTTP/1.1
Host: platzer.dev
Content-Type: application/json

{
  "url": "https://amazon.com/product/12345"
}
```

**Request Body**:
```typescript
{
  url: string;  // Valid HTTP/HTTPS URL
}
```

**Response** (200 OK):
```json
{
  "imageUrl": "https://m.media-amazon.com/images/I/71abc123.jpg"
}
```

**Response** (400 Bad Request):
```json
{
  "error": "URL is required"
}
```
or
```json
{
  "error": "Invalid URL format"
}
```

**Response** (404 Not Found):
```json
{
  "error": "No product image found on the page. You can manually enter an image URL."
}
```

**Response** (500 Internal Server Error):
```json
{
  "error": "Failed to fetch page: Forbidden"
}
```

**Scraping Strategy**:
1. Fetches HTML from URL with User-Agent spoofing
2. Searches for image meta tags in priority order:
   - `<meta property="og:image" content="...">`
   - `<meta name="twitter:image" content="...">`
   - Alternative formats
3. Handles relative URLs (protocol-relative, path-relative)
4. Validates extracted URL
5. Returns first valid match

**Code Example**:
```typescript
const response = await fetch('/api/scrape-image', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: productUrl }),
});

if (response.ok) {
  const { imageUrl } = await response.json();
  setFormData(prev => ({ ...prev, imageUrl }));
} else {
  const { error } = await response.json();
  console.error('Scraping failed:', error);
}
```

---

## Component Reference

### WishlistPage

**File**: `src/app/tools/digital-wishlist/page.tsx`
**Route**: `/tools/digital-wishlist`
**Type**: Client Component

**Purpose**: Display all wishlist items with gifted toggle functionality.

**State**:
```typescript
const [items, setItems] = useState<WishlistItem[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());
```

**Key Functions**:

```typescript
// Fetch all items on mount
const fetchWishlistItems = async () => {
  const response = await fetch('/api/wishlist');
  const data = await response.json();
  setItems(data);
};

// Toggle gifted status with optimistic update
const handleToggleGifted = async (itemId: string, currentStatus: boolean) => {
  // Optimistic update
  setItems(prev => prev.map(item =>
    item.id === itemId ? { ...item, isGifted: !currentStatus } : item
  ));

  // API call
  const response = await fetch(`/api/wishlist/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ isGifted: !currentStatus }),
  });

  // Rollback on error
  if (!response.ok) {
    setItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, isGifted: currentStatus } : item
    ));
  }
};
```

**Props**: None

**Children Components**:
- Wishlist item cards (inline)
- Floating action button
- Loading spinner
- Error alert
- Empty state

---

### EditWishlistItem

**File**: `src/app/tools/digital-wishlist/edit/page.tsx`
**Routes**:
- `/tools/digital-wishlist/edit` (create mode)
- `/tools/digital-wishlist/edit?id=xxx` (edit mode)
**Type**: Client Component (wrapped in Suspense)

**Purpose**: Form for adding/editing wishlist items with image scraping.

**State**:
```typescript
const [formData, setFormData] = useState<FormData>({
  title: '',
  description: '',
  productUrl: '',
  geizhalsUrl: '',
  idealoUrl: '',
  imageUrl: '',
});
const [errors, setErrors] = useState<FormErrors>({});
const [isLoading, setIsLoading] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [isFetchingImage, setIsFetchingImage] = useState(false);
const [submitError, setSubmitError] = useState<string>('');
const [submitSuccess, setSubmitSuccess] = useState(false);
```

**Key Functions**:

```typescript
// Load existing item (edit mode)
useEffect(() => {
  if (isEditing && itemId) {
    fetch(`/api/wishlist/${itemId}`)
      .then(res => res.json())
      .then(item => setFormData({ ...item }));
  }
}, [isEditing, itemId]);

// Auto-fetch image from product URL
const handleAutoFetchImage = async () => {
  const response = await fetch('/api/scrape-image', {
    method: 'POST',
    body: JSON.stringify({ url: formData.productUrl }),
  });
  const { imageUrl } = await response.json();
  setFormData(prev => ({ ...prev, imageUrl }));
};

// Submit form (create or update)
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  const url = isEditing ? `/api/wishlist/${itemId}` : '/api/wishlist';
  const method = isEditing ? 'PATCH' : 'POST';

  const response = await fetch(url, {
    method,
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    router.push('/tools/digital-wishlist');
  }
};
```

**Props**: None (uses URL query params)

**Children Components**:
- Headless UI Form components (Field, Label, Input, Textarea, Button)
- Image preview
- Success/error alerts

---

## File Structure

```
platzer.dev/
├── src/
│   └── app/
│       ├── types/
│       │   └── wishlist.ts                    # TypeScript interfaces
│       ├── api/
│       │   ├── wishlist/
│       │   │   ├── route.ts                   # GET all, POST new
│       │   │   └── [id]/
│       │   │       └── route.ts               # GET, PATCH, DELETE by ID
│       │   └── scrape-image/
│       │       └── route.ts                   # POST image scraping
│       ├── tools/
│       │   └── digital-wishlist/
│       │       ├── page.tsx                   # Main display page
│       │       └── edit/
│       │           └── page.tsx               # Add/edit form
│       └── utils/
│           └── nav.ts                         # Navigation config (updated)
├── data/
│   └── wishlist.json                          # Data storage
├── transcripts/
│   ├── 01-implementation-transcript-detailed.md
│   ├── 02-executive-summary.md
│   └── 03-technical-reference.md              # This file
├── package.json                               # Dependencies
└── pnpm-lock.yaml                             # Lockfile
```

---

## Configuration

### Environment Variables
None currently required.

**Future** (for enhanced features):
```env
# Database connection (if migrating from JSON)
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="https://platzer.dev"

# External APIs
GEIZHALS_API_KEY="..."
IDEALO_API_KEY="..."
```

### File Permissions
Ensure `data/wishlist.json` is writable:
```bash
chmod 644 data/wishlist.json
```

---

## Development Guide

### Local Setup

1. **Clone repository**:
```bash
git clone https://github.com/lplatzer/platzer.dev.git
cd platzer.dev
```

2. **Install dependencies**:
```bash
pnpm install
```

3. **Run development server**:
```bash
pnpm dev
```

4. **Open browser**:
```
http://localhost:3000/tools/digital-wishlist
```

### Making Changes

**Adding a new field to WishlistItem**:

1. Update interface in `src/app/types/wishlist.ts`:
```typescript
export interface WishlistItem {
  // ... existing fields
  newField: string;  // Add new field
}
```

2. Update API routes:
   - Add field to POST validation (optional/required)
   - Ensure PATCH can update field

3. Update UI:
   - Add form field in `edit/page.tsx`
   - Display field in `page.tsx` card

4. Migrate existing data:
```typescript
// Add default value for existing items
const items = data.items.map(item => ({
  ...item,
  newField: item.newField || 'default value',
}));
```

**Changing storage backend**:

1. Create new storage adapter:
```typescript
// src/app/lib/storage.ts
export interface StorageAdapter {
  getAll(): Promise<WishlistItem[]>;
  getById(id: string): Promise<WishlistItem | null>;
  create(item: Omit<WishlistItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<WishlistItem>;
  update(id: string, updates: Partial<WishlistItem>): Promise<WishlistItem>;
  delete(id: string): Promise<void>;
}
```

2. Implement adapter (e.g., PostgreSQL, MongoDB):
```typescript
export class PostgresStorageAdapter implements StorageAdapter {
  // Implement all methods
}
```

3. Update API routes to use adapter:
```typescript
import { storage } from '@/app/lib/storage';

export async function GET() {
  const items = await storage.getAll();
  return NextResponse.json(items);
}
```

### Testing

**Manual testing checklist**:
```bash
# Display page
✓ Navigate to /tools/digital-wishlist
✓ Verify items display correctly
✓ Toggle gifted status
✓ Check external links work

# Add page
✓ Navigate to /tools/digital-wishlist/edit
✓ Fill form with valid data
✓ Test auto-fetch image
✓ Submit and verify redirect

# Edit page
✓ Navigate to /tools/digital-wishlist/edit?id=xxx
✓ Verify form pre-populated
✓ Update fields
✓ Submit and verify changes

# API
✓ Test all endpoints with curl/Postman
✓ Verify error handling
✓ Check data persistence
```

**Automated testing** (future):
```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Type checking
pnpm type-check

# Linting
pnpm lint
```

---

## Troubleshooting

### Issue: "Wishlist items not loading"

**Symptoms**: Empty state displayed even though items exist

**Possible Causes**:
1. API route not accessible
2. `wishlist.json` file missing or corrupted
3. File permissions issue
4. CORS error (if deployed)

**Solutions**:
```bash
# Check file exists
ls -la data/wishlist.json

# Verify file contents
cat data/wishlist.json

# Check API route
curl http://localhost:3000/api/wishlist

# Check browser console for errors
# Open DevTools → Console tab
```

---

### Issue: "Failed to fetch image"

**Symptoms**: Auto-fetch image returns error

**Possible Causes**:
1. Website blocks scraping
2. No Open Graph meta tags
3. Invalid product URL
4. Network timeout

**Solutions**:
```bash
# Test URL manually
curl -I "https://example.com/product"

# Check for meta tags
curl "https://example.com/product" | grep "og:image"

# Use manual image URL input instead
```

---

### Issue: "Build fails with TypeScript error"

**Symptoms**: `pnpm build` returns type errors

**Possible Causes**:
1. Missing type definitions
2. Incorrect import paths
3. Next.js version mismatch

**Solutions**:
```bash
# Reinstall dependencies
rm -rf node_modules .next
pnpm install

# Check TypeScript version
pnpm list typescript

# Run type check only
pnpm tsc --noEmit
```

---

### Issue: "Concurrent edit conflicts"

**Symptoms**: Changes lost when multiple users edit simultaneously

**Root Cause**: JSON file write race condition

**Solution** (short-term):
```typescript
// Use file locking library
import lockfile from 'proper-lockfile';

async function writeWishlistData(data: WishlistData) {
  const release = await lockfile.lock(DATA_FILE_PATH);
  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
  } finally {
    await release();
  }
}
```

**Solution** (long-term): Migrate to database with transaction support

---

### Issue: "Images not displaying"

**Symptoms**: Broken image icons in wishlist

**Possible Causes**:
1. Invalid image URL
2. CORS restrictions
3. Image deleted from source
4. Network error

**Solutions**:
```bash
# Test image URL
curl -I "https://example.com/image.jpg"

# Check browser console
# Look for CORS errors or 404s

# Update item with new image URL
# Or remove imageUrl to show fallback icon
```

---

## Performance Optimization

### Current Performance

**Metrics**:
- Display Page: 2.85 kB bundle
- Edit Page: 5.66 kB bundle
- API Routes: 147 B each
- First Load JS: ~112 kB

**Load Time**:
- Initial page: <500ms
- API response: <100ms (local file)
- Image scraping: 1-3s (depends on source)

### Optimization Opportunities

1. **Image Optimization**:
```typescript
// Replace <img> with Next.js Image
import Image from 'next/image';

<Image
  src={item.imageUrl}
  alt={item.title}
  width={300}
  height={300}
  className="..."
/>
```

2. **Caching**:
```typescript
// Add cache headers to API routes
return NextResponse.json(items, {
  headers: {
    'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
  },
});
```

3. **Pagination**:
```typescript
// Add pagination to GET /api/wishlist
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '10');

  const start = (page - 1) * limit;
  const end = start + limit;

  const data = await readWishlistData();
  const paginatedItems = data.items.slice(start, end);

  return NextResponse.json({
    items: paginatedItems,
    total: data.items.length,
    page,
    limit,
  });
}
```

---

## Security Considerations

### Current Security Posture

**Vulnerabilities**:
- ⚠️ No authentication on edit endpoints
- ⚠️ No rate limiting
- ⚠️ No input sanitization
- ⚠️ No CSRF protection
- ⚠️ File write race conditions

**Mitigations Needed**:

1. **Add Authentication**:
```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Only allow authenticated users to edit
      if (req.nextUrl.pathname.startsWith('/tools/digital-wishlist/edit')) {
        return !!token;
      }
      return true;
    },
  },
});
```

2. **Rate Limiting**:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

export async function POST(request: NextRequest) {
  // Apply rate limiting
  // ...
}
```

3. **Input Sanitization**:
```typescript
import DOMPurify from 'isomorphic-dompurify';

const sanitizedTitle = DOMPurify.sanitize(body.title);
const sanitizedDescription = DOMPurify.sanitize(body.description);
```

4. **CSRF Protection**:
```typescript
// Use Next.js built-in CSRF protection
// Or implement custom token validation
```

---

## Backup & Recovery

### Manual Backup

```bash
# Backup wishlist data
cp data/wishlist.json data/wishlist.backup.$(date +%Y%m%d).json

# Restore from backup
cp data/wishlist.backup.20251104.json data/wishlist.json
```

### Automated Backup

**Cron job** (daily at 2 AM):
```bash
# /etc/cron.d/wishlist-backup
0 2 * * * cd /path/to/platzer.dev && cp data/wishlist.json data/backups/wishlist.$(date +\%Y\%m\%d).json
```

**Git auto-commit**:
```bash
#!/bin/bash
# scripts/auto-commit-data.sh

cd /path/to/platzer.dev
git add data/wishlist.json
git commit -m "Auto-backup: wishlist data $(date +%Y-%m-%d)"
git push origin main
```

### Disaster Recovery

**Complete data loss**:
1. Check git history: `git log -- data/wishlist.json`
2. Restore from backup: `git checkout <commit> -- data/wishlist.json`
3. If no backups: Items must be re-entered manually

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-04 | Initial release |

---

## Contributing

### Code Style

**TypeScript**:
- Use interfaces over types
- Prefer `const` over `let`
- Use descriptive variable names
- Add JSDoc comments for functions

**React**:
- Use functional components
- Prefer hooks over class components
- Use TypeScript for props
- Extract reusable components

**Tailwind**:
- Use utility classes
- Avoid custom CSS unless necessary
- Use design tokens (colors, spacing)
- Mobile-first responsive design

### Pull Request Process

1. Create feature branch from `main`
2. Make changes with clear commits
3. Update documentation if needed
4. Run build: `pnpm build`
5. Run linter: `pnpm lint`
6. Create PR with description
7. Request review
8. Merge after approval

---

## Support

**Documentation**:
- Detailed Transcript: `transcripts/01-implementation-transcript-detailed.md`
- Executive Summary: `transcripts/02-executive-summary.md`
- This Reference: `transcripts/03-technical-reference.md`

**Issue Tracking**:
- GitHub Issues: https://github.com/lplatzer/platzer.dev/issues

---

**End of Technical Reference**
