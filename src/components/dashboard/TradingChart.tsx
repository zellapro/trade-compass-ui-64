
import { Card } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
  Legend
} from "recharts";

interface TradingChartProps {
  chartType: string;
}

// Sample data for demonstrations
const equityData = [
  { date: "Jan 01", equity: 10000 },
  { date: "Jan 05", equity: 10200 },
  { date: "Jan 10", equity: 10150 },
  { date: "Jan 15", equity: 10400 },
  { date: "Jan 20", equity: 10300 },
  { date: "Jan 25", equity: 10550 },
  { date: "Feb 01", equity: 10700 },
  { date: "Feb 05", equity: 10900 },
  { date: "Feb 10", equity: 11100 },
  { date: "Feb 15", equity: 11050 },
  { date: "Feb 20", equity: 11300 },
];

const pnlData = [
  { date: "Feb 14", pnl: 120 },
  { date: "Feb 15", pnl: -50 },
  { date: "Feb 16", pnl: 80 },
  { date: "Feb 17", pnl: 200 },
  { date: "Feb 18", pnl: -30 },
  { date: "Feb 19", pnl: 150 },
  { date: "Feb 20", pnl: 250 },
];

const winLossData = [
  { name: "Wins", value: 68 },
  { name: "Losses", value: 32 },
];

const COLORS = ["#22C55E", "#EF4444"];

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

export function TradingChart({ chartType }: TradingChartProps) {
  const renderChart = () => {
    switch (chartType) {
      case 'equity':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={equityData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis 
                domain={['dataMin - 200', 'dataMax + 200']}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
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
      
      case 'pnl':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <RechartsBarChart
              data={pnlData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const pnlValue = payload[0].value as number;
                    return (
                      <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                        <p className="font-medium">{label}</p>
                        <p className={`text-sm ${pnlValue >= 0 ? 'text-trading-green' : 'text-trading-red'}`}>
                          P&L: <span className="font-mono">${pnlValue}</span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar 
                dataKey="pnl" 
                fill={(entry) => entry.pnl >= 0 ? "#22C55E" : "#EF4444"}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
        
      case 'winloss':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={winLossData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {winLossData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-border bg-background p-2 shadow-md">
                        <p className="font-medium">{payload[0].name}</p>
                        <p className="text-sm">
                          {payload[0].value} trades ({(payload[0].payload.value / 100).toFixed(0)}%)
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
        
      case 'duration':
        return (
          <ResponsiveContainer width="100%" height={350}>
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
                unit=" $" 
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
                fill={(entry) => entry.pnl >= 0 ? "#22C55E" : "#EF4444"}
              />
            </ScatterChart>
          </ResponsiveContainer>
        );
        
      default:
        return <div>Select a chart type</div>;
    }
  };

  return renderChart();
}
