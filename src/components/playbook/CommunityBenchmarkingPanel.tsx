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
  TrendingDown,
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

// Mock components to avoid import conflicts with recharts
// These would be replaced with actual recharts in a production app
function ResponsiveContainer({ children, width, height }) {
  return (
    <div style={{ width: width === "100%" ? "100%" : `${width}px`, height: height === "100%" ? "100%" : `${height}px` }}>
      {children}
    </div>
  );
}

function BarChart({ children, data, margin, barGap, barCategoryGap }) {
  return <div className="w-full h-full bg-black/20 rounded flex items-center justify-center text-muted-foreground">Bar Chart Visualization</div>;
}

function Bar({ dataKey, name, fill, radius }) {
  return null;
}

function XAxis({ dataKey, stroke, tick }) {
  return null;
}

function YAxis({ tickFormatter, stroke, domain, label }) {
  return null;
}

function CartesianGrid({ strokeDasharray, stroke, vertical = true }) {
  return null;
}

function LineChart({ children, data, margin }) {
  return <div className="w-full h-full bg-black/20 rounded flex items-center justify-center text-muted-foreground">Line Chart Visualization</div>;
}

function Line({ type, dataKey, stroke, activeDot, strokeWidth, name, dot }) {
  return null;
}

function Legend() {
  return null;
}

function Cell({ key, fill }) {
  return null;
}

function PieChart({ children }) {
  return <div className="w-full h-full bg-black/20 rounded flex items-center justify-center text-muted-foreground">Pie Chart Visualization</div>;
}

function Pie({ data, nameKey, dataKey, cx, cy, outerRadius, innerRadius, paddingAngle, label, labelLine, fill }) {
  return null;
}

function RadarChart({ children, outerRadius, data }) {
  return <div className="w-full h-full bg-black/20 rounded flex items-center justify-center text-muted-foreground">Radar Chart Visualization</div>;
}

function PolarGrid({ stroke }) {
  return null;
}

function PolarAngleAxis({ dataKey, tick }) {
  return null;
}

function Radar({ name, dataKey, stroke, fill, fillOpacity }) {
  return null;
}

function Tooltip({ formatter, labelFormatter }) {
  return null;
}

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

const communityBenchmarks = {
  winRate: 55,
  avgR: 1.1,
  profitFactor: 1.5,
  expectancy: 0.5,
  tradesPerWeek: 18,
  biggestWinner: 3.8,
  consistencyScore: 68
};

const winRateData = [
  { name: "You", value: userPerformance.winRate },
  { name: "Community", value: communityBenchmarks.winRate },
];

const rMultipleData = [
  { name: "You", value: userPerformance.avgR },
  { name: "Community", value: communityBenchmarks.avgR },
];

const profitFactorData = [
  { name: "You", value: userPerformance.profitFactor },
  { name: "Community", value: communityBenchmarks.profitFactor },
];

const expectancyData = [
  { name: "You", value: userPerformance.expectancy },
  { name: "Community", value: communityBenchmarks.expectancy },
];

const tradesPerWeekData = [
  { name: "You", value: userPerformance.tradesPerWeek },
  { name: "Community", value: communityBenchmarks.tradesPerWeek },
];

const biggestWinnerData = [
  { name: "You", value: userPerformance.biggestWinner },
  { name: "Community", value: communityBenchmarks.biggestWinner },
];

const consistencyScoreData = [
  { name: "You", value: userPerformance.consistencyScore },
  { name: "Community", value: communityBenchmarks.consistencyScore },
];

const leaderboardData = [
  { rank: 1, trader: "AlphaTrader", winRate: 78, avgR: 2.1 },
  { rank: 2, trader: "BetaScalper", winRate: 72, avgR: 1.8 },
  { rank: 3, trader: "GammaSwing", winRate: 68, avgR: 1.6 },
  { rank: 4, trader: "DeltaTrend", winRate: 65, avgR: 1.4 },
  { rank: 5, trader: "EpsilonReversal", winRate: 62, avgR: 1.3 },
];

