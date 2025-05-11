
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Check,
  ChevronRight,
  CircleDollarSign,
  RefreshCw,
  Star,
  TrendingUp,
  TrendingDown,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Tabs for the Pre-trade Readiness Checklist
const checklistItems = [
  { id: 1, text: "Slept 7+ hours", checked: true },
  { id: 2, text: "Completed pre-market analysis", checked: true },
  { id: 3, text: "Reviewed setups and strategies", checked: true },
  { id: 4, text: "Updated risk parameters", checked: false },
  { id: 5, text: "Mental clarity check", checked: true },
  { id: 6, text: "Checked economic calendar", checked: true },
];

// Mock data for the Rhythm Map visualization
const rhythmData = [
  { time: "9:30", performance: "good", trigger: null },
  { time: "10:00", performance: "good", trigger: null },
  { time: "10:30", performance: "poor", trigger: "FOMO" },
  { time: "11:00", performance: "poor", trigger: "Revenge" },
  { time: "11:30", performance: "neutral", trigger: null },
  { time: "12:00", performance: "neutral", trigger: null },
  { time: "12:30", performance: "good", trigger: null },
  { time: "13:00", performance: "good", trigger: null },
  { time: "13:30", performance: "good", trigger: null },
  { time: "14:00", performance: "poor", trigger: "Fatigue" },
  { time: "14:30", performance: "neutral", trigger: null },
  { time: "15:00", performance: "good", trigger: null },
  { time: "15:30", performance: "good", trigger: null },
  { time: "16:00", performance: "good", trigger: null },
];

// Data for the behavior matrix
const behaviorMatrix = [
  { type: "win-disciplined", count: 18, percentage: 45 },
  { type: "win-impulsive", count: 6, percentage: 15 },
  { type: "loss-disciplined", count: 12, percentage: 30 },
  { type: "loss-impulsive", count: 4, percentage: 10 },
];

