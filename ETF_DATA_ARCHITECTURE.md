# ETF Data Architecture - Self-Hosted Solution

## Overview
Build your own ETF data store to eliminate API dependencies and improve performance.

## Architecture

### 1. Data Sources (Pick One)

#### Option A: yfinance (FREE, Recommended for German ETFs)
```python
import yfinance as yf

# Your iShares MSCI World SRI
ticker = "2B7K.DE"
etf = yf.Ticker(ticker)
hist = etf.history(period="max")  # All available data
```

#### Option B: EOD Historical Data ($19.99/month)
```bash
curl "https://eodhd.com/api/eod/2B7K.XETRA?api_token=YOUR_TOKEN&fmt=json"
```

#### Option C: Twelve Data (Free Tier)
```bash
curl "https://api.twelvedata.com/time_series?symbol=2B7K&exchange=XETRA&interval=1day&apikey=YOUR_KEY"
```

### 2. Database Schema (SurrealDB)

```sql
-- ETF Metadata
DEFINE TABLE etf SCHEMAFULL;
DEFINE FIELD isin ON etf TYPE string;
DEFINE FIELD ticker ON etf TYPE string;
DEFINE FIELD name ON etf TYPE string;
DEFINE FIELD exchange ON etf TYPE string;
DEFINE FIELD currency ON etf TYPE string;
DEFINE FIELD created_at ON etf TYPE datetime;
DEFINE FIELD updated_at ON etf TYPE datetime;

-- Price History
DEFINE TABLE price_history SCHEMAFULL;
DEFINE FIELD etf ON price_history TYPE record(etf);
DEFINE FIELD date ON price_history TYPE datetime;
DEFINE FIELD open ON price_history TYPE number;
DEFINE FIELD high ON price_history TYPE number;
DEFINE FIELD low ON price_history TYPE number;
DEFINE FIELD close ON price_history TYPE number;
DEFINE FIELD volume ON price_history TYPE number;
DEFINE FIELD adjusted_close ON price_history TYPE number;

-- Index for fast queries
DEFINE INDEX idx_etf_date ON price_history COLUMNS etf, date;
```

### 3. Data Fetcher Script

#### Python Script (Recommended)
```python
# scripts/fetch_etf_data.py
import yfinance as yf
from datetime import datetime
import json
import os

def fetch_etf_data(ticker, isin, name):
    """Fetch historical data for an ETF"""
    print(f"Fetching data for {name} ({ticker})...")
    
    etf = yf.Ticker(ticker)
    hist = etf.history(period="max")
    
    # Convert to JSON format
    data = []
    for date, row in hist.iterrows():
        data.append({
            "date": date.strftime('%Y-%m-%d'),
            "open": float(row['Open']),
            "high": float(row['High']),
            "low": float(row['Low']),
            "close": float(row['Close']),
            "volume": int(row['Volume']),
            "adjusted_close": float(row['Close'])  # yfinance returns adjusted by default
        })
    
    # Save to file
    output = {
        "isin": isin,
        "ticker": ticker,
        "name": name,
        "exchange": "XETRA",
        "currency": "EUR",
        "fetched_at": datetime.now().isoformat(),
        "data": data
    }
    
    filename = f"data/etf_{isin}.json"
    os.makedirs("data", exist_ok=True)
    
    with open(filename, 'w') as f:
        json.dump(output, f, indent=2)
    
    print(f"✓ Saved {len(data)} records to {filename}")
    return output

# Your ETFs
etfs = [
    {
        "ticker": "2B7K.DE",
        "isin": "IE00BYX2JD69",
        "name": "iShares Core MSCI World UCITS ETF"
    },
    # Add more ETFs here
]

if __name__ == "__main__":
    for etf in etfs:
        try:
            fetch_etf_data(etf["ticker"], etf["isin"], etf["name"])
        except Exception as e:
            print(f"✗ Error fetching {etf['name']}: {e}")
```

### 4. Next.js API Routes

