"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar, TrendingUp } from "lucide-react"

export type TimeRange = "daily" | "monthly" | "yearly" | "all"

interface GraphControlsProps {
  activeRange: TimeRange
  onRangeChange: (range: TimeRange) => void
  showVolume?: boolean
  onVolumeToggle?: (show: boolean) => void
  showMA?: boolean
  onMAToggle?: (show: boolean) => void
}

export function GraphControls({
  activeRange,
  onRangeChange,
  showVolume = false,
  onVolumeToggle,
  showMA = false,
  onMAToggle,
}: GraphControlsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Time Range Selector */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">Time Range</span>
            </div>
            <Tabs value={activeRange} onValueChange={(value) => onRangeChange(value as TimeRange)}>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
                <TabsTrigger value="all">All Time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Chart Options */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">Display Options</span>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              {onVolumeToggle && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-volume"
                    checked={showVolume}
                    onCheckedChange={onVolumeToggle}
                  />
                  <Label htmlFor="show-volume" className="cursor-pointer text-sm">
                    Show Volume
                  </Label>
                </div>
              )}
              
              {onMAToggle && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-ma"
                    checked={showMA}
                    onCheckedChange={onMAToggle}
                  />
                  <Label htmlFor="show-ma" className="cursor-pointer text-sm">
                    Moving Average
                  </Label>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
