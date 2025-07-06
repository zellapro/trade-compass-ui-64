
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Legend, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface TradeQualityBreakdownProps {
  timeframe: string;
}

export function TradeQualityBreakdown({ timeframe }: TradeQualityBreakdownProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data for trade quality
  const qualityData = [
    { grade: 'A', count: 32, color: '#22C55E' },
    { grade: 'B', count: 45, color: '#3B82F6' },
    { grade: 'C', count: 18, color: '#F59E0B' },
    { grade: 'D', count: 8, color: '#EF4444' },
  ];
  
  // Mock data for trade distribution
  const distributionData = [
    { name: 'Breakout', value: 35, color: '#3B82F6' },
    { name: 'Pullback', value: 28, color: '#8B5CF6' },
    { name: 'Range', value: 22, color: '#22C55E' },
    { name: 'Reversal', value: 15, color: '#F59E0B' },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Trade Quality Breakdown</CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </CardHeader>
      
      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <CollapsibleContent className="px-6 py-2 bg-muted/50 rounded-md mx-6 mb-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label htmlFor="strategy" className="block text-sm font-medium mb-1">Strategy</label>
              <select id="strategy" className="w-32 rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option value="all">All</option>
                <option value="breakout">Breakout</option>
                <option value="pullback">Pullback</option>
                <option value="range">Range</option>
              </select>
            </div>
            <div>
              <label htmlFor="market" className="block text-sm font-medium mb-1">Market</label>
              <select id="market" className="w-32 rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option value="all">All</option>
                <option value="forex">Forex</option>
                <option value="crypto">Crypto</option>
                <option value="stocks">Stocks</option>
              </select>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Trade Quality Bar Chart */}
          <div className="h-[300px]">
            <ChartContainer 
              config={{
                quality: {},
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={qualityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent 
                            indicator="dot"
                            content={<div>Grade {payload[0].payload.grade}: {payload[0].value} trades</div>}
                          />
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="count">
                    {qualityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-center text-sm text-muted-foreground mt-2">Trade Quality Scores by Grade</p>
          </div>
          
          {/* Distribution Donut Chart */}
          <div className="h-[300px]">
            <ChartContainer
              config={{
                distribution: {},
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <ChartTooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <ChartTooltipContent 
                            indicator="dot"
                            content={<div>{payload[0].name}: {payload[0].value} trades</div>}
                          />
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <p className="text-center text-sm text-muted-foreground mt-2">Trade Distribution by Strategy</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
