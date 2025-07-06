
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
  Radar
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, Activity, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PsychologyPanelProps {
  timeframe?: string;
}

export function PsychologyPanel({ timeframe = "30d" }: PsychologyPanelProps) {
  // Mock emotion tracking data
  const emotionData = [
    { day: "Monday", before: 8, during: 6, after: 7, pnl: 850 },
    { day: "Tuesday", before: 7, during: 8, after: 8, pnl: 1250 },
    { day: "Wednesday", before: 5, during: 4, after: 5, pnl: -340 },
    { day: "Thursday", before: 8, during: 7, after: 8, pnl: 760 },
    { day: "Friday", before: 7, during: 7, after: 8, pnl: 1120 },
  ];
  
  // Mindset vs Performance Table data
  const mindsetData = [
    { state: "Calm", winRate: 68, avgRR: 2.3, planScore: 95, color: "#10b981" },
    { state: "Focused", winRate: 72, avgRR: 2.5, planScore: 92, color: "#3b82f6" },
    { state: "Anxious", winRate: 42, avgRR: 1.1, planScore: 61, color: "#f59e0b" },
    { state: "Overconfident", winRate: 35, avgRR: 0.9, planScore: 52, color: "#ef4444" },
    { state: "Frustrated", winRate: 28, avgRR: 0.7, planScore: 45, color: "#dc2626" }
  ];
  
  // Behavioral reports data
  const behavioralData = [
    { name: "Early Exit", count: 12, impact: -1850 },
    { name: "FOMO Entry", count: 8, impact: -1250 },
    { name: "No Stop Loss", count: 5, impact: -980 },
    { name: "Oversized Position", count: 7, impact: -1120 },
    { name: "Revenge Trading", count: 4, impact: -780 }
  ];

  // Emotional correlation data
  const correlationData = [
    { emotion: "Fear", behavior: "Early Exits", correlation: 71 },
    { emotion: "Hope", behavior: "Lower R/R", correlation: 65 },
    { emotion: "FOMO", behavior: "Poor Entries", correlation: 82 },
    { emotion: "Overconfidence", behavior: "Oversizing", correlation: 76 },
    { emotion: "Frustration", behavior: "Revenge Trades", correlation: 89 }
  ];

  // Strengths data
  const strengthsData = [
    { name: "Patience on A+ setups", value: 85 },
    { name: "Order Block recognition", value: 78 },
    { name: "Take Profit precision", value: 82 },
    { name: "Market structure analysis", value: 75 },
    { name: "Trend direction accuracy", value: 70 }
  ];

  // Psychological strength profile data
  const psychProfileData = [
    { subject: 'Patience', A: 85, fullMark: 100 },
    { subject: 'Discipline', A: 72, fullMark: 100 },
    { subject: 'Focus', A: 78, fullMark: 100 },
    { subject: 'Adaptability', A: 65, fullMark: 100 },
    { subject: 'Emotional Control', A: 58, fullMark: 100 },
    { subject: 'Loss Acceptance', A: 75, fullMark: 100 },
    { subject: 'Risk Management', A: 82, fullMark: 100 },
    { subject: 'Plan Adherence', A: 70, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Emotion Tracker Graphs */}
      <Card>
        <CardHeader>
          <CardTitle>Emotion Tracker</CardTitle>
          <CardDescription>
            Emotional state tracking before, during and after trades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={emotionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 10]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm" style={{ color: "#3b82f6" }}>
                            Before Trade: {payload[0]?.value}/10
                          </p>
                          <p className="text-sm" style={{ color: "#8b5cf6" }}>
                            During Trade: {payload[1]?.value}/10
                          </p>
                          <p className="text-sm" style={{ color: "#10b981" }}>
                            After Trade: {payload[2]?.value}/10
                          </p>
                          <p className="text-sm font-medium mt-1">
                            P&L: ${payload[3]?.value}
                          </p>
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
                />
                <Line 
                  type="monotone" 
                  dataKey="during" 
                  name="During Trade"
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ stroke: '#8b5cf6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="after" 
                  name="After Trade"
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ stroke: '#10b981', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center mt-4">
            <div className="text-sm text-muted-foreground bg-blue-500/5 border border-blue-500/20 rounded-md p-2">
              <span className="font-medium text-blue-400 mr-1">Analysis:</span>
              Your performance decreases noticeably when your emotional state drops below 6/10 during trades
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Mindset vs Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mindset vs Performance</CardTitle>
          <CardDescription>
            How different emotional states affect your trading results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left px-4 py-3 text-sm font-medium">Emotional State</th>
                  <th className="text-center px-4 py-3 text-sm font-medium">Win Rate %</th>
                  <th className="text-center px-4 py-3 text-sm font-medium">Avg R:R</th>
                  <th className="text-center px-4 py-3 text-sm font-medium">Plan Score %</th>
                  <th className="text-center px-4 py-3 text-sm font-medium">Score Indicator</th>
                </tr>
              </thead>
              <tbody>
                {mindsetData.map((state, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-border/50 hover:bg-muted/10"
                  >
                    <td className="px-4 py-3 flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: state.color }}
                      />
                      <span className="font-medium">{state.state}</span>
                    </td>
                    <td className="text-center px-4 py-3">
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
                    </td>
                    <td className="text-center px-4 py-3 font-medium">
                      {state.avgRR}
                    </td>
                    <td className="text-center px-4 py-3">
                      {state.planScore}%
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full"
                          style={{ 
                            width: `${state.winRate}%`, 
                            backgroundColor: state.color 
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
        <CardFooter className="pt-0 pb-6 px-6">
          <div className="bg-blue-950/20 border border-blue-500/20 rounded-lg p-3 w-full text-sm">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-blue-400 font-medium mb-1">Key Insight</p>
                <p className="text-muted-foreground">
                  Calm and focused states result in 30%+ higher win rates and more than double the R:R ratio
                  compared to anxious or overconfident states. Consider implementing a pre-trade emotional
                  checklist to ensure optimal mindset.
                </p>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
      
      {/* Behavioral Reports & Emotional Correlation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Behavioral Reports */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Activity size={18} className="mr-2" />
              Behavioral Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="negative" className="w-full">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="negative">Negative</TabsTrigger>
                <TabsTrigger value="positive">Positive</TabsTrigger>
              </TabsList>
              
              <TabsContent value="negative" className="space-y-4">
                {behavioralData.map((behavior, index) => (
                  <div key={index} className="flex items-center justify-between border border-border/50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-red-500/10 text-red-400">
                        <TrendingDown size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{behavior.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {behavior.count} occurrences
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-800">
                      ${behavior.impact}
                    </Badge>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="positive" className="space-y-4">
                {strengthsData.map((strength, index) => (
                  <div key={index} className="flex items-center justify-between border border-border/50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400">
                        <TrendingUp size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{strength.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Effectiveness score: {strength.value}/100
                        </p>
                      </div>
                    </div>
                    <div className="w-20">
                      <div className="w-full bg-muted/30 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-emerald-500" 
                          style={{ width: `${strength.value}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Emotional Correlation */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Emotional Correlation</CardTitle>
          </CardHeader>
          <CardContent>
            {correlationData.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-amber-400">{item.emotion}</span>
                    <ArrowRight size={14} className="text-muted-foreground" />
                    <span>{item.behavior}</span>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-800">
                    {item.correlation}% corr.
                  </Badge>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-amber-500" 
                    style={{ width: `${item.correlation}%` }}
                  />
                </div>
              </div>
            ))}
            
            <div className="mt-6 bg-amber-950/20 border border-amber-500/20 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-amber-400">Key Finding:</span> Fear has a strong correlation (71%) with early exits, 
                resulting in an average of 0.4 lower R:R ratio on affected trades. Consider implementing a mechanical exit strategy
                to avoid emotionally-driven exits.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Psychological Strength Profile */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Psychological Strength Profile</CardTitle>
            <CardDescription>Radar chart of trading psychology competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="80%" 
                  data={psychProfileData}
                >
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="subject" stroke="#64748b" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#1e293b" />
                  <Radar 
                    name="Psychological Strength" 
                    dataKey="A" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.2} 
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length > 0 && payload[0]?.payload) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.subject}</p>
                            <p className="text-sm" style={{ color: "#3b82f6" }}>
                              Score: {data.A}/100
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
            <div className="text-center text-sm text-muted-foreground">
              <p>Strongest traits: Patience (85), Risk Management (82), Focus (78)</p>
              <p>Areas for improvement: Emotional Control (58), Adaptability (65)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
