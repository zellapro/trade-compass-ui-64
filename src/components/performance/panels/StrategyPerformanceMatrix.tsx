
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface StrategyPerformanceMatrixProps {
  timeframe: string;
}

export function StrategyPerformanceMatrix({ timeframe }: StrategyPerformanceMatrixProps) {
  // Mock data for strategy performance
  const strategies = [
    {
      name: "Breakout",
      trades: 45,
      winRate: 72,
      avgR: 2.1,
      adherence: 92,
      bestEmotion: "Calm",
      sparklineData: [
        { value: 1 },
        { value: 1.5 },
        { value: 1.3 },
        { value: 1.8 },
        { value: 2.0 },
        { value: 2.2 },
        { value: 2.1 },
      ]
    },
    {
      name: "Pullback",
      trades: 38,
      winRate: 65,
      avgR: 1.8,
      adherence: 87,
      bestEmotion: "Focused",
      sparklineData: [
        { value: 1.2 },
        { value: 1.5 },
        { value: 1.7 },
        { value: 1.6 },
        { value: 1.9 },
        { value: 1.8 },
        { value: 1.8 },
      ]
    },
    {
      name: "Range Reversal",
      trades: 27,
      winRate: 58,
      avgR: 2.4,
      adherence: 78,
      bestEmotion: "Patient",
      sparklineData: [
        { value: 1.5 },
        { value: 1.8 },
        { value: 2.0 },
        { value: 2.3 },
        { value: 2.1 },
        { value: 2.5 },
        { value: 2.4 },
      ]
    },
    {
      name: "Trend Following",
      trades: 35,
      winRate: 63,
      avgR: 1.6,
      adherence: 85,
      bestEmotion: "Neutral",
      sparklineData: [
        { value: 1.2 },
        { value: 1.4 },
        { value: 1.3 },
        { value: 1.6 },
        { value: 1.7 },
        { value: 1.5 },
        { value: 1.6 },
      ]
    },
    {
      name: "Mean Reversion",
      trades: 22,
      winRate: 55,
      avgR: 2.2,
      adherence: 80,
      bestEmotion: "Confident",
      sparklineData: [
        { value: 1.8 },
        { value: 1.9 },
        { value: 2.1 },
        { value: 2.0 },
        { value: 2.3 },
        { value: 2.1 },
        { value: 2.2 },
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Strategy Performance Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 rounded-l-lg">Strategy</th>
                <th scope="col" className="px-4 py-3">Trades</th>
                <th scope="col" className="px-4 py-3">Win Rate</th>
                <th scope="col" className="px-4 py-3">Avg R</th>
                <th scope="col" className="px-4 py-3">Adherence %</th>
                <th scope="col" className="px-4 py-3">Best Emotion</th>
                <th scope="col" className="px-4 py-3 rounded-r-lg">Performance</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy, index) => (
                <tr key={index} className="border-b border-muted/20 hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{strategy.name}</td>
                  <td className="px-4 py-3">{strategy.trades}</td>
                  <td className="px-4 py-3">{strategy.winRate}%</td>
                  <td className="px-4 py-3">{strategy.avgR}R</td>
                  <td className="px-4 py-3">{strategy.adherence}%</td>
                  <td className="px-4 py-3">{strategy.bestEmotion}</td>
                  <td className="px-4 py-3 w-[100px]">
                    <div style={{ width: '100%', height: '40px' }}>
                      <ChartContainer
                        config={{
                          sparkline: {},
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={strategy.sparklineData}>
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke="#3B82F6" 
                              strokeWidth={2} 
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
