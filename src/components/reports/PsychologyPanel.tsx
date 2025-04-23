
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  Sankey,
  Legend,
  Rectangle
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart as BarChartIcon, 
  Calendar,
  ArrowDown,
  ArrowUp, 
  ChartLine, 
  Star, 
  CircleDot,
  EmojiHappy, 
  EmojiSad, 
  EmojiNeutral,
  Info,
  ChevronDown,
  ChevronUp,
  CircleArrowLeft,
  CircleArrowRight,
  FlagOff,
  Flag,
  Table as TableIcon,
  StarOff
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PsychologyPanelProps {
  timeframe?: string;
}

export function PsychologyPanel({ timeframe = "30d" }: PsychologyPanelProps) {
  const [activeSection, setActiveSection] = useState<string[]>([
    "emotion-trends", 
    "mindset-matrix", 
    "behavior-tracker", 
    "correlation-chart", 
    "ai-insights"
  ]);
  
  const [comparisonMode, setComparisonMode] = useState<"calm-anxious" | "focused-distracted" | "none">("none");
  const [chartView, setChartView] = useState<"line" | "area" | "calendar">("line");
  const [behaviorFilter, setBehaviorFilter] = useState<"all" | "negative" | "positive">("all");

  const toggleSection = (id: string) => {
    setActiveSection(current => 
      current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  // Emotion trend data - multiple days with emotional states
  const emotionTrendData = [
    { date: "Apr 15", trade: "AAPL", before: 8, during: 7, after: 9, pnl: 950, emoji: "😀", setup: "OB Reclaim" },
    { date: "Apr 16", trade: "MSFT", before: 7, during: 5, after: 8, pnl: 720, emoji: "🙂", setup: "VWAP Bounce" },
    { date: "Apr 17", trade: "TSLA", before: 4, during: 3, after: 5, pnl: -450, emoji: "😟", setup: "Breakout" },
    { date: "Apr 18", trade: "META", before: 6, during: 4, after: 7, pnl: 320, emoji: "😐", setup: "SMC" },
    { date: "Apr 19", trade: "AMZN", before: 9, during: 8, after: 9, pnl: 1250, emoji: "😀", setup: "OB Reclaim" },
    { date: "Apr 20", trade: "NVDA", before: 3, during: 3, after: 4, pnl: -680, emoji: "😖", setup: "Breakout" },
    { date: "Apr 21", trade: "AMD", before: 7, during: 6, after: 8, pnl: 540, emoji: "🙂", setup: "VWAP Bounce" },
    { date: "Apr 22", trade: "GOOGL", before: 5, during: 4, after: 6, pnl: -220, emoji: "😕", setup: "Fib Entry" },
    { date: "Apr 23", trade: "NFLX", before: 8, during: 7, after: 9, pnl: 890, emoji: "😀", setup: "SMC" },
  ];

  // Mindset vs Performance data
  const mindsetPerformanceData = [
    { state: "Focused", winRate: 72, avgRR: 2.8, planAdherence: 95, tradePercent: 28, color: "#10b981" },
    { state: "Calm", winRate: 68, avgRR: 2.3, planAdherence: 92, tradePercent: 25, color: "#3b82f6" },
    { state: "Neutral", winRate: 56, avgRR: 1.8, planAdherence: 78, tradePercent: 15, color: "#8b5cf6" },
    { state: "Excited", winRate: 48, avgRR: 1.3, planAdherence: 65, tradePercent: 10, color: "#f59e0b" },
    { state: "Anxious", winRate: 41, avgRR: 1.1, planAdherence: 59, tradePercent: 12, color: "#ef4444" },
    { state: "Overconfident", winRate: 34, avgRR: 0.8, planAdherence: 48, tradePercent: 7, color: "#dc2626" },
    { state: "Hopeful", winRate: 29, avgRR: 0.6, planAdherence: 37, tradePercent: 3, color: "#b91c1c" }
  ];
  
  // Behavioral pattern data
  const behaviorData = [
    { name: "FOMO Entries", frequency: 18, impact: -1450, type: "negative", winRate: 32 },
    { name: "Cutting Winners Early", frequency: 23, impact: -1850, type: "negative", winRate: 45 },
    { name: "Revenge Trades", frequency: 12, impact: -980, type: "negative", winRate: 28 },
    { name: "Moving Stops Midtrade", frequency: 9, impact: -720, type: "negative", winRate: 23 },
    { name: "Scaling Too Aggressively", frequency: 8, impact: -650, type: "negative", winRate: 38 },
    { name: "Stuck to Plan", frequency: 42, impact: 3850, type: "positive", winRate: 76 },
    { name: "Correct Position Sizing", frequency: 38, impact: 2950, type: "positive", winRate: 72 },
    { name: "Perfect Entry Execution", frequency: 25, impact: 2780, type: "positive", winRate: 84 },
    { name: "Planned Scale-ins", frequency: 19, impact: 1950, type: "positive", winRate: 79 },
    { name: "Proper Stop Management", frequency: 32, impact: 2650, type: "positive", winRate: 68 }
  ];

  // Filter behaviors based on selected type
  const filteredBehaviors = behaviorData.filter(item => {
    if (behaviorFilter === "all") return true;
    return item.type === behaviorFilter;
  }).slice(0, 5); // Take top 5

  // Emotion-Mistake correlation data for Sankey diagram
  const correlationData = [
    { source: "Fear", target: "Early Exits", value: 24 },
    { source: "Fear", target: "Moving Stops", value: 16 },
    { source: "Impatience", target: "Early Entries", value: 28 },
    { source: "Impatience", target: "Cutting Winners", value: 22 },
    { source: "FOMO", target: "Early Entries", value: 32 },
    { source: "FOMO", target: "Oversizing", value: 18 },
    { source: "Overconfidence", target: "Oversizing", value: 21 },
    { source: "Overconfidence", target: "Ignoring Plan", value: 19 },
    { source: "Frustration", target: "Revenge Trades", value: 30 },
    { source: "Frustration", target: "Overtrading", value: 25 }
  ];

  // Format for easier visualization
  const emotionMistakeNodes = [
    { name: "Fear" },
    { name: "Impatience" },
    { name: "FOMO" },
    { name: "Overconfidence" },
    { name: "Frustration" },
    { name: "Early Exits" },
    { name: "Moving Stops" },
    { name: "Early Entries" },
    { name: "Cutting Winners" },
    { name: "Oversizing" },
    { name: "Ignoring Plan" },
    { name: "Revenge Trades" },
    { name: "Overtrading" }
  ];

  // AI insights based on trading patterns
  const aiInsights = [
    {
      title: "Emotional Pattern Insight",
      content: "You perform best when calm and executing OB setups. 63% of your losses correlate with emotional entries made during volatile conditions.",
      icon: "🧠",
      color: "blue"
    },
    {
      title: "Behavioral Trigger",
      content: "Revenge trades occur most frequently after 2 consecutive losses — consider implementing a cooldown timer or rule after consecutive losses.",
      icon: "⚠️",
      color: "amber"
    },
    {
      title: "Performance Optimization",
      content: "When your emotional score is 7+ before trading, your win rate increases by 26% and average R:R improves by 1.2. Consider only trading when you're in this optimal state.",
      icon: "📈",
      color: "green"
    }
  ];

  // Mood calendar data (simplified for demo)
  const moodCalendarData = [
    { date: "Apr 1", emotion: "😀", score: 8, trades: 3, profitable: 3 },
    { date: "Apr 2", emotion: "😀", score: 9, trades: 2, profitable: 2 },
    { date: "Apr 3", emotion: "🙂", score: 7, trades: 4, profitable: 3 },
    { date: "Apr 4", emotion: "😐", score: 6, trades: 2, profitable: 1 },
    { date: "Apr 5", emotion: "🙂", score: 7, trades: 3, profitable: 2 },
    { date: "Apr 6", emotion: "😕", score: 5, trades: 2, profitable: 0 },
    { date: "Apr 7", emotion: "😟", score: 4, trades: 1, profitable: 0 },
    { date: "Apr 8", emotion: "🙂", score: 7, trades: 3, profitable: 2 },
    { date: "Apr 9", emotion: "😀", score: 8, trades: 4, profitable: 3 },
    { date: "Apr 10", emotion: "😐", score: 6, trades: 2, profitable: 1 },
    { date: "Apr 11", emotion: "😕", score: 5, trades: 3, profitable: 1 },
    { date: "Apr 12", emotion: "🙂", score: 7, trades: 2, profitable: 2 },
  ];

  // Helper functions for emotional state visualization
  const getEmojiForScore = (score: number) => {
    if (score >= 8) return "😀";
    if (score >= 6) return "🙂";
    if (score >= 5) return "😐";
    if (score >= 3) return "😕";
    return "😟";
  };

  const getColorForScore = (score: number) => {
    if (score >= 8) return "text-green-500";
    if (score >= 6) return "text-emerald-400";
    if (score >= 5) return "text-amber-400";
    if (score >= 3) return "text-orange-500";
    return "text-red-500";
  };

  const getBackgroundForScore = (score: number) => {
    if (score >= 8) return "bg-green-500/10";
    if (score >= 6) return "bg-emerald-400/10";
    if (score >= 5) return "bg-amber-400/10";
    if (score >= 3) return "bg-orange-500/10";
    return "bg-red-500/10";
  };

  return (
    <div className="space-y-6">
      <Card className="border-indigo-500/20">
        <CardHeader className="pb-2 bg-indigo-500/5 rounded-t-lg">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <EmojiHappy className="mr-2 h-5 w-5 text-indigo-400" />
                Advanced Psychology & Behavior Analytics
              </CardTitle>
              <CardDescription>
                AI-powered analysis of emotional states, mindset impact, and behavioral patterns
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border-indigo-800">
              {timeframe} • AI-Analyzed
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Emotion Trend Visualization */}
          <Collapsible 
            open={activeSection.includes("emotion-trends")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleSection("emotion-trends")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <EmojiHappy className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-medium">Emotion Trend Visualization</h3>
              </div>
              {activeSection.includes("emotion-trends") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Track your emotional states before, during, and after trades
                </p>
                <div className="flex items-center bg-muted/50 rounded-md p-1">
                  <Button 
                    size="sm" 
                    variant={chartView === "line" ? "default" : "ghost"}
                    onClick={() => setChartView("line")}
                    className="text-xs h-7 px-3"
                  >
                    <ChartLine className="h-3.5 w-3.5 mr-1" />
                    Line
                  </Button>
                  <Button 
                    size="sm" 
                    variant={chartView === "area" ? "default" : "ghost"}
                    onClick={() => setChartView("area")}
                    className="text-xs h-7 px-3"
                  >
                    <BarChartIcon className="h-3.5 w-3.5 mr-1" />
                    Area
                  </Button>
                  <Button 
                    size="sm" 
                    variant={chartView === "calendar" ? "default" : "ghost"}
                    onClick={() => setChartView("calendar")}
                    className="text-xs h-7 px-3"
                  >
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Calendar
                  </Button>
                </div>
              </div>
              
              {chartView === "calendar" ? (
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2 mt-4">
                  {moodCalendarData.map((day, idx) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "p-2 rounded-lg border flex flex-col items-center justify-center aspect-square",
                        getBackgroundForScore(day.score),
                        "border-border/50"
                      )}
                    >
                      <span className="text-xs text-muted-foreground mb-1">{day.date.split(" ")[1]}</span>
                      <span className="text-xl mb-1">{day.emotion}</span>
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <span className={getColorForScore(day.score)}>
                          {day.profitable}/{day.trades}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[380px]">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartView === "line" ? (
                      <LineChart data={emotionTrendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0]?.payload;
                              if (!data) return null;
                              
                              return (
                                <div className="rounded-lg border border-border/50 bg-background/95 p-3 shadow-md">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">{data.emoji}</span>
                                    <p className="font-medium">{data.trade} ({label})</p>
                                  </div>
                                  <p className="text-sm mb-1">
                                    Setup: <span className="font-medium">{data.setup}</span>
                                  </p>
                                  <p className="text-sm" style={{ color: "#3b82f6" }}>
                                    Before Trade: {payload[0]?.value}/10
                                  </p>
                                  <p className="text-sm" style={{ color: "#8b5cf6" }}>
                                    During Trade: {payload[1]?.value}/10
                                  </p>
                                  <p className="text-sm" style={{ color: "#10b981" }}>
                                    After Trade: {payload[2]?.value}/10
                                  </p>
                                  <div className={`text-sm font-medium mt-2 px-2 py-1 rounded ${Number(payload[3]?.value) >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                    P&L: ${payload[3]?.value}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="before" 
                          name="Before Trade"
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                          activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="during" 
                          name="During Trade"
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                          activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="after" 
                          name="After Trade"
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ stroke: '#10b981', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                          activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                        />
                      </LineChart>
                    ) : (
                      <AreaChart data={emotionTrendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0]?.payload;
                              if (!data) return null;
                              
                              return (
                                <div className="rounded-lg border border-border/50 bg-background/95 p-3 shadow-md">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xl">{data.emoji}</span>
                                    <p className="font-medium">{data.trade} ({label})</p>
                                  </div>
                                  <p className="text-sm mb-1">
                                    Setup: <span className="font-medium">{data.setup}</span>
                                  </p>
                                  <p className="text-sm" style={{ color: "#3b82f6" }}>
                                    Before Trade: {payload[0]?.value}/10
                                  </p>
                                  <p className="text-sm" style={{ color: "#8b5cf6" }}>
                                    During Trade: {payload[1]?.value}/10
                                  </p>
                                  <p className="text-sm" style={{ color: "#10b981" }}>
                                    After Trade: {payload[2]?.value}/10
                                  </p>
                                  <div className={`text-sm font-medium mt-2 px-2 py-1 rounded ${Number(payload[3]?.value) >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                    P&L: ${payload[3]?.value}
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="before" 
                          name="Before Trade"
                          stroke="#3b82f6" 
                          fill="#3b82f620"
                          strokeWidth={2}
                          activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="during" 
                          name="During Trade"
                          stroke="#8b5cf6" 
                          fill="#8b5cf620"
                          strokeWidth={2}
                          activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="after" 
                          name="After Trade"
                          stroke="#10b981" 
                          fill="#10b98120"
                          strokeWidth={2}
                          activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                        />
                      </AreaChart>
                    )}
                  </ResponsiveContainer>
                </div>
              )}
              
              <div className="mt-4 p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Emotional Trend Insight</p>
                    <p className="text-muted-foreground">
                      You perform <span className="text-red-400 font-medium">36% worse</span> when entering trades in an anxious state (5/10 or below) 
                      versus a focused state (7/10 or above). Trades where emotional state improves during execution have a <span className="text-emerald-400 font-medium">28% higher</span> win rate.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-800">
                    <CircleDot className="h-3 w-3 mr-1" />
                    Before
                  </Badge>
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-800">
                    <CircleDot className="h-3 w-3 mr-1" />
                    During
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-800">
                    <CircleDot className="h-3 w-3 mr-1" />
                    After
                  </Badge>
                </div>
                
                <div>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Date Range
                  </Button>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Mindset vs Performance Matrix */}
          <Collapsible 
            open={activeSection.includes("mindset-matrix")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleSection("mindset-matrix")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <TableIcon className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-medium">Mindset vs Performance Matrix</h3>
              </div>
              {activeSection.includes("mindset-matrix") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                How different emotional states directly impact your trading results
              </p>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold">Mindset State</TableHead>
                      <TableHead className="text-center font-semibold">Win Rate %</TableHead>
                      <TableHead className="text-center font-semibold">Avg R:R</TableHead>
                      <TableHead className="text-center font-semibold">Plan Adherence</TableHead>
                      <TableHead className="text-right font-semibold">% of Trades</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mindsetPerformanceData.map((state, index) => (
                      <TableRow key={index} className="hover:bg-muted/30">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: state.color }}
                            />
                            <span>{state.state}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "px-2 py-1",
                              state.winRate >= 60 ? "bg-green-500/20 text-green-500 border-green-800" :
                              state.winRate >= 45 ? "bg-amber-500/20 text-amber-500 border-amber-800" :
                              "bg-red-500/20 text-red-500 border-red-800"
                            )}
                          >
                            {state.winRate}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-medium"
                          style={{ color: state.color }}
                        >
                          {state.avgRR.toFixed(1)}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="w-full bg-muted/30 rounded-full h-2 inline-block" style={{ width: "80px" }}>
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                width: `${state.planAdherence}%`, 
                                backgroundColor: state.color 
                              }}
                            />
                          </div>
                          <span className="ml-2 text-muted-foreground text-xs">{state.planAdherence}%</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-sm">{state.tradePercent}%</span>
                            <div className="w-16 bg-muted/30 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full"
                                style={{ 
                                  width: `${(state.tradePercent / 30) * 100}%`, 
                                  backgroundColor: state.color 
                                }}
                              />
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex items-start gap-3">
                    <ArrowUp size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-emerald-400 font-medium mb-1">Key Performance Insight</p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">Focused and calm states</span> result in more than double the R:R ratio
                        compared to anxious or overconfident states. Consider implementing a pre-trade emotional
                        checklist to ensure optimal mindset before entering positions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <div className="flex items-start gap-3">
                    <ArrowDown size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-amber-400 font-medium mb-1">Risk Factor</p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">Hopeful and overconfident</span> states show the lowest plan adherence
                        and dramatically reduced win rates. Consider implementing a "cool down period" when you identify 
                        these emotional states before trading.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <CircleArrowLeft className="h-3.5 w-3.5 mr-1" />
                    Prev Month
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    Next Month
                    <CircleArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  <TableIcon className="h-3.5 w-3.5 mr-1" />
                  Export Report
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Behavioral Repetition Tracker */}
          <Collapsible 
            open={activeSection.includes("behavior-tracker")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleSection("behavior-tracker")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <BarChartIcon className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-medium">Behavioral Repetition Tracker</h3>
              </div>
              {activeSection.includes("behavior-tracker") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Track recurring behavior patterns and their impact on your trading
                </p>
                <div className="flex items-center bg-muted/50 rounded-md p-1">
                  <Button 
                    size="sm" 
                    variant={behaviorFilter === "all" ? "default" : "ghost"}
                    onClick={() => setBehaviorFilter("all")}
                    className="text-xs h-7 px-3"
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant={behaviorFilter === "negative" ? "default" : "ghost"}
                    onClick={() => setBehaviorFilter("negative")}
                    className="text-xs h-7 px-3"
                  >
                    <FlagOff className="h-3.5 w-3.5 mr-1" />
                    Negative
                  </Button>
                  <Button 
                    size="sm" 
                    variant={behaviorFilter === "positive" ? "default" : "ghost"}
                    onClick={() => setBehaviorFilter("positive")}
                    className="text-xs h-7 px-3"
                  >
                    <Flag className="h-3.5 w-3.5 mr-1" />
                    Positive
                  </Button>
                </div>
              </div>
              
              <div className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredBehaviors}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.1} />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={120}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0]?.payload;
                          if (!data) return null;
                          
                          return (
                            <div className="rounded-lg border border-border/50 bg-background/95 p-3 shadow-md">
                              <p className="font-medium mb-1">{data.name}</p>
                              <p className="text-sm">
                                Frequency: <span className="font-medium">{data.frequency} occurrences</span>
                              </p>
                              <p className="text-sm">
                                Win Rate: <span className="font-medium">{data.winRate}%</span>
                              </p>
                              <div 
                                className={`text-sm font-medium mt-2 px-2 py-1 rounded ${
                                  data.type === 'positive' 
                                    ? 'bg-green-500/20 text-green-500' 
                                    : 'bg-red-500/20 text-red-500'
                                }`}
                              >
                                P&L Impact: ${data.impact > 0 ? '+' : ''}{data.impact}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="frequency" 
                      background={{ fill: "#1e293b20" }}
                      radius={[0, 4, 4, 0]}
                    >
                      {filteredBehaviors.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.type === 'positive' ? '#10b981' : '#ef4444'} 
                        />
                      ))}
                      <LabelList 
                        dataKey="frequency" 
                        position="right" 
                        style={{ fill: '#f8fafc', fontSize: 12, fontWeight: 500 }} 
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <div className="flex items-start gap-3">
                    <Info size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-amber-400 font-medium mb-1">Behavior Insight</p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">"FOMO Entries"</span> show a significant negative 
                        impact on your P&L. These usually occur during high market volatility or after missing a previous setup.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                  <div className="flex items-start gap-3">
                    <Info size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-emerald-400 font-medium mb-1">Strength Opportunity</p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">"Stuck to Plan"</span> trades show an exceptional 76% win rate. 
                        Consider implementing a hard rule to never deviate from your written trade plan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Mistake-Emotion Correlation Chart */}
          <Collapsible 
            open={activeSection.includes("correlation-chart")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleSection("correlation-chart")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <ChartLine className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-medium">Mistake → Emotion Correlation</h3>
              </div>
              {activeSection.includes("correlation-chart") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Flow diagram showing how emotional states connect to specific trading mistakes
                </p>
                <Button variant="outline" size="sm" className="text-xs">
                  <Star className="h-3.5 w-3.5 mr-1" />
                  Pin Important
                </Button>
              </div>
              
              {/* Placeholder for Sankey diagram - not fully supported in recharts */}
              <div className="h-[350px] border-2 border-dashed border-border/50 rounded-lg flex items-center justify-center">
                <div className="p-8 text-center">
                  <ChartLine className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h4 className="text-lg font-medium mb-2">Emotion → Mistake Flow Diagram</h4>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    Interactive flow diagram showing how emotional states connect to 
                    specific trading mistakes (74% of early entries came from fear or impatience)
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-sm">
                    <div className="text-left p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <p className="font-medium text-purple-400">Emotions</p>
                      <ul className="mt-2 space-y-1 text-muted-foreground">
                        <li>• Fear (40 occurrences)</li>
                        <li>• FOMO (32 occurrences)</li>
                        <li>• Frustration (55 occurrences)</li>
                      </ul>
                    </div>
                    <div className="text-left p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <p className="font-medium text-amber-400">Mistakes</p>
                      <ul className="mt-2 space-y-1 text-muted-foreground">
                        <li>• Early Exits (30%)</li>
                        <li>• Early Entries (25%)</li>
                        <li>• Revenge Trades (18%)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                  <div className="flex items-start gap-3">
                    <Info size={18} className="text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-purple-400 font-medium mb-1">Key Finding</p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">Fear</span> has a strong correlation (71%) with early exits, 
                        resulting in an average of 0.4 lower R:R ratio on affected trades.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-purple-500/20 bg-purple-500/5">
                  <div className="flex items-start gap-3">
                    <EmojiSad size={18} className="text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-purple-400 font-medium mb-1">Critical Pattern</p>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-medium">Frustration</span> leads to revenge trades in 89% of cases, 
                        which have a 23% win rate and -1.4 average R:R.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* AI Mind Mirror Summary */}
          <Collapsible 
            open={activeSection.includes("ai-insights")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleSection("ai-insights")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <EmojiNeutral className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-medium">AI Mind Mirror Summary</h3>
              </div>
              {activeSection.includes("ai-insights") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {aiInsights.map((insight, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-xl border border-${insight.color}-500/20 bg-${insight.color}-500/5`}
                  >
                    <div className="flex items-start">
                      <div className="text-3xl mr-3">{insight.icon}</div>
                      <div>
                        <h4 className={`text-${insight.color}-400 font-medium mb-2`}>{insight.title}</h4>
                        <p className="text-muted-foreground text-sm">{insight.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 p-5 rounded-lg border border-blue-500/20">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">🧠</div>
                  <div>
                    <h4 className="text-blue-400 font-medium mb-3">AI-Generated Psychological Edge Analysis</h4>
                    <p className="text-muted-foreground mb-4">
                      You're most profitable when you <span className="text-blue-400 font-medium">journal your mindset</span>, 
                      trade <span className="text-blue-400 font-medium">OB setups</span>, and 
                      wait for <span className="text-blue-400 font-medium">structure breaks</span>. 
                      Trades taken while 'anxious' drop R:R by <span className="text-red-400 font-medium">-1.1</span> on average.
                      When your emotional state is rated 7+ before entering trades, your win rate increases by 
                      <span className="text-emerald-400 font-medium"> +26%</span>.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-background/60 p-3 rounded-lg border border-blue-500/20">
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="text-sm font-medium">Strongest Trait</h5>
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-800">
                            +3.2 R:R
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Patient waiting for A+ setups</p>
                      </div>
                      <div className="bg-background/60 p-3 rounded-lg border border-blue-500/20">
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="text-sm font-medium">Biggest Challenge</h5>
                          <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-800">
                            -1.8 R:R
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">FOMO entries on breakouts</p>
                      </div>
                      <div className="bg-background/60 p-3 rounded-lg border border-blue-500/20">
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="text-sm font-medium">Overall Trend</h5>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-800">
                            Improving
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">+18% psych score vs. last month</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Psychology Score */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium flex items-center">
                    <StarOff className="h-4 w-4 mr-2 text-muted-foreground" />
                    Recent Trades Psychology Score
                  </h4>
                  <Badge variant="outline">
                    Monthly Avg: 76/100
                  </Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { date: "04/18/2023", symbol: "AAPL", planDiscipline: 85, emotionalBias: 78, reactionQuality: 82, mindsetMatch: 80, overall: 81 },
                    { date: "04/17/2023", symbol: "MSFT", planDiscipline: 92, emotionalBias: 88, reactionQuality: 90, mindsetMatch: 85, overall: 89 },
                    { date: "04/16/2023", symbol: "TSLA", planDiscipline: 65, emotionalBias: 55, reactionQuality: 62, mindsetMatch: 58, overall: 60 }
                  ].map((score, index) => (
                    <div key={index} className="border rounded-lg border-border/50 overflow-hidden">
                      <div className="flex justify-between items-center p-3 bg-muted/30">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full ${getBackgroundForScore(score.overall)} flex items-center justify-center text-lg`}>
                            {getEmojiForScore(score.overall)}
                          </div>
                          <div>
                            <p className="font-medium">{score.symbol} <span className="text-muted-foreground">• {score.date}</span></p>
                            <p className={`text-sm font-medium ${getColorForScore(score.overall)}`}>
                              Score: {score.overall}/100
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Details
                        </Button>
                      </div>
                      <div className="p-3 grid grid-cols-2 gap-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Plan Discipline</span>
                            <span className="font-medium">{score.planDiscipline}%</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-blue-500" 
                              style={{ width: `${score.planDiscipline}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Emotional Bias</span>
                            <span className="font-medium">{score.emotionalBias}%</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-purple-500" 
                              style={{ width: `${score.emotionalBias}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Reaction Quality</span>
                            <span className="font-medium">{score.reactionQuality}%</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-amber-500" 
                              style={{ width: `${score.reactionQuality}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Mindset Match</span>
                            <span className="font-medium">{score.mindsetMatch}%</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full bg-emerald-500" 
                              style={{ width: `${score.mindsetMatch}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}
