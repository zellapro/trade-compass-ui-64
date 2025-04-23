
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
  PieChart,
  Pie,
  Scatter,
  ScatterChart,
  ZAxis
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Clock, Calendar, Target, TrendingUp, Search, Lightbulb, Flag } from "lucide-react";

interface StrategyAnalyticsPanelProps {
  timeframe?: string;
}

export function StrategyAnalyticsPanel({ timeframe = "30d" }: StrategyAnalyticsPanelProps) {
  // Mock data for strategy analytics
  const strategies = [
    { 
      name: "OB Reclaim", 
      winRate: 78, 
      avgRR: 2.4, 
      pnl: 3850,
      trades: 35, 
      drawdown: 420,
      confidence: 8.5
    },
    { 
      name: "VWAP Bounce", 
      winRate: 72, 
      avgRR: 2.1, 
      pnl: 2650,
      trades: 28, 
      drawdown: 380,
      confidence: 7.8
    },
    { 
      name: "Breakout", 
      winRate: 68, 
      avgRR: 1.9, 
      pnl: 2120,
      trades: 32, 
      drawdown: 450,
      confidence: 7.2
    },
    { 
      name: "SMC", 
      winRate: 75, 
      avgRR: 2.3, 
      pnl: 3240,
      trades: 30, 
      drawdown: 390,
      confidence: 8.2
    },
    { 
      name: "Fib Retracement", 
      winRate: 65, 
      avgRR: 1.8, 
      pnl: 1950,
      trades: 25, 
      drawdown: 460,
      confidence: 6.9
    }
  ];

  // Weekly frequency data
  const frequencyData = [
    { day: "Monday", obReclaim: 8, vwap: 6, breakout: 5, smc: 7, fib: 4 },
    { day: "Tuesday", obReclaim: 7, vwap: 8, breakout: 6, smc: 5, fib: 3 },
    { day: "Wednesday", obReclaim: 5, vwap: 4, breakout: 8, smc: 6, fib: 5 },
    { day: "Thursday", obReclaim: 9, vwap: 5, breakout: 7, smc: 6, fib: 4 },
    { day: "Friday", obReclaim: 6, vwap: 5, breakout: 6, smc: 6, fib: 9 }
  ];

  // Confidence vs Performance data
  const confidenceData = [
    { name: "OB Reclaim", confidence: 8.5, winRate: 78, size: 35 },
    { name: "VWAP Bounce", confidence: 7.8, winRate: 72, size: 28 },
    { name: "Breakout", confidence: 7.2, winRate: 68, size: 32 },
    { name: "SMC", confidence: 8.2, winRate: 75, size: 30 },
    { name: "Fib Retracement", confidence: 6.9, winRate: 65, size: 25 },
    { name: "Gap & Go", confidence: 6.5, winRate: 62, size: 18 },
    { name: "Counter-Trend", confidence: 5.8, winRate: 58, size: 15 },
    { name: "Higher TF Trend", confidence: 7.5, winRate: 70, size: 20 }
  ];

  return (
    <div className="space-y-6">
      {/* Strategy Selection & Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Strategies</SelectItem>
                  <SelectItem value="obreclaim">OB Reclaim</SelectItem>
                  <SelectItem value="vwap">VWAP Bounce</SelectItem>
                  <SelectItem value="breakout">Breakout</SelectItem>
                  <SelectItem value="smc">SMC</SelectItem>
                  <SelectItem value="fib">Fib Retracement</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="winrate">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="winrate">Win Rate</SelectItem>
                  <SelectItem value="rr">Reward/Risk</SelectItem>
                  <SelectItem value="pnl">Net P&L</SelectItem>
                  <SelectItem value="trades">Trade Count</SelectItem>
                  <SelectItem value="drawdown">Max Drawdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2" size="sm">
                <Flag size={14} />
                <span>A+ Setups</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" size="sm">
                <Target size={14} />
                <span>High Confidence</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-2" size="sm">
                <Calendar size={14} />
                <span>Day Filter</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Strategy Performance Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Strategy Win Rates */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <TrendingUp size={18} className="mr-2" />
              Strategy Win Rates
            </CardTitle>
            <CardDescription>
              Performance breakdown by strategy and success rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={strategies}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm">Win Rate: {data.winRate}%</p>
                            <p className="text-sm">Avg R:R: {data.avgRR}</p>
                            <p className="text-sm">Net P&L: ${data.pnl}</p>
                            <p className="text-sm">Trades: {data.trades}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="winRate" 
                    radius={[0, 4, 4, 0]}
                  >
                    {strategies.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={
                          entry.winRate >= 75 ? '#10b981' : 
                          entry.winRate >= 65 ? '#3b82f6' : 
                          entry.winRate >= 55 ? '#f59e0b' : '#ef4444'
                        }
                      />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Strategy P&L Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <PieChart size={18} className="mr-2" />
              P&L Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={strategies}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="pnl"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {strategies.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={
                          index === 0 ? '#3b82f6' : 
                          index === 1 ? '#10b981' : 
                          index === 2 ? '#f59e0b' :
                          index === 3 ? '#8b5cf6' : '#6366f1'
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm">P&L: ${data.pnl}</p>
                            <p className="text-sm">
                              {(data.pnl / strategies.reduce((sum, s) => sum + s.pnl, 0) * 100).toFixed(1)}% of total
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional Analysis Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Strategy Deep Dive</CardTitle>
          <CardDescription>
            Detailed analysis and correlations between strategies and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="frequency" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="frequency">Frequency Heatmap</TabsTrigger>
              <TabsTrigger value="confidence">Confidence Correlation</TabsTrigger>
              <TabsTrigger value="suggestions">Smart Suggestions</TabsTrigger>
            </TabsList>
            
            {/* Frequency Heatmap Tab */}
            <TabsContent value="frequency" className="pt-2">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={frequencyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="day" />
                    <YAxis />
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
                                  {entry.name}: {entry.value} trades
                                </p>
                              ))}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="obReclaim" name="OB Reclaim" stackId="a" fill="#3b82f6" />
                    <Bar dataKey="vwap" name="VWAP" stackId="a" fill="#10b981" />
                    <Bar dataKey="breakout" name="Breakout" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="smc" name="SMC" stackId="a" fill="#8b5cf6" />
                    <Bar dataKey="fib" name="Fib" stackId="a" fill="#6366f1" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>OB Reclaim setups are most frequently traded on Thursdays and Mondays</p>
                <p>Fibonacci setups show highest frequency on Fridays</p>
              </div>
            </TabsContent>
            
            {/* Confidence Correlation Tab */}
            <TabsContent value="confidence" className="pt-2">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid opacity={0.1} />
                    <XAxis 
                      type="number" 
                      dataKey="confidence" 
                      name="Confidence" 
                      domain={[5, 10]} 
                      label={{ 
                        value: 'Confidence Score', 
                        position: 'bottom',
                        style: { fill: '#64748b', fontSize: '12px' }
                      }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="winRate" 
                      name="Win Rate" 
                      domain={[50, 80]}
                      label={{ 
                        value: 'Win Rate (%)', 
                        angle: -90, 
                        position: 'left',
                        style: { fill: '#64748b', fontSize: '12px' }
                      }}
                    />
                    <ZAxis 
                      type="number"
                      dataKey="size"
                      range={[50, 400]}
                      name="Trade Count"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm">Confidence: {data.confidence}/10</p>
                              <p className="text-sm">Win Rate: {data.winRate}%</p>
                              <p className="text-sm">Trades: {data.size}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter 
                      data={confidenceData} 
                      fill="#3b82f6"
                    >
                      {confidenceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.winRate >= 75 ? '#10b981' : 
                            entry.winRate >= 65 ? '#3b82f6' : 
                            entry.winRate >= 55 ? '#f59e0b' : '#ef4444'
                          }
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>Strong positive correlation (R² = 0.82) between confidence score and win rate</p>
                <p>Trades with confidence ≥ 8.0 have 74% average win rate</p>
              </div>
            </TabsContent>
            
            {/* Smart Suggestions Tab */}
            <TabsContent value="suggestions" className="pt-2">
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Lightbulb size={20} />
                    </div>
                    <h3 className="font-medium">OB Reclaim Performance Insight</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    OB Reclaim shows 82% win rate on Tuesday mornings (9:30-11:00 AM).
                    Consider increasing position sizing during this window.
                  </p>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-800">
                    High Confidence: 94%
                  </Badge>
                </div>
                
                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Lightbulb size={20} />
                    </div>
                    <h3 className="font-medium">SMC + FVG Confluence</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    SMC strategy with additional FVG confluence filter improves win rate by 18%
                    and RR by 0.4. Add this filter to your SMC strategy rules.
                  </p>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-800">
                    High Impact: +18% Win Rate
                  </Badge>
                </div>
                
                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                      <Lightbulb size={20} />
                    </div>
                    <h3 className="font-medium">Fibonacci Retracement Timing</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Fibonacci Retracement setups perform significantly better on Fridays (72% win rate vs. 58% average).
                    Consider focusing on this setup at week's end.
                  </p>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-800">
                    Medium Confidence: 82%
                  </Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
