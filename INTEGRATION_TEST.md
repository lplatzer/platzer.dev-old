# 🧪 ETF API Integration Test Guide

## Prerequisites

Make sure both services are ready:

### 1. Python ETF API
```bash
cd ~/dev/python/etf-api

# Verify setup
uv run python setup_check.py

# Start the API
./start.sh
```

The API should be running at: **http://localhost:8000**

### 2. Next.js App
The environment variable has been configured in `.env.local`:
```
NEXT_PUBLIC_ETF_API_URL=http://localhost:8000
```

## Testing Steps

### Step 1: Start the Python API

```bash
cd ~/dev/python/etf-api
./start.sh
```

You should see:
```
🚀 Starting ETF Data API...
✓ Starting server on http://localhost:8000
✓ API Docs: http://localhost:8000/docs
✓ ReDoc: http://localhost:8000/redoc
```

**Verify API is working:**
```bash
# Test health endpoint
curl http://localhost:8000/health

# Test ETF data
curl "http://localhost:8000/etf/2B7K.DE/latest" | python3 -m json.tool
```

### Step 2: Start Next.js Dev Server

In a **new terminal**:
```bash
cd ~/dev/projects/platzer.dev
pnpm dev
```

### Step 3: Open the ETF Test Page

Navigate to: **http://localhost:3000/etf-test**

## What to Expect

### ✅ Success Indicators

1. **Loading State**
   - Brief "Loading ETF data..." message
   - "Fetching data from API..." subtitle

2. **Data Display**
   - Portfolio overview card shows current value and gains
   - Price information card shows initial and current prices
   - Chart displays historical ETF data
   - All values are from live API (not static data)

3. **Interactive Features**
   - Time range tabs work (Daily, Weekly, Monthly, Yearly, All)
   - Chart updates when switching time ranges
   - Data points match the selected time range

### ❌ Error States

If the API is not running, you'll see:

```
Error Loading Data
Failed to fetch ETF data

Troubleshooting:
• Make sure the Python API is running on port 8000
• Check http://localhost:8000/docs
• Verify CORS is enabled for localhost:3000
```

**Fix:** Start the Python API (see Step 1)

### 🔍 Verification

#### Check API Calls in Browser DevTools

1. Open DevTools (F12 or Cmd+Option+I)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Reload the page
5. You should see:
   - Request to `http://localhost:8000/etf/2B7K.DE/history?period=max&interval=1d`
   - Status: 200 OK
   - Response contains ETF data

#### Verify Data in Console

Open browser console and check:
- No error messages
- ETF data is fetched successfully

## Testing Different Scenarios

### Test 1: Fresh Load
```bash
# Clear cache and reload
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux)
```

### Test 2: API Offline
```bash
# Stop the Python API (Ctrl+C in its terminal)
# Reload the page
# Should show error message with troubleshooting steps
```

### Test 3: Different Time Ranges
- Click "Daily" - Should show last ~100 days
- Click "Weekly" - Should show last ~2 years  
- Click "Monthly" - Should show last ~5 years
- Click "Yearly" - Should show ~10 years
- Click "All" - Should show complete history

### Test 4: Cache Verification
```bash
# In the API terminal, you'll see:
# First request: "Cache miss, fetching from Yahoo Finance"
# Subsequent requests (within 1 hour): "Cache hit"
```

## Performance Expectations

- **Initial Load**: ~1-2 seconds (fetching from Yahoo Finance)
- **Cached Load**: <100ms (served from memory)
- **Time Range Switch**: Instant (client-side filtering)

## Data Verification

The ETF being tracked:
- **Ticker**: 2B7K.DE
- **Name**: iShares Core MSCI World UCITS ETF
- **ISIN**: IE00BYX2JD69
- **Exchange**: XETRA (German)
- **Shares**: 256

Expected price range (as of late 2024):
- Approximately €80-90 per share
- Portfolio value: ~€20,000-23,000

## Troubleshooting

### Issue: CORS Error

**Symptoms:**
```
Access to fetch at 'http://localhost:8000/...' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

**Fix:**
Check `~/dev/python/etf-api/.env`:
```bash
CORS_ORIGINS=http://localhost:3000,https://platzer.dev
```

Restart the Python API.

### Issue: API Not Found

**Symptoms:**
```
Failed to fetch
TypeError: Failed to fetch
```

**Fix:**
1. Make sure Python API is running: `cd ~/dev/python/etf-api && ./start.sh`
2. Verify it's on port 8000: `curl http://localhost:8000/health`

### Issue: Wrong Data

**Symptoms:**
- Chart shows no data
- Prices are 0 or incorrect

**Fix:**
1. Check API response: `curl "http://localhost:8000/etf/2B7K.DE/latest"`
2. Clear API cache: `curl -X POST http://localhost:8000/etf/cache/clear`
3. Reload the Next.js page

### Issue: Slow Loading

**Symptoms:**
- Takes >5 seconds to load

**Possible Causes:**
1. **First request** - Yahoo Finance can be slow (normal)
2. **Network issues** - Check internet connection
3. **Large dataset** - "max" period fetches all historical data

**Fix:**
- Wait for cache to populate
- Use shorter time period: `1y` instead of `max`

## Success Criteria

✅ **Integration is successful when:**

1. Page loads without errors
2. Chart displays real ETF data from API
3. Portfolio metrics calculate correctly
4. Time range filters work
5. API calls are visible in Network tab
6. Caching works (second load is faster)
7. Error handling works (test by stopping API)

## Next Steps After Successful Integration

1. **Add More ETFs**
   - Update the API client to support multiple tickers
   - Create a portfolio with multiple holdings

2. **Enhance UI**
   - Add refresh button to manually update data
   - Show last update timestamp
   - Add API health indicator

3. **Optimize Performance**
   - Implement SWR or React Query
   - Add loading skeletons
   - Prefetch data for better UX

4. **Deploy to Production**
   - Deploy Python API to Railway/Render
   - Update `NEXT_PUBLIC_ETF_API_URL` in Vercel
   - Test end-to-end in production

## Questions?

- **API Docs**: http://localhost:8000/docs
- **Python API**: `~/dev/python/etf-api/README.md`
- **Integration Guide**: This file

Happy testing! 🚀
