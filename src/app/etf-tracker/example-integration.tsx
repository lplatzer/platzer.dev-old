"use client";

/**
 * EXAMPLE INTEGRATION FILE
 *
 * This file shows how to integrate the new UI components into your ETF tracker.
 * Copy the relevant sections into your actual page.jsx file.
 */

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { ResponsiveLine } from "@nivo/line";
import * as React from "react";
import { PortfolioOverview } from "@/components/etf/PortfolioOverview";
import { GraphControls, TimeRange } from "@/components/etf/GraphControls";
import { Card, CardContent } from "@/components/ui/card";

// Import your data
import { testEtfData } from "./testData";
import { iSharesXetra } from "../../../2B7K";

const SHARES = 256;
const INITIAL_PRICE = 309.84; // First price from your data
const INITIAL_INVESTMENT = INITIAL_PRICE * SHARES;

export default function ETFTrackerExample() {
  // State management
  const [timeRange, setTimeRange] = React.useState<TimeRange>("monthly");
  const [showVolume, setShowVolume] = React.useState(false);
  const [showMA, setShowMA] = React.useState(false);

  // Auth
  const { user, loading } = useAuth({ ensureSignedIn: true });

  // Transform data for Nivo
  const modEtfData = React.useMemo(
    () => [
      {
        id: "IE00BYX2JD69",
        data: iSharesXetra[0].data.map((item) => ({
          x: item.date,
          y: item.close,
        })),
      },
    ],
    [],
  );

  // Filter data based on time range
  const filteredData = React.useMemo(() => {
    const allData = modEtfData[0].data;
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case "daily":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // Last 30 days
        break;
      case "monthly":
        startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000); // Last 6 months
        break;
      case "yearly":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000); // Last year
        break;
      case "all":
      default:
        return [{ id: modEtfData[0].id, data: allData }];
    }

    const filtered = allData.filter((point) => new Date(point.x) >= startDate);
    return [{ id: modEtfData[0].id, data: filtered }];
  }, [modEtfData, timeRange]);

  // Calculate portfolio metrics
  const portfolioData = React.useMemo(() => {
    const currentDataPoints = filteredData[0]?.data || [];
    if (currentDataPoints.length === 0) {
      return {
        currentValue: 0,
        initialValue: INITIAL_INVESTMENT,
        percentageChange: 0,
        lastUpdated: undefined,
        shares: SHARES,
        currentPrice: 0,
      };
    }

    const latestPrice = currentDataPoints[currentDataPoints.length - 1].y;
    const currentValue = latestPrice * SHARES;
    const percentageChange =
      ((currentValue - INITIAL_INVESTMENT) / INITIAL_INVESTMENT) * 100;
    const lastUpdated = currentDataPoints[currentDataPoints.length - 1].x;

    return {
      currentValue,
      initialValue: INITIAL_INVESTMENT,
      percentageChange,
      lastUpdated,
      shares: SHARES,
      currentPrice: latestPrice,
    };
  }, [filteredData]);

  // Chart component
  const ETFLineChart = ({ data }: { data: any[] }) => (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 120, bottom: 60, left: 70 }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        precision: "day",
        useUTC: false,
      }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: timeRange === "daily" ? "%b %d" : "%b %Y",
        tickValues: timeRange === "daily" ? "every 5 days" : "every 30 days",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -45,
        legend: "Date",
        legendOffset: 50,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Price (€)",
        legendOffset: -60,
        legendPosition: "middle",
        format: (value) => `€${value}`,
      }}
      colors={{ scheme: "category10" }}
      pointSize={timeRange === "daily" ? 4 : 2}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "seriesColor" }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      enableSlices="x"
      useMesh={true}
      enableArea={true}
      areaOpacity={0.1}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
        },
      ]}
      sliceTooltip={({ slice }) => (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
          <div className="text-sm font-semibold mb-2">
            {new Date(slice.points[0].data.x).toLocaleDateString("de-DE")}
          </div>
          {slice.points.map((point) => (
            <div key={point.id} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: point.seriesColor }}
              />
              <span className="font-medium">
                €{Number(point.data.y).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    />
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          ETF Portfolio Tracker
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your iShares Core MSCI World UCITS ETF (IE00BYX2JD69)
        </p>
      </div>

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

      {/* Chart */}
      <Card>
        <CardContent className="pt-6">
          <div className="h-[500px]">
            <ETFLineChart data={filteredData} />
          </div>
        </CardContent>
      </Card>

      {/* Additional Info Section */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <div className="text-sm text-muted-foreground">ISIN</div>
              <div className="text-lg font-semibold">IE00BYX2JD69</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Ticker</div>
              <div className="text-lg font-semibold">2B7K.XETRA</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Exchange</div>
              <div className="text-lg font-semibold">Xetra</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
