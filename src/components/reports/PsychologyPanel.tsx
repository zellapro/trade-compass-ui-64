
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { toast } from "@/components/ui/use-toast";
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { 
  Download, FileText, Calendar, Brain, Activity, Target, 
  TrendingUp, BarChart2, PieChart as PieChartIcon, 
  FileSpreadsheet, FilePlus, Clock, BookOpen
} from 'lucide-react';

interface PsychologyPanelProps {
  timeframe?: string;
}

export function PsychologyPanel({ timeframe = "30d" }: PsychologyPanelProps) {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [emotionView, setEmotionView] = useState("before");
  const [activeSection, setActiveSection] = useState("emotional");

  // Sample data for emotional timeline
  const emotionTimelineData = [
    { date: "2025-01-01", beforeTrade: "Anxious", duringTrade: "Focused", afterTrade: "Satisfied", result: "Win", pnl: 450 },
    { date: "2025-01-02", beforeTrade: "Calm", duringTrade: "Confident", afterTrade: "Proud", result: "Win", pnl: 680 },
    { date: "2025-01-03", beforeTrade: "Excited", duringTrade: "Nervous", afterTrade: "Regretful", result: "Loss", pnl: -320 },
    { date: "2025-01-04", beforeTrade: "Distracted", duringTrade: "Impulsive", afterTrade: "Angry", result: "Loss", pnl: -550 },
    { date: "2025-01-05", beforeTrade: "Calm", duringTrade: "Patient", afterTrade: "Neutral", result: "Win", pnl: 230 },
    { date: "2025-01-06", beforeTrade: "Hopeful", duringTrade: "Anxious", afterTrade: "Disappointed", result: "Loss", pnl: -180 },
    { date: "2025-01-07", beforeTrade: "Focused", duringTrade: "Calm", afterTrade: "Satisfied", result: "Win", pnl: 520 },
  ];

  // Emotion frequency data
  const emotionFrequencyData = {
    before: [
      { emotion: "Anxious", count: 15, winRate: 40 },
      { emotion: "Calm", count: 23, winRate: 78 },
      { emotion: "Excited", count: 10, winRate: 30 },
      { emotion: "Focused", count: 18, winRate: 72 },
      { emotion: "Distracted", count: 8, winRate: 25 },
      { emotion: "Hopeful", count: 12, winRate: 58 },
    ],
    during: [
      { emotion: "Focused", count: 20, winRate: 75 },
      { emotion: "Nervous", count: 14, winRate: 36 },
      { emotion: "Confident", count: 18, winRate: 67 },
      { emotion: "Impulsive", count: 9, winRate: 22 },
      { emotion: "Patient", count: 16, winRate: 81 },
      { emotion: "Anxious", count: 10, winRate: 30 },
    ],
    after: [
      { emotion: "Satisfied", count: 19, winRate: 100 },
      { emotion: "Regretful", count: 12, winRate: 0 },
      { emotion: "Proud", count: 16, winRate: 100 },
      { emotion: "Angry", count: 8, winRate: 0 },
      { emotion: "Neutral", count: 14, winRate: 79 },
      { emotion: "Disappointed", count: 11, winRate: 0 },
    ]
  };

  // Plan adherence data
  const planAdherenceData = [
    { day: "Mon", followed: 92, partial: 5, abandoned: 3 },
    { day: "Tue", followed: 85, partial: 10, abandoned: 5 },
    { day: "Wed", followed: 78, partial: 12, abandoned: 10 },
    { day: "Thu", followed: 88, partial: 7, abandoned: 5 },
    { day: "Fri", followed: 72, partial: 18, abandoned: 10 }
  ];

  // Emotional state vs performance data
  const emotionPerformanceData = [
    { state: "Calm", wins: 28, losses: 8, breakeven: 4, winRate: 70 },
    { state: "Confident", wins: 17, losses: 8, breakeven: 3, winRate: 60.7 },
    { state: "Anxious", wins: 10, losses: 22, breakeven: 6, winRate: 26.3 },
    { state: "Focused", wins: 25, losses: 10, breakeven: 5, winRate: 62.5 },
    { state: "Impulsive", wins: 4, losses: 12, breakeven: 2, winRate: 22.2 },
    { state: "Disappointed", wins: 0, losses: 10, breakeven: 2, winRate: 0 }
  ];

  // Cognitive bias data
  const biasData = [
    { subject: 'Loss Aversion', score: 78, fullMark: 100 },
    { subject: 'FOMO', score: 62, fullMark: 100 },
    { subject: 'Overconfidence', score: 45, fullMark: 100 },
    { subject: 'Confirmation Bias', score: 65, fullMark: 100 },
    { subject: 'Sunk Cost Fallacy', score: 58, fullMark: 100 },
  ];

  // Mindset vs results data
  const mindsetResultsData = [
    { date: '01/05', mood: 8, pnl: 750, winRate: 80 },
    { date: '01/06', mood: 7, pnl: 520, winRate: 70 },
    { date: '01/07', mood: 5, pnl: -180, winRate: 40 },
    { date: '01/08', mood: 4, pnl: -350, winRate: 30 },
    { date: '01/09', mood: 6, pnl: 250, winRate: 60 },
    { date: '01/10', mood: 8, pnl: 680, winRate: 75 },
    { date: '01/11', mood: 9, pnl: 820, winRate: 85 },
  ];

  // Behavioral goals data
  const goalsData = [
    { goal: "Avoid Revenge Trading", current: 7, target: 7, unit: "days", streak: true, complete: true },
    { goal: "Follow Plan 10 Trades in Row", current: 3, target: 10, unit: "trades", streak: false, complete: false },
    { goal: "Journal Within 1hr of Trading", current: 5, target: 5, unit: "days", streak: true, complete: true },
    { goal: "Maintain Proper Position Sizing", current: 8, target: 10, unit: "trades", streak: false, complete: false },
    { goal: "Take Scheduled Breaks", current: 2, target: 3, unit: "days", streak: false, complete: false }
  ];
  
  // Recovery & resilience data
  const recoveryData = [
    { day: "Loss 1", emotional: 3, financial: 2 },
    { day: "Loss 2", emotional: 2, financial: 4 },
    { day: "Loss 3", emotional: 1, financial: 2 },
    { day: "Loss 4", emotional: 2, financial: 3 },
    { day: "Loss 5", emotional: 1, financial: 1 },
  ];

  // Handle export functions
  const handleExport = (type: string, format: string) => {
    toast({
      title: "Export initiated",
      description: `Exporting ${type} data as ${format.toUpperCase()}`,
    });
  };

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
            <div>
              <CardTitle className="text-2xl font-bold">Psychology Analysis</CardTitle>
              <CardDescription>
                Analyze your trading psychology, emotional patterns, and behavioral tendencies
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <DatePickerWithRange
                date={dateRange}
                setDate={setDateRange}
                className="w-auto"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="emotional" onValueChange={setActiveSection} className="w-full">
            <div className="px-6">
              <TabsList className="mb-6 w-full h-auto justify-start flex-wrap">
                <TabsTrigger value="emotional" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Activity className="mr-2 h-4 w-4" />
                  Emotional Timeline
                </TabsTrigger>
                <TabsTrigger value="discipline" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Target className="mr-2 h-4 w-4" />
                  Plan Adherence
                </TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Emotional Performance
                </TabsTrigger>
                <TabsTrigger value="bias" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Brain className="mr-2 h-4 w-4" />
                  Bias Profile
                </TabsTrigger>
                <TabsTrigger value="mindset" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Mindset Correlation
                </TabsTrigger>
                <TabsTrigger value="goals" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Behavioral Goals
                </TabsTrigger>
                <TabsTrigger value="recovery" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  Recovery & Resilience
                </TabsTrigger>
              </TabsList>
            </div>
            
            {/* Emotional Timeline Section */}
            <TabsContent value="emotional" className="p-6 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Emotional Timeline</CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('EmotionalTimeline', 'csv')}>
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          CSV
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('EmotionalTimeline', 'pdf')}>
                          <FileText className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Emotional states tracked before, during, and after trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="py-2 mb-4">
                      <TabsList className="w-full grid grid-cols-3">
                        <TabsTrigger value="before" onClick={() => setEmotionView("before")}>Before Trades</TabsTrigger>
                        <TabsTrigger value="during" onClick={() => setEmotionView("during")}>During Trades</TabsTrigger>
                        <TabsTrigger value="after" onClick={() => setEmotionView("after")}>After Trades</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={emotionFrequencyData[emotionView as keyof typeof emotionFrequencyData]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                          <XAxis dataKey="emotion" />
                          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                          <Tooltip 
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                                    <p className="font-medium">{label}</p>
                                    <p className="text-sm">Count: {payload[0].value}</p>
                                    <p className="text-sm">Win Rate: {payload[1].value}%</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          <Bar yAxisId="left" dataKey="count" name="Frequency" fill="#8884d8" radius={[4, 4, 0, 0]} />
                          <Bar yAxisId="right" dataKey="winRate" name="Win Rate %" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Emotional Insights</CardTitle>
                    <CardDescription>Key findings from your emotional patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Most Common Emotions</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Before: Calm</span>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-800">
                            78% Win Rate
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">During: Focused</span>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-800">
                            75% Win Rate
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">After: Satisfied</span>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-800">
                            100% Win Rate
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-border/50">
                      <h4 className="font-medium text-sm mb-3">Key Insights</h4>
                      <div className="space-y-2">
                        <div className="p-2 rounded-md bg-blue-900/20 border border-blue-500/30">
                          <p className="text-sm">You win 72% of trades where post-trade emotion is 'Neutral' or 'Satisfied'</p>
                        </div>
                        <div className="p-2 rounded-md bg-amber-900/20 border border-amber-500/30">
                          <p className="text-sm">Trades initiated when 'Anxious' have a 40% win rate vs 78% when 'Calm'</p>
                        </div>
                        <div className="p-2 rounded-md bg-emerald-900/20 border border-emerald-500/30">
                          <p className="text-sm">Consider emotional priming techniques before trading to increase 'Calm' state frequency</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Plan Adherence Section */}
            <TabsContent value="discipline" className="p-6 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Plan Adherence & Discipline</CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('DisciplineReport', 'csv')}>
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          CSV
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('DisciplineReport', 'pdf')}>
                          <FileText className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Tracking how well you stick to your trading plan</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={planAdherenceData} barSize={20}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip 
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                                    <p className="font-medium">{label}</p>
                                    <p className="text-sm text-emerald-400">Followed: {payload[0].value}%</p>
                                    <p className="text-sm text-amber-400">Partial: {payload[1].value}%</p>
                                    <p className="text-sm text-red-400">Abandoned: {payload[2].value}%</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          <Bar dataKey="followed" stackId="a" fill="#10b981" name="Followed Plan" />
                          <Bar dataKey="partial" stackId="a" fill="#f59e0b" name="Partially Followed" />
                          <Bar dataKey="abandoned" stackId="a" fill="#ef4444" name="Abandoned Plan" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Discipline Metrics</CardTitle>
                    <CardDescription>Measuring your trading discipline</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Consistency Score</span>
                        <span className="text-sm font-mono">83/100</span>
                      </div>
                      <Progress value={83} className="h-2" indicatorClassName="bg-emerald-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Plan Adherence</span>
                        <span className="text-sm font-mono">85%</span>
                      </div>
                      <Progress value={85} className="h-2" indicatorClassName="bg-blue-500" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Rule Violations</span>
                        <span className="text-sm font-mono">12 total</span>
                      </div>
                      <div className="p-2 rounded-md bg-amber-900/20 border border-amber-500/30 text-sm">
                        Most common: Oversized Position (5), Early Exit (4)
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-border/50">
                      <h4 className="font-medium text-sm mb-3">AI Insights</h4>
                      <div className="space-y-2">
                        <div className="p-2 rounded-md bg-blue-900/20 border border-blue-500/30">
                          <p className="text-sm">Plan adherence improved by 23% after implementing pre-trade checklists</p>
                        </div>
                        <div className="p-2 rounded-md bg-amber-900/20 border border-amber-500/30">
                          <p className="text-sm">Highest deviation occurs on Fridays after loss days</p>
                        </div>
                        <div className="p-2 rounded-md bg-emerald-900/20 border border-emerald-500/30">
                          <p className="text-sm">Consider implementing a 'cooling off' period after consecutive losses</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Emotional Performance Matrix */}
            <TabsContent value="performance" className="p-6 pt-0 space-y-6">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Emotional State vs. Performance Matrix</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleExport('PerformanceMatrix', 'csv')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        CSV
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExport('PerformanceMatrix', 'pdf')}>
                        <FileText className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                  <CardDescription>Analyzing how emotions affect your trading outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left px-4 py-3 text-sm font-medium">Emotional State</th>
                          <th className="text-center px-4 py-3 text-sm font-medium">Wins</th>
                          <th className="text-center px-4 py-3 text-sm font-medium">Losses</th>
                          <th className="text-center px-4 py-3 text-sm font-medium">Breakeven</th>
                          <th className="text-center px-4 py-3 text-sm font-medium">Win Rate</th>
                          <th className="text-center px-4 py-3 text-sm font-medium">Summary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {emotionPerformanceData.map((item, index) => (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/10">
                            <td className="px-4 py-3 font-medium">{item.state}</td>
                            <td className="text-center px-4 py-3">
                              <Badge variant="outline" className="bg-emerald-900/20 text-emerald-400 border-emerald-800/30">
                                {item.wins}
                              </Badge>
                            </td>
                            <td className="text-center px-4 py-3">
                              <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-800/30">
                                {item.losses}
                              </Badge>
                            </td>
                            <td className="text-center px-4 py-3">
                              <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800/30">
                                {item.breakeven}
                              </Badge>
                            </td>
                            <td className="text-center px-4 py-3">
                              <Badge variant={item.winRate > 60 ? "outline" : (item.winRate > 40 ? "outline" : "outline")}
                                className={
                                  item.winRate > 60 
                                    ? "bg-emerald-900/20 text-emerald-400 border-emerald-800/30" 
                                    : item.winRate > 40 
                                      ? "bg-amber-900/20 text-amber-400 border-amber-800/30"
                                      : "bg-red-900/20 text-red-400 border-red-800/30"
                                }
                              >
                                {item.winRate}%
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <div className="w-full bg-muted/30 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full" 
                                  style={{ 
                                    width: `${item.winRate}%`, 
                                    backgroundColor: item.winRate > 60 
                                      ? '#10b981' // green
                                      : item.winRate > 40 
                                        ? '#f59e0b' // amber
                                        : '#ef4444', // red
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-4 px-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div className="p-3 rounded-md bg-blue-900/20 border border-blue-500/30">
                      <p className="text-sm font-medium text-blue-400 mb-1">Key Finding</p>
                      <p className="text-sm text-muted-foreground">
                        You win 70% of trades when feeling 'Calm', but only 26% when 'Anxious'. Consider implementing emotional regulation techniques before trading.
                      </p>
                    </div>
                    <div className="p-3 rounded-md bg-emerald-900/20 border border-emerald-500/30">
                      <p className="text-sm font-medium text-emerald-400 mb-1">Recommendation</p>
                      <p className="text-sm text-muted-foreground">
                        Adopt a pre-trade meditation or breathing routine to promote calmness. Journal emotional state before each trade to build self-awareness.
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Cognitive Bias Profile */}
            <TabsContent value="bias" className="p-6 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Cognitive Bias Profile</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => handleExport('BiasProfile', 'pdf')}>
                        <FileText className="h-4 w-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                    <CardDescription>Your dominant biases based on trading behavior</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={biasData}>
                          <PolarGrid stroke="#1e293b" />
                          <PolarAngleAxis dataKey="subject" stroke="#64748b" />
                          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#1e293b" />
                          <Radar 
                            name="Bias Score" 
                            dataKey="score" 
                            stroke="#3b82f6" 
                            fill="#3b82f6" 
                            fillOpacity={0.3} 
                          />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                                    <p className="font-medium">{data.subject}</p>
                                    <p className="text-sm">
                                      Score: {data.score}/100
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Severity: {data.score > 75 ? 'High' : data.score > 50 ? 'Medium' : 'Low'}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Bias Mitigation</CardTitle>
                    <CardDescription>Strategies to overcome your top biases</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Loss Aversion</h4>
                          <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-800/30">
                            78/100
                          </Badge>
                        </div>
                        <div className="p-2 rounded-md bg-blue-900/20 border border-blue-500/30 text-sm">
                          <p className="font-medium text-blue-400 mb-1">Strategy:</p>
                          <p>Use preset stop-loss and take-profit orders to remove emotion from exits. Consider using a fixed R:R approach.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Confirmation Bias</h4>
                          <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-800/30">
                            65/100
                          </Badge>
                        </div>
                        <div className="p-2 rounded-md bg-blue-900/20 border border-blue-500/30 text-sm">
                          <p className="font-medium text-blue-400 mb-1">Strategy:</p>
                          <p>For each trade, write both bull and bear cases. Follow traders with opposing market views to balance your perspective.</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">FOMO</h4>
                          <Badge variant="outline" className="bg-amber-900/20 text-amber-400 border-amber-800/30">
                            62/100
                          </Badge>
                        </div>
                        <div className="p-2 rounded-md bg-blue-900/20 border border-blue-500/30 text-sm">
                          <p className="font-medium text-blue-400 mb-1">Strategy:</p>
                          <p>Implement a 10-minute delay rule before entering trending markets. Document missed trades to analyze later without acting.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Mindset vs Result Correlation */}
            <TabsContent value="mindset" className="p-6 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Mindset vs. Result Correlation</CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('MindsetReport', 'csv')}>
                          <FileSpreadsheet className="h-4 w-4 mr-2" />
                          CSV
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('MindsetReport', 'pdf')}>
                          <FileText className="h-4 w-4 mr-2" />
                          PDF
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Correlating your daily mood scores with trading performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mindsetResultsData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                          <XAxis dataKey="date" />
                          <YAxis yAxisId="left" domain={[0, 10]} />
                          <YAxis yAxisId="right" orientation="right" domain={[-400, 900]} />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                                    <p className="font-medium">{label}</p>
                                    <p className="text-sm text-blue-400">
                                      Mood Score: {payload[0].value}/10
                                    </p>
                                    <p className="text-sm text-emerald-400">
                                      P&L: ${payload[1].value}
                                    </p>
                                    <p className="text-sm text-amber-400">
                                      Win Rate: {payload[2].value}%
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          <Line 
                            yAxisId="left" 
                            type="monotone" 
                            dataKey="mood" 
                            name="Mood Score" 
                            stroke="#3b82f6" 
                            strokeWidth={2}
                            dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                          />
                          <Line 
                            yAxisId="right" 
                            type="monotone" 
                            dataKey="pnl" 
                            name="P&L ($)" 
                            stroke="#10b981" 
                            strokeWidth={2}
                            dot={{ stroke: '#10b981', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                          />
                          <Line 
                            yAxisId="left" 
                            type="monotone" 
                            dataKey="winRate" 
                            name="Win Rate (%)" 
                            stroke="#f59e0b" 
                            strokeWidth={2}
                            dot={{ stroke: '#f59e0b', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Mindset Insights</CardTitle>
                    <CardDescription>Key findings about your trading mindset</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Mood Score Averages</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 rounded-md bg-muted/30">
                          <p className="text-xs text-muted-foreground">Winning Days</p>
                          <p className="font-medium">8.2/10</p>
                        </div>
                        <div className="p-2 rounded-md bg-muted/30">
                          <p className="text-xs text-muted-foreground">Losing Days</p>
                          <p className="font-medium">4.5/10</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-border/50">
                      <h4 className="font-medium text-sm mb-3">Key Correlations</h4>
                      <div className="space-y-2">
                        <div className="p-2 rounded-md bg-blue-900/20 border border-blue-500/30">
                          <p className="text-sm">Your best trading days occur when mood score is 7-9</p>
                        </div>
                        <div className="p-2 rounded-md bg-amber-900/20 border border-amber-500/30">
                          <p className="text-sm">Low-energy days (mood score < 5) correlate with 83% of your largest losses</p>
                        </div>
                        <div className="p-2 rounded-md bg-emerald-900/20 border border-emerald-500/30">
                          <p className="text-sm">Consider a daily mood check - if below 6/10, reduce position sizes or take a day off</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-border/50">
                      <h4 className="font-medium text-sm mb-2">Mood Improvement Ideas</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Morning exercise routine</li>
                        <li>Pre-market meditation (5-10 min)</li>
                        <li>Journaling positive market observations</li>
                        <li>Scheduled breaks between trading sessions</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Behavioral Goals */}
            <TabsContent value="goals" className="p-6 pt-0 space-y-6">
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Behavioral Goal Tracking</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => handleExport('GoalTracker', 'pdf')}>
                      <FileText className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                  <CardDescription>Tracking your psychological growth goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {goalsData.map((goal, index) => (
                      <Card key={index} className="border-border/50">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-base">{goal.goal}</CardTitle>
                            {goal.complete ? (
                              <Badge className="bg-emerald-500 text-white">Achieved</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800/30">
                                In Progress
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{goal.current}/{goal.target} {goal.unit}</span>
                            </div>
                            <Progress 
                              value={(goal.current / goal.target) * 100} 
                              className="h-2"
                              indicatorClassName={goal.complete ? "bg-emerald-500" : "bg-blue-500"}
                            />
                            {goal.streak && (
                              <div className="flex items-center mt-2 text-sm text-amber-400">
                                <Target className="h-3 w-3 mr-1" />
                                <span>{goal.current} day streak!</span>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-md bg-blue-900/20 border border-blue-500/30">
                    <h4 className="font-medium text-blue-400 mb-2">AI Coaching Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      You're making good progress with consistent journaling and avoiding revenge trading. Consider implementing a mechanical checklist system to improve plan adherence. Your discipline tends to waver after experiencing losses - scheduled breaks might help maintain consistency during these periods.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Recovery & Resilience */}
            <TabsContent value="recovery" className="p-6 pt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-border/50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Recovery & Resilience Monitor</CardTitle>
                      <Button variant="outline" size="sm" onClick={() => handleExport('RecoveryMetrics', 'csv')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <CardDescription>Tracking your recovery time after losing trades</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={recoveryData} barGap={0}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                          <XAxis dataKey="day" />
                          <YAxis label={{ value: 'Days to Recover', angle: -90, position: 'insideLeft' }} />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                                    <p className="font-medium">{label}</p>
                                    <p className="text-sm text-blue-400">
                                      Emotional Recovery: {payload[0].value} days
                                    </p>
                                    <p className="text-sm text-emerald-400">
                                      Financial Recovery: {payload[1].value} days
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          <Bar dataKey="emotional" name="Emotional Recovery" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="financial" name="Financial Recovery" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-border/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Resilience Metrics</CardTitle>
                    <CardDescription>Measuring your psychological resilience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-md bg-muted/30">
                        <p className="text-xs text-muted-foreground">Avg. Emotional Recovery</p>
                        <p className="font-medium text-lg">1.8 days</p>
                      </div>
                      <div className="p-3 rounded-md bg-muted/30">
                        <p className="text-xs text-muted-foreground">Avg. Financial Recovery</p>
                        <p className="font-medium text-lg">2.4 days</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Post-Loss Reaction Score</h4>
                      <div className="flex items-center gap-2">
                        <Progress value={72} className="h-2" indicatorClassName="bg-blue-500" />
                        <span className="text-sm font-mono">72/100</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Measures how constructively you respond to losses</p>
                    </div>
                    
                    <div className="pt-3 border-t border-border/50">
                      <h4 className="font-medium text-sm mb-3">Resilience Insights</h4>
                      <div className="space-y-2">
                        <div className="p-2 rounded-md bg-blue-900/20 border border-blue-500/30">
                          <p className="text-sm">Quickest recovery during high journal consistency weeks</p>
                        </div>
                        <div className="p-2 rounded-md bg-amber-900/20 border border-amber-500/30">
                          <p className="text-sm">Emotional volatility higher after large wins than large losses</p>
                        </div>
                        <div className="p-2 rounded-md bg-emerald-900/20 border border-emerald-500/30">
                          <p className="text-sm">Your recovery time has improved by 32% in the last 3 months</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t border-border/50">
                      <h4 className="font-medium text-sm mb-2">Recovery Rituals</h4>
                      <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                        <li>Post-loss review (15 min max)</li>
                        <li>Physical activity break</li>
                        <li>Market detachment period</li>
                        <li>Positive self-talk practice</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
