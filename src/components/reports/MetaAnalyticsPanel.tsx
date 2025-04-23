
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
  ScatterChart,
  Scatter
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Flag, 
  TrendingUp, 
  Clock, 
  Activity,
  BarChart as BarChartIcon, 
  CalendarDays
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MetaAnalyticsPanelProps {
  timeframe?: string;
}

export function MetaAnalyticsPanel({ timeframe = "30d" }: MetaAnalyticsPanelProps) {
  // Alpha Score data
  const alphaScoreData = [
    { setup: "OB Reclaim", value: 35, avgProfit: 110, yourProfit: 162 },
    { setup: "VWAP Bounce", value: 28, avgProfit: 85, yourProfit: 111 },
    { setup: "Breakout", value: 22, avgProfit: 95, yourProfit: 112 },
    { setup: "SMC", value: 32, avgProfit: 105, yourProfit: 152 },
    { setup: "Fib Retracement", value: 18, avgProfit: 75, yourProfit: 84 }
  ];

  // Efficiency ratio data
  const efficiencyData = [
    { setup: "OB Reclaim", pnl: 3850, timeInMinutes: 1850, ratio: 2.08 },
    { setup: "VWAP Bounce", pnl: 2650, timeInMinutes: 1450, ratio: 1.83 },
    { setup: "Breakout", pnl: 2120, timeInMinutes: 950, ratio: 2.23 },
    { setup: "SMC", pnl: 3240, timeInMinutes: 1650, ratio: 1.96 },
    { setup: "Fib Retracement", pnl: 1950, timeInMinutes: 1350, ratio: 1.44 }
  ];

  // Execution Delta data
  const executionDeltaData = [
    { setup: "OB Reclaim", planned: 2.5, actual: 2.4, delta: -0.1 },
    { setup: "VWAP Bounce", planned: 2.2, actual: 2.1, delta: -0.1 },
    { setup: "Breakout", planned: 2.0, actual: 1.9, delta: -0.1 },
    { setup: "SMC", planned: 2.4, actual: 2.3, delta: -0.1 },
    { setup: "Fib Retracement", planned: 2.0, actual: 1.8, delta: -0.2 }
  ];

  // Setup lifecycle data
  const lifecycleData = [
    { month: "Jan", obReclaim: 72, vwap: 67, breakout: 65, smc: 70 },
    { month: "Feb", obReclaim: 75, vwap: 70, breakout: 68, smc: 72 },
    { month: "Mar", obReclaim: 78, vwap: 72, breakout: 65, smc: 75 },
    { month: "Apr", obReclaim: 75, vwap: 68, breakout: 62, smc: 74 },
    { month: "May", obReclaim: 74, vwap: 65, breakout: 60, smc: 72 },
    { month: "Jun", obReclaim: 76, vwap: 64, breakout: 58, smc: 73 }
  ];

  // Time efficiency by setup
  const timeEfficiencyData = [
    { setup: "OB Reclaim", minutes: 45, rr: 2.4 },
    { setup: "VWAP Bounce", minutes: 55, rr: 2.1 },
    { setup: "Breakout", minutes: 25, rr: 1.9 },
    { setup: "SMC", minutes: 60, rr: 2.3 },
    { setup: "Fib Retracement", minutes: 75, rr: 1.8 }
  ];

  return (
    <div className="space-y-6">
      {/* Alpha Score & Efficiency Ratio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alpha Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Flag size={18} className="mr-2" />
              Alpha Score
            </CardTitle>
            <CardDescription>
              Percentage of trades outperforming your own average
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={alphaScoreData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="setup" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.setup}</p>
                            <p className="text-sm">Your Profit: ${data.yourProfit}</p>
                            <p className="text-sm">Average Profit: ${data.avgProfit}</p>
                            <p className="text-sm">
                              Alpha: {((data.yourProfit / data.avgProfit - 1) * 100).toFixed(1)}%
                            </p>
                            <p className="text-sm">Trade Count: {data.value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="avgProfit" 
                    name="Average Profit" 
                    fill="#3b82f6" 
                    fillOpacity={0.4} 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="yourProfit" 
                    name="Your Profit" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-center text-muted-foreground mt-2">
              <p>OB Reclaim trades generate 47% more profit than average</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Efficiency Ratio */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Zap size={18} className="mr-2" />
              Efficiency Ratio
            </CardTitle>
            <CardDescription>P&L per minute in trade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={efficiencyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="setup" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.setup}</p>
                            <p className="text-sm">P&L: ${data.pnl}</p>
                            <p className="text-sm">Time in Trade: {Math.round(data.timeInMinutes / 60)} hrs {data.timeInMinutes % 60} mins</p>
                            <p className="text-sm font-medium">
                              Efficiency: ${(data.pnl / (data.timeInMinutes / 60)).toFixed(2)}/hr
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="ratio" 
                    name="Efficiency" 
                    radius={[4, 4, 0, 0]}
                  >
                    {efficiencyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={
                          entry.ratio >= 2.0 ? '#10b981' : 
                          entry.ratio >= 1.7 ? '#3b82f6' : 
                          entry.ratio >= 1.5 ? '#f59e0b' : '#ef4444'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-center text-muted-foreground mt-2">
              <p>Breakout trades provide highest profit per unit of time</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Execution Delta & Time Efficiency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Execution Delta */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <TrendingUp size={18} className="mr-2" />
              Execution Delta
            </CardTitle>
            <CardDescription>Planned RR vs Actual RR</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 mt-4">
              {executionDeltaData.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{item.setup}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-800">
                        Plan: {item.planned}R
                      </Badge>
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-800">
                        Actual: {item.actual}R
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`${
                          item.delta >= 0 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-800" 
                            : "bg-red-500/10 text-red-400 border-red-800"
                        }`}
                      >
                        Δ {item.delta > 0 ? "+" : ""}{item.delta}
                      </Badge>
                    </div>
                  </div>
                  <div className="relative w-full h-5 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="absolute inset-0 h-full bg-blue-500/20"
                      style={{ width: `${(item.planned / 3) * 100}%` }}
                    >
                      <div className="w-px h-full bg-blue-500 absolute right-0"></div>
                    </div>
                    <div 
                      className="absolute inset-0 h-full bg-amber-500/40"
                      style={{ width: `${(item.actual / 3) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm">
              <p className="text-muted-foreground">
                <span className="font-medium text-blue-400">Analysis:</span> You consistently execute close to your planned R:R targets with an average delta of -0.12R. Fib Retracement setups show the highest execution deviation.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Time Efficiency */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Clock size={18} className="mr-2" />
              Time Efficiency
            </CardTitle>
            <CardDescription>Average time spent vs RR gained</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis 
                    type="number" 
                    dataKey="minutes" 
                    name="Time (minutes)" 
                    label={{ 
                      value: 'Time in Trade (minutes)', 
                      position: 'bottom', 
                      offset: 0,
                      style: { fill: '#64748b', fontSize: '12px' }
                    }} 
                  />
                  <YAxis 
                    type="number" 
                    dataKey="rr" 
                    name="R:R" 
                    label={{ 
                      value: 'R:R Ratio', 
                      angle: -90, 
                      position: 'left',
                      style: { fill: '#64748b', fontSize: '12px' }
                    }} 
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.setup}</p>
                            <p className="text-sm">Avg Time in Trade: {data.minutes} mins</p>
                            <p className="text-sm">Avg R:R: {data.rr}</p>
                            <p className="text-sm font-medium">
                              Efficiency: {(data.rr / (data.minutes / 60)).toFixed(2)}R per hour
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    data={timeEfficiencyData} 
                    fill="#3b82f6"
                    shape={(props) => {
                      const { cx, cy, payload } = props;
                      return (
                        <g>
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={10} 
                            fill="#0f172a" 
                            stroke="#3b82f6" 
                            strokeWidth={2} 
                          />
                          <text 
                            x={cx} 
                            y={cy} 
                            textAnchor="middle" 
                            dominantBaseline="middle" 
                            fill="#f8fafc" 
                            fontSize={10}
                          >
                            {payload.setup.charAt(0)}
                          </text>
                        </g>
                      );
                    }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-sm text-center text-muted-foreground mt-2">
              <p>Breakout trades provide the highest R:R per minute (4.6R per hour)</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Setup Lifecycle Tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Lifecycle Tracker</CardTitle>
          <CardDescription>
            Win rate trends over time for each setup type
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lifecycleData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="month" />
                <YAxis domain={[50, 80]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          {payload.map((entry, index) => (
                            <p 
                              key={index} 
                              className="text-sm"
                              style={{ color: entry.color }}
                            >
                              {entry.name}: {entry.value}% Win Rate
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="obReclaim" 
                  name="OB Reclaim" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="vwap" 
                  name="VWAP Bounce" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ stroke: '#10b981', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="breakout" 
                  name="Breakout" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ stroke: '#f59e0b', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="smc" 
                  name="SMC" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <Activity size={16} className="text-amber-400 mt-1" />
                <div>
                  <p className="font-medium text-amber-400 text-sm">Breakout Decay</p>
                  <p className="text-xs text-muted-foreground">
                    Breakout strategies show a consistent decline in win rate from 65% to 58%.
                    Consider refining criteria or replacing with stronger setups.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-2">
                <TrendingUp size={16} className="text-blue-400 mt-1" />
                <div>
                  <p className="font-medium text-blue-400 text-sm">OB Reclaim Strength</p>
                  <p className="text-xs text-muted-foreground">
                    OB Reclaim maintains consistent high performance with minimal decay.
                    This setup shows long-term viability in all market conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Add-on Card: Replay Impact */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <BarChartIcon size={18} className="mr-2" />
            Feature Impact Analysis
          </CardTitle>
          <CardDescription>
            How different app features affect your trading performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Trade Replay Usage</h4>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-800">
                  +27% RR
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Trades with Replay used before entry show significantly higher R:R ratios
                compared to non-replay trades.
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>42 trades with replay</span>
                <span>85 trades without</span>
              </div>
            </div>
            
            <div className="border border-blue-500/20 bg-blue-500/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Trade Plan Usage</h4>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-800">
                  +35% Win Rate
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Trades executed with a formal pre-trade plan show 35% higher win rate
                and 42% higher average profit.
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>78 trades with plan</span>
                <span>49 trades without</span>
              </div>
            </div>
            
            <div className="border border-amber-500/20 bg-amber-500/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Journal Consistency</h4>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-800">
                  +18% Monthly P&L
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Months with consistent daily journaling (>80% of trading days) show
                18% higher P&L compared to months with spotty journaling.
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>3 months high consistency</span>
                <span>2 months low consistency</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
