
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

interface EquityCurveChartProps {
  chartType?: "cumulative" | "daily" | "balance" | "advanced";
  timeframe: string;
}

// Mock data for equity curve
const equityData = [
  { date: "Apr 01", equity: 10000, drawdown: 0, dailyPnL: 0 },
  { date: "Apr 02", equity: 10250, drawdown: 0, dailyPnL: 250 },
  { date: "Apr 03", equity: 10180, drawdown: -70, dailyPnL: -70 },
  { date: "Apr 06", equity: 10410, drawdown: 0, dailyPnL: 230 },
  { date: "Apr 07", equity: 10350, drawdown: -60, dailyPnL: -60 },
  { date: "Apr 08", equity: 11185, drawdown: 0, dailyPnL: 835 },
  { date: "Apr 09", equity: 11020, drawdown: -165, dailyPnL: -165 },
  { date: "Apr 10", equity: 11250, drawdown: 0, dailyPnL: 230 },
  { date: "Apr 13", equity: 11325, drawdown: 0, dailyPnL: 75 },
  { date: "Apr 14", equity: 11180, drawdown: -145, dailyPnL: -145 },
  { date: "Apr 15", equity: 10840, drawdown: -340, dailyPnL: -340 },
  { date: "Apr 16", equity: 11020, drawdown: 0, dailyPnL: 180 },
  { date: "Apr 17", equity: 11250, drawdown: 0, dailyPnL: 230 },
  { date: "Apr 18", equity: 11485, drawdown: 0, dailyPnL: 235 },
  { date: "Apr 19", equity: 11685, drawdown: 0, dailyPnL: 200 },
  { date: "Apr 20", equity: 11825, drawdown: 0, dailyPnL: 140 },
  { date: "Apr 21", equity: 12045, drawdown: 0, dailyPnL: 220 },
  { date: "Apr 22", equity: 11865, drawdown: -180, dailyPnL: -180 },
  { date: "Apr 23", equity: 12125, drawdown: 0, dailyPnL: 260 },
  { date: "Apr 24", equity: 12460, drawdown: 0, dailyPnL: 335 },
  { date: "Apr 27", equity: 12760, drawdown: 0, dailyPnL: 300 },
  { date: "Apr 28", equity: 12420, drawdown: -340, dailyPnL: -340 },
  { date: "Apr 29", equity: 12690, drawdown: 0, dailyPnL: 270 },
  { date: "Apr 30", equity: 13140, drawdown: 0, dailyPnL: 450 },
];

export function EquityCurveChart({ chartType = "cumulative", timeframe }: EquityCurveChartProps) {
  const chartConfig = {
    cumulative: {
      label: "Equity",
      theme: {
        light: "#3B82F6",
        dark: "#3B82F6"
      }
    },
    drawdown: {
      label: "Drawdown",
      theme: {
        light: "#EF4444",
        dark: "#EF4444"
      }
    },
    dailyPnL: {
      label: "Daily P&L",
      theme: {
        light: "#22C55E",
        dark: "#22C55E"
      }
    }
  };

  const renderCumulativeChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={equityData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm">
                    Equity: <span className="font-mono">${payload[0].value}</span>
                  </p>
                </div>
              );
            }
            return null;
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
  );

  const renderAdvancedChart = () => (
    <ChartContainer
      config={chartConfig}
      className="h-[400px] w-full"
    >
      <AreaChart
        data={equityData}
        margin={{ top: 10, right: 30, left: 30, bottom: 20 }}
      >
        <defs>
          <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDrawdown" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="date" />
        <YAxis 
          domain={['dataMin - 500', 'dataMax + 500']}
          tickFormatter={(value) => `$${value}`}
        />
        <ChartTooltip 
          content={
            <ChartTooltipContent formatter={(value, name) => {
              return [`$${value}`, name];
            }} />
          }
        />
        <ReferenceLine y={10000} stroke="#888" strokeDasharray="3 3" />
        <Legend />
        <Area
          name="Equity"
          type="monotone"
          dataKey="equity"
          stroke="var(--color-cumulative)"
          fill="url(#colorEquity)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );

  return chartType === "advanced" ? renderAdvancedChart() : renderCumulativeChart();
}
