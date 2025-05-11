
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, TrendingUp, Check, Clock } from "lucide-react";

export function EdgeEvolutionTracker() {
  const strategies = [
    {
      id: 1,
      name: "OB + BOS Reversal",
      created: "Mar 14, 2025",
      revisions: 4,
      edgeScore: 88,
      trend: "up",
      lastUsed: "2 hours ago"
    },
    {
      id: 2,
      name: "London Break",
      created: "Jan 22, 2025",
      revisions: 7,
      edgeScore: 76,
      trend: "up",
      lastUsed: "yesterday"
    },
    {
      id: 3,
      name: "FVG Pullback",
      created: "Apr 03, 2025",
      revisions: 2,
      edgeScore: 63,
      trend: "down",
      lastUsed: "3 days ago"
    },
    {
      id: 4,
      name: "NY Open Volume",
      created: "Feb 18, 2025",
      revisions: 5,
      edgeScore: 71,
      trend: "flat",
      lastUsed: "today"
    },
  ];
  
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3.5 w-3.5 text-green-400" />;
      case 'down':
        return <TrendingUp className="h-3.5 w-3.5 text-red-400 transform rotate-180" />;
      default:
        return <div className="h-3.5 w-3.5 flex items-center"><div className="h-0.5 w-3 bg-amber-400"></div></div>;
    }
  };
  
  const getEdgeScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 70) return "bg-green-400";
    if (score >= 60) return "bg-amber-400";
    return "bg-red-400";
  };
  
  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden">
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-blue-900/30 to-blue-800/30 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-sm">
            <LineChart className="mr-2 h-4 w-4 text-blue-400" />
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              Edge Evolution Tracker
            </span>
          </CardTitle>
          <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs px-1.5 h-5">
            4 Active Strategies
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">{strategy.name}</h3>
                <div className="flex items-center gap-1">
                  {getTrendIcon(strategy.trend)}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getEdgeScoreColor(strategy.edgeScore)} rounded-full`}
                    style={{ width: `${strategy.edgeScore}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium">{strategy.edgeScore}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-3 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Check className="h-3 w-3 mr-1 text-blue-400" />
                  <span>Rev {strategy.revisions}</span>
                </div>
                <div className="flex items-center justify-center">
                  <Clock className="h-3 w-3 mr-1 text-blue-400" />
                  <span>{strategy.lastUsed}</span>
                </div>
                <div className="text-right">{strategy.created}</div>
              </div>
              
              {/* Hidden view button that appears on hover */}
              <div className="mt-2 pt-2 border-t border-white/10 hidden group-hover:block transition-all">
                <button className="w-full text-center text-xs text-blue-400 hover:text-blue-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-blue-950/30 border border-blue-500/20 rounded-lg p-2 mt-4">
          <div className="flex items-start gap-2">
            <LineChart className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Your edge score represents strategy effectiveness based on win rate, risk-reward ratio, and psychological alignment.
              Strategies above 75 are considered high-performing.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
