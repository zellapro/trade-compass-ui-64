
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis,
  BubbleChart,
  Bubble
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Info, 
  ChevronDown, 
  ChevronUp, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  Smile, 
  Frown, 
  Meh,
  BookOpen,
  Calendar,
  Clock
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

interface PsychologyPanelProps {
  timeframe?: string;
}

export function PsychologyPanel({ timeframe = "30d" }: PsychologyPanelProps) {
  const [activeCollapsible, setActiveCollapsible] = useState<string[]>([
    "emotion-trends", 
    "mindset-performance", 
    "behavioral-patterns", 
    "emotional-triggers", 
    "ai-mind-mirror"
  ]);
  
  const [viewMode, setViewMode] = useState<"performance" | "frequency">("performance");

  const toggleCollapsible = (id: string) => {
    setActiveCollapsible(current => 
      current.includes(id) 
        ? current.filter(item => item !== id)
        : [...current, id]
    );
  };

  // Mock emotion tracking data
  const emotionData = [
    { day: "Monday", before: 8, during: 6, after: 7, pnl: 850, emoji: "🙂" },
    { day: "Tuesday", before: 7, during: 8, after: 8, pnl: 1250, emoji: "😀" },
    { day: "Wednesday", before: 5, during: 4, after: 5, pnl: -340, emoji: "😟" },
    { day: "Thursday", before: 8, during: 7, after: 8, pnl: 760, emoji: "🙂" },
    { day: "Friday", before: 7, during: 7, after: 8, pnl: 1120, emoji: "🙂" },
    { day: "Monday", before: 6, during: 5, after: 6, pnl: -220, emoji: "😐" },
    { day: "Tuesday", before: 8, during: 7, after: 7, pnl: 540, emoji: "🙂" },
  ];
  
  // Mindset vs Performance Table data
  const mindsetData = [
    { state: "Calm", winRate: 68, avgRR: 2.3, planScore: 95, tradePercent: 35, color: "#10b981" },
    { state: "Focused", winRate: 72, avgRR: 2.5, planScore: 92, tradePercent: 28, color: "#3b82f6" },
    { state: "Anxious", winRate: 42, avgRR: 1.1, planScore: 61, tradePercent: 18, color: "#f59e0b" },
    { state: "Overconfident", winRate: 35, avgRR: 0.9, planScore: 52, tradePercent: 12, color: "#ef4444" },
    { state: "Fearful", winRate: 29, avgRR: 0.7, planScore: 48, tradePercent: 7, color: "#dc2626" }
  ];
  
  // Behavioral reports data - negative behaviors
  const negativeBehaviors = [
    { name: "FOMO Entry", count: 8, winRate: 32, impact: -1250, trades: ["AAPL 04/15", "TSLA 04/12", "MSFT 04/10"] },
    { name: "Early Exits", count: 12, winRate: 45, impact: -1850, trades: ["AMZN 04/14", "META 04/11", "NVDA 04/09"] },
    { name: "Size Creep", count: 6, winRate: 28, impact: -980, trades: ["GOOGL 04/13", "NFLX 04/08", "AMD 04/05"] },
  ];

  // Behavioral reports data - strengths
  const strengthBehaviors = [
    { name: "OB Zone Recognition", count: 24, winRate: 76, impact: 3280, trades: ["MSFT 04/16", "AAPL 04/13", "META 04/11"] },
    { name: "Risk Control", count: 32, winRate: 68, impact: 2950, trades: ["NVDA 04/15", "AMZN 04/12", "TSLA 04/10"] },
    { name: "Planned TP Adherence", count: 18, winRate: 82, impact: 3460, trades: ["GOOGL 04/14", "AMD 04/11", "NFLX 04/09"] },
  ];

  // Emotional correlation data
  const correlationData = [
    { emotion: "Fear", behavior: "Early Exits", correlation: 71, value: 71, size: 71 * 10 },
    { emotion: "Hope", behavior: "Lower R/R", correlation: 65, value: 65, size: 65 * 10 },
    { emotion: "FOMO", behavior: "Poor Entries", correlation: 82, value: 82, size: 82 * 10 },
    { emotion: "Overconfidence", behavior: "Oversizing", correlation: 76, value: 76, size: 76 * 10 },
    { emotion: "Frustration", behavior: "Revenge Trades", correlation: 89, value: 89, size: 89 * 10 },
    { emotion: "Anxiety", behavior: "Moving Stops", correlation: 68, value: 68, size: 68 * 10 },
    { emotion: "Excitement", behavior: "Adding to Winners", correlation: 58, value: 58, size: 58 * 10 },
  ];

  // Recent trades psychology scores
  const psychScores = [
    { 
      date: "04/18/2023", 
      symbol: "AAPL", 
      planDiscipline: 85, 
      emotionalBias: 78, 
      reactionQuality: 82, 
      mindsetMatch: 80, 
      overall: 81 
    },
    { 
      date: "04/17/2023", 
      symbol: "MSFT", 
      planDiscipline: 92, 
      emotionalBias: 88, 
      reactionQuality: 90, 
      mindsetMatch: 85, 
      overall: 89 
    },
    { 
      date: "04/16/2023", 
      symbol: "TSLA", 
      planDiscipline: 65, 
      emotionalBias: 55, 
      reactionQuality: 62, 
      mindsetMatch: 58, 
      overall: 60 
    }
  ];

  const getEmojiForScore = (score: number) => {
    if (score >= 80) return "😀";
    if (score >= 60) return "🙂";
    if (score >= 40) return "😐";
    if (score >= 20) return "😕";
    return "😞";
  };

  const getColorForScore = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-emerald-400";
    if (score >= 40) return "text-amber-400";
    if (score >= 20) return "text-orange-500";
    return "text-red-500";
  };

  const getBackgroundForScore = (score: number) => {
    if (score >= 80) return "bg-green-500/10";
    if (score >= 60) return "bg-emerald-400/10";
    if (score >= 40) return "bg-amber-400/10";
    if (score >= 20) return "bg-orange-500/10";
    return "bg-red-500/10";
  };

  return (
    <div className="space-y-6">
      <Card className="border-indigo-500/20">
        <CardHeader className="pb-2 bg-indigo-500/5 rounded-t-lg">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-xl flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-indigo-400" />
                Psychology & Behavior Trends
              </CardTitle>
              <CardDescription>
                AI-analyzed patterns and insights from your trading psychology
              </CardDescription>
            </div>
            <Badge variant="outline" className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border-indigo-800">
              {timeframe} • Auto-AI Generated
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Emotion Trend Graphs */}
          <Collapsible 
            open={activeCollapsible.includes("emotion-trends")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleCollapsible("emotion-trends")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <Smile className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-medium">Emotion Trend Graphs</h3>
              </div>
              {activeCollapsible.includes("emotion-trends") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <div className="h-[380px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emotionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border border-border/50 bg-background/95 p-3 shadow-md">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xl">{payload[0].payload.emoji}</span>
                                <p className="font-medium">{label}</p>
                              </div>
                              <p className="text-sm" style={{ color: "#3b82f6" }}>
                                Before Trade: {payload[0].value}/10
                              </p>
                              <p className="text-sm" style={{ color: "#8b5cf6" }}>
                                During Trade: {payload[1].value}/10
                              </p>
                              <p className="text-sm" style={{ color: "#10b981" }}>
                                After Trade: {payload[2].value}/10
                              </p>
                              <div className={`text-sm font-medium mt-2 px-2 py-1 rounded ${Number(payload[3].value) >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                P&L: ${payload[3].value}
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
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 rounded-lg border border-blue-500/20 bg-blue-500/5">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">Trend Insight</p>
                    <p className="text-muted-foreground">
                      You perform 36% worse when entering trades in an anxious state (5/10 or below) 
                      versus a focused state (7/10 or above). Consider implementing a pre-trade 
                      emotional check-in to avoid trading when anxious.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Mindset vs Performance Table */}
          <Collapsible 
            open={activeCollapsible.includes("mindset-performance")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleCollapsible("mindset-performance")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <BarChartIcon className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-medium">Mindset vs Performance Table</h3>
              </div>
              {activeCollapsible.includes("mindset-performance") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  How different emotional states affect your trading results
                </p>
                <div className="flex items-center bg-muted/50 rounded-md p-1">
                  <Button 
                    size="sm" 
                    variant={viewMode === "performance" ? "default" : "ghost"}
                    onClick={() => setViewMode("performance")}
                    className="text-xs h-7 px-3"
                  >
                    Performance Impact
                  </Button>
                  <Button 
                    size="sm" 
                    variant={viewMode === "frequency" ? "default" : "ghost"}
                    onClick={() => setViewMode("frequency")}
                    className="text-xs h-7 px-3"
                  >
                    % of Trades
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Emotional State</TableHead>
                      <TableHead className="text-center">Win Rate %</TableHead>
                      <TableHead className="text-center">Avg R:R</TableHead>
                      <TableHead className="text-center">Plan Score %</TableHead>
                      <TableHead className="text-center">
                        {viewMode === "performance" ? "Impact" : "% of Trades"}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mindsetData.map((state, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: state.color }}
                            />
                            <span className="font-medium">{state.state}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge 
                            variant="outline" 
                            className="px-2 py-1"
                            style={{
                              backgroundColor: `${state.color}20`,
                              color: state.color,
                              borderColor: `${state.color}50`
                            }}
                          >
                            {state.winRate}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-medium">
                          {state.avgRR}
                        </TableCell>
                        <TableCell className="text-center">
                          {state.planScore}%
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-muted/30 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full"
                                style={{ 
                                  width: viewMode === "performance" ? `${state.winRate}%` : `${state.tradePercent}%`, 
                                  backgroundColor: state.color 
                                }}
                              />
                            </div>
                            <span className="text-xs w-8 text-right">
                              {viewMode === "performance" ? `${state.winRate}%` : `${state.tradePercent}%`}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-start gap-3">
                  <Info size={18} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-400 font-medium mb-1">Key Insight</p>
                    <p className="text-muted-foreground">
                      Calm and focused states result in 30%+ higher win rates and more than double the R:R ratio
                      compared to anxious or overconfident states. Consider implementing a pre-trade emotional
                      checklist to ensure optimal mindset.
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Behavioral Patterns */}
          <Collapsible 
            open={activeCollapsible.includes("behavioral-patterns")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleCollapsible("behavioral-patterns")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-400" />
                <h3 className="text-lg font-medium">Behavioral Repetition Report</h3>
              </div>
              {activeCollapsible.includes("behavioral-patterns") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <Tabs defaultValue="negative" className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="negative">Negative Patterns</TabsTrigger>
                  <TabsTrigger value="positive">Strengths</TabsTrigger>
                </TabsList>
                
                <TabsContent value="negative" className="space-y-4">
                  {negativeBehaviors.map((behavior, index) => (
                    <div key={index} className="border border-border/50 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-3 bg-red-500/5 border-b border-red-500/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-red-500/10 text-red-400">
                            <Frown size={16} />
                          </div>
                          <div>
                            <p className="font-medium">{behavior.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {behavior.count} occurrences • {behavior.winRate}% win rate
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-800">
                          ${behavior.impact}
                        </Badge>
                      </div>
                      <div className="p-3 bg-background/50">
                        <p className="text-xs text-muted-foreground mb-2">Linked trades:</p>
                        <div className="flex flex-wrap gap-2">
                          {behavior.trades.map((trade, i) => (
                            <Badge key={i} variant="outline" className="bg-background text-xs">
                              {trade}
                            </Badge>
                          ))}
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            View all <ChevronDown className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="positive" className="space-y-4">
                  {strengthBehaviors.map((behavior, index) => (
                    <div key={index} className="border border-border/50 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-3 bg-emerald-500/5 border-b border-emerald-500/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
                            <Smile size={16} />
                          </div>
                          <div>
                            <p className="font-medium">{behavior.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {behavior.count} occurrences • {behavior.winRate}% win rate
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-800">
                          +${behavior.impact}
                        </Badge>
                      </div>
                      <div className="p-3 bg-background/50">
                        <p className="text-xs text-muted-foreground mb-2">Example trades:</p>
                        <div className="flex flex-wrap gap-2">
                          {behavior.trades.map((trade, i) => (
                            <Badge key={i} variant="outline" className="bg-background text-xs">
                              {trade}
                            </Badge>
                          ))}
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                            View all <ChevronDown className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CollapsibleContent>
          </Collapsible>

          {/* Emotional Trigger Correlation */}
          <Collapsible 
            open={activeCollapsible.includes("emotional-triggers")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleCollapsible("emotional-triggers")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-medium">Emotional Trigger Correlation</h3>
              </div>
              {activeCollapsible.includes("emotional-triggers") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="value" 
                      type="number" 
                      name="correlation" 
                      domain={[40, 100]}
                      tick={{ fontSize: 12 }}
                      label={{ value: "Correlation Strength (%)", position: "bottom", offset: 0, fontSize: 12 }}
                    />
                    <YAxis 
                      dataKey="value" 
                      type="number" 
                      name="correlation" 
                      tick={{ fontSize: 12 }}
                      label={{ value: "Impact", angle: -90, position: "insideLeft", offset: 10, fontSize: 12 }}
                    />
                    <ZAxis dataKey="size" range={[50, 400]} />
                    <Tooltip 
                      cursor={{ strokeDasharray: "3 3" }}
                      content={(props: {
                        active?: boolean;
                        payload?: Array<any>;
                      }) => {
                        if (props.active && props.payload && props.payload.length) {
                          const data = props.payload[0].payload;
                          return (
                            <div className="rounded-lg border border-border/50 bg-background/95 p-3 shadow-md">
                              <div className="font-medium mb-1 text-purple-400">{data.correlation}% Correlation</div>
                              <div className="mb-1">
                                <span className="font-medium">Emotion:</span> {data.emotion}
                              </div>
                              <div>
                                <span className="font-medium">Behavior:</span> {data.behavior}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter 
                      name="Correlation" 
                      data={correlationData} 
                      fill="#8b5cf6"
                      shape={(props: {
                        cx?: number;
                        cy?: number;
                        payload?: any;
                      }) => {
                        const { cx = 0, cy = 0, payload } = props;
                        return (
                          <g>
                            <circle
                              cx={cx}
                              cy={cy}
                              r={10}
                              fill="#8b5cf6"
                              fillOpacity={0.6}
                              stroke="#8b5cf6"
                            />
                            <text
                              x={cx}
                              y={cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="#f8fafc"
                              fontSize={9}
                              fontWeight="bold"
                            >
                              {payload?.emotion?.charAt(0) || ""}
                            </text>
                          </g>
                        );
                      }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
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
                    <Info size={18} className="text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-purple-400 font-medium mb-1">Recommendation</p>
                      <p className="text-muted-foreground text-sm">
                        Consider implementing a mechanical exit strategy
                        to avoid emotionally-driven exits when fear is detected in your journal entries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* AI Mind Mirror Summary */}
          <Collapsible 
            open={activeCollapsible.includes("ai-mind-mirror")}
            className="border rounded-lg border-border/50"
          >
            <CollapsibleTrigger 
              onClick={() => toggleCollapsible("ai-mind-mirror")}
              className="flex items-center justify-between w-full p-4 text-left bg-background/95"
            >
              <div className="flex items-center gap-2">
                <Meh className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-medium">AI Mind Mirror Summary</h3>
              </div>
              {activeCollapsible.includes("ai-mind-mirror") ? 
                <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              }
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-2 border-t border-border/50">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-5 rounded-xl border border-blue-500/20">
                <div className="flex items-start">
                  <div className="text-4xl mr-4">🧠</div>
                  <div>
                    <h4 className="text-blue-400 font-medium mb-3">Psychological Edge Analysis</h4>
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
              <div className="mt-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    Recent Trades Psychology Score
                  </h4>
                  <Badge variant="outline">
                    Monthly Avg: 76/100
                  </Badge>
                </div>
                <div className="space-y-4">
                  {psychScores.map((score, index) => (
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
                        <Button variant="ghost" size="sm">
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
