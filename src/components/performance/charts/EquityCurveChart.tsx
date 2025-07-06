
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface EquityCurveChartProps {
  timeframe: string;
  showPercentage?: boolean;
}

export function EquityCurveChart({ timeframe, showPercentage = false }: EquityCurveChartProps) {
  // Mock data for equity curve
  const baseData = [
    { date: "Jan 1", equity: 10000 },
    { date: "Jan 8", equity: 10250 },
    { date: "Jan 15", equity: 10200 },
    { date: "Jan 22", equity: 10450 },
    { date: "Jan 29", equity: 10650 },
    { date: "Feb 5", equity: 10550 },
    { date: "Feb 12", equity: 10800 },
    { date: "Feb 19", equity: 11050 },
    { date: "Feb 26", equity: 11250 },
    { date: "Mar 5", equity: 11180 },
    { date: "Mar 12", equity: 11450 },
    { date: "Mar 19", equity: 11580 },
    { date: "Mar 26", equity: 11750 },
  ];

  // Convert to percentage if needed
  const chartData = showPercentage 
    ? baseData.map((item, index) => ({
        date: item.date,
        equity: index === 0 ? 0 : ((item.equity - baseData[0].equity) / baseData[0].equity) * 100
      }))
    : baseData;

  // Adjust timeframe - in a real app, this would filter data based on the timeframe
  // For this demo, we'll just use all data

  return (
    <ChartContainer
      config={{
        equity: {
          color: "#3B82F6",
        },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="date"
            stroke="rgba(255,255,255,0.5)"
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)" 
            tickFormatter={(value) => showPercentage ? `${value.toFixed(0)}%` : `$${value}`} 
          />
          <Tooltip 
            formatter={(value: number) => [
              showPercentage ? `${value.toFixed(2)}%` : `$${value.toLocaleString()}`, 
              showPercentage ? "Growth" : "Equity"
            ]}
            contentStyle={{ 
              backgroundColor: 'rgba(20, 20, 30, 0.9)', 
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: 'white'
            }}
          />
          <Area
            type="monotone"
            dataKey="equity"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorEquity)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
