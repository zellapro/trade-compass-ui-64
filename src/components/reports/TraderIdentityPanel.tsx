
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Clock, 
  Map, 
  Calendar, 
  Star, 
  BarChart as BarChartIcon,
  ChevronRight
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TraderIdentityPanelProps {
  timeframe?: string;
}

export function TraderIdentityPanel({ timeframe = "30d" }: TraderIdentityPanelProps) {
  // Trading archetype data
  const archetypeData = [
    { name: "Order Block Hunter", score: 85 },
    { name: "Precision Scalper", score: 72 },
    { name: "Pattern Trader", score: 58 },
    { name: "Momentum Trader", score: 65 },
    { name: "Pullback Trader", score: 77 }
  ];
  
  // Timeframe performance data
  const timeframeData = [
    { name: "1-min", winRate: 62, rr: 1.5, count: 25 },
    { name: "5-min", winRate: 68, rr: 1.8, count: 32 },
    { name: "15-min", winRate: 75, rr: 2.2, count: 35 },
    { name: "30-min", winRate: 71, rr: 2.1, count: 22 },
    { name: "1-hour", winRate: 69, rr: 2.0, count: 18 },
    { name: "4-hour", winRate: 65, rr: 1.9, count: 10 }
  ];
  
  // Day performance data
  const dayPerformanceData = [
    { name: "Monday", winRate: 65, pnl: 850, rr: 1.9, count: 18 },
    { name: "Tuesday", winRate: 78, pnl: 1250, rr: 2.3, count: 22 },
    { name: "Wednesday", winRate: 58, pnl: -340, rr: 1.2, count: 15 },
    { name: "Thursday", winRate: 72, pnl: 760, rr: 2.1, count: 20 },
    { name: "Friday", winRate: 75, pnl: 1120, rr: 2.2, count: 25 }
  ];
  
  // Hour performance heatmap data
  const hourPerformanceData = [
    { hour: "9:30", winRate: 75, pnl: 450 },
    { hour: "10:00", winRate: 82, pnl: 580 },
    { hour: "10:30", winRate: 78, pnl: 520 },
    { hour: "11:00", winRate: 72, pnl: 380 },
    { hour: "11:30", winRate: 68, pnl: 320 },
    { hour: "12:00", winRate: 55, pnl: -120 },
    { hour: "12:30", winRate: 52, pnl: -150 },
    { hour: "13:00", winRate: 58, pnl: 50 },
    { hour: "13:30", winRate: 62, pnl: 180 },
    { hour: "14:00", winRate: 65, pnl: 220 },
    { hour: "14:30", winRate: 70, pnl: 350 },
    { hour: "15:00", winRate: 75, pnl: 420 },
    { hour: "15:30", winRate: 78, pnl: 480 },
    { hour: "16:00", winRate: 65, pnl: 220 }
  ];
  
  // Emotional heatmap data
  const emotionalHeatmapData = [
    { day: "Monday", calm: 7, focused: 6, anxious: 4, overconfident: 2, frustrated: 3 },
    { day: "Tuesday", calm: 8, focused: 8, anxious: 3, overconfident: 1, frustrated: 2 },
    { day: "Wednesday", calm: 5, focused: 4, anxious: 7, overconfident: 2, frustrated: 6 },
    { day: "Thursday", calm: 7, focused: 7, anxious: 4, overconfident: 3, frustrated: 2 },
    { day: "Friday", calm: 8, focused: 7, anxious: 3, overconfident: 4, frustrated: 2 }
  ];
  
  // Strength scorecard data
  const strengthScoreData = [
    { name: "Order Block Execution", score: 85, change: "+12%" },
    { name: "Pattern Recognition", score: 78, change: "+8%" },
    { name: "Risk Management", score: 75, change: "+5%" },
    { name: "Trend Identification", score: 72, change: "+7%" },
    { name: "Entry Precision", score: 70, change: "+10%" },
    { name: "Exit Management", score: 65, change: "+3%" },
    { name: "Patience", score: 68, change: "+15%" },
    { name: "Market Structure Analysis", score: 82, change: "+6%" }
  ];

  return (
    <div className="space-y-6">
      {/* Trading Archetype */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users size={18} className="mr-2" />
              Trading Archetype
            </CardTitle>
            <CardDescription>
              Your trading style based on strategy preferences and execution patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={archetypeData}
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
                            <p className="text-sm">Match Score: {data.score}%</p>
                            <p className="text-xs mt-1 text-muted-foreground">
                              Based on your trading patterns and results
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="score" 
                    radius={[0, 4, 4, 0]}
                    barSize={30}
                  >
                    {archetypeData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={
                          index === 0 ? '#3b82f6' : 
                          index === 1 ? '#60a5fa' : 
                          index === 2 ? '#93c5fd' :
                          index === 3 ? '#bfdbfe' : '#dbeafe'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Archetype Traits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-blue-500/20 bg-blue-500/5 rounded-lg">
                <h3 className="font-medium mb-1 text-blue-400">Order Block Hunter</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li className="flex items-center">
                    <ChevronRight size={14} className="mr-1 flex-shrink-0" />
                    <span>Focuses on smart money concepts</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={14} className="mr-1 flex-shrink-0" />
                    <span>Patient with entries and exits</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={14} className="mr-1 flex-shrink-0" />
                    <span>Above-average hold times</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-3 border border-blue-500/20 bg-blue-500/5 rounded-lg">
                <h3 className="font-medium mb-1 text-blue-400">Pullback Trader</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li className="flex items-center">
                    <ChevronRight size={14} className="mr-1 flex-shrink-0" />
                    <span>Waits for price retracements</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={14} className="mr-1 flex-shrink-0" />
                    <span>Trend-with-value oriented</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={14} className="mr-1 flex-shrink-0" />
                    <span>Risk-conscious approach</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Best Timeframe Match */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock size={18} className="mr-2" />
            Best Timeframe Match
          </CardTitle>
          <CardDescription>
            Performance analysis by chart timeframe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-4">Timeframe Performance</h4>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeframeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                              <p className="font-medium">{data.name} Timeframe</p>
                              <p className="text-sm">Win Rate: {data.winRate}%</p>
                              <p className="text-sm">Avg R:R: {data.rr}</p>
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
                      {timeframeData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={
                            entry.winRate >= 75 ? '#10b981' : 
                            entry.winRate >= 70 ? '#3b82f6' : 
                            entry.winRate >= 65 ? '#60a5fa' :
                            entry.winRate >= 60 ? '#93c5fd' : '#bfdbfe'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="mb-6">
                <h4 className="text-lg font-medium mb-1">Best Performing Timeframe</h4>
                <div className="flex items-center mb-3">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-800 mr-3 text-lg px-3 py-1">
                    15-minute
                  </Badge>
                  <Badge variant="outline">75% Win Rate</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The 15-minute timeframe shows consistently strong performance with the highest win rate
                  and R:R ratio. You've taken 35 trades on this timeframe, the most of any timeframe.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium mb-1">Recommended Focus</h4>
                <div className="space-y-2">
                  <div className="p-2 border border-blue-500/20 bg-blue-500/5 rounded-lg text-sm flex items-center">
                    <Star size={16} className="text-blue-400 mr-2" />
                    <span>Primary: 15-minute charts for setup identification</span>
                  </div>
                  
                  <div className="p-2 border border-blue-500/20 bg-blue-500/5 rounded-lg text-sm flex items-center">
                    <Star size={16} className="text-blue-400 mr-2" />
                    <span>Secondary: 5-minute for entry precision</span>
                  </div>
                  
                  <div className="p-2 border border-blue-500/20 bg-blue-500/5 rounded-lg text-sm flex items-center">
                    <Star size={16} className="text-blue-400 mr-2" />
                    <span>Higher TF: 1-hour for trend context</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Top Performing Days & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Day Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar size={18} className="mr-2" />
              Top Performing Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dayPerformanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm">Win Rate: {data.winRate}%</p>
                            <p className="text-sm">P&L: ${data.pnl}</p>
                            <p className="text-sm">Avg R:R: {data.rr}</p>
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
                    {dayPerformanceData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={
                          entry.winRate >= 75 ? '#10b981' : 
                          entry.winRate >= 70 ? '#3b82f6' : 
                          entry.winRate >= 65 ? '#60a5fa' :
                          entry.winRate >= 60 ? '#93c5fd' : '#f59e0b'
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Tuesday (78%) and Friday (75%) are your best performing days
              </p>
              <p className="text-sm text-amber-400 mt-1">
                Consider reducing exposure on Wednesdays (58%)
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Hour Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Clock size={18} className="mr-2" />
              Time of Day Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={hourPerformanceData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="hour" />
                  <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">{data.hour}</p>
                            <p className="text-sm" style={{ color: '#3b82f6' }}>
                              Win Rate: {data.winRate}%
                            </p>
                            <p className="text-sm" style={{ 
                              color: data.pnl >= 0 ? '#10b981' : '#ef4444' 
                            }}>
                              P&L: ${data.pnl}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="winRate" 
                    name="Win Rate"
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#1e293b' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Best hours: 10:00 AM (82% win rate) and 3:30 PM (78% win rate)
              </p>
              <p className="text-sm text-amber-400 mt-1">
                Avoid 12:00-12:30 PM (lunchtime) with win rates below 55%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Emotional Heatmap & Strength Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emotional Heatmap */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Map size={18} className="mr-2" />
              Emotional Heatmap
            </CardTitle>
            <CardDescription>
              Emotional state patterns by day of week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mt-2">
              {emotionalHeatmapData.map((day, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-20 font-medium">{day.day}</div>
                    <div className="flex-1 flex items-center gap-1">
                      <div 
                        className="h-6 bg-blue-500 rounded-l-sm" 
                        style={{ width: `${day.calm * 5}%` }}
                        title={`Calm: ${day.calm}/10`}
                      />
                      <div 
                        className="h-6 bg-emerald-500" 
                        style={{ width: `${day.focused * 5}%` }}
                        title={`Focused: ${day.focused}/10`}
                      />
                      <div 
                        className="h-6 bg-amber-500" 
                        style={{ width: `${day.anxious * 5}%` }}
                        title={`Anxious: ${day.anxious}/10`}
                      />
                      <div 
                        className="h-6 bg-orange-500" 
                        style={{ width: `${day.overconfident * 5}%` }}
                        title={`Overconfident: ${day.overconfident}/10`}
                      />
                      <div 
                        className="h-6 bg-red-500 rounded-r-sm" 
                        style={{ width: `${day.frustrated * 5}%` }}
                        title={`Frustrated: ${day.frustrated}/10`}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center items-center gap-6 mt-4 pt-2 border-t border-border/30">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span className="text-xs">Calm</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-emerald-500"></div>
                  <span className="text-xs">Focused</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-amber-500"></div>
                  <span className="text-xs">Anxious</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-orange-500"></div>
                  <span className="text-xs">Overconfident</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-red-500"></div>
                  <span className="text-xs">Frustrated</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-2 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-400 font-medium">Key Insight:</span> You tend to perform best on Tuesdays when your emotional 
                state shows high levels of calm and focus. Wednesday shows elevated anxiety and frustration.
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Strength Scorecard */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BarChartIcon size={18} className="mr-2" />
              Strength Scorecard
            </CardTitle>
            <CardDescription>
              Ranked list of your trading strengths and competencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {strengthScoreData.slice(0, 6).map((strength, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/2 text-sm">{strength.name}</div>
                  <div className="w-1/2">
                    <div className="flex items-center justify-between mb-1">
                      <div className="h-2 bg-muted/20 rounded-full w-full overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${
                            strength.score >= 80 ? 'bg-emerald-500' : 
                            strength.score >= 70 ? 'bg-blue-500' : 
                            strength.score >= 60 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                      <span className="ml-2 text-xs">{strength.score}</span>
                    </div>
                    <div className="text-xs text-right text-emerald-400">
                      {strength.change}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-1">
                View All Strengths
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
