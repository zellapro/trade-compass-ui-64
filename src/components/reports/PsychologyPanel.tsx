import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { showToast } from '@/components/playbook/fixedToast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Brain,
  Calendar,
  ChevronDown,
  Download,
  FileText,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  ArrowRight,
  FileSpreadsheet,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar as CalendarIcon,
} from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
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
} from 'recharts';

// Sample data for Emotional Timeline
const emotionTimelineData = [
  { date: '2023-05-01', preTrade: 'Calm', duringTrade: 'Focused', postTrade: 'Satisfied', result: 'Win', profit: 250 },
  { date: '2023-05-02', preTrade: 'Anxious', duringTrade: 'Fearful', postTrade: 'Regretful', result: 'Loss', profit: -150 },
  { date: '2023-05-03', preTrade: 'Overconfident', duringTrade: 'Hopeful', postTrade: 'Regretful', result: 'Loss', profit: -200 },
  { date: '2023-05-04', preTrade: 'Calm', duringTrade: 'Focused', postTrade: 'Satisfied', result: 'Win', profit: 300 },
  { date: '2023-05-05', preTrade: 'Hesitant', duringTrade: 'Fearful', postTrade: 'Indifferent', result: 'BE', profit: 0 },
  { date: '2023-05-08', preTrade: 'Calm', duringTrade: 'Focused', postTrade: 'Satisfied', result: 'Win', profit: 200 },
  { date: '2023-05-09', preTrade: 'Anxious', duringTrade: 'Frustrated', postTrade: 'Angry', result: 'Loss', profit: -250 },
  { date: '2023-05-10', preTrade: 'Hesitant', duringTrade: 'Hopeful', postTrade: 'Satisfied', result: 'Win', profit: 150 },
  { date: '2023-05-11', preTrade: 'Overconfident', duringTrade: 'Frustrated', postTrade: 'Regretful', result: 'Loss', profit: -300 },
  { date: '2023-05-12', preTrade: 'Calm', duringTrade: 'Focused', postTrade: 'Satisfied', result: 'Win', profit: 350 },
];

// Sample data for Plan Adherence
const planAdherenceData = {
  planFollowed: 72,
  checklistCompleted: 85,
  deviationEvents: 14,
  disciplineScore: 76,
  weeklyStreak: [
    { day: 'Mon', followed: true, score: 90 },
    { day: 'Tue', followed: true, score: 85 },
    { day: 'Wed', followed: true, score: 80 },
    { day: 'Thu', followed: false, score: 30 },
    { day: 'Fri', followed: true, score: 75 },
  ],
};

// Sample data for Emotion Performance Matrix
const emotionPerformanceData = {
  preTrade: [
    { emotion: 'Calm', win: 24, loss: 6, be: 4, winRate: 71 },
    { emotion: 'Anxious', win: 12, loss: 18, be: 5, winRate: 34 },
    { emotion: 'Overconfident', win: 8, loss: 16, be: 2, winRate: 31 },
    { emotion: 'Hesitant', win: 11, loss: 9, be: 8, winRate: 39 },
  ],
  duringTrade: [
    { emotion: 'Focused', win: 32, loss: 8, be: 4, winRate: 73 },
    { emotion: 'Fearful', win: 7, loss: 19, be: 6, winRate: 22 },
    { emotion: 'Hopeful', win: 14, loss: 12, be: 4, winRate: 47 },
    { emotion: 'Frustrated', win: 6, loss: 18, be: 2, winRate: 23 },
  ],
  postTrade: [
    { emotion: 'Satisfied', win: 35, loss: 3, be: 2, winRate: 88 },
    { emotion: 'Regretful', win: 0, loss: 26, be: 2, winRate: 0 },
    { emotion: 'Indifferent', win: 8, loss: 6, be: 10, winRate: 33 },
    { emotion: 'Angry', win: 2, loss: 18, be: 0, winRate: 10 },
  ],
};

