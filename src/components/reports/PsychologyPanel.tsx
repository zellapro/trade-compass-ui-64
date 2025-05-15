
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, 
  Calendar, 
  Brain, 
  LineChart as LineChartIcon, 
  BarChart as BarChartIcon 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { GoalAchievementCalendar } from './GoalAchievementCalendar';

// Sample data
const emotionalData = [
  { date: '2023-01-01', preTrade: 'Calm', duringTrade: 'Focused', postTrade: 'Satisfied', result: 'Win', profit: 500 },
  { date: '2023-01-02', preTrade: 'Anxious', duringTrade: 'Hesitant', postTrade: 'Disappointed', result: 'Loss', profit: -300 },
  { date: '2023-01-03', preTrade: 'Confident', duringTrade: 'Alert', postTrade: 'Proud', result: 'Win', profit: 800 },
  { date: '2023-01-04', preTrade: 'Tired', duringTrade: 'Distracted', postTrade: 'Frustrated', result: 'Loss', profit: -600 },
  { date: '2023-01-05', preTrade: 'Neutral', duringTrade: 'Calm', postTrade: 'Relieved', result: 'Win', profit: 200 },
  { date: '2023-01-06', preTrade: 'Motivated', duringTrade: 'Focused', postTrade: 'Satisfied', result: 'Win', profit: 450 },
  { date: '2023-01-07', preTrade: 'Impatient', duringTrade: 'Nervous', postTrade: 'Regretful', result: 'Loss', profit: -400 },
];

const biasData = [
  { subject: 'Confirmation Bias', score: 70, fullMark: 100 },
  { subject: 'Loss Aversion', score: 85, fullMark: 100 },
  { subject: 'FOMO', score: 65, fullMark: 100 },
  { subject: 'Overconfidence', score: 40, fullMark: 100 },
  { subject: 'Anchoring Effect', score: 60, fullMark: 100 },
  { subject: 'Recency Bias', score: 75, fullMark: 100 },
];

const mindsetData = [
  { name: 'Confident', win: 12, loss: 3 },
  { name: 'Uncertain', win: 5, loss: 8 },
  { name: 'Neutral', win: 8, loss: 4 },
  { name: 'Overstimulated', win: 2, loss: 7 },
  { name: 'Avoidant', win: 3, loss: 5 },
];

