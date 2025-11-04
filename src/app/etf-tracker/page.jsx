"use client";

import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { ResponsiveLine } from "@nivo/line";
import * as React from "react";
import { testEtfData, anotherTest } from "./testData.jsx";
import { iSharesXetra } from "../../../2B7K";
import { Card, CardAction, CardTitle } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { GraphControls } from "../../components/etf/GraphControls";
import { PortfolioOverview } from "../../components/etf/PortfolioOverview";

export const data = [
  {
    id: "ETF",
    data: [
      {
        x: "2024-10-14",
        y: 309.84,
      },
      {
        x: "2024-10-15",
        y: 313.34,
      },
      {
        x: "2024-10-16",
        y: 312.92,
      },
      {
        x: "2024-10-17",
        y: 314.7,
      },
      {
        x: "2024-10-18",
        y: 316.56,
      },
      {
        x: "2024-10-21",
        y: 314.89,
      },
      {
        x: "2024-10-22",
        y: 314.69,
      },
      {
        x: "2024-10-23",
        y: 298.57,
      },
      {
        x: "2024-10-24",
        y: 301.58,
      },
      {
        x: "2024-10-25",
        y: 292.61,
      },
      {
        x: "2024-10-28",
        y: 296.79,
      },
      {
        x: "2024-10-29",
        y: 295,
      },
      {
        x: "2024-10-30",
        y: 291.52,
      },
      {
        x: "2024-10-31",
        y: 292.11,
      },
      {
        x: "2024-11-01",
        y: 295.21,
      },
      {
        x: "2024-11-04",
        y: 292.85,
      },
      {
        x: "2024-11-05",
        y: 297.32,
      },
      {
        x: "2024-11-06",
        y: 294,
      },
      {
        x: "2024-11-07",
        y: 294.66,
      },
      {
        x: "2024-11-08",
        y: 298.97,
      },
      {
        x: "2024-11-11",
        y: 301.53,
      },
      {
        x: "2024-11-12",
        y: 298.65,
      },
      {
        x: "2024-11-13",
        y: 297.35,
      },
      {
        x: "2024-11-14",
        y: 298.56,
      },
      {
        x: "2024-11-15",
        y: 292.63,
      },
      {
        x: "2024-11-18",
        y: 291.1,
      },
      {
        x: "2024-11-19",
        y: 290.73,
      },
      {
        x: "2024-11-20",
        y: 290.91,
      },
      {
        x: "2024-11-21",
        y: 288.47,
      },
      {
        x: "2024-11-22",
        y: 290.28,
      },
      {
        x: "2024-11-25",
        y: 296.19,
      },
      {
        x: "2024-11-26",
        y: 296.33,
      },
      {
        x: "2024-11-27",
        y: 295.08,
      },
      {
        x: "2024-11-29",
        y: 296.01,
      },
      {
        x: "2024-12-02",
        y: 292.44,
      },
      {
        x: "2024-12-03",
        y: 294.5,
      },
      {
        x: "2024-12-04",
        y: 295.09,
      },
      {
        x: "2024-12-05",
        y: 299.47,
      },
      {
        x: "2024-12-06",
        y: 298.98,
      },
      {
        x: "2024-12-09",
        y: 301.37,
      },
      {
        x: "2024-12-10",
        y: 300.71,
      },
      {
        x: "2024-12-11",
        y: 296.1,
      },
      {
        x: "2024-12-12",
        y: 296.63,
      },
      {
        x: "2024-12-13",
        y: 296.6,
      },
      {
        x: "2024-12-16",
        y: 297.71,
      },
      {
        x: "2024-12-17",
        y: 296.08,
      },
      {
        x: "2024-12-18",
        y: 290.88,
      },
      {
        x: "2024-12-19",
        y: 290.23,
      },
      {
        x: "2024-12-20",
        y: 292.68,
      },
      {
        x: "2024-12-23",
        y: 291.29,
      },
      {
        x: "2024-12-24",
        y: 293.99,
      },
      {
        x: "2024-12-26",
        y: 294.8,
      },
      {
        x: "2024-12-27",
        y: 293.62,
      },
      {
        x: "2024-12-30",
        y: 289.6,
      },
      {
        x: "2024-12-31",
        y: 289.89,
      },
      {
        x: "2025-01-02",
        y: 292.51,
      },
      {
        x: "2025-01-03",
        y: 294.78,
      },
      {
        x: "2025-01-06",
        y: 292.18,
      },
      {
        x: "2025-01-07",
        y: 289.34,
      },
      {
        x: "2025-01-08",
        y: 286.9,
      },
      {
        x: "2025-01-10",
        y: 282.31,
      },
      {
        x: "2025-01-13",
        y: 283.63,
      },
      {
        x: "2025-01-14",
        y: 281.58,
      },
      {
        x: "2025-01-15",
        y: 282.3,
      },
      {
        x: "2025-01-16",
        y: 279.74,
      },
      {
        x: "2025-01-17",
        y: 280.95,
      },
      {
        x: "2025-01-21",
        y: 282.61,
      },
      {
        x: "2025-01-22",
        y: 281.35,
      },
      {
        x: "2025-01-23",
        y: 284.43,
      },
      {
        x: "2025-01-24",
        y: 285.46,
      },
      {
        x: "2025-01-27",
        y: 293.09,
      },
      {
        x: "2025-01-28",
        y: 291.15,
      },
      {
        x: "2025-01-29",
        y: 290.11,
      },
      {
        x: "2025-01-30",
        y: 290.32,
      },
      {
        x: "2025-01-31",
        y: 288.7,
      },
      {
        x: "2025-02-03",
        y: 290.05,
      },
      {
        x: "2025-02-04",
        y: 289.77,
      },
      {
        x: "2025-02-05",
        y: 288.83,
      },
      {
        x: "2025-02-06",
        y: 294.36,
      },
      {
        x: "2025-02-07",
        y: 294.3,
      },
      {
        x: "2025-02-10",
        y: 308.42,
      },
      {
        x: "2025-02-11",
        y: 310.21,
      },
      {
        x: "2025-02-12",
        y: 307.6,
      },
      {
        x: "2025-02-13",
        y: 310.02,
      },
      {
        x: "2025-02-14",
        y: 308.55,
      },
      {
        x: "2025-02-18",
        y: 304.83,
      },
      {
        x: "2025-02-19",
        y: 301.94,
      },
      {
        x: "2025-02-20",
        y: 303.05,
      },
      {
        x: "2025-02-21",
        y: 304.81,
      },
      {
        x: "2025-02-24",
        y: 307.57,
      },
      {
        x: "2025-02-25",
        y: 310.72,
      },
      {
        x: "2025-02-26",
        y: 304.27,
      },
      {
        x: "2025-02-27",
        y: 309.95,
      },
      {
        x: "2025-02-28",
        y: 308.33,
      },
      {
        x: "2025-03-03",
        y: 304.29,
      },
      {
        x: "2025-03-04",
        y: 305.77,
      },
      {
        x: "2025-03-05",
        y: 307.45,
      },
      {
        x: "2025-03-06",
        y: 310.37,
      },
      {
        x: "2025-03-07",
        y: 321.29,
      },
      {
        x: "2025-03-10",
        y: 317.25,
      },
      {
        x: "2025-03-11",
        y: 306.76,
      },
      {
        x: "2025-03-12",
        y: 299.4,
      },
      {
        x: "2025-03-13",
        y: 297.5,
      },
      {
        x: "2025-03-14",
        y: 299.83,
      },
      {
        x: "2025-03-17",
        y: 303.97,
      },
      {
        x: "2025-03-18",
        y: 303.6,
      },
      {
        x: "2025-03-19",
        y: 306.92,
      },
      {
        x: "2025-03-20",
        y: 307,
      },
      {
        x: "2025-03-21",
        y: 305.44,
      },
      {
        x: "2025-03-24",
        y: 305.67,
      },
      {
        x: "2025-03-25",
        y: 306.92,
      },
      {
        x: "2025-03-26",
        y: 313.58,
      },
      {
        x: "2025-03-27",
        y: 312.69,
      },
      {
        x: "2025-03-28",
        y: 307.09,
      },
      {
        x: "2025-03-31",
        y: 312.37,
      },
      {
        x: "2025-04-01",
        y: 313.63,
      },
      {
        x: "2025-04-02",
        y: 311.58,
      },
      {
        x: "2025-04-03",
        y: 318.27,
      },
      {
        x: "2025-04-04",
        y: 300.11,
      },
      {
        x: "2025-04-07",
        y: 299.89,
      },
      {
        x: "2025-04-08",
        y: 299.83,
      },
      {
        x: "2025-04-09",
        y: 303.96,
      },
      {
        x: "2025-04-10",
        y: 306.78,
      },
      {
        x: "2025-04-11",
        y: 309.9,
      },
      {
        x: "2025-04-14",
        y: 316.07,
      },
      {
        x: "2025-04-15",
        y: 312.48,
      },
      {
        x: "2025-04-16",
        y: 309.1,
      },
      {
        x: "2025-04-17",
        y: 311.3,
      },
      {
        x: "2025-04-21",
        y: 308.72,
      },
      {
        x: "2025-04-22",
        y: 319.08,
      },
      {
        x: "2025-04-23",
        y: 318.48,
      },
      {
        x: "2025-04-24",
        y: 316.22,
      },
      {
        x: "2025-04-25",
        y: 316.74,
      },
      {
        x: "2025-04-28",
        y: 316.81,
      },
      {
        x: "2025-04-29",
        y: 314.5,
      },
      {
        x: "2025-04-30",
        y: 319.65,
      },
      {
        x: "2025-05-01",
        y: 313.64,
      },
      {
        x: "2025-05-02",
        y: 311.96,
      },
      {
        x: "2025-05-05",
        y: 315.72,
      },
      {
        x: "2025-05-06",
        y: 316.79,
      },
      {
        x: "2025-05-07",
        y: 318.13,
      },
      {
        x: "2025-05-08",
        y: 313.49,
      },
      {
        x: "2025-05-09",
        y: 313.68,
      },
      {
        x: "2025-05-12",
        y: 311.92,
      },
      {
        x: "2025-05-13",
        y: 308.69,
      },
      {
        x: "2025-05-14",
        y: 307.5,
      },
      {
        x: "2025-05-15",
        y: 314.48,
      },
      {
        x: "2025-05-16",
        y: 318.61,
      },
      {
        x: "2025-05-19",
        y: 321.23,
      },
      {
        x: "2025-05-20",
        y: 319.8,
      },
      {
        x: "2025-05-21",
        y: 316.44,
      },
      {
        x: "2025-05-22",
        y: 314.31,
      },
      {
        x: "2025-05-23",
        y: 314.57,
      },
      {
        x: "2025-05-27",
        y: 314.95,
      },
      {
        x: "2025-05-28",
        y: 312.84,
      },
      {
        x: "2025-05-29",
        y: 311.86,
      },
      {
        x: "2025-05-30",
        y: 313.85,
      },
      {
        x: "2025-06-02",
        y: 312.68,
      },
      {
        x: "2025-06-03",
        y: 312.39,
      },
      {
        x: "2025-06-04",
        y: 311.57,
      },
      {
        x: "2025-06-05",
        y: 308.98,
      },
      {
        x: "2025-06-06",
        y: 307.36,
      },
      {
        x: "2025-06-09",
        y: 304.78,
      },
      {
        x: "2025-06-10",
        y: 300.43,
      },
      {
        x: "2025-06-11",
        y: 301.72,
      },
      {
        x: "2025-06-12",
        y: 303.16,
      },
      {
        x: "2025-06-13",
        y: 301.91,
      },
      {
        x: "2025-06-16",
        y: 296.29,
      },
      {
        x: "2025-06-17",
        y: 292.31,
      },
      {
        x: "2025-06-18",
        y: 289.63,
      },
      {
        x: "2025-06-20",
        y: 287.46,
      },
      {
        x: "2025-06-23",
        y: 289.52,
      },
      {
        x: "2025-06-24",
        y: 291.47,
      },
      {
        x: "2025-06-25",
        y: 285.55,
      },
      {
        x: "2025-06-26",
        y: 285.63,
      },
      {
        x: "2025-06-27",
        y: 291.55,
      },
      {
        x: "2025-06-30",
        y: 292.17,
      },
      {
        x: "2025-07-01",
        y: 297.49,
      },
      {
        x: "2025-07-02",
        y: 294.63,
      },
      {
        x: "2025-07-03",
        y: 294.08,
      },
      {
        x: "2025-07-07",
        y: 293.53,
      },
      {
        x: "2025-07-08",
        y: 291.67,
      },
      {
        x: "2025-07-09",
        y: 293.02,
      },
      {
        x: "2025-07-10",
        y: 298.39,
      },
      {
        x: "2025-07-11",
        y: 299.91,
      },
      {
        x: "2025-07-14",
        y: 301.88,
      },
      {
        x: "2025-07-15",
        y: 299.62,
      },
      {
        x: "2025-07-16",
        y: 298.9,
      },
      {
        x: "2025-07-17",
        y: 300.37,
      },
      {
        x: "2025-07-18",
        y: 297.07,
      },
      {
        x: "2025-07-21",
        y: 295.74,
      },
      {
        x: "2025-07-22",
        y: 299.17,
      },
      {
        x: "2025-07-23",
        y: 298.12,
      },
      {
        x: "2025-07-24",
        y: 294.48,
      },
      {
        x: "2025-07-25",
        y: 298.47,
      },
      {
        x: "2025-07-28",
        y: 299.22,
      },
      {
        x: "2025-07-29",
        y: 302.67,
      },
      {
        x: "2025-07-30",
        y: 303.61,
      },
      {
        x: "2025-07-31",
        y: 300.07,
      },
      {
        x: "2025-08-01",
        y: 302.89,
      },
      {
        x: "2025-08-04",
        y: 304.23,
      },
      {
        x: "2025-08-05",
        y: 298.77,
      },
      {
        x: "2025-08-06",
        y: 307.66,
      },
      {
        x: "2025-08-07",
        y: 307.91,
      },
      {
        x: "2025-08-08",
        y: 305.45,
      },
      {
        x: "2025-08-11",
        y: 304.36,
      },
      {
        x: "2025-08-12",
        y: 301.64,
      },
      {
        x: "2025-08-13",
        y: 305.07,
      },
      {
        x: "2025-08-14",
        y: 308.95,
      },
      {
        x: "2025-08-15",
        y: 308.93,
      },
      {
        x: "2025-08-18",
        y: 308.7,
      },
      {
        x: "2025-08-19",
        y: 310.93,
      },
      {
        x: "2025-08-20",
        y: 313.08,
      },
      {
        x: "2025-08-21",
        y: 313.22,
      },
      {
        x: "2025-08-22",
        y: 314.07,
      },
      {
        x: "2025-08-25",
        y: 313.44,
      },
      {
        x: "2025-08-26",
        y: 312.94,
      },
      {
        x: "2025-08-27",
        y: 311.43,
      },
      {
        x: "2025-08-28",
        y: 312.22,
      },
      {
        x: "2025-08-29",
        y: 313.54,
      },
      {
        x: "2025-09-02",
        y: 315.76,
      },
      {
        x: "2025-09-03",
        y: 316.39,
      },
      {
        x: "2025-09-04",
        y: 316.99,
      },
      {
        x: "2025-09-05",
        y: 314.38,
      },
      {
        x: "2025-09-08",
        y: 312.8,
      },
      {
        x: "2025-09-09",
        y: 312.52,
      },
      {
        x: "2025-09-10",
        y: 305.94,
      },
      {
        x: "2025-09-11",
        y: 308.43,
      },
      {
        x: "2025-09-12",
        y: 305.4,
      },
      {
        x: "2025-09-15",
        y: 302.07,
      },
      {
        x: "2025-09-16",
        y: 303.29,
      },
      {
        x: "2025-09-17",
        y: 304.97,
      },
      {
        x: "2025-09-18",
        y: 301.14,
      },
      {
        x: "2025-09-19",
        y: 302.38,
      },
      {
        x: "2025-09-22",
        y: 302.99,
      },
      {
        x: "2025-09-23",
        y: 303.19,
      },
      {
        x: "2025-09-24",
        y: 304.33,
      },
      {
        x: "2025-09-25",
        y: 302.3,
      },
      {
        x: "2025-09-26",
        y: 305.24,
      },
      {
        x: "2025-09-29",
        y: 302.99,
      },
      {
        x: "2025-09-30",
        y: 303.89,
      },
      {
        x: "2025-10-01",
        y: 300.52,
      },
      {
        x: "2025-10-02",
        y: 299.88,
      },
      {
        x: "2025-10-03",
        y: 300.98,
      },
      {
        x: "2025-10-06",
        y: 296.04,
      },
      {
        x: "2025-10-07",
        y: 296.32,
      },
      {
        x: "2025-10-08",
        y: 294.4,
      },
      {
        x: "2025-10-09",
        y: 293.81,
      },
      {
        x: "2025-10-10",
        y: 297.01,
      },
    ],
  },
];
let shares = 256;

