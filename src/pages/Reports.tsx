
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  Clock, 
  BarChart, 
  PieChart, 
  Flag,
  ChevronDown, 
  Zap, 
  Star,
  Bug,
  Lightbulb,
  Activity,
  Users,
  MapPin,
  Shield,
  Info,
  Search
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
  Legend
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { OverviewMetricsPanel } from "@/components/reports/OverviewMetricsPanel";
import { DailyReportPanel } from "@/components/reports/DailyReportPanel";
import { StrategyAnalyticsPanel } from "@/components/reports/StrategyAnalyticsPanel";
import { PsychologyPanel } from "@/components/reports/PsychologyPanel";
import { MetaAnalyticsPanel } from "@/components/reports/MetaAnalyticsPanel";
import { TraderIdentityPanel } from "@/components/reports/TraderIdentityPanel";
import { AiCoachPanel } from "@/components/reports/AiCoachPanel";

export default function Reports() {
  const [timeframe, setTimeframe] = useState("30d");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [reportView, setReportView] = useState("daily");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">360° Trade Diagnostics</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of your trading performance and psychology
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={16} />
            <span>Filter</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {/* Overview Metrics Panel */}
      <OverviewMetricsPanel timeframe={timeframe} />
      
      {/* Main Report Tabs */}
      <Tabs defaultValue="time-based" className="w-full">
        <TabsList className="grid w-full grid-cols-5 md:w-auto md:inline-flex md:h-10">
          <TabsTrigger value="time-based">Time-Based</TabsTrigger>
          <TabsTrigger value="strategy">Strategy Analytics</TabsTrigger>
          <TabsTrigger value="psychology">Psychology</TabsTrigger>
          <TabsTrigger value="meta">Meta-Analytics</TabsTrigger>
          <TabsTrigger value="identity">Trader Identity</TabsTrigger>
        </TabsList>
        
        {/* Time-Based Reports Tab */}
        <TabsContent value="time-based" className="pt-4">
          <Tabs value={reportView} onValueChange={setReportView} className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-6">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="custom">Custom Range</TabsTrigger>
            </TabsList>
            
            {/* Daily Reports Content */}
            <TabsContent value="daily" className="pt-2">
              <DailyReportPanel timeframe={timeframe} />
            </TabsContent>
            
            {/* Weekly Reports Content */}
            <TabsContent value="weekly" className="pt-2">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Weekly Performance Summary</CardTitle>
                      <CardDescription>Analysis of your trading for the week</CardDescription>
                    </div>
                    <Badge variant="outline" className="px-3 py-1 bg-blue-500/10 text-blue-400 border-blue-800">
                      {timeframe}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Setup Win/Loss Breakdown */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Setup Win/Loss Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsBarChart
                              data={[
                                { setup: "OB Reclaim", wins: 12, losses: 3 },
                                { setup: "VWAP Bounce", wins: 8, losses: 4 },
                                { setup: "Breakout", wins: 10, losses: 2 },
                                { setup: "Fib Retracement", wins: 5, losses: 7 },
                                { setup: "SMC", wins: 15, losses: 5 }
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                              <XAxis dataKey="setup" />
                              <YAxis />
                              <Tooltip 
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                                        <p className="font-medium">{payload[0].payload.setup}</p>
                                        <p className="text-sm text-emerald-400">
                                          Wins: {payload[0].value}
                                        </p>
                                        <p className="text-sm text-red-400">
                                          Losses: {payload[1].value}
                                        </p>
                                        <p className="text-sm font-medium pt-1">
                                          Win Rate: {(payload[0].value / (payload[0].value + payload[1].value) * 100).toFixed(0)}%
                                        </p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Bar dataKey="wins" fill="#10b981" stackId="a" />
                              <Bar dataKey="losses" fill="#ef4444" stackId="a" />
                            </RechartsBarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Heatmap of Entries & Exits */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Entry & Exit Heatmap</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center">
                          <div className="text-center p-6">
                            <Activity size={48} className="mx-auto text-muted-foreground mb-4" />
                            <p className="text-muted-foreground">
                              Detailed heatmap showing your best entry and exit times
                            </p>
                            <Button variant="outline" className="mt-4">Generate Heatmap</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Best/Worst Trade Visuals */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Best & Worst Trades</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-emerald-400 flex items-center">
                                <Star size={18} className="mr-2" />
                                Best Trade: AAPL
                              </h4>
                              <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">+$1,850 (3.7R)</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              OB Reclaim with perfect execution on structure break. Held for 2.5 hours.
                            </p>
                          </div>
                          
                          <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-red-400 flex items-center">
                                <Bug size={18} className="mr-2" />
                                Worst Trade: TSLA
                              </h4>
                              <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">-$920 (-1.1R)</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              FOMO entry on breakout that failed. Early entry without confirmation.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Weekly Mistake Trends */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Mistake Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 rounded-lg border border-border/50 bg-background/50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Early Entries</h4>
                              <Badge variant="outline">7 occurrences</Badge>
                            </div>
                            <div className="w-full bg-muted/30 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-3 rounded-lg border border-border/50 bg-background/50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Stops Too Tight</h4>
                              <Badge variant="outline">5 occurrences</Badge>
                            </div>
                            <div className="w-full bg-muted/30 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                            </div>
                          </div>
                          
                          <div className="p-3 rounded-lg border border-border/50 bg-background/50">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Not Following Plan</h4>
                              <Badge variant="outline">3 occurrences</Badge>
                            </div>
                            <div className="w-full bg-muted/30 rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Monthly Reports Content */}
            <TabsContent value="monthly" className="pt-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance Analytics</CardTitle>
                  <CardDescription>Comprehensive monthly trading data and progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Aggregated Stats */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Setup Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                              <Pie
                                data={[
                                  { name: 'OB Reclaim', value: 35, fill: '#3b82f6' },
                                  { name: 'VWAP Bounce', value: 25, fill: '#10b981' },
                                  { name: 'Breakout', value: 18, fill: '#f59e0b' },
                                  { name: 'Fib Retracement', value: 12, fill: '#8b5cf6' },
                                  { name: 'SMC', value: 10, fill: '#6366f1' }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={4}
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              />
                              <Tooltip 
                                content={({ active, payload }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                                        <p className="font-medium">{payload[0].name}</p>
                                        <p className="text-sm">
                                          Trades: {payload[0].value}
                                        </p>
                                        <p className="text-sm">
                                          {(payload[0].payload.value / 100 * 100).toFixed(0)}% of total
                                        </p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                            </RechartsPieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Strategy Progression */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Strategy Progression</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={[
                                { week: 'Week 1', obReclaim: 52, vwap: 48, breakout: 35 },
                                { week: 'Week 2', obReclaim: 58, vwap: 53, breakout: 40 },
                                { week: 'Week 3', obReclaim: 63, vwap: 59, breakout: 45 },
                                { week: 'Week 4', obReclaim: 72, vwap: 62, breakout: 50 }
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              <XAxis dataKey="week" />
                              <YAxis />
                              <Tooltip 
                                content={({ active, payload, label }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                                        <p className="font-medium">{label}</p>
                                        {payload.map((entry, index) => (
                                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                                            {entry.name}: {entry.value}% Win Rate
                                          </p>
                                        ))}
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Line type="monotone" dataKey="obReclaim" name="OB Reclaim" stroke="#3b82f6" />
                              <Line type="monotone" dataKey="vwap" name="VWAP Bounce" stroke="#10b981" />
                              <Line type="monotone" dataKey="breakout" name="Breakout" stroke="#f59e0b" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Psychological Evolution */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Psychological Evolution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-4 gap-2 mb-4">
                          {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, i) => (
                            <div key={i} className="text-center space-y-3">
                              <p className="text-xs text-muted-foreground">{week}</p>
                              <div className="grid grid-cols-5 gap-1">
                                {['😨', '😐', '🙂', '😃', '🤩'].map((emoji, j) => (
                                  <div 
                                    key={j} 
                                    className={`text-lg p-1 rounded border ${
                                      (i === 0 && j === 1) || 
                                      (i === 1 && j === 2) || 
                                      (i === 2 && j === 3) || 
                                      (i === 3 && j === 4) 
                                        ? 'border-blue-500 bg-blue-500/10' 
                                        : 'border-transparent'
                                    }`}
                                  >
                                    {emoji}
                                  </div>
                                ))}
                              </div>
                              <div className="h-2 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full">
                                <div 
                                  className="h-2 bg-background rounded-full" 
                                  style={{ 
                                    marginLeft: `${20 * (i + 1)}%`, 
                                    width: '4px' 
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground text-center mt-4">
                          Your emotional state has progressively improved throughout the month,
                          correlating with better trading performance.
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* Trigger Response Curve */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Trigger Response</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={[
                                { trigger: 'Candle Pattern', week1: 45, week2: 48, week3: 52, week4: 55 },
                                { trigger: 'Volume Spike', week1: 40, week2: 45, week3: 47, week4: 50 },
                                { trigger: 'Moving Avg Cross', week1: 35, week2: 38, week3: 42, week4: 48 },
                                { trigger: 'OB Tap', week1: 60, week2: 65, week3: 72, week4: 78 },
                                { trigger: 'Structure Break', week1: 55, week2: 58, week3: 62, week4: 67 }
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                              <XAxis dataKey="trigger" />
                              <YAxis />
                              <Tooltip 
                                content={({ active, payload, label }) => {
                                  if (active && payload && payload.length) {
                                    return (
                                      <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                                        <p className="font-medium">{label}</p>
                                        {payload.map((entry, index) => (
                                          <p key={index} className="text-sm" style={{ color: entry.color }}>
                                            {entry.name}: {entry.value}% Win Rate
                                          </p>
                                        ))}
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Line type="monotone" dataKey="week4" name="Week 4" stroke="#3b82f6" strokeWidth={2} />
                              <Line type="monotone" dataKey="week3" name="Week 3" stroke="#60a5fa" strokeWidth={1.5} />
                              <Line type="monotone" dataKey="week2" name="Week 2" stroke="#93c5fd" strokeWidth={1} />
                              <Line type="monotone" dataKey="week1" name="Week 1" stroke="#bfdbfe" strokeWidth={1} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Custom Range Reports Content */}
            <TabsContent value="custom" className="pt-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Custom Date Range</CardTitle>
                  <CardDescription>Select your preferred custom date range for in-depth analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <label className="text-sm font-medium">Start Date</label>
                      <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <label className="text-sm font-medium">End Date</label>
                      <input type="date" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                    <Button className="self-end">Generate Report</Button>
                  </div>
                  
                  <div className="flex items-center justify-center p-12 border border-dashed rounded-lg bg-muted/10">
                    <div className="text-center">
                      <Search size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Custom Report</h3>
                      <p className="text-muted-foreground mb-4">
                        Select a date range above to generate your custom analysis report
                      </p>
                      <Button variant="outline">View Sample Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        {/* Strategy Analytics Tab */}
        <TabsContent value="strategy" className="pt-4">
          <StrategyAnalyticsPanel timeframe={timeframe} />
        </TabsContent>
        
        {/* Psychology Tab */}
        <TabsContent value="psychology" className="pt-4">
          <PsychologyPanel timeframe={timeframe} />
        </TabsContent>
        
        {/* Meta-Analytics Tab */}
        <TabsContent value="meta" className="pt-4">
          <MetaAnalyticsPanel timeframe={timeframe} />
        </TabsContent>
        
        {/* Trader Identity Tab */}
        <TabsContent value="identity" className="pt-4">
          <TraderIdentityPanel timeframe={timeframe} />
        </TabsContent>
      </Tabs>
      
      {/* AI Coach Recommendations */}
      <Collapsible className="border rounded-lg bg-background/95">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
            <span className="font-medium">AI Coach Insights & Recommendations</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          <Separator className="my-4" />
          <AiCoachPanel timeframe={timeframe} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
