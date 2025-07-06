
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/context/ThemeContext";
import { Badge } from "@/components/ui/badge";

interface MatrixDataItem {
  emotion: string;
  win: number;
  loss: number;
  breakeven: number;
  totalTrades: number;
  winRate: number;
  key: string;
}

const matrixData: MatrixDataItem[] = [
  { emotion: "Focused", win: 42, loss: 12, breakeven: 6, totalTrades: 60, winRate: 70, key: "focused" },
  { emotion: "Calm", win: 38, loss: 15, breakeven: 7, totalTrades: 60, winRate: 63.3, key: "calm" },
  { emotion: "Confident", win: 30, loss: 23, breakeven: 7, totalTrades: 60, winRate: 50, key: "confident" },
  { emotion: "Fearful", win: 12, loss: 40, breakeven: 8, totalTrades: 60, winRate: 20, key: "fearful" },
  { emotion: "Anxious", win: 18, loss: 34, breakeven: 8, totalTrades: 60, winRate: 30, key: "anxious" },
  { emotion: "Excited", win: 25, loss: 28, breakeven: 7, totalTrades: 60, winRate: 41.7, key: "excited" },
  { emotion: "Frustrated", win: 15, loss: 38, breakeven: 7, totalTrades: 60, winRate: 25, key: "frustrated" },
];

// Sort data by win rate
const sortedData = [...matrixData].sort((a, b) => b.winRate - a.winRate);

// Find top and bottom emotions for insights
const topEmotion = sortedData[0];
const bottomEmotion = sortedData[sortedData.length - 1];

export function EmotionPerformanceMatrix() {
  const { theme } = useTheme();
  const isLightTheme = theme === 'light';
  
  // Function to determine cell color based on value
  const getCellColor = (value: number, max: number) => {
    const intensity = (value / max) * 100;
    
    if (isLightTheme) {
      if (intensity > 75) return "bg-green-200 text-green-800";
      if (intensity > 50) return "bg-green-100 text-green-800";
      if (intensity > 25) return "bg-green-50 text-green-800";
      return "bg-slate-50 text-slate-800";
    } else {
      if (intensity > 75) return "bg-green-900/40 text-green-300";
      if (intensity > 50) return "bg-green-900/30 text-green-300";
      if (intensity > 25) return "bg-green-900/20 text-green-300";
      return "bg-slate-900/30 text-slate-300";
    }
  };
  
  const getLossCellColor = (value: number, max: number) => {
    const intensity = (value / max) * 100;
    
    if (isLightTheme) {
      if (intensity > 75) return "bg-red-200 text-red-800";
      if (intensity > 50) return "bg-red-100 text-red-800";
      if (intensity > 25) return "bg-red-50 text-red-800";
      return "bg-slate-50 text-slate-800";
    } else {
      if (intensity > 75) return "bg-red-900/40 text-red-300";
      if (intensity > 50) return "bg-red-900/30 text-red-300";
      if (intensity > 25) return "bg-red-900/20 text-red-300";
      return "bg-slate-900/30 text-slate-300";
    }
  };
  
  const getBECellColor = (value: number, max: number) => {
    const intensity = (value / max) * 100;
    
    if (isLightTheme) {
      if (intensity > 75) return "bg-amber-200 text-amber-800";
      if (intensity > 50) return "bg-amber-100 text-amber-800";
      if (intensity > 25) return "bg-amber-50 text-amber-800";
      return "bg-slate-50 text-slate-800";
    } else {
      if (intensity > 75) return "bg-amber-900/40 text-amber-300";
      if (intensity > 50) return "bg-amber-900/30 text-amber-300";
      if (intensity > 25) return "bg-amber-900/20 text-amber-300";
      return "bg-slate-900/30 text-slate-300";
    }
  };
  
  // Find the maximum values for each outcome for color scaling
  const maxWin = Math.max(...matrixData.map(item => item.win));
  const maxLoss = Math.max(...matrixData.map(item => item.loss));
  const maxBE = Math.max(...matrixData.map(item => item.breakeven));
  
  return (
    <Card className="overflow-hidden border-border/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-semibold">Emotion-to-Performance Matrix</CardTitle>
        <CardDescription>
          Direct visual correlation of emotional states with trade outcomes
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4 space-y-6">
        <div className="overflow-x-auto">
          <table className={`w-full border-collapse ${
            isLightTheme ? "text-slate-700" : "text-slate-200"
          }`}>
            <thead>
              <tr className="border-b border-border/50">
                <th className={`text-left p-2 ${
                  isLightTheme ? "bg-slate-50" : "bg-slate-900/30"
                }`}>Emotion</th>
                <th className={`p-2 ${
                  isLightTheme ? "bg-green-50 text-green-800" : "bg-green-900/20 text-green-300"
                }`}>Win</th>
                <th className={`p-2 ${
                  isLightTheme ? "bg-red-50 text-red-800" : "bg-red-900/20 text-red-300"
                }`}>Loss</th>
                <th className={`p-2 ${
                  isLightTheme ? "bg-amber-50 text-amber-800" : "bg-amber-900/20 text-amber-300"
                }`}>BE</th>
                <th className={`p-2 ${
                  isLightTheme ? "bg-slate-50" : "bg-slate-900/30"
                }`}>Win Rate</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr key={item.key} className="border-b border-border/50">
                  <td className="text-left p-2 font-medium">{item.emotion}</td>
                  <td className={`p-2 text-center ${getCellColor(item.win, maxWin)}`}>
                    {item.win}
                  </td>
                  <td className={`p-2 text-center ${getLossCellColor(item.loss, maxLoss)}`}>
                    {item.loss}
                  </td>
                  <td className={`p-2 text-center ${getBECellColor(item.breakeven, maxBE)}`}>
                    {item.breakeven}
                  </td>
                  <td className="p-2 text-center">
                    <Badge variant={item.winRate > 60 ? "default" : "outline"}>
                      {item.winRate.toFixed(1)}%
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Key Insights:</h3>
          
          <div className={`p-3 rounded-md ${
            isLightTheme ? "bg-green-50 border border-green-100" : "bg-green-900/20 border border-green-900/30"
          }`}>
            <p className="text-sm">
              You win <span className="font-bold">{topEmotion.winRate.toFixed(1)}%</span> of trades when feeling <span className="font-bold">{topEmotion.emotion.toLowerCase()}</span>.
              Focus on creating this emotional state before trading.
            </p>
          </div>
          
          <div className={`p-3 rounded-md ${
            isLightTheme ? "bg-red-50 border border-red-100" : "bg-red-900/20 border border-red-900/30"
          }`}>
            <p className="text-sm">
              Trading while <span className="font-bold">{bottomEmotion.emotion.toLowerCase()}</span> results in only <span className="font-bold">{bottomEmotion.winRate.toFixed(1)}%</span> wins.
              Consider stepping away when you notice this emotion.
            </p>
          </div>
          
          <div className={`p-3 rounded-md ${
            isLightTheme ? "bg-blue-50 border border-blue-100" : "bg-blue-900/20 border border-blue-900/30"
          }`}>
            <p className="text-sm">
              When emotionally neutral (calm and focused), your win rate averages <span className="font-bold">66.7%</span>,
              significantly above your overall average.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
