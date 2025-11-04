# Prepared Test Files for Feature Branches

This directory contains ready-to-use test files for the various feature branches.

## Directory Structure

```
tests-for-branches/
├── technical-documentation-system/
│   ├── lib/
│   │   └── auth.test.ts              # Authentication tests
│   ├── api/
│   │   ├── instructions/
│   │   │   └── route.test.ts         # Instructions API tests
│   │   └── wishlist/
│   │       └── route.test.ts         # Wishlist API tests
│   └── README.md                      # Branch-specific instructions
└── README.md                          # This file
```

## How to Use

### For `feature/technical-documentation-system` Branch

1. **Switch to the branch:**
   ```bash
   git checkout feature/technical-documentation-system
   ```

2. **Create test directories:**
   ```bash
   mkdir -p src/lib/__tests__
   mkdir -p src/app/api/instructions/__tests__
   mkdir -p src/app/api/wishlist/__tests__
   ```

3. **Copy test files:**
   ```bash
   cp tests-for-branches/technical-documentation-system/lib/auth.test.ts \
      src/lib/__tests__/

   cp tests-for-branches/technical-documentation-system/api/instructions/route.test.ts \
      src/app/api/instructions/__tests__/

   cp tests-for-branches/technical-documentation-system/api/wishlist/route.test.ts \
      src/app/api/wishlist/__tests__/
   ```

4. **Run tests:**
   ```bash
   pnpm test
   ```

5. **Expected results:**
   - 50+ tests should pass
   - Coverage should be ~60-70% for tested modules

### For `wishlist-component` Branch

1. **Switch to the branch:**
   ```bash
   git checkout wishlist-component
   ```

2. **Copy applicable tests:**
   ```bash
   mkdir -p src/app/api/wishlist/__tests__
   cp tests-for-branches/technical-documentation-system/api/wishlist/route.test.ts \
      src/app/api/wishlist/__tests__/
   ```

3. **Create middleware tests** (needs custom implementation due to WorkOS):
   ```bash
   mkdir -p src/__tests__
   # Create middleware.test.ts manually (see branch README)
   ```

### For `dev` Branch

The `dev` branch requires extensive custom tests due to its many features. Use the prepared tests as templates and create new tests following the same patterns.

## Test Coverage Goals

| Module | Target Coverage | Tests Prepared |
|--------|----------------|----------------|
| Authentication | 90% | ✅ Yes |
| Wishlist API | 85% | ✅ Yes |
| Instructions API | 85% | ✅ Yes |
| UI Components | 70% | ❌ No (branch-specific) |
| Middleware | 80% | ❌ No (branch-specific) |

## Notes

- All prepared tests use Jest and React Testing Library
- Tests follow the Arrange-Act-Assert pattern
- Mocks are properly configured for Next.js modules
- Each test file includes inline documentation

## Need Help?

Refer to:
- Main project's CODE_REVIEW_REPORT.md for detailed guidance
- jest.config.ts for test configuration
- jest.setup.ts for global test setup
