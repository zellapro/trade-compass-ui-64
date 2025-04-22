
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, Filter, ChevronDown } from "lucide-react";
import { StrategyBreakdownPanel } from "@/components/reports/StrategyBreakdownPanel";
import { SetupPerformancePanel } from "@/components/reports/SetupPerformancePanel";

export default function Reports() {
  const [timeframe, setTimeframe] = useState("30d");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Analyze your trading performance in depth.</p>
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
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex md:h-10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="daily">Daily Analysis</TabsTrigger>
          <TabsTrigger value="strategies">Strategy Analysis</TabsTrigger>
          <TabsTrigger value="psychology">Psychology</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Equity Curve</CardTitle>
                <CardDescription>Portfolio growth over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80"></CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Comprehensive performance summary</CardDescription>
              </CardHeader>
              <CardContent className="h-80"></CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Win/Loss Ratio</CardTitle>
                <CardDescription>Trade outcome analysis</CardDescription>
              </CardHeader>
              <CardContent className="h-64"></CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Profit by Instrument</CardTitle>
                <CardDescription>Performance by traded assets</CardDescription>
              </CardHeader>
              <CardContent className="h-64"></CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Trade Duration</CardTitle>
                <CardDescription>Profit by holding time</CardDescription>
              </CardHeader>
              <CardContent className="h-64"></CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="daily" className="pt-4">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Daily Performance</CardTitle>
                <CardDescription>Profit and loss by day</CardDescription>
              </CardHeader>
              <CardContent className="h-80"></CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Time of Day Analysis</CardTitle>
                <CardDescription>Performance by hour</CardDescription>
              </CardHeader>
              <CardContent className="h-80"></CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Day of Week Analysis</CardTitle>
                <CardDescription>Performance by weekday</CardDescription>
              </CardHeader>
              <CardContent className="h-80"></CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="strategies" className="pt-4">
          {/* Added Strategy Breakdown Panel */}
          <StrategyBreakdownPanel timeframe={timeframe} />
          
          {/* Added Setup Performance Panel */}
          <div className="mt-4">
            <SetupPerformancePanel timeframe={timeframe} />
          </div>
        </TabsContent>
        
        <TabsContent value="psychology" className="pt-4">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Psychological Factors</CardTitle>
                <CardDescription>Impact of emotions on trading results</CardDescription>
              </CardHeader>
              <CardContent className="h-80"></CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Behavioral Patterns</CardTitle>
                <CardDescription>Habitual trading behaviors</CardDescription>
              </CardHeader>
              <CardContent className="h-80"></CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Risk Management</CardTitle>
                <CardDescription>Position sizing and risk metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-80"></CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
