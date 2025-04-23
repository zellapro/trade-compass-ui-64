
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Line,
  LineChart,
  Cell
} from "recharts";
import { CalendarDays, DollarSign, CheckCircle, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DailyReportPanelProps {
  timeframe?: string;
}

export function DailyReportPanel({ timeframe = "30d" }: DailyReportPanelProps) {
  // Mock daily performance data
  const dailyData = [
    { date: "Mon", pnl: 850, strategy: "OB Reclaim", planScore: 95, emotion: "Calm" },
    { date: "Tue", pnl: 1250, strategy: "Breakout", planScore: 90, emotion: "Focused" },
    { date: "Wed", pnl: -340, strategy: "VWAP Bounce", planScore: 65, emotion: "Anxious" },
    { date: "Thu", pnl: 760, strategy: "SMC", planScore: 85, emotion: "Confident" },
    { date: "Fri", pnl: 1120, strategy: "OB Reclaim", planScore: 92, emotion: "Focused" }
  ];
  
  // Missed opportunities data
  const missedOpportunities = [
    { setup: "OB Reclaim + FVG", potential: "~$650", reasoning: "Hesitated on entry", time: "10:30 AM" },
    { setup: "Higher-TF Breakout", potential: "~$820", reasoning: "Missed due to meeting", time: "2:15 PM" },
    { setup: "SMC + BOS Violation", potential: "~$1,220", reasoning: "Overtrading concerns", time: "11:45 AM" }
  ];
  
  // Emotion score correlations
  const emotionData = [
    { name: "Calm", pnl: 850, avg: 920, trades: 12 },
    { name: "Focused", pnl: 1180, avg: 1050, trades: 18 },
    { name: "Confident", pnl: 750, avg: 820, trades: 15 },
    { name: "Anxious", pnl: -280, avg: -180, trades: 7 },
    { name: "Frustrated", pnl: -420, avg: -350, trades: 5 }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Daily Performance Report</CardTitle>
            <CardDescription>Detailed daily trading analysis and patterns</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Select defaultValue="thisWeek">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="thisWeek">This Week</SelectItem>
                <SelectItem value="lastWeek">Last Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Net P&L and Strategy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <DollarSign size={18} className="mr-2" />
                Daily P&L Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm font-medium" style={{ 
                                color: data.pnl >= 0 ? '#10b981' : '#ef4444' 
                              }}>
                                P&L: ${data.pnl}
                              </p>
                              <p className="text-sm">Strategy: {data.strategy}</p>
                              <p className="text-sm">Plan Score: {data.planScore}%</p>
                              <p className="text-sm">Emotion: {data.emotion}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="pnl"
                      name="P&L" 
                      radius={[4, 4, 0, 0]}
                    >
                      {dailyData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Plan Following Score */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle size={18} className="mr-2" />
                Plan Adherence & Execution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm font-medium">Plan Score: {data.planScore}%</p>
                              <p className="text-sm">Strategy: {data.strategy}</p>
                              <div className="mt-1 w-full bg-muted/30 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    data.planScore >= 90 ? 'bg-emerald-500' : 
                                    data.planScore >= 75 ? 'bg-blue-500' : 
                                    data.planScore >= 60 ? 'bg-amber-500' : 'bg-red-500'
                                  }`} 
                                  style={{ width: `${data.planScore}%` }}
                                />
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="planScore" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ 
                        stroke: '#3b82f6', 
                        strokeWidth: 2, 
                        r: 4,
                        fill: '#1e293b' 
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Emotional State vs Performance */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Emotional State vs Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionData} barGap={0} barCategoryGap={40}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
                            <p className="font-medium">Emotion: {label}</p>
                            <p className="text-sm">Current P&L: ${data.pnl}</p>
                            <p className="text-sm">Average P&L: ${data.avg}</p>
                            <p className="text-sm">Trade Count: {data.trades}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="pnl" 
                    name="Current P&L"
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="avg" 
                    name="Average P&L"
                    fill="#6366f1" 
                    radius={[4, 4, 0, 0]}
                    fillOpacity={0.6}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Missed Opportunity Log */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Missed Opportunity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {missedOpportunities.map((opportunity, index) => (
                <div key={index} className="flex items-center justify-between border border-border/50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="p-2 rounded bg-amber-500/10 text-amber-500 mr-3">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{opportunity.setup}</h4>
                      <p className="text-xs text-muted-foreground">{opportunity.reasoning}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-amber-500">{opportunity.potential}</p>
                    <p className="text-xs text-muted-foreground">{opportunity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
