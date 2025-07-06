
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "@/hooks/use-toast";
import { Brain, Check, Clock, PlayCircle, RefreshCw, Square } from "lucide-react";

interface MicroHabit {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  currentStreak: number;
  target: number;
}

export function NeuroDisciplineTools() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const [isBreathing, setIsBreathing] = React.useState(false);
  const [breathCounter, setBreathCounter] = React.useState(0);
  const [dailyPromptDone, setDailyPromptDone] = React.useState(false);
  
  const [microHabits, setMicroHabits] = React.useState<MicroHabit[]>([
    {
      id: "mark-chart",
      label: "Mark chart before trade",
      description: "Draw key levels and patterns before entering any position",
      completed: true,
      currentStreak: 14,
      target: 21
    },
    {
      id: "pause-after",
      label: "3-sec pause after entry",
      description: "Take 3 deep breaths after each trade entry to center yourself",
      completed: false,
      currentStreak: 8,
      target: 21
    },
    {
      id: "journal-post",
      label: "2 words post-exit",
      description: "Journal at least 2 words to describe your feeling after exit",
      completed: true,
      currentStreak: 21,
      target: 21
    },
    {
      id: "check-bias",
      label: "Challenge one bias",
      description: "Identify and challenge one cognitive bias before each trade",
      completed: false,
      currentStreak: 4,
      target: 21
    },
  ]);
  
  const handleBreathingStart = () => {
    setIsBreathing(true);
    setBreathCounter(0);
    
    // Start the breathing exercise
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setBreathCounter(counter);
      
      if (counter >= 30) {
        clearInterval(interval);
        setIsBreathing(false);
        toast({
          title: "Breathing Complete",
          description: "You've completed your pre-trade mental reset"
        });
      }
    }, 1000);
  };
  
  const handleDailyPrompt = () => {
    setDailyPromptDone(true);
    toast({
      title: "Daily Mindset Prompt",
      description: "Today, focus on process over outcome. Notice when you're attaching to results rather than execution."
    });
  };
  
  const toggleHabitCompletion = (id: string) => {
    setMicroHabits(prev => 
      prev.map(habit => 
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
    
    const habit = microHabits.find(h => h.id === id);
    if (habit) {
      toast({
        title: habit.completed ? "Habit Unmarked" : "Habit Completed",
        description: habit.completed 
          ? "Progress removed for today" 
          : `Streak: ${habit.currentStreak + 1} days. Keep going!`
      });
    }
  };
  
  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">Neuro-Discipline Reinforcement</CardTitle>
        <CardDescription>
          Tools to rewire emotional patterns and reinforce disciplined trading
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            className={`p-4 rounded-lg ${
              isLightTheme 
                ? (dailyPromptDone ? "bg-green-50 border border-green-100" : "bg-blue-50 border border-blue-100")
                : (dailyPromptDone ? "bg-green-900/20 border border-green-900/30" : "bg-blue-900/20 border border-blue-900/30")
            }`}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium flex items-center">
                <Brain className="h-4 w-4 mr-1.5" />
                Daily Mindset Prompt
              </h3>
              {dailyPromptDone && (
                <div className={`p-1 rounded-full ${
                  isLightTheme ? "bg-green-100" : "bg-green-900/30"
                }`}>
                  <Check className={`h-3.5 w-3.5 ${
                    isLightTheme ? "text-green-600" : "text-green-400"
                  }`} />
                </div>
              )}
            </div>
            
            <p className="text-xs mt-2 mb-3 text-muted-foreground">
              A quick 1-minute reflection to set your trading mindset
            </p>
            
            <Button 
              variant={dailyPromptDone ? "outline" : "default"}
              className="w-full"
              onClick={handleDailyPrompt}
              disabled={dailyPromptDone}
            >
              {dailyPromptDone ? "Completed Today" : "Start Daily Prompt"}
            </Button>
          </div>
          
          <div 
            className={`p-4 rounded-lg ${
              isLightTheme 
                ? (isBreathing ? "bg-purple-50 border border-purple-100" : "bg-blue-50 border border-blue-100")
                : (isBreathing ? "bg-purple-900/20 border border-purple-900/30" : "bg-blue-900/20 border border-blue-900/30")
            }`}
          >
            <h3 className="font-medium flex items-center">
              <RefreshCw className="h-4 w-4 mr-1.5" />
              Pre-Trade Mental Reset
            </h3>
            
            <p className="text-xs mt-2 mb-3 text-muted-foreground">
              Quick breathing + checklist exercise before entering a trade
            </p>
            
            {isBreathing ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Breathe in... breathe out...</span>
                  <span className="text-sm font-medium">{breathCounter}/30s</span>
                </div>
                <Progress value={(breathCounter / 30) * 100} className="h-2" />
              </div>
            ) : (
              <Button 
                className="w-full flex items-center justify-center"
                onClick={handleBreathingStart}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Reset Protocol
              </Button>
            )}
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center">
              <Square className="h-4 w-4 mr-1.5" />
              Micro-Habit Builder
            </h3>
            <span className="text-xs text-muted-foreground">
              {microHabits.filter(h => h.completed).length}/{microHabits.length} Today
            </span>
          </div>
          
          <div className="space-y-3">
            {microHabits.map((habit) => (
              <div 
                key={habit.id} 
                className={`p-3 rounded-lg border ${
                  habit.completed 
                    ? (isLightTheme ? "bg-green-50 border-green-100" : "bg-green-900/10 border-green-900/30")
                    : (isLightTheme ? "bg-slate-50 border-slate-100" : "bg-slate-900/20 border-slate-800")
                }`}
              >
                <div className="flex items-center">
                  <Checkbox 
                    id={habit.id} 
                    checked={habit.completed}
                    onCheckedChange={() => toggleHabitCompletion(habit.id)}
                    className="mr-2"
                  />
                  <div className="flex-1">
                    <label 
                      htmlFor={habit.id}
                      className="font-medium text-sm cursor-pointer"
                    >
                      {habit.label}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {habit.description}
                    </p>
                  </div>
                  <div className="ml-2 flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <div className="text-xs">
                      <span className={habit.currentStreak >= habit.target ? "font-bold" : ""}>
                        {habit.currentStreak}
                      </span>
                      <span className="text-muted-foreground">/{habit.target}</span>
                    </div>
                  </div>
                </div>
                
                {habit.currentStreak > 0 && (
                  <Progress 
                    value={(habit.currentStreak / habit.target) * 100} 
                    className="h-1 mt-2"
                    indicatorClassName={
                      habit.currentStreak >= habit.target
                        ? (isLightTheme ? "bg-green-500" : "bg-green-500")
                        : undefined
                    }
                  />
                )}
              </div>
            ))}
            
            <Button 
              variant="outline" 
              size="sm" 
              className={`w-full mt-2 ${
                isLightTheme 
                  ? "border-dashed border-gray-300 hover:bg-gray-50" 
                  : "border-dashed border-gray-700 hover:bg-gray-900"
              }`}
            >
              + Add New Micro-Habit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
