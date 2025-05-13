
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock,
  Compass,
  Gauge,
  MapPin,
  Maximize2,
  MessageSquare,
  Mic,
  PieChart,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  Sparkles,
  Star,
  Target,
  Thermometer,
  TrendingUp,
  TrendingDown,
  User,
  Zap,
  LayoutGrid,
} from "lucide-react";
import { 
  HoverCard, 
  HoverCardTrigger, 
  HoverCardContent 
} from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart, 
  Area,
  LineChart,
  Line,
  BarChart,
  Bar
} from "recharts";
import { Link } from "react-router-dom";

// Mock data for the dashboard modules
const edgeSummaryData = {
  technicalSharpness: 78,
  emotionalEdge: 65,
  disciplineScore: 83,
  insights: [
    "You hesitated 3 times yesterday — tap to review those trades",
    "Emotional stability improves during US session",
    "Checklist usage correlates with better win rate"
  ]
};

const readinessTrackerData = {
  strategyAlignment: 86,
  checklistUsage: 70,
  htfAlignment: 92,
  biasJournaling: 45,
  riskDiscipline: 89,
  alerts: [
    "Strategy A used without checklist 2x this week",
    "HTF alignment strong today - consider larger position size"
  ]
};

const mindsetData = {
  emotionalStability: 75,
  impulsiveness: 30,
  overtradingRisk: 20,
  currentState: "focused", // can be: calm, distracted, anxious, focused
  recommendations: [
    "Pre-session meditation completed",
    "Risk parameters set for the session",
    "Journal entry scheduled for end of day"
  ]
};

const rhythmMapData = [
  { time: "08:00", action: "Morning Journal", category: "journal", result: null },
  { time: "09:30", action: "Market Open", category: "market", result: null },
  { time: "10:15", action: "AAPL Trade", category: "trade", result: "win" },
  { time: "11:30", action: "TSLA Trade", category: "trade", result: "loss" },
  { time: "12:30", action: "Break", category: "rest", result: null },
  { time: "13:45", action: "MSFT Trade", category: "trade", result: "win" },
  { time: "14:30", action: "Chat with AI", category: "ai", result: null },
  { time: "15:30", action: "AMZN Trade", category: "trade", result: "win" },
  { time: "16:00", action: "Market Close", category: "market", result: null },
  { time: "16:30", action: "Trade Replay", category: "replay", result: null }
];

// Scatter plot data for Behavior vs Outcome
const behaviorOutcomeData = [
  { disciplineScore: 80, pnl: 450, emotion: "calm", date: "Mon" },
  { disciplineScore: 65, pnl: -200, emotion: "anxious", date: "Mon" },
  { disciplineScore: 90, pnl: 700, emotion: "focused", date: "Tue" },
  { disciplineScore: 75, pnl: 300, emotion: "calm", date: "Tue" },
  { disciplineScore: 40, pnl: -350, emotion: "distracted", date: "Wed" },
  { disciplineScore: 85, pnl: 600, emotion: "focused", date: "Wed" },
  { disciplineScore: 60, pnl: -150, emotion: "anxious", date: "Thu" },
  { disciplineScore: 95, pnl: 800, emotion: "focused", date: "Thu" },
  { disciplineScore: 70, pnl: 200, emotion: "calm", date: "Fri" },
  { disciplineScore: 50, pnl: -250, emotion: "distracted", date: "Fri" }
];

// Edge drift data
const edgeDriftData = {
  winRate: {
    current: 68,
    previous: 72,
    change: -4
  },
  confidence: {
    current: 85,
    previous: 80,
    change: 5
  },
  grading: {
    current: 78,
    previous: 75,
    change: 3
  },
  personalityFit: {
    current: 90,
    previous: 92,
    change: -2
  },
  recommendations: [
    "Retest Bull Flag pattern with lower position size",
    "Refine entry criteria for Opening Range plays",
    "Consider retiring Reversal setup - low win rate"
  ]
};

