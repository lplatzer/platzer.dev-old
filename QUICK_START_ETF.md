# 🚀 ETF Tracker - Quick Start

## Prerequisites

✅ Environment variables configured in `.env.local`  
✅ Python API ready in `~/dev/python/etf-api`

## Start Both Services

### Terminal 1: Python API
```bash
cd ~/dev/python/etf-api
./start.sh
```
✅ Running at: http://localhost:8000

### Terminal 2: Next.js App
```bash
cd ~/dev/projects/platzer.dev
pnpm dev
```
✅ Running at: http://localhost:3000

### Browser
```
http://localhost:3000/etf-test
```

**Note:** You'll need to be authenticated (WorkOS) to access the page.

## Quick Test

### Verify API
```bash
curl http://localhost:8000/health
curl "http://localhost:8000/etf/2B7K.DE/latest"
```

### Check Docs
- API Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Troubleshooting

### API Not Running?
```bash
cd ~/dev/python/etf-api
uv run python setup_check.py
./start.sh
```

### Port 8000 in use?
```bash
lsof -ti:8000 | xargs kill -9
```

### CORS errors?
Check `~/dev/python/etf-api/.env`:
```bash
CORS_ORIGINS=http://localhost:3000,https://platzer.dev
```

## Files to Know

- `src/lib/etf-api.ts` - API client
- `src/app/etf-test/page.tsx` - ETF page
- `.env.local` - Environment config
- `~/dev/python/etf-api/` - Python API

## Documentation

- `ETF_API_INTEGRATION.md` - Complete integration guide
- `INTEGRATION_TEST.md` - Detailed testing guide
- `~/dev/python/etf-api/README.md` - Python API docs

That's it! 🎉
