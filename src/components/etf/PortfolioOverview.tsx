"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react"

interface PortfolioData {
  currentValue: number
  initialValue: number
  percentageChange: number
  lastUpdated?: string
  shares?: number
  currentPrice?: number
}

interface PortfolioOverviewProps {
  data: PortfolioData
}

export function PortfolioOverview({ data }: PortfolioOverviewProps) {
  const {
    currentValue,
    initialValue,
    percentageChange,
    lastUpdated,
    shares,
    currentPrice,
  } = data

  const absoluteChange = currentValue - initialValue
  const isPositive = percentageChange >= 0

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Intl.DateTimeFormat("de-DE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(dateString))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Portfolio Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Current Value */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>Current Value</span>
            </div>
            <div className="text-2xl font-bold">{formatCurrency(currentValue)}</div>
          </div>

          {/* Percentage Change */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>Total Return</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">
                {formatPercentage(percentageChange)}
              </span>
              <Badge variant={isPositive ? "success" : "destructive"}>
                {formatCurrency(absoluteChange)}
              </Badge>
            </div>
          </div>

          {/* Shares & Price */}
          {shares && currentPrice && (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Holdings
              </div>
              <div className="space-y-1">
                <div className="text-lg font-semibold">{shares} Shares</div>
                <div className="text-sm text-muted-foreground">
                  @ {formatCurrency(currentPrice)}
                </div>
              </div>
            </div>
          )}

          {/* Last Updated */}
          {lastUpdated && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Last Updated</span>
              </div>
              <div className="text-lg font-semibold">{formatDate(lastUpdated)}</div>
            </div>
          )}
        </div>

        {/* Initial Investment Info */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Initial Investment</span>
            <span className="font-semibold">{formatCurrency(initialValue)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
