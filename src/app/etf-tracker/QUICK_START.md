# Quick Start Guide - ETF Tracker UI Components

## 📦 What's Been Created

### New Components
1. **PortfolioOverview** - Shows current value, % gain, holdings info
2. **GraphControls** - Time range selector & display options
3. **Tabs** - shadcn tabs component
4. **Badge** - shadcn badge component
5. **Utils** - Helper functions for data transformation and formatting

### Files Created
```
src/
├── components/
│   ├── etf/
│   │   ├── PortfolioOverview.tsx    ← Portfolio metrics display
│   │   ├── GraphControls.tsx        ← Chart controls
│   │   └── utils.ts                 ← Utility functions
│   └── ui/
│       ├── tabs.tsx                 ← Tab component
│       └── badge.tsx                ← Badge component
└── app/
    └── etf-tracker/
        ├── example-integration.tsx  ← Full working example
        ├── UI_IMPROVEMENTS.md       ← Detailed recommendations
        └── QUICK_START.md           ← This file
```

## 🚀 How to Use

### Step 1: Install Missing Dependencies

```bash
# Install required Radix UI component
pnpm add @radix-ui/react-tabs
```

### Step 2: Import Components

In your `page.jsx`, add these imports:

```jsx
import { PortfolioOverview } from '@/components/etf/PortfolioOverview';
import { GraphControls, TimeRange } from '@/components/etf/GraphControls';
import { 
  calculatePortfolioMetrics, 
  filterDataByTimeRange,
  getDateFormat,
  getTickValues
} from '@/components/etf/utils';
```

### Step 3: Add State Management

```jsx
const [timeRange, setTimeRange] = React.useState<TimeRange>('monthly');
const [showVolume, setShowVolume] = React.useState(false);
const [showMA, setShowMA] = React.useState(false);
```

### Step 4: Calculate Metrics

```jsx
// Transform your data
const chartData = modEtfData[0].data; // Your existing data

// Filter by time range
const filteredData = React.useMemo(() => 
  filterDataByTimeRange(chartData, timeRange),
  [chartData, timeRange]
);

// Calculate portfolio metrics
const portfolioData = React.useMemo(() => {
  const metrics = calculatePortfolioMetrics(filteredData, SHARES, INITIAL_PRICE);
  return {
    currentValue: metrics.currentValue,
    initialValue: metrics.initialValue,
    percentageChange: metrics.percentageChange,
    lastUpdated: metrics.lastUpdated,
    shares: SHARES,
    currentPrice: metrics.currentPrice,
  };
}, [filteredData]);
```

### Step 5: Add Components to Your JSX

```jsx
return (
  <div className="space-y-6">
    {/* Portfolio Overview */}
    <PortfolioOverview data={portfolioData} />

    {/* Graph Controls */}
    <GraphControls
      activeRange={timeRange}
      onRangeChange={setTimeRange}
      showVolume={showVolume}
      onVolumeToggle={setShowVolume}
      showMA={showMA}
      onMAToggle={setShowMA}
    />

    {/* Your existing chart */}
    <Card>
      <CardContent className="pt-6">
        <div className="h-[500px]">
          <ETFLine data={filteredData} />
        </div>
      </CardContent>
    </Card>
  </div>
);
```

## 📋 Complete Example

See `example-integration.tsx` for a fully working implementation showing:
- ✅ All components integrated
- ✅ State management
- ✅ Data filtering by time range
- ✅ Responsive chart configuration
- ✅ Custom tooltips
- ✅ Proper TypeScript types

## 🎨 Customization

### Change Colors

In `PortfolioOverview.tsx`, modify the Badge variant:
```tsx
<Badge variant={isPositive ? "success" : "destructive"}>
```

### Adjust Time Ranges

In `GraphControls.tsx`, modify the tabs:
```tsx
<TabsList>
  <TabsTrigger value="1w">1 Week</TabsTrigger>
  <TabsTrigger value="1m">1 Month</TabsTrigger>
  <TabsTrigger value="3m">3 Months</TabsTrigger>
  {/* Add more as needed */}
</TabsList>
```

Update the `utils.ts` `getDaysAgo` function accordingly.

### Change Currency

In `utils.ts`, modify the `formatCurrency` function:
```tsx
currency: 'USD', // or 'GBP', 'CHF', etc.
```

## 🐛 Troubleshooting

### Issue: Types not recognized
**Solution**: Make sure you're using `.tsx` extension and have TypeScript properly configured.

### Issue: Icons not showing
**Solution**: Ensure `lucide-react` is installed:
```bash
pnpm add lucide-react
```

### Issue: Styles not applying
**Solution**: Check that your `tailwind.config.js` includes the new component paths:
```js
content: [
  './src/components/**/*.{js,ts,jsx,tsx}',
  './src/app/**/*.{js,ts,jsx,tsx}',
]
```

### Issue: Badge "success" variant not working
**Solution**: Add the success variant to your Tailwind config or use the built-in green utilities.

## 📊 Data Requirements

Your data should be in this format:

```typescript
interface ChartDataPoint {
  x: string;  // ISO date string: "2024-10-15"
  y: number;  // Price value: 313.34
}

const data = [{
  id: "ETF_ID",
  data: [
    { x: "2024-10-15", y: 313.34 },
    { x: "2024-10-16", y: 312.92 },
    // ...
  ]
}];
```

## 🎯 Next Steps

1. **Test the Components**
   - Copy code from `example-integration.tsx`
   - Replace your current `page.jsx` content
   - Test all time range options

2. **Add Loading States**
   ```bash
   npx shadcn@latest add skeleton
   ```

3. **Add Error Handling**
   - Wrap components in error boundaries
   - Add fallback UI for failed data loads

4. **Optimize Performance**
   - Memoize expensive calculations
   - Use `React.memo` for chart component
   - Consider virtualization for large datasets

5. **Add More Features**
   - Transaction history tracking
   - Multiple ETF support
   - Export to CSV
   - Price alerts

## 💡 Pro Tips

1. **Use the utils functions** - They handle formatting, calculations, and data transformations
2. **Memoize expensive operations** - Use `React.useMemo` for calculations
3. **Keep state minimal** - Only store what changes (time range, toggles)
4. **Type everything** - Use TypeScript interfaces for better DX
5. **Test on mobile** - Responsive design is critical for finance apps

## 🆘 Need Help?

Check these files:
- `UI_IMPROVEMENTS.md` - Detailed recommendations and future enhancements
- `example-integration.tsx` - Complete working example
- `utils.ts` - Helper functions with JSDoc comments

## 🎉 You're Done!

Your ETF tracker now has:
- ✅ Professional portfolio overview
- ✅ Time range controls
- ✅ Clean, modern UI with shadcn
- ✅ Fully typed with TypeScript
- ✅ Responsive design
- ✅ Dark mode support

Happy tracking! 📈
