# WorkOS Redirect URI Issue - Solutions

## Common Issues and Solutions

### Issue 1: Redirect URI Mismatch
**Error:** "Redirect URI mismatch" or "Invalid redirect URI"

**Cause:** The redirect URI in your code doesn't match what's configured in the WorkOS Dashboard.

**Solution:**

1. **Check your current redirect URI:**
   ```bash
   grep WORKOS_REDIRECT_URI .env.local
   ```

2. **Go to WorkOS Dashboard:**
   - Visit: https://dashboard.workos.com/
   - Select your environment (Development/Staging/Production)
   - Go to Configuration → Redirect URIs
   - Add your redirect URI exactly as it appears in your .env.local

3. **For Local Development:**
   ```
   http://localhost:3000/callback
   ```

4. **For Production:**
   ```
   https://yourdomain.com/callback
   ```

### Issue 2: Missing Redirect URI in WorkOS Dashboard

**Solution:**

1. Log into https://dashboard.workos.com/
2. Select your project/environment
3. Navigate to: **Redirect URIs** section
4. Click **Add Redirect URI**
5. Add: `http://localhost:3000/callback` (for local)
6. Add: `https://yourdomain.com/callback` (for production)
7. Save changes

### Issue 3: Production Deployment Missing Redirect URI

**If deploying to Vercel/Netlify/etc:**

1. **Add production environment variable:**
   ```bash
   WORKOS_REDIRECT_URI=https://yourdomain.com/callback
   ```

2. **Add to WorkOS Dashboard:**
   - Add `https://yourdomain.com/callback`
   - If using Vercel preview deployments, also add:
     - `https://*.vercel.app/callback`
     - Or each specific preview URL

3. **Update .env.production (if used):**
   ```bash
   # .env.production
   WORKOS_REDIRECT_URI=https://platzer.dev/callback
   ```

### Issue 4: Multiple Environments

**If you have development, staging, and production:**

**Local (.env.local):**
```bash
WORKOS_REDIRECT_URI=http://localhost:3000/callback
```

**Staging (.env.staging):**
```bash
WORKOS_REDIRECT_URI=https://staging.yourdomain.com/callback
```

**Production (.env.production):**
```bash
WORKOS_REDIRECT_URI=https://yourdomain.com/callback
```

**WorkOS Dashboard - Add all URIs:**
- `http://localhost:3000/callback`
- `https://staging.yourdomain.com/callback`
- `https://yourdomain.com/callback`

## Quick Fixes

### Fix 1: Verify Current Configuration
```bash
cd /Users/lplatzer/dev/projects/platzer.dev
node test-workos.js
```

### Fix 2: Check Middleware Configuration
The middleware should automatically use the `WORKOS_REDIRECT_URI` from environment variables.

Current middleware config is correct in `src/middleware.ts`.

### Fix 3: Update Production Redirect URI

If deploying to production, create `.env.production`:

```bash
# .env.production
WORKOS_CLIENT_ID=client_01K7BXJHEC2QJCMJF9F8ESWTHJ
WORKOS_API_KEY=your_production_api_key
WORKOS_COOKIE_PASSWORD=your_production_cookie_password
WORKOS_REDIRECT_URI=https://platzer.dev/callback
```

### Fix 4: Explicit Redirect URI in Middleware

If you want to explicitly set the redirect URI in code (not recommended, use env vars instead):

```typescript
// src/middleware.ts
import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
    middlewareAuth: {
        enabled: true,
        unauthenticatedPaths: ['/'],
    },
    // Explicit redirect URI (optional, env var is preferred)
    redirectUri: process.env.WORKOS_REDIRECT_URI || 'http://localhost:3000/callback',
});

export const config = { 
    matcher: ['/', '/account/:page*', '/etf-tracker', '/etf-test'] 
};
```

## Vercel Deployment Specific

If deploying to Vercel:

### 1. Add Environment Variables in Vercel Dashboard

Go to: Project Settings → Environment Variables

Add:
- `WORKOS_CLIENT_ID` = `client_01K7BXJHEC2QJCMJF9F8ESWTHJ`
- `WORKOS_API_KEY` = (your production key)
- `WORKOS_COOKIE_PASSWORD` = (secure random string, min 32 chars)
- `WORKOS_REDIRECT_URI` = `https://platzer.dev/callback`

### 2. Set Environment Type

For each variable, select:
- ✅ Production
- ✅ Preview (if you want auth in preview deployments)
- ❌ Development (use .env.local instead)

### 3. Add All Redirect URIs to WorkOS

In WorkOS Dashboard, add:
- `https://platzer.dev/callback` (production)
- `https://www.platzer.dev/callback` (if using www)
- `https://*.vercel.app/callback` (for preview deployments, if needed)

## Testing Steps

### Local Testing
```bash
# 1. Verify env vars
node test-workos.js

# 2. Start dev server
pnpm dev

# 3. Visit protected page
open http://localhost:3000/etf-test

# Expected: Redirect to WorkOS sign-in
```

### Production Testing
```bash
# 1. Deploy to production

# 2. Visit protected page
open https://platzer.dev/etf-test

# Expected: Redirect to WorkOS sign-in with production redirect
```

## Debug Checklist

- [ ] `WORKOS_REDIRECT_URI` is set in `.env.local`
- [ ] Redirect URI is added to WorkOS Dashboard
- [ ] Redirect URI matches exactly (including http/https)
- [ ] No trailing slash in redirect URI
- [ ] WorkOS environment (dev/staging/prod) is correct
- [ ] All environment variables are set correctly
- [ ] Middleware is configured properly
- [ ] `/callback` route exists and uses `handleAuth()`
- [ ] No errors in browser console
- [ ] No errors in server logs

## Still Having Issues?

### Check WorkOS Status
Visit: https://status.workos.com/

### Check Server Logs
```bash
# In development
pnpm dev
# Look for errors related to WorkOS or redirect URI

# In production (Vercel)
# Check Function Logs in Vercel Dashboard
```

### Contact Information
- WorkOS Support: support@workos.com
- WorkOS Docs: https://workos.com/docs/user-management/nextjs
- WorkOS Dashboard: https://dashboard.workos.com/

## What's Your Specific Error?

Please provide:
1. The exact error message
2. Where you're seeing it (local/production)
3. Your production domain (if applicable)
4. Any console/server errors

Then I can provide a more specific fix!