export function CommunityBenchmarkingPanel() {
  const [communityEnabled, setCommunityEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStrategy, setSelectedStrategy] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [selectedInstrument, setSelectedInstrument] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };

  const handleStrategyChange = (e) => {
    setSelectedStrategy(e.target.value);
  };

  const handleTimeframeChange = (e) => {
    setSelectedTimeframe(e.target.value);
  };

  const handleInstrumentChange = (e) => {
    setSelectedInstrument(e.target.value);
  };

  const handleExperienceChange = (e) => {
    setSelectedExperience(e.target.value);
  };

  const getPercentileColor = (percentile) => {
    if (percentile >= 80) return "text-green-500";
    if (percentile >= 50) return "text-blue-500";
    return "text-amber-500";
  };
  
  const getComparisonIcon = (value, benchmark) => {
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
              onCheckedChange={setCommunityEnabled}
            />
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          <Select onValueChange={handleStrategyChange} defaultValue={selectedStrategy}>
            <SelectTrigger className="col-span-1">
              <SelectValue placeholder="Strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Strategies</SelectItem>
              <SelectItem value="breakout">Breakout</SelectItem>
              <SelectItem value="swing">Swing Trading</SelectItem>
              <SelectItem value="reversal">Reversal</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={handleTimeframeChange} defaultValue={selectedTimeframe}>
            <SelectTrigger className="col-span-1">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Timeframes</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="15min">15 Min</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={handleInstrumentChange} defaultValue={selectedInstrument}>
            <SelectTrigger className="col-span-1">
              <SelectValue placeholder="Instrument" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Instruments</SelectItem>
              <SelectItem value="stocks">Stocks</SelectItem>
              <SelectItem value="forex">Forex</SelectItem>
              <SelectItem value="crypto">Crypto</SelectItem>
            </SelectContent>
          </Select>
          
          <Select onValueChange={handleExperienceChange} defaultValue={selectedExperience}>
            <SelectTrigger className="col-span-1">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      {/* Tab content */}
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab headers */}
          <div className="px-6">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="mt-0">
            <div className="p-6 pt-4 grid grid-cols-1 gap-6">
              {/* Overview tab content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Win Rate</h3>
                  <div className="relative w-full h-40">
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie
                          data={winRateData}
                          nameKey="name"
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          outerRadius={50}
                          innerRadius={20}
                          paddingAngle={5}
                          label
                        >
                          {winRateData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? "#82ca9d" : "#8884d8"} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Your Win Rate:</span>
                    <span className="text-sm">{userPerformance.winRate}%</span>
                    <span className="text-xs text-muted-foreground">Community Avg: {communityBenchmarks.winRate}%</span>
                  </div>
                  <Progress value={userPerformance.winRate} max={100} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Avg R Multiple</h3>
                  <div className="relative w-full h-40">
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart data={rMultipleData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Your Avg R:</span>
                    <span className="text-sm">{userPerformance.avgR}</span>
                    <span className="text-xs text-muted-foreground">Community Avg: {communityBenchmarks.avgR}</span>
                  </div>
                  <Progress value={userPerformance.avgR} max={5} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Profit Factor</h3>
                  <div className="relative w-full h-40">
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={profitFactorData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Your Profit Factor:</span>
                    <span className="text-sm">{userPerformance.profitFactor}</span>
                    <span className="text-xs text-muted-foreground">Community Avg: {communityBenchmarks.profitFactor}</span>
                  </div>
                  <Progress value={userPerformance.profitFactor} max={3} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Expectancy</h3>
                  <div className="relative w-full h-40">
                    <ResponsiveContainer width="100%" height={160}>
                      <RadarChart data={expectancyData} outerRadius={90}>
                        <PolarGrid stroke="#8884d8" />
                        <PolarAngleAxis dataKey="name" />
                        <Radar name="expectancy" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Your Expectancy:</span>
                    <span className="text-sm">{userPerformance.expectancy}</span>
                    <span className="text-xs text-muted-foreground">Community Avg: {communityBenchmarks.expectancy}</span>
                  </div>
                  <Progress value={userPerformance.expectancy} max={1} />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Distribution Tab Content */}
          <TabsContent value="distribution" className="mt-0">
            <div className="p-6 pt-4 grid grid-cols-1 gap-6">
              {/* Distribution tab content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Trades Per Week</h3>
                  <div className="relative w-full h-40">
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart data={tradesPerWeekData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Your Trades/Week:</span>
                    <span className="text-sm">{userPerformance.tradesPerWeek}</span>
                    <span className="text-xs text-muted-foreground">Community Avg: {communityBenchmarks.tradesPerWeek}</span>
                  </div>
                  <Progress value={userPerformance.tradesPerWeek} max={50} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Biggest Winner (R)</h3>
                  <div className="relative w-full h-40">
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={biggestWinnerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Your Biggest Winner:</span>
                    <span className="text-sm">{userPerformance.biggestWinner}R</span>
                    <span className="text-xs text-muted-foreground">Community Avg: {communityBenchmarks.biggestWinner}R</span>
                  </div>
                  <Progress value={userPerformance.biggestWinner} max={10} />
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Details Tab Content */}
          <TabsContent value="details" className="mt-0">
            <div className="p-6 pt-4 grid grid-cols-1 gap-6">
              {/* Details tab content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Consistency Score</h3>
                  <div className="relative w-full h-40">
                    <ResponsiveContainer width="100%" height={160}>
                      <RadarChart data={consistencyScoreData} outerRadius={90}>
                        <PolarGrid stroke="#8884d8" />
                        <PolarAngleAxis dataKey="name" />
                        <Radar name="consistency" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Your Consistency:</span>
                    <span className="text-sm">{userPerformance.consistencyScore}</span>
                    <span className="text-xs text-muted-foreground">Community Avg: {communityBenchmarks.consistencyScore}</span>
                  </div>
                  <Progress value={userPerformance.consistencyScore} max={100} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium flex items-center justify-between">
                    Leaderboard
                    <Button variant="secondary" size="sm" onClick={toggleLeaderboard}>
                      {showLeaderboard ? "Hide Leaderboard" : "Show Leaderboard"}
                    </Button>
                  </h3>
                  {showLeaderboard ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">Rank</th>
                            <th scope="col" className="px-6 py-3">Trader</th>
                            <th scope="col" className="px-6 py-3">Win Rate</th>
                            <th scope="col" className="px-6 py-3">Avg R</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboardData.map((trader, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <td className="px-6 py-4">{trader.rank}</td>
                              <td className="px-6 py-4">{trader.trader}</td>
                              <td className="px-6 py-4">{trader.winRate}%</td>
                              <td className="px-6 py-4">{trader.avgR}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Leaderboard hidden. Click "Show Leaderboard" to view top traders.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
