
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Brain,
  AlertTriangle,
  Clock,
  FileText,
  Calendar,
  Target,
  LineChart as LineChartIcon,
  BarChart2,
  Lightbulb,
  Dna,
  Network,
  Microscope,
  BookOpen,
  RefreshCcw,
  Search,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  FlaskConical,
  Shield,
} from "lucide-react";

// Mock data for AI Edge Timeline
const timelineData = [
  { 
    week: "Week 12", 
    date: "May 3-7", 
    entry: "OB strategy win rate consistently above 70%",
    type: "positive",
    details: "Execution was precise with proper risk management across all sessions"
  },
  { 
    week: "Week 13", 
    date: "May 10-14", 
    entry: "Introduced FVG strategy with mixed results",
    type: "neutral",
    details: "Initial tests show promise during London session but underperform in NY"
  },
  { 
    week: "Week 14", 
    date: "May 17-21", 
    entry: "OB setup win rate dropped post-loss streak",
    type: "negative",
    details: "Psychological impact from Monday losses affected decision-making all week"
  },
  { 
    week: "Week 15", 
    date: "May 24-28", 
    entry: "Strategy tweaked → improved RR",
    type: "positive",
    details: "Added EQH confluence filter to OB setup, RR improved from 1.7 to 2.3"
  },
  { 
    week: "Week 16", 
    date: "May 31-Jun 4", 
    entry: "Checklist discipline: 4/5 trades executed with plan",
    type: "positive",
    details: "Pre-session ritual implementation showing positive correlation with trade quality"
  },
];

// Mock data for Trader DNA Map
const traderDnaData = {
  preferredSetups: [
    { name: "OB Sweep", strength: 87, evolution: "improving" },
    { name: "Breaker Blocks", strength: 76, evolution: "stable" },
    { name: "FVG Tap", strength: 62, evolution: "declining" },
  ],
  strengthZones: [
    "High patience during volatility",
    "Rule-based entry execution",
    "Morning preparation ritual",
    "Risk management discipline"
  ],
  weakSpots: [
    "Exit too early on winners",
    "FOMO on news days",
    "Overtrading past 2PM",
    "Position sizing inconsistency"
  ],
  styleShift: {
    from: "Swing",
    to: "Tactical Scalper",
    timeframe: "Last 3 months"
  },
  aiTraits: [
    "Best sessions after 3-step premarket ritual",
    "Most profitable on Tuesday/Wednesday",
    "Strong performance with under 5 trades/day",
    "Risk tolerance increases after 3 consecutive wins"
  ]
};

// Mock data for AI Behavioral Correlator
const behaviorCorrelationData = [
  { behavior: "Hesitation", outcome: -63, trades: 27, impact: "Missed optimal entries" },
  { behavior: "Journaling", outcome: 22, trades: 45, impact: "Improved pattern recognition" },
  { behavior: "Post-loss trading", outcome: -71, trades: 18, impact: "Violated trading rules" },
  { behavior: "Morning meditation", outcome: 31, trades: 34, impact: "Reduced impulsivity" },
  { behavior: "Screen time > 6hrs", outcome: -28, trades: 22, impact: "Decision fatigue" },
  { behavior: "Weekend review", outcome: 42, trades: 38, impact: "Better preparation" },
];

// Mock data for Edge Amplifier Grid
const edgeAmplifierData = [
  { 
    strategy: "OB Strategy", 
    winRate: 73, 
    avgRR: 2.1, 
    trend: "strong", 
    status: "refined",
    suggestion: "Consider increasing position size by 15% on this high-probability setup"
  },
  { 
    strategy: "FVG", 
    winRate: 58, 
    avgRR: 1.7, 
    trend: "declining", 
    status: "overused",
    suggestion: "Trading frequency exceeds optimal threshold, reduce by 30%"
  },
  { 
    strategy: "Breaker", 
    winRate: 65, 
    avgRR: 1.9, 
    trend: "conditional", 
    status: "situational",
    suggestion: "Profitable only during London session, restrict to 2AM-5AM EST"
  },
  { 
    strategy: "Liquidity Sweep", 
    winRate: 51, 
    avgRR: 2.4, 
    trend: "neutral", 
    status: "experimental",
    suggestion: "High RR but inconsistent, add SMC confluence filter"
  },
  { 
    strategy: "EQH Reversal", 
    winRate: 42, 
    avgRR: 1.3, 
    trend: "weak", 
    status: "broken",
    suggestion: "Logic fundamentally flawed, recommend abandoning this setup"
  },
];

