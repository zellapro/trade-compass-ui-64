
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell
} from "recharts";

interface TradeDistributionChartProps {
  chartType?: "histogram" | "rmultiple" | "duration" | "timeofday";
  timeframe: string;
}

// Mock data for Win/Loss histogram
const winLossData = [
  { range: "-$500+", count: 2, type: "loss" },
  { range: "-$300 to -$500", count: 3, type: "loss" },
  { range: "-$100 to -$300", count: 5, type: "loss" },
  { range: "-$0 to -$100", count: 8, type: "loss" },
  { range: "$0 to $100", count: 10, type: "win" },
  { range: "$100 to $300", count: 15, type: "win" },
  { range: "$300 to $500", count: 12, type: "win" },
  { range: "$500+", count: 8, type: "win" }
];

// Mock data for R-Multiple Distribution
const rMultipleData = [
  { range: "-3R+", count: 1, type: "loss" },
  { range: "-2R to -3R", count: 2, type: "loss" },
  { range: "-1R to -2R", count: 6, type: "loss" },
  { range: "0 to -1R", count: 9, type: "loss" },
  { range: "0 to 1R", count: 12, type: "win" },
  { range: "1R to 2R", count: 18, type: "win" },
  { range: "2R to 3R", count: 11, type: "win" },
  { range: "3R+", count: 4, type: "win" }
];

// Mock data for Duration vs Profitability
const durationData = [
  { duration: 5, pnl: 120, count: 5, name: "AAPL" },
  { duration: 15, pnl: 80, count: 3, name: "MSFT" },
  { duration: 30, pnl: -40, count: 2, name: "TSLA" },
  { duration: 10, pnl: 150, count: 4, name: "NVDA" },
  { duration: 45, pnl: -20, count: 1, name: "AMZN" },
  { duration: 25, pnl: 90, count: 3, name: "META" },
  { duration: 20, pnl: 70, count: 2, name: "GOOG" },
  { duration: 35, pnl: -60, count: 1, name: "SPY" },
];

// Mock data for Time of Day Performance
const timeOfDayData = [
  { time: "Pre-market", pnl: 420, trades: 8 },
  { time: "9:30-10:00", pnl: 850, trades: 12 },
  { time: "10:00-11:00", pnl: 380, trades: 9 },
  { time: "11:00-12:00", pnl: -120, trades: 6 },
  { time: "12:00-13:00", pnl: -80, trades: 4 },
  { time: "13:00-14:00", pnl: 50, trades: 3 },
  { time: "14:00-15:00", pnl: 180, trades: 5 },
  { time: "15:00-15:30", pnl: 320, trades: 7 },
  { time: "15:30-16:00", pnl: 580, trades: 9 }
];

export function TradeDistributionChart({ chartType = "histogram", timeframe }: TradeDistributionChartProps) {
  const chartConfig = {
    win: {
      label: "Wins",
      theme: {
        light: "#22C55E", // Green
        dark: "#22C55E"
      }
    },
    loss: {
      label: "Losses",
      theme: {
        light: "#EF4444", // Red
        dark: "#EF4444"
      }
    }
  };

  const renderHistogramChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={winLossData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="range" tick={{ fontSize: 10 }} />
        <YAxis label={{ value: 'Trade Count', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm">
                    Count: <span className="font-mono">{payload[0].value}</span>
                  </p>
                  <p className={`text-sm ${payload[0].payload.type === "win" ? "text-trading-green" : "text-trading-red"}`}>
                    Type: {payload[0].payload.type === "win" ? "Win" : "Loss"}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar 
          dataKey="count" 
          name="Trade Count"
        >
          {winLossData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.type === "win" ? "#22C55E" : "#EF4444"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderRMultipleChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={rMultipleData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="range" tick={{ fontSize: 10 }} />
        <YAxis label={{ value: 'Trade Count', angle: -90, position: 'insideLeft' }} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm">
                    Count: <span className="font-mono">{payload[0].value}</span>
                  </p>
                  <p className={`text-sm ${payload[0].payload.type === "win" ? "text-trading-green" : "text-trading-red"}`}>
                    Type: {payload[0].payload.type === "win" ? "Win" : "Loss"}
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar 
          dataKey="count" 
          name="Trade Count"
        >
          {rMultipleData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.type === "win" ? "#22C55E" : "#EF4444"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderDurationChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          type="number" 
          dataKey="duration" 
          name="Duration" 
          unit=" min" 
          tick={{ fontSize: 12 }} 
        />
        <YAxis 
          type="number" 
          dataKey="pnl" 
          name="P&L" 
          unit="$" 
          tick={{ fontSize: 12 }} 
        />
        <ZAxis 
          type="number" 
          dataKey="count" 
          range={[40, 160]} 
          name="count" 
        />
        <Tooltip 
          cursor={{ strokeDasharray: '3 3' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                  <p className="font-medium">{data.name}</p>
                  <p className="text-sm">Duration: {data.duration} min</p>
                  <p className={`text-sm ${data.pnl >= 0 ? 'text-trading-green' : 'text-trading-red'}`}>
                    P&L: ${data.pnl}
                  </p>
                  <p className="text-sm">Trade count: {data.count}</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Scatter 
          name="Trades" 
          data={durationData}
          fill="#8884d8"
        >
          {durationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? "#22C55E" : "#EF4444"} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );

  const renderTimeOfDayChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={timeOfDayData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis dataKey="time" tick={{ fontSize: 10, angle: -45, textAnchor: 'end' }} height={50} />
        <YAxis yAxisId="left" orientation="left" stroke="#22C55E" tickFormatter={(value) => `$${value}`} />
        <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                  <p className="font-medium">{label}</p>
                  <p className="text-sm text-trading-green">
                    P&L: <span className="font-mono">${payload[0].value}</span>
                  </p>
                  <p className="text-sm text-trading-blue">
                    Trades: <span className="font-mono">{payload[1].value}</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="pnl" name="P&L ($)" fill="#22C55E" />
        <Bar yAxisId="right" dataKey="trades" name="Trade Count" fill="#3B82F6" />
      </BarChart>
    </ResponsiveContainer>
  );

  if (chartType === "rmultiple") return renderRMultipleChart();
  if (chartType === "duration") return renderDurationChart();
  if (chartType === "timeofday") return renderTimeOfDayChart();
  return renderHistogramChart();
}
