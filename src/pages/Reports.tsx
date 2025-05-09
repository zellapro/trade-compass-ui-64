import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { DailyReportPanel } from '@/components/reports/DailyReportPanel';
import { MetaAnalyticsPanel } from '@/components/reports/MetaAnalyticsPanel';
import { OverviewMetricsPanel } from '@/components/reports/OverviewMetricsPanel';
import { PsychologyPanel } from '@/components/reports/PsychologyPanel';
import { SetupPerformancePanel } from '@/components/reports/SetupPerformancePanel';
import { StrategyAnalyticsPanel } from '@/components/reports/StrategyAnalyticsPanel';
import { StrategyBreakdownPanel } from '@/components/reports/StrategyBreakdownPanel';
import { TraderIdentityPanel } from '@/components/reports/TraderIdentityPanel';
import { AiCoachPanel } from '@/components/reports/AiCoachPanel';
import { Badge } from '@/components/ui/badge';
import {
  CalendarDays,
  Download,
  Share2,
  Settings2,
  Search,
  Trophy,
  Brain,
  LineChart,
  Hourglass,
  UserCircle,
} from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  // Sample data for the small summary chart
  const summaryData = [
    { name: 'Mon', win: 3, loss: 1 },
    { name: 'Tue', win: 2, loss: 2 },
    { name: 'Wed', win: 4, loss: 0 },
    { name: 'Thu', win: 1, loss: 3 },
    { name: 'Fri', win: 5, loss: 2 },
  ];

  // Custom tooltip for the summary chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const win = payload[0].value;
      const loss = payload[1].value;
      const total = win + loss;
      const winRate = total > 0 ? ((win / total) * 100).toFixed(1) : '0';
      
      return (
        <div className="bg-popover border border-border p-2 rounded-md shadow-sm">
          <p className="font-medium">{`${payload[0].payload.name}`}</p>
          <p className="text-sm text-green-500">{`Win: ${win}`}</p>
          <p className="text-sm text-red-500">{`Loss: ${loss}`}</p>
          <p className="text-sm font-medium">{`Win Rate: ${winRate}%`}</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Analyze your trading performance and identify patterns
            </p>
          </div>

          <div className="flex items-center gap-3">
            <DatePickerWithRange
              date={dateRange}
              setDate={setDateRange}
              className="w-auto"
            />
            <Button variant="outline" size="sm" className="h-9">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67.4%</div>
              <p className="text-xs text-muted-foreground">
                +5.1% from previous period
              </p>
              <Badge className="mt-2 bg-green-100 text-green-800">Above Average</Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average RR</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.87R</div>
              <p className="text-xs text-muted-foreground">
                -0.3R from previous period
              </p>
              <Badge className="mt-2 bg-amber-100 text-amber-800">Needs Improvement</Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <Hourglass className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">143</div>
              <p className="text-xs text-muted-foreground">
                Last 30 days period
              </p>
              <div className="h-[40px] mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={summaryData} barGap={0} barSize={6}>
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="win" fill="#10b981" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="loss" fill="#ef4444" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Strategy</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">Order Block</div>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-muted-foreground">Win Rate</p>
                <p className="text-xs font-medium">74%</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">RR</p>
                <p className="text-xs font-medium">2.3R</p>
              </div>
              <Badge className="mt-2 bg-blue-100 text-blue-800">35 Trades</Badge>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full h-auto justify-start flex-wrap">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="strategy" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Strategy Analysis
            </TabsTrigger>
            <TabsTrigger value="daily" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Daily Reports
            </TabsTrigger>
            <TabsTrigger value="psychology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Psychology
            </TabsTrigger>
            <TabsTrigger value="meta" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              AI Analytics
            </TabsTrigger>
            <TabsTrigger value="identity" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Trader Identity
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              AI Coach
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <OverviewMetricsPanel />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <StrategyBreakdownPanel />
              <SetupPerformancePanel />
            </div>
          </TabsContent>
          
          <TabsContent value="strategy" className="space-y-6">
            <StrategyAnalyticsPanel />
            <SetupPerformancePanel />
          </TabsContent>
          
          <TabsContent value="daily" className="space-y-6">
            <DailyReportPanel />
          </TabsContent>
          
          <TabsContent value="psychology" className="space-y-6">
            <PsychologyPanel />
          </TabsContent>
          
          <TabsContent value="meta" className="space-y-6">
            <MetaAnalyticsPanel />
          </TabsContent>
          
          <TabsContent value="identity" className="space-y-6">
            <TraderIdentityPanel />
          </TabsContent>
          
          <TabsContent value="ai" className="space-y-6">
            <AiCoachPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
