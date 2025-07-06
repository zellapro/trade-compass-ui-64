
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { BookOpen, Timer } from "lucide-react";

const recoveryData = [
  { day: "Day 1", emotional: 20, financial: 15 },
  { day: "Day 2", emotional: 35, financial: 25 },
  { day: "Day 3", emotional: 45, financial: 40 },
  { day: "Day 4", emotional: 60, financial: 52 },
  { day: "Day 5", emotional: 75, financial: 68 },
  { day: "Day 6", emotional: 85, financial: 80 },
  { day: "Day 7", emotional: 92, financial: 88 },
  { day: "Day 8", emotional: 98, financial: 95 },
  { day: "Day 9", emotional: 100, financial: 98 },
];

const journalHeatData = [
  { status: "After Losses", entries: 12, intensity: "High" },
  { status: "After Wins", entries: 5, intensity: "Low" },
  { status: "During Drawdown", entries: 18, intensity: "Very High" },
  { status: "During Winning Streak", entries: 7, intensity: "Medium" },
];

const selfCareRoutines = [
  "30-minute meditation before market open",
  "15-minute walk after each trading session",
  "Journaling key lessons after each trading day",
  "No trading after 2 consecutive losses",
  "Weekly review of psychological state"
];

export function ResilienceTracker() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Average recovery time calculation
  const emotionalRecoveryDays = 6.2; // This would be calculated from real data
  const financialRecoveryDays = 8.5; // This would be calculated from real data
  
  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">Resilience & Recovery Tracker</CardTitle>
        <CardDescription>
          Measures how you recover from drawdowns and emotional lows
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-sm">Recovery Time Analysis</h3>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded-full ${
                  isLightTheme ? "bg-blue-500" : "bg-blue-400"
                }`}></div>
                <span className="text-xs">Emotional</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded-full ${
                  isLightTheme ? "bg-green-500" : "bg-green-400"
                }`}></div>
                <span className="text-xs">Financial</span>
              </div>
            </div>
          </div>
          
          <div className="h-[200px]">
            <ChartContainer
              config={{
                emotional: {
                  theme: {
                    light: "#3b82f6",
                    dark: "#60a5fa"
                  },
                  label: "Emotional Recovery"
                },
                financial: {
                  theme: {
                    light: "#10b981",
                    dark: "#34d399"
                  },
                  label: "Financial Recovery"
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={recoveryData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={isLightTheme ? "#e5e7eb" : "#ffffff15"} 
                    vertical={false}
                  />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: isLightTheme ? "#374151" : "#E3E6F3", fontSize: 12 }}
                    stroke={isLightTheme ? "#e5e7eb" : "#ffffff15"}
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fill: isLightTheme ? "#374151" : "#E3E6F3", fontSize: 12 }}
                    stroke={isLightTheme ? "#e5e7eb" : "#ffffff15"}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="emotional" 
                    stroke={isLightTheme ? "#3b82f6" : "#60a5fa"} 
                    fill={isLightTheme ? "#3b82f620" : "#60a5fa20"}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="financial" 
                    stroke={isLightTheme ? "#10b981" : "#34d399"} 
                    fill={isLightTheme ? "#10b98120" : "#34d39920"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <div>Day 1 (Drawdown)</div>
            <div>Recovery Time</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className={`p-3 rounded-md ${
              isLightTheme ? "bg-blue-50" : "bg-blue-900/30"
            }`}>
              <div className="text-sm font-medium mb-1">Emotional Recovery</div>
              <div className={`text-2xl font-bold ${
                isLightTheme ? "text-blue-700" : "text-blue-300"
              }`}>{emotionalRecoveryDays} days</div>
              <div className="text-xs mt-1">From drawdown to baseline</div>
            </div>
            
            <div className={`p-3 rounded-md ${
              isLightTheme ? "bg-green-50" : "bg-green-900/30"
            }`}>
              <div className="text-sm font-medium mb-1">Financial Recovery</div>
              <div className={`text-2xl font-bold ${
                isLightTheme ? "text-green-700" : "text-green-300"
              }`}>{financialRecoveryDays} days</div>
              <div className="text-xs mt-1">To break-even point</div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium text-sm">Journaling Trends</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {journalHeatData.map((item, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-md ${isLightTheme ? "bg-slate-100" : "bg-slate-900/50"}`}
              >
                <div className="text-sm">{item.status}</div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-lg font-bold">{item.entries}</span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    item.intensity === "Very High" 
                      ? (isLightTheme ? "bg-purple-100 text-purple-800" : "bg-purple-900/30 text-purple-300")
                      : item.intensity === "High" 
                        ? (isLightTheme ? "bg-blue-100 text-blue-800" : "bg-blue-900/30 text-blue-300")
                        : item.intensity === "Medium" 
                          ? (isLightTheme ? "bg-amber-100 text-amber-800" : "bg-amber-900/30 text-amber-300") 
                          : (isLightTheme ? "bg-green-100 text-green-800" : "bg-green-900/30 text-green-300")
                  }`}>
                    {item.intensity} Intensity
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-sm mb-3">Your Recovery Rituals</h3>
          <div className="space-y-2">
            {selfCareRoutines.map((routine, index) => (
              <div 
                key={index} 
                className={`px-3 py-2 text-sm rounded-md ${
                  isLightTheme ? "bg-slate-100" : "bg-slate-900/50"
                }`}
              >
                {routine}
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
              + Add Recovery Ritual
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
