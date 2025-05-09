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
  LineChart as LineChartIcon,
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
  const [activeTab, setActiveTab] = useState('ai-edge');
  const [strategyFilter, setStrategyFilter] = useState('all');
  const [timeframeFilter, setTimeframeFilter] = useState('7d');
  const [selectedMistake, setSelectedMistake] = useState(null);
  const [forecastAccuracy, setForecastAccuracy] = useState(78);

  const setupData = [
    { name: 'OB', successRate: 65, trend: 'up' },
    { name: 'Breaker', successRate: 58, trend: 'down' },
    { name: '200 EMA', successRate: 72, trend: 'up' },
    { name: 'VWAP', successRate: 68, trend: 'flat' },
  ];

  const mistakeData = [
    { name: 'Overtrading', count: 12, impact: -8 },
    { name: 'FOMO', count: 8, impact: -15 },
    { name: 'Revenge Trading', count: 5, impact: -22 },
    { name: 'Ignoring Signals', count: 10, impact: -10 },
  ];

  const behaviorData = [
    { behavior: 'Impatience', outcome: -65 },
    { behavior: 'Overconfidence', outcome: -45 },
    { behavior: 'Discipline', outcome: 80 },
    { behavior: 'Adaptability', outcome: 60 },
  ];

  const strategyData = [
    { name: 'OB', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Breaker', uv: 3000, pv: 1398, amt: 2210 },
    { name: '200 EMA', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'VWAP', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'ABCD', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Trendline', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Fibonacci', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-2 rounded-md shadow-md">
          <p className="font-semibold">{`${label}`}</p>
          <p>{`Success Rate: ${payload[0].value}%`}</p>
        </div>
      );
    }

    return null;
  };

  // AI Therapist suggestions
  const aiTherapistSuggestions = [
    {
      id: 1,
      title: 'Focus on High Probability Setups',
      description: 'Prioritize setups with a proven track record to improve consistency.',
      icon: Lightbulb,
    },
    {
      id: 2,
      title: 'Manage Emotional Trading',
      description: 'Implement strategies to control impulses and stick to your trading plan.',
      icon: Heart,
    },
    {
      id: 3,
      title: 'Review and Adjust Strategy',
      description: 'Regularly analyze your performance and make necessary adjustments to your approach.',
      icon: Settings,
    },
  ];

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      case 'flat':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  // Function to get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      case 'flat':
        return <Sigma className="h-4 w-4 text-gray-500" />;
      default:
        return <Sigma className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Meta Analytics</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Select onValueChange={(value) => setTimeframeFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Last 7 Days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last 1 Year</SelectItem>
            </SelectContent>
          </Select>
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
                View Full Timeline
              </Button>
            </div>
            <CardDescription>Key moments and insights from your trading history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium">Recent AI Events</h4>
              <Badge variant="outline">5 New</Badge>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span>AI Identified Overtrading Pattern</span>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  AI detected a pattern of increased trading frequency after a series of losses. Consider taking a break to reset.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-2">
                      <ZoomIn className="h-4 w-4 text-blue-500" />
                      <span>AI Detected High Probability Setup</span>
                    </div>
                    <span className="text-xs text-muted-foreground">5 hours ago</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  AI identified a high probability setup based on your historical data. Check your journal for similar setups.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex justify-between w-full items-center">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-red-500" />
                      <span>AI Flagged Potential Revenge Trade</span>
                    </div>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  AI flagged a potential revenge trade based on your recent trading behavior. Review your trading plan before proceeding.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
                View Full Report
              </Button>
            </div>
            <CardDescription>Unique insights into your trading style and tendencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[{
                  discipline: 85,
                  riskTolerance: 70,
                  patience: 60,
                  adaptability: 90,
                  focus: 80,
                }]}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-medium">Key Traits</h4>
              <p className="text-xs text-muted-foreground">Based on your trading history, you show high adaptability and discipline, but could improve patience.</p>
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
                    fill="#8884d8"
                    name="Outcome"
                  >
                    {behaviorData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.outcome > 0 ? "#10b981" : "#ef4444"} 
                      />
                    ))}
                  </Bar>
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
                <LineChartIcon className="h-5 w-5 mr-2" />
                Edge Amplifier Grid
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All Strategies
              </Button>
            </div>
            <CardDescription>Smart strategy insights based on dynamic performance data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium">Strategy Performance</h4>
              <Select onValueChange={(value) => setStrategyFilter(value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Strategies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Strategies</SelectItem>
                  <SelectItem value="ob">Order Block</SelectItem>
                  <SelectItem value="breaker">Breaker</SelectItem>
                  <SelectItem value="ema">200 EMA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={strategyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Setup Feedback Loop */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Setup Feedback Loop
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All Setups
              </Button>
            </div>
            <CardDescription>Track performance of your favorite trading setups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {setupData.map((setup) => (
                <div key={setup.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(setup.trend)}
                    <span>{setup.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{setup.successRate}%</span>
                    <Badge variant="outline" className={getStatusColor(setup.trend)}>
                      {setup.trend.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-medium">Top Setup</h4>
              <p className="text-xs text-muted-foreground">Based on your data, the 200 EMA setup has the highest success rate.</p>
            </div>
          </CardContent>
        </Card>

        {/* Mistake Intelligence */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Mistake Intelligence
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All Mistakes
              </Button>
            </div>
            <CardDescription>Identify and analyze your most common trading mistakes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mistakeData.map((mistake) => (
                <div key={mistake.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span>{mistake.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{mistake.count}</span>
                    <Badge variant="destructive">Impact: {mistake.impact}%</Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-medium">Biggest Mistake</h4>
              <p className="text-xs text-muted-foreground">Based on your data, Revenge Trading has the highest negative impact on your performance.</p>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Forecast */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                AI Forecast
              </CardTitle>
              <Button variant="ghost" size="sm">
                View Full Forecast
              </Button>
            </div>
            <CardDescription>Predictive analysis of your trading performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium">Accuracy</h4>
              <Badge variant="outline">{forecastAccuracy}%</Badge>
            </div>
            <div className="h-[200px] flex items-center justify-center">
              <svg width="120" height="120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#ccc" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#007bff"
                  strokeWidth="10"
                  strokeDasharray={`${forecastAccuracy * 3.14} ${314 - forecastAccuracy * 3.14}`}
                  transform="rotate(-90, 60, 60)"
                />
                <text x="60" y="60" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold">
                  {forecastAccuracy}%
                </text>
              </svg>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-medium">Next Week</h4>
              <p className="text-xs text-muted-foreground">AI predicts a 15% increase in profitability if you maintain current discipline.</p>
            </div>
          </CardContent>
        </Card>

        {/* AI Trade Therapist */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                AI Trade Therapist
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All Suggestions
              </Button>
            </div>
            <CardDescription>Personalized advice to improve your trading mindset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiTherapistSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-start gap-3">
                  <suggestion.icon className="h-5 w-5 text-blue-500" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">{suggestion.title}</h4>
                    <p className="text-xs text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 border-t pt-4">
              <Button size="sm" variant="outline" className="w-full">
                Get Personalized Advice
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Trade Review Summary */}
        <Card className="xl:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <PlayCircle className="h-5 w-5 mr-2" />
                AI Trade Review Summary
              </CardTitle>
              <Button variant="ghost" size="sm">
                View Full Report
              </Button>
            </div>
            <CardDescription>Key insights from your most recent trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Top 3 Trades</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>Trade #1</span>
                      <Badge variant="success">+2.5%</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>Trade #2</span>
                      <Badge variant="success">+1.8%</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>Trade #3</span>
                      <Badge variant="destructive">-0.7%</Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Key Insights</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>AI identified a pattern of successful trades during the morning session.</li>
                  <li>Overtrading was a significant factor in losing trades.</li>
                  <li>Setups based on the 200 EMA had the highest success rate.</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 border-t pt-4">
              <Button size="sm" variant="outline" className="w-full">
                Generate Personalized Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