// AI performance scanner data
const performanceScannerData = {
  mistakeCategories: [
    { name: "Hesitation", count: 5, pctOfTotal: 42 },
    { name: "Early Exit", count: 3, pctOfTotal: 25 },
    { name: "FOMO Entry", count: 2, pctOfTotal: 16 },
    { name: "Other", count: 2, pctOfTotal: 17 }
  ],
  topCorrectables: [
    "Hesitating on valid A+ setups when all criteria met",
    "Taking profits too early on trend continuation plays",
    "Entering late after missing initial entry point"
  ],
  improvementTrend: [
    { week: "Week 1", mistakes: 15 },
    { week: "Week 2", mistakes: 12 },
    { week: "Week 3", mistakes: 10 },
    { week: "Week 4", mistakes: 7 }
  ]
};

const edgeAmplifierData = {
  dailyFocus: "Today, focus on OB setup only during NY session with 2.5+ R:R",
  setupOfDay: "Volume Breakout",
  timeframeRecommendation: "5-min chart with 15-min confirmation",
  avoidToday: "Reversal patterns in chop zones",
  marketCondition: "Trending on higher timeframes"
};

// Mini check-in data
const miniCheckinData = {
  recentEmotions: ["calm", "focused", "anxious", "focused", "distracted"],
  confidenceChecks: [4, 5, 3, 5, 4], // 1-5 scale
  aiObservations: [
    "3 days of low energy before London open – reduce complexity?",
    "Higher win rate when trading 2+ hours after market open",
    "Chart annotations increase win percentage by 15%"
  ]
};

type LucideIcon = React.ComponentType<React.SVGProps<SVGSVGElement> & {size?: number | string}>;