const newData = [
  {
    id: "IE00BYX2JD69",
    data: data[0].data.map((item) => {
      return {
        x: item.x,
        y: item.y * shares,
      };
    }),
  },
];
const modEtfData = [
  {
    id: "IE00BYX2JD69",
    data: iSharesXetra[0].data.map((item) => {
      return {
        x: item.date,
        y: item.close,
      };
    }),
  },
];
const modEtfDataAccrued = [
  {
    id: "IE00BYX2JD69",
    data: modEtfData[0].data.map((item) => {
      return {
        x: item.x,
        y: item.y * shares,
      };
    }),
  },
];
//  https://www.justetf.com/en/etf-profile.html?isin=IE00BYX2JD69
// Ticker No : 2B7K or 2B7K.Xetra for german market
// not sure where to get the correct data from still

// todo: add sliceToolTip Component that renders date and also value
export default function ETFTracker() {
  const [chartData, setChartData] = React.useState([]);
  console.log(chartData);
  console.log(data[0].data[0]);
  console.log(newData[0].data[0]);
  // React.useEffect(() => {
  //     fetchAndTransformForNivo('SPY').then(data => setChartData(data));
  // }, []);
  // add high/low to data and then calculate the min and max values
  //@ts-expect-error: not sure how to type this correctly

  const ETFLine = ({ data }) => (
    <ResponsiveLine /* or Line for fixed dimensions */
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        precision: "day",
        useUTC: false,
      }}
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%b %Y",
        tickValues: "every 30 day",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{ legend: "value", legendOffset: 0 }}
      pointSize={1}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "seriesColor" }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      enableSlices="x"
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          itemWidth: 80,
          itemHeight: 22,
          symbolShape: "circle",
        },
      ]}
    />
  );
  const TotalEtfValue = ({ data }) => (
    <ResponsiveLine /* or Line for fixed dimensions */
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        precision: "day",
        useUTC: false,
      }}
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: "%b %Y",
        tickValues: "every 30 day",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
      }}
      axisLeft={{ legend: "value", legendOffset: 0 }}
      pointSize={1}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "seriesColor" }}
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      enableSlices="x"
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          translateX: 100,
          itemWidth: 80,
          itemHeight: 22,
          symbolShape: "circle",
        },
      ]}
    />
  );
  // If the user isn't signed in, they will be automatically redirected to AuthKit
  const { user, loading } = useAuth({ ensureSignedIn: true });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl">Finance overview for Portfolio</h2>
      <div className="w-full h-200 bg-white rounded-lg shadow-lg p-10">
        <Card>
          <CardTitle>Data for {modEtfData[0].id} (ISIN IE00BYX2JD69)</CardTitle>
          <CardAction>
            <div className="flex items-center space-x-2">
              <Switch id="accruedValue" />
              <Label htmlFor="accruedValue">Gesamtwert</Label>
            </div>
          </CardAction>
          <Card>
            <ETFLine data={modEtfData} />
          </Card>
        </Card>
      </div>
      <h2>Added up data for {modEtfDataAccrued[0].id}</h2>
      <div className="w-300 h-200 bg-white rounded-lg shadow-lg p-10">
        <TotalEtfValue data={modEtfDataAccrued} />
      </div>
    </div>
  );
}
