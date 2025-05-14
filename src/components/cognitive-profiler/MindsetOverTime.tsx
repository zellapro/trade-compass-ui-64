
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for the past month
const mindsetData = [
  {
    date: "Week 1",
    Clarity: 6,
    Calmness: 5,
    Discipline: 4,
    Energy: 7,
    PnL: 1200,
    WinRate: 60,
  },
  {
    date: "Week 2",
    Clarity: 7,
    Calmness: 6,
    Discipline: 7,
    Energy: 8,
    PnL: 1800,
    WinRate: 65,
  },
  {
    date: "Week 3",
    Clarity: 5,
    Calmness: 4,
    Discipline: 5,
    Energy: 6,
    PnL: 800,
    WinRate: 52,
  },
  {
    date: "Week 4",
    Clarity: 8,
    Calmness: 7,
    Discipline: 8,
    Energy: 7,
    PnL: 2200,
    WinRate: 70,
  },
  {
    date: "Week 5",
    Clarity: 9,
    Calmness: 8,
    Discipline: 9,
    Energy: 8,
    PnL: 2500,
    WinRate: 75,
  },
  {
    date: "Week 6",
    Clarity: 7,
    Calmness: 6,
    Discipline: 6,
    Energy: 5,
    PnL: 1500,
    WinRate: 62,
  },
];

const insights = [
  "Your highest win rate occurred during emotionally neutral weeks.",
  "Periods of high clarity and discipline correlate with your best performance.",
  "When energy is high but calmness is low, your win rate tends to decrease.",
  "Your PnL is most impacted by fluctuations in discipline.",
];

export function MindsetOverTime() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  const [overlay, setOverlay] = React.useState<"PnL" | "WinRate" | "none">("none");
  
  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">Mindset Over Time</CardTitle>
        <CardDescription>
          Track how your mental state correlates with trading performance
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4 space-y-4">
        <Tabs defaultValue="mindset" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="mindset">Mindset Metrics</TabsTrigger>
              <TabsTrigger value="correlations">Performance Correlations</TabsTrigger>
            </TabsList>
            
            {/* Overlay selector for mindset tab */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-muted-foreground">Overlay:</span>
              <span 
                onClick={() => setOverlay(overlay === "PnL" ? "none" : "PnL")}
                className={`cursor-pointer px-2 py-1 rounded ${
                  overlay === "PnL" 
                    ? (isLightTheme ? "bg-green-100 text-green-800" : "bg-green-900/30 text-green-300") 
                    : ""
                }`}
              >
                PnL
              </span>
              <span 
                onClick={() => setOverlay(overlay === "WinRate" ? "none" : "WinRate")}
                className={`cursor-pointer px-2 py-1 rounded ${
                  overlay === "WinRate" 
                    ? (isLightTheme ? "bg-blue-100 text-blue-800" : "bg-blue-900/30 text-blue-300") 
                    : ""
                }`}
              >
                Win Rate
              </span>
            </div>
          </div>
          
          <TabsContent value="mindset">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  clarity: {
                    theme: {
                      light: "#3b82f6",
                      dark: "#60a5fa"
                    },
                    label: "Clarity"
                  },
                  calmness: {
                    theme: {
                      light: "#10b981",
                      dark: "#34d399"
                    },
                    label: "Calmness"
                  },
                  discipline: {
                    theme: {
                      light: "#8b5cf6",
                      dark: "#a78bfa"
                    },
                    label: "Discipline"
                  },
                  energy: {
                    theme: {
                      light: "#f59e0b",
                      dark: "#fbbf24"
                    },
                    label: "Energy"
                  },
                  pnl: {
                    theme: {
                      light: "#16a34a",
                      dark: "#4ade80"
                    },
                    label: "PnL"
                  },
                  winRate: {
                    theme: {
                      light: "#2563eb",
                      dark: "#3b82f6"
                    },
                    label: "Win Rate"
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mindsetData}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="date"
                      stroke={isLightTheme ? "#9ca3af" : "#ffffff60"}
                      tick={{ fill: isLightTheme ? "#374151" : "#E3E6F3" }}
                    />
                    <YAxis 
                      yAxisId="left"
                      domain={[0, 10]} 
                      tick={{ fill: isLightTheme ? "#374151" : "#E3E6F3" }}
                      stroke={isLightTheme ? "#e5e7eb" : "#ffffff15"}
                    />
                    {overlay !== "none" && (
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={overlay === "PnL" ? [0, 3000] : [0, 100]}
                        tick={{ fill: isLightTheme ? "#374151" : "#E3E6F3" }}
                        stroke={isLightTheme ? "#e5e7eb" : "#ffffff15"}
                      />
                    )}
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Clarity"
                      yAxisId="left"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Calmness"
                      yAxisId="left"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Discipline"
                      yAxisId="left"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Energy"
                      yAxisId="left"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    {overlay === "PnL" && (
                      <Line
                        type="monotone"
                        dataKey="PnL"
                        yAxisId="right"
                        stroke={isLightTheme ? "#16a34a" : "#4ade80"}
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    )}
                    {overlay === "WinRate" && (
                      <Line
                        type="monotone"
                        dataKey="WinRate"
                        yAxisId="right"
                        stroke={isLightTheme ? "#2563eb" : "#3b82f6"}
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="correlations">
            <div className="space-y-4">
              <h3 className="font-medium">Key Performance Insights:</h3>
              <div className="grid grid-cols-1 gap-3">
                {insights.map((insight, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-md ${
                      isLightTheme ? "bg-slate-100" : "bg-slate-900/50"
                    }`}
                  >
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Based on analysis of your performance data from the last 3 months
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
