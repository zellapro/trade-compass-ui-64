
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart, 
  Line
} from 'recharts';

interface PsychologicalEdgeTrackerProps {
  timeframe: string;
}

export function PsychologicalEdgeTracker({ timeframe }: PsychologicalEdgeTrackerProps) {
  // Mock data for emotion vs outcome
  const emotionData = [
    { emotion: 'Calm', winRate: 76, avgReturn: 2.1, color: '#22C55E' },
    { emotion: 'Focused', winRate: 68, avgReturn: 1.8, color: '#3B82F6' },
    { emotion: 'Neutral', winRate: 55, avgReturn: 1.2, color: '#8B5CF6' },
    { emotion: 'Excited', winRate: 48, avgReturn: 0.9, color: '#F59E0B' },
    { emotion: 'Anxious', winRate: 42, avgReturn: 0.7, color: '#EF4444' },
    { emotion: 'Angry', winRate: 32, avgReturn: 0.3, color: '#DC2626' },
  ];

  // Mock data for checklist adherence
  const checklistData = [
    { time: '9:30', adherence: 95, avgReturn: 2.3 },
    { time: '10:00', adherence: 90, avgReturn: 2.0 },
    { time: '10:30', adherence: 85, avgReturn: 1.8 },
    { time: '11:00', adherence: 80, avgReturn: 1.7 },
    { time: '11:30', adherence: 75, avgReturn: 1.5 },
    { time: '12:00', adherence: 70, avgReturn: 1.3 },
    { time: '12:30', adherence: 75, avgReturn: 1.4 },
    { time: '13:00', adherence: 80, avgReturn: 1.6 },
    { time: '13:30', adherence: 85, avgReturn: 1.7 },
    { time: '14:00', adherence: 90, avgReturn: 1.9 },
    { time: '14:30', adherence: 80, avgReturn: 1.6 },
    { time: '15:00', adherence: 75, avgReturn: 1.3 },
  ];

  // Mock data for anxiety level over time
  const anxietyData = [
    { date: '7/1', anxiety: 2, calm: 8 },
    { date: '7/2', anxiety: 3, calm: 7 },
    { date: '7/3', anxiety: 5, calm: 5 },
    { date: '7/4', anxiety: 7, calm: 3 },
    { date: '7/5', anxiety: 6, calm: 4 },
    { date: '7/6', anxiety: 4, calm: 6 },
    { date: '7/7', anxiety: 3, calm: 7 },
    { date: '7/8', anxiety: 2, calm: 8 },
    { date: '7/9', anxiety: 1, calm: 9 },
    { date: '7/10', anxiety: 3, calm: 7 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Emotion vs Outcome Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Emotion vs. Trading Outcome</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                emotion: {},
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={emotionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="emotion" />
                  <YAxis yAxisId="left" orientation="left" stroke="#22C55E" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(20, 20, 30, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="winRate" name="Win Rate %" fill="#22C55E" />
                  <Bar yAxisId="right" dataKey="avgReturn" name="Avg. Return (R)" fill="#3B82F6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Adherence Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Checklist Adherence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer
              config={{
                adherence: {},
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={checklistData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" orientation="left" stroke="#22C55E" domain={[50, 100]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(20, 20, 30, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="adherence"
                    name="Checklist Adherence %"
                    stroke="#22C55E"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="avgReturn"
                    name="Avg. Return (R)"
                    stroke="#3B82F6"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Mindset Over Time Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Mindset Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ChartContainer
              config={{
                mindset: {},
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={anxietyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(20, 20, 30, 0.9)', 
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="anxiety" name="Anxiety Level" stroke="#EF4444" dot={{ strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="calm" name="Calm Level" stroke="#22C55E" dot={{ strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
