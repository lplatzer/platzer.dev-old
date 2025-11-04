# 🔍 WorkOS Integration Diagnostic

## ✅ Configuration Check

Your WorkOS environment variables are correctly configured:

```bash
<<<<<<< HEAD
✅ WORKOS_CLIENT_ID:
✅ WORKOS_API_KEY:
✅ WORKOS_COOKIE_PASSWORD:
=======
✅ WORKOS_CLIENT_ID: client_01K7BXJHEC2QJCMJF9F8ESWTHJ
✅ WORKOS_API_KEY: Set (100 characters)
✅ WORKOS_COOKIE_PASSWORD: Set (64 characters)
>>>>>>> fb3355e (removed secrets)
✅ WORKOS_REDIRECT_URI: http://localhost:3000/callback
```

## 🔧 What Was Fixed

Changed from:

```bash
NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/callback
```

To:

```bash
WORKOS_REDIRECT_URI=http://localhost:3000/callback
```

**Reason:** AuthKit v2 uses `WORKOS_REDIRECT_URI` (without `NEXT_PUBLIC_` prefix)

## 🧪 Testing the Integration

### Run Configuration Test

```bash
cd ~/dev/projects/platzer.dev
node test-workos.js
```

Should show: `✅ WorkOS configuration looks correct!`

### Test Live Authentication

1. **Start the dev server:**

   ```bash
   pnpm dev
   ```

2. **Visit a protected page:**

   ```
   http://localhost:3000/etf-test
   ```

3. **Expected behavior:**
   - You should be redirected to WorkOS sign-in
   - URL should be: `https://api.workos.com/user_management/authorize?client_id=...`

## ❌ If You See "Internal Server Error"

### Possible Causes

#### 1. WorkOS API Issues

The error might be from WorkOS's side, not your application.

**Check:**

- Visit: <https://status.workos.com/>
- See if there are any ongoing incidents

#### 2. Invalid API Credentials

**Verify in WorkOS Dashboard:**

1. Go to: <https://dashboard.workos.com/>
2. Check your environment (Staging/Production)
3. Verify:
   - Client ID matches: `client_01K7BXJHEC2QJCMJF9F8ESWTHJ`
   - API Key is valid and not expired
   - Redirect URI is configured: `http://localhost:3000/callback`

#### 3. Environment Mismatch

You're using a **staging** API key (`sk_test_...`).

**Ensure:**

- Using staging environment in WorkOS dashboard
- Client ID is from staging (not production)
- Redirect URI is added to staging environment

#### 4. Redirect URI Not Configured

**In WorkOS Dashboard:**

1. Go to your application settings
2. Find "Redirect URIs" section
3. Add: `http://localhost:3000/callback`
4. Save changes

## 🔄 What Happens During Sign-In

```
User visits /etf-test
  ↓
Middleware checks authentication
  ↓
Not authenticated → Redirect to /login
  ↓
/login calls getSignInUrl()
  ↓
Redirects to WorkOS: https://api.workos.com/user_management/authorize
  ↓
User signs in on WorkOS
  ↓
WorkOS redirects back to /callback
  ↓
/callback handles auth code
  ↓
User authenticated → Redirect to /etf-test
```

## 🐛 Debugging Steps

### 1. Check Dev Server Logs

Look for errors when accessing `/etf-test`:

```bash
pnpm dev
# In another terminal
curl -sI http://localhost:3000/etf-test
# Check the dev server output for errors
```

### 2. Test Login Endpoint Directly

```bash
curl -v http://localhost:3000/login 2>&1 | grep Location
```

Should show a redirect to `https://api.workos.com/user_management/authorize`

### 3. Check Network Tab

1. Open browser DevTools (F12)
2. Go to Network tab
3. Visit: <http://localhost:3000/etf-test>
4. Look for:
   - Redirect to `/login`
   - Redirect to WorkOS
   - Any failed requests

### 4. Test with Browser

Open: <http://localhost:3000/login>

**Expected:**

- Redirects to WorkOS sign-in page

**If you see an error page:**

- Note the exact error message
- Check URL parameters
- Look for any error codes

## 🔑 Verify Credentials

### Check if API Key is Valid

The API key starts with `sk_test_` which means it's a staging key.

**Decode the base64:**

```bash
echo "==" | base64 -d
```

Output should show: `staging_01K7BXJHGAA4WPV2VHGM6FT0N1_...`

This confirms it's a **staging environment** key.

## ✅ Working Configuration

Your `.env.local` should look like:

```bash
# WorkOS Authentication
WORKOS_CLIENT_ID=
WORKOS_API_KEY=
WORKOS_COOKIE_PASSWORD=
WORKOS_REDIRECT_URI=http://localhost:3000/callback

# ... other variables ...
```

## 📋 Checklist

- [x] Environment variables are set correctly
- [x] Using correct variable names (not NEXT*PUBLIC*)
- [x] API key format is valid (starts with sk*test*)
- [x] Client ID format is valid (starts with client\_)
- [x] Cookie password is long enough (64+ chars)
- [x] Redirect URI is a full URL
- [ ] Redirect URI is configured in WorkOS dashboard
- [ ] Using correct environment (staging vs production)
- [ ] WorkOS API is operational (check status page)

## 🆘 If Still Having Issues

### 1. Check WorkOS Dashboard

Visit: <https://dashboard.workos.com/>

1. Select your environment (Staging)
2. Go to "Configuration"
3. Check "Redirect URIs"
4. Add `http://localhost:3000/callback` if missing

### 2. Try a Fresh API Key

In WorkOS Dashboard:

1. Go to API Keys
2. Generate a new API key
3. Update `.env.local`
4. Restart dev server

### 3. Check Browser Console

When you visit the login page, check browser console for:

- CORS errors
- Network errors
- JavaScript errors

### 4. Test Callback Endpoint

The callback endpoint should be accessible:

```bash
curl http://localhost:3000/callback
```

Should return an error (expected, since no auth code provided) but endpoint should exist.

## 📚 Resources

- **WorkOS Docs**: <https://workos.com/docs/user-management/nextjs/quick-start>
- **AuthKit Docs**: <https://workos.com/docs/user-management/authkit>
- **WorkOS Status**: <https://status.workos.com/>
- **Dashboard**: <https://dashboard.workos.com/>

## 🎯 Next Steps

1. Verify redirect URI in WorkOS dashboard
2. Check WorkOS status page
3. Try signing in with browser (not curl)
4. Check exact error message if it fails
5. Contact WorkOS support if needed

## ✅ Configuration is Valid

Your environment configuration is **correct**. If you're seeing an "internal server error", it's likely:

1. WorkOS API is having issues (check status page)
2. Redirect URI not configured in WorkOS dashboard
3. API credentials are invalid/expired (check dashboard)

The application code and environment setup are working properly.
