
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Brain,
  ChevronRight,
  Clock,
  Code,
  Dna,
  Fingerprint,
  Heart,
  LineChart,
  BarChart as BarChartIcon,
  Lightbulb,
  Lock,
  PlayCircle,
  RefreshCw,
  Search,
  Settings,
  Sigma,
  Sliders,
  TrendingUp,
  ZoomIn,
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

export function MetaAnalyticsPanel() {
  const [aiMode, setAiMode] = useState('tactical');
  const [selectedTimeframe, setSelectedTimeframe] = useState('3m');

  // Sample data for AI Edge Timeline
  const edgeTimelineData = [
    {
      week: 'Week 12',
      title: 'OB Setup Discovered',
      description: 'First identified Order Block pattern',
      winRate: 56,
      rr: 1.2,
      trades: 12,
    },
    {
      week: 'Week 13',
      title: 'Added ATR for Stop Loss',
      description: 'Improved risk management with ATR',
      winRate: 62,
      rr: 1.5,
      trades: 15,
    },
    {
      week: 'Week 14',
      title: 'OB Win Rate Drop',
      description: 'Post-loss streak performance decreased',
      winRate: 43,
      rr: 0.9,
      trades: 14,
      alert: true,
    },
    {
      week: 'Week 15',
      title: 'Strategy Tweaked',
      description: 'Added confirmation indicators',
      winRate: 67,
      rr: 1.8,
      trades: 18,
      improvement: true,
    },
    {
      week: 'Week 16',
      title: 'Checklist Discipline',
      description: '4/5 trades executed with plan',
      winRate: 71,
      rr: 2.1,
      trades: 14,
      improvement: true,
    },
  ];

  // Sample data for Trader DNA Map
  const traderDnaData = [
    { name: 'Patience', value: 76 },
    { name: 'Discipline', value: 64 },
    { name: 'Risk Mgmt', value: 82 },
    { name: 'Adaptability', value: 58 },
    { name: 'Analysis', value: 79 },
    { name: 'Emotion Ctrl', value: 45 },
    { name: 'Consistency', value: 67 },
    { name: 'Planning', value: 73 },
  ];

  // Sample data for AI Behavioral Correlator
  const behaviorData = [
    {
      behavior: 'Hesitation',
      outcome: -63,
      impact: 'significant negative',
      trades: 28,
      recommendation: 'Use preset orders before session start',
    },
    {
      behavior: 'Journaling',
      outcome: 22,
      impact: 'positive',
      trades: 45,
      recommendation: 'Continue daily trade reviews',
    },
    {
      behavior: 'Post-loss Trading',
      outcome: -71,
      impact: 'severe negative',
      trades: 17,
      recommendation: 'Implement mandatory cool-down period',
    },
    {
      behavior: 'Meditation',
      outcome: 15,
      impact: 'positive',
      trades: 32,
      recommendation: 'Extend pre-session routine by 5 minutes',
    },
    {
      behavior: 'Overtrading',
      outcome: -51,
      impact: 'significant negative',
      trades: 41,
      recommendation: 'Set daily max trade limit with alerts',
    },
  ];

  // Sample data for Edge Amplifier Grid
  const strategyEdgeData = [
    {
      strategy: 'OB Strategy',
      winRate: 73,
      avgRR: 2.1,
      totalTrades: 48,
      status: 'strong',
      trend: 'up',
      note: 'Most consistent in morning sessions',
    },
    {
      strategy: 'FVG',
      winRate: 64,
      avgRR: 1.7,
      totalTrades: 67,
      status: 'overused',
      trend: 'down',
      note: 'Signs of overtrading recently',
    },
    {
      strategy: 'Breaker',
      winRate: 69,
      avgRR: 1.9,
      totalTrades: 35,
      status: 'selective',
      trend: 'stable',
      note: 'Only profitable during London session',
    },
    {
      strategy: 'SMT',
      winRate: 54,
      avgRR: 1.4,
      totalTrades: 22,
      status: 'experimental',
      trend: 'unstable',
      note: 'Still refining entries and exits',
    },
    {
      strategy: 'BOS Retest',
      winRate: 79,
      avgRR: 2.4,
      totalTrades: 19,
      status: 'strong',
      trend: 'up',
      note: 'Emerging strength pattern',
    },
  ];

  // Sample data for Mistake Intelligence Dashboard
  const mistakeData = [
    { name: 'Early Entries', value: 12, fill: '#FF6B6B' },
    { name: 'Late Exits', value: 9, fill: '#FF9E7A' },
    { name: 'FVG Mistakes', value: 3, fill: '#FFC759' },
    { name: 'Stop Too Tight', value: 8, fill: '#E1BB80' },
    { name: 'Overtrading', value: 11, fill: '#5FA8D3' },
    { name: 'FOMO', value: 7, fill: '#62B6CB' },
  ];

  // Sample data for Setup Feedback Loop Engine
  const feedbackLoopData = [
    {
      setup: 'OB Strategy',
      before: 61,
      after: 74,
      change: 'Added EQH confluence',
      impact: 13,
      trades: 24,
      status: 'accepted',
    },
    {
      setup: 'BOS Retest',
      before: 56,
      after: 79,
      change: 'Wait for volume confirmation',
      impact: 23,
      trades: 19,
      status: 'accepted',
    },
    {
      setup: 'Double Top',
      before: 48,
      after: 54,
      change: 'Added RSI filter',
      impact: 6,
      trades: 15,
      status: 'testing',
    },
    {
      setup: 'SMC',
      before: 67,
      after: 63,
      change: 'Tighter stops at 1ATR',
      impact: -4,
      trades: 22,
      status: 'rejected',
    },
  ];

  // Sample data for win/loss bars
  const winLossData = [
    { name: 'Mon', win: 8, loss: 5 },
    { name: 'Tue', win: 12, loss: 3 },
    { name: 'Wed', win: 9, loss: 7 },
    { name: 'Thu', win: 14, loss: 4 },
    { name: 'Fri', win: 11, loss: 9 },
  ];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border p-3 rounded-md shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // AI Therapist suggestions
  const aiTherapistSuggestions = [
    "You're most consistent after meditation sessions. Consider extending your morning routine.",
    "Friday sessions show anxiety patterns. Consider reduced position sizing or taking the day off.",
    "Your emotional control improves when you journal before trading. Make this a daily habit.",
    "Peak focus occurs between 10am-12pm. Schedule your most important trades during this window.",
    "Post-loss recovery is strongest when you step away for 30+ minutes. Implement a mandatory break.",
  ];

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'strong':
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'overused':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'experimental':
      case 'testing':
        return 'bg-amber-100 text-amber-800';
      case 'selective':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default:
        return <TrendingUp className="h-4 w-4 text-blue-600 rotate-90" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">AI Analytics</h2>
          <p className="text-muted-foreground">Advanced intelligence system for trading edge & behavior analysis</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Select value={aiMode} onValueChange={setAiMode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select AI Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tactical">Tactical Mode</SelectItem>
              <SelectItem value="psychological">Psychological Mode</SelectItem>
              <SelectItem value="macro">Macro Mode</SelectItem>
              <SelectItem value="learning">Learning Mode</SelectItem>
              <SelectItem value="shadow">Shadow Mode</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* AI Edge Timeline */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                AI Edge Timeline
              </CardTitle>
              <Button variant="ghost" size="sm">
                View Full History
              </Button>
            </div>
            <CardDescription>Performance changes, behavior patterns, and feedback loops over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="flex space-x-2 mb-4">
                  {edgeTimelineData.map((item, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 p-3 border rounded-lg ${
                        item.alert ? 'border-red-300 bg-red-50/10' : 
                        item.improvement ? 'border-green-300 bg-green-50/10' : 'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-muted-foreground">{item.week}</span>
                        {item.alert && <Badge variant="destructive" className="text-xs">Alert</Badge>}
                        {item.improvement && <Badge variant="success" className="text-xs bg-green-600">Improved</Badge>}
                      </div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-sm font-bold">{item.winRate}%</div>
                          <div className="text-xs text-muted-foreground">Win Rate</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">{item.rr}R</div>
                          <div className="text-xs text-muted-foreground">Avg RR</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold">{item.trades}</div>
                          <div className="text-xs text-muted-foreground">Trades</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="h-[80px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={edgeTimelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 3]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="winRate"
                        stroke="#8884d8"
                        name="Win Rate %"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="rr"
                        stroke="#82ca9d"
                        name="Avg RR"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Trader DNA Map */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Dna className="h-5 w-5 mr-2" />
                Trader DNA Map
              </CardTitle>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
            <CardDescription>Your psychological and technical trading identity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={traderDnaData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Trader DNA"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-1">Preferred Setups</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">OB Sweep</Badge>
                    <Badge variant="secondary" className="text-xs">Breaker Blocks</Badge>
                    <Badge variant="secondary" className="text-xs">SMC</Badge>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-1">Strength Zones</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs bg-green-50/10 text-green-500">High patience</Badge>
                    <Badge variant="outline" className="text-xs bg-green-50/10 text-green-500">Rule-based entry</Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-1">Weak Spots</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs bg-red-50/10 text-red-500">Exit too early</Badge>
                    <Badge variant="outline" className="text-xs bg-red-50/10 text-red-500">FOMO on news days</Badge>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium mb-1">Style Shift</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Swing</span>
                    <div className="h-[6px] flex-1 bg-gray-200 rounded-full">
                      <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-xs">Tactical Scalper</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2 p-2 bg-blue-50/10 border border-blue-200 rounded-md">
                <p className="text-xs text-blue-600 italic">
                  "Best sessions occur after 3-step premarket ritual. Focus improves with systematic planning."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Behavioral Correlator */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Fingerprint className="h-5 w-5 mr-2" />
                AI Behavioral Correlator
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All Behaviors
              </Button>
            </div>
            <CardDescription>Correlation between behaviors and trading outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={behaviorData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[-100, 100]} />
                  <YAxis type="category" dataKey="behavior" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="outcome"
                    fill={(data) => {
                      return data.outcome > 0 ? "#10b981" : "#ef4444";
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Flash Warning</h4>
                <Badge variant="destructive" className="text-xs">High Alert</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Current behavior mirrors your worst trading week (March 14-18). Detected patterns of overtrading after consecutive losses.</p>
              <Button size="sm" variant="outline" className="mt-2 w-full">View Recovery Plan</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Edge Amplifier Grid */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <LineChart className="h-5 w-5 mr-2" />
                Edge Amplifier Grid
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All Strategies
              </Button>
            </div>
            <CardDescription>Smart strategy insights based on dynamic performance data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {strategyEdgeData.map((strategy, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{strategy.strategy}</h4>
                      <Badge className={`mt-1 text-xs ${getStatusColor(strategy.status)}`}>
                        {strategy.status.charAt(0).toUpperCase() + strategy.status.slice(1)}
                      </Badge>
                    </div>
                    {getTrendIcon(strategy.trend)}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div>
                      <div className="text-lg font-bold">{strategy.winRate}%</div>
                      <div className="text-xs text-muted-foreground">Win Rate</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{strategy.avgRR}R</div>
                      <div className="text-xs text-muted-foreground">Avg RR</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{strategy.totalTrades}</div>
                      <div className="text-xs text-muted-foreground">Trades</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground italic">{strategy.note}</div>
                  
                  <div className="mt-2 pt-2 border-t">
                    <div className="text-xs text-blue-600">AI Suggestion:</div>
                    <div className="text-xs">
                      {strategy.status === 'strong' && "Continue using this setup with current parameters."}
                      {strategy.status === 'overused' && "Take a 5-day break from this setup to reset pattern recognition."}
                      {strategy.status === 'selective' && "Only use during optimal session times for maximum edge."}
                      {strategy.status === 'experimental' && "Continue testing with 0.5x normal position sizing."}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Setup Feedback Loop & Mistake Intelligence */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <RefreshCw className="h-5 w-5 mr-2" />
                Setup Feedback Loop Engine
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All Changes
              </Button>
            </div>
            <CardDescription>Track strategy tweaks over time and their impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackLoopData.map((item, i) => (
                <div key={i} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{item.setup}</h4>
                    <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{item.before}%</div>
                      <div className="text-xs text-muted-foreground">Before</div>
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          item.impact > 0 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.abs(item.impact) * 3}%` }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{item.after}%</div>
                      <div className="text-xs text-muted-foreground">After</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Change Applied:</div>
                    <div className="text-sm">{item.change}</div>
                  </div>
                  
                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-muted-foreground">{item.trades} trades analyzed</div>
                    <div className={`text-xs font-medium ${
                      item.impact > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.impact > 0 ? '+' : ''}{item.impact}% Win Rate Impact
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <Button size="sm">Add New Strategy Test</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Mistake Intelligence Dashboard
              </CardTitle>
              <Button variant="ghost" size="sm">
                Deep Dive Analysis
              </Button>
            </div>
            <CardDescription>Automatic clustering and analysis of trading mistakes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mistakeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {mistakeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} occurrences`, 'Mistakes']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-2 border-t pt-3">
              <h4 className="text-sm font-medium mb-2">Root Causes Analysis:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-xs">Overconfidence</span>
                  </div>
                  <Badge variant="outline" className="text-xs">31% of mistakes</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-xs">Tilt / Emotional Trading</span>
                  </div>
                  <Badge variant="outline" className="text-xs">24% of mistakes</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-xs">Morning Rush / Hasty Analysis</span>
                  </div>
                  <Badge variant="outline" className="text-xs">18% of mistakes</Badge>
                </div>
              </div>
              
              <div className="mt-3 p-2 bg-blue-50/10 border border-blue-200 rounded-md">
                <div className="text-xs text-blue-600 font-medium mb-1">AI Summary:</div>
                <p className="text-xs">April entries skewed early with insufficient confirmation. Implement a pre-entry checklist with 3+ conditions before placing orders.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Forecast & AI Trade Therapist */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                AI Forecast & Edge Projection
              </CardTitle>
              <Button variant="ghost" size="sm">
                View Predictions
              </Button>
            </div>
            <CardDescription>AI estimates based on current performance patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={winLossData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="win" fill="#10b981" name="Wins" />
                  <Bar dataKey="loss" fill="#ef4444" name="Losses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4 mt-4">
              <div className="border rounded-lg p-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Edge Projection</h4>
                    <p className="text-xs text-muted-foreground">Based on last 30 days performance</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">If current edge holds, expect 6.5R average next month with 72% win rate across all strategies.</p>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Code className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Behavioral Impact</h4>
                    <p className="text-xs text-muted-foreground">What-if scenario calculator</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">Cutting rule violations by 15% would result in +2.3R/week improvement (approx. 9.2R monthly).</p>
              </div>
              
              <div className="border rounded-lg p-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <ZoomIn className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Strategy Focus</h4>
                    <p className="text-xs text-muted-foreground">Recommended allocation</p>
                  </div>
                </div>
                <p className="mt-2 text-sm">Breaker Block strategy showing 27% edge increase. Consider increasing allocation from 15% to 25% of trades.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Trade Therapist
              </CardTitle>
              <Button variant="ghost" size="sm">
                Ask Question
              </Button>
            </div>
            <CardDescription>LLM-based behavioral feedback and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="italic text-sm">"Your personalized behavioral insights are based on 143 trades over the last 90 days."</p>
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {aiTherapistSuggestions.map((suggestion, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-sm">Insight #{i + 1}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm mb-2">{suggestion}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          Get Tips
                        </Button>
                        <Button variant="outline" size="sm" className="h-7 text-xs">
                          <PlayCircle className="h-3 w-3 mr-1" />
                          Practice
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Heart className="h-4 w-4 text-red-500 mr-1" />
                  Mental Recovery Protocol
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="check1" />
                    <Label htmlFor="check1" className="ml-2 text-sm">5-minute meditation after losses</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="check2" />
                    <Label htmlFor="check2" className="ml-2 text-sm">Journal emotions before next trade</Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="check3" />
                    <Label htmlFor="check3" className="ml-2 text-sm">Box breathing (4 counts in, hold, out, hold)</Label>
                  </div>
                </div>
                
                <Button size="sm" className="w-full mt-3">Generate Personalized Protocol</Button>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="relative">
                <Input
                  placeholder="Ask your AI Trade Therapist a question..."
                  className="pr-10"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Trade Review Summary */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <BarChartIcon className="h-5 w-5 mr-2" />
                AI Trade Review Summary
              </CardTitle>
              <div className="flex gap-2">
                <Select defaultValue="week">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Day</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="month">Month</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm">
                  View Full Journal
                </Button>
              </div>
            </div>
            <CardDescription>Auto-generated reviews in your voice and trading style</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Weekly Summary: April 22-26, 2025</h3>
                <Badge variant="outline">24 Trades</Badge>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm">
                  This week showed significant improvement in my OB execution. Tuesday's trades were particularly strong, with all 5 OB setups hitting targets cleanly. I'm seeing the benefits of waiting for volume confirmation before entry—win rate on these specific setups jumped from 61% to 74%.
                </p>
                
                <p className="text-sm">
                  Thursday showed some emotional instability after two consecutive losses. I noticed I rushed into the next three trades without proper confirmation, resulting in two more losses. Need to implement the 15-minute cool-down period after consecutive losses as planned.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                        <div className="text-lg font-bold">68%</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Total R</div>
                        <div className="text-lg font-bold">+12.4R</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Avg RR</div>
                        <div className="text-lg font-bold">1.9R</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Plan Adherence</div>
                        <div className="text-lg font-bold">83%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Top Mistakes</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Early Entry</span>
                        <Badge variant="outline" className="text-xs">4 times</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Moving Stop Loss</span>
                        <Badge variant="outline" className="text-xs">3 times</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Overtrading</span>
                        <Badge variant="outline" className="text-xs">2 times</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <h4 className="text-sm font-medium mb-2">Best Session</h4>
                    <div className="text-sm mb-1">Tuesday, April 23</div>
                    <div className="text-xs text-muted-foreground mb-2">London Session</div>
                    
                    <div className="grid grid-cols-3 gap-1 text-center">
                      <div>
                        <div className="text-lg font-bold">7</div>
                        <div className="text-xs text-muted-foreground">Trades</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">86%</div>
                        <div className="text-xs text-muted-foreground">Win Rate</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">5.8R</div>
                        <div className="text-xs text-muted-foreground">Total R</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">AI Recommendations:</h4>
                  <ol className="text-sm list-decimal pl-5 space-y-1">
                    <li>Implement strict 15-minute cooling period after consecutive losses.</li>
                    <li>Continue using the volume confirmation technique that's boosting OB win rate.</li>
                    <li>Consider pre-session meditation specifically on Thursdays (pattern of anxiety detected).</li>
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
