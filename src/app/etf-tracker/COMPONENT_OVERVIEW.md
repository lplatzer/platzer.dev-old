# ETF Tracker Component Overview

## 🎨 Visual Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    ETF Portfolio Tracker                     │
│                  (iShares Core MSCI World)                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   PORTFOLIO OVERVIEW CARD                    │
├─────────────────┬──────────────┬─────────────┬──────────────┤
│  Current Value  │ Total Return │  Holdings   │ Last Updated │
│   €76,188.56    │   +2.45%     │ 256 Shares  │  Oct 10 2025 │
│                 │  +€1,823.12  │ @ €297.01   │              │
└─────────────────┴──────────────┴─────────────┴──────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    GRAPH CONTROLS CARD                       │
├─────────────────────────────────┬───────────────────────────┤
│  Time Range                     │ Display Options           │
│  [Daily][Monthly][Yearly][All]  │ □ Show Volume            │
│                                 │ □ Moving Average          │
└─────────────────────────────────┴───────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      CHART CARD                              │
│                                                              │
│  €320 ┤                     ╭──╮                            │
│       │                   ╭─╯  ╰╮                           │
│  €300 ┤        ╭────╮   ╭╯     ╰╮                          │
│       │      ╭─╯    ╰───╯       ╰─╮                        │
│  €280 ┼──────╯                    ╰────                     │
│       └────┬────┬────┬────┬────┬────┬────                  │
│          Oct  Nov  Dec  Jan  Feb  Mar  Apr                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     INFO CARD                                │
├─────────────────┬─────────────────┬────────────────────────┤
│ ISIN            │ Ticker          │ Exchange               │
│ IE00BYX2JD69    │ 2B7K.XETRA      │ Xetra                  │
└─────────────────┴─────────────────┴────────────────────────┘
```

## 📦 Component Breakdown

### 1. PortfolioOverview Component

**Purpose**: Display key portfolio metrics at a glance

**Props**:
```typescript
interface PortfolioData {
  currentValue: number;        // Total portfolio value
  initialValue: number;        // Initial investment
  percentageChange: number;    // % gain/loss
  lastUpdated?: string;        // ISO date string
  shares?: number;             // Number of shares
  currentPrice?: number;       // Current price per share
}
```

**Features**:
- ✅ Automatic color coding (green for gains, red for losses)
- ✅ Icons from lucide-react
- ✅ Responsive grid layout
- ✅ Euro formatting
- ✅ Date localization (German format)

**Usage**:
```tsx
<PortfolioOverview 
  data={{
    currentValue: 76188.56,
    initialValue: 74365.44,
    percentageChange: 2.45,
    lastUpdated: "2025-10-10",
    shares: 256,
    currentPrice: 297.01
  }} 
/>
```

---

### 2. GraphControls Component

**Purpose**: Control chart display settings and time range

**Props**:
```typescript
interface GraphControlsProps {
  activeRange: TimeRange;                    // Current time range
  onRangeChange: (range: TimeRange) => void; // Callback
  showVolume?: boolean;                      // Volume toggle state
  onVolumeToggle?: (show: boolean) => void;  // Volume callback
  showMA?: boolean;                          // MA toggle state
  onMAToggle?: (show: boolean) => void;      // MA callback
}

type TimeRange = "daily" | "monthly" | "yearly" | "all";
```

**Features**:
- ✅ Tab-based time range selector
- ✅ Toggle switches for display options
- ✅ Icons for visual context
- ✅ Responsive layout (stacks on mobile)

**Usage**:
```tsx
<GraphControls
  activeRange={timeRange}
  onRangeChange={setTimeRange}
  showVolume={showVolume}
  onVolumeToggle={setShowVolume}
  showMA={showMA}
  onMAToggle={setShowMA}
/>
```

---

### 3. Badge Component

**Purpose**: Display status indicators with color coding

**Variants**:
- `default` - Primary color
- `secondary` - Secondary color
- `destructive` - Red (for losses)
- `success` - Green (for gains)
- `outline` - Outlined style

**Usage**:
```tsx
<Badge variant="success">+€1,823.12</Badge>
<Badge variant="destructive">-€523.45</Badge>
```

---

### 4. Tabs Component

**Purpose**: Tab navigation for switching views

**Sub-components**:
- `Tabs` - Container
- `TabsList` - Tab button group
- `TabsTrigger` - Individual tab button
- `TabsContent` - Tab panel content

**Usage**:
```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="chart">Chart</TabsTrigger>
    <TabsTrigger value="table">Table</TabsTrigger>
  </TabsList>
  <TabsContent value="chart">Chart content</TabsContent>
  <TabsContent value="table">Table content</TabsContent>
</Tabs>
```

---

## 🛠️ Utility Functions

Located in `src/components/etf/utils.ts`

### Data Formatting

```typescript
// Currency formatting
formatCurrency(76188.56) // "€76.188,56"

// Percentage formatting
formatPercentage(2.45) // "+2.45%"

// Date formatting
formatDate("2025-10-10") // "10. Okt. 2025"
```

### Data Transformation

```typescript
// Filter data by time range
filterDataByTimeRange(data, 'monthly')

