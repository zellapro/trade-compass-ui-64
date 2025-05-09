
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  LineChart,
  Line,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  ArrowUp,
  ArrowDown,
  CircleAlert,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Scale,
  FileText,
  BarChart2,
  Calendar,
  Brain,
  Target,
  ThumbsUp,
} from "lucide-react";

// Mock data
const alphaConsistencyData = [
  { day: '1', value: 0.87 },
  { day: '5', value: 0.92 },
  { day: '10', value: 0.75 },
  { day: '15', value: 0.83 },
  { day: '20', value: 0.92 },
  { day: '25', value: 0.89 },
  { day: '30', value: 0.94 },
];

const planDeviationData = {
  overshoot: 11,
  undershoot: 18,
};

const executionSpeedData = [
  { seconds: '2', successRate: 72 },
  { seconds: '4', successRate: 68 },
  { seconds: '6', successRate: 63 },
  { seconds: '8', successRate: 51 },
  { seconds: '10', successRate: 46 },
  { seconds: '15', successRate: 38 },
  { seconds: '20', successRate: 32 },
];

const setupLongevityData = [
  { name: 'OB Sweep', months: 8, status: 'strengthening' },
  { name: 'FVG Tap', months: 5, status: 'neutral' },
  { name: 'VWAP Bounce', months: 3, status: 'weakening' },
  { name: 'BOS Retest', months: 6, status: 'neutral' },
];

const replayEfficiencyData = [
  { name: 'With Replay', rr: 2.4 },
  { name: 'Without Replay', rr: 1.7 },
];

const cognitiveDataByTime = [
  { time: '9AM', accuracy: 92 },
  { time: '10AM', accuracy: 88 },
  { time: '11AM', accuracy: 90 },
  { time: '12PM', accuracy: 83 },
  { time: '1PM', accuracy: 78 },
  { time: '2PM', accuracy: 72 },
  { time: '3PM', accuracy: 61 },
  { time: '4PM', accuracy: 58 },
];

const metaAdherenceScore = {
  strategyAlignment: 82,
  morningBiasSync: 67,
  executionMatch: 88,
  grade: 'B',
  emoji: '🤔',
};

// Seasonality heatmap data (simplified for demo)
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const timeBlocks = ['9-10AM', '10-11AM', '11-12PM', '12-1PM', '1-2PM', '2-3PM', '3-4PM'];

const seasonalityHeatmap = dayNames.map((day) => {
  const data: Record<string, number> = { day };
  timeBlocks.forEach((time) => {
    data[time] = Math.floor(Math.random() * 100);
  });
  return data;
});

const chartConfig = {
  positive: { color: "#22c55e" },
  negative: { color: "#ef4444" },
  neutral: { color: "#3b82f6" },
  primary: { color: "#8b5cf6" },
};

