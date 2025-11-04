/**
 * Utility functions for ETF tracker
 */

import { TimeRange } from './GraphControls';

export interface ETFDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartDataPoint {
  x: string;
  y: number;
}

/**
 * Format currency to Euro
 */
export function formatCurrency(value: number, locale: string = 'de-DE'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format percentage with sign
 */
export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, locale: string = 'de-DE'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

/**
 * Calculate days difference from now
 */
export function getDaysAgo(timeRange: TimeRange): number {
  switch (timeRange) {
    case 'daily':
      return 30; // Last 30 days
    case 'monthly':
      return 180; // Last 6 months
    case 'yearly':
      return 365; // Last year
    case 'all':
    default:
      return Infinity;
  }
}

/**
 * Filter data based on time range
 */
export function filterDataByTimeRange(
  data: ChartDataPoint[],
  timeRange: TimeRange
): ChartDataPoint[] {
  if (timeRange === 'all') return data;

  const daysAgo = getDaysAgo(timeRange);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysAgo);

  return data.filter(point => new Date(point.x) >= cutoffDate);
}

/**
 * Calculate portfolio metrics
 */
export function calculatePortfolioMetrics(
  data: ChartDataPoint[],
  shares: number,
  initialPrice?: number
) {
  if (data.length === 0) {
    return {
      currentValue: 0,
      currentPrice: 0,
      percentageChange: 0,
      absoluteChange: 0,
      highestPrice: 0,
      lowestPrice: 0,
      lastUpdated: '',
    };
  }

  const firstPrice = initialPrice || data[0].y;
  const currentPrice = data[data.length - 1].y;
  const currentValue = currentPrice * shares;
  const initialValue = firstPrice * shares;
  const absoluteChange = currentValue - initialValue;
  const percentageChange = ((currentValue - initialValue) / initialValue) * 100;

  const prices = data.map(d => d.y);
  const highestPrice = Math.max(...prices);
  const lowestPrice = Math.min(...prices);
  const lastUpdated = data[data.length - 1].x;

  return {
    currentValue,
    currentPrice,
    initialValue,
    percentageChange,
    absoluteChange,
    highestPrice,
    lowestPrice,
    lastUpdated,
  };
}

/**
 * Calculate moving average
 */
export function calculateMovingAverage(
  data: ChartDataPoint[],
  period: number = 50
): ChartDataPoint[] {
  if (data.length < period) return [];

  const result: ChartDataPoint[] = [];

  for (let i = period - 1; i < data.length; i++) {
    const slice = data.slice(i - period + 1, i + 1);
    const average = slice.reduce((sum, point) => sum + point.y, 0) / period;
    result.push({
      x: data[i].x,
      y: average,
    });
  }

  return result;
}

/**
 * Transform raw ETF data to chart format
 */
export function transformToChartData(
  rawData: ETFDataPoint[],
  field: 'close' | 'open' | 'high' | 'low' = 'close'
): ChartDataPoint[] {
  return rawData.map(item => ({
    x: item.date,
    y: item[field],
  }));
}

/**
 * Get date format based on time range
 */
export function getDateFormat(timeRange: TimeRange): string {
  switch (timeRange) {
    case 'daily':
      return '%b %d';
    case 'monthly':
      return '%b %Y';
    case 'yearly':
      return '%b %Y';
    case 'all':
    default:
      return '%b %Y';
  }
}

/**
 * Get tick values based on time range
 */
export function getTickValues(timeRange: TimeRange): string {
  switch (timeRange) {
    case 'daily':
      return 'every 3 days';
    case 'monthly':
      return 'every month';
    case 'yearly':
      return 'every month';
    case 'all':
    default:
      return 'every 2 months';
  }
}

/**
 * Calculate year-to-date performance
 */
export function calculateYTDPerformance(data: ChartDataPoint[]): {
  ytdChange: number;
  ytdPercentage: number;
} {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  
  const ytdData = data.filter(point => new Date(point.x) >= startOfYear);
  
  if (ytdData.length < 2) {
    return { ytdChange: 0, ytdPercentage: 0 };
  }

  const startPrice = ytdData[0].y;
  const currentPrice = ytdData[ytdData.length - 1].y;
  const ytdChange = currentPrice - startPrice;
  const ytdPercentage = (ytdChange / startPrice) * 100;

  return { ytdChange, ytdPercentage };
}

/**
 * Get color based on percentage change
 */
export function getChangeColor(percentageChange: number): string {
  if (percentageChange > 0) return 'text-green-600 dark:text-green-500';
  if (percentageChange < 0) return 'text-red-600 dark:text-red-500';
  return 'text-gray-600 dark:text-gray-400';
}

/**
 * Get badge variant based on performance
 */
export function getBadgeVariant(percentageChange: number): 'success' | 'destructive' | 'secondary' {
  if (percentageChange > 0) return 'success';
  if (percentageChange < 0) return 'destructive';
  return 'secondary';
}
