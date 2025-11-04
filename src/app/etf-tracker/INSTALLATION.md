# Installation & Setup Guide

## 📦 Prerequisites

Ensure you have these installed in your project:
- ✅ Next.js 15.5.4
- ✅ React 19
- ✅ TypeScript
- ✅ Tailwind CSS 4.x
- ✅ @nivo/line (already installed)
- ✅ lucide-react (already installed)

## 🚀 Step-by-Step Installation

### Step 1: Install Missing Dependencies

```bash
# Install Radix UI Tabs primitive
pnpm add @radix-ui/react-tabs

# Verify other dependencies are installed
pnpm list @radix-ui/react-switch @radix-ui/react-label
```

### Step 2: Verify File Structure

Ensure these files exist in your project:

```
src/
├── components/
│   ├── etf/
│   │   ├── PortfolioOverview.tsx     ✅ Created
│   │   ├── GraphControls.tsx         ✅ Created
│   │   └── utils.ts                  ✅ Created
│   ├── ui/
│   │   ├── badge.tsx                 ✅ Created
│   │   ├── tabs.tsx                  ✅ Created
│   │   ├── card.tsx                  ✅ Existing
│   │   ├── label.tsx                 ✅ Existing
│   │   └── switch.tsx                ✅ Existing
│   └── lib/
│       └── utils.ts                  ✅ Existing (cn function)
└── app/
    └── etf-tracker/
        ├── page.jsx                  📝 To be updated
        ├── testData.jsx              ✅ Existing
        ├── example-integration.tsx   ✅ Reference
        ├── INSTALLATION.md           📖 This file
        ├── QUICK_START.md            📖 Usage guide
        ├── COMPONENT_OVERVIEW.md     📖 Component details
        └── UI_IMPROVEMENTS.md        📖 Recommendations
```

### Step 3: Update Your page.jsx

**Option A: Complete Replacement** (Recommended for testing)
```bash
# Backup your current page
cp src/app/etf-tracker/page.jsx src/app/etf-tracker/page.jsx.backup

# Copy the example
cp src/app/etf-tracker/example-integration.tsx src/app/etf-tracker/page.tsx
```

**Option B: Manual Integration** (For production)
See `QUICK_START.md` for step-by-step integration into your existing code.

### Step 4: Update Imports in page.jsx

If you're doing manual integration, add these imports:

```tsx
// Component imports
import { PortfolioOverview } from '@/components/etf/PortfolioOverview';
import { GraphControls, TimeRange } from '@/components/etf/GraphControls';
import { Card, CardContent } from '@/components/ui/card';

// Utility imports
import {
  calculatePortfolioMetrics,
  filterDataByTimeRange,
  getDateFormat,
  getTickValues,
} from '@/components/etf/utils';
```

### Step 5: Add State Management

```tsx
// Add these state hooks
const [timeRange, setTimeRange] = React.useState<TimeRange>('monthly');
const [showVolume, setShowVolume] = React.useState(false);
const [showMA, setShowMA] = React.useState(false);
```

### Step 6: Test the Installation

```bash
# Start development server
pnpm dev

# Open in browser
open http://localhost:3000/etf-tracker
```

**Check for**:
- ✅ No TypeScript errors
- ✅ Components render correctly
- ✅ Time range tabs work
- ✅ Toggles function
- ✅ Portfolio metrics display
- ✅ Responsive layout on mobile

---

## 🔧 Configuration

### TypeScript Configuration

Ensure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind Configuration

Ensure your `tailwind.config.js` includes all component paths:
```js
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of config
}
```

### Add Success Badge Variant (Optional)

If you want the green success badge, add to `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        success: {
          DEFAULT: 'hsl(142 76% 36%)',
          foreground: 'hsl(0 0% 100%)',
        },
      },
    },
  },
}
```

Or use the built-in green variant in `badge.tsx` (already implemented).

---

## 🎨 Customization

### Change Default Time Range

In your page component:
```tsx
const [timeRange, setTimeRange] = React.useState<TimeRange>('yearly'); // Changed from 'monthly'
```

### Change Currency Format

In `src/components/etf/utils.ts`:
```tsx
export function formatCurrency(value: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD', // Changed from 'EUR'
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
```

