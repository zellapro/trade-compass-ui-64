
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { 
  ResponsiveContainer, 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DailyPerformanceRhythmProps {
  timeframe: string;
}

export function DailyPerformanceRhythm({ timeframe }: DailyPerformanceRhythmProps) {
  const [view, setView] = useState('winRate');
  
  // Mock data for performance by time of day
  const timeData = [
    {
      time: "9:30-10:30",
      tradeCount: 32,
      winRate: 68,
      avgReturn: 1.7
    },
    {
      time: "10:30-11:30",
      tradeCount: 28,
      winRate: 72,
      avgReturn: 1.9
    },
    {
      time: "11:30-12:30",
      tradeCount: 18,
      winRate: 55,
      avgReturn: 1.2
    },
    {
      time: "12:30-13:30",
      tradeCount: 15,
      winRate: 48,
      avgReturn: 0.9
    },
    {
      time: "13:30-14:30",
      tradeCount: 22,
      winRate: 64,
      avgReturn: 1.5
    },
    {
      time: "14:30-15:30",
      tradeCount: 25,
      winRate: 58,
      avgReturn: 1.3
    },
    {
      time: "15:30-16:00",
      tradeCount: 20,
      winRate: 52,
      avgReturn: 1.1
    }
  ];

  const getBarColor = (type: string) => {
    switch(type) {
      case 'tradeCount':
        return '#3B82F6';
      case 'winRate':
        return '#22C55E';
      case 'avgReturn':
        return '#8B5CF6';
      default:
        return '#3B82F6';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Daily Performance Rhythm</CardTitle>
        <Tabs defaultValue="winRate" onValueChange={setView} className="w-[320px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tradeCount">Trade Count</TabsTrigger>
            <TabsTrigger value="winRate">Win Rate</TabsTrigger>
            <TabsTrigger value="avgReturn">Avg Return</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              rhythm: {},
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={timeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(20, 20, 30, 0.9)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: 'white'
                  }} 
                />
                <Legend />
                <Bar 
                  dataKey={view} 
                  name={view === 'tradeCount' ? 'Trade Count' : view === 'winRate' ? 'Win Rate %' : 'Avg Return (R)'} 
                  fill={getBarColor(view)} 
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