#### GET /api/etf/[isin]/history
```typescript
// src/app/api/etf/[isin]/history/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { isin: string } }
) {
  try {
    const { isin } = params;
    const filePath = path.join(process.cwd(), 'data', `etf_${isin}.json`);
    
    const data = await readFile(filePath, 'utf-8');
    const etfData = JSON.parse(data);
    
    return NextResponse.json(etfData);
  } catch (error) {
    return NextResponse.json(
      { error: 'ETF not found' },
      { status: 404 }
    );
  }
}
```

#### GET /api/etf/[isin]/latest
```typescript
// src/app/api/etf/[isin]/latest/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: { isin: string } }
) {
  try {
    const { isin } = params;
    const filePath = path.join(process.cwd(), 'data', `etf_${isin}.json`);
    
    const data = await readFile(filePath, 'utf-8');
    const etfData = JSON.parse(data);
    
    // Get latest price
    const latestPrice = etfData.data[etfData.data.length - 1];
    
    return NextResponse.json({
      isin: etfData.isin,
      ticker: etfData.ticker,
      name: etfData.name,
      latest: latestPrice,
      fetched_at: etfData.fetched_at
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'ETF not found' },
      { status: 404 }
    );
  }
}
```

### 5. Automated Updates

#### GitHub Actions (Daily Update)
```yaml
# .github/workflows/update-etf-data.yml
name: Update ETF Data

on:
  schedule:
    # Run every day at 8 PM CET (after market close)
    - cron: '0 20 * * 1-5'
  workflow_dispatch: # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      
      - name: Install dependencies
        run: |
          pip install yfinance
      
      - name: Fetch ETF data
        run: |
          python scripts/fetch_etf_data.py
      
      - name: Commit and push
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add data/
          git commit -m "Update ETF data $(date +'%Y-%m-%d')" || exit 0
          git push
```

#### Or Vercel Cron Job
```typescript
// src/app/api/cron/update-etf/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Trigger Python script or fetch directly
  // ... implementation ...
  
  return NextResponse.json({ success: true });
}
```

Then in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/update-etf",
    "schedule": "0 20 * * 1-5"
  }]
}
```

### 6. Client-Side Usage

```typescript
// Update your ETF test page
async function fetchETFData(isin: string) {
  const response = await fetch(`/api/etf/${isin}/history`);
  const data = await response.json();
  return data.data.map(item => ({
    x: item.date,
    y: item.close
  }));
}

// In your component
const [etfData, setEtfData] = React.useState([]);

React.useEffect(() => {
  fetchETFData('IE00BYX2JD69').then(setEtfData);
}, []);
```

## Benefits Summary

### Performance
- **API Response Time**: < 10ms (vs 200-1000ms external API)
- **No rate limits**: Unlimited requests
- **Cached at edge**: Vercel Edge Network

### Cost
- **Free tier**: GitHub Actions (2000 min/month free)
- **Or Vercel Cron**: Included in Pro plan ($20/month)
- **Storage**: ~1MB/year per ETF (negligible)

### Reliability
- **99.9% uptime** (your infrastructure)
- **No third-party dependencies** during runtime
- **Historical data preserved** forever

## Migration Path

### Phase 1: Immediate (Today)
1. Install yfinance: `pip install yfinance`
2. Run fetch script
3. Save to JSON files
4. Update page to read from files

### Phase 2: Week 1
1. Create Next.js API routes
2. Move client to use API
3. Test thoroughly

### Phase 3: Week 2
1. Set up automated updates (GitHub Actions or Vercel Cron)
2. Monitor for 1 week
3. Add error handling/notifications

### Phase 4: Future
1. Migrate to SurrealDB (already in your stack!)
2. Add more ETFs
3. Add analytics/aggregations
4. Build portfolio management features

## Quick Start Command

```bash
# 1. Install yfinance
pip install yfinance

# 2. Create and run fetcher
python scripts/fetch_etf_data.py

# 3. You now have data/etf_IE00BYX2JD69.json!

# 4. Use in your app
# (see API routes above)
```

## Monitoring

Add a dashboard to track:
- Last successful update
- Data freshness
- API response times
- Error rates

## Conclusion

**Recommendation: Build your own data store**

You already have SurrealDB in your stack, you need German ETFs that yfinance supports perfectly, and you want full control. This is the right path.

Start simple (JSON files), then migrate to SurrealDB when you're ready to scale.