export default function Dashboard() {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  
  useEffect(() => {
    // Load dashboard data here from API in a real implementation
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      toast({
        title: "Dashboard Refreshed",
        description: "Latest metrics and AI insights updated.",
        duration: 3000,
      });
      setIsRefreshing(false);
    }, 1500);
  };

  const handleAiAssistantToggle = () => {
    setAiAssistantOpen(!aiAssistantOpen);
  };
  
  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "calm": return "bg-cyan-500/20 text-cyan-500";
      case "focused": return "bg-green-500/20 text-green-500";
      case "anxious": return "bg-amber-500/20 text-amber-500";
      case "distracted": return "bg-red-500/20 text-red-500";
      default: return "bg-blue-500/20 text-blue-500";
    }
  };
  
  const getActionColor = (category: string) => {
    switch (category) {
      case "journal": return "bg-purple-500/20 text-purple-500";
      case "trade": return "bg-blue-500/20 text-blue-500";
      case "market": return "bg-gray-500/20 text-gray-500";
      case "rest": return "bg-green-500/20 text-green-500";
      case "ai": return "bg-cyan-500/20 text-cyan-500";
      case "replay": return "bg-amber-500/20 text-amber-500";
      default: return "bg-gray-500/20 text-gray-500";
    }
  };
  
  const getResultColor = (result: string | null) => {
    switch (result) {
      case "win": return "bg-green-500/20 text-green-500";
      case "loss": return "bg-red-500/20 text-red-500";
      default: return "";
    }
  };

  // Helper components for reusability
  const GlassCard = ({ 
    className,
    children,
    neonAccent = false,
    ...props
  }: React.ComponentProps<typeof Card> & { neonAccent?: boolean }) => (
    <Card 
      className={cn(
        "backdrop-blur-md bg-black/40 border border-white/10",
        neonAccent && "shadow-[0_0_15px_rgba(0,255,255,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </Card>
  );

  const NeonButton = ({ 
    className,
    children,
    ...props
  }: React.ComponentProps<typeof Button>) => (
    <Button 
      className={cn(
        "bg-transparent backdrop-blur-sm border border-cyan-500/50 text-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.2)] hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:bg-cyan-950/30 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );

  const SectionTitle = ({ 
    icon: Icon,
    title, 
    className 
  }: { 
    icon: LucideIcon;
    title: string;
    className?: string;
  }) => (
    <div className={cn("flex items-center gap-2 text-lg font-semibold", className)}>
      <Icon className="w-5 h-5 text-cyan-400" />
      <span className="bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
        {title}
      </span>
    </div>
  );

  return (
    <div className="space-y-6 pb-10 relative">
      {/* Top header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Trader Performance Cockpit
          </h1>
          <p className="text-muted-foreground">
            Real-time metrics and AI insights for peak performance
          </p>
        </div>
        <Button 
          onClick={handleRefresh} 
          className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10" 
          disabled={isRefreshing}
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {/* First row: Edge Summary + Readiness Tracker */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* AI Daily Edge Summary */}
        <GlassCard className="lg:col-span-1 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              <span>AI Daily Edge Summary</span>
            </CardTitle>
            <CardDescription>Overall performance analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Technical Sharpness</span>
                  <span className="text-sm font-medium">{edgeSummaryData.technicalSharpness}%</span>
                </div>
                <Progress 
                  value={edgeSummaryData.technicalSharpness} 
                  className="h-1.5 bg-black/50"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Emotional Edge</span>
                  <span className="text-sm font-medium">{edgeSummaryData.emotionalEdge}%</span>
                </div>
                <Progress 
                  value={edgeSummaryData.emotionalEdge} 
                  className="h-1.5 bg-black/50" 
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Discipline Score</span>
                  <span className="text-sm font-medium">{edgeSummaryData.disciplineScore}%</span>
                </div>
                <Progress 
                  value={edgeSummaryData.disciplineScore} 
                  className="h-1.5 bg-black/50"  
                />
              </div>
            </div>
            
            {/* AI Insights */}
            <div className="space-y-2">
              {edgeSummaryData.insights.map((insight, idx) => (
                <div key={idx} className="flex gap-2 p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <Zap className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{insight}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <NeonButton size="sm" className="gap-1">
                <span>Full Analysis</span>
                <ChevronRight className="h-4 w-4" />
              </NeonButton>
            </div>
          </CardContent>
        </GlassCard>
        
        {/* Technical Readiness Tracker */}
        <GlassCard className="lg:col-span-2 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-cyan-400" />
              <span>Technical Readiness Tracker</span>
            </CardTitle>
            <CardDescription>Strategy alignment and preparedness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Strategy Alignment</span>
                    <span className="text-sm font-medium">{readinessTrackerData.strategyAlignment}%</span>
                  </div>
                  <Progress 
                    value={readinessTrackerData.strategyAlignment} 
                    className="h-2 bg-black/50" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Checklist Usage</span>
                    <span className="text-sm font-medium">{readinessTrackerData.checklistUsage}%</span>
                  </div>
                  <Progress 
                    value={readinessTrackerData.checklistUsage} 
                    className="h-2 bg-black/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">HTF Alignment</span>
                    <span className="text-sm font-medium">{readinessTrackerData.htfAlignment}%</span>
                  </div>
                  <Progress 
                    value={readinessTrackerData.htfAlignment} 
                    className="h-2 bg-black/50"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bias Journaling</span>
                    <span className="text-sm font-medium">{readinessTrackerData.biasJournaling}%</span>
                  </div>
                  <Progress 
                    value={readinessTrackerData.biasJournaling} 
                    className="h-2 bg-black/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Risk Discipline</span>
                    <span className="text-sm font-medium">{readinessTrackerData.riskDiscipline}%</span>
                  </div>
                  <Progress 
                    value={readinessTrackerData.riskDiscipline} 
                    className="h-2 bg-black/50"
                  />
                </div>
                
                <div className="space-y-2 pt-2">
                  {readinessTrackerData.alerts.map((alert, idx) => (
                    <div key={idx} className="flex gap-2 text-sm">
                      <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{alert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
      
      {/* Second row: Mindset Monitor + Daily Rhythm Map */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Mindset + Discipline Monitor */}
        <GlassCard className="lg:col-span-1" neonAccent>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              <span>Mindset + Discipline Monitor</span>
            </CardTitle>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge 
                className={cn(
                  "capitalize shadow-sm",
                  getEmotionColor(mindsetData.currentState)
                )}
              >
                {mindsetData.currentState}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Emotional Stability</span>
                <span className="text-sm font-medium">{mindsetData.emotionalStability}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/50 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  style={{ width: `${mindsetData.emotionalStability}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Impulsiveness Risk</span>
                <span className="text-sm font-medium">{mindsetData.impulsiveness}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/50 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full"
                  style={{ width: `${mindsetData.impulsiveness}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Overtrading Risk</span>
                <span className="text-sm font-medium">{mindsetData.overtradingRisk}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/50 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full"
                  style={{ width: `${mindsetData.overtradingRisk}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-md p-3 space-y-2">
              <h4 className="text-sm font-medium text-cyan-400">Recommendations</h4>
              {mindsetData.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <Check className="h-3.5 w-3.5 text-green-400" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Link to="/playbook">
                <NeonButton size="sm" className="gap-1">
                  <span>Full Mental Toolkit</span>
                  <ChevronRight className="h-4 w-4" />
                </NeonButton>
              </Link>
            </div>
          </CardContent>
        </GlassCard>
        
        {/* Daily Rhythm Map */}
        <GlassCard className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>Daily Rhythm Map</span>
            </CardTitle>
            <CardDescription>Your trading day timeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-4 left-4 bottom-4 w-[1px] bg-white/10"></div>
              
              <div className="space-y-3 pl-9">
                {rhythmMapData.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Time node */}
                    <div className="absolute -left-9 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-white/30 bg-black/80 flex items-center justify-center">
                      <div className={cn("w-2 h-2 rounded-full", 
                        item.result === "win" ? "bg-green-400" : 
                        item.result === "loss" ? "bg-red-400" : 
                        "bg-white/30"
                      )}></div>
                    </div>
                    
                    {/* Time label */}
                    <div className="absolute -left-[4.5rem] top-1/2 -translate-y-1/2 w-8 text-right">
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                    
                    {/* Content */}
                    <div className={cn(
                      "p-2 rounded-md cursor-pointer transition-all hover:bg-white/10",
                      item.result === "win" ? "border-l-2 border-l-green-500" :
                      item.result === "loss" ? "border-l-2 border-l-red-500" :
                      "border-l-2 border-l-transparent"
                    )}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getActionColor(item.category)}>
                            {item.category}
                          </Badge>
                          <span className="font-medium text-sm">{item.action}</span>
                        </div>
                        {item.result && (
                          <Badge className={getResultColor(item.result)}>
                            {item.result}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
      
      {/* Third row: Behavior vs Outcome + Edge Drift + AI Scanner */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Behavior vs. Outcome Correlator */}
        <GlassCard className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-cyan-400" />
              <span>Behavior vs. Outcome</span>
            </CardTitle>
            <CardDescription>Discipline correlation with results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full">
              <ChartContainer
                config={{
                  focused: {
                    color: "#22c55e" // Green
                  },
                  calm: {
                    color: "#3b82f6" // Blue
                  },
                  anxious: {
                    color: "#f59e0b" // Amber
                  },
                  distracted: {
                    color: "#ef4444" // Red
                  }
                }}
              >
                <ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    type="number" 
                    dataKey="disciplineScore" 
                    name="Discipline" 
                    tick={{ fill: "rgba(255,255,255,0.5)" }}
                    stroke="rgba(255,255,255,0.2)"
                    label={{ 
                      value: 'Discipline Score', 
                      position: 'bottom',
                      fill: "rgba(255,255,255,0.5)",
                      fontSize: 12
                    }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="pnl" 
                    name="P&L" 
                    unit="$" 
                    tick={{ fill: "rgba(255,255,255,0.5)" }}
                    stroke="rgba(255,255,255,0.2)"
                  />
                  <ChartTooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                  <Scatter 
                    data={behaviorOutcomeData} 
                    fill="#8884d8" 
                  >
                    {behaviorOutcomeData.map((entry, index) => {
                      let color;
                      switch (entry.emotion) {
                        case "focused": color = "#22c55e"; break;
                        case "calm": color = "#3b82f6"; break;
                        case "anxious": color = "#f59e0b"; break;
                        case "distracted": color = "#ef4444"; break;
                        default: color = "#8884d8";
                      }
                      return (
                        <g key={index}>
                          <circle
                            cx={0}
                            cy={0}
                            r={6}
                            fill={color}
                            fillOpacity={0.7}
                            className={entry.emotion}
                          />
                          <text 
                            x={10} 
                            y={10} 
                            textAnchor="start" 
                            fill="rgba(255,255,255,0.6)" 
                            fontSize={10}
                          >
                            {entry.date}
                          </text>
                        </g>
                      );
                    })}
                  </Scatter>
                </ScatterChart>
              </ChartContainer>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {["focused", "calm", "anxious", "distracted"].map((emotion) => (
                <div key={emotion} className="flex items-center gap-1">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    emotion === "focused" ? "bg-green-500" :
                    emotion === "calm" ? "bg-blue-500" :
                    emotion === "anxious" ? "bg-amber-500" :
                    "bg-red-500"
                  )}></div>
                  <span className="text-xs capitalize">{emotion}</span>
                </div>
              ))}
            </div>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="link" size="sm" className="mt-1 text-cyan-400">
                    Insight: Better outcomes correlated with higher discipline scores
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-[200px] text-xs">
                    Your win rate is 78% when discipline score is above 80, compared to 35% when below 60.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </GlassCard>
        
        {/* Edge Drift Alert */}
        <GlassCard className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Edge Drift Alert</span>
            </CardTitle>
            <CardDescription>Strategy performance monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-md bg-black/20">
                <div className="text-xs text-muted-foreground">Win Rate</div>
                <div className="text-lg font-bold">{edgeDriftData.winRate.current}%</div>
                <div className={cn(
                  "text-xs flex items-center",
                  edgeDriftData.winRate.change > 0 ? "text-green-400" : "text-red-400"
                )}>
                  {edgeDriftData.winRate.change > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{Math.abs(edgeDriftData.winRate.change)}% change</span>
                </div>
              </div>
              
              <div className="p-2 rounded-md bg-black/20">
                <div className="text-xs text-muted-foreground">Confidence</div>
                <div className="text-lg font-bold">{edgeDriftData.confidence.current}%</div>
                <div className={cn(
                  "text-xs flex items-center",
                  edgeDriftData.confidence.change > 0 ? "text-green-400" : "text-red-400"
                )}>
                  {edgeDriftData.confidence.change > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{Math.abs(edgeDriftData.confidence.change)}% change</span>
                </div>
              </div>
              
              <div className="p-2 rounded-md bg-black/20">
                <div className="text-xs text-muted-foreground">Grading</div>
                <div className="text-lg font-bold">{edgeDriftData.grading.current}%</div>
                <div className={cn(
                  "text-xs flex items-center",
                  edgeDriftData.grading.change > 0 ? "text-green-400" : "text-red-400"
                )}>
                  {edgeDriftData.grading.change > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{Math.abs(edgeDriftData.grading.change)}% change</span>
                </div>
              </div>
              
              <div className="p-2 rounded-md bg-black/20">
                <div className="text-xs text-muted-foreground">Personality Fit</div>
                <div className="text-lg font-bold">{edgeDriftData.personalityFit.current}%</div>
                <div className={cn(
                  "text-xs flex items-center",
                  edgeDriftData.personalityFit.change > 0 ? "text-green-400" : "text-red-400"
                )}>
                  {edgeDriftData.personalityFit.change > 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span>{Math.abs(edgeDriftData.personalityFit.change)}% change</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-amber-400">Recommendations:</h4>
              {edgeDriftData.recommendations.map((rec, idx) => (
                <div key={idx} className="flex gap-2 items-start p-1.5 rounded hover:bg-white/5 transition-colors">
                  <ArrowRight className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs">{rec}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>
        
        {/* AI Performance Scanner */}
        <GlassCard className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span>AI Performance Scanner</span>
            </CardTitle>
            <CardDescription>Trade execution analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Mistake Categories</h4>
              <div className="space-y-2">
                {performanceScannerData.mistakeCategories.map((cat, idx) => (
                  <div key={idx} className="w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{cat.name}</span>
                      <span>{cat.count} occurrences ({cat.pctOfTotal}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-black/50 overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 rounded-full" 
                        style={{ width: `${cat.pctOfTotal}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-cyan-400">Top Correctables:</h4>
              {performanceScannerData.topCorrectables.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-start p-1.5 rounded hover:bg-white/5 transition-colors">
                  <Check className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs">{item}</span>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Improvement Trend</h4>
              <div className="h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceScannerData.improvementTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="week" 
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                    />
                    <YAxis 
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mistakes" 
                      stroke="#06b6d4" 
                      strokeWidth={2} 
                      dot={{ stroke: "#06b6d4", strokeWidth: 2, fill: "#06b6d4" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </GlassCard>
      </div>
      
      {/* Fourth row: Edge Amplifier + Smart Integration + Mini Check-ins */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Edge Amplifier */}
        <GlassCard className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              <span>Edge Amplifier</span>
            </CardTitle>
            <CardDescription>Daily focus recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-4 rounded-md border border-cyan-500/20">
              <h3 className="font-medium text-cyan-400 mb-2">Daily Focus:</h3>
              <p className="text-sm">{edgeAmplifierData.dailyFocus}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-2 rounded-md bg-black/20">
                <div className="text-xs text-muted-foreground">Setup of the Day</div>
                <div className="font-medium text-sm">{edgeAmplifierData.setupOfDay}</div>
              </div>
              
              <div className="p-2 rounded-md bg-black/20">
                <div className="text-xs text-muted-foreground">Market Condition</div>
                <div className="font-medium text-sm">{edgeAmplifierData.marketCondition}</div>
              </div>
              
              <div className="p-2 rounded-md bg-black/20">
                <div className="text-xs text-muted-foreground">Timeframe</div>
                <div className="font-medium text-sm">{edgeAmplifierData.timeframeRecommendation}</div>
              </div>
              
              <div className="p-2 rounded-md bg-black/20">
                <div className="text-xs text-muted-foreground">Avoid Today</div>
                <div className="font-medium text-sm">{edgeAmplifierData.avoidToday}</div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <NeonButton size="sm" className="gap-1">
                <span>Customize Focus</span>
                <ChevronRight className="h-4 w-4" />
              </NeonButton>
            </div>
          </CardContent>
        </GlassCard>
        
        {/* Smart Integration Bar */}
        <GlassCard className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-cyan-400" />
              <span>Smart Integration Bar</span>
            </CardTitle>
            <CardDescription>Quick actions for your workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <NeonButton className="justify-start gap-2">
                <RotateCcw className="h-4 w-4" />
                <span>Replay Last Trade</span>
              </NeonButton>
              
              <NeonButton className="justify-start gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Missed Trade</span>
              </NeonButton>
              
              <NeonButton className="justify-start gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Open Journal Entry</span>
              </NeonButton>
              
              <NeonButton className="justify-start gap-2">
                <Brain className="h-4 w-4" />
                <span>AI Therapy Feedback</span>
              </NeonButton>
              
              <NeonButton className="justify-start gap-2">
                <Clock className="h-4 w-4" />
                <span>Strategy Version History</span>
              </NeonButton>
              
              <NeonButton className="justify-start gap-2">
                <Settings className="h-4 w-4" />
                <span>Configure Dashboard</span>
              </NeonButton>
            </div>
            
            <div className="flex gap-3 p-3 bg-cyan-900/20 rounded-md border border-cyan-500/20 items-center">
              <div className="h-8 w-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm">Need to quickly analyze that last TSLA trade?</p>
                <p className="text-xs text-cyan-400 mt-1 cursor-pointer hover:underline">Ask me to do that for you</p>
              </div>
            </div>
          </CardContent>
        </GlassCard>
        
        {/* Mini Check-ins */}
        <GlassCard className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-cyan-400" />
              <span>Mini Check-ins</span>
            </CardTitle>
            <CardDescription>Emotional and performance pulse</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Recent Emotions</h4>
              <div className="flex flex-wrap gap-2">
                {miniCheckinData.recentEmotions.map((emotion, idx) => (
                  <Badge key={idx} className={cn(
                    "capitalize",
                    getEmotionColor(emotion)
                  )}>
                    {emotion}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="text-sm font-medium">Confidence Trend</h4>
                <span className="text-xs text-muted-foreground">Last 5 sessions</span>
              </div>
              <div className="h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={miniCheckinData.confidenceChecks.map((value, index) => ({
                    day: index + 1,
                    value
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                    />
                    <YAxis 
                      domain={[0, 5]}
                      tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                      axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="rgba(6, 182, 212, 0.7)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-cyan-400">AI Observations:</h4>
              {miniCheckinData.aiObservations.map((obs, idx) => (
                <div key={idx} className="flex gap-2 items-start p-1.5 rounded hover:bg-white/5 transition-colors">
                  <Zap className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs">{obs}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1 border-white/10">
                <span>Add Note</span>
                <Plus className="h-3 w-3" />
              </Button>
              <NeonButton size="sm" className="gap-1">
                <span>Full History</span>
                <ChevronRight className="h-4 w-4" />
              </NeonButton>
            </div>
          </CardContent>
        </GlassCard>
      </div>
      
      {/* Floating AI Button */}
      <Button
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 flex items-center justify-center p-0"
        onClick={handleAiAssistantToggle}
      >
        <Mic className="h-5 w-5" />
      </Button>
    </div>
  );
}
