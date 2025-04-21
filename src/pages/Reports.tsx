
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableHeader, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { 
  Download, 
  Share2, 
  Calendar as CalendarIcon, 
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Award,
  BarChart2,
  TrendingUp,
  TrendingDown,
  FileText,
  Mail
} from "lucide-react";
import { format } from "date-fns";
import { 
  EquityCurveChart, 
  TradeDistributionChart, 
  StrategyBreakdownChart, 
  SetupHeatmap, 
  MistakeAnalyticsChart 
} from "@/components/performance/charts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function Reports() {
  const [timeframe, setTimeframe] = useState("monthly");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  // Helper function to format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  // Helper function to determine if value is positive, negative, or neutral
  const getValueColor = (value: number) => {
    if (value > 0) return "text-trading-green";
    if (value < 0) return "text-trading-red";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between sticky top-0 z-10 bg-background pt-2 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate detailed reports on your trading activity.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export Report</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Mail size={16} />
            <span>Email Report</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 size={16} />
            <span>Share</span>
          </Button>
        </div>
      </div>
      
      {/* Report Frequency Navigation */}
      <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-6">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="ytd">YTD</TabsTrigger>
          <TabsTrigger value="lifetime">Lifetime</TabsTrigger>
          <TabsTrigger value="custom">
            <div className="flex items-center gap-1">
              <CalendarIcon size={14} />
              <span>Custom</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        {/* Date Range Selector for Custom Timeframe */}
        {timeframe === "custom" && (
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Custom Date Range</h3>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange as any}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <Button>Apply Range</Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Content for all tabs */}
        <TabsContent value="daily" className="space-y-6">
          <DailyReportContent />
        </TabsContent>
        
        <TabsContent value="weekly" className="space-y-6">
          <StandardReportContent timeframe="weekly" />
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-6">
          <StandardReportContent timeframe="monthly" />
        </TabsContent>
        
        <TabsContent value="quarterly" className="space-y-6">
          <StandardReportContent timeframe="quarterly" />
        </TabsContent>
        
        <TabsContent value="ytd" className="space-y-6">
          <StandardReportContent timeframe="ytd" />
        </TabsContent>
        
        <TabsContent value="lifetime" className="space-y-6">
          <StandardReportContent timeframe="lifetime" />
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-6">
          <StandardReportContent timeframe="custom" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Daily Report Content Component
function DailyReportContent() {
  return (
    <>
      {/* AI Insights */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-6 pb-4">
          <div className="flex items-start gap-4">
            <Zap className="h-8 w-8 text-blue-500 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">AI Insights: April 21, 2025</h3>
              <p className="text-muted-foreground">
                You executed 7 trades today with a <span className="text-trading-green font-medium">71% win rate</span>. 
                Your win rate on Bull Flag setups improved significantly compared to last week. 
                Consider reducing position size on afternoon trades — they showed higher emotional bias scores. 
                VWAP bounce setups continue to be your strongest pattern.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                  Improved Win Rate
                </Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                  Reduce PM Position Size
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  Stick with VWAP Bounces
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Daily P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-trading-green">+$2,468.75</span>
              <span className="text-sm text-trading-green">+3.21%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">71.4%</span>
              <span className="text-sm text-trading-green">+8.2% vs. avg</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Number of Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">7</span>
              <span className="text-sm text-muted-foreground">5 wins / 2 losses</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Avg Risk-Reward</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">2.4R</span>
              <span className="text-sm text-trading-green">+0.6R vs. avg</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Best/Worst Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div>
                <span className="text-sm text-muted-foreground">Best:</span>
                <div className="flex justify-between">
                  <span className="font-medium">NVDA</span>
                  <span className="text-trading-green font-semibold">+$984.50</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Worst:</span>
                <div className="flex justify-between">
                  <span className="font-medium">MSFT</span>
                  <span className="text-trading-red font-semibold">-$325.25</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Rule Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">92%</span>
              <span className="text-sm text-trading-green">+5% vs. avg</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Performance Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">P&L by Trade</CardTitle>
          </CardHeader>
          <CardContent>
            <TradeDistributionChart chartType="histogram" timeframe="daily" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trade Duration Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <TradeDistributionChart chartType="duration" timeframe="daily" />
          </CardContent>
        </Card>
      </div>
      
      {/* Emotional Analysis & Psychological Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Emotional State Analysis</CardTitle>
          <CardDescription>Before, during, and after trades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-md border p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                Before Trading
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Calm</span>
                  <div className="h-2 bg-muted rounded-full w-24">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Prepared</span>
                  <div className="h-2 bg-muted rounded-full w-24">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Anxious</span>
                  <div className="h-2 bg-muted rounded-full w-24">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-violet-500"></div>
                During Trading
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Focused</span>
                  <div className="h-2 bg-muted rounded-full w-24">
                    <div className="h-2 bg-violet-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">FOMO</span>
                  <div className="h-2 bg-muted rounded-full w-24">
                    <div className="h-2 bg-violet-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Impatient</span>
                  <div className="h-2 bg-muted rounded-full w-24">
                    <div className="h-2 bg-violet-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                After Trading
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Satisfied</span>
                  <div className="h-2 bg-muted rounded-full w-24">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Reflective</span>
                  <div className="h-2 bg-muted rounded-full w-24">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Regretful</span>
                  <div className="h-2 bg-muted rounded-full w-24">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Daily Trade Log */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daily Trade Log</CardTitle>
          <CardDescription>All trades for April 21, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Ticker</TableHead>
                  <TableHead>Setup</TableHead>
                  <TableHead>Entry</TableHead>
                  <TableHead>Exit</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>P&L</TableHead>
                  <TableHead>R:R</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>09:42 AM</TableCell>
                  <TableCell className="font-medium">NVDA</TableCell>
                  <TableCell>Bull Flag</TableCell>
                  <TableCell>$124.50</TableCell>
                  <TableCell>$129.75</TableCell>
                  <TableCell>200</TableCell>
                  <TableCell className="text-trading-green">+$984.50</TableCell>
                  <TableCell>2.8R</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">A</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>10:15 AM</TableCell>
                  <TableCell className="font-medium">AAPL</TableCell>
                  <TableCell>VWAP Bounce</TableCell>
                  <TableCell>$185.25</TableCell>
                  <TableCell>$187.40</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell className="text-trading-green">+$322.50</TableCell>
                  <TableCell>1.9R</TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">A-</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>11:05 AM</TableCell>
                  <TableCell className="font-medium">MSFT</TableCell>
                  <TableCell>Breakout</TableCell>
                  <TableCell>$412.80</TableCell>
                  <TableCell>$410.55</TableCell>
                  <TableCell>150</TableCell>
                  <TableCell className="text-trading-red">-$325.25</TableCell>
                  <TableCell>-0.8R</TableCell>
                  <TableCell>
                    <Badge className="bg-red-100 text-red-800 hover:bg-red-200">C</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
                {/* More rows... */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Goal Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daily Goal Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Trade only A+ setups</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">6/7 trades</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Maintain position sizing rules</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">100%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <span className="font-medium">No more than 8 trades</span>
              </div>
              <Badge variant="outline" className="bg-amber-50 text-amber-700">7/8</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Journal every trade within 15 minutes</span>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">7/7 trades</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// Standard Report Content Component (Weekly, Monthly, Quarterly, YTD, Lifetime, Custom)
function StandardReportContent({ timeframe }: { timeframe: string }) {
  // Helper function to display timeframe in a readable format
  const getTimeframeDisplay = () => {
    switch (timeframe) {
      case "weekly":
        return "Week of April 15-21, 2025";
      case "monthly":
        return "April 2025";
      case "quarterly":
        return "Q2 2025 (Apr-Jun)";
      case "ytd":
        return "Year-to-Date 2025";
      case "lifetime":
        return "All Time (Jan 2023 - Present)";
      case "custom":
        return "Custom Range";
      default:
        return timeframe;
    }
  };

  return (
    <>
      {/* AI Insights */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-6 pb-4">
          <div className="flex items-start gap-4">
            <Zap className="h-8 w-8 text-blue-500 mt-1" />
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">AI Insights: {getTimeframeDisplay()}</h3>
              <p className="text-muted-foreground">
                Your trading has shown consistent improvement this {timeframe}. Your win rate on Bull Flag setups
                increased from 65% to 78%. Morning trades (9:30-11:00 AM) remain your strongest, generating 68% of total profits.
                Risk management has improved with average loss size decreasing by 22%. Consider reducing exposure to tech stocks,
                as they account for 70% of your losses this period.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                  Improved Win Rate
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                  Better Risk Management
                </Badge>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                  Reduce Tech Exposure
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                  Focus on Morning Session
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Net P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-trading-green">+$18,475.50</span>
              <span className="text-sm text-trading-green">+12.2%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">68.5%</span>
              <span className="text-sm text-trading-green">+5.8% vs. prev {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">74</span>
              <span className="text-sm text-muted-foreground">51 wins / 23 losses</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Avg Risk-Reward</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">1.95R</span>
              <span className="text-sm text-trading-green">+0.3R vs. prev {timeframe}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Best Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-xl font-bold">Bull Flag</span>
              <span className="text-sm text-trading-green">78% win rate, 2.4R avg</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Most Traded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-xl font-bold">NVDA</span>
              <span className="text-sm text-muted-foreground">18 trades, 72% win rate</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Execution Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-3xl font-bold">8.4<span className="text-lg">/10</span></span>
              <span className="text-sm text-trading-green">+0.6 vs. prev {timeframe}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Top Mistake</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <span className="text-xl font-bold">Early Exit</span>
              <span className="text-sm text-trading-red">Cost: ~$4,250</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Performance Charts */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Equity Curve</CardTitle>
              <CardDescription>Cumulative P&L over time</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8">Daily</Button>
              <Button variant="outline" size="sm" className="h-8" disabled>Cumulative</Button>
            </div>
          </CardHeader>
          <CardContent>
            <EquityCurveChart chartType="advanced" timeframe={timeframe} />
          </CardContent>
        </Card>
      </div>
      
      {/* Two-Column Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Win Rate Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <TradeDistributionChart chartType="histogram" timeframe={timeframe} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time of Day Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <TradeDistributionChart chartType="timeofday" timeframe={timeframe} />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">R-Multiple Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <TradeDistributionChart chartType="rmultiple" timeframe={timeframe} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Strategy Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <StrategyBreakdownChart timeframe={timeframe} />
          </CardContent>
        </Card>
      </div>
      
      {/* Trade Quality & Mistake Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Setup Performance Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <SetupHeatmap timeframe={timeframe} />
          </CardContent>
        </Card>
        
        <MistakeAnalyticsChart timeframe={timeframe} />
      </div>
      
      {/* Trade Log */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Top Trades</CardTitle>
            <CardDescription>Best and worst trades during this period</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8">View All Trades</Button>
        </CardHeader>
        <CardContent>
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <TrendingUp className="mr-1 h-4 w-4 text-trading-green" />
              Best Performing Trades
            </h4>
            <div className="overflow-x-auto mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Setup</TableHead>
                    <TableHead>Entry</TableHead>
                    <TableHead>Exit</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead>R:R</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Apr 21</TableCell>
                    <TableCell className="font-medium">NVDA</TableCell>
                    <TableCell>Bull Flag</TableCell>
                    <TableCell>$124.50</TableCell>
                    <TableCell>$129.75</TableCell>
                    <TableCell>200</TableCell>
                    <TableCell className="text-trading-green">+$984.50</TableCell>
                    <TableCell>2.8R</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">A</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Apr 17</TableCell>
                    <TableCell className="font-medium">META</TableCell>
                    <TableCell>Reversal</TableCell>
                    <TableCell>$472.35</TableCell>
                    <TableCell>$481.40</TableCell>
                    <TableCell>150</TableCell>
                    <TableCell className="text-trading-green">+$1,357.50</TableCell>
                    <TableCell>3.2R</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">A+</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Apr 9</TableCell>
                    <TableCell className="font-medium">TSLA</TableCell>
                    <TableCell>VWAP Bounce</TableCell>
                    <TableCell>$168.20</TableCell>
                    <TableCell>$175.40</TableCell>
                    <TableCell>200</TableCell>
                    <TableCell className="text-trading-green">+$1,440.00</TableCell>
                    <TableCell>2.9R</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">A</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <TrendingDown className="mr-1 h-4 w-4 text-trading-red" />
              Worst Performing Trades
            </h4>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Ticker</TableHead>
                    <TableHead>Setup</TableHead>
                    <TableHead>Entry</TableHead>
                    <TableHead>Exit</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>P&L</TableHead>
                    <TableHead>R:R</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Apr 14</TableCell>
                    <TableCell className="font-medium">AMZN</TableCell>
                    <TableCell>Breakout</TableCell>
                    <TableCell>$182.30</TableCell>
                    <TableCell>$177.15</TableCell>
                    <TableCell>250</TableCell>
                    <TableCell className="text-trading-red">-$1,287.50</TableCell>
                    <TableCell>-1.5R</TableCell>
                    <TableCell>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200">D</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Apr 19</TableCell>
                    <TableCell className="font-medium">AAPL</TableCell>
                    <TableCell>Reversal</TableCell>
                    <TableCell>$169.45</TableCell>
                    <TableCell>$165.30</TableCell>
                    <TableCell>180</TableCell>
                    <TableCell className="text-trading-red">-$747.00</TableCell>
                    <TableCell>-1.2R</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">C</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Apr 11</TableCell>
                    <TableCell className="font-medium">MSFT</TableCell>
                    <TableCell>Bull Flag</TableCell>
                    <TableCell>$412.80</TableCell>
                    <TableCell>$407.95</TableCell>
                    <TableCell>150</TableCell>
                    <TableCell className="text-trading-red">-$727.50</TableCell>
                    <TableCell>-1.0R</TableCell>
                    <TableCell>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">C-</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Goal Tracking */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Goal Tracking</CardTitle>
          <CardDescription>{getTimeframeDisplay()} goals progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Increase win rate to {'>'}65%</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">Achieved: 68.5%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '105%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Maintain positive P&L each week</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">4/4 weeks</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span className="font-medium">Reduce revenge trades to zero</span>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">2 instances</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Journal 100% of trades within 30 mins</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">71/74 trades</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* AI Coach Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Coach Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-md border">
              <Award className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Keep Focusing on Morning Trades</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your morning session trades (9:30-11:00 AM) continue to outperform afternoon trades with a 78% win rate vs 59%.
                  Consider increasing size on high-conviction morning setups.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-md border">
              <BarChart2 className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Optimize Position Sizing</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your highest conviction trades (graded A/A+) have a 84% win rate. Consider a tiered position sizing strategy
                  where A+ setups receive 1.5x your standard position size.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-md border">
              <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium">Address Early Exit Pattern</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Early exits remain your most costly mistake, costing approximately $4,250 this month.
                  Try the 75% partial exit strategy to lock in profits while letting winners run.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