// Emotion colors
const emotionColors = {
  Calm: '#4ade80',
  Anxious: '#fb923c',
  Overconfident: '#f87171',
  Hesitant: '#94a3b8',
  Focused: '#60a5fa',
  Fearful: '#f43f5e',
  Hopeful: '#a78bfa',
  Frustrated: '#ef4444',
  Satisfied: '#22c55e',
  Regretful: '#dc2626',
  Indifferent: '#9ca3af',
  Angry: '#b91c1c',
};

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export function PsychologyPanel() {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [tradeType, setTradeType] = useState('all');
  const [instrument, setInstrument] = useState('all');
  const [timeframe, setTimeframe] = useState('weekly');
  const [strategyType, setStrategyType] = useState('all');
  const [session, setSession] = useState('all');
  const [emotionTimelineCollapsed, setEmotionTimelineCollapsed] = useState(false);
  const [planAdherenceCollapsed, setPlanAdherenceCollapsed] = useState(false);
  const [emotionMatrixCollapsed, setEmotionMatrixCollapsed] = useState(false);
  
  // Export handlers
  const handleExportCSV = (type: string) => {
    showToast({
      title: "Export Started",
      description: `${type} data will be downloaded as CSV shortly.`,
    });
    // Here we would implement actual CSV export functionality
  };

  const handleExportPDF = (type: string) => {
    showToast({
      title: "Export Started",
      description: `${type} data will be downloaded as PDF shortly.`,
    });
    // Here we would implement actual PDF export functionality
  };

  // Custom tooltip for emotion timeline
  const EmotionTimelineTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-bold">{formatDate(data.date)}</p>
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Pre-Trade:</span>
              <span className="font-medium" style={{ color: emotionColors[data.preTrade as keyof typeof emotionColors] }}>
                {data.preTrade}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">During Trade:</span>
              <span className="font-medium" style={{ color: emotionColors[data.duringTrade as keyof typeof emotionColors] }}>
                {data.duringTrade}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Post-Trade:</span>
              <span className="font-medium" style={{ color: emotionColors[data.postTrade as keyof typeof emotionColors] }}>
                {data.postTrade}
              </span>
            </div>
            <div className="flex justify-between text-xs mt-1 pt-1 border-t border-border">
              <span className="text-muted-foreground">Result:</span>
              <span className={`font-medium ${
                data.result === 'Win' 
                  ? 'text-green-500' 
                  : data.result === 'Loss' 
                    ? 'text-red-500' 
                    : 'text-yellow-500'
              }`}>
                {data.result} ({data.profit > 0 ? '+' : ''}{data.profit})
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Psychological Analysis</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DatePickerWithRange
            date={dateRange}
            setDate={setDateRange}
            className="w-auto"
          />
          <Select onValueChange={setTimeframe} value={timeframe}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Weekly View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly View</SelectItem>
              <SelectItem value="monthly">Monthly View</SelectItem>
              <SelectItem value="quarterly">Quarterly View</SelectItem>
              <SelectItem value="yearly">Yearly View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 1. Emotional Behavior Timeline */}
      <Collapsible
        open={!emotionTimelineCollapsed}
        onOpenChange={setEmotionTimelineCollapsed}
        className="space-y-2"
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-transparent p-0">
                    <ChevronDown className={cn("h-5 w-5 transition-all", !emotionTimelineCollapsed ? "transform rotate-180" : "")} />
                  </Button>
                </CollapsibleTrigger>
                <CardTitle className="text-lg flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-primary" />
                  Emotional Behavior Timeline
                </CardTitle>
                <Badge variant="outline" className="ml-2">
                  {emotionTimelineData.length} Trades
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select onValueChange={setTradeType} value={tradeType}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Trades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Trades</SelectItem>
                    <SelectItem value="win">Winning Trades</SelectItem>
                    <SelectItem value="loss">Losing Trades</SelectItem>
                    <SelectItem value="be">Break-Even</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setInstrument} value={instrument}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Instruments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Instruments</SelectItem>
                    <SelectItem value="forex">Forex</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="stocks">Stocks</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('Emotional Timeline')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('Emotional Timeline')}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
            <CardDescription>
              Visualize your emotional states before, during, and after each trade across time.
            </CardDescription>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={emotionTimelineData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate} 
                      stroke="#888888" 
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12}
                      ticks={['Calm', 'Anxious', 'Overconfident', 'Hesitant', 'Focused', 'Fearful', 'Hopeful', 'Frustrated', 'Satisfied', 'Regretful', 'Indifferent', 'Angry']}
                      type="category"
                      domain={['Calm', 'Anxious', 'Overconfident', 'Hesitant', 'Focused', 'Fearful', 'Hopeful', 'Frustrated', 'Satisfied', 'Regretful', 'Indifferent', 'Angry']}
                      hide
                    />
                    <Tooltip content={<EmotionTimelineTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="preTrade" 
                      stroke="#4ade80" 
                      name="Pre-Trade Emotion"
                      strokeWidth={3}
                      dot={{ r: 6, strokeWidth: 2 }}
                      activeDot={{ r: 8, strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="duringTrade" 
                      stroke="#60a5fa" 
                      name="During-Trade Emotion"
                      strokeWidth={3}
                      dot={{ r: 6, strokeWidth: 2 }}
                      activeDot={{ r: 8, strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="postTrade" 
                      stroke="#a78bfa" 
                      name="Post-Trade Emotion"
                      strokeWidth={3}
                      dot={{ r: 6, strokeWidth: 2 }}
                      activeDot={{ r: 8, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Insights Summary */}
              <div className="mt-6 space-y-4">
                <h4 className="font-semibold text-md">Emotional Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Most common pre-trade emotion</div>
                      <div className="mt-1 text-2xl font-bold" style={{ color: emotionColors.Anxious }}>Anxious</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">In 42% of all trades</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Highest win-rate emotion</div>
                      <div className="mt-1 text-2xl font-bold" style={{ color: emotionColors.Focused }}>Focused</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">71% win rate when trading focused</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Emotional volatility trend</div>
                      <div className="mt-1 text-2xl font-bold text-orange-500">Fridays</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">Highest emotional swing on loss days</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 2. Plan Adherence & Discipline Chart */}
      <Collapsible
        open={!planAdherenceCollapsed}
        onOpenChange={setPlanAdherenceCollapsed}
        className="space-y-2"
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-transparent p-0">
                    <ChevronDown className={cn("h-5 w-5 transition-all", !planAdherenceCollapsed ? "transform rotate-180" : "")} />
                  </Button>
                </CollapsibleTrigger>
                <CardTitle className="text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-primary" />
                  Plan Adherence & Discipline
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select onValueChange={setStrategyType} value={strategyType}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Strategies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Strategies</SelectItem>
                    <SelectItem value="trend">Trend Following</SelectItem>
                    <SelectItem value="reversal">Reversal</SelectItem>
                    <SelectItem value="breakout">Breakout</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setSession} value={session}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Sessions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('Discipline')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('Discipline')}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
            <CardDescription>
              Measure your consistency in following trading plans and discipline rules.
            </CardDescription>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="h-[250px] flex items-center justify-center col-span-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Followed', value: planAdherenceData.planFollowed },
                          { name: 'Deviated', value: 100 - planAdherenceData.planFollowed }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        <Cell fill="#4ade80" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Rate']}
                        contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', borderColor: 'rgba(63, 63, 70, 0.5)', borderRadius: '0.375rem' }}
                      />
                      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                        <tspan className="text-xl font-bold fill-white" x="50%" dy="-10">
                          {planAdherenceData.planFollowed}%
                        </tspan>
                        <tspan className="text-xs fill-muted-foreground" x="50%" dy="20">
                          Plan Followed
                        </tspan>
                      </text>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-md mb-4">Weekly Discipline Streak</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={planAdherenceData.weeklyStreak}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="day" stroke="#888888" />
                        <YAxis domain={[0, 100]} stroke="#888888" />
                        <Tooltip 
                          formatter={(value) => [`${value}`, 'Discipline Score']}
                          contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', borderColor: 'rgba(63, 63, 70, 0.5)', borderRadius: '0.375rem' }}
                        />
                        <Bar dataKey="score" name="Discipline Score">
                          {planAdherenceData.weeklyStreak.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`}
                              fill={entry.followed ? '#4ade80' : '#ef4444'}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Discipline Metrics */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Plan Followed</div>
                      <div className="mt-1 text-2xl font-bold text-green-500">{planAdherenceData.planFollowed}%</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">of all trades matched predefined plan</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Checklist Completed</div>
                      <div className="mt-1 text-2xl font-bold text-blue-500">{planAdherenceData.checklistCompleted}%</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">pre-trade checklist usage rate</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Deviation Events</div>
                      <div className="mt-1 text-2xl font-bold text-red-500">{planAdherenceData.deviationEvents}</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">times trading rules were broken</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Discipline Score</div>
                      <div className="mt-1 text-2xl font-bold text-purple-500">{planAdherenceData.disciplineScore}/100</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">overall trading discipline rating</div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* AI Insights */}
                <div className="lg:col-span-3">
                  <div className="rounded-lg border border-border/50 bg-card p-4 mt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">AI Discipline Insights</h4>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Your adherence rate drops to 42% after 3 consecutive winning trades</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Discipline score improved by 22% since you began consistent journaling</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Thursday shows the lowest discipline score (30%) - consider reviewing your routine</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 3. Emotional State vs. Performance Matrix */}
      <Collapsible
        open={!emotionMatrixCollapsed}
        onOpenChange={setEmotionMatrixCollapsed}
        className="space-y-2"
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-transparent p-0">
                    <ChevronDown className={cn("h-5 w-5 transition-all", !emotionMatrixCollapsed ? "transform rotate-180" : "")} />
                  </Button>
                </CollapsibleTrigger>
                <CardTitle className="text-lg flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-primary" />
                  Emotion vs. Performance Matrix
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('Emotion Matrix')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('Emotion Matrix')}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
            <CardDescription>
              Correlate emotional states with trading outcomes to detect behavioral impact on results.
            </CardDescription>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <Tabs defaultValue="preTrade" className="mt-4">
                <TabsList className="mb-2">
                  <TabsTrigger value="preTrade">Pre-Trade Emotions</TabsTrigger>
                  <TabsTrigger value="duringTrade">During-Trade Emotions</TabsTrigger>
                  <TabsTrigger value="postTrade">Post-Trade Emotions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preTrade">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    {emotionPerformanceData.preTrade.map((item) => (
                      <Card key={item.emotion} className="overflow-hidden">
                        <CardHeader className="pb-2" style={{ backgroundColor: `${emotionColors[item.emotion as keyof typeof emotionColors]}20` }}>
                          <CardTitle className="text-base" style={{ color: emotionColors[item.emotion as keyof typeof emotionColors] }}>
                            {item.emotion}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-4">
                          <div className="grid grid-cols-3 text-center">
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-muted-foreground">Win</span>
                              <span className="text-green-500 text-lg font-bold">{item.win}</span>
                              <span className="text-xs text-muted-foreground">trades</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-muted-foreground">Loss</span>
                              <span className="text-red-500 text-lg font-bold">{item.loss}</span>
                              <span className="text-xs text-muted-foreground">trades</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-muted-foreground">BE</span>
                              <span className="text-yellow-500 text-lg font-bold">{item.be}</span>
                              <span className="text-xs text-muted-foreground">trades</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Win Rate:</span>
                              <span className={`font-bold ${item.winRate > 50 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.winRate}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="duringTrade">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    {emotionPerformanceData.duringTrade.map((item) => (
                      <Card key={item.emotion} className="overflow-hidden">
                        <CardHeader className="pb-2" style={{ backgroundColor: `${emotionColors[item.emotion as keyof typeof emotionColors]}20` }}>
                          <CardTitle className="text-base" style={{ color: emotionColors[item.emotion as keyof typeof emotionColors] }}>
                            {item.emotion}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-4">
                          <div className="grid grid-cols-3 text-center">
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-muted-foreground">Win</span>
                              <span className="text-green-500 text-lg font-bold">{item.win}</span>
                              <span className="text-xs text-muted-foreground">trades</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-muted-foreground">Loss</span>
                              <span className="text-red-500 text-lg font-bold">{item.loss}</span>
                              <span className="text-xs text-muted-foreground">trades</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-muted-foreground">BE</span>
                              <span className="text-yellow-500 text-lg font-bold">{item.be}</span>
                              <span className="text-xs text-muted-foreground">trades</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Win Rate:</span>
                              <span className={`font-bold ${item.winRate > 50 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.winRate}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="postTrade">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    {emotionPerformanceData.postTrade.map((item) => (
                      <Card key={item.emotion} className="overflow-hidden">
                        <CardHeader className="pb-2" style={{ backgroundColor: `${emotionColors[item.emotion as keyof typeof emotionColors]}20` }}>
                          <CardTitle className="text-base" style={{ color: emotionColors[item.emotion as keyof typeof emotionColors] }}>
                            {item.emotion}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-4">
                          <div className="grid grid-cols-3 text-center">
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-muted-foreground">Win</span>
                              <span className="text-green-500 text-lg font-bold">{item.win}</span>
                              <span className="text-xs text-muted-foreground">trades</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-muted-foreground">Loss</span>
                              <span className="text-red-500 text-lg font-bold">{item.loss}</span>
                              <span className="text-xs text-muted-foreground">trades</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-medium text-muted-foreground">BE</span>
                              <span className="text-yellow-500 text-lg font-bold">{item.be}</span>
                              <span className="text-xs text-muted-foreground">trades</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Win Rate:</span>
                              <span className={`font-bold ${item.winRate > 50 ? 'text-green-500' : 'text-red-500'}`}>
                                {item.winRate}%
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Insights Summary */}
              <div className="rounded-lg border border-border/50 bg-card p-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Emotional Performance Insights</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Overconfident trades led to the lowest win rate (31%), primarily on Fridays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Trading with a Calm pre-trade emotion resulted in a 71% win rate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Focused during-trade emotion showed the highest profitability (2.1R average)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
