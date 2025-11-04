# ETF Test Page

This is a test implementation of the ETF tracker with all the new UI components.

## 🚀 What's Implemented

### Components Used
- ✅ **PortfolioOverview** - Shows current value, % gain/loss, shares, last update
- ✅ **GraphControls** - Time range selector (Daily/Monthly/Yearly/All) with toggles
- ✅ **Card Components** - shadcn card system for structured layout
- ✅ **Responsive Chart** - Nivo line chart with custom tooltips
- ✅ **Performance Metrics** - Additional stats card

### Features
- ✅ Time range filtering (Daily, Monthly, Yearly, All Time)
- ✅ Automatic portfolio calculations
- ✅ Color-coded gains/losses (green/red)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Custom tooltips with formatted dates and prices
- ✅ Memoized calculations for performance
- ✅ Type-safe with TypeScript

## 📊 Data Source

The page uses the exported `data` constant from `/etf-tracker/page.jsx`:
```typescript
import { data as originalData } from '../etf-tracker/page';
```

This data contains price history for the iShares Core MSCI World UCITS ETF (IE00BYX2JD69).

## 🎯 Configuration

Key constants defined at the top of the file:
```typescript
const SHARES = 256;                    // Number of shares owned
const ETF_ISIN = 'IE00BYX2JD69';      // ETF identifier
const TICKER = '2B7K.XETRA';          // Trading ticker
const INITIAL_PRICE = originalData[0].data[0].y; // First price in dataset
```

## 🌐 Access

Visit the page at:
```
http://localhost:3000/etf-test
```

**Note:** Authentication required (WorkOS AuthKit)

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Single column, stacked layout
- **Tablet** (768px - 1023px): 2-column grid for metrics
- **Desktop** (1024px+): Full 4-column grid

## 🎨 UI Structure

```
┌─────────────────────────────────────────┐
│  Page Header & Description              │
├─────────────────────────────────────────┤
│  Portfolio Overview Card                │
│  • Current Value  • % Gain  • Holdings  │
├─────────────────────────────────────────┤
│  Graph Controls Card                    │
│  • Time Range Tabs  • Display Toggles   │
├─────────────────────────────────────────┤
│  Price Chart Card                       │
│  • Interactive line chart               │
├─────────────────────────────────────────┤
│  ETF Information Card                   │
│  • ISIN  • Ticker  • Exchange           │
├─────────────────────────────────────────┤
│  Performance Metrics Card               │
│  • Initial Price  • Current Price       │
│  • Total Shares  • Data Points          │
└─────────────────────────────────────────┘
```

## 🔧 How Time Range Filtering Works

1. User selects time range (Daily/Monthly/Yearly/All)
2. `setTimeRange` updates state
3. `filteredData` useMemo recalculates:
   - Daily: Last 30 days
   - Monthly: Last 180 days (6 months)
   - Yearly: Last 365 days
   - All: Complete dataset
4. `portfolioData` useMemo recalculates metrics
5. Chart re-renders with new data

## 📈 Calculations

### Portfolio Metrics
```typescript
currentValue = currentPrice * shares
percentageChange = ((currentValue - initialValue) / initialValue) * 100
absoluteChange = currentValue - initialValue
```

### Utility Functions Used
- `calculatePortfolioMetrics()` - Calculate all portfolio stats
- `filterDataByTimeRange()` - Filter data by selected period
- `formatCurrency()` - Format to Euro (€)
- `getDateFormat()` - Get appropriate date format for chart axis
- `getTickValues()` - Get appropriate tick intervals for chart

## 🎯 Next Steps

### Immediate Improvements
1. Add loading skeletons
2. Add error boundaries
3. Implement volume overlay (toggle is ready)
4. Implement moving average overlay (toggle is ready)

### Future Enhancements
1. Transaction history
2. Multiple ETF support
3. Export to CSV/PDF
4. Price alerts
5. Comparison with benchmarks

## 🐛 Troubleshooting

### Chart not showing
- Check browser console for errors
- Verify data is loading: `console.log(chartData)`
- Check if Nivo is properly installed

### Incorrect calculations
- Verify SHARES constant matches actual holdings
- Check INITIAL_PRICE is correct
- Ensure data format: `[{ x: "YYYY-MM-DD", y: number }]`

### Styling issues
- Clear `.next` cache: `rm -rf .next`
- Restart dev server
- Check Tailwind config includes component paths

### TypeScript errors
- Ensure all dependencies installed
- Check `tsconfig.json` path aliases
- Restart TypeScript server in your IDE

## 📚 Related Files

- `/components/etf/PortfolioOverview.tsx` - Portfolio metrics component
- `/components/etf/GraphControls.tsx` - Time range & toggle controls
- `/components/etf/utils.ts` - Utility functions
- `/components/ui/tabs.tsx` - Tab component
- `/components/ui/badge.tsx` - Badge component
- `/components/ui/card.tsx` - Card components

## 💡 Tips

1. **Performance**: All expensive calculations are memoized
2. **Type Safety**: Component uses TypeScript for better DX
3. **Customization**: Change constants at top of file to adjust
4. **Data Updates**: Replace data import to use live API
5. **Styling**: All components use Tailwind classes for easy customization

## ✅ Comparison with Original

| Feature | Original | New (etf-test) |
|---------|----------|---------------|
| Portfolio Overview | ❌ | ✅ |
| Time Range Selector | ❌ | ✅ |
| Responsive Design | Partial | ✅ Full |
| Type Safety | ❌ (.jsx) | ✅ (.tsx) |
| Memoization | ❌ | ✅ |
| Custom Tooltips | ❌ | ✅ |
| Performance Metrics | ❌ | ✅ |
| Dark Mode | ✅ | ✅ |
| Multiple Charts | ✅ | ❌ (Single, better) |

## 🎉 Success!

Your ETF test page is now ready with:
- Professional UI components
- Real-time filtering
- Responsive design
- Performance optimizations
- Type safety
- Easy customization

Happy tracking! 📊
