# Platzer.dev - Comprehensive Instruction Synthesis

**Version**: 1.0.0  
**Last Updated**: 2025-11-04  
**Purpose**: Central repository of all implementation instructions, decisions, and patterns across branches

---

## Table of Contents

1. [Overview](#overview)
2. [Branch Analysis](#branch-analysis)
3. [Synthesized Instructions](#synthesized-instructions)
4. [Architecture Patterns](#architecture-patterns)
5. [Development Guidelines](#development-guidelines)
6. [Future Enhancements](#future-enhancements)
7. [Versioning System](#versioning-system)

---

## Overview

This document synthesizes all instructions, patterns, and implementation decisions from across the repository's branches. It serves as the single source of truth for:

- Feature implementation patterns
- Architecture decisions
- Code conventions
- Best practices
- Known issues and their resolutions
- Future development roadmap

### Branches Analyzed

| Branch | Purpose | Key Features | Status |
|--------|---------|--------------|--------|
| `main` | Production | Base Next.js setup | ✅ Stable |
| `dev` | Development | ETF tracker, Coffee tools, WorkOS auth, Documentation | ✅ Active |
| `claude/wishlist-component-nextjs-011CUoE4NQ5wgQpiPa9J4Fu6` | Feature branch | Digital Wishlist with image scraping | ✅ Complete |

---

## Branch Analysis

### Main Branch

**Purpose**: Production-ready baseline

**Key Commits**:
- `537566b` - Tailwind CSS dependency fixes
- `892edc7` - Added 404 page
- `877b723` - Updated packages

**Instructions Extracted**:
- Maintain minimal, stable codebase
- Only merge tested features from dev branches

---

### Dev Branch

**Purpose**: Integration branch for multiple features

**Major Features Implemented**:

#### 1. ETF Tracker Integration
**Source**: `CONVERSATION_SUMMARY.md`, `ETF_API_INTEGRATION.md`

**Instructions**:
- Python FastAPI backend using UV package manager (10-100x faster than pip)
- Next.js frontend integration via `/src/lib/etf-api.ts`
- Environment variable: `NEXT_PUBLIC_ETF_API_URL=http://localhost:8000`
- API client functions: `fetchETFHistory`, `fetchLatestPrice`, `fetchETFInfo`
- TypeScript types for all ETF data structures
- Page location: `/etf-test` and `/etf-tracker`

**Key Decisions**:
- Use UV over pip for Python dependencies
- Server-side data fetching with Next.js revalidation
- Yahoo Finance ticker format (e.g., `2B7K.DE`)

**Files Created**:
- `/src/lib/etf-api.ts` - API client
- `/src/app/etf-test/page.tsx` - Test page
- `/src/app/etf-tracker/page.jsx` - Main tracker
- Multiple documentation files in `/src/app/etf-tracker/`

#### 2. Coffee Tools Suite
**Source**: `docs/coffee-tools.md`, `DOCS_IMPLEMENTATION.md`

**Features**:
- Coffee Flavour Wheel (interactive visualization)
- Water Crafter (recipe calculator)
- Cupping Scoring Tool
- Inventory Management

**Instructions**:
- Use D3.js for data visualizations
- Implement responsive mobile-first design
- Store recipes/data in `/src/app/seed/` directory
- Component pattern: form + preview + calculation logic

**Files**:
- `/src/app/coffee-tools/flavour-wheel/page.tsx`
- `/src/app/coffee-tools/water-crafter/page.tsx`
- `/src/app/coffee-tools/cupping-tool/page.tsx`
- `/src/app/seed/taste_notes.ts`
- `/src/app/seed/water-for-coffee-recipes.ts`

#### 3. WorkOS Authentication
**Source**: `WORKOS_DIAGNOSTIC.md`, `WORKOS_FIX_APPLIED.md`, `WORKOS_REDIRECT_FIX.md`

**Issue**: Redirect URI mismatch causing authentication failures

**Solution Applied**:
- Environment variables properly configured
- Middleware setup at `/src/middleware.ts`
- Callback route: `/src/app/callback/route.ts`
- Login route: `/src/app/login/route.ts`

**Key Environment Variables**:
```bash
WORKOS_API_KEY=sk_...
WORKOS_CLIENT_ID=client_...
WORKOS_REDIRECT_URI=http://localhost:3000/callback
WORKOS_COOKIE_PASSWORD=... (32+ chars)
```

**Instructions**:
- Never commit `.env.local` to git
- Use `.env.local.example` for templates
- Validate redirect URIs match WorkOS dashboard exactly
- Implement session management with secure cookies

#### 4. User Documentation System
**Source**: `DOCS_IMPLEMENTATION.md`, `/docs/*.md`

**Instructions**:
- Create comprehensive user-facing docs at `/docs` route
- Use shadcn/ui components (Accordion, Card, Separator)
- Implement `DocLayout.tsx` with automatic TOC sidebar
- Structure: Landing page → Category pages → FAQ
- Include disclaimers for financial/investment tools
- Mobile-responsive with sticky navigation

**Files**:
- `/src/app/docs/page.tsx` - Docs landing
- `/src/app/docs/coffee-tools/page.tsx`
- `/src/app/docs/etf-tracker/page.tsx`
- `/src/app/docs/general-tools/page.tsx`
- `/src/app/docs/faq/page.tsx`
- `/src/components/DocLayout.tsx`

---

### Wishlist Feature Branch

**Purpose**: Digital wishlist with image scraping

**Source**: `/transcripts/*.md` (5 comprehensive documents)

#### Complete Implementation Details

**Architecture Decision Records (ADRs)**:

1. **ADR-001**: Use JSON file storage instead of database
   - Rationale: Client requirement, simplicity, zero cost
   - File: `/data/wishlist.json`
   - Migration path: Move to PostgreSQL when > 500 items

2. **ADR-002**: Implement optimistic UI updates
   - Update UI immediately, rollback on error
   - Better perceived performance

3. **ADR-003**: Image scraping with fallback
   - Primary: Scrape Open Graph images from product URLs
   - Fallback: Allow manual image URL input
   - Timeout: 10 seconds

**TypeScript Types** (`/src/app/types/wishlist.ts`):
```typescript
interface WishlistItem {
  id: string;              // UUID
  title: string;
  description: string;
  productUrl: string;
  geizhalsUrl?: string;
  idealoUrl?: string;
  imageUrl?: string;
  isGifted: boolean;
  createdAt: string;
  updatedAt: string;
}
```

**API Endpoints**:
- `GET /api/wishlist` - List all items
- `POST /api/wishlist` - Create new item
- `GET /api/wishlist/[id]` - Get single item
- `PATCH /api/wishlist/[id]` - Update item
- `DELETE /api/wishlist/[id]` - Delete item
- `POST /api/scrape-image` - Scrape image from URL

**Pages**:
- `/tools/digital-wishlist` - Display page (public)
- `/tools/digital-wishlist/edit` - Edit page (to be auth-protected)

**Key Features**:
- Responsive card grid layout
- Real-time image scraping with loading states
- Mark as gifted with visual indicators
- Price comparison links (Geizhals, Idealo)
- Form validation with Headless UI
- Empty state messaging

**Implementation Pattern**:
1. Data layer (types, JSON storage)
2. API routes (CRUD operations)
3. Display page (read-only public view)
4. Edit page (admin interface)
5. Image scraping service
6. Navigation integration

**Bundle Sizes**:
- Display page: 2.85 kB
- Edit page: 5.66 kB
- Excellent performance metrics

**Future Enhancements Documented**:
- Multi-user support with authentication
- Categories/tags for organization
- Search and filtering
- Image upload (not just scraping)
- Email notifications when gifted
- Export to CSV/PDF
- Priority levels
- Migration to database

---

## Synthesized Instructions

### 1. Project Structure Pattern

**Instruction**: Follow consistent file organization

```
src/
├── app/
│   ├── api/              # API routes
│   │   └── [feature]/    # Feature-specific endpoints
│   ├── [feature]/        # Feature pages
│   ├── components/       # Shared components
│   ├── types/           # TypeScript definitions
│   ├── utils/           # Utility functions
│   ├── seed/            # Seed/static data
│   └── hooks/           # Custom React hooks
├── components/          # UI components (shadcn)
└── lib/                # External integrations
data/                   # JSON data files
docs/                   # Markdown documentation
transcripts/           # Implementation transcripts
```

### 2. API Route Pattern

**Instruction**: Consistent API implementation

```typescript
// route.ts structure
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', '[feature].json');

async function readData() {
  // Read with error handling
}

async function writeData() {
  // Write with proper formatting
}

export async function GET(request: NextRequest) {
  // List/retrieve
}

export async function POST(request: NextRequest) {
  // Create
}
```

### 3. TypeScript Typing Pattern

**Instruction**: Define comprehensive types

```typescript
// types/[feature].ts
export interface MainEntity {
  id: string;              // Always UUID
  // ... fields
  createdAt: string;       // ISO string
  updatedAt: string;       // ISO string
}

export interface Collection {
  metadata: {
    version: string;
    lastUpdated: string;
    // ... stats
  };
  items: MainEntity[];
}
```

### 4. Component Pattern

**Instruction**: Functional components with hooks

```typescript
'use client';

import { useState, useEffect } from 'react';

export default function FeaturePage() {
  const [data, setData] = useState<Type[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Render with loading, error, and data states
}
```

### 5. Form Pattern (with Headless UI)

**Instruction**: Use Dialog, Listbox, and controlled inputs

```typescript
import { Dialog, Listbox } from '@headlessui/react';

// State management
const [formData, setFormData] = useState<FormType>(defaultValues);

// Validation
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Validate
  // API call
  // Handle success/error
};
```

### 6. Documentation Pattern

**Instruction**: Each feature needs comprehensive docs

**Required Documents**:
1. **Implementation Transcript** - How it was built
2. **Executive Summary** - What and why
3. **Technical Reference** - API, types, components
4. **Quick Start Guide** - How to use
5. **Architecture Decisions** - Why decisions were made

**Location**: `/transcripts/[feature]/` or `/docs/[feature]/`

### 7. Environment Variables Pattern

**Instruction**: Proper env var management

```bash
# .env.local (never commit)
API_KEY=secret_value
PUBLIC_URL=http://localhost:3000

# .env.local.example (commit this)
API_KEY=your_api_key_here
PUBLIC_URL=http://localhost:3000
```

**Usage**:
- Client-side: `NEXT_PUBLIC_*` prefix
- Server-side: No prefix needed
- Always document in example file

### 8. Git Workflow Pattern

**Instruction**: Branch and commit conventions

**Branch Naming**:
- `feature/[name]` - New features
- `bugfix/[name]` - Bug fixes
- `claude/[description]-[id]` - AI-assisted development

**Commit Messages**:
- `feat: Add digital wishlist feature`
- `fix: Resolve WorkOS redirect issue`
- `docs: Update ETF tracker documentation`
- `refactor: Improve API error handling`
- `chore: Update dependencies`

### 9. Testing Pattern

**Instruction**: Test before merging

**Checklist**:
- [ ] Build succeeds: `pnpm build`
- [ ] No lint errors: `pnpm lint`
- [ ] Manual testing of new features
- [ ] Check mobile responsiveness
- [ ] Verify API endpoints with curl/Postman
- [ ] Test error states
- [ ] Verify loading states

### 10. Security Pattern

**Instruction**: Security best practices

**Never Commit**:
- API keys
- Passwords
- Session secrets
- `.env.local` file

**Always**:
- Use environment variables
- Validate user input
- Sanitize data before storage
- Use HTTPS in production
- Implement rate limiting on APIs
- Add CORS headers appropriately

---

## Architecture Patterns

### State Management

**Pattern**: React hooks for local state, API for persistence

```typescript
// Local state
const [items, setItems] = useState<Item[]>([]);

// Fetch on mount
useEffect(() => {
  async function fetchItems() {
    const response = await fetch('/api/items');
    const data = await response.json();
    setItems(data.items);
  }
  fetchItems();
}, []);

// Optimistic updates
const handleUpdate = async (id: string, updates: Partial<Item>) => {
  // Update UI immediately
  setItems(prev => prev.map(item => 
    item.id === id ? { ...item, ...updates } : item
  ));
  
  // Call API
  try {
    await fetch(`/api/items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  } catch (error) {
    // Rollback on error
    fetchItems(); // Re-fetch to restore state
  }
};
```

### Data Persistence

**Pattern**: JSON files for MVP, database for scale

**Current**: JSON files in `/data/` directory
**Future**: PostgreSQL/MongoDB with Prisma ORM

**Migration Strategy**:
1. Keep API interface unchanged
2. Create database adapter
3. Run one-time data migration script
4. Switch data source in API routes
5. Remove JSON file reads

### API Design

**Pattern**: RESTful with Next.js conventions

```
GET    /api/resource       - List all
POST   /api/resource       - Create one
GET    /api/resource/[id]  - Get one
PATCH  /api/resource/[id]  - Update one
DELETE /api/resource/[id]  - Delete one
```

**Response Format**:
```json
{
  "data": {},
  "metadata": {},
  "error": null
}
```

### Error Handling

**Pattern**: Consistent error responses

```typescript
return NextResponse.json(
  { 
    error: 'Human-readable message',
    details: error.message,
    code: 'ERROR_CODE'
  },
  { status: 400 }
);
```

### Component Composition

**Pattern**: Small, reusable components

```
Page Component
├── Layout Component
├── List Component
│   └── Item Component
├── Form Component
│   ├── Input Components
│   └── Button Component
└── Modal Component
```

---

## Development Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Consistent with project's existing code
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Only for complex logic, not obvious code
- **Imports**: Group by external, internal, relative

### Performance

- **Bundle Size**: Keep pages under 10 kB gzipped
- **Images**: Use Next.js Image component
- **Code Splitting**: Dynamic imports for heavy components
- **Caching**: Use Next.js revalidation for API data

### Accessibility

- **Semantic HTML**: Use proper tags (button, nav, etc.)
- **ARIA labels**: Add where needed
- **Keyboard navigation**: Ensure all interactive elements accessible
- **Color contrast**: WCAG AA compliant

### Mobile-First

- **Responsive**: Design for mobile first, scale up
- **Touch targets**: Minimum 44x44px
- **Viewport**: Proper meta tags
- **Testing**: Test on actual devices

---

## Future Enhancements

### High Priority

1. **Authentication System** (WorkOS already integrated in dev)
   - Protect admin routes
   - User-specific wishlists
   - Role-based access control

2. **Database Migration**
   - PostgreSQL with Prisma
   - Multi-tenant architecture
   - Better querying and performance

3. **Search & Filtering**
   - Full-text search across all tools
   - Category filtering
   - Date range filters

### Medium Priority

4. **Image Handling**
   - Direct image uploads
   - Image optimization
   - CDN integration

5. **Notifications**
   - Email notifications
   - In-app notifications
   - Webhook support

6. **Export/Import**
   - CSV export
   - PDF generation
   - Data import tools

### Low Priority

7. **Analytics**
   - Usage tracking
   - Feature adoption metrics
   - Performance monitoring

8. **Internationalization**
   - Multi-language support
   - Date/currency formatting
   - RTL support

9. **API Versioning**
   - Version endpoints (/api/v1/, /api/v2/)
   - Deprecation warnings
   - Migration guides

---

## Versioning System

### New: Instruction Management System

**Purpose**: Track all instructions, changes, and decisions with full version history

**Components**:

1. **Data Model** (`/src/app/types/instructions.ts`)
   - `Instruction` - Main entity with version history
   - `InstructionVersion` - Individual version with metadata
   - `InstructionSource` - Track origin (branch, commit, conversation)
   - `InstructionMetadata` - Tags, related files, dependencies

2. **Storage** (`/data/instructions.json`)
   - JSON file for MVP
   - Structured collection with metadata
   - Full version history preserved

3. **API Endpoints**:
   - `GET /api/instructions` - List with filtering
   - `POST /api/instructions` - Create new instruction
   - `GET /api/instructions/[id]` - Get single instruction
   - `PATCH /api/instructions/[id]` - Update (creates new version)
   - `DELETE /api/instructions/[id]` - Remove instruction
   - `GET /api/instructions/[id]/versions` - Get version history
   - `GET /api/instructions?stats=true` - Get statistics

4. **Categories**:
   - feature, bugfix, refactor, documentation
   - configuration, dependency, security, performance
   - ui-ux, api, testing

5. **Status Tracking**:
   - pending → in-progress → completed
   - deprecated, superseded

### Usage

**Adding a New Instruction**:
```typescript
POST /api/instructions
{
  "title": "Implement user authentication",
  "description": "Add WorkOS-based authentication",
  "category": "feature",
  "priority": "high",
  "status": "pending",
  "source": {
    "type": "branch",
    "branch": "dev",
    "author": "claude",
    "timestamp": "2025-11-04T12:00:00Z"
  },
  "metadata": {
    "tags": ["auth", "security", "workos"],
    "relatedFiles": ["/src/middleware.ts", "/src/app/login/route.ts"],
    "estimatedEffort": "2 days"
  },
  "content": "Full instruction details here..."
}
```

**Updating an Instruction** (creates new version):
```typescript
PATCH /api/instructions/[id]
{
  "createVersion": true,
  "description": "Updated authentication flow to include 2FA",
  "status": "in-progress",
  "changes": "Added two-factor authentication requirement"
}
```

**Querying Instructions**:
```
GET /api/instructions?category=feature&status=pending&priority=high
GET /api/instructions?tags=auth,security
GET /api/instructions?search=authentication
GET /api/instructions?branch=dev
GET /api/instructions?stats=true
```

### Benefits

1. **Full History**: Never lose context of why decisions were made
2. **Traceability**: Link instructions to branches, commits, conversations
3. **Searchability**: Find relevant instructions by category, tags, content
4. **Versioning**: Track how instructions evolve over time
5. **Statistics**: Monitor completion rates, effort estimates
6. **Documentation**: Automatic documentation of development process

### Future UI Components (Planned)

- Instruction dashboard with stats
- Timeline view of version history
- Search and filter interface
- Instruction editor with markdown support
- Dependency graph visualization
- Export to various formats

---

## Conclusion

This synthesis document serves as the central reference for all development on platzer.dev. It captures:

- ✅ All major features implemented across branches
- ✅ Architecture decisions and rationale
- ✅ Consistent patterns and conventions
- ✅ Development guidelines and best practices
- ✅ Future enhancement roadmap
- ✅ New versioning/tracing system for instructions

**Maintenance**: This document should be updated whenever:
- New features are added
- Architecture decisions are made
- Patterns are established or changed
- Instructions are extracted from new branches
- The versioning system is enhanced

**Version History**:

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-11-04 | Initial synthesis across all branches | Claude AI |

---

**Next Steps**:

1. ✅ Implement instruction versioning system (API + storage)
2. ⏸ Create UI for viewing/managing instructions
3. ⏸ Populate system with instructions from all branches
4. ⏸ Integrate with documentation system
5. ⏸ Add instruction templates for common patterns

For questions or additions, refer to the specific branch documentation or create a new instruction entry in the versioning system.
