
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, BarChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatCard } from '@/components/dashboard/StatCard';
import { EquityCurveChart } from '@/components/performance/charts';

interface PerformanceSummaryProps {
  timeframe: string;
}

export function PerformanceSummary({ timeframe }: PerformanceSummaryProps) {
  const [showAsPercentage, setShowAsPercentage] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="Win Rate"
          value="68%"
          description="↑ 5% vs previous period"
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard 
          title="Average R-Multiple"
          value="2.4R"
          description="↑ 0.3R vs previous period"
          trend="up"
          icon={<BarChart className="h-5 w-5" />}
        />
        <StatCard 
          title="Net PnL"
          value="$12,450"
          description="↓ $850 vs previous period"
          trend="down"
          icon={<TrendingDown className="h-5 w-5" />}
        />
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium">Equity Curve</CardTitle>
          <Tabs defaultValue="absolute" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="absolute" onClick={() => setShowAsPercentage(false)}>
                Absolute
              </TabsTrigger>
              <TabsTrigger value="percent" onClick={() => setShowAsPercentage(true)}>
                Percent
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <EquityCurveChart timeframe={timeframe} showPercentage={showAsPercentage} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
