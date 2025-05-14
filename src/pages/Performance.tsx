import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  CircleDollarSign,
  ChartLine,
  ChartBar,
  CalendarDays
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  EquityCurveChart,
  TradeDistributionChart,
  StrategyBreakdownChart,
  SetupHeatmap,
  MistakeAnalyticsChart,
  ConsistencyTracker
} from "@/components/performance/charts";
import { PerformanceCalendar } from "@/components/performance/PerformanceCalendar";
import { StrategyTable } from "@/components/performance/StrategyTable";
import { FilterPanel } from "@/components/performance/FilterPanel";
import { RiskMetricsPanel } from "@/components/performance/RiskMetricsPanel";
import { AiInsightsPanel } from "@/components/performance/AiInsightsPanel";
import { MilestonesPanel } from "@/components/performance/MilestonesPanel";
import { BrokerComparisonPanel } from "@/components/performance/BrokerComparisonPanel";

export default function Performance() {
  const [timeframe, setTimeframe] = useState("30d");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Performance</h1>
          <p className="text-muted-foreground">Analyze your trading metrics and performance.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={16} />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      
      {isFilterOpen && <FilterPanel />}
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 md:w-auto md:inline-flex md:h-10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="equity">Equity Curve</TabsTrigger>
          <TabsTrigger value="distribution">Distributions</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Equity Curve</CardTitle>
                <CardDescription>Your account growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <EquityCurveChart chartType="cumulative" timeframe={timeframe} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Win vs Loss Distribution</CardTitle>
                <CardDescription>Trade outcome distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <TradeDistributionChart timeframe={timeframe} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Strategy Breakdown</CardTitle>
                <CardDescription>Performance by strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <StrategyBreakdownChart timeframe={timeframe} />
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Setup Performance Heatmap</CardTitle>
                <CardDescription>Win rate and profitability by setup</CardDescription>
              </CardHeader>
              <CardContent>
                <SetupHeatmap timeframe={timeframe} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AiInsightsPanel />
            <RiskMetricsPanel timeframe={timeframe} />
          </div>
        </TabsContent>
        
        <TabsContent value="equity" className="pt-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Equity Curve & Drawdown Analysis</CardTitle>
                  <CardDescription>Analyze your profit & loss over time</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="smooth-data" />
                    <Label htmlFor="smooth-data">Smooth Data</Label>
                  </div>
                  <Select defaultValue="cumulative">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="View Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cumulative">Cumulative P&L</SelectItem>
                      <SelectItem value="daily">Daily P&L</SelectItem>
                      <SelectItem value="balance">Account Balance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <EquityCurveChart chartType="advanced" timeframe={timeframe} />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="text-sm text-muted-foreground">Total P&L</div>
                    <div className="text-2xl font-bold text-trading-green">+$4,238.50</div>
                    <div className="text-sm flex items-center mt-1 text-trading-green">
                      <ArrowUp size={14} className="inline-block mr-1" /> 12.4%
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="text-sm text-muted-foreground">Win Rate</div>
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-sm flex items-center mt-1 text-trading-green">
                      <ArrowUp size={14} className="inline-block mr-1" /> 3.2%
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="text-sm text-muted-foreground">Max Drawdown</div>
                    <div className="text-2xl font-bold text-trading-red">-$842.75</div>
                    <div className="text-sm flex items-center mt-1 text-trading-red">
                      <ArrowDown size={14} className="inline-block mr-1" /> 5.6%
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="text-sm text-muted-foreground">Avg. R Multiple</div>
                    <div className="text-2xl font-bold">1.8R</div>
                    <div className="text-sm flex items-center mt-1 text-trading-green">
                      <ArrowUp size={14} className="inline-block mr-1" /> 0.3R
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <ConsistencyTracker timeframe={timeframe} />
          </div>
        </TabsContent>
        
        <TabsContent value="distribution" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Win vs Loss Distribution</CardTitle>
                <CardDescription>Trade outcomes by P&L range</CardDescription>
              </CardHeader>
              <CardContent>
                <TradeDistributionChart timeframe={timeframe} chartType="histogram" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">R-Multiple Distribution</CardTitle>
                <CardDescription>Reward-to-risk ratio distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <TradeDistributionChart timeframe={timeframe} chartType="rmultiple" />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Trade Duration vs. Profitability</CardTitle>
                <CardDescription>How holding time affects your returns</CardDescription>
              </CardHeader>
              <CardContent>
                <TradeDistributionChart timeframe={timeframe} chartType="duration" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Time of Day Performance</CardTitle>
                <CardDescription>P&L distribution by time of day</CardDescription>
              </CardHeader>
              <CardContent>
                <TradeDistributionChart timeframe={timeframe} chartType="timeofday" />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <MistakeAnalyticsChart timeframe={timeframe} />
          </div>
        </TabsContent>
        
        <TabsContent value="strategies" className="pt-4">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Strategy Performance</CardTitle>
                  <CardDescription>Detailed analysis by strategy category and setup</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  <Select defaultValue="winrate">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="winrate">Win Rate</SelectItem>
                      <SelectItem value="profit">Total Profit</SelectItem>
                      <SelectItem value="count">Trade Count</SelectItem>
                      <SelectItem value="rmultiple">Avg R-Multiple</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <Switch id="normalize" />
                    <Label htmlFor="normalize">Normalize by Risk</Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <StrategyTable timeframe={timeframe} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Setup Heatmap</CardTitle>
                <CardDescription>Performance matrix by setup and metric</CardDescription>
              </CardHeader>
              <CardContent>
                <SetupHeatmap timeframe={timeframe} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BrokerComparisonPanel />
            <MilestonesPanel />
          </div>
        </TabsContent>
        
        <TabsContent value="calendar" className="pt-4">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Performance Calendar</CardTitle>
                <CardDescription>Daily trading results calendar view</CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceCalendar timeframe={timeframe} />
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="text-sm text-muted-foreground">Winning Days</div>
                    <div className="text-2xl font-bold">18 <span className="text-base text-muted-foreground">/ 23</span></div>
                    <div className="text-sm text-muted-foreground">78% win rate</div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="text-sm text-muted-foreground">Best Day</div>
                    <div className="text-2xl font-bold text-trading-green">+$836.50</div>
                    <div className="text-sm text-muted-foreground">Apr 8, 2025</div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="text-sm text-muted-foreground">Worst Day</div>
                    <div className="text-2xl font-bold text-trading-red">-$342.75</div>
                    <div className="text-sm text-muted-foreground">Apr 15, 2025</div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 border">
                    <div className="text-sm text-muted-foreground">Avg. Daily P&L</div>
                    <div className="text-2xl font-bold text-trading-green">+$184.28</div>
                    <div className="text-sm text-muted-foreground">+23% vs. prev. month</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
