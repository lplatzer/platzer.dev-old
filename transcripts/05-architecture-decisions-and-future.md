# Architecture Decisions & Future Enhancements

**Project**: Digital Wishlist for platzer.dev
**Version**: 1.0.0
**Date**: 2025-11-04

---

## Table of Contents

1. [Architecture Decision Records (ADRs)](#architecture-decision-records-adrs)
2. [Future Enhancement Roadmap](#future-enhancement-roadmap)
3. [Migration Strategies](#migration-strategies)
4. [Scalability Considerations](#scalability-considerations)
5. [Alternative Implementations](#alternative-implementations)

---

## Architecture Decision Records (ADRs)

### ADR-001: Use JSON File Storage Instead of Database

**Status**: ✅ Accepted

**Context**:
The wishlist feature needs persistent storage for items. Options considered:
1. Database (PostgreSQL, MongoDB, etc.)
2. JSON file storage
3. Browser localStorage
4. External service (Firebase, Supabase)

**Decision**: Use JSON file storage (`data/wishlist.json`)

**Rationale**:
- **Requirement**: Client explicitly requested no database
- **Simplicity**: No database setup, migrations, or connection management
- **Version Control**: Data file can be committed to git for backup
- **Zero Cost**: No database hosting fees
- **Sufficient Scale**: Expected < 100 items, file I/O is fast enough
- **Easy Deployment**: No environment variables or connection strings needed

**Consequences**:
- ✅ Simple implementation and deployment
- ✅ Easy to backup and restore
- ✅ No additional infrastructure
- ⚠️ Concurrent write race conditions possible
- ⚠️ Won't scale beyond ~1000 items
- ⚠️ No built-in querying, indexing, or transactions

**Future Mitigation**:
- Add file locking for concurrent writes (e.g., `proper-lockfile`)
- Migrate to database when item count > 500 or concurrent users > 10
- Use database adapter pattern for easy migration

---

### ADR-002: Implement Optimistic UI Updates

**Status**: ✅ Accepted

**Context**:
When users toggle "Mark as Gifted", we need to decide when to update the UI:
1. **Pessimistic**: Wait for API response before updating
2. **Optimistic**: Update immediately, rollback on error

**Decision**: Use optimistic UI updates

**Rationale**:
- **Better UX**: Instant feedback feels responsive
- **Low Risk**: Toggle operation rarely fails
- **Rollback**: Easy to revert on error
- **Modern Pattern**: Standard in React applications

**Implementation**:
```typescript
const handleToggleGifted = async (itemId, currentStatus) => {
  // 1. Update UI immediately
  setItems(prev => prev.map(item =>
    item.id === itemId ? { ...item, isGifted: !currentStatus } : item
  ));

  // 2. Call API
  const response = await fetch(`/api/wishlist/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ isGifted: !currentStatus }),
  });

  // 3. Rollback on error
  if (!response.ok) {
    setItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, isGifted: currentStatus } : item
    ));
    showError('Failed to update. Please try again.');
  }
};
```

**Consequences**:
- ✅ Snappy, responsive UI
- ✅ Better perceived performance
- ⚠️ Temporary inconsistency on errors
- ⚠️ More complex error handling

**Trade-offs Accepted**:
- Slight complexity increase is worth the UX improvement
- Error case is rare and gracefully handled

---

### ADR-003: Server-Side Image Scraping

**Status**: ✅ Accepted

**Context**:
Product images need to be extracted from URLs. Options:
1. **Client-side scraping**: Fetch in browser, parse with JavaScript
2. **Server-side scraping**: Fetch in API route, parse on server
3. **Third-party service**: Use external scraping API

**Decision**: Server-side scraping in Next.js API route

**Rationale**:
- **CORS**: Client-side would fail due to cross-origin restrictions
- **User-Agent**: Can spoof browser UA to avoid bot detection
- **Security**: Can add rate limiting, validation on server
- **No Cost**: Third-party services charge per request
- **Control**: Full control over parsing logic and error handling

**Implementation**:
- Endpoint: `POST /api/scrape-image`
- Fetches HTML with spoofed User-Agent
- Parses multiple meta tag patterns (og:image, twitter:image)
- Handles relative URLs (protocol-relative, path-relative)
- Returns first valid image URL found

**Consequences**:
- ✅ Works reliably for most e-commerce sites
- ✅ No CORS issues
- ✅ Can add caching, rate limiting
- ⚠️ Some websites may block server requests
- ⚠️ Meta tags may not exist on all sites

**Future Enhancements**:
- Add caching (Redis) for frequently scraped URLs
- Implement multiple fallback strategies (JSON-LD, schema.org)
- Add proxy rotation for anti-bot protection

---

### ADR-004: Use Next.js App Router with API Routes

**Status**: ✅ Accepted

**Context**:
Next.js 15 offers two routing paradigms:
1. **Pages Router**: Traditional, stable, widely documented
2. **App Router**: New, React Server Components, modern features

**Decision**: Use App Router with API Routes

**Rationale**:
- **Project Standard**: Existing codebase uses App Router
- **Future-Proof**: App Router is the future of Next.js
- **Server Components**: Can use RSC for future optimizations
- **Consistency**: Match existing project structure
- **Modern Features**: Built-in Suspense, streaming, etc.

**Challenges Encountered**:
1. **Async Params**: Dynamic route params must be awaited
   - Solution: Updated all handlers to `await params`
2. **Suspense Boundaries**: `useSearchParams` requires Suspense
   - Solution: Wrapped edit page in Suspense boundary

**Consequences**:
- ✅ Future-proof implementation
- ✅ Consistent with project standards
- ✅ Access to latest Next.js features
- ⚠️ Learning curve for Next.js 15 changes
- ⚠️ Some documentation is Pages Router-focused

---

### ADR-005: TypeScript with Strict Typing

**Status**: ✅ Accepted

**Context**:
Project uses TypeScript. Decide on strictness level:
1. **Loose typing**: `any` allowed, minimal type checking
2. **Moderate typing**: Types for public APIs only
3. **Strict typing**: Full typing throughout, no `any`

**Decision**: Use strict TypeScript typing throughout

**Rationale**:
- **Catch Errors Early**: Type errors found at compile time
- **Better IDE Support**: IntelliSense, autocomplete work perfectly
- **Self-Documenting**: Types serve as inline documentation
- **Refactoring Safety**: Can refactor with confidence
- **Project Standard**: Existing code is fully typed

**Type Safety Implemented**:
- All interfaces defined (`WishlistItem`, `WishlistData`)
- API responses typed with `NextResponse<Type>`
- Component props fully typed
- Form state typed with interfaces
- No `any` types used

**Consequences**:
- ✅ Zero runtime type errors in testing
- ✅ Excellent developer experience
- ✅ Easy to maintain and refactor
- ⚠️ Slightly slower initial development
- ⚠️ Learning curve for TypeScript beginners

---

### ADR-006: Defer Authentication to Future Release

**Status**: ✅ Accepted

**Context**:
Edit page should be protected, but auth system not yet in repository.

Options:
1. Block implementation until auth ready
2. Implement simple password protection
3. Skip auth for now, add later

**Decision**: Skip authentication, add in future release

**Rationale**:
- **Client Request**: Explicitly asked to skip auth for now
- **Auth in Progress**: Client has auth implementation not yet pushed
- **Easy to Add**: Auth can be added as middleware without code changes
- **Unblocking**: Can deliver feature immediately
- **Low Risk**: Internal tool, limited exposure

**Security Implications**:
- ⚠️ Anyone with URL can edit wishlist
- ⚠️ No audit trail of who made changes
- ⚠️ Cannot restrict to specific users

**Mitigation Plan**:
1. Document that auth is pending
2. Keep edit page URL non-obvious (no nav link yet)
3. Add auth middleware as soon as available
4. Consider adding admin role check

**Future Implementation**:
```typescript
// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ['/tools/digital-wishlist/edit/:path*'],
};
```

---

### ADR-007: Tailwind CSS + Headless UI for Styling

**Status**: ✅ Accepted

**Context**:
Need to style components consistently with existing site.

**Decision**: Use Tailwind CSS v4 + Headless UI v2

**Rationale**:
- **Project Standard**: Entire site uses Tailwind
- **Consistency**: Match existing component styles
- **Accessibility**: Headless UI provides accessible primitives
- **Customization**: Full control over appearance
- **Performance**: Minimal CSS bundle size
- **Developer Experience**: Rapid development with utility classes

**Components Used**:
- Headless UI: Field, Label, Input, Textarea, Button
- Hero Icons: ShoppingBag, CheckCircle, PlusCircle, Link
- Tailwind: All styling and responsive breakpoints

**Consequences**:
- ✅ Perfect consistency with existing site
- ✅ Accessible by default
- ✅ Rapid development
- ✅ Mobile-responsive out of the box
- ⚠️ Class names can get verbose
- ⚠️ Need to know Tailwind conventions

---

## Future Enhancement Roadmap

### Phase 2: Security & Polish (1-2 weeks)

#### 2.1 Authentication Integration
**Priority**: High
**Effort**: Medium

**Tasks**:
- [ ] Add NextAuth.js configuration
- [ ] Protect edit routes with middleware
- [ ] Add role-based access control (admin/viewer)
- [ ] Show user avatar in navigation
- [ ] Add "Admin" badge on edit page

**Implementation**:
```typescript
// middleware.ts
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/tools/digital-wishlist/edit/:path*'],
};
```

**Acceptance Criteria**:
- Unauthenticated users redirected to login
- Only authenticated users can add/edit items
- Viewing wishlist remains public

---

#### 2.2 Delete Confirmation UI
**Priority**: High
**Effort**: Low

**Tasks**:
- [ ] Add delete button to item cards
- [ ] Implement confirmation modal
- [ ] Add success toast notification
- [ ] Update API to return deleted item

**Implementation**:
```typescript
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [itemToDelete, setItemToDelete] = useState<string | null>(null);

