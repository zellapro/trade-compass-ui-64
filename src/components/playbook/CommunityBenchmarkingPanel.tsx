
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { showToast } from "@/components/playbook/fixedToast";
import { cn } from "@/lib/utils";
import {
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  Users,
  TrendingUp,
  Shield,
  Trophy,
  Sparkles,
  Award,
  Eye,
  EyeOff,
  Settings,
  ChevronRight,
  Filter,
  ArrowUp,
  ArrowDown,
  BarChart,
  BarChart2,
  Activity,
  Heart,
  PieChart,
  Star
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
  Legend,
  Cell,
  PieChart as RechartsPieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar
} from "recharts";

// Mock data for benchmarking
const userPerformance = {
  winRate: 62,
  avgR: 1.3,
  profitFactor: 1.9,
  expectancy: 0.8,
  tradesPerWeek: 22,
  biggestWinner: 4.5,
  consistencyScore: 76
};

// Community benchmark data
const communityBenchmarks = {
  winRate: {
    average: 48,
    top10Pct: 68,
    yourPercentile: 78
  },
  avgR: {
    average: 0.8,
    top10Pct: 1.5,
    yourPercentile: 62
  },
  profitFactor: {
    average: 1.4,
    top10Pct: 2.2,
    yourPercentile: 70
  },
  expectancy: {
    average: 0.4,
    top10Pct: 1.0,
    yourPercentile: 85
  },
  tradesPerWeek: {
    average: 15,
    top10Pct: 25,
    yourPercentile: 65
  },
  biggestWinner: {
    average: 3.2,
    top10Pct: 5.0,
    yourPercentile: 48
  },
  consistencyScore: {
    average: 60,
    top10Pct: 82,
    yourPercentile: 72
  }
};

// Mock data for comparison filters
const comparisonFilters = {
  strategy: [
    { id: "all", name: "All Strategies" },
    { id: "price-action", name: "Price Action" },
    { id: "indicator", name: "Indicator-Based" },
    { id: "momentum", name: "Momentum" },
    { id: "breakout", name: "Breakout" },
    { id: "reversal", name: "Reversal" }
  ],
  timeframe: [
    { id: "all", name: "All Timeframes" },
    { id: "intraday", name: "Intraday" },
    { id: "swing", name: "Swing" },
    { id: "position", name: "Position" }
  ],
  instrument: [
    { id: "all", name: "All Instruments" },
    { id: "forex", name: "Forex" },
    { id: "crypto", name: "Crypto" },
    { id: "futures", name: "Futures" },
    { id: "stocks", name: "Stocks" },
    { id: "options", name: "Options" }
  ],
  experience: [
    { id: "all", name: "All Experience Levels" },
    { id: "beginner", name: "Beginner (<1 year)" },
    { id: "intermediate", name: "Intermediate (1-3 years)" },
    { id: "advanced", name: "Advanced (3-5 years)" },
    { id: "expert", name: "Expert (5+ years)" }
  ]
};

// Mock leaderboard data
const leaderboardData = [
  { id: "user-1", handle: "TradingNinja", winRate: 72, avgR: 2.1, profitFactor: 2.8, rank: 1 },
  { id: "user-2", handle: "MomentumHunter", winRate: 68, avgR: 1.9, profitFactor: 2.5, rank: 2 },
  { id: "user-3", handle: "PatternTrader", winRate: 65, avgR: 1.8, profitFactor: 2.4, rank: 3 },
  { id: "user-4", handle: "EdgeFinder", winRate: 64, avgR: 1.7, profitFactor: 2.3, rank: 4 },
  { id: "user-5", handle: "SwingMaster", winRate: 63, avgR: 1.6, profitFactor: 2.2, rank: 5 },
  { id: "current-user", handle: "You", winRate: 62, avgR: 1.3, profitFactor: 1.9, rank: 8 },
  { id: "user-6", handle: "DayTraderPro", winRate: 61, avgR: 1.5, profitFactor: 2.1, rank: 6 },
  { id: "user-7", handle: "ConsistentCapital", winRate: 60, avgR: 1.4, profitFactor: 2.0, rank: 7 },
  { id: "user-8", handle: "AlphaSeeker", winRate: 59, avgR: 1.2, profitFactor: 1.8, rank: 9 },
  { id: "user-9", handle: "MarketWizard", winRate: 58, avgR: 1.1, profitFactor: 1.7, rank: 10 }
];

