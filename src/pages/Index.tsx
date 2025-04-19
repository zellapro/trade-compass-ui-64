
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTrades } from "@/components/dashboard/RecentTrades";
import { TradingChart } from "@/components/dashboard/TradingChart";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BarChart2, 
  LineChart, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Award, 
  Activity,
  Brain, 
  BarChart, 
  PieChart, 
  Info, 
  Star, 
  PlayCircle, 
  Target, 
  BookOpen,
  ChevronRight,
  Flag
} from "lucide-react";
import { Link } from "react-router-dom";
import { TradeCalendar } from "@/components/dashboard/TradeCalendar";
import { AiInsightCard } from "@/components/dashboard/AiInsightCard";
import { GoalTracker } from "@/components/dashboard/GoalTracker";
import { StrategyPreview } from "@/components/dashboard/StrategyPreview";
import { JournalSnapshot } from "@/components/dashboard/JournalSnapshot";
import { TradeReplayList } from "@/components/dashboard/TradeReplayList";

export default function Index() {
  const [timeframe, setTimeframe] = useState("month");
  const [tradeCountPeriod, setTradeCountPeriod] = useState("daily");
  const [chartView, setChartView] = useState("equity");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Trading Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John. Here's your trading summary.</p>
        </div>
        <div className="flex items-center space-x-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center text-sm text-muted-foreground">
                <Activity className="mr-1 h-4 w-4" />
                <span>Last sync: 8 min ago</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Broker Connections</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">IBKR</Badge>
                    <span className="text-green-500">Connected</span>
                  </div>
                  <Button variant="outline" size="sm">Sync</Button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">Tradovate</Badge>
                    <span className="text-green-500">Connected</span>
                  </div>
                  <Button variant="outline" size="sm">Sync</Button>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      
      {/* Dashboard Hero Section - Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Today's P&L"
          value="+$725.38"
          description="+15.3% vs yesterday"
          trend="up"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Win Rate
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67.8%</div>
            <div className="mt-1">
              <ToggleGroup type="single" defaultValue={timeframe} onValueChange={(value) => value && setTimeframe(value)}>
                <ToggleGroupItem value="month" size="sm" className="text-xs">Month</ToggleGroupItem>
                <ToggleGroupItem value="ytd" size="sm" className="text-xs">YTD</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Trade Count
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tradeCountPeriod === 'daily' ? '8' : tradeCountPeriod === 'weekly' ? '32' : '98'}</div>
            <div className="mt-1">
              <ToggleGroup type="single" defaultValue={tradeCountPeriod} onValueChange={(value) => value && setTradeCountPeriod(value)}>
                <ToggleGroupItem value="daily" size="sm" className="text-xs">Day</ToggleGroupItem>
                <ToggleGroupItem value="weekly" size="sm" className="text-xs">Week</ToggleGroupItem>
                <ToggleGroupItem value="monthly" size="sm" className="text-xs">Month</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </CardContent>
        </Card>
        
        <StatCard
          title="Risk-Reward Ratio"
          value="1:2.4"
          description="Goal: 1:3"
          icon={<Target className="h-4 w-4" />}
        />
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Streak
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-trading-green">5W</div>
            <div className="h-6 mt-1 w-full bg-muted rounded-sm overflow-hidden">
              <div className="flex items-center h-full">
                <div className="h-full bg-trading-green w-1/6"></div>
                <div className="h-full bg-trading-green w-1/6"></div>
                <div className="h-full bg-trading-red w-1/6"></div>
                <div className="h-full bg-trading-green w-1/6"></div>
                <div className="h-full bg-trading-green w-1/6"></div>
                <div className="h-full bg-trading-green w-1/6"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Psych Score
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <div className="flex items-center mt-1">
              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-trading-blue w-[86%]"></div>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 rounded-full">
                    <Info className="h-3 w-3" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">Psych Score</h4>
                    <p className="text-xs">Based on journal entries, emotional state tracking, and trade consistency.</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Graphs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Performance Metrics</h2>
          <ToggleGroup type="single" defaultValue={chartView} onValueChange={(value) => value && setChartView(value)}>
            <ToggleGroupItem value="equity" size="sm">Equity</ToggleGroupItem>
            <ToggleGroupItem value="pnl" size="sm">P&L</ToggleGroupItem>
            <ToggleGroupItem value="winloss" size="sm">Win/Loss</ToggleGroupItem>
            <ToggleGroupItem value="duration" size="sm">Duration</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <TradingChart chartType={chartView} />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Middle Content - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Insights Section */}
        <div className="md:col-span-1 space-y-6">
          <AiInsightCard />
          <JournalSnapshot />
        </div>
        
        {/* Quick Access Replay and Calendar */}
        <div className="md:col-span-1 space-y-6">
          <TradeReplayList />
          <TradeCalendar />
        </div>
        
        {/* Goal Tracker and Strategy Preview */}
        <div className="md:col-span-1 space-y-6">
          <GoalTracker />
          <StrategyPreview />
          
          {/* Smart Filters & Shortcuts */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Smart Filters</CardTitle>
              <CardDescription>Quick access to filtered views</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <Link to="/performance?filter=biggestLosses">
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <Flag className="mr-2 h-3 w-3 text-trading-red" />
                  Biggest Losses
                </Button>
              </Link>
              <Link to="/performance?filter=bestRR">
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <Star className="mr-2 h-3 w-3 text-trading-blue" />
                  Best RR Trades
                </Button>
              </Link>
              <Link to="/journal?filter=revenge">
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <Activity className="mr-2 h-3 w-3 text-trading-red" />
                  Revenge Trades
                </Button>
              </Link>
              <Link to="/performance?filter=mondayLosses">
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <Calendar className="mr-2 h-3 w-3" />
                  Monday Losses
                </Button>
              </Link>
              <Link to="/journal?filter=highConfidence">
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <Award className="mr-2 h-3 w-3 text-trading-green" />
                  High Confidence
                </Button>
              </Link>
              <Link to="/performance">
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  <ChevronRight className="mr-2 h-3 w-3" />
                  View All
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recent Trades Smart Feed */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Trades</h2>
          <Link to="/journal">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <RecentTrades />
      </div>
    </div>
  );
}