export default function Dashboard() {
  const { toast } = useToast();
  const [checklist, setChecklist] = useState(checklistItems);
  const [energyLevel, setEnergyLevel] = useState(85);
  const [preparedness, setPreparedness] = useState(90);
  const [setupScore, setSetupScore] = useState(75);
  const [moodRating, setMoodRating] = useState(4); // 1-5 scale
  const [disciplineScore, setDisciplineScore] = useState(88);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [journalEntry, setJournalEntry] = useState("");

  const handleChecklistToggle = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      toast({
        title: "Dashboard Refreshed",
        description: "Latest trader metrics and AI insights updated.",
        duration: 3000,
      });
      setIsRefreshing(false);
    }, 1500);
  };

  const completedChecklistItems = checklist.filter(item => item.checked).length;
  const checklistPercentage = (completedChecklistItems / checklist.length) * 100;

  const moodLabels = ["Very Poor", "Poor", "Neutral", "Good", "Excellent"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Trader Dashboard</h1>
          <p className="text-muted-foreground">Mental and performance tracking for today's session</p>
        </div>
        <Button 
          onClick={handleRefresh} 
          className="flex items-center gap-2" 
          disabled={isRefreshing}
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          {isRefreshing ? "Refreshing..." : "Refresh Now"}
        </Button>
      </div>

      {/* Focus Panel + Readiness Gauges (Top Row) */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Daily Focus Panel */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Zap className="mr-2 h-5 w-5 text-yellow-500" />
              Daily Focus
            </CardTitle>
            <CardDescription>AI-generated tactical guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-100 dark:border-yellow-800/30">
              <p className="font-medium text-yellow-800 dark:text-yellow-300">Primary Focus</p>
              <p className="text-yellow-700 dark:text-yellow-400 mt-1">Execute only A+ setups today. Market conditions favor patience over aggression.</p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-100 dark:border-blue-800/30">
              <p className="font-medium text-blue-800 dark:text-blue-300">Risk Warning</p>
              <p className="text-blue-700 dark:text-blue-400 mt-1">Guard against hesitation on valid setups. Your recent pattern shows missed opportunities.</p>
            </div>
            
            <div className="mt-2 flex justify-end">
              <Button variant="ghost" size="sm" className="text-xs flex items-center">
                View Details
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Technical Readiness Gauges */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Technical Readiness</CardTitle>
            <CardDescription>Current mental and physical preparation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Energy Level</span>
                  <span className="text-sm font-medium">{energyLevel}%</span>
                </div>
                <div className="relative">
                  <Progress value={energyLevel} className="h-2" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Pre-Market Preparation</span>
                  <span className="text-sm font-medium">{preparedness}%</span>
                </div>
                <div className="relative">
                  <Progress value={preparedness} className="h-2" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Setup Memorization Score</span>
                  <span className="text-sm font-medium">{setupScore}%</span>
                </div>
                <div className="relative">
                  <Progress value={setupScore} className="h-2" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="border rounded-md p-2 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">4/5</div>
                  <div className="text-xs text-muted-foreground">Win Streak</div>
                </div>
                <div className="border rounded-md p-2 text-center">
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">Days Active</div>
                </div>
                <div className="border rounded-md p-2 text-center">
                  <div className="text-2xl font-bold text-primary">A+</div>
                  <div className="text-xs text-muted-foreground">Consistency</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Middle Row: Mindset & Rhythm */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Mindset & Discipline Panel */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mindset & Discipline</CardTitle>
            <CardDescription>Psychological state tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2">
                <label className="text-sm font-medium">Mood Rating</label>
                <div className="flex justify-between mt-2">
                  {moodLabels.map((label, index) => (
                    <button 
                      key={index}
                      onClick={() => setMoodRating(index + 1)}
                      className={`rounded-full w-10 h-10 flex items-center justify-center ${
                        moodRating === index + 1 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-center mt-2 text-muted-foreground">
                  Current: {moodLabels[moodRating - 1]}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Discipline Meter</span>
                  <span className="text-sm font-medium">{disciplineScore}%</span>
                </div>
                <Progress value={disciplineScore} className="h-2" />
                <div className="text-xs text-muted-foreground mt-2">
                  Based on your checklist adherence and trade plan compliance
                </div>
              </div>
              
              <div className="mt-4">
                <label className="text-sm font-medium block mb-2">
                  Mini Journal
                </label>
                <textarea 
                  placeholder="What's your biggest risk today?"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none h-20"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Rhythm Map */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rhythm Map</CardTitle>
            <CardDescription>Yesterday's session performance rhythm</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-6">
              {rhythmData.map((block, index) => (
                <div 
                  key={index} 
                  className={`relative h-16 rounded-md flex items-center justify-center ${
                    block.performance === 'good' 
                      ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800/30' 
                      : block.performance === 'poor' 
                        ? 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800/30' 
                        : 'bg-muted border-muted-foreground/20'
                  } border`}
                >
                  <span className="text-xs font-medium">{block.time}</span>
                  {block.trigger && (
                    <div className="absolute -bottom-6 w-full text-center">
                      <Badge variant="outline" className="text-[10px] bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800/30">
                        {block.trigger}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-around mt-10 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Good Performance</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-muted mr-2"></div>
                <span>Neutral</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span>Poor Performance</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Bottom Row: Behavior Analysis and Checklists */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Behavior vs Outcome Matrix */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Behavior vs Outcome Analyzer</CardTitle>
            <CardDescription>Spotting patterns between actions and results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="border rounded-md p-4 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-green-800 dark:text-green-300">Win + Disciplined</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{behaviorMatrix[0].count}</span>
                </div>
                <Progress value={behaviorMatrix[0].percentage} className="h-2 bg-green-200" />
                <p className="text-xs mt-2 text-green-700 dark:text-green-400">
                  Perfect execution with positive outcome. <br />This is your ideal zone.
                </p>
              </div>
              
              <div className="border rounded-md p-4 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-yellow-800 dark:text-yellow-300">Win + Impulsive</span>
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">{behaviorMatrix[1].count}</span>
                </div>
                <Progress value={behaviorMatrix[1].percentage} className="h-2 bg-yellow-200" />
                <p className="text-xs mt-2 text-yellow-700 dark:text-yellow-400">
                  Risky behavior with lucky outcome. <br />Dangerous reinforcement zone.
                </p>
              </div>
              
              <div className="border rounded-md p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-blue-800 dark:text-blue-300">Loss + Disciplined</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{behaviorMatrix[2].count}</span>
                </div>
                <Progress value={behaviorMatrix[2].percentage} className="h-2 bg-blue-200" />
                <p className="text-xs mt-2 text-blue-700 dark:text-blue-400">
                  Good process despite outcome. <br />Focus on the quality of decision.
                </p>
              </div>
              
              <div className="border rounded-md p-4 bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/30">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-red-800 dark:text-red-300">Loss + Impulsive</span>
                  <span className="font-bold text-red-600 dark:text-red-400">{behaviorMatrix[3].count}</span>
                </div>
                <Progress value={behaviorMatrix[3].percentage} className="h-2 bg-red-200" />
                <p className="text-xs mt-2 text-red-700 dark:text-red-400">
                  Poor decision with negative outcome. <br />Critical area to improve.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Pre-Trade Readiness & Edge Amplifier */}
        <div className="space-y-4">
          {/* Pre-Trade Readiness Checklist */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pre-Trade Readiness</CardTitle>
              <CardDescription>Complete before market open</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {checklist.map((item) => (
                  <div 
                    key={item.id} 
                    className={`flex items-center p-3 border rounded-md ${
                      item.checked 
                        ? 'bg-muted/50 border-muted' 
                        : 'bg-background'
                    }`}
                    onClick={() => handleChecklistToggle(item.id)}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center mr-3 ${
                      item.checked ? 'bg-primary text-primary-foreground' : 'border'
                    }`}>
                      {item.checked && <Check size={12} />}
                    </div>
                    <span className={`flex-1 ${item.checked ? 'line-through text-muted-foreground' : ''}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Edge Amplifier AI Panel */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Star className="mr-2 h-5 w-5 text-primary" />
                Edge Amplifier AI
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-md bg-primary/5">
                <div className="flex gap-2">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Your top setups are 3x more profitable</p>
                    <p className="text-sm text-muted-foreground">
                      Focus on key patterns: VWAP retest and Opening Range Breakouts
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-md bg-red-50 dark:bg-red-900/10">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-400">Risk rising after winning streaks</p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      You tend to increase position size after 2+ wins. Stick to your risk plan.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <p className="font-medium mb-2">Double down on today:</p>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                    Patience
                  </Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                    Position sizing
                  </Badge>
                  <Badge className="bg-primary/10 hover:bg-primary/20 text-primary border-primary/20">
                    Early exits
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
