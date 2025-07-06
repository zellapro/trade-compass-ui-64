
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const adherenceData = [
  { name: "Followed Plan", value: 65, fill: "#4CAF50" },
  { name: "Partially Followed", value: 25, fill: "#FFC107" },
  { name: "Abandoned", value: 10, fill: "#FF5252" },
];

const deviationReasons = [
  { type: "emotion", label: "FOMO", count: 8 },
  { type: "emotion", label: "Overconfidence", count: 7 },
  { type: "emotion", label: "Boredom", count: 5 },
  { type: "reason", label: "Missed Setup", count: 4 },
  { type: "reason", label: "Position Sizing Error", count: 6 },
  { type: "reason", label: "Early Exit", count: 12 },
];

export function BehaviorDeviationTracker() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Calculate consistency score
  const consistencyScore = 78;
  const ruleViolations = 23;
  
  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold">Behavior Deviation Tracker</CardTitle>
            <CardDescription>
              Tracks how often you deviate from your trading plan and why
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{consistencyScore}/100</div>
            <div className="text-xs text-muted-foreground">Consistency Score</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="h-[180px]">
          <ChartContainer
            config={{
              adherence: {
                theme: {
                  light: "#16a34a",
                  dark: "#4CAF50"
                }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={adherenceData}
                layout="vertical"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <XAxis 
                  type="number" 
                  hide 
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={120}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: isLightTheme ? "#374151" : "#E3E6F3" }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                  background={{ fill: isLightTheme ? "#f3f4f6" : "#1f2937" }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Deviation Reasons</h3>
            <div className={`text-xs ${isLightTheme ? "text-red-600" : "text-red-400"}`}>
              {ruleViolations} Total Rule Violations
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {deviationReasons.map((reason, index) => (
              <Badge 
                key={index} 
                variant={reason.type === "emotion" ? "default" : "outline"}
                className={`${
                  reason.type === "emotion" 
                    ? isLightTheme
                      ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                      : "bg-purple-900/30 text-purple-300 hover:bg-purple-900/50" 
                    : ""
                } px-2 py-1`}
              >
                {reason.label} ({reason.count})
              </Badge>
            ))}
          </div>
        </div>
        
        <div className={`p-4 rounded-md ${
          consistencyScore > 80 
            ? (isLightTheme ? "bg-green-50 text-green-800" : "bg-green-900/30 text-green-300")
            : consistencyScore > 60
              ? (isLightTheme ? "bg-amber-50 text-amber-800" : "bg-amber-900/30 text-amber-300")
              : (isLightTheme ? "bg-red-50 text-red-800" : "bg-red-900/30 text-red-300")
        }`}>
          <p className="text-sm">
            {consistencyScore > 80 
              ? "Your plan adherence is strong. Focus on addressing early exits to improve further."
              : consistencyScore > 60
                ? "Moderate plan adherence. Work on reducing FOMO-driven entries." 
                : "Significant plan deviation detected. Consider revising your trading rules or implementing stronger accountability measures."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
