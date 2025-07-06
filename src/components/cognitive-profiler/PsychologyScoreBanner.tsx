
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTheme } from "@/context/ThemeContext";
import { AlertCircle, Brain, Info } from "lucide-react";

interface ScoreCategory {
  name: string;
  score: number;
  description: string;
  color: string;
}

export function PsychologyScoreBanner() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  const scores: ScoreCategory[] = [
    { 
      name: "Awareness", 
      score: 85, 
      description: "Your ability to recognize and name emotions during trading",
      color: isLightTheme ? "#3b82f6" : "#60a5fa" // blue
    },
    { 
      name: "Discipline", 
      score: 72, 
      description: "How consistently you follow your trading rules",
      color: isLightTheme ? "#8b5cf6" : "#a78bfa" // purple
    },
    { 
      name: "Resilience", 
      score: 78, 
      description: "Your ability to recover from drawdowns and losses",
      color: isLightTheme ? "#10b981" : "#34d399" // green
    },
    { 
      name: "Adaptability", 
      score: 68, 
      description: "How effectively you adjust to changing market conditions",
      color: isLightTheme ? "#f59e0b" : "#fbbf24" // amber
    },
  ];
  
  // Calculate overall score (average of all categories)
  const overallScore = Math.round(
    scores.reduce((sum, item) => sum + item.score, 0) / scores.length
  );
  
  return (
    <Card className={`border-border/50 backdrop-blur-sm overflow-hidden ${
      isLightTheme ? "bg-white/90" : "bg-black/20 backdrop-blur-xl"
    }`}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Brain className={`h-5 w-5 ${isLightTheme ? "text-blue-600" : "text-blue-400"}`} />
              <h2 className="text-lg font-medium">Psychology Score</h2>
              <div className={`text-xs rounded-full px-2 py-0.5 ${
                overallScore >= 80 
                  ? (isLightTheme ? "bg-green-100 text-green-800" : "bg-green-900/30 text-green-300") 
                  : overallScore >= 70 
                    ? (isLightTheme ? "bg-blue-100 text-blue-800" : "bg-blue-900/30 text-blue-300")
                    : overallScore >= 60 
                      ? (isLightTheme ? "bg-amber-100 text-amber-800" : "bg-amber-900/30 text-amber-300")
                      : (isLightTheme ? "bg-red-100 text-red-800" : "bg-red-900/30 text-red-300")
              }`}>
                {overallScore >= 80 ? "Excellent" 
                  : overallScore >= 70 ? "Good" 
                  : overallScore >= 60 ? "Moderate" 
                  : "Needs Work"}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              An aggregate metric of your psychological trading fitness
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`text-4xl font-bold ${
              overallScore >= 80 
                ? (isLightTheme ? "text-green-600" : "text-green-400") 
                : overallScore >= 70 
                  ? (isLightTheme ? "text-blue-600" : "text-blue-400")
                  : overallScore >= 60 
                    ? (isLightTheme ? "text-amber-500" : "text-amber-400")
                    : (isLightTheme ? "text-red-500" : "text-red-400")
            }`}>
              {overallScore}
            </div>
            <div className="text-muted-foreground font-medium">/100</div>
            
            {overallScore < 70 && (
              <div className="ml-2">
                <AlertCircle className={`h-5 w-5 ${
                  isLightTheme ? "text-amber-500" : "text-amber-400"
                }`} />
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {scores.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">{category.name}</div>
                <div className="text-sm font-bold">{category.score}</div>
              </div>
              <Progress 
                value={category.score} 
                className="h-2"
                style={{
                  backgroundColor: isLightTheme ? "#f3f4f6" : "#1f2937"
                }}
                indicatorClassName="h-full"
                indicatorStyle={{
                  backgroundColor: category.color
                }}
              />
              <div className="flex items-start text-xs text-muted-foreground">
                <Info className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0" />
                {category.description}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
