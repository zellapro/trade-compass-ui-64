
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";

interface StrategyBreakdownChartProps {
  timeframe: string;
}

// Mock data for strategy breakdown
const strategyData = [
  { name: "Bull Flag", value: 35, fill: "#3B82F6", winRate: 78, avgRR: 2.1 },
  { name: "VWAP Bounce", value: 25, fill: "#8B5CF6", winRate: 65, avgRR: 1.8 },
  { name: "Reversal", value: 18, fill: "#EC4899", winRate: 62, avgRR: 1.5 },
  { name: "Breakout", value: 12, fill: "#10B981", winRate: 70, avgRR: 1.9 },
  { name: "Other", value: 10, fill: "#6B7280", winRate: 55, avgRR: 1.2 }
];

export function StrategyBreakdownChart({ timeframe }: StrategyBreakdownChartProps) {
  const chartConfig = {
    "Bull Flag": {
      label: "Bull Flag",
      theme: {
        light: "#3B82F6",
        dark: "#3B82F6"
      }
    },
    "VWAP Bounce": {
      label: "VWAP Bounce",
      theme: {
        light: "#8B5CF6",
        dark: "#8B5CF6"
      }
    },
    "Reversal": {
      label: "Reversal",
      theme: {
        light: "#EC4899",
        dark: "#EC4899"
      }
    },
    "Breakout": {
      label: "Breakout",
      theme: {
        light: "#10B981",
        dark: "#10B981"
      }
    },
    "Other": {
      label: "Other",
      theme: {
        light: "#6B7280",
        dark: "#6B7280"
      }
    }
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={strategyData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {strategyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                  <p className="font-medium" style={{ color: data.fill }}>{data.name}</p>
                  <p className="text-sm">
                    Trades: <span className="font-mono">{data.value}</span>
                  </p>
                  <p className="text-sm">
                    Win Rate: <span className="font-mono">{data.winRate}%</span>
                  </p>
                  <p className="text-sm">
                    Avg RR: <span className="font-mono">{data.avgRR}R</span>
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
