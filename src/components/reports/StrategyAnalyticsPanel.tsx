
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Pie, 
  LineChart,
  Line,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ScatterChart,
  ZAxis,
  TooltipProps
} from "recharts";
import { CircleCheck, CircleX, Info, ArrowUp, ArrowDown } from "lucide-react";

// Mock data
const strategyBreakdownData = [
  { name: 'Order Block', value: 35, fill: '#8b5cf6' },
  { name: 'Fair Value Gap', value: 25, fill: '#3b82f6' },
  { name: 'Breakout', value: 20, fill: '#10b981' },
  { name: 'Range Trade', value: 15, fill: '#f59e0b' },
  { name: 'Other', value: 5, fill: '#6b7280' },
];

const strategyPerformanceData = [
  { strategy: 'Order Block', winRate: 64, avgRR: 2.1, trades: 28 },
  { strategy: 'Fair Value Gap', winRate: 58, avgRR: 2.8, trades: 19 },
  { strategy: 'Breakout', winRate: 72, avgRR: 1.6, trades: 18 },
  { strategy: 'Range Trade', winRate: 60, avgRR: 1.9, trades: 15 },
  { strategy: 'All', winRate: 62, avgRR: 2.1, trades: 80 },
];

const strategyTimeframeData = [
  { name: 'M1', OB: 5, FVG: 8, Breakout: 12, Range: 6 },
  { name: 'M5', OB: 18, FVG: 14, Breakout: 8, Range: 4 },
  { name: 'M15', OB: 32, FVG: 20, Breakout: 14, Range: 9 },
  { name: 'H1', OB: 12, FVG: 22, Breakout: 5, Range: 18 },
  { name: 'H4', OB: 8, FVG: 10, Breakout: 2, Range: 12 },
];

const scatterData = [
  { x: 54, y: 3.2, z: 18, name: 'Fair Value Gap' },
  { x: 68, y: 1.8, z: 30, name: 'Order Block' },
  { x: 72, y: 1.5, z: 22, name: 'Breakout' },
  { x: 62, y: 2.0, z: 14, name: 'Range Trade' },
  { x: 48, y: 2.8, z: 10, name: 'Pullback' },
];

const chartConfig = {
  "OB": { color: "#8b5cf6" },
  "FVG": { color: "#3b82f6" },
  "Breakout": { color: "#10b981" },
  "Range": { color: "#f59e0b" },
  "Other": { color: "#6b7280" },
};

