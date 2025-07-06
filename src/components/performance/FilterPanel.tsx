
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface FilterPanelProps {
  onTimeframeChange: (timeframe: string) => void;
  className?: string;
}

export function FilterPanel({ onTimeframeChange, className }: FilterPanelProps) {
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="timeframe" className="text-sm font-medium">Timeframe:</Label>
            <Select defaultValue="30d" onValueChange={onTimeframeChange}>
              <SelectTrigger id="timeframe" className="w-[120px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="strategy" className="text-sm font-medium">Strategy:</Label>
            <Select defaultValue="all">
              <SelectTrigger id="strategy" className="w-[150px]">
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Strategies</SelectItem>
                <SelectItem value="breakout">Breakout</SelectItem>
                <SelectItem value="pullback">Pullback</SelectItem>
                <SelectItem value="trend-follow">Trend Following</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="account" className="text-sm font-medium">Account:</Label>
            <Select defaultValue="main">
              <SelectTrigger id="account" className="w-[150px]">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Account</SelectItem>
                <SelectItem value="demo">Demo Account</SelectItem>
                <SelectItem value="combined">All Accounts</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="market" className="text-sm font-medium">Market:</Label>
            <Select defaultValue="all">
              <SelectTrigger id="market" className="w-[150px]">
                <SelectValue placeholder="Select market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Markets</SelectItem>
                <SelectItem value="stocks">Stocks</SelectItem>
                <SelectItem value="forex">Forex</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="futures">Futures</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
