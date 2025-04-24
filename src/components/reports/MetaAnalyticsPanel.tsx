
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
  TrendingUp, 
  Clock, 
  Activity,
  BarChart as BarChartIcon, 
  CalendarDays,
  ChartBar,
  ChartLine,
  ThermometerSnowflake,
  Check,
  X,
  Circle,
  HelpCircle,
  Settings,
  AlertTriangle,
  Info
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface MetaAnalyticsPanelProps {
  timeframe?: string;
}

export function MetaAnalyticsPanel({ timeframe = "30d" }: MetaAnalyticsPanelProps) {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [replayFilter, setReplayFilter] = useState("all");
  const [setupTypeFilter, setSetupTypeFilter] = useState("all");

  // Alpha Consistency Index data
  const alphaConsistencyData = [
    { date: "Feb 01", value: 1.23, upper: 1.5, lower: 1.0 },
    { date: "Feb 08", value: 1.31, upper: 1.6, lower: 1.0 },
    { date: "Feb 15", value: 1.28, upper: 1.5, lower: 1.1 },
    { date: "Feb 22", value: 1.42, upper: 1.7, lower: 1.2 },
    { date: "Mar 01", value: 1.35, upper: 1.6, lower: 1.1 },
    { date: "Mar 08", value: 1.47, upper: 1.7, lower: 1.2 },
    { date: "Mar 15", value: 1.56, upper: 1.8, lower: 1.3 },
    { date: "Mar 22", value: 1.49, upper: 1.7, lower: 1.2 },
    { date: "Mar 29", value: 1.62, upper: 1.9, lower: 1.4 },
    { date: "Apr 05", value: 1.71, upper: 2.0, lower: 1.4 },
    { date: "Apr 12", value: 1.64, upper: 1.9, lower: 1.3 },
    { date: "Apr 19", value: 1.77, upper: 2.1, lower: 1.5 }
  ];

  // Plan Deviation Delta data
  const planDeviationData = [
    { name: "Entries", planned: 100, actual: 92, deviation: -8 },
    { name: "Exits", planned: 100, actual: 82, deviation: -18 },
    { name: "Stop Placement", planned: 100, actual: 96, deviation: -4 },
    { name: "Size", planned: 100, actual: 105, deviation: 5 }
  ];

  // Execution Speed Sync data
  const executionSpeedData = [
    { seconds: "< 3s", winRate: 72, count: 34 },
    { seconds: "3-6s", winRate: 63, count: 57 },
    { seconds: "6-10s", winRate: 51, count: 42 },
    { seconds: "10-20s", winRate: 44, count: 28 },
    { seconds: "> 20s", winRate: 32, count: 19 }
  ];

  // Setup Longevity Score data
  const setupLongevityData = [
    { name: "OB Reclaim", months: 7, status: "strengthening", trend: 12 },
    { name: "VWAP Bounce", months: 5, status: "weakening", trend: -20 },
    { name: "Breakout", months: 4, status: "neutral", trend: 2 },
    { name: "SMC", months: 8, status: "strengthening", trend: 15 },
    { name: "Fib Retracement", months: 3, status: "weakening", trend: -8 }
  ];

  // Replay Efficiency data
  const replayEfficiencyData = [
    { setup: "OB Reclaim", withReplay: 2.7, withoutReplay: 1.9 },
    { setup: "VWAP Bounce", withReplay: 2.4, withoutReplay: 1.7 },
    { setup: "Breakout", withReplay: 2.2, withoutReplay: 1.8 },
    { setup: "SMC", withReplay: 2.8, withoutReplay: 2.1 },
    { setup: "Fib Retracement", withReplay: 2.0, withoutReplay: 1.5 }
  ];

  // Strategic Drift Detector data
  const strategicDriftData = [
    { month: "Jan", ob: 54, breakout: 28, vwap: 18 },
    { month: "Feb", ob: 48, breakout: 32, vwap: 20 },
    { month: "Mar", ob: 42, breakout: 38, vwap: 20 },
    { month: "Apr", ob: 35, breakout: 45, vwap: 20 }
  ];

  // Trade-to-Bias Alignment data
  const biasAlignmentData = [
    { type: "Aligned", count: 72, rr: 2.4 },
    { type: "Counter", count: 28, rr: 1.3 }
  ];

  // Execution Integrity Index data
  const executionIntegrityScores = {
    entryAccuracy: 86,
    rrPrecision: 78,
    sizingPrecision: 92,
    compositeScore: 85
  };

  // Cognitive Fatigue Tracker data
  const cognitiveFatigueData = [
    { time: "9:30-11:00", winRate: 68, rr: 2.2, trades: 42 },
    { time: "11:00-12:30", winRate: 62, rr: 1.9, trades: 38 },
    { time: "12:30-14:00", winRate: 58, rr: 1.7, trades: 29 },
    { time: "14:00-15:30", winRate: 42, rr: 1.2, trades: 24 },
    { time: "15:30-16:00", winRate: 38, rr: 1.0, trades: 15 }
  ];

  // Micro-Pattern Feedback Loop data
  const microPatternData = [
    { pattern: "Early Scaling", occurrence: 14, rrImpact: -11 },
    { pattern: "Revenge Re-entry", occurrence: 8, rrImpact: -15 },
    { pattern: "Missed Confirmation", occurrence: 10, rrImpact: -9 },
    { pattern: "Extended Holding", occurrence: 7, rrImpact: 8 },
    { pattern: "Stop Too Tight", occurrence: 12, rrImpact: -7 }
  ];

  // Strategic Seasonality Heatmap data
  const seasonalityData = {
    monday: { morning: 62, midday: 48, afternoon: 51 },
    tuesday: { morning: 71, midday: 58, afternoon: 47 },
    wednesday: { morning: 65, midday: 63, afternoon: 54 },
    thursday: { morning: 73, midday: 61, afternoon: 49 },
    friday: { morning: 58, midday: 52, afternoon: 42 }
  };

  // Meta-Adherence Breakdown data
  const metaAdherenceScores = {
    strategyAlignment: 82,
    biasSync: 74,
    executionMatch: 88,
    compositeScore: 81
  };

  const getMetaAdherenceGrade = (score: number) => {
    if (score >= 80) return { grade: "A", emoji: "🔥" };
    if (score >= 70) return { grade: "B", emoji: "🤔" };
    return { grade: "C", emoji: "❄️" };
  };

  const getExecutionIntegrityGrade = (score: number) => {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "D";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Alpha Consistency Index */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <ChartLine size={18} className="mr-2" />
              Alpha Consistency Index
            </CardTitle>
            <CardDescription>
              Rolling 30-day Sharpe-adjusted RR Ratio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={alphaConsistencyData}>
                  <defs>
                    <linearGradient id="colorUpper" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorLower" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0.8, 'auto']} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.date}</p>
                            <p className="text-sm">Consistency Index: {data.value.toFixed(2)}</p>
                            <p className="text-sm text-emerald-400">Upper Band: {data.upper.toFixed(2)}</p>
                            <p className="text-sm text-red-400">Lower Band: {data.lower.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Tracks consistency of edge execution over time, adjusted for risk
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="upper" 
                    stroke="#10b981" 
                    strokeWidth={1}
                    fillOpacity={1} 
                    fill="url(#colorUpper)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lower" 
                    stroke="#ef4444" 
                    strokeWidth={1}
                    fillOpacity={1} 
                    fill="url(#colorLower)" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-center text-muted-foreground">
              <p>Your consistency has improved 29% over the past 60 days</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Plan Deviation Delta */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Settings size={18} className="mr-2" />
              Plan Deviation Delta
            </CardTitle>
            <CardDescription>
              % deviation between pre-planned and actual execution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={planDeviationData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[-25, 25]} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm">Planned: 100%</p>
                            <p className="text-sm">Actual: {data.actual}%</p>
                            <p className="text-sm font-medium">
                              Deviation: {data.deviation > 0 ? "+" : ""}{data.deviation}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="deviation" 
                    radius={[4, 4, 0, 0]}
                  >
                    {planDeviationData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.deviation >= 0 ? '#10b981' : '#ef4444'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg text-sm mt-2">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-400 mt-1" />
                <div>
                  <span className="font-medium text-amber-400">Smart Highlight:</span>
                  <p className="text-muted-foreground">You consistently take profits 18% before target</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Execution Speed Sync */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Clock size={18} className="mr-2" />
              Execution Speed Sync
            </CardTitle>
            <CardDescription>
              Entry reaction time vs. success rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={executionSpeedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="seconds" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.seconds} Reaction Time</p>
                            <p className="text-sm">Win Rate: {data.winRate}%</p>
                            <p className="text-sm">Trade Count: {data.count}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="winRate" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  >
                    {executionSpeedData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={
                          entry.winRate >= 60 ? '#10b981' : 
                          entry.winRate >= 50 ? '#f59e0b' : '#ef4444'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm mt-2">
              <div className="flex items-start gap-2">
                <Info size={16} className="text-blue-400 mt-1" />
                <div>
                  <span className="font-medium text-blue-400">Insight:</span>
                  <p className="text-muted-foreground">Entries {'<'} 6s after trigger = 63% win rate</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 pb-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="ob">OB</TabsTrigger>
                <TabsTrigger value="breakout">Breakout</TabsTrigger>
                <TabsTrigger value="reclaim">Reclaim</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardFooter>
        </Card>
        
        {/* Setup Longevity Score */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <CalendarDays size={18} className="mr-2" />
              Setup Longevity Score
            </CardTitle>
            <CardDescription>
              How long each setup has remained profitable
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-2">
              {setupLongevityData.map((setup, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{setup.name}</span>
                    <Badge 
                      className={`${
                        setup.status === 'strengthening' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-800' :
                        setup.status === 'neutral' ? 'bg-amber-500/20 text-amber-400 border-amber-800' :
                        'bg-red-500/20 text-red-400 border-red-800'
                      }`}
                    >
                      {setup.status === 'strengthening' ? '📈' : setup.status === 'neutral' ? '🟡' : '🔻'} {setup.months} months
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-sm ${setup.trend > 0 ? 'text-emerald-400' : setup.trend < 0 ? 'text-red-400' : 'text-muted-foreground'}`}>
                      {setup.trend > 0 ? `+${setup.trend}%` : `${setup.trend}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg text-sm mt-4">
              <div className="flex items-start gap-2">
                <HelpCircle size={16} className="text-amber-400 mt-1" />
                <div>
                  <span className="font-medium text-amber-400">Smart AI Prompt:</span>
                  <p className="text-muted-foreground">VWAP Bounce has seen a 20% drop in RR over 3 weeks. Reassess filters.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Replay Efficiency Curve */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChartIcon size={18} className="mr-2" />
              Replay Efficiency Curve
            </CardTitle>
            <CardDescription>
              Impact of trade replay on R:R performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={replayEfficiencyData}
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
                            <p className="text-sm text-emerald-400">With Replay: {data.withReplay.toFixed(1)}R</p>
                            <p className="text-sm text-amber-400">Without Replay: {data.withoutReplay.toFixed(1)}R</p>
                            <p className="text-sm font-medium pt-1">
                              Improvement: +{((data.withReplay / data.withoutReplay - 1) * 100).toFixed(0)}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="withoutReplay" fill="#f59e0b" name="Without Replay" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="withReplay" fill="#10b981" name="With Replay" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-sm mt-2">
              <div className="flex items-start gap-2">
                <TrendingUp size={16} className="text-emerald-400 mt-1" />
                <div>
                  <span className="font-medium text-emerald-400">RR Delta:</span>
                  <p className="text-muted-foreground">Replay-backed trades improved RR by +31%</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 pb-2">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All Days</TabsTrigger>
                <TabsTrigger value="by-strategy">By Strategy</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardFooter>
        </Card>
        
        {/* Strategic Drift Detector */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Activity size={18} className="mr-2" />
              Strategic Drift Detector
            </CardTitle>
            <CardDescription>
              Change in strategy usage over time vs historical alpha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={strategicDriftData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  stackOffset="expand"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(tick) => `${tick * 100}%`} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const total = payload.reduce((sum, entry) => sum + entry.value, 0);
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{label}</p>
                            {payload.map((entry, index) => (
                              <p 
                                key={index} 
                                className="text-sm"
                                style={{ color: entry.color }}
                              >
                                {entry.name}: {entry.value} trades ({Math.round(entry.value / total * 100)}%)
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ob" 
                    stackId="1" 
                    stroke="#3b82f6"
                    fill="#3b82f6" 
                    name="OB Reclaim"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="breakout" 
                    stackId="1" 
                    stroke="#f59e0b"
                    fill="#f59e0b" 
                    name="Breakout"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="vwap" 
                    stackId="1" 
                    stroke="#10b981"
                    fill="#10b981" 
                    name="VWAP"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg text-sm mt-2">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-400 mt-1" />
                <div>
                  <span className="font-medium text-amber-400">Alert:</span>
                  <p className="text-muted-foreground">You've shifted from OB to Breakout setups. But OB had 2.1x RR vs 1.4x Breakouts.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Trade-to-Bias Alignment */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <ChartBar size={18} className="mr-2" />
              Trade-to-Bias Alignment
            </CardTitle>
            <CardDescription>
              How trades aligned with morning bias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={biasAlignmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="count"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const total = biasAlignmentData.reduce((sum, item) => sum + item.count, 0);
                        const percentage = Math.round(data.count / total * 100);
                        
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.type} Trades</p>
                            <p className="text-sm">Count: {data.count} ({percentage}%)</p>
                            <p className="text-sm">Average RR: {data.rr.toFixed(1)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-sm">Aligned (72%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">Counter (28%)</span>
              </div>
            </div>
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm mt-3">
              <p className="text-muted-foreground">
                <span className="font-medium text-blue-400">AI Tip:</span> You underperform when countering morning structure bias
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Execution Integrity Index */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Check size={18} className="mr-2" />
              Execution Integrity Index
            </CardTitle>
            <CardDescription>
              Composite execution quality score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <div className="text-center mb-4">
                <div className="inline-block rounded-full border-8 border-blue-500/20 p-6">
                  <span className="text-5xl font-bold">{getExecutionIntegrityGrade(executionIntegrityScores.compositeScore)}</span>
                </div>
              </div>
              <div className="w-full space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Entry Accuracy</span>
                    <span className="text-sm font-medium">{executionIntegrityScores.entryAccuracy}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${executionIntegrityScores.entryAccuracy}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">R:R Precision</span>
                    <span className="text-sm font-medium">{executionIntegrityScores.rrPrecision}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${executionIntegrityScores.rrPrecision}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sizing Precision</span>
                    <span className="text-sm font-medium">{executionIntegrityScores.sizingPrecision}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${executionIntegrityScores.sizingPrecision}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Meta-Adherence Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Settings size={18} className="mr-2" />
              Meta-Adherence Breakdown
            </CardTitle>
            <CardDescription>
              Combined trading system adherence score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <div className="text-center mb-4">
                <div className="inline-block rounded-full border-8 border-blue-500/20 p-6">
                  <div className="text-5xl font-bold">
                    {getMetaAdherenceGrade(metaAdherenceScores.compositeScore).grade}
                    <span className="ml-1">{getMetaAdherenceGrade(metaAdherenceScores.compositeScore).emoji}</span>
                  </div>
                </div>
              </div>
              <div className="w-full space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Strategy Alignment</span>
                    <span className="text-sm font-medium">{metaAdherenceScores.strategyAlignment}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${metaAdherenceScores.strategyAlignment}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bias Sync</span>
                    <span className="text-sm font-medium">{metaAdherenceScores.biasSync}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${metaAdherenceScores.biasSync}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Execution Match</span>
                    <span className="text-sm font-medium">{metaAdherenceScores.executionMatch}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500" 
                      style={{ width: `${metaAdherenceScores.executionMatch}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cognitive Fatigue Tracker */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <ThermometerSnowflake size={18} className="mr-2" />
              Cognitive Fatigue Tracker
            </CardTitle>
            <CardDescription>
              Time-based accuracy and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={cognitiveFatigueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.time}</p>
                            <p className="text-sm">Win Rate: {data.winRate}%</p>
                            <p className="text-sm">Avg RR: {data.rr}</p>
                            <p className="text-sm">Trades: {data.trades}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="winRate" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    yAxisId="left"
                    dot={{ stroke: '#10b981', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rr" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    yAxisId="right"
                    dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg text-sm mt-2">
              <div className="flex items-start gap-2">
                <AlertTriangle size={16} className="text-amber-400 mt-1" />
                <div>
                  <span className="font-medium text-amber-400">Cognitive Drop:</span>
                  <p className="text-muted-foreground">Your trades after 1:30PM show 40% drop in precision</p>
                </div>
              </div>
            </div>
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm mt-2">
              <div className="flex items-start gap-2">
                <Info size={16} className="text-blue-400 mt-1" />
                <div>
                  <span className="font-medium text-blue-400">AI Suggestion:</span>
                  <p className="text-muted-foreground">Consider avoiding fresh entries post 2PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Micro-Pattern Feedback Loop */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Activity size={18} className="mr-2" />
              Micro-Pattern Feedback Loop
            </CardTitle>
            <CardDescription>
              Recurring subconscious trading patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={microPatternData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} />
                  <XAxis type="number" domain={[-20, 10]} />
                  <YAxis type="category" dataKey="pattern" width={120} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.pattern}</p>
                            <p className="text-sm">Occurrences: {data.occurrence}</p>
                            <p className="text-sm">R:R Impact: {data.rrImpact > 0 ? '+' : ''}{data.rrImpact}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="rrImpact" 
                    radius={4}
                  >
                    {microPatternData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.rrImpact >= 0 ? '#10b981' : '#ef4444'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm mt-2">
              <div className="flex items-start gap-2">
                <Info size={16} className="text-blue-400 mt-1" />
                <div>
                  <span className="font-medium text-blue-400">AI Summary:</span>
                  <p className="text-muted-foreground">Across 7 trades, you scaled at 50% OB instead of 75%. Resulted in 11% lower RR</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Seasonality Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays size={18} className="mr-2" />
            Strategic Seasonality Heatmap
          </CardTitle>
          <CardDescription>
            Setup performance by day and time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            <div></div>
            <div className="text-center text-sm font-medium">Monday</div>
            <div className="text-center text-sm font-medium">Tuesday</div>
            <div className="text-center text-sm font-medium">Wednesday</div>
            <div className="text-center text-sm font-medium">Thursday</div>
            <div className="text-center text-sm font-medium">Friday</div>
            
            <div className="text-right text-sm font-medium py-1">Morning</div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(16, 185, 129, ${seasonalityData.monday.morning / 100})`,
                color: seasonalityData.monday.morning > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.monday.morning}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(16, 185, 129, ${seasonalityData.tuesday.morning / 100})`,
                color: seasonalityData.tuesday.morning > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.tuesday.morning}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(16, 185, 129, ${seasonalityData.wednesday.morning / 100})`,
                color: seasonalityData.wednesday.morning > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.wednesday.morning}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(16, 185, 129, ${seasonalityData.thursday.morning / 100})`,
                color: seasonalityData.thursday.morning > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.thursday.morning}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(16, 185, 129, ${seasonalityData.friday.morning / 100})`,
                color: seasonalityData.friday.morning > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.friday.morning}%
            </div>
            
            <div className="text-right text-sm font-medium py-1">Midday</div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(59, 130, 246, ${seasonalityData.monday.midday / 100})`,
                color: seasonalityData.monday.midday > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.monday.midday}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(59, 130, 246, ${seasonalityData.tuesday.midday / 100})`,
                color: seasonalityData.tuesday.midday > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.tuesday.midday}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(59, 130, 246, ${seasonalityData.wednesday.midday / 100})`,
                color: seasonalityData.wednesday.midday > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.wednesday.midday}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(59, 130, 246, ${seasonalityData.thursday.midday / 100})`,
                color: seasonalityData.thursday.midday > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.thursday.midday}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(59, 130, 246, ${seasonalityData.friday.midday / 100})`,
                color: seasonalityData.friday.midday > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.friday.midday}%
            </div>
            
            <div className="text-right text-sm font-medium py-1">Afternoon</div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(245, 158, 11, ${seasonalityData.monday.afternoon / 100})`,
                color: seasonalityData.monday.afternoon > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.monday.afternoon}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(245, 158, 11, ${seasonalityData.tuesday.afternoon / 100})`,
                color: seasonalityData.tuesday.afternoon > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.tuesday.afternoon}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(245, 158, 11, ${seasonalityData.wednesday.afternoon / 100})`,
                color: seasonalityData.wednesday.afternoon > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.wednesday.afternoon}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(245, 158, 11, ${seasonalityData.thursday.afternoon / 100})`,
                color: seasonalityData.thursday.afternoon > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.thursday.afternoon}%
            </div>
            <div 
              className="rounded p-2 text-center"
              style={{ 
                backgroundColor: `rgba(245, 158, 11, ${seasonalityData.friday.afternoon / 100})`,
                color: seasonalityData.friday.afternoon > 60 ? 'white' : 'currentColor'
              }}
            >
              {seasonalityData.friday.afternoon}%
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center mt-4">
            <p>FVG Tap setup shows strongest performance on Tuesday & Thursday mornings (71-73% win rate)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