const handleDelete = async (id: string) => {
  const response = await fetch(`/api/wishlist/${id}`, { method: 'DELETE' });
  if (response.ok) {
    setItems(prev => prev.filter(item => item.id !== id));
    showToast('Item deleted successfully');
  }
};
```

**UI Design**:
```tsx
<Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
  <h3>Delete Wishlist Item?</h3>
  <p>This action cannot be undone.</p>
  <button onClick={() => handleDelete(itemToDelete)}>Delete</button>
  <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
</Modal>
```

---

#### 2.3 Image Optimization
**Priority**: Medium
**Effort**: Low

**Tasks**:
- [ ] Replace `<img>` with Next.js `<Image />`
- [ ] Configure image domains in `next.config.js`
- [ ] Add image loading states
- [ ] Implement blur placeholder

**Implementation**:
```typescript
// next.config.js
module.exports = {
  images: {
    domains: [
      'amazon.com',
      'cdn.example.com',
      'm.media-amazon.com',
      // Add other domains as needed
    ],
  },
};

// Component
import Image from 'next/image';

<Image
  src={item.imageUrl}
  alt={item.title}
  width={300}
  height={300}
  className="object-cover rounded-md"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..."
/>
```

**Benefits**:
- Faster page loads
- Automatic image optimization
- Lazy loading
- Better LCP score

---

### Phase 3: Enhanced Features (1 month)

#### 3.1 Search & Filter
**Priority**: High
**Effort**: Medium

**Features**:
- [ ] Search by title/description
- [ ] Filter by gifted status
- [ ] Filter by category (after adding categories)
- [ ] Sort by date, title, price

**Implementation**:
```typescript
const [searchQuery, setSearchQuery] = useState('');
const [filterGifted, setFilterGifted] = useState<'all' | 'gifted' | 'available'>('all');
const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

