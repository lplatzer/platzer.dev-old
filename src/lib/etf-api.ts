/**
 * ETF API Client
 * 
 * Client for fetching ETF data from the Python FastAPI backend.
 */

const API_URL = process.env.NEXT_PUBLIC_ETF_API_URL || 'http://localhost:8000';

export interface PriceData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  adjusted_close: number;
}

export interface ETFHistoricalResponse {
  ticker: string;
  name: string | null;
  exchange: string | null;
  currency: string | null;
  fetched_at: string;
  data_points: number;
  data: PriceData[];
}

export interface ETFLatestResponse {
  ticker: string;
  name: string | null;
  latest: PriceData;
  fetched_at: string;
}

export interface ETFInfo {
  ticker: string;
  name: string | null;
  exchange: string | null;
  currency: string | null;
  isin: string | null;
}

export interface ChartDataPoint {
  x: string;
  y: number;
}

/**
 * Fetch historical data for an ETF
 * 
 * @param ticker - ETF ticker symbol (e.g., "2B7K.DE")
 * @param period - Time period (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)
 * @param interval - Data interval (1d, 1wk, 1mo)
 * @returns Historical price data
 */
export async function fetchETFHistory(
  ticker: string,
  period: string = 'max',
  interval: string = '1d'
): Promise<ETFHistoricalResponse> {
  const params = new URLSearchParams({
    period,
    interval,
  });

  const response = await fetch(
    `${API_URL}/etf/${ticker}/history?${params}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control for better performance
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch ETF data' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch latest price for an ETF
 * 
 * @param ticker - ETF ticker symbol
 * @returns Latest price data
 */
export async function fetchLatestPrice(ticker: string): Promise<ETFLatestResponse> {
  const response = await fetch(
    `${API_URL}/etf/${ticker}/latest`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch latest price' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch ETF information/metadata
 * 
 * @param ticker - ETF ticker symbol
 * @returns ETF information
 */
export async function fetchETFInfo(ticker: string): Promise<ETFInfo> {
  const response = await fetch(
    `${API_URL}/etf/${ticker}/info`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 86400 }, // Revalidate daily
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Failed to fetch ETF info' }));
    throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Convert API response to chart data format
 * 
 * @param data - Historical ETF data from API
 * @returns Array of chart data points
 */
export function convertToChartData(data: PriceData[]): ChartDataPoint[] {
  return data.map(item => ({
    x: item.date,
    y: item.close,
  }));
}

/**
 * Health check for the API
 * 
 * @returns True if API is healthy
 */
export async function checkAPIHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      cache: 'no-store',
    });
    return response.ok;
  } catch {
    return false;
  }
}