// Mock data for Mistake Intelligence
const mistakeData = {
  categories: [
    { name: "Early Entries", count: 12, impact: -1.8 },
    { name: "Late Exits", count: 9, impact: -2.2 },
    { name: "Position Sizing", count: 7, impact: -1.5 },
    { name: "Stop Placement", count: 5, impact: -2.7 },
    { name: "FOMO Entries", count: 4, impact: -3.1 },
  ],
  rootCauses: [
    "Overconfidence after winning streak",
    "Trading during emotional tilt",
    "Morning rush without proper analysis",
    "Deviation from trading plan"
  ],
  mitigationSteps: [
    "Implement mandatory 2-minute entry validation",
    "Use checklist-based confirmation process",
    "Add time-buffer between signal and execution",
    "Review journal before each session"
  ]
};

// Mock data for AI Forecast
const forecastData = [
  { 
    metric: "Projected Monthly R", 
    value: "6.5R", 
    condition: "If current edge maintains with OB strategy", 
    confidence: 78
  },
  { 
    metric: "Win Rate Projection", 
    value: "68%", 
    condition: "Based on trailing 30-day execution quality", 
    confidence: 82
  },
  { 
    metric: "Rule Violation Impact", 
    value: "+2.3R/week", 
    condition: "If violations reduced by 15%", 
    confidence: 71
  },
  { 
    metric: "Optimal Daily Trades", 
    value: "3-5", 
    condition: "For maximum Sharpe ratio", 
    confidence: 88
  }
];

// Mock setup feedback loop data
const setupFeedbackData = [
  {
    setupName: "OB Strategy",
    changes: [
      { 
        date: "Apr 15", 
        change: "Added EQH confluence", 
        impact: { winRate: { before: 61, after: 74 }, rr: { before: 1.8, after: 2.2 } } 
      },
      { 
        date: "May 2", 
        change: "Refined stop placement", 
        impact: { winRate: { before: 74, after: 71 }, rr: { before: 2.2, after: 2.6 } } 
      }
    ]
  },
  {
    setupName: "Breaker Strategy",
    changes: [
      { 
        date: "Mar 28", 
        change: "Added session filter", 
        impact: { winRate: { before: 52, after: 67 }, rr: { before: 1.6, after: 1.8 } } 
      }
    ]
  }
];

// AI Therapist suggestions
const therapistSuggestions = [
  "You're consistently more profitable after morning meditation",
  "Friday sessions show higher anxiety - consider reducing position size or skipping",
  "Adding pre-session affirmations improved decision quality by 22%",
  "Recovery after losses takes approximately 2.3 trades - implement mental reset protocol",
  "Journal entries mentioning 'patience' correlate with 31% higher win rate",
  "Screen breaks every 90 minutes improved late-day performance by 18%"
];

