
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
  LineChart,
  BarChart,
  ArrowRight,
  FileSpreadsheet,
  Clock,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Trophy,
  Shield,
  Target,
  Flag,
  Radar,
  Zap,
  Award,
} from 'lucide-react';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
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

// Sample data for Cognitive Bias Profile
const cognitiveBiasData = [
  { bias: 'Confirmation', value: 68 },
  { bias: 'Loss Aversion', value: 85 },
  { bias: 'FOMO', value: 72 },
  { bias: 'Sunk Cost', value: 45 },
  { bias: 'Gambler\'s Fallacy', value: 38 },
  { bias: 'Overconfidence', value: 64 },
  { bias: 'Anchoring', value: 57 },
];

// Sample data for Mindset vs. Result
const mindsetResultData = [
  { mindset: 'Confident', winRate: 65, lossRate: 35, trades: 42 },
  { mindset: 'Uncertain', winRate: 35, lossRate: 65, trades: 28 },
  { mindset: 'Neutral', winRate: 68, lossRate: 32, trades: 53 },
  { mindset: 'Overstimulated', winRate: 41, lossRate: 59, trades: 22 },
  { mindset: 'Avoidant', winRate: 48, lossRate: 52, trades: 19 },
  { mindset: 'Resigned', winRate: 30, lossRate: 70, trades: 14 },
];

// Sample data for Behavioral Goals
const behavioralGoalsData = [
  { 
    id: 1, 
    title: 'Follow trading plan 5 days in a row', 
    progress: 80, 
    streakDays: 4, 
    target: 5,
    category: 'Discipline',
    isComplete: false,
    dueDate: '2023-06-01',
  },
  { 
    id: 2, 
    title: 'Journal after every trade for 1 week', 
    progress: 100, 
    streakDays: 7, 
    target: 7,
    category: 'Journaling',
    isComplete: true,
    dueDate: '2023-05-28',
  },
  { 
    id: 3, 
    title: 'Avoid revenge trades for 10 sessions', 
    progress: 60, 
    streakDays: 6, 
    target: 10,
    category: 'Emotional Control',
    isComplete: false,
    dueDate: '2023-06-05',
  },
  { 
    id: 4, 
    title: 'Practice breathing before each session', 
    progress: 40, 
    streakDays: 2, 
    target: 5,
    category: 'Mindfulness',
    isComplete: false,
    dueDate: '2023-06-03',
  },
];

// Sample data for Resilience Monitor
const resilienceData = [
  { week: 'Week 1', score: 45, recoveryTime: 12 },
  { week: 'Week 2', score: 53, recoveryTime: 10 },
  { week: 'Week 3', score: 48, recoveryTime: 11 },
  { week: 'Week 4', score: 62, recoveryTime: 8 },
  { week: 'Week 5', score: 68, recoveryTime: 7 },
  { week: 'Week 6', score: 75, recoveryTime: 5 },
  { week: 'Week 7', score: 72, recoveryTime: 6 },
  { week: 'Week 8', score: 82, recoveryTime: 4 },
];

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