// Mock distribution comparison data
const distributionData = [
  { bin: "< -3R", you: 2, community: 8 },
  { bin: "-3R to -2R", you: 4, community: 10 },
  { bin: "-2R to -1R", you: 12, community: 12 },
  { bin: "-1R to 0", you: 20, community: 22 },
  { bin: "0 to 1R", you: 24, community: 20 },
  { bin: "1R to 2R", you: 22, community: 15 },
  { bin: "2R to 3R", you: 10, community: 8 },
  { bin: "3R+", you: 6, community: 5 }
];

// Mock strategy comparison data
const strategyComparisonData = [
  { name: "Win Rate", you: 62, community: 48, topPerformers: 68 },
  { name: "Avg R", you: 1.3, community: 0.8, topPerformers: 1.5 },
  { name: "Profit Factor", you: 1.9, community: 1.4, topPerformers: 2.2 },
  { name: "Expectancy", you: 0.8, community: 0.4, topPerformers: 1.0 },
  { name: "Consistency", you: 76, community: 60, topPerformers: 82 }
];

// Mock radar chart data
const radarChartData = [
  {
    subject: "Win Rate",
    You: 80,
    Community: 60,
    TopPerformers: 90,
    fullMark: 100,
  },
  {
    subject: "Avg R",
    You: 70,
    Community: 50,
    TopPerformers: 85,
    fullMark: 100,
  },
  {
    subject: "Consistency",
    You: 75,
    Community: 60,
    TopPerformers: 80,
    fullMark: 100,
  },
  {
    subject: "Volume",
    You: 60,
    Community: 70,
    TopPerformers: 75,
    fullMark: 100,
  },
  {
    subject: "Psychology",
    You: 85,
    Community: 55,
    TopPerformers: 90,
    fullMark: 100,
  },
];

