# Instruction System - Quick Reference Card

## 🚀 Getting Started

### View Dashboard
```bash
http://localhost:3000/admin/instructions
```

### Read Documentation
1. **Start Here**: `INSTRUCTIONS_SYNTHESIS.md` - Complete synthesis of all branches
2. **System Guide**: `INSTRUCTION_SYSTEM_README.md` - How to use the system
3. **Summary**: `IMPLEMENTATION_SUMMARY.md` - What was built

---

## 📡 API Quick Reference

### List Instructions
```bash
GET /api/instructions
GET /api/instructions?category=feature&status=pending
GET /api/instructions?search=authentication
GET /api/instructions?stats=true
```

### Create Instruction
```bash
POST /api/instructions
Content-Type: application/json

{
  "title": "Feature title",
  "description": "What needs to be done",
  "category": "feature",
  "priority": "high",
  "source": {
    "type": "branch",
    "branch": "feature/new",
    "author": "your-name",
    "timestamp": "2025-11-04T12:00:00Z"
  },
  "metadata": {
    "tags": ["tag1", "tag2"],
    "relatedFiles": ["/path/to/file.ts"]
  }
}
```

### Update Instruction (Create New Version)
```bash
PATCH /api/instructions/{id}
Content-Type: application/json

{
  "createVersion": true,
  "status": "completed",
  "changes": "What changed in this version"
}
```

### Get Version History
```bash
GET /api/instructions/{id}/versions
```

---

## 🏷️ Categories

- `feature` - New features
- `bugfix` - Bug fixes
- `refactor` - Code refactoring
- `documentation` - Docs
- `configuration` - Config changes
- `dependency` - Dependencies
- `security` - Security updates
- `performance` - Optimizations
- `ui-ux` - UI/UX improvements
- `api` - API changes
- `testing` - Tests

---

## 📊 Status Types

```
pending → in-progress → completed
              ↓
          deprecated → superseded
```

---

## ⚡ Priority Levels

- `critical` - Blocks everything
- `high` - Important
- `medium` - Normal
- `low` - Nice to have

---

## 🎯 Common Queries

```bash
# All pending high-priority items
GET /api/instructions?priority=high&status=pending

# All security-related instructions
GET /api/instructions?category=security

# All items from dev branch
GET /api/instructions?branch=dev

# Search for auth
GET /api/instructions?search=auth

# Get statistics
GET /api/instructions?stats=true
```

---

## 📁 File Locations

```
Types:      src/app/types/instructions.ts
API:        src/app/api/instructions/
UI:         src/app/admin/instructions/page.tsx
Data:       data/instructions.json
Docs:       INSTRUCTIONS_SYNTHESIS.md
```

---

## 🔧 Local Development

```bash
# Start dev server
pnpm dev

# Visit dashboard
open http://localhost:3000/admin/instructions

# Test API
curl http://localhost:3000/api/instructions?stats=true

# Build
pnpm build
```

---

## 📖 Key Documents

| Document | Purpose | Lines |
|----------|---------|-------|
| `INSTRUCTIONS_SYNTHESIS.md` | Complete synthesis of all branches | 770 |
| `INSTRUCTION_SYSTEM_README.md` | System documentation | 616 |
| `IMPLEMENTATION_SUMMARY.md` | Implementation details | 405 |

---

## 💡 Tips

1. **Create versions** for significant changes (use `createVersion: true`)
2. **Tag appropriately** for easy discovery
3. **Link related files** to provide context
4. **Update status** as work progresses
5. **Use search** to find existing instructions before creating new ones

---

## 🎨 UI Features

Dashboard includes:
- Statistics cards (total, completed, in-progress, rate)
- Search bar (full-text)
- Filter pills (category, status, priority)
- Instruction cards (clickable)
- Detail modal (version history)

---

## 🔄 Version History Example

```typescript
Instruction: "Add user authentication"
├── v1: Initial requirement (pending)
├── v2: Started implementation (in-progress)
├── v3: Added 2FA requirement (in-progress)
└── v4: Completed and tested (completed)
```

Each version tracks:
- What changed
- Who made the change
- When it changed
- Full metadata snapshot

---

## 🚀 Future Migration

When ready for database:
1. Choose PostgreSQL + Prisma
2. Run migration script (documented)
3. API stays the same
4. No code changes needed

---

**Quick Access**: Keep this card handy for daily reference!