### Customize Card Styling

Add custom classes to any component:
```tsx
<PortfolioOverview 
  data={portfolioData}
  className="shadow-xl border-2" // Custom styling
/>
```

---

## 🐛 Troubleshooting

### Error: Cannot find module '@radix-ui/react-tabs'

**Solution:**
```bash
pnpm add @radix-ui/react-tabs
```

### Error: Cannot find module '@/components/etf/...'

**Solution:** Check that:
1. Files are in correct location
2. Path aliases are configured in `tsconfig.json`
3. Development server is restarted

### Error: Type 'TimeRange' is not defined

**Solution:** Ensure you're importing from the correct file:
```tsx
import { GraphControls, TimeRange } from '@/components/etf/GraphControls';
```

### Warning: React does not recognize prop

**Solution:** This usually means a DOM element received a non-HTML prop. Check that custom props are spread correctly in components.

### Styling not applied

**Solution:**
1. Check Tailwind config includes component paths
2. Restart development server
3. Clear `.next` cache: `rm -rf .next`

### Dark mode colors incorrect

**Solution:** Ensure you're using semantic color tokens:
- ✅ `bg-background`, `text-foreground`
- ❌ `bg-white`, `text-black`

---

## ✅ Verification Checklist

After installation, verify:

- [ ] All dependencies installed
- [ ] No TypeScript errors
- [ ] All components render
- [ ] Time range tabs switch correctly
- [ ] Portfolio metrics calculate properly
- [ ] Chart updates when changing time range
- [ ] Toggles work (Volume, MA)
- [ ] Responsive on mobile (< 768px)
- [ ] Dark mode works correctly
- [ ] Icons display properly
- [ ] Currency formatting is correct
- [ ] Dates format correctly
- [ ] Colors show for gains/losses

---

## 📱 Testing on Different Devices

### Desktop (1024px+)
```
✅ 4-column portfolio grid
✅ Side-by-side controls
✅ Full chart with legend
✅ Horizontal labels
```

### Tablet (768px - 1023px)
```
✅ 2-column portfolio grid
✅ Stacked controls
✅ Responsive chart
✅ Readable labels
```

### Mobile (< 768px)
```
✅ Single column layout
✅ Stacked everything
✅ Compact chart
✅ Rotated labels (-45°)
```

---

## 🔄 Updating Components

If you need to update components in the future:

1. **Component updates**: Edit files in `src/components/etf/`
2. **Utility updates**: Edit `src/components/etf/utils.ts`
3. **Styling updates**: Edit individual component files
4. **Type updates**: Edit interfaces in component files

---

## 📦 Optional Enhancements

### Add Loading Skeletons

```bash
npx shadcn@latest add skeleton
```

Then wrap components:
```tsx
{loading ? (
  <Skeleton className="h-[200px] w-full" />
) : (
  <PortfolioOverview data={portfolioData} />
)}
```

### Add Toast Notifications

```bash
npx shadcn@latest add toast
```

For error messages and updates.

### Add Dialog/Modal

```bash
npx shadcn@latest add dialog
```

For settings or detailed info.

---

## 🆘 Getting Help

If you encounter issues:

1. Check `QUICK_START.md` for usage examples
2. Review `COMPONENT_OVERVIEW.md` for component details
3. See `example-integration.tsx` for working code
4. Verify all dependencies are installed
5. Check browser console for errors
6. Ensure TypeScript is configured correctly

---

## 🎉 Next Steps

After successful installation:

1. ✅ Test all features
2. ✅ Customize styling to match your brand
3. ✅ Add loading states
4. ✅ Implement error handling
5. ✅ Test on real devices
6. ✅ Optimize performance
7. ✅ Add more features (see `UI_IMPROVEMENTS.md`)

---

## 📊 Performance Checklist

- [ ] Memoize expensive calculations
- [ ] Use React.memo for chart component
- [ ] Lazy load chart library
- [ ] Optimize re-renders
- [ ] Profile with React DevTools
- [ ] Check bundle size

---

## 🔒 Security Checklist

- [ ] No API keys in client code
- [ ] Validate all user inputs
- [ ] Sanitize displayed data
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Regular dependency updates

---

You're all set! Your ETF tracker now has professional UI components ready to use. 🚀
