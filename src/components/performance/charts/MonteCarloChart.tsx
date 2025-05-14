
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Generate mock data for the chart
const generateMockData = () => {
  const data = [];
  let baseEquity = 10000;
  let upperBound = baseEquity;
  let lowerBound = baseEquity;
  let median = baseEquity;
  
  for (let i = 0; i <= 100; i += 5) {
    const tradeNum = i;
    const volatility = Math.sqrt(i) * 200; // Increases with more trades
    
    median = baseEquity * (1 + 0.003 * i); // Median path assumes small positive edge
    upperBound = median + volatility;
    lowerBound = Math.max(median - volatility, 0); // Can't go below 0
    
    data.push({
      trades: tradeNum,
      median: median,
      upper: upperBound,
      lower: lowerBound,
    });
  }
  
  return data;
};

interface MonteCarloChartProps {
  scale: "linear" | "log";
}

export const MonteCarloChart = ({ scale }: MonteCarloChartProps) => {
  const data = generateMockData();
  
  return (
    <ChartContainer
      config={{
        median: {
          label: "Median Path",
          color: "#00FF99", // Green for median line
        },
        upper: {
          label: "Upper Bound",
          color: "rgba(111, 0, 255, 0.4)", // Purple for confidence
        },
        lower: {
          label: "Lower Bound",
          color: "#FF4D6D", // Red for drawdown
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="colorUpper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6F00FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6F00FF" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorLower" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4D6D" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FF4D6D" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
          <XAxis 
            dataKey="trades" 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={10}
            tickFormatter={(value) => `#${value}`}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))" 
            fontSize={10}
            scale={scale}
            domain={scale === "log" ? ["auto", "auto"] : [0, "auto"]}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const tradeNum = payload[0].payload.trades;
                const equityValue = payload[1].value;
                
                return (
                  <div className="bg-background border border-border rounded-md p-2 shadow-md">
                    <p className="text-xs font-medium text-foreground">{`Trade #${tradeNum}`}</p>
                    <p className="text-xs text-muted-foreground">{`Equity: $${equityValue.toLocaleString()}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          
          {/* Areas for the confidence interval */}
          <Area 
            type="monotone" 
            dataKey="upper" 
            stroke="rgba(111, 0, 255, 0.7)" 
            fill="url(#colorUpper)" 
            strokeWidth={1}
          />
          <Area 
            type="monotone" 
            dataKey="lower" 
            stroke="rgba(255, 77, 109, 0.7)" 
            fill="url(#colorLower)" 
            strokeWidth={1}
          />
          
          {/* Median line */}
          <Area
            type="monotone"
            dataKey="median"
            stroke="#00FF99"
            strokeWidth={2}
            fill="none"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