const filteredAndSortedItems = useMemo(() => {
  let result = items;

  // Search
  if (searchQuery) {
    result = result.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter
  if (filterGifted !== 'all') {
    result = result.filter(item =>
      filterGifted === 'gifted' ? item.isGifted : !item.isGifted
    );
  }

  // Sort
  result.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  return result;
}, [items, searchQuery, filterGifted, sortBy]);
```

---

#### 3.2 Categories & Tags
**Priority**: Medium
**Effort**: Medium

**Features**:
- [ ] Add category field (Electronics, Books, Clothing, etc.)
- [ ] Add tags field (array of strings)
- [ ] Category badges on cards
- [ ] Filter by category
- [ ] Tag cloud navigation

**Data Model Update**:
```typescript
export interface WishlistItem {
  // ... existing fields
  category: 'electronics' | 'books' | 'clothing' | 'home' | 'other';
  tags: string[];  // e.g., ['wireless', 'audio', 'bluetooth']
}
```

**UI Components**:
```tsx
// Category badge
<span className={`px-2 py-1 text-xs font-semibold rounded ${categoryColors[item.category]}`}>
  {item.category}
</span>

// Tag chips
{item.tags.map(tag => (
  <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded">
    {tag}
  </span>
))}
```

---

#### 3.3 Price Tracking Integration
**Priority**: Medium
**Effort**: High

**Features**:
- [ ] Fetch current prices from Geizhals/Idealo APIs
- [ ] Display price on wishlist cards
- [ ] Show price history chart
- [ ] Email alerts on price drops
- [ ] "Best price" indicator

**Implementation Strategy**:
1. **API Integration**:
   - Sign up for Geizhals/Idealo developer accounts
   - Store API keys in environment variables
   - Create price fetching service

2. **Data Model**:
```typescript
export interface WishlistItem {
  // ... existing fields
  currentPrice?: number;
  priceHistory: Array<{
    date: string;
    price: number;
    source: 'geizhals' | 'idealo';
  }>;
  lowestPrice?: number;
}
```

3. **Background Job**:
```typescript
// scripts/update-prices.ts
async function updatePrices() {
  const items = await getAllWishlistItems();
  for (const item of items) {
    if (item.geizhalsUrl) {
      const price = await fetchGeizhalsPrice(item.geizhalsUrl);
      await updateItemPrice(item.id, price);
    }
  }
}

// Run daily via cron
// 0 6 * * * cd /path/to/app && node scripts/update-prices.js
```

---

#### 3.4 Notifications
**Priority**: Low
**Effort**: Medium

**Features**:
- [ ] Email notification when item marked as gifted
- [ ] Push notifications (PWA)
- [ ] Digest emails (weekly summary)
- [ ] Price drop alerts

**Implementation**:
```typescript
// lib/notifications.ts
import nodemailer from 'nodemailer';

export async function notifyItemGifted(item: WishlistItem) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: 'wishlist@platzer.dev',
    to: process.env.NOTIFY_EMAIL,
    subject: `Someone gifted: ${item.title}`,
    html: `
      <h2>Good news!</h2>
      <p>Someone marked "${item.title}" as gifted on your wishlist.</p>
      <a href="https://platzer.dev/tools/digital-wishlist">View wishlist</a>
    `,
  });
}

