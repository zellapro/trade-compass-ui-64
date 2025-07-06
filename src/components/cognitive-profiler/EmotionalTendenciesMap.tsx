
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "@/context/ThemeContext";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";

const emotionalData = {
  before: [
    { emotion: "Fear", value: 65, fullMark: 100 },
    { emotion: "Greed", value: 40, fullMark: 100 },
    { emotion: "Confidence", value: 55, fullMark: 100 },
    { emotion: "Anxiety", value: 70, fullMark: 100 },
    { emotion: "Regret", value: 30, fullMark: 100 },
    { emotion: "Focus", value: 60, fullMark: 100 },
    { emotion: "Detachment", value: 45, fullMark: 100 },
  ],
  during: [
    { emotion: "Fear", value: 50, fullMark: 100 },
    { emotion: "Greed", value: 55, fullMark: 100 },
    { emotion: "Confidence", value: 65, fullMark: 100 },
    { emotion: "Anxiety", value: 60, fullMark: 100 },
    { emotion: "Regret", value: 20, fullMark: 100 },
    { emotion: "Focus", value: 80, fullMark: 100 },
    { emotion: "Detachment", value: 60, fullMark: 100 },
  ],
  after: [
    { emotion: "Fear", value: 30, fullMark: 100 },
    { emotion: "Greed", value: 25, fullMark: 100 },
    { emotion: "Confidence", value: 50, fullMark: 100 },
    { emotion: "Anxiety", value: 45, fullMark: 100 },
    { emotion: "Regret", value: 60, fullMark: 100 },
    { emotion: "Focus", value: 40, fullMark: 100 },
    { emotion: "Detachment", value: 70, fullMark: 100 },
  ],
};

const insights = {
  before: "You tend to enter trades when feeling anxious. Consider pre-trade centering techniques.",
  during: "Your focus peaks during trades, but anxiety remains elevated. Try micro-breathing techniques.",
  after: "Post-trade regret is common in your pattern. Consider implementing a post-trade reflection ritual.",
};

export function EmotionalTendenciesMap() {
  const [activeTab, setActiveTab] = React.useState("before");
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">Emotional Tendencies Map</CardTitle>
        <CardDescription>
          Visualizes your most common emotional states across trading activities
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <Tabs defaultValue="before" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="before">Before Trade</TabsTrigger>
            <TabsTrigger value="during">During Trade</TabsTrigger>
            <TabsTrigger value="after">After Trade</TabsTrigger>
          </TabsList>
          
          {["before", "during", "after"].map((period) => (
            <TabsContent key={period} value={period} className="space-y-4">
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    fear: { color: "#FF4D6D" },
                    greed: { color: "#FFC107" },
                    confidence: { color: "#4CAF50" },
                    anxiety: { color: "#FF9800" },
                    focus: { color: "#2196F3" },
                    detachment: { color: "#9C27B0" },
                    regret: { color: "#E91E63" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart 
                      outerRadius={90} 
                      data={emotionalData[period as keyof typeof emotionalData]}
                    >
                      <PolarGrid 
                        stroke={isLightTheme ? "#e5e7eb" : "#ffffff15"} 
                      />
                      <PolarAngleAxis 
                        dataKey="emotion" 
                        tick={{ fill: isLightTheme ? "#374151" : "#E3E6F3" }}
                        tickLine={{ stroke: isLightTheme ? "#9ca3af" : "#ffffff20" }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: isLightTheme ? "#374151" : "#E3E6F3" }}
                        tickCount={5}
                        stroke={isLightTheme ? "#e5e7eb" : "#ffffff15"} 
                      />
                      <Radar
                        name="Emotions"
                        dataKey="value"
                        stroke={isLightTheme ? "#3b82f6" : "#00FFFF"}
                        fill={isLightTheme ? "#3b82f680" : "#00FFFF40"}
                        fillOpacity={0.6}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className={`p-4 rounded-md ${isLightTheme ? "bg-blue-50 text-blue-800" : "bg-blue-900/30 text-cyan-100"}`}>
                <p className="text-sm">{insights[period as keyof typeof insights]}</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
