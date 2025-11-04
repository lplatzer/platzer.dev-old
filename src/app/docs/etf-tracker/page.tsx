'use client';

import { DocLayout, DocSection, DocSubsection } from '@/components/DocLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingUp, Users } from 'lucide-react';

export default function ETFTrackerPage() {
  const sections = [
    {
      title: 'What is the ETF Tracker?',
      id: 'what-is-it'
    },
    {
      title: 'Getting Started',
      id: 'getting-started'
    },
    {
      title: 'Key Features',
      id: 'key-features',
      subsections: [
        { title: 'ETF Overview', id: 'etf-overview' },
        { title: 'Performance Tracking', id: 'performance-tracking' },
        { title: 'Search and Filter', id: 'search-filter' }
      ]
    },
    {
      title: 'How to Use',
      id: 'how-to-use',
      subsections: [
        { title: 'Viewing ETF Data', id: 'viewing-data' },
        { title: 'Understanding the Data', id: 'understanding-data' },
        { title: 'Best Practices', id: 'best-practices-usage' }
      ]
    },
    {
      title: 'Use Cases',
      id: 'use-cases'
    },
    {
      title: 'Important Disclaimers',
      id: 'disclaimers'
    },
    {
      title: 'Troubleshooting',
      id: 'troubleshooting'
    },
    {
      title: 'Tips for Effective Tracking',
      id: 'tips'
    }
  ];

  return (
    <DocLayout
      title="ETF Tracker User Guide"
      description="Track and analyze Exchange-Traded Funds with comprehensive analytics"
      sections={sections}
    >
      <DocSection id="what-is-it" title="What is the ETF Tracker?">
        <p className="lead text-xl text-muted-foreground mb-4">
          The ETF Tracker is a tool that helps you monitor Exchange-Traded Funds, providing insights into performance, trends, and key metrics.
        </p>
        <p>
          Whether you're an investor, financial professional, or simply tracking the market, 
          this tool gives you the data you need to make informed decisions.
        </p>
      </DocSection>

      <DocSection id="getting-started" title="Getting Started">
        <Card>
          <CardContent className="pt-6">
            <ol className="space-y-3 list-decimal list-inside">
              <li>Navigate to "ETF Tracker" from the main navigation menu</li>
              <li>The tracker will load with a default view of popular ETFs</li>
              <li>No login or account creation required</li>
            </ol>
          </CardContent>
        </Card>
      </DocSection>

      <DocSection id="key-features" title="Key Features">
        <DocSubsection id="etf-overview" title="ETF Overview">
          <p className="mb-4">View essential information about each ETF:</p>
          <div className="grid gap-3 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <strong>Name and Ticker Symbol</strong>
                <p className="text-sm text-muted-foreground">Identify the fund</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <strong>Current Price</strong>
                <p className="text-sm text-muted-foreground">Real-time or recent pricing data</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <strong>Performance Metrics</strong>
                <p className="text-sm text-muted-foreground">Daily, weekly, monthly, and yearly changes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <strong>Key Statistics</strong>
                <p className="text-sm text-muted-foreground">Volume, market cap, and other relevant data</p>
              </CardContent>
            </Card>
          </div>
        </DocSubsection>

        <DocSubsection id="performance-tracking" title="Performance Tracking">
          <p className="mb-4">Monitor how ETFs perform over time:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Historical Data:</strong>
                <span className="text-muted-foreground"> View past performance trends</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Comparative Analysis:</strong>
                <span className="text-muted-foreground"> Compare multiple ETFs side-by-side</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Time Ranges:</strong>
                <span className="text-muted-foreground"> Select different time periods for analysis</span>
              </div>
            </li>
          </ul>
        </DocSubsection>

        <DocSubsection id="search-filter" title="Search and Filter">
          <Card>
            <CardContent className="pt-6 space-y-3">
              <div>
                <strong>Search by Ticker:</strong>
                <p className="text-sm text-muted-foreground">Enter the ETF symbol (e.g., SPY, QQQ, VTI)</p>
              </div>
              <div>
                <strong>Search by Name:</strong>
                <p className="text-sm text-muted-foreground">Find ETFs by their full name</p>
              </div>
              <div>
                <strong>Filter by Category:</strong>
                <p className="text-sm text-muted-foreground">Browse ETFs by sector or type</p>
              </div>
            </CardContent>
          </Card>
        </DocSubsection>
      </DocSection>

      <DocSection id="how-to-use" title="How to Use">
        <DocSubsection id="viewing-data" title="Viewing ETF Data">
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">1. Browse Available ETFs</h5>
                <p className="text-sm text-muted-foreground">Scroll through the main list of tracked ETFs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">2. Click for Details</h5>
                <p className="text-sm text-muted-foreground">Select an ETF to view detailed information</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">3. Check Performance</h5>
                <p className="text-sm text-muted-foreground">Review performance charts and statistics</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">4. Compare ETFs</h5>
                <p className="text-sm text-muted-foreground">Add multiple ETFs to your watchlist for comparison</p>
              </CardContent>
            </Card>
          </div>
        </DocSubsection>

        <DocSubsection id="understanding-data" title="Understanding the Data">
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="price">Price Information</TabsTrigger>
              <TabsTrigger value="performance">Performance Indicators</TabsTrigger>
            </TabsList>
            <TabsContent value="price">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div>
                    <strong>Current Price:</strong>
                    <p className="text-sm text-muted-foreground">The most recent trading price</p>
                  </div>
                  <div>
                    <strong>Change:</strong>
                    <p className="text-sm text-muted-foreground">Dollar amount change from previous close</p>
                  </div>
                  <div>
                    <strong>Percentage Change:</strong>
                    <p className="text-sm text-muted-foreground">Percentage change from previous close</p>
                  </div>
                  <div>
                    <strong>Open/Close:</strong>
                    <p className="text-sm text-muted-foreground">Opening and closing prices for the trading day</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance">
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div>
                    <strong>Day Range:</strong>
                    <p className="text-sm text-muted-foreground">Highest and lowest prices during the trading day</p>
                  </div>
                  <div>
                    <strong>52-Week Range:</strong>
                    <p className="text-sm text-muted-foreground">Yearly high and low prices</p>
                  </div>
                  <div>
                    <strong>Volume:</strong>
                    <p className="text-sm text-muted-foreground">Number of shares traded</p>
                  </div>
                  <div>
                    <strong>Average Volume:</strong>
                    <p className="text-sm text-muted-foreground">Typical trading volume over a period</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DocSubsection>

        <DocSubsection id="best-practices-usage" title="Best Practices">
          <ul className="space-y-2">
            <li><strong>Regular Monitoring:</strong> Check your tracked ETFs regularly for updates</li>
            <li><strong>Diversification:</strong> Track a variety of ETFs across different sectors</li>
            <li><strong>Long-Term View:</strong> Consider long-term trends rather than daily fluctuations</li>
            <li><strong>Research First:</strong> Use this as one tool in your research process</li>
            <li><strong>Stay Informed:</strong> Understand what the ETF invests in before tracking</li>
          </ul>
        </DocSubsection>
      </DocSection>

      <DocSection id="use-cases" title="Use Cases">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold mb-2">For Investors</h5>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Monitor current holdings</li>
                    <li>Research potential investments</li>
                    <li>Track portfolio performance</li>
                    <li>Compare different options</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold mb-2">For Financial Professionals</h5>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Provide client updates</li>
                    <li>Analyze market trends</li>
                    <li>Compare fund performance</li>
                    <li>Support recommendations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold mb-2">For Students and Learners</h5>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Understand how ETFs work</li>
                    <li>Learn about market sectors</li>
                    <li>Study performance patterns</li>
                    <li>Practice investment analysis</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold mb-2">For Market Enthusiasts</h5>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Stay updated on movements</li>
                    <li>Track favorite sectors</li>
                    <li>Follow market trends</li>
                    <li>Explore investment vehicles</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DocSection>

      <DocSection id="disclaimers" title="Important Disclaimers">
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">Investment Advice</p>
                  <ul className="space-y-1 text-sm text-red-800 dark:text-red-200 list-disc list-inside">
                    <li>This tool is for <strong>informational purposes only</strong></li>
                    <li>It does <strong>not constitute financial advice</strong></li>
                    <li>Always consult with a qualified financial advisor before making investment decisions</li>
                    <li>Past performance does not guarantee future results</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">Data Accuracy</p>
                  <ul className="space-y-1 text-sm text-red-800 dark:text-red-200 list-disc list-inside">
                    <li>Data is provided for reference and may have delays</li>
                    <li>Always verify critical information with official sources</li>
                    <li>Market data can change rapidly</li>
                    <li>Technical issues may occasionally affect data accuracy</li>
                  </ul>
                </div>
                <Separator />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100 mb-2">Risk Warning</p>
                  <ul className="space-y-1 text-sm text-red-800 dark:text-red-200 list-disc list-inside">
                    <li>ETF investments carry risk, including potential loss of principal</li>
                    <li>Market volatility can impact ETF values</li>
                    <li>Do your own research before investing</li>
                    <li>Consider your risk tolerance and investment goals</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DocSection>

      <DocSection id="troubleshooting" title="Troubleshooting">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h5 className="font-semibold mb-2">Data Not Loading</h5>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Refresh your browser</li>
                <li>Check your internet connection</li>
                <li>Try clearing browser cache</li>
                <li>Wait a few moments if markets are experiencing high volume</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h5 className="font-semibold mb-2">Incorrect or Outdated Data</h5>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Verify the last update timestamp</li>
                <li>Check if markets are currently open</li>
                <li>Consider market holidays and closures</li>
                <li>Cross-reference with other sources if needed</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h5 className="font-semibold mb-2">Can't Find a Specific ETF</h5>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Verify the ticker symbol is correct</li>
                <li>Check if the ETF is actively traded</li>
                <li>Some newer or less common ETFs may not be included</li>
                <li>Try searching by full name instead of ticker</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DocSection>

      <DocSection id="tips" title="Tips for Effective Tracking">
        <Card>
          <CardContent className="pt-6">
            <ol className="space-y-2 list-decimal list-inside">
              <li><strong>Create a Watchlist:</strong> Keep track of ETFs you're interested in</li>
              <li><strong>Set Time Aside:</strong> Check markets at consistent times</li>
              <li><strong>Focus on Trends:</strong> Don't overreact to daily fluctuations</li>
              <li><strong>Understand Holdings:</strong> Know what assets the ETF contains</li>
              <li><strong>Consider Fees:</strong> Be aware of expense ratios and costs</li>
              <li><strong>Diversify Sectors:</strong> Track ETFs across different industries</li>
              <li><strong>Stay Educated:</strong> Continue learning about ETFs and investing</li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-6 p-6 bg-muted rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Understanding Market Terms</h4>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <Badge className="mb-1">ETF</Badge>
              <p className="text-sm text-muted-foreground">Exchange-Traded Fund - trades on stock exchanges</p>
            </div>
            <div>
              <Badge className="mb-1">Ticker Symbol</Badge>
              <p className="text-sm text-muted-foreground">Unique abbreviation for the ETF (e.g., SPY)</p>
            </div>
            <div>
              <Badge className="mb-1">NAV</Badge>
              <p className="text-sm text-muted-foreground">Net Asset Value - per-share value of fund's holdings</p>
            </div>
            <div>
              <Badge className="mb-1">Expense Ratio</Badge>
              <p className="text-sm text-muted-foreground">Annual fee charged by the fund</p>
            </div>
          </div>
        </div>
      </DocSection>
    </DocLayout>
  );
}