// In PATCH endpoint
await notifyItemGifted(updatedItem);
```

---

### Phase 4: Advanced Features (3+ months)

#### 4.1 Multi-User Wishlists
**Priority**: Medium
**Effort**: High

**Features**:
- [ ] User-specific wishlists
- [ ] Shared family/group wishlists
- [ ] Public/private visibility settings
- [ ] Invite system with access tokens
- [ ] Permission levels (owner, editor, viewer)

**Data Model**:
```typescript
export interface Wishlist {
  id: string;
  name: string;
  ownerId: string;
  visibility: 'public' | 'private' | 'shared';
  collaborators: Array<{
    userId: string;
    role: 'owner' | 'editor' | 'viewer';
  }>;
  items: WishlistItem[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  ownedWishlists: string[];
  sharedWishlists: string[];
}
```

---

#### 4.2 Analytics Dashboard
**Priority**: Low
**Effort**: Medium

**Features**:
- [ ] Total items vs gifted items chart
- [ ] Gifting trends over time
- [ ] Most popular categories
- [ ] Average item price
- [ ] Gifting heatmap (who gifts when)

**Tech Stack**:
- Chart.js or Recharts for visualizations
- Export to PDF/CSV
- Shareable analytics links

---

#### 4.3 AI-Powered Features
**Priority**: Low
**Effort**: High

**Features**:
- [ ] Gift suggestions based on wishlist items
- [ ] Auto-categorization of items
- [ ] Price prediction (will it go on sale?)
- [ ] Duplicate detection
- [ ] Smart image suggestions

**Implementation**:
```typescript
// Use OpenAI API for suggestions
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getSuggestions(wishlistItems: WishlistItem[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a gift recommendation assistant.',
      },
      {
        role: 'user',
        content: `Based on these wishlist items: ${JSON.stringify(wishlistItems)}, suggest 5 similar gift ideas.`,
      },
    ],
  });

  return response.choices[0].message.content;
}
```

---

#### 4.4 Mobile App (PWA)
**Priority**: Medium
**Effort**: High

**Features**:
- [ ] Progressive Web App configuration
- [ ] Add to home screen
- [ ] Offline support
- [ ] Push notifications
- [ ] Camera for product scanning

**Implementation**:
```typescript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // ... other config
});

