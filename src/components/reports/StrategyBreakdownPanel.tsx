
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, BarChart, PieChart } from "lucide-react";
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

interface StrategyBreakdownPanelProps {
  timeframe?: string;
}

// Mock data for strategy distribution
const strategyDistribution = [
  { name: "SMC/ICT", value: 28, fill: "#3B82F6" },
  { name: "Price Action", value: 22, fill: "#8B5CF6" },
  { name: "Pattern-Based", value: 12, fill: "#EC4899" },
  { name: "Indicator-Based", value: 18, fill: "#10B981" },
  { name: "Breakout", value: 8, fill: "#F59E0B" },
  { name: "Others", value: 12, fill: "#6B7280" }
];

// Mock data for setup performance
const setupPerformance = [
  { name: "Order Blocks", category: "SMC/ICT", winRate: 75, avgRR: 2.4, trades: 32 },
  { name: "Break of Structure", category: "SMC/ICT", winRate: 68, avgRR: 2.0, trades: 28 },
  { name: "Pin Bar", category: "Price Action", winRate: 72, avgRR: 1.9, trades: 25 },
  { name: "VWAP Bounce", category: "Indicator", winRate: 65, avgRR: 1.7, trades: 22 },
  { name: "Fibonacci Retracement", category: "Fibonacci", winRate: 59, avgRR: 2.1, trades: 18 },
  { name: "Gap & Go", category: "Gap/News", winRate: 62, avgRR: 2.2, trades: 15 }
];

export function StrategyBreakdownPanel({ timeframe = "all" }: StrategyBreakdownPanelProps) {
  const [view, setView] = useState<"overview" | "detailed">("overview");
  
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Strategy Breakdown</CardTitle>
          <CardDescription>Performance analysis by strategy category and setup</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="distribution" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="performance">Setup Performance</TabsTrigger>
            <TabsTrigger value="heatmap">Performance Heatmap</TabsTrigger>
          </TabsList>
          
          <TabsContent value="distribution" className="pt-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-2">Strategy Distribution</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={strategyDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {strategyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-2">Top Performing Setups (Win Rate)</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={setupPerformance.sort((a, b) => b.winRate - a.winRate).slice(0, 5)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Win Rate']}
                      labelFormatter={(value) => `Setup: ${value}`}
                    />
                    <Bar dataKey="winRate" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="pt-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-2">Average Risk/Reward by Setup</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={setupPerformance.sort((a, b) => b.avgRR - a.avgRR)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [`${value}R`, 'Avg R:R']}
                      labelFormatter={(value) => `Setup: ${value}`}
                    />
                    <Bar dataKey="avgRR" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-sm mb-2">Trade Count by Setup</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart
                    data={setupPerformance.sort((a, b) => b.trades - a.trades)}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: number) => [value, 'Trades']}
                      labelFormatter={(value) => `Setup: ${value}`}
                    />
                    <Bar dataKey="trades" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="heatmap" className="pt-2">
            <div className="h-[350px] flex items-center justify-center">
              <div className="text-center p-6 bg-muted/20 rounded-lg">
                <h3 className="font-medium mb-2">Setup Performance Heatmap</h3>
                <p className="text-muted-foreground">
                  Visualize setup performance by time of day, market condition, and more.
                </p>
                <Button variant="outline" className="mt-4">
                  Generate Heatmap
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
