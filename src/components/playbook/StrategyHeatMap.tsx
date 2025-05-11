
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, Info } from "lucide-react";

export function StrategyHeatMap() {
  // Days of the week
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  
  // Time blocks (hours)
  const timeBlocks = ["9:30", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];
  
  // Sample heatmap data (values from 0-100 representing performance)
  const heatmapData = [
    [85, 72, 64, 45, 53, 42, 61], // Monday
    [76, 68, 58, 52, 48, 41, 56], // Tuesday
    [92, 87, 78, 56, 42, 38, 67], // Wednesday
    [81, 73, 67, 58, 51, 48, 64], // Thursday
    [75, 68, 62, 58, 54, 48, 72]  // Friday
  ];
  
  const getColorClass = (value: number) => {
    if (value >= 85) return "bg-green-500/90";
    if (value >= 75) return "bg-green-500/70";
    if (value >= 65) return "bg-green-500/50";
    if (value >= 55) return "bg-amber-500/50";
    if (value >= 45) return "bg-amber-500/70";
    if (value >= 30) return "bg-red-500/60";
    return "bg-red-500/80";
  };
  
  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-amber-900/30 to-amber-800/30 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-sm">
            <Grid3X3 className="mr-2 h-4 w-4 text-amber-400" />
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Strategy Performance Heat Map
            </span>
          </CardTitle>
          <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs px-1.5 h-5">
            Last 30 Days
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center text-xs text-muted-foreground mb-2 justify-end">
            <span className="inline-block w-3 h-3 bg-red-500/70 mr-1 rounded"></span>
            <span className="mr-3">Poor</span>
            <span className="inline-block w-3 h-3 bg-amber-500/60 mr-1 rounded"></span>
            <span className="mr-3">Average</span>
            <span className="inline-block w-3 h-3 bg-green-500/70 mr-1 rounded"></span>
            <span>Excellent</span>
          </div>
          
          <div className="w-full overflow-x-auto">
            <div className="min-w-[500px]">
              {/* Time headers */}
              <div className="flex">
                <div className="w-12"></div>
                {timeBlocks.map((time, i) => (
                  <div key={i} className="flex-1 text-xs text-center text-muted-foreground py-1">
                    {time}
                  </div>
                ))}
              </div>
              
              {/* Heatmap grid */}
              <div className="space-y-1">
                {days.map((day, dayIndex) => (
                  <div key={dayIndex} className="flex items-center">
                    <div className="w-12 text-xs text-muted-foreground">{day}</div>
                    <div className="flex-1 flex gap-1">
                      {heatmapData[dayIndex].map((value, timeIndex) => (
                        <div 
                          key={timeIndex}
                          className={`flex-1 h-12 rounded-md ${getColorClass(value)} flex items-center justify-center transition-all duration-200 hover:opacity-90 cursor-pointer group relative`}
                        >
                          <span className="text-white font-medium text-xs">{value}%</span>
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                            <div className="bg-black/90 text-white text-xs rounded py-1 px-2 min-w-[120px] backdrop-blur-sm border border-white/10">
                              <div className="font-medium">
                                {day} {timeBlocks[timeIndex]} - {parseInt(timeBlocks[timeIndex]) + 1}:00
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Win Rate: {value}%
                                <br />
                                Avg R:R: {(Math.random() * 2 + 0.5).toFixed(1)}
                              </div>
                            </div>
                            <div className="border-t-8 border-t-black/90 border-x-8 border-x-transparent h-0 w-0 absolute left-1/2 transform -translate-x-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-amber-950/30 border border-amber-500/20 rounded-lg p-2 mt-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Your strategies perform best during the first 90 minutes of trading and in the last 30 minutes.
                Consider focusing your trading activity within these optimal windows.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