export function CommunityBenchmarkingPanel() {
  const [communityEnabled, setCommunityEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStrategy, setSelectedStrategy] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [selectedInstrument, setSelectedInstrument] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const handleCommunityToggle = () => {
    setCommunityEnabled(!communityEnabled);
    
    showToast({
      title: communityEnabled ? "Community Comparison Disabled" : "Community Comparison Enabled",
      description: communityEnabled 
        ? "Your data will not be anonymously shared with the community." 
        : "Your data will be anonymously shared and used for community benchmarking."
    });
  };
  
  const getPercentileColor = (percentile: number) => {
    if (percentile >= 80) return "text-green-500";
    if (percentile >= 50) return "text-blue-500";
    return "text-amber-500";
  };
  
  const getComparisonIcon = (value: number, benchmark: number) => {
    if (value > benchmark) {
      return <ArrowUp className="h-3.5 w-3.5 text-green-500" />;
    }
    if (value < benchmark) {
      return <ArrowDown className="h-3.5 w-3.5 text-red-500" />;
    }
    return null;
  };

  return (
    <Card className="shadow-xl border-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Community Benchmarking
            </CardTitle>
            <CardDescription>Compare your performance with similar traders</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="community-comparison" className={communityEnabled ? "text-primary" : "text-muted-foreground"}>
              {communityEnabled ? "Enabled" : "Disabled"}
            </Label>
            <Switch
              id="community-comparison"
              checked={communityEnabled}
              onCheckedChange={handleCommunityToggle}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Strategy" />
            </SelectTrigger>
            <SelectContent>
              {comparisonFilters.strategy.map(strategy => (
                <SelectItem key={strategy.id} value={strategy.id}>
                  {strategy.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              {comparisonFilters.timeframe.map(timeframe => (
                <SelectItem key={timeframe.id} value={timeframe.id}>
                  {timeframe.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Instrument" />
            </SelectTrigger>
            <SelectContent>
              {comparisonFilters.instrument.map(instrument => (
                <SelectItem key={instrument.id} value={instrument.id}>
                  {instrument.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedExperience} onValueChange={setSelectedExperience}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              {comparisonFilters.experience.map(experience => (
                <SelectItem key={experience.id} value={experience.id}>
                  {experience.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="mt-0">
            <div className="p-6 pt-4 grid grid-cols-1 gap-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { 
                    label: "Win Rate", 
                    value: `${userPerformance.winRate}%`, 
                    benchmark: communityBenchmarks.winRate,
                    icon: Trophy
                  },
                  { 
                    label: "Average R", 
                    value: userPerformance.avgR.toFixed(1) + "R", 
                    benchmark: communityBenchmarks.avgR,
                    icon: TrendingUp
                  },
                  { 
                    label: "Profit Factor", 
                    value: userPerformance.profitFactor.toFixed(1), 
                    benchmark: communityBenchmarks.profitFactor,
                    icon: BarChart
                  },
                  { 
                    label: "Consistency Score", 
                    value: `${userPerformance.consistencyScore}%`, 
                    benchmark: communityBenchmarks.consistencyScore,
                    icon: Activity
                  }
                ].map((stat, index) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={index} className="rounded-lg bg-black/20 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <StatIcon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{stat.label}</span>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge className={cn(
                                "bg-black/30",
                                getPercentileColor(stat.benchmark.yourPercentile)
                              )}>
                                {stat.benchmark.yourPercentile}%
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">You're in the top {stat.benchmark.yourPercentile}%</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      
                      <div className="text-2xl font-bold">{stat.value}</div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Community:</span>
                          <span>{typeof stat.benchmark.average === 'number' && stat.benchmark.average % 1 === 0 ? 
                            stat.benchmark.average : 
                            stat.benchmark.average.toFixed(1)}
                            {stat.label === "Win Rate" || stat.label === "Consistency Score" ? "%" : stat.label === "Average R" ? "R" : ""}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-amber-500" />
                          <span className="text-muted-foreground">Top 10%:</span>
                          <span>{typeof stat.benchmark.top10Pct === 'number' && stat.benchmark.top10Pct % 1 === 0 ? 
                            stat.benchmark.top10Pct : 
                            stat.benchmark.top10Pct.toFixed(1)}
                            {stat.label === "Win Rate" || stat.label === "Consistency Score" ? "%" : stat.label === "Average R" ? "R" : ""}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-black/20 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-primary h-1.5 rounded-full" 
                          style={{ 
                            width: `${(stat.benchmark.yourPercentile)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Strategy Comparison Chart */}
              <div className="rounded-lg border bg-black/10 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Strategy Comparison</h3>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={strategyComparisonData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        tick={{fill: 'rgba(255,255,255,0.6)'}}
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <YAxis 
                        tick={{fill: 'rgba(255,255,255,0.6)'}}
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <Legend />
                      <Bar dataKey="community" name="Community Average" fill="#64748b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="topPerformers" name="Top 10%" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="you" name="You" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Skill Radar Chart */}
              <div className="rounded-lg border bg-black/10 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Trading Skills Radar</h3>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart outerRadius={90} data={radarChartData}>
                      <PolarGrid stroke="rgba(255,255,255,0.2)" />
                      <PolarAngleAxis 
                        dataKey="subject"
                        tick={{fill: 'rgba(255,255,255,0.6)'}}
                      />
                      <Radar
                        name="Community"
                        dataKey="Community"
                        stroke="#64748b"
                        fill="#64748b"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Top Performers"
                        dataKey="TopPerformers"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="You"
                        dataKey="You"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                        fillOpacity={0.5}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Community Leaderboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <h3 className="font-medium">Community Leaderboard</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowLeaderboard(!showLeaderboard)}>
                    {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
                  </Button>
                </div>
                
                {showLeaderboard && (
                  <div className="rounded-lg border bg-black/10 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-black/20">
                        <tr>
                          <th className="p-2 text-left text-xs font-medium text-muted-foreground">Rank</th>
                          <th className="p-2 text-left text-xs font-medium text-muted-foreground">Trader</th>
                          <th className="p-2 text-center text-xs font-medium text-muted-foreground">Win Rate</th>
                          <th className="p-2 text-center text-xs font-medium text-muted-foreground">Avg R</th>
                          <th className="p-2 text-center text-xs font-medium text-muted-foreground">Profit Factor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboardData.map((user) => (
                          <tr 
                            key={user.id} 
                            className={cn(
                              "border-t border-white/5 hover:bg-black/10",
                              user.id === "current-user" && "bg-primary/10 font-medium"
                            )}
                          >
                            <td className="p-2 text-sm">
                              {user.rank <= 3 ? (
                                <div className="flex items-center">
                                  <div className={cn(
                                    "h-5 w-5 rounded-full flex items-center justify-center text-xs mr-1",
                                    user.rank === 1 ? "bg-amber-500/20 text-amber-500" :
                                    user.rank === 2 ? "bg-gray-400/20 text-gray-400" :
                                    "bg-amber-800/20 text-amber-800"
                                  )}>
                                    {user.rank}
                                  </div>
                                </div>
                              ) : (
                                user.rank
                              )}
                            </td>
                            <td className="p-2 text-sm">
                              <div className="flex items-center">
                                {user.id === "current-user" ? (
                                  <Badge variant="outline" className="text-primary border-primary/30 mr-2">You</Badge>
                                ) : null}
                                {user.handle}
                              </div>
                            </td>
                            <td className="p-2 text-center text-sm">{user.winRate}%</td>
                            <td className="p-2 text-center text-sm">{user.avgR.toFixed(1)}R</td>
                            <td className="p-2 text-center text-sm">{user.profitFactor.toFixed(1)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="distribution" className="mt-0">
            <div className="p-6 pt-4 grid grid-cols-1 gap-6">
              {/* R-Distribution Chart */}
              <div className="rounded-lg border bg-black/10 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <BarChartIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">R-Multiple Distribution</h3>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={distributionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      barGap={4}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                      <XAxis 
                        dataKey="bin"
                        tick={{ fill: 'rgba(255,255,255,0.6)' }}
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <YAxis 
                        label={{ value: 'Frequency (%)', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.6)' }}
                        tick={{ fill: 'rgba(255,255,255,0.6)' }}
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <Legend />
                      <Bar 
                        dataKey="community" 
                        name="Community" 
                        fill="#64748b" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        dataKey="you" 
                        name="Your Trades" 
                        fill="#06b6d4" 
                        radius={[4, 4, 0, 0]} 
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium">Key Insights:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="bg-black/20 rounded-md p-3 flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Your trades show 18% more positive R outcomes than community average.</span>
                    </div>
                    <div className="bg-black/20 rounded-md p-3 flex items-start gap-2">
                      <Shield className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span>Your risk management is stronger with 30% fewer large losses.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Win Rate Trend */}
              <div className="rounded-lg border bg-black/10 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <LineChartIcon className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Win Rate Trend (Last 3 Months)</h3>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        {
                          month: "March",
                          you: 58,
                          community: 46,
                          topPerformers: 66
                        },
                        {
                          month: "April",
                          you: 60,
                          community: 47,
                          topPerformers: 67
                        },
                        {
                          month: "May",
                          you: 62,
                          community: 48,
                          topPerformers: 68
                        }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="month" 
                        tick={{fill: 'rgba(255,255,255,0.6)'}}
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <YAxis 
                        tick={{fill: 'rgba(255,255,255,0.6)'}}
                        stroke="rgba(255,255,255,0.2)"
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="community"
                        name="Community Average"
                        stroke="#64748b"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="topPerformers"
                        name="Top 10%"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="you"
                        name="You"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Strategy Performance Distribution */}
              <div className="rounded-lg border bg-black/10 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Strategy Success Distribution</h3>
                </div>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={[
                          { name: "Breakout", value: 35 },
                          { name: "Trend Following", value: 25 },
                          { name: "Reversal", value: 20 },
                          { name: "Range", value: 15 },
                          { name: "Other", value: 5 }
                        ]}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {[0, 1, 2, 3, 4].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={[
                            "#06b6d4", "#8b5cf6", "#ec4899", "#f97316", "#64748b"
                          ][index % 5]} />
                        ))}
                      </Pie>
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-2 text-sm text-center text-muted-foreground">
                  Most successful strategy types in your peer group
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-0">
            <div className="p-6 pt-4 grid grid-cols-1 gap-6">
              {/* Advanced Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border bg-black/10 p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    <h3 className="font-medium">Trading Edge Metrics</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: "Expectancy", you: 0.8, community: 0.4, unit: "R" },
                      { name: "Profit Factor", you: 1.9, community: 1.4, unit: "" },
                      { name: "Kelly Percentage", you: 18, community: 12, unit: "%" },
                      { name: "Win/Loss Ratio", you: 1.8, community: 1.3, unit: "" }
                    ].map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>{stat.name}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{stat.community}{stat.unit}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={stat.you > stat.community ? "text-green-500" : "text-red-500"}>
                                {stat.you}{stat.unit}
                              </span>
                              {getComparisonIcon(stat.you, stat.community)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="w-full bg-black/20 rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{ 
                              width: `${(stat.you / (Math.max(stat.you, stat.community) * 1.2)) * 100}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="rounded-lg border bg-black/10 p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Performance Milestones</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: "100 Consecutive Days Trading", progress: 78, target: 100, unit: "days" },
                      { name: "Win Rate Above 60%", progress: 62, target: 60, unit: "%", achieved: true },
                      { name: "Biggest Winning Streak", progress: 8, target: 10, unit: "trades" },
                      { name: "Monthly Profit Goal", progress: 85, target: 100, unit: "%" }
                    ].map((milestone, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1.5">
                            <span>{milestone.name}</span>
                            {milestone.achieved && (
                              <Badge className="bg-green-500/20 text-green-500 text-[10px] py-0 h-4">
                                Achieved
                              </Badge>
                            )}
                          </div>
                          <span>{milestone.progress}/{milestone.target} {milestone.unit}</span>
                        </div>
                        
                        <Progress value={(milestone.progress / milestone.target) * 100} className="h-1.5" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Milestones
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Learning Suggestions */}
              <div className="rounded-lg border bg-black/10 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Personalized Improvement Areas</h3>
                  </div>
                  <Badge variant="outline">Based on peer comparison</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-amber-500" />
                        <h4 className="text-sm font-medium">Drawdown Management</h4>
                      </div>
                      <Badge className="bg-amber-500/20 text-amber-500">Moderate Gap</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your max drawdown is 2.8% higher than top performers in your peer group.
                    </p>
                    <div className="pt-1">
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                        View recommended resources
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 rounded-lg p-3 space-y-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        <h4 className="text-sm font-medium">Position Sizing</h4>
                      </div>
                      <Badge className="bg-green-500/20 text-green-500">Strong Area</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Your risk management is in the top 15% of traders with similar experience.
                    </p>
                    <div className="pt-1">
                      <Button variant="link" size="sm" className="h-auto p-0 text-primary">
                        View similar traders' approaches
                      </Button>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span>Benchmarking Settings</span>
                  </Button>
                  <Button variant="default" size="sm" className="flex items-center gap-1">
                    <EyeOff className="h-4 w-4" />
                    <span>Opt Out</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// These are mock components for Recharts to prevent build errors
// In a real implementation, these would come directly from recharts
function ResponsiveContainer({ children, width, height }: { children: React.ReactNode; width: string | number; height: string | number }) {
  return (
    <div style={{ width: width === "100%" ? "100%" : `${width}px`, height: height === "100%" ? "100%" : `${height}px` }} className="bg-black/20 rounded flex items-center justify-center">
      {children}
    </div>
  );
}

function CartesianGrid({ strokeDasharray, stroke, vertical = true }: { strokeDasharray?: string; stroke?: string; vertical?: boolean }) {
  return null;
}

function XAxis({ dataKey, stroke, tick }: { dataKey: string; stroke?: string; tick?: any }) {
  return null;
}

function YAxis({ tickFormatter, stroke, domain, label }: { tickFormatter?: (value: number) => string; stroke?: string; domain?: [number, number]; label?: any }) {
  return null;
}

function Legend() {
  return null;
}

function RechartsBarChart({ children, data, margin, barGap, barCategoryGap }: { children: React.ReactNode; data: any[]; margin?: any; barGap?: number; barCategoryGap?: number }) {
  return <div className="flex items-center justify-center w-full h-full">Bar Chart Visualization</div>;
}

function Bar({ dataKey, name, fill, radius }: { dataKey: string; name: string; fill: string; radius?: number[] }) {
  return null;
}

function LineChart({ children, data, margin }: { children: React.ReactNode; data: any[]; margin?: any }) {
  return <div className="flex items-center justify-center w-full h-full">Line Chart Visualization</div>;
}

function Line({ type, dataKey, stroke, activeDot, strokeWidth, name }: { type: string; dataKey: string; stroke: string; activeDot?: any; strokeWidth?: number; name: string }) {
  return null;
}

function RechartsPieChart({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center w-full h-full">Pie Chart Visualization</div>;
}

function Pie({ data, nameKey, dataKey, cx, cy, outerRadius, innerRadius, paddingAngle, label, labelLine, children }: { data: any[]; nameKey?: string; dataKey: string; cx?: string; cy?: string; outerRadius?: number; innerRadius?: number; paddingAngle?: number; label?: any; labelLine?: boolean; children?: React.ReactNode }) {
  return null;
}

function Cell({ key, fill }: { key: string; fill: string }) {
  return null;
}

function RadarChart({ children, outerRadius, data }: { children: React.ReactNode; outerRadius: number; data: any[] }) {
  return <div className="flex items-center justify-center w-full h-full">Radar Chart Visualization</div>;
}

function PolarGrid({ stroke }: { stroke: string }) {
  return null;
}

function PolarAngleAxis({ dataKey, tick }: { dataKey: string; tick: any }) {
  return null;
}

function Radar({ name, dataKey, stroke, fill, fillOpacity }: { name: string; dataKey: string; stroke: string; fill: string; fillOpacity: number }) {
  return null;
}