const resilienceData = [
  { date: 'Jan', score: 65 },
  { date: 'Feb', score: 59 },
  { date: 'Mar', score: 80 },
  { date: 'Apr', score: 81 },
  { date: 'May', score: 76 },
  { date: 'Jun', score: 85 },
  { date: 'Jul', score: 90 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const PsychologyPanel = () => {
  const [activeTab, setActiveTab] = useState('emotions');

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Trading Psychology & Behavior</CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Analysis
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="emotions" className="flex items-center gap-1">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Emotional</span>
              <span className="inline sm:hidden">Emot</span>
            </TabsTrigger>
            <TabsTrigger value="cognitive" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Cognitive</span>
              <span className="inline sm:hidden">Cogn</span>
            </TabsTrigger>
            <TabsTrigger value="mindset" className="flex items-center gap-1">
              <BarChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Mindset</span>
              <span className="inline sm:hidden">Mind</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Goals</span>
              <span className="inline sm:hidden">Goal</span>
            </TabsTrigger>
            <TabsTrigger value="resilience" className="flex items-center gap-1">
              <LineChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Resilience</span>
              <span className="inline sm:hidden">Resil</span>
            </TabsTrigger>
          </TabsList>

          {/* Emotional Analysis Tab */}
          <TabsContent value="emotions">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Emotional State Analysis</h3>
                <Select defaultValue="30days">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={emotionalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="profit" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Pre-Trade Emotions</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Calm', value: 30 },
                            { name: 'Anxious', value: 15 },
                            { name: 'Confident', value: 25 },
                            { name: 'Tired', value: 10 },
                            { name: 'Neutral', value: 20 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: 'Calm', value: 30 },
                            { name: 'Anxious', value: 15 },
                            { name: 'Confident', value: 25 },
                            { name: 'Tired', value: 10 },
                            { name: 'Neutral', value: 20 },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">During-Trade Emotions</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Focused', value: 35 },
                            { name: 'Hesitant', value: 20 },
                            { name: 'Alert', value: 15 },
                            { name: 'Distracted', value: 10 },
                            { name: 'Calm', value: 20 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: 'Focused', value: 35 },
                            { name: 'Hesitant', value: 20 },
                            { name: 'Alert', value: 15 },
                            { name: 'Distracted', value: 10 },
                            { name: 'Calm', value: 20 },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Post-Trade Emotions</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Satisfied', value: 30 },
                            { name: 'Disappointed', value: 20 },
                            { name: 'Proud', value: 15 },
                            { name: 'Frustrated', value: 15 },
                            { name: 'Relieved', value: 20 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: 'Satisfied', value: 30 },
                            { name: 'Disappointed', value: 20 },
                            { name: 'Proud', value: 15 },
                            { name: 'Frustrated', value: 15 },
                            { name: 'Relieved', value: 20 },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Cognitive Biases Tab */}
          <TabsContent value="cognitive">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Cognitive Bias Profile</h3>
                <Select defaultValue="30days">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={biasData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Bias Score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="col-span-1 md:col-span-2">
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Bias Impact Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <h3 className="font-medium">Loss Aversion</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your top bias is impacting 71% of your break-even trades. You often hold losing trades too long while exiting winners prematurely.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <h3 className="font-medium">Recency Bias</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        After a winning streak, you tend to increase position sizes by 35% on average, which has led to larger drawdowns.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <h3 className="font-medium">FOMO (Fear of Missing Out)</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        65% of your impulsive entries happen after seeing significant market moves you weren't positioned for.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Improvement Plan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 pt-4">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">Set firm stop losses before entry</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">Journal wins and losses equally</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">Wait 10 minutes before FOMO trades</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">Use position sizing calculator</p>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">Review bias ratings weekly</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Mindset Analysis Tab */}
          <TabsContent value="mindset">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Mindset-Outcome Correlation</h3>
                <Select defaultValue="30days">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7days">Last 7 days</SelectItem>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="90days">Last 90 days</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mindsetData}
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
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="win" stackId="a" fill="#10b981" />
                    <Bar dataKey="loss" stackId="a" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Key Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="p-3 border rounded-lg bg-green-500/10 border-green-500/30">
                      <h3 className="font-medium text-green-600">Top Performer: Confident Mindset</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        When trading with a confident mindset, you achieve an 80% win rate and your average R multiple increases by 0.4R.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-red-500/10 border-red-500/30">
                      <h3 className="font-medium text-red-600">Weakest: Overstimulated Mindset</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        When feeling overstimulated, you have a 22% win rate and tend to overtrade by 140% compared to your plan.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Mindset Patterns</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">Morning Sessions</span>
                          <span className="text-sm text-muted-foreground">Mostly Confident</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">After Losses</span>
                          <span className="text-sm text-muted-foreground">Often Uncertain</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">High Volatility</span>
                          <span className="text-sm text-muted-foreground">Typically Overstimulated</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">After Preparation</span>
                          <span className="text-sm text-muted-foreground">Usually Neutral/Confident</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Goal Achievement Tab */}
          <TabsContent value="goals">
            <GoalAchievementCalendar />
          </TabsContent>

          {/* Resilience Tab */}
          <TabsContent value="resilience">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Recovery & Resilience Monitor</h3>
                <Select defaultValue="6months">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30days">Last 30 days</SelectItem>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={resilienceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Resilience Score: 90/100</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Recovery Speed</span>
                          <span>Excellent</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Emotional Stability</span>
                          <span>Very Good</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Post-Loss Discipline</span>
                          <span>Excellent</span>
                        </div>
                        <div className="w-full bg-muted/50 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-1">
                    <CardTitle className="text-sm font-medium">Recovery Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="p-3 border rounded-lg bg-muted/30">
                      <h3 className="font-medium">Recovery Time</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your average recovery time after setbacks decreased from 1.8 days to 0.5 days over the past 6 months.
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg bg-muted/30">
                      <h3 className="font-medium">Key Improvement</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Post-loss discipline improved 38% since implementing your daily meditation and journaling practice.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
