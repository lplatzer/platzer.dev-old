# Instruction Management & Versioning System

**Version**: 1.0.0  
**Status**: ✅ Implemented  
**Purpose**: Track all implementation instructions, changes, and decisions with full version history

---

## Overview

This system provides comprehensive tracking of all instructions, implementation decisions, and changes across the codebase. It enables:

- **Full Version History**: Track how instructions evolve over time
- **Source Tracing**: Link instructions to specific branches, commits, or conversations
- **Categorization**: Organize by type (feature, bugfix, security, etc.)
- **Status Tracking**: Monitor progress from pending to completed
- **Search & Filtering**: Find relevant instructions quickly
- **Statistics**: Monitor completion rates and workload

---

## Quick Start

### Accessing the System

1. **View Instructions**: Navigate to `/admin/instructions`
2. **API Documentation**: See API endpoints below
3. **Synthesis Document**: Read `INSTRUCTIONS_SYNTHESIS.md`

### Creating a New Instruction

```bash
curl -X POST http://localhost:3000/api/instructions \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implement user authentication",
    "description": "Add WorkOS-based authentication to protect admin routes",
    "category": "feature",
    "priority": "high",
    "status": "pending",
    "source": {
      "type": "branch",
      "branch": "dev",
      "author": "developer-name",
      "timestamp": "2025-11-04T12:00:00Z"
    },
    "metadata": {
      "tags": ["auth", "security", "workos"],
      "relatedFiles": ["/src/middleware.ts", "/src/app/login/route.ts"],
      "estimatedEffort": "2 days"
    },
    "content": "Detailed instruction content here..."
  }'
```

### Updating an Instruction (Creates New Version)

```bash
curl -X PATCH http://localhost:3000/api/instructions/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "createVersion": true,
    "description": "Updated authentication flow to include 2FA",
    "status": "in-progress",
    "changes": "Added two-factor authentication requirement"
  }'
```

---

## System Architecture

### Components

```
Instruction System
├── Types (/src/app/types/instructions.ts)
│   ├── Instruction
│   ├── InstructionVersion
│   ├── InstructionSource
│   ├── InstructionMetadata
│   ├── InstructionFilter
│   └── InstructionStats
├── Storage (/data/instructions.json)
│   └── InstructionCollection
├── API Routes
│   ├── /api/instructions (GET, POST)
│   ├── /api/instructions/[id] (GET, PATCH, DELETE)
│   └── /api/instructions/[id]/versions (GET)
├── UI (/admin/instructions)
│   ├── Dashboard with statistics
│   ├── Search and filtering
│   ├── Instruction list view
│   └── Detail view with version history
└── Documentation
    ├── INSTRUCTIONS_SYNTHESIS.md
    └── INSTRUCTION_SYSTEM_README.md
```

### Data Model

```typescript
interface Instruction {
  id: string;                    // UUID
  currentVersion: number;        // Latest version number
  latestVersionId: string;       // UUID of latest version
  title: string;
  category: InstructionCategory;
  status: InstructionStatus;
  priority: InstructionPriority;
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
  versions: InstructionVersion[];
  synthesizedFrom?: string[];    // Source instruction IDs
}

interface InstructionVersion {
  versionId: string;
  instructionId: string;
  version: number;
  title: string;
  description: string;
  category: InstructionCategory;
  priority: InstructionPriority;
  status: InstructionStatus;
  source: InstructionSource;
  metadata: InstructionMetadata;
  content: string;
  createdAt: string;
  createdBy: string;
  changes?: string;
}
```

---

## API Reference

### List Instructions

```http
GET /api/instructions
```

**Query Parameters**:
- `category` - Filter by category (comma-separated)
- `status` - Filter by status (comma-separated)
- `priority` - Filter by priority (comma-separated)
- `tags` - Filter by tags (comma-separated)
- `search` - Search in title and description
- `branch` - Filter by source branch
- `dateFrom` - Filter by date range start
- `dateTo` - Filter by date range end
- `stats` - Set to 'true' to get statistics instead of list

**Response**:
```json
{
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2025-11-04T12:00:00Z",
    "totalInstructions": 42,
    "branches": ["main", "dev"],
    "commits": ["abc123", "def456"]
  },
  "instructions": [...],
  "count": 15
}
```

### Get Statistics

```http
GET /api/instructions?stats=true
```