export function MetaAnalyticsPanel() {
  const [activeTab, setActiveTab] = useState("consistency");
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              Meta-Analytics
            </CardTitle>
            <CardDescription>
              Advanced analytics of your trading patterns, behaviors, and cognitive factors
            </CardDescription>
          </div>
          <Badge variant="outline" className="px-3 py-1">2025+ Elite</Badge>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="consistency" className="w-full" onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full h-auto justify-start flex-wrap">
            <TabsTrigger value="consistency" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Alpha Consistency
            </TabsTrigger>
            <TabsTrigger value="deviation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Plan Deviation
            </TabsTrigger>
            <TabsTrigger value="execution" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Execution Speed
            </TabsTrigger>
            <TabsTrigger value="longevity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Setup Longevity
            </TabsTrigger>
            <TabsTrigger value="replay" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Replay Efficiency
            </TabsTrigger>
            <TabsTrigger value="drift" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Strategic Drift
            </TabsTrigger>
            <TabsTrigger value="alignment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Bias Alignment
            </TabsTrigger>
            <TabsTrigger value="integrity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Execution Integrity
            </TabsTrigger>
            <TabsTrigger value="fatigue" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Cognitive Fatigue
            </TabsTrigger>
            <TabsTrigger value="patterns" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Micro-Patterns
            </TabsTrigger>
            <TabsTrigger value="seasonality" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Seasonality
            </TabsTrigger>
            <TabsTrigger value="adherence" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Meta-Adherence
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-6">
          <TabsContent value="consistency" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Alpha Consistency Index</h3>
                <p className="text-sm text-muted-foreground">
                  Rolling 30-day Sharpe-adjusted RR Ratio
                </p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
                Improving
              </Badge>
            </div>
            
            <div className="h-80 w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={alphaConsistencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8b5cf6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-100 rounded-full p-1.5">
                  <AlertTriangle className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium">AI Insight:</h4>
                  <p className="text-sm text-muted-foreground">
                    Your consistency has improved by 18% in the last 10 days, which correlates with your recent focus on morning bias alignment.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="deviation" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Plan Deviation Delta</h3>
                <p className="text-sm text-muted-foreground">
                  Average % deviation between pre-planned RR and actual RR
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Average Overshoot %</h4>
                  <span className="text-green-500 font-semibold">{planDeviationData.overshoot}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  You exceeded your planned R target by an average of 11%
                </p>
                <Progress className="h-2 mt-2" value={planDeviationData.overshoot} />
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Average Undershoot %</h4>
                  <span className="text-amber-500 font-semibold">{planDeviationData.undershoot}%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  You fell short of your planned R target by an average of 18%
                </p>
                <Progress className="h-2 mt-2" value={planDeviationData.undershoot} />
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-yellow-100 rounded-full p-1.5">
                  <AlertTriangle className="h-4 w-4 text-yellow-700" />
                </div>
                <div>
                  <h4 className="font-medium">Smart Highlight:</h4>
                  <p className="text-sm text-muted-foreground">
                    You consistently take profits 18% before your target. Consider setting more conservative targets or implementing partial profit-taking strategies.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="execution" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Execution Speed Sync</h3>
                <p className="text-sm text-muted-foreground">
                  Entry Reaction Time (in seconds) vs Success Rate
                </p>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={executionSpeedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="seconds" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="successRate" 
                      stroke="#8b5cf6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 8 }} 
                      name="Success Rate (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-100 rounded-full p-1.5">
                  <Clock className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium">Insight Tag:</h4>
                  <p className="text-sm text-muted-foreground">
                    Entries {'<'} 6s after trigger = 63% win rate. Speed matters, but be cautious about rushing entries beyond this threshold.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="longevity" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Setup Longevity Score</h3>
                <p className="text-sm text-muted-foreground">
                  How long each setup has remained profitable (measured in months)
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {setupLongevityData.map((setup) => (
                <div key={setup.name} className="bg-card rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{setup.name}</h4>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{setup.months} months</span>
                      {setup.status === 'strengthening' && (
                        <Badge className="bg-green-100 text-green-800">
                          <TrendingUp className="mr-1 h-3.5 w-3.5" />
                          Strengthening
                        </Badge>
                      )}
                      {setup.status === 'neutral' && (
                        <Badge className="bg-amber-100 text-amber-800">
                          <Scale className="mr-1 h-3.5 w-3.5" />
                          Neutral
                        </Badge>
                      )}
                      {setup.status === 'weakening' && (
                        <Badge className="bg-red-100 text-red-800">
                          <TrendingDown className="mr-1 h-3.5 w-3.5" />
                          Weakening
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress 
                    className="h-2 mt-2"
                    value={setup.months * 10}
                  />
                </div>
              ))}
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-red-100 rounded-full p-1.5">
                  <CircleAlert className="h-4 w-4 text-red-700" />
                </div>
                <div>
                  <h4 className="font-medium">Smart AI Prompt:</h4>
                  <p className="text-sm text-muted-foreground">
                    VWAP Bounce has seen a 20% drop in RR over 3 weeks. Reassess filters and consider adjusting your entry criteria to account for changed market conditions.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="replay" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Replay Efficiency Curve</h3>
                <p className="text-sm text-muted-foreground">
                  Performance comparison: Trades WITH Replay vs Trades WITHOUT
                </p>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={replayEfficiencyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="rr" name="Avg. RR" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-green-100 rounded-full p-1.5">
                  <TrendingUp className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h4 className="font-medium">RR Delta:</h4>
                  <p className="text-sm text-muted-foreground">
                    Replay-backed trades improved RR by +31%. Simulating trades before real execution shows significant improvement in your performance.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="drift" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Strategic Drift Detector</h3>
                <p className="text-sm text-muted-foreground">
                  Compares your current most-used strategy vs historical alpha
                </p>
              </div>
            </div>
            
            <div className="bg-card border rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Historical Alpha Strategy</h4>
                  <div className="mt-2">
                    <Badge>Order Block</Badge>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Win Rate:</span>
                        <span className="font-medium">67%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg RR:</span>
                        <span className="font-medium">2.1R</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Usage Period:</span>
                        <span className="font-medium">Jan - Mar 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium">Current Most Used</h4>
                  <div className="mt-2">
                    <Badge>Breakout</Badge>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Win Rate:</span>
                        <span className="font-medium">53%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Avg RR:</span>
                        <span className="font-medium">1.4R</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Usage Period:</span>
                        <span className="font-medium">Apr - May 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-yellow-100 rounded-full p-1.5">
                  <AlertTriangle className="h-4 w-4 text-yellow-700" />
                </div>
                <div>
                  <h4 className="font-medium">Alert:</h4>
                  <p className="text-sm text-muted-foreground">
                    You've shifted from OB to Breakout setups. But OB had 2.1x RR vs 1.4x Breakouts. Consider re-incorporating Order Block strategy into your trading mix.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="fatigue" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Cognitive Fatigue Tracker</h3>
                <p className="text-sm text-muted-foreground">
                  Time-based accuracy chart (morning vs afternoon vs evening)
                </p>
              </div>
            </div>
            
            <div className="h-80 w-full">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cognitiveDataByTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="accuracy" 
                      stroke="#8b5cf6" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-red-100 rounded-full p-1.5">
                  <Clock className="h-4 w-4 text-red-700" />
                </div>
                <div>
                  <h4 className="font-medium">AI Suggestion:</h4>
                  <p className="text-sm text-muted-foreground">
                    Your trades after 1:30PM show 40% drop in precision. Consider avoiding fresh entries post 2PM and instead focus on managing existing positions or reviewing setups for next day.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="adherence" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Meta-Adherence Breakdown</h3>
                <p className="text-sm text-muted-foreground">
                  Combined score for your trading plan and execution adherence
                </p>
              </div>
              <div className="flex items-center">
                <Badge className="bg-yellow-100 text-yellow-800">
                  Grade: {metaAdherenceScore.grade}
                </Badge>
                <span className="text-2xl ml-2">{metaAdherenceScore.emoji}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Strategy Alignment</span>
                  <span className="text-sm">{metaAdherenceScore.strategyAlignment}%</span>
                </div>
                <Progress value={metaAdherenceScore.strategyAlignment} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Morning Bias Sync</span>
                  <span className="text-sm">{metaAdherenceScore.morningBiasSync}%</span>
                </div>
                <Progress value={metaAdherenceScore.morningBiasSync} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Execution Match</span>
                  <span className="text-sm">{metaAdherenceScore.executionMatch}%</span>
                </div>
                <Progress value={metaAdherenceScore.executionMatch} className="h-2" />
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-100 rounded-full p-1.5">
                  <Target className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium">Improvement Focus:</h4>
                  <p className="text-sm text-muted-foreground">
                    Your morning bias adherence is 15% lower than your execution discipline. Consider documenting your morning bias more clearly or adjusting your bias formation process.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Micro-Pattern Feedback Loop</h3>
                <p className="text-sm text-muted-foreground">
                  Detects repeating subconscious patterns in your trading
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 bg-red-100 p-2 rounded-full">
                    <TrendingDown className="h-5 w-5 text-red-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Scaling Too Early</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Across 7 trades, you scaled at 50% OB instead of 75%. Resulted in 11% lower RR across these setups.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 bg-yellow-100 p-2 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Re-entering Failed Setups</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You tend to re-enter on setups that previously failed — consider waiting for stronger confirmation before re-entering the same setup type.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 bg-green-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <h4 className="font-medium">Extended Hold Periods</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      When you hold winning trades more than 30 minutes, your RR improves by 22% on average. Consider giving winning positions more time to develop.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="seasonality" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Strategic Seasonality Heatmap</h3>
                <p className="text-sm text-muted-foreground">
                  Setup performance by weekday and time block
                </p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-2 border border-border text-sm font-medium">Time/Day</th>
                    {dayNames.map((day) => (
                      <th key={day} className="p-2 border border-border text-sm font-medium">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeBlocks.map((time) => (
                    <tr key={time}>
                      <td className="p-2 border border-border bg-muted text-sm font-medium">
                        {time}
                      </td>
                      {dayNames.map((day) => {
                        const value = seasonalityHeatmap.find(d => d.day === day)?.[time] || 0;
                        let bgColor = 'bg-muted/20';
                        
                        if (value > 80) bgColor = 'bg-green-100 text-green-800';
                        else if (value > 60) bgColor = 'bg-green-50 text-green-700';
                        else if (value > 40) bgColor = 'bg-yellow-50 text-yellow-700';
                        else if (value > 20) bgColor = 'bg-orange-50 text-orange-700';
                        else bgColor = 'bg-red-50 text-red-700';
                        
                        return (
                          <td 
                            key={`${day}-${time}`} 
                            className={`p-2 border border-border text-center ${bgColor}`}
                          >
                            {value}%
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-card rounded-lg border p-4">
                <h4 className="font-medium">Best Performing</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">Tue</Badge>
                  <Badge variant="outline">10-11AM</Badge>
                  <Badge>FVG Tap</Badge>
                  <Badge className="bg-green-100 text-green-800">85% Win Rate</Badge>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <h4 className="font-medium">Worst Performing</h4>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline">Fri</Badge>
                  <Badge variant="outline">3-4PM</Badge>
                  <Badge>Breakout</Badge>
                  <Badge className="bg-red-100 text-red-800">31% Win Rate</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alignment" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Trade-to-Bias Alignment</h3>
                <p className="text-sm text-muted-foreground">
                  How well your trades aligned with morning bias plan
                </p>
              </div>
              <Badge>73% Aligned</Badge>
            </div>
            
            <div className="bg-card rounded-lg border p-4">
              <h4 className="font-medium mb-2">Alignment Breakdown</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Aligned Trades</span>
                    <span className="text-sm font-medium">73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Counter-Bias Trades</span>
                    <span className="text-sm font-medium">21%</span>
                  </div>
                  <Progress value={21} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">No Clear Bias</span>
                    <span className="text-sm font-medium">6%</span>
                  </div>
                  <Progress value={6} className="h-2" />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-1">Aligned Performance</h5>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">68% Win Rate</Badge>
                    <Badge className="bg-green-100 text-green-800">2.4R Avg</Badge>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-1">Counter-Bias Performance</h5>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">41% Win Rate</Badge>
                    <Badge className="bg-red-100 text-red-800">1.1R Avg</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-100 rounded-full p-1.5">
                  <Target className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium">AI Tip:</h4>
                  <p className="text-sm text-muted-foreground">
                    You underperform when countering morning structure bias. If tempted to counter your bias, consider reducing position size by at least 30% to manage risk.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integrity" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Execution Integrity Index</h3>
                <p className="text-sm text-muted-foreground">
                  Composite score of planned vs actual execution metrics
                </p>
              </div>
              <div>
                <Badge className="text-lg px-3 py-1 bg-green-100 text-green-800">A-</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg border p-4">
                <h4 className="font-medium mb-2">Planned vs Actual Entry</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <Badge>92%</Badge>
                </div>
                <Progress value={92} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  High precision in executing entries as planned
                </p>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <h4 className="font-medium mb-2">Planned RR vs Actual</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <Badge>78%</Badge>
                </div>
                <Progress value={78} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Good alignment between planned and achieved RR
                </p>
              </div>
              
              <div className="bg-card rounded-lg border p-4">
                <h4 className="font-medium mb-2">Sizing Precision</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <Badge>87%</Badge>
                </div>
                <Progress value={87} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Consistent position sizing relative to plan
                </p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border p-4">
              <h4 className="font-medium mb-3">Integrity Breakdown</h4>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full">
                    A+
                  </Badge>
                  <span className="text-sm">Stop Placement</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full">
                    A
                  </Badge>
                  <span className="text-sm">Entry Execution</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full">
                    B+
                  </Badge>
                  <span className="text-sm">Position Sizing</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full">
                    B
                  </Badge>
                  <span className="text-sm">Target Adherence</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="h-8 w-8 flex items-center justify-center rounded-full">
                    C+
                  </Badge>
                  <span className="text-sm">Scale Out Discipline</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between border-t p-6">
        <Button variant="outline" size="sm">
          <FileText className="mr-2 h-4 w-4" />
          Export Data
        </Button>
        <Button size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          View Historical
        </Button>
      </CardFooter>
    </Card>
  );
}
