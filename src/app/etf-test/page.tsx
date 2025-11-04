'use client';

import { useAuth } from '@workos-inc/authkit-nextjs/components';
import { ResponsiveLine } from '@nivo/line';
import * as React from 'react';
import { PortfolioOverview } from '@/components/etf/PortfolioOverview';
import { GraphControls, TimeRange } from '@/components/etf/GraphControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  calculatePortfolioMetrics,
  filterDataByTimeRange,
  getDateFormat,
  getTickValues,
  formatCurrency,
} from '@/components/etf/utils';
import {
  fetchETFHistory,
  convertToChartData,
  type ChartDataPoint,
} from '@/lib/etf-api';

const SHARES = 256;
const ETF_ISIN = 'IE00BYX2JD69';
const ETF_NAME = 'iShares Core MSCI World UCITS ETF';
const TICKER = '2B7K.DE'; // Yahoo Finance ticker for German exchange

export default function ETFTest() {
  // const { user, loading } = useAuth({ ensureSignedIn: true });
  
  const [timeRange, setTimeRange] = React.useState<TimeRange>('monthly');
  const [showVolume, setShowVolume] = React.useState(false);
  const [showMA, setShowMA] = React.useState(false);
  
  // API data state
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);
  const [apiLoading, setApiLoading] = React.useState(true);
  const [apiError, setApiError] = React.useState<string | null>(null);
  const [initialPrice, setInitialPrice] = React.useState<number>(0);

  // Fetch data from API
  React.useEffect(() => {
    async function fetchData() {
      try {
        setApiLoading(true);
        setApiError(null);
        
        const response = await fetchETFHistory(TICKER, 'max', '1d');
        const data = convertToChartData(response.data);
        
        setChartData(data);
        if (data.length > 0) {
          setInitialPrice(data[0].y);
        }
      } catch (error) {
        console.error('Failed to fetch ETF data:', error);
        setApiError(error instanceof Error ? error.message : 'Failed to fetch data');
      } finally {
        setApiLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const filteredData = React.useMemo(() => {
    return filterDataByTimeRange(chartData, timeRange);
  }, [chartData, timeRange]);

  const portfolioData = React.useMemo(() => {
    if (filteredData.length === 0 || initialPrice === 0) {
      return {
        currentValue: 0,
        initialValue: 0,
        percentageChange: 0,
        lastUpdated: undefined,
        shares: SHARES,
        currentPrice: 0,
      };
    }

    const metrics = calculatePortfolioMetrics(filteredData, SHARES, initialPrice);
    
    return {
      currentValue: metrics.currentValue,
      initialValue: metrics.initialValue,
      percentageChange: metrics.percentageChange,
      lastUpdated: metrics.lastUpdated,
      shares: SHARES,
      currentPrice: metrics.currentPrice,
    };
  }, [filteredData, initialPrice]);

  const chartConfig = React.useMemo(() => ({
    dateFormat: getDateFormat(timeRange),
    tickValues: getTickValues(timeRange),
  }), [timeRange]);

  const ETFLineChart = React.memo(({ data }: { data: any[] }) => {
    const formattedData = [{ id: ETF_ISIN, data }];

    return (
      <ResponsiveLine
        data={formattedData}
        margin={{ top: 20, right: 120, bottom: 60, left: 70 }}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day', useUTC: false }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: chartConfig.dateFormat,
          tickValues: chartConfig.tickValues,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Date',
          legendOffset: 50,
          legendPosition: 'middle',
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Price (€)',
          legendOffset: -60,
          legendPosition: 'middle',
          format: (value) => `€${value.toFixed(0)}`,
        }}
        colors={{ scheme: 'category10' }}
        pointSize={timeRange === 'daily' ? 4 : 2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'seriesColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        enableSlices="x"
        useMesh={true}
        enableArea={true}
        areaOpacity={0.1}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
          }
        ]}
        sliceTooltip={({ slice }) => (
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
            <div className="text-sm font-semibold mb-2">
              {new Date(slice.points[0].data.x).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
            {slice.points.map((point) => (
              <div key={point.id} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: point.seriesColor }}
                />
                <span className="font-medium">
                  {formatCurrency(Number(point.data.y))}
                </span>
              </div>
            ))}
          </div>
        )}
      />
    );
  });

  ETFLineChart.displayName = 'ETFLineChart';

  if (/*loading ||*/ apiLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="space-y-4 text-center">
          <div className="text-lg">Loading ETF data...</div>
          {apiLoading && (
            <div className="text-sm text-muted-foreground">
              Fetching data from API...
            </div>
          )}
        </div>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Error Loading Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{apiError}</p>
            <div className="text-sm">
              <p className="font-semibold mb-2">Troubleshooting:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Make sure the Python API is running on port 8000</li>
                <li>Check <code className="text-xs bg-muted px-1 py-0.5 rounded">http://localhost:8000/docs</code></li>
                <li>Verify CORS is enabled for localhost:3000</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">ETF Portfolio Tracker</h1>
        <p className="text-muted-foreground mt-2">
          Track your {ETF_NAME} investment performance
        </p>
      </div>

      {/* Combined Portfolio Overview and Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Current Value */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Current Value</div>
              <div className="text-2xl font-bold">{formatCurrency(portfolioData.currentValue)}</div>
            </div>

            {/* Total Return */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Total Return</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {portfolioData.percentageChange >= 0 ? '+' : ''}{portfolioData.percentageChange.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Initial Price */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Initial Price</div>
              <div className="text-xl font-semibold">{formatCurrency(initialPrice)}</div>
            </div>

            {/* Current Price */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Current Price</div>
              <div className="text-xl font-semibold">{formatCurrency(portfolioData.currentPrice)}</div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
            {/* Holdings */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Holdings</div>
              <div className="text-lg font-semibold">{SHARES} Shares</div>
            </div>

            {/* Last Updated */}
            {portfolioData.lastUpdated && (
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Last Updated</div>
                <div className="text-lg font-semibold">
                  {new Date(portfolioData.lastUpdated).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
              </div>
            )}

            {/* Initial Investment */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Initial Investment</div>
              <div className="text-lg font-semibold">{formatCurrency(portfolioData.initialValue)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chart with Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Total Value</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Graph Controls inside the card */}
          <GraphControls
            activeRange={timeRange}
            onRangeChange={setTimeRange}
            showVolume={showVolume}
            onVolumeToggle={setShowVolume}
            showMA={showMA}
            onMAToggle={setShowMA}
          />
          
          {/* Chart */}
          <div className="h-[500px]">
            <ETFLineChart data={filteredData} />
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Overview - Holdings List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Holdings List */}
            <div className="border rounded-lg">
              <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 font-semibold text-sm">
                <div>Name</div>
                <div>ISIN</div>
                <div>Ticker</div>
                <div className="text-right">Shares</div>
                <div className="text-right">Value</div>
              </div>
              <div className="grid grid-cols-5 gap-4 p-4 items-center border-t">
                <div className="text-sm font-medium">{ETF_NAME}</div>
                <div className="text-sm text-muted-foreground">{ETF_ISIN}</div>
                <div className="text-sm text-muted-foreground">{TICKER}</div>
                <div className="text-sm font-semibold text-right">{SHARES}</div>
                <div className="text-sm font-semibold text-right">{formatCurrency(portfolioData.currentValue)}</div>
              </div>
            </div>
            
            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-lg font-semibold">Total Portfolio Value</div>
              <div className="text-2xl font-bold">{formatCurrency(portfolioData.currentValue)}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