**Response**:
```json
{
  "total": 42,
  "byCategory": {
    "feature": 15,
    "bugfix": 8,
    "security": 5
  },
  "byStatus": {
    "completed": 30,
    "in-progress": 5,
    "pending": 7
  },
  "byPriority": {
    "high": 10,
    "medium": 20,
    "low": 12
  },
  "completionRate": 71.43
}
```

### Create Instruction

```http
POST /api/instructions
Content-Type: application/json

{
  "title": "Instruction title",
  "description": "Brief description",
  "category": "feature|bugfix|refactor|...",
  "priority": "low|medium|high|critical",
  "status": "pending",
  "source": {
    "type": "branch|commit|conversation|manual|documentation",
    "branch": "feature/new-feature",
    "author": "developer-name",
    "timestamp": "2025-11-04T12:00:00Z"
  },
  "metadata": {
    "tags": ["tag1", "tag2"],
    "relatedFiles": ["/path/to/file.ts"],
    "relatedInstructions": ["instruction-id"],
    "estimatedEffort": "2 days"
  },
  "content": "Full instruction content",
  "synthesizedFrom": ["source-instruction-id"]
}
```

**Response**: Created instruction object (201)

### Get Single Instruction

```http
GET /api/instructions/{id}
```

**Response**: Complete instruction with all versions

### Update Instruction

```http
PATCH /api/instructions/{id}
Content-Type: application/json

{
  "createVersion": true,  // Create new version
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "priority": "high",
  "changes": "What changed in this version"
}
```

**Note**: If `createVersion` is true, a new version is created. Otherwise, only the instruction metadata is updated.

### Delete Instruction

```http
DELETE /api/instructions/{id}
```

**Response**: Confirmation message

### Get Version History

```http
GET /api/instructions/{id}/versions
```

**Response**:
```json
{
  "instructionId": "uuid",
  "currentVersion": 3,
  "totalVersions": 3,
  "versions": [...]
}
```

---

## Categories

Instructions can be categorized as:

- `feature` - New feature implementation
- `bugfix` - Bug fixes and corrections
- `refactor` - Code refactoring without behavior change
- `documentation` - Documentation updates
- `configuration` - Configuration changes
- `dependency` - Dependency updates
- `security` - Security-related changes
- `performance` - Performance optimizations
- `ui-ux` - User interface/experience improvements
- `api` - API changes
- `testing` - Test additions or modifications

---

## Status Lifecycle

```
pending → in-progress → completed
              ↓
          deprecated
              ↓
          superseded
```

- **pending**: Not yet started
- **in-progress**: Currently being worked on
- **completed**: Finished and verified
- **deprecated**: No longer relevant
- **superseded**: Replaced by another instruction

---

## Priority Levels

- **critical**: Must be done immediately, blocks other work
- **high**: Important, should be done soon
- **medium**: Normal priority
- **low**: Nice to have, can be deferred

---

## Usage Examples

### Querying by Category and Status

```bash
# Get all pending features
curl "http://localhost:3000/api/instructions?category=feature&status=pending"

# Get all high priority items in progress
curl "http://localhost:3000/api/instructions?priority=high&status=in-progress"
```

### Searching Instructions

```bash
# Search for authentication-related instructions
curl "http://localhost:3000/api/instructions?search=authentication"

# Filter by tags
curl "http://localhost:3000/api/instructions?tags=security,auth"
```

### Branch-Specific Instructions

```bash
# Get instructions from dev branch
curl "http://localhost:3000/api/instructions?branch=dev"
```

### Date Range Queries

```bash
# Get instructions updated in last week
curl "http://localhost:3000/api/instructions?dateFrom=2025-10-28&dateTo=2025-11-04"
```

---

## UI Features

### Dashboard (`/admin/instructions`)

- **Statistics Cards**: Total, completed, in-progress, completion rate
- **Search Bar**: Full-text search across title and description
- **Filter Pills**: Quick filtering by category, status, priority
- **Instruction Cards**: Clickable cards showing key info
- **Detail Modal**: Full version history and metadata

### Filtering

Click on category, status, or priority pills to filter. Multiple selections work with OR logic within a filter type and AND logic across filter types.

Example:
- Categories: feature OR bugfix
- Status: pending OR in-progress
- Result: (feature OR bugfix) AND (pending OR in-progress)

---

## Integration with Existing Documentation

### Synthesis Document

`INSTRUCTIONS_SYNTHESIS.md` provides:
- Overview of all branches
- Extracted instructions from existing work
- Architecture patterns
- Development guidelines
- Future enhancements

### Relationship