// Bias colors
const biasColors = {
  Confirmation: '#60a5fa',
  'Loss Aversion': '#f87171',
  'FOMO': '#fb923c',
  'Sunk Cost': '#a78bfa',
  'Gambler\'s Fallacy': '#34d399',
  'Overconfidence': '#f43f5e',
  'Anchoring': '#8b5cf6',
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
  const [cognitiveBiasCollapsed, setCognitiveBiasCollapsed] = useState(false);
  const [mindsetResultCollapsed, setMindsetResultCollapsed] = useState(false);
  const [behavioralGoalsCollapsed, setBehavioralGoalsCollapsed] = useState(false);
  const [resilienceCollapsed, setResilienceCollapsed] = useState(false);
  const [biasFilter, setBiasFilter] = useState('all');
  const [mindsetFilter, setMindsetFilter] = useState('all');
  const [goalStatus, setGoalStatus] = useState('all');
  const [resilienceFilter, setResilienceFilter] = useState('8w');
  
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

  const handleExportAll = () => {
    showToast({
      title: "Full Export Started",
      description: "Complete psychological data will be downloaded shortly.",
    });
    // Here we would implement actual export functionality for all data
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Psychological Behavior & Performance Insights</h2>
            <p className="text-muted-foreground">Understand and improve your trading psychology using AI-powered behavioral analytics</p>
          </div>
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
          <Button variant="outline" onClick={handleExportAll} className="gap-2">
            <Download className="h-4 w-4" />
            Export All Data
          </Button>
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
                  <RechartsLineChart
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
                  </RechartsLineChart>
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
                      <RechartsBarChart
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
                      </RechartsBarChart>
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

      {/* 4. Cognitive Bias Profile */}
      <Collapsible
        open={!cognitiveBiasCollapsed}
        onOpenChange={setCognitiveBiasCollapsed}
        className="space-y-2"
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-transparent p-0">
                    <ChevronDown className={cn("h-5 w-5 transition-all", !cognitiveBiasCollapsed ? "transform rotate-180" : "")} />
                  </Button>
                </CollapsibleTrigger>
                <CardTitle className="text-lg flex items-center">
                  <Radar className="h-5 w-5 mr-2 text-primary" />
                  Cognitive Bias Profile
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select onValueChange={setBiasFilter} value={biasFilter}>
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
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('Cognitive Bias')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('Cognitive Bias')}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
            <CardDescription>
              Detect recurring mental biases affecting your trading decisions and visualize their impact.
            </CardDescription>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="lg:col-span-2 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={cognitiveBiasData}>
                      <PolarGrid stroke="#333" />
                      <PolarAngleAxis dataKey="bias" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <RechartsRadar
                        name="Bias Level"
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Intensity']}
                        contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', borderColor: 'rgba(63, 63, 70, 0.5)', borderRadius: '0.375rem' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h4 className="font-semibold text-md mb-4">Dominant Biases</h4>
                  <div className="space-y-3">
                    {cognitiveBiasData
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 3)
                      .map((bias) => (
                        <div key={bias.bias} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: biasColors[bias.bias as keyof typeof biasColors] || '#888' }}
                            />
                            <span>{bias.bias}</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={bias.value > 75 ? "text-red-500" : bias.value > 50 ? "text-amber-500" : "text-green-500"}
                          >
                            {bias.value}%
                          </Badge>
                        </div>
                      ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold text-md mb-3">Bias Tag Cloud</h4>
                    <div className="flex flex-wrap gap-2">
                      {cognitiveBiasData.map((bias) => (
                        <Badge 
                          key={bias.bias}
                          variant="outline" 
                          style={{ 
                            fontSize: `${Math.max(0.7, Math.min(1.4, bias.value / 60))}rem`,
                            borderColor: biasColors[bias.bias as keyof typeof biasColors] || '#888'
                          }}
                        >
                          {bias.bias}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Insights Feed */}
              <div className="mt-6 border-t border-border pt-6">
                <h4 className="font-semibold text-md mb-4">Bias Insight Feed</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-background/50 border-red-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">FOMO Detection</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            FOMO triggered 3 of your 5 largest losses this month, primarily on NFP days.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/50 border-amber-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Loss Aversion</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Loss Aversion bias detected in 71% of your BE trades, reducing potential profit.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/50 border-blue-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Confirmation Bias</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            You tend to ignore conflicting indicators after forming a directional bias.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background/50 border-green-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Bias Improvement</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Anchoring bias has decreased by 18% since using your new checklist.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 5. Mindset vs. Result Correlation */}
      <Collapsible
        open={!mindsetResultCollapsed}
        onOpenChange={setMindsetResultCollapsed}
        className="space-y-2"
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-transparent p-0">
                    <ChevronDown className={cn("h-5 w-5 transition-all", !mindsetResultCollapsed ? "transform rotate-180" : "")} />
                  </Button>
                </CollapsibleTrigger>
                <CardTitle className="text-lg flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-primary" />
                  Mindset-Outcome Correlation
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select onValueChange={setMindsetFilter} value={mindsetFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="All Days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Days</SelectItem>
                    <SelectItem value="mon">Monday</SelectItem>
                    <SelectItem value="tue">Tuesday</SelectItem>
                    <SelectItem value="wed">Wednesday</SelectItem>
                    <SelectItem value="thu">Thursday</SelectItem>
                    <SelectItem value="fri">Friday</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('Mindset Analysis')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('Mindset Analysis')}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
            <CardDescription>
              Visualize how different mindsets correlate with win/loss performance and trade outcomes.
            </CardDescription>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={mindsetResultData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="mindset" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={(value, name) => {
                        return [`${value}%`, name === 'winRate' ? 'Win Rate' : 'Loss Rate'];
                      }}
                      contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', borderColor: 'rgba(63, 63, 70, 0.5)', borderRadius: '0.375rem' }}
                    />
                    <Legend />
                    <Bar dataKey="winRate" name="Win Rate" fill="#4ade80" />
                    <Bar dataKey="lossRate" name="Loss Rate" fill="#ef4444" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Emotional Zones Map */}
              <div className="mt-6">
                <h4 className="font-semibold text-md mb-4">Emotional Trading Zones</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-green-950/30 border-green-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-green-500">Healthy Zone</CardTitle>
                      <CardDescription>Optimal trading mindsets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Neutral</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Confident</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          68% average win rate in this zone
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-amber-950/30 border-amber-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-amber-500">Caution Zone</CardTitle>
                      <CardDescription>Potential risk mindsets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">Uncertain</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <span className="text-sm">Avoidant</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          42% average win rate in this zone
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-red-950/30 border-red-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-red-500">Danger Zone</CardTitle>
                      <CardDescription>High risk mindsets</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Overstimulated</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">Resigned</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          35% average win rate in this zone
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* AI Summary Bubble */}
              <div className="rounded-lg border border-border/50 bg-card p-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Mindset Performance AI Insights</h4>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Neutral mindset leads to your highest win rate (68%) and most consistent R-multiple</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <span>Avoidant mindset trades show inconsistent execution and frequent missed opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>Resigned mindset is most common after 2+ losing trades and leads to your worst win rate</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 6. Behavioral Goal Tracker */}
      <Collapsible
        open={!behavioralGoalsCollapsed}
        onOpenChange={setBehavioralGoalsCollapsed}
        className="space-y-2"
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-transparent p-0">
                    <ChevronDown className={cn("h-5 w-5 transition-all", !behavioralGoalsCollapsed ? "transform rotate-180" : "")} />
                  </Button>
                </CollapsibleTrigger>
                <CardTitle className="text-lg flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Behavioral Goal Tracker
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select onValueChange={setGoalStatus} value={goalStatus}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All Goals" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Goals</SelectItem>
                    <SelectItem value="active">Active Goals</SelectItem>
                    <SelectItem value="completed">Completed Goals</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('Behavioral Goals')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('Behavioral Goals')}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
            <CardDescription>
              Set and track psychology-driven behavioral goals to build discipline and consistency.
            </CardDescription>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {/* Goal Progress Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {behavioralGoalsData.map((goal) => (
                  <Card key={goal.id} className={cn(
                    "overflow-hidden",
                    goal.isComplete ? "border-green-500/30" : ""
                  )}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-sm">{goal.title}</h4>
                        {goal.isComplete && (
                          <Badge variant="success" className="ml-2">
                            Complete
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{goal.streakDays}/{goal.target} Days</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${goal.isComplete ? 'bg-green-500' : 'bg-blue-500'} rounded-full`}
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between pt-1 text-xs text-muted-foreground">
                        <Badge variant="outline" className="font-normal">
                          {goal.category}
                        </Badge>
                        <span>Due: {new Date(goal.dueDate).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Add New Goal Button */}
              <div className="mt-4">
                <Button variant="outline" className="w-full border-dashed">
                  + Add New Behavioral Goal
                </Button>
              </div>
              
              {/* Calendar View */}
              <div className="mt-6">
                <h4 className="font-semibold text-md mb-4">Goal Achievement Calendar</h4>
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <div key={i} className="text-xs font-medium text-muted-foreground py-1">
                          {day}
                        </div>
                      ))}
                      
                      {Array.from({ length: 28 }).map((_, index) => {
                        // Generate some sample data for the calendar
                        const completionRate = Math.random();
                        let bgColor = 'bg-muted';
                        
                        if (completionRate > 0.8) bgColor = 'bg-green-500/30';
                        else if (completionRate > 0.5) bgColor = 'bg-amber-500/30';
                        else if (completionRate > 0) bgColor = 'bg-red-500/30';
                        
                        return (
                          <div 
                            key={index}
                            className={`rounded-md aspect-square flex items-center justify-center text-xs ${bgColor}`}
                          >
                            {index + 1}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Insight Summary */}
              <div className="rounded-lg border border-border/50 bg-card p-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Goal Achievement Insights</h4>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm">Monthly Goal Success Rate:</span>
                  <Badge variant="outline" className="text-green-500">86%</Badge>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>You've hit 86% of your behavioral goals this month – excellent consistency!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <span>Your success rate drops when emotional volatility is high – consider mindfulness goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                    <span>Adding a daily checklist review goal would complement your existing routines</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* 7. Recovery & Resilience Monitor */}
      <Collapsible
        open={!resilienceCollapsed}
        onOpenChange={setResilienceCollapsed}
        className="space-y-2"
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
              <div className="flex items-center gap-2">
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-transparent p-0">
                    <ChevronDown className={cn("h-5 w-5 transition-all", !resilienceCollapsed ? "transform rotate-180" : "")} />
                  </Button>
                </CollapsibleTrigger>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Recovery & Resilience
                </CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select onValueChange={setResilienceFilter} value={resilienceFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Last 8 Weeks" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="8w">Last 8 Weeks</SelectItem>
                    <SelectItem value="4w">Last 4 Weeks</SelectItem>
                    <SelectItem value="3m">Last 3 Months</SelectItem>
                    <SelectItem value="6m">Last 6 Months</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => handleExportCSV('Resilience Data')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleExportPDF('Resilience Report')}>
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Button>
              </div>
            </div>
            <CardDescription>
              Track how quickly and effectively you recover after trading setbacks.
            </CardDescription>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
                {/* Resilience Score Meter */}
                <Card className="bg-background/50 lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Resilience Score</CardTitle>
                    <CardDescription>Current mental recovery rating</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 flex justify-center">
                    <div className="relative h-[200px] w-[200px] mt-2">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#333"
                          strokeWidth="12"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#4ade80"
                          strokeWidth="12"
                          strokeDasharray={`${82 * 5.02} ${100 * 5.02}`}
                          strokeDashoffset={25}
                          transform="rotate(-90, 100, 100)"
                        />
                        <text
                          x="100"
                          y="110"
                          textAnchor="middle"
                          fontSize="36"
                          fontWeight="bold"
                          fill="currentColor"
                        >
                          82
                        </text>
                        <text
                          x="100"
                          y="130"
                          textAnchor="middle"
                          fontSize="12"
                          fill="#888"
                        >
                          out of 100
                        </text>
                      </svg>
                      <div className="absolute bottom-0 w-full text-center">
                        <Badge 
                          variant="outline" 
                          className="text-green-500 font-normal"
                        >
                          Excellent
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Resilience Trend Chart */}
                <div className="lg:col-span-3 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={resilienceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" domain={[0, 100]} />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 15]} />
                      <Tooltip
                        formatter={(value, name) => {
                          if (name === 'score') return [`${value}/100`, 'Resilience Score'];
                          return [`${value} hours`, 'Recovery Time'];
                        }}
                        contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', borderColor: 'rgba(63, 63, 70, 0.5)', borderRadius: '0.375rem' }}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="score"
                        stroke="#4ade80"
                        name="Resilience Score"
                        strokeWidth={3}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="recoveryTime"
                        stroke="#f43f5e"
                        name="Recovery Time"
                        strokeWidth={3}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Recovery Metrics */}
                <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Avg Recovery Time</div>
                      <div className="mt-1 text-2xl font-bold text-blue-500">4.2 hrs</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">time to regain trading confidence</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Post-Loss Discipline</div>
                      <div className="mt-1 text-2xl font-bold text-green-500">72%</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">trades following plan after a loss</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Emotional Stability</div>
                      <div className="mt-1 text-2xl font-bold text-purple-500">69/100</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">consistency in emotional response</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-background/50">
                    <CardContent className="p-4 flex flex-col">
                      <div className="text-sm font-medium text-muted-foreground">Bounce-Back Quality</div>
                      <div className="mt-1 text-2xl font-bold text-amber-500">B+</div>
                      <div className="mt-auto pt-2 text-xs text-muted-foreground">quality of first trade after loss</div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* AI Summary Bubble */}
                <div className="lg:col-span-4 rounded-lg border border-border/50 bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Resilience AI Insights</h4>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Your resilience score has improved by 37 points in 8 weeks - excellent progress!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>You bounce back faster (4.2 hrs vs 7.5 hrs) when journaling immediately after losses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <span>Recovery time increases by 30% when losses occur in the afternoon session</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
}
