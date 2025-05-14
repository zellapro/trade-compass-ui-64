
import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Mock data for demonstration
const generateMockData = () => {
  const baseSeries = Array.from({ length: 50 }, (_, i) => {
    return { trade: i + 1, value: 10000 * (1 + Math.random() * 0.02) ** i };
  });

  const lowerBound = baseSeries.map(point => ({
    trade: point.trade,
    value: point.value * (1 - Math.random() * 0.3 - 0.1)
  }));

  const upperBound = baseSeries.map(point => ({
    trade: point.trade,
    value: point.value * (1 + Math.random() * 0.5 + 0.1)
  }));

  const medianPath = baseSeries.map(point => ({
    trade: point.trade,
    value: point.value
  }));

  const drawdownPath = baseSeries.slice(0, 15).map((point, i) => ({
    trade: point.trade,
    value: point.value * (1 - (i < 10 ? i * 0.03 : (15 - i) * 0.03))
  }));

  return { lowerBound, upperBound, medianPath, drawdownPath };
};

interface MonteCarloChartProps {
  scale?: "linear" | "log";
}

export function MonteCarloChart({ scale = "linear" }: MonteCarloChartProps) {
  const { lowerBound, upperBound, medianPath, drawdownPath } = generateMockData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={medianPath}
        margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(111, 0, 255, 0.3)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgba(111, 0, 255, 0.1)" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="rgba(255, 77, 109, 0.6)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgba(255, 77, 109, 0.1)" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <XAxis 
          dataKey="trade"
          tickFormatter={(tick) => `${tick}`}
          stroke="rgba(255,255,255,0.3)"
        />
        <YAxis
          scale={scale}
          domain={['auto', 'auto']}
          tickFormatter={(tick) => `$${Math.round(tick).toLocaleString()}`}
          stroke="rgba(255,255,255,0.3)"
        />
        <Tooltip
          formatter={(value: number) => [`$${Math.round(value).toLocaleString()}`, 'Equity']}
          labelFormatter={(label) => `Trade #${label}`}
        />
        
        {/* Confidence area between upper and lower bounds */}
        <Area
          dataKey="value"
          data={upperBound}
          stroke="rgba(111, 0, 255, 0.5)"
          fill="none"
          strokeWidth={1}
        />
        <Area
          dataKey="value"
          data={lowerBound}
          stroke="rgba(111, 0, 255, 0.5)"
          fill="url(#colorConfidence)"
          strokeWidth={1}
        />
        
        {/* Drawdown demonstration */}
        <Area
          dataKey="value"
          data={drawdownPath}
          stroke="rgba(255, 77, 109, 0.8)"
          fill="url(#colorDrawdown)"
          strokeWidth={1.5}
        />
        
        {/* Median path */}
        <Area
          dataKey="value"
          data={medianPath}
          stroke="#00FF99"
          fill="none"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