```
INSTRUCTIONS_SYNTHESIS.md  (Static documentation)
           ↓
Instruction System         (Dynamic tracking)
           ↓
Version History            (Audit trail)
```

The synthesis document can be used to populate the instruction system with initial data.

---

## Best Practices

### Creating Instructions

1. **Be Specific**: Clear, actionable titles
2. **Add Context**: Explain why, not just what
3. **Link Resources**: Reference related files and instructions
4. **Estimate Effort**: Help with planning
5. **Tag Appropriately**: Aid in discovery

### Updating Instructions

1. **Create Versions**: Use `createVersion: true` for significant changes
2. **Document Changes**: Explain what changed in the `changes` field
3. **Update Status**: Keep status current as work progresses
4. **Link Dependencies**: Reference related instructions

### Maintaining the System

1. **Regular Updates**: Update status as work completes
2. **Deprecate Old**: Mark superseded instructions
3. **Review Statistics**: Monitor completion rates
4. **Clean Up**: Archive or delete truly obsolete items

---

## Migration Path

### Current: JSON File Storage

- Location: `/data/instructions.json`
- Suitable for: <1000 instructions
- Benefits: Simple, version-controllable

### Future: Database Storage

When the system grows:

1. **Choose Database**: PostgreSQL recommended
2. **Create Schema**: Map types to database tables
3. **Migration Script**: Convert JSON to database
4. **Update API Routes**: Swap storage backend
5. **Keep Interface**: API remains unchanged

### Database Schema (Future)

```sql
CREATE TABLE instructions (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL,
  priority TEXT NOT NULL,
  current_version INTEGER NOT NULL,
  latest_version_id UUID,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

CREATE TABLE instruction_versions (
  version_id UUID PRIMARY KEY,
  instruction_id UUID REFERENCES instructions(id),
  version INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  changes TEXT,
  created_at TIMESTAMP NOT NULL,
  created_by TEXT
);

CREATE TABLE instruction_sources (
  version_id UUID REFERENCES instruction_versions(version_id),
  source_type TEXT,
  branch TEXT,
  commit TEXT,
  timestamp TIMESTAMP
);
```

---

## Troubleshooting

### Instructions Not Showing

1. Check if `/data/instructions.json` exists
2. Verify JSON syntax is valid
3. Check API endpoint returns 200 status
4. Review browser console for errors

### Version History Not Saving

1. Ensure `createVersion: true` in PATCH request
2. Check API response for errors
3. Verify write permissions on data file

### Filters Not Working

1. Clear browser cache
2. Check URL parameters are correct
3. Verify API returns filtered results

### Performance Issues

- If >1000 instructions, consider database migration
- Enable pagination in API
- Add indexes for common queries

---

## Future Enhancements

### Planned Features

1. **Export/Import**
   - Export to CSV, JSON, Markdown
   - Import from external sources

2. **Dependency Graph**
   - Visualize instruction relationships
   - Detect circular dependencies

3. **Notifications**
   - Alert on status changes
   - Remind of pending items

4. **Collaboration**
   - Comments on instructions
   - Assignment to team members

5. **Templates**
   - Predefined instruction templates
   - Quick creation from patterns

6. **Analytics**
   - Velocity tracking
   - Effort estimation accuracy
   - Category trends over time

7. **Integration**
   - Git commit message parsing
   - Automatic instruction creation
   - CI/CD integration

---

## Contributing

### Adding New Categories

1. Update `InstructionCategory` type in `/src/app/types/instructions.ts`
2. Add color mapping in `/src/app/admin/instructions/page.tsx`
3. Update this README

### Adding New Status Types

1. Update `InstructionStatus` type
2. Add color mapping in UI
3. Update lifecycle diagram in README

### Improving UI

UI components are in:
- `/src/app/admin/instructions/page.tsx` - Main page
- Future: Split into smaller components

---

## Support

### Documentation

- **System Overview**: This README
- **Synthesis**: `INSTRUCTIONS_SYNTHESIS.md`
- **Types**: `/src/app/types/instructions.ts`
- **API Code**: `/src/app/api/instructions/`

### Questions

For questions or issues:
1. Check existing instructions in the system
2. Review synthesis document
3. Examine API response data
4. Check browser console for errors

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-11-04 | Initial implementation | Claude AI |

---

## License

Part of platzer.dev project. See main project LICENSE.

---

**Happy tracking! 📝✨**

The instruction management system helps maintain clarity and consistency across the entire development process. Use it to document decisions, track progress, and ensure nothing gets lost in the complexity of modern software development.