export function MetaAnalyticsPanel() {
  const [activeTab, setActiveTab] = useState("edge-timeline");
  const [aiMode, setAiMode] = useState("tactical");
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Brain className="mr-2 h-5 w-5" />
              AI Analytics
            </CardTitle>
            <CardDescription>
              Advanced edge intelligence, behavioral analysis, and performance optimization
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue={aiMode} onValueChange={setAiMode}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="AI Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tactical">
                  <div className="flex items-center">
                    <Target className="mr-2 h-4 w-4" />
                    <span>Tactical Mode</span>
                  </div>
                </SelectItem>
                <SelectItem value="psychological">
                  <div className="flex items-center">
                    <Brain className="mr-2 h-4 w-4" />
                    <span>Psychological Mode</span>
                  </div>
                </SelectItem>
                <SelectItem value="macro">
                  <div className="flex items-center">
                    <LineChartIcon className="mr-2 h-4 w-4" />
                    <span>Macro Mode</span>
                  </div>
                </SelectItem>
                <SelectItem value="learning">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span>Learning Mode</span>
                  </div>
                </SelectItem>
                <SelectItem value="shadow">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Shadow Mode</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="px-3 py-1">AI Powered</Badge>
          </div>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="edge-timeline" className="w-full" onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full h-auto justify-start flex-wrap">
            <TabsTrigger value="edge-timeline" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Clock className="mr-1 h-4 w-4" />
              Edge Timeline
            </TabsTrigger>
            <TabsTrigger value="trader-dna" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Dna className="mr-1 h-4 w-4" />
              Trader DNA
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Network className="mr-1 h-4 w-4" />
              Behavioral Correlator
            </TabsTrigger>
            <TabsTrigger value="edge-amplifier" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Microscope className="mr-1 h-4 w-4" />
              Edge Amplifier
            </TabsTrigger>
            <TabsTrigger value="review-summary" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="mr-1 h-4 w-4" />
              Trade Review
            </TabsTrigger>
            <TabsTrigger value="feedback-loop" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <RefreshCcw className="mr-1 h-4 w-4" />
              Feedback Loop
            </TabsTrigger>
            <TabsTrigger value="mistake-intelligence" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Search className="mr-1 h-4 w-4" />
              Mistake Intelligence
            </TabsTrigger>
            <TabsTrigger value="forecast" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <LineChartIcon className="mr-1 h-4 w-4" />
              AI Forecast
            </TabsTrigger>
            <TabsTrigger value="therapist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquare className="mr-1 h-4 w-4" />
              Trade Therapist
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-6">
          {/* AI Edge Timeline */}
          <TabsContent value="edge-timeline" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">AI Edge Timeline</h3>
                <p className="text-sm text-muted-foreground">
                  Performance changes, behavioral patterns, and feedback loops over time
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Filter Period
              </Button>
            </div>
            
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-4 min-w-max">
                {timelineData.map((item, index) => (
                  <Card key={index} className={`w-[300px] flex-shrink-0 border ${
                    item.type === 'positive' ? 'border-l-4 border-l-green-500' : 
                    item.type === 'negative' ? 'border-l-4 border-l-red-500' : 
                    'border-l-4 border-l-yellow-500'
                  }`}>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{item.week}</Badge>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="font-medium">{item.entry}</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.details}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-center mt-4">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((dot) => (
                  <span 
                    key={dot} 
                    className={`block rounded-full h-2 w-2 ${dot === 0 ? 'bg-primary' : 'bg-muted'}`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-100 rounded-full p-1.5">
                  <Lightbulb className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium">AI Pattern Detection:</h4>
                  <p className="text-sm text-muted-foreground">
                    Strategy adjustments following losing periods have resulted in 23% higher subsequent win rates. Consider formalizing your post-drawdown review process.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Trader DNA Map */}
          <TabsContent value="trader-dna" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Trader DNA Map</h3>
                <p className="text-sm text-muted-foreground">
                  Dynamic visualization of your psychological and technical identity
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Preferred Setups */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Preferred Setups</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    {traderDnaData.preferredSetups.map((setup, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{setup.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{setup.strength}%</span>
                            {setup.evolution === 'improving' && (
                              <ArrowUp className="h-4 w-4 text-green-500" />
                            )}
                            {setup.evolution === 'declining' && (
                              <ArrowDown className="h-4 w-4 text-red-500" />
                            )}
                            {setup.evolution === 'stable' && (
                              <ArrowRight className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </div>
                        <Progress value={setup.strength} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Strength Zones */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Strength Zones</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2">
                    {traderDnaData.strengthZones.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Weak Spots */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Weak Spots</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2">
                    {traderDnaData.weakSpots.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Style Shift & AI Traits */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">Style Evolution & AI-Detected Traits</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{traderDnaData.styleShift.from}</Badge>
                      <ArrowRight className="h-4 w-4" />
                      <Badge>{traderDnaData.styleShift.to}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Evolving over {traderDnaData.styleShift.timeframe}</p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h4 className="font-medium mb-2">AI-Detected Traits</h4>
                    <ul className="space-y-2">
                      {traderDnaData.aiTraits.map((trait, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-100 rounded-full p-1.5">
                  <Brain className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium">AI Identity Analysis:</h4>
                  <p className="text-sm text-muted-foreground">
                    Your trader DNA shows strong rule-based execution but emotional challenges with exits. Consider implementing mechanical exit rules to offset psychological tendencies.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Behavioral Correlator */}
          <TabsContent value="behavioral" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Behavioral Correlator</h3>
                <p className="text-sm text-muted-foreground">
                  Mapping behaviors and habits to trading outcomes
                </p>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={behaviorCorrelationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[-100, 100]} />
                  <YAxis type="category" dataKey="behavior" width={120} />
                  <Tooltip 
                    formatter={(value, name, props) => {
                      const item = behaviorCorrelationData.find(d => d.behavior === props.payload.behavior);
                      return [`${value}% impact (${item?.trades} trades)`, item?.behavior];
                    }} 
                  />
                  <Bar 
                    dataKey="outcome" 
                    fill={(data) => data.outcome > 0 ? "#10b981" : "#ef4444"} 
                    radius={[4, 4, 4, 4]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {behaviorCorrelationData.map((item, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md border ${
                    item.outcome > 0 ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 
                    'border-red-200 bg-red-50 dark:bg-red-900/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.behavior}</span>
                    <Badge className={item.outcome > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {item.outcome > 0 ? '+' : ''}{item.outcome}%
                    </Badge>
                  </div>
                  <p className="text-sm mt-1">{item.impact}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-amber-100 rounded-full p-1.5">
                  <AlertTriangle className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <h4 className="font-medium">Behavioral Warning:</h4>
                  <p className="text-sm text-muted-foreground">
                    Current behavior patterns mirror your worst trading week from March. Post-loss trading has led to a 71% rule violation rate historically.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Edge Amplifier */}
          <TabsContent value="edge-amplifier" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Edge Amplifier Grid</h3>
                <p className="text-sm text-muted-foreground">
                  Smart strategy insights based on dynamic performance data
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {edgeAmplifierData.map((item, index) => {
                let badgeColor = "";
                let badgeText = "";
                let badgeIcon = null;
                
                switch(item.status) {
                  case "refined":
                    badgeColor = "bg-green-100 text-green-800";
                    badgeText = "Refined Edge";
                    badgeIcon = <CheckCircle className="h-3.5 w-3.5 mr-1" />;
                    break;
                  case "overused":
                    badgeColor = "bg-amber-100 text-amber-800";
                    badgeText = "Overused";
                    badgeIcon = <AlertTriangle className="h-3.5 w-3.5 mr-1" />;
                    break;
                  case "broken":
                    badgeColor = "bg-red-100 text-red-800";
                    badgeText = "Broken Logic";
                    badgeIcon = <XCircle className="h-3.5 w-3.5 mr-1" />;
                    break;
                  case "experimental":
                    badgeColor = "bg-purple-100 text-purple-800";
                    badgeText = "Experimental";
                    badgeIcon = <FlaskConical className="h-3.5 w-3.5 mr-1" />;
                    break;
                  default:
                    badgeColor = "bg-blue-100 text-blue-800";
                    badgeText = "Situational";
                    badgeIcon = <Clock className="h-3.5 w-3.5 mr-1" />;
                }
                
                return (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{item.strategy}</CardTitle>
                        <Badge className={badgeColor}>
                          <div className="flex items-center">
                            {badgeIcon}
                            {badgeText}
                          </div>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Win Rate</p>
                          <p className="text-xl font-semibold">{item.winRate}%</p>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Avg RR</p>
                          <p className="text-xl font-semibold">{item.avgRR}R</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 rounded-md">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-blue-700 mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{item.suggestion}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          {/* AI Trade Review Summary */}
          <TabsContent value="review-summary" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">AI Trade Review Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Auto-generated reviews in your own trading voice
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Weekly
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  Monthly
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Week of May 24 - May 28</CardTitle>
                  <Badge>21 Trades</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <p className="italic text-muted-foreground">
                    "Tuesday's OB trades were top-performing this week with an average RR of 2.3. I saw a pattern of strong execution when I followed my morning ritual and did proper market review. Thursday, however, showed emotional instability in my trading decisions – likely due to the unexpected Fed news. I need to implement my breathwork routine before the session when high-impact news is scheduled."
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    <div className="bg-muted p-2 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                      <p className="text-lg font-semibold">68%</p>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Avg RR</p>
                      <p className="text-lg font-semibold">1.9R</p>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Net</p>
                      <p className="text-lg font-semibold text-green-600">+12.7R</p>
                    </div>
                    <div className="bg-muted p-2 rounded-md text-center">
                      <p className="text-xs text-muted-foreground">Grade</p>
                      <p className="text-lg font-semibold">A-</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h4 className="font-medium mb-3">Top Mistakes This Week</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-50">Early Entry</Badge>
                        <span className="text-sm text-muted-foreground">4 occurrences</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-50">Overtrading</Badge>
                        <span className="text-sm text-muted-foreground">3 occurrences</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-red-50">Hesitation</Badge>
                        <span className="text-sm text-muted-foreground">2 occurrences</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-100 rounded-full p-1.5">
                  <Target className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium">Weekly Focus Areas:</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on this week's performance, focus on (1) implementing pre-session routine consistently, (2) reducing overtrading during news events, and (3) reviewing early entries to identify pattern triggers.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Setup Feedback Loop */}
          <TabsContent value="feedback-loop" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Setup Feedback Loop Engine</h3>
                <p className="text-sm text-muted-foreground">
                  Track strategy tweaks over time and their impact
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {setupFeedbackData.map((setup, setupIndex) => (
                <Card key={setupIndex}>
                  <CardHeader className="p-4 pb-3">
                    <CardTitle className="text-base">{setup.setupName}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-4">
                      {setup.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="rounded-lg border p-3">
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant="outline">{change.date}</Badge>
                            <span className="text-sm font-medium">{change.change}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Win Rate Impact</p>
                              <div className="flex items-center">
                                <span className="text-sm">{change.impact.winRate.before}%</span>
                                <ArrowRight className="h-4 w-4 mx-2" />
                                <span className={`text-sm font-medium ${
                                  change.impact.winRate.after > change.impact.winRate.before 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                                }`}>
                                  {change.impact.winRate.after}%
                                </span>
                                <span className={`ml-1 text-xs ${
                                  change.impact.winRate.after > change.impact.winRate.before 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                                }`}>
                                  {change.impact.winRate.after > change.impact.winRate.before ? '+' : ''}
                                  {change.impact.winRate.after - change.impact.winRate.before}%
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">RR Impact</p>
                              <div className="flex items-center">
                                <span className="text-sm">{change.impact.rr.before}R</span>
                                <ArrowRight className="h-4 w-4 mx-2" />
                                <span className={`text-sm font-medium ${
                                  change.impact.rr.after > change.impact.rr.before 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                                }`}>
                                  {change.impact.rr.after}R
                                </span>
                                <span className={`ml-1 text-xs ${
                                  change.impact.rr.after > change.impact.rr.before 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                                }`}>
                                  {change.impact.rr.after > change.impact.rr.before ? '+' : ''}
                                  {(change.impact.rr.after - change.impact.rr.before).toFixed(1)}R
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-7">Accept</Button>
                              <Button variant="ghost" size="sm" className="h-7">Reject</Button>
                              <Button variant="ghost" size="sm" className="h-7">A/B Test</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-green-100 rounded-full p-1.5">
                  <Lightbulb className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <h4 className="font-medium">AI Suggestion:</h4>
                  <p className="text-sm text-muted-foreground">
                    The EQH confluence filter has significantly improved your OB strategy performance. Consider applying similar structure-based filters to your other setups to achieve comparable improvements.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Mistake Intelligence */}
          <TabsContent value="mistake-intelligence" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Mistake Intelligence Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Auto-cluster and analyze frequent trading mistakes
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mistakeData.categories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="count" name="Occurrences" fill="#8884d8" />
                      <Bar yAxisId="right" dataKey="impact" name="Avg R Impact" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Root Causes</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="space-y-2">
                      {mistakeData.rootCauses.map((cause, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-0.5 bg-red-100 rounded-full p-1">
                            <AlertTriangle className="h-3 w-3 text-red-700" />
                          </div>
                          <span className="text-sm">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">Mitigation Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <ul className="space-y-2">
                      {mistakeData.mitigationSteps.map((step, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-0.5 bg-green-100 rounded-full p-1">
                            <CheckCircle className="h-3 w-3 text-green-700" />
                          </div>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <div className="mt-0.5 bg-blue-100 rounded-full p-1.5">
                  <Brain className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <h4 className="font-medium">AI Analysis:</h4>
                  <p className="text-sm text-muted-foreground">
                    April entries skewed early by an average of 12.3 seconds compared to optimal entry points. Consider implementing the 2-minute checklist validation before execution to reduce impulsive entries.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* AI Forecast */}
          <TabsContent value="forecast" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">AI Forecast & Edge Projection</h3>
                <p className="text-sm text-muted-foreground">
                  AI estimates based on current patterns and behavior
                </p>
              </div>
              <Badge variant="outline">
                <div className="flex items-center gap-1">
                  <Brain className="h-3.5 w-3.5" />
                  <span>Predictive Model v2.1</span>
                </div>
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {forecastData.map((item, index) => (
                <Card key={index} className="border-blue-100">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base">{item.metric}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold">{item.value}</span>
                      <Badge variant="outline" className="ml-2">
                        {item.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.condition}
                    </p>
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="text-xs">
                        <LineChartIcon className="h-3.5 w-3.5 mr-1" />
                        See Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base">Strategic Optimization Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border bg-green-50 dark:bg-green-900/20 border-green-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">OB Strategy Position Sizing</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Increasing OB strategy allocation by 15% could yield an additional 1.2R per week based on historical performance.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border bg-red-50 dark:bg-red-900/20 border-red-100">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Reduce Post-News Trading</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Post-news trades have 42% lower win rate. Waiting 30+ minutes after news events could save approximately 1.8R per week.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* AI Trade Therapist */}
          <TabsContent value="therapist" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">AI Trade Therapist</h3>
                <p className="text-sm text-muted-foreground">
                  LLM-based behavioral feedback and psychological insights
                </p>
              </div>
              <Badge>Private & Confidential</Badge>
            </div>
            
            <div className="grid gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-900/30">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Brain className="h-12 w-12 text-blue-600" />
                    <h3 className="text-xl font-semibold">Trading Psychology Insights</h3>
                    <p className="text-muted-foreground">
                      AI-powered behavioral analysis and feedback to enhance your trading psychology
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                {therapistSuggestions.map((suggestion, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-4 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardContent className="p-4">
                        <p>{suggestion}</p>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-base">Mental Recovery Protocols</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="bg-muted p-3 rounded-lg flex items-start gap-3">
                      <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                        <Clock className="h-4 w-4 text-green-700" />
                      </div>
                      <div>
                        <p className="font-medium">Two-Minute Reset</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          After a losing trade, take 2 minutes away from screens. Practice 4-7-8 breathing (inhale 4s, hold 7s, exhale 8s) to reset your nervous system.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg flex items-start gap-3">
                      <div className="bg-blue-100 rounded-full p-1.5 mt-0.5">
                        <FileText className="h-4 w-4 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-medium">Journaling Prompt</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          "What did I learn from today's session that I can apply tomorrow? What pattern am I noticing in my trading that needs attention?"
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg flex items-start gap-3">
                      <div className="bg-purple-100 rounded-full p-1.5 mt-0.5">
                        <BarChart2 className="h-4 w-4 text-purple-700" />
                      </div>
                      <div>
                        <p className="font-medium">Performance Visualization</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Spend 5 minutes visualizing perfect execution of your OB strategy, focusing on patience, entry precision, and disciplined exits.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