// public/manifest.json
{
  "name": "Digital Wishlist",
  "short_name": "Wishlist",
  "icons": [...],
  "theme_color": "#4F46E5",
  "background_color": "#FFFFFF",
  "display": "standalone",
  "start_url": "/tools/digital-wishlist"
}
```

---

## Migration Strategies

### From JSON to PostgreSQL

**When to Migrate**:
- More than 500 items in wishlist
- More than 10 concurrent users
- Need complex queries (search, joins)
- Need transactions or data consistency guarantees

**Migration Steps**:

**1. Set up database**:
```sql
CREATE TABLE wishlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  product_url TEXT NOT NULL,
  geizhals_url TEXT,
  idealo_url TEXT,
  image_url TEXT,
  is_gifted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_is_gifted ON wishlist_items(is_gifted);
CREATE INDEX idx_created_at ON wishlist_items(created_at DESC);
```

**2. Create storage adapter**:
```typescript
// lib/storage/postgres.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getAllItems(): Promise<WishlistItem[]> {
  const result = await pool.query('SELECT * FROM wishlist_items ORDER BY created_at DESC');
  return result.rows.map(mapRowToItem);
}

export async function createItem(data: Omit<WishlistItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<WishlistItem> {
  const result = await pool.query(
    `INSERT INTO wishlist_items (title, description, product_url, geizhals_url, idealo_url, image_url, is_gifted)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [data.title, data.description, data.productUrl, data.geizhalsUrl, data.idealoUrl, data.imageUrl, false]
  );
  return mapRowToItem(result.rows[0]);
}

// ... implement update, delete
```

**3. Update API routes**:
```typescript
// api/wishlist/route.ts
import * as storage from '@/lib/storage/postgres';

export async function GET() {
  const items = await storage.getAllItems();
  return NextResponse.json(items);
}
```

**4. Migrate data**:
```typescript
// scripts/migrate-json-to-postgres.ts
import { readFile } from 'fs/promises';
import * as storage from './lib/storage/postgres';

async function migrate() {
  const json = await readFile('data/wishlist.json', 'utf-8');
  const data = JSON.parse(json);

  for (const item of data.items) {
    await storage.createItem(item);
  }

  console.log(`Migrated ${data.items.length} items`);
}

migrate();
```

**5. Backup old data**:
```bash
mv data/wishlist.json data/wishlist.backup.$(date +%Y%m%d).json
```

---

### From Single to Multi-Tenant

**When to Migrate**:
- Need user-specific wishlists
- Multiple families using the app
- Privacy concerns

**Migration Steps**:

**1. Add user context**:
```typescript
export interface WishlistItem {
  // ... existing fields
  userId: string;  // Owner of the item
  wishlistId: string;  // Which wishlist it belongs to
}

export interface Wishlist {
  id: string;
  name: string;
  userId: string;
  visibility: 'public' | 'private' | 'shared';
}
```

**2. Update API to filter by user**:
```typescript
export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const items = await storage.getItemsByUserId(session.user.id);
  return NextResponse.json(items);
}
```

**3. Add wishlist switcher UI**:
```tsx
<select value={currentWishlistId} onChange={(e) => setCurrentWishlistId(e.target.value)}>
  {wishlists.map(wishlist => (
    <option key={wishlist.id} value={wishlist.id}>
      {wishlist.name}
    </option>
  ))}
</select>
```

---

## Scalability Considerations

### Current Capacity

**Limits**:
- **Items**: ~1,000 items before noticeable slowdown
- **Concurrent Users**: ~10 simultaneous editors (file locking issues)
- **API Requests**: Limited by Next.js serverless function limits
- **Storage**: Unlimited (JSON file size negligible)

### Scaling Solutions

#### For More Items
**Problem**: Large JSON file slows down reads/writes

**Solution 1**: Pagination
```typescript
// Load items in chunks
const ITEMS_PER_PAGE = 50;
const paginatedItems = allItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
```

**Solution 2**: Lazy loading
```typescript
// Load images on scroll
<Image
  src={item.imageUrl}
  loading="lazy"
  alt={item.title}
/>
```

**Solution 3**: Database migration (see above)

---

#### For More Users
**Problem**: Concurrent writes cause race conditions

**Solution 1**: File locking
```typescript
import lockfile from 'proper-lockfile';

async function writeWishlistData(data: WishlistData) {
  const release = await lockfile.lock(DATA_FILE_PATH, {
    retries: {
      retries: 5,
      minTimeout: 100,
      maxTimeout: 1000,
    },
  });

  try {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2));
  } finally {
    await release();
  }
}
```

**Solution 2**: Optimistic locking with version numbers
```typescript
export interface WishlistData {
  version: number;
  items: WishlistItem[];
}

// Check version before write
if (data.version !== expectedVersion) {
  throw new Error('Concurrent modification detected');
}
```

**Solution 3**: Database with proper transactions

---

#### For Global Scale
**Problem**: Single server can't handle worldwide traffic

**Solutions**:
1. **CDN**: Use Vercel Edge Network for static assets
2. **Database Replication**: Read replicas in multiple regions
3. **Caching**: Redis cache for frequently accessed data
4. **Horizontal Scaling**: Multiple Next.js instances behind load balancer

---

## Alternative Implementations

### Option 1: Server Components Only

**Approach**: Use React Server Components for rendering

**Pros**:
- Zero JavaScript for static content
- Faster initial page load
- Better SEO

**Cons**:
- No client-side interactivity (toggle gifted)
- Need to use Server Actions for mutations

**When to Use**:
- SEO is critical
- Interactivity is minimal
- Server-side rendering preferred

---

### Option 2: API + Separate Frontend

**Approach**: Build API with Express.js, frontend with React SPA

**Pros**:
- Clear separation of concerns
- Can build mobile app using same API
- Easier to test API independently

**Cons**:
- More complex deployment
- Need CORS configuration
- Two separate codebases

**When to Use**:
- Building mobile app
- API will be used by third parties
- Team specialized in frontend/backend

---

### Option 3: Firebase/Supabase Backend

**Approach**: Use BaaS (Backend as a Service) instead of custom API

**Pros**:
- Real-time updates out of the box
- Authentication included
- No server management
- Generous free tier

**Cons**:
- Vendor lock-in
- Cost at scale
- Less control

**When to Use**:
- Need real-time features
- Want to focus on frontend
- Small team, limited backend expertise

---

## Conclusion

This document provides a comprehensive guide for future development of the Digital Wishlist feature. The architecture decisions documented here reflect the current requirements and constraints, but are flexible enough to evolve as needs change.

**Key Takeaways**:
1. JSON storage is sufficient for current scale
2. Optimistic UI provides best user experience
3. Server-side scraping avoids CORS issues
4. TypeScript catches errors early
5. Future migration paths are well-defined

**Next Steps**:
1. Add authentication (Phase 2)
2. Implement delete confirmation (Phase 2)
3. Plan database migration if item count > 500
4. Consider price tracking integration (Phase 3)

---

**Document Version**: 1.0.0
**Last Updated**: 2025-11-04
**Maintained By**: Development Team