// Custom tooltip component
const ChartTooltipContent = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border/50 bg-background/95 p-2 shadow-md">
        <p className="font-medium">{label || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color || entry.fill }}>
            {entry.name || entry.dataKey}: {entry.value}
            {entry.dataKey === "winRate" || entry.name === "Win Rate" ? "%" : ""}
            {entry.dataKey === "avgRR" || entry.name === "Avg RR" ? "R" : ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function StrategyAnalyticsPanel() {
  const [activeTab, setActiveTab] = useState("breakdown");
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Strategy Analytics</CardTitle>
            <CardDescription>Performance metrics across different trading strategies</CardDescription>
          </div>
          <Badge variant="outline">Last 30 Days</Badge>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="breakdown" className="w-full" onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full h-auto justify-start flex-wrap">
            <TabsTrigger value="breakdown" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Strategy Breakdown
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Performance
            </TabsTrigger>
            <TabsTrigger value="timeframes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Timeframe Analysis
            </TabsTrigger>
            <TabsTrigger value="matrix" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Win Rate vs RR
            </TabsTrigger>
          </TabsList>
        </div>

        <CardContent className="p-6">
          <TabsContent value="breakdown" className="mt-0 space-y-4">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={strategyBreakdownData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {strategyBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <h3 className="text-lg font-semibold">Strategy Usage</h3>
                
                <div className="space-y-3">
                  {strategyBreakdownData.map((strategy) => (
                    <div key={strategy.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{strategy.name}</span>
                        <span className="text-sm">{strategy.value}%</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${strategy.value}%`,
                            backgroundColor: strategy.fill,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium mb-1">Strategic Balance</h4>
                      <p className="text-sm text-muted-foreground">
                        Order Block remains your most used strategy at 35%. Consider exploring FVG setups more as they show higher RR when successful.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-0 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 text-left font-medium text-sm">Strategy</th>
                    <th className="p-2 text-left font-medium text-sm">Win Rate</th>
                    <th className="p-2 text-left font-medium text-sm">Avg RR</th>
                    <th className="p-2 text-left font-medium text-sm">Trades</th>
                    <th className="p-2 text-left font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {strategyPerformanceData.map((strategy) => (
                    <tr key={strategy.strategy} className={strategy.strategy === 'All' ? 'bg-muted/50' : ''}>
                      <td className="p-2 text-sm font-medium">
                        {strategy.strategy}
                        {strategy.strategy === 'All' && <span className="text-xs text-muted-foreground ml-2">(Average)</span>}
                      </td>
                      <td className="p-2 text-sm">
                        <div className="flex items-center">
                          <span className="font-medium">{strategy.winRate}%</span>
                          <Progress value={strategy.winRate} className="h-1 w-20 ml-2" />
                        </div>
                      </td>
                      <td className="p-2 text-sm font-medium">{strategy.avgRR}R</td>
                      <td className="p-2 text-sm">{strategy.trades}</td>
                      <td className="p-2 text-sm">
                        {strategy.winRate > 65 ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CircleCheck className="mr-1 h-3.5 w-3.5" />
                            Strong
                          </Badge>
                        ) : strategy.winRate < 55 ? (
                          <Badge className="bg-red-100 text-red-800">
                            <CircleX className="mr-1 h-3.5 w-3.5" />
                            Weak
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-100 text-amber-800">
                            Average
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-start gap-2">
                  <ArrowUp className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Top Performer</h4>
                    <p className="text-sm text-muted-foreground">
                      Breakout strategy has the highest win rate at 72%, but lowest RR at 1.6. Consider optimizing exit criteria to improve profitability.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-start gap-2">
                  <ArrowDown className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Needs Improvement</h4>
                    <p className="text-sm text-muted-foreground">
                      Fair Value Gap has high RR (2.8) but lower win rate (58%). Refining entry criteria could substantially improve overall performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeframes" className="mt-0 space-y-4">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={strategyTimeframeData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="OB" name="Order Block" stackId="a" fill="#8b5cf6" />
                  <Bar dataKey="FVG" name="Fair Value Gap" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="Breakout" name="Breakout" stackId="a" fill="#10b981" />
                  <Bar dataKey="Range" name="Range Trade" stackId="a" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Timeframe Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      M15 is your most active timeframe with 75 total trades. Order Block setups perform best on this timeframe.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Strategy Alignment</h4>
                    <p className="text-sm text-muted-foreground">
                      Range Trade strategy performs best on higher timeframes (H1, H4), while Breakout performs best on lower timeframes (M1, M5).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="matrix" className="mt-0 space-y-4">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 10,
                    left: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Win Rate" 
                    unit="%" 
                    domain={[45, 75]} 
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Avg RR" 
                    unit="R" 
                    domain={[1, 3.5]} 
                  />
                  <ZAxis 
                    type="number" 
                    dataKey="z" 
                    range={[50, 400]} 
                    name="Trades" 
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Scatter name="Strategies" data={scatterData} fill="#8884d8">
                    {scatterData.map((entry, index) => {
                      let color = '#8884d8';
                      switch(entry.name) {
                        case 'Order Block': color = '#8b5cf6'; break;
                        case 'Fair Value Gap': color = '#3b82f6'; break;
                        case 'Breakout': color = '#10b981'; break;
                        case 'Range Trade': color = '#f59e0b'; break;
                        case 'Pullback': color = '#ef4444'; break;
                        default: color = '#8884d8';
                      }
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            
            <div className="p-3 bg-muted rounded-md">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Matrix Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Optimal strategies appear in the top-right quadrant (high win rate, high RR). Breakout has highest win rate but lowest RR, while Fair Value Gap has highest RR but lower win rate.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <CardFooter className="flex justify-between border-t p-6">
        <Button variant="outline" size="sm">
          View Historical Data
        </Button>
        <Button size="sm">
          Export Analytics
        </Button>
      </CardFooter>
    </Card>
  );
}