// Calculate portfolio metrics
calculatePortfolioMetrics(data, shares, initialPrice)

// Calculate moving average
calculateMovingAverage(data, 50) // 50-day MA

// Transform raw data to chart format
transformToChartData(rawData, 'close')
```

### Chart Helpers

```typescript
// Get date format for axis
getDateFormat('monthly') // "%b %Y"

// Get tick values for axis
getTickValues('daily') // "every 3 days"
```

### Calculations

```typescript
// Year-to-date performance
calculateYTDPerformance(data)
// Returns: { ytdChange: 1234.56, ytdPercentage: 1.67 }

// Get color class based on change
getChangeColor(2.45) // "text-green-600 dark:text-green-500"

// Get badge variant
getBadgeVariant(-1.23) // "destructive"
```

---

## 🎨 Styling & Theming

### Color System

**Gains (Positive)**:
- Text: `text-green-600 dark:text-green-500`
- Background: `bg-green-500`
- Badge: `variant="success"`

**Losses (Negative)**:
- Text: `text-red-600 dark:text-red-500`
- Background: `bg-destructive`
- Badge: `variant="destructive"`

**Neutral**:
- Text: `text-muted-foreground`
- Background: `bg-muted`

### Spacing

- Card padding: `p-6` / `px-6` / `py-6`
- Grid gaps: `gap-6`
- Space between sections: `space-y-6`
- Icon gaps: `gap-2`

### Typography

- Page title: `text-3xl font-bold`
- Card title: `text-lg font-semibold`
- Metrics value: `text-2xl font-bold`
- Labels: `text-sm text-muted-foreground`

---

## 📱 Responsive Behavior

### PortfolioOverview
```
Mobile (< 768px):   1 column
Tablet (768px):     2 columns
Desktop (1024px):   4 columns
```

### GraphControls
```
Mobile:   Stacked vertically
Desktop:  Side by side (time range | options)
```

### Chart
```
Mobile:   Reduced margins, rotated labels
Desktop:  Full margins, legend on right
```

---

## 🔄 State Flow

```
User Action → State Update → Data Calculation → UI Update

Example: Time Range Change
┌──────────────────────────────────────────────────────┐
│ 1. User clicks "Monthly" tab                         │
│ 2. onRangeChange('monthly') called                   │
│ 3. timeRange state updated                           │
│ 4. useMemo recalculates filtered data                │
│ 5. useMemo recalculates portfolio metrics            │
│ 6. Components re-render with new data                │
└──────────────────────────────────────────────────────┘
```

---

## ✅ Integration Checklist

- [ ] Install `@radix-ui/react-tabs`
- [ ] Copy all component files to project
- [ ] Import components in page.jsx
- [ ] Add state management (useState hooks)
- [ ] Connect data to components
- [ ] Test time range switching
- [ ] Test on mobile devices
- [ ] Verify dark mode appearance
- [ ] Add loading states
- [ ] Add error handling

---

## 🎯 Component Props Quick Reference

| Component | Required Props | Optional Props |
|-----------|---------------|----------------|
| PortfolioOverview | `data` | - |
| GraphControls | `activeRange`, `onRangeChange` | `showVolume`, `onVolumeToggle`, `showMA`, `onMAToggle` |
| Badge | - | `variant`, `className` |
| Tabs | `value`, `onValueChange` | `defaultValue`, `className` |

---

## 📚 Related Files

- `PortfolioOverview.tsx` - Portfolio metrics component
- `GraphControls.tsx` - Chart controls component
- `utils.ts` - Utility functions
- `example-integration.tsx` - Complete example
- `UI_IMPROVEMENTS.md` - Future enhancements
- `QUICK_START.md` - Setup guide

---

## 🚀 Performance Tips

1. **Memoize calculations**: Use `React.useMemo` for expensive operations
2. **Lazy load chart**: Use `React.lazy` for Nivo charts
3. **Debounce updates**: Don't recalculate on every frame
4. **Virtual scrolling**: For large transaction lists
5. **Code splitting**: Split chart code into separate chunk

---

## 🎨 Customization Examples

### Change Card Appearance
```tsx
<Card className="border-2 border-primary">
  {/* content */}
</Card>
```

### Modify Icon Size
```tsx
<DollarSign className="h-5 w-5" /> // Larger
<DollarSign className="h-3 w-3" /> // Smaller
```

### Custom Color for Gains
```tsx
// In PortfolioOverview.tsx
<Badge variant="success" className="bg-blue-500">
  {formatCurrency(absoluteChange)}
</Badge>
```

### Add Animation
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  <PortfolioOverview data={portfolioData} />
</motion.div>
```

---

## 🏆 Best Practices

1. **Type Safety**: Always use TypeScript interfaces
2. **Prop Validation**: Define required vs optional props clearly
3. **Error Boundaries**: Wrap components in error boundaries
4. **Loading States**: Show skeletons while data loads
5. **Accessibility**: Use semantic HTML and ARIA labels
6. **Mobile First**: Design for mobile, enhance for desktop
7. **Performance**: Memoize expensive calculations
8. **Testing**: Write tests for calculation functions

---

This component system provides a solid foundation for your ETF tracker with professional UI/UX and room for future enhancements! 🎉
